import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import Auth from "./Auth.jsx";

// ---------- Season data ----------
const CURRENT_SEASON = "2026–27";
// Coaches can look back at (or ahead to) any of these seasons; history persists per season.
const SEASONS = ["2024–25", "2025–26", "2026–27", "2027–28", "2028–29"];

const GRADE_SCALE = [
  { value: 1, label: "Emerging", desc: "Early in development — needs structured support in this area." },
  { value: 2, label: "Developing", desc: "Applies the quality inconsistently — clear growth underway." },
  { value: 3, label: "Proficient", desc: "Meets the Maryland United standard consistently." },
  { value: 4, label: "Exemplary", desc: "Models the standard and can mentor other coaches." },
];

const MODULES = [
  {
    id: "m1",
    num: "01",
    window: "DUE AUG 25",
    title: "Team Management",
    focus: "Standards, communication, and organization that set the tone for the season.",
    lookFor: [
      "Clear team standards and expectations communicated to players and parents",
      "Organized, confident handling of parent questions and concerns",
      "Consistent, professional communication rhythm with families",
    ],
    recording: {
      format: "First parent meeting",
      desc: "Record your first parent meeting of the season. Record and submit.",
    },
  },
  {
    id: "m2",
    num: "02",
    window: "DUE AUG 25",
    title: "Game Model",
    focus: "A clear, coachable identity for how your team plays — understood well enough to teach it off the field.",
    lookFor: [
      "A defined game model articulated in principles players can recognize on the field",
      "Confident use of the tactical board to explain shape, phases, and key moments",
      "Team engagement — players asked to explain the model back, not just hear it",
    ],
    recording: {
      format: "Office meeting with tactical board",
      desc: "Record yourself presenting one aspect of your game model to the team using a tactical board. Record and submit.",
    },
  },
  {
    id: "m3",
    num: "03",
    window: "DUE SEP 15",
    title: "Maryland United Training Session",
    focus: "Sessions that are safe, demanding, and full of touches, decisions, and joy.",
    lookFor: [
      "High activity level — minimal lines, maximal ball rolling time",
      "Session structure with clear objectives and progressive difficulty",
      "Environment where players feel safe to try, fail, and try again",
    ],
    recording: {
      format: "Full team training session",
      desc: "An unedited team session from arrival to close, including your coaching interventions.",
    },
  },
  {
    id: "m4",
    num: "04",
    window: "DUE SEP 15",
    title: "Match Preparation & Execution",
    focus: "Game plans, team talks, and in-match decisions that give players clarity.",
    lookFor: [
      "Purposeful warm-up connected to the game plan",
      "Concise, player-focused pregame and halftime talks",
      "In-game adjustments and substitutions with a clear rationale",
    ],
    recording: {
      format: "Match day recording",
      desc: "Warm-up, pregame talk, halftime, and bench coaching across one competitive match.",
    },
  },
  {
    id: "m5",
    num: "05",
    window: "DUE SEP 15",
    title: "Analysis",
    focus: "Scouting the opponent and turning that work into a prepared, clear-eyed team.",
    lookFor: [
      "Opponent tendencies identified and translated into a specific game plan",
      "Clips organized around success vs. failure, not just a highlight reel",
      "Players talk more than the coach — guided discovery over lecture",
      "Video analysts brought in with the team afterwards to reinforce the session",
    ],
    recording: {
      format: "Opponent scouting & prep session",
      desc: "Record a session where you prepare the team for a scouted opponent. Submit clips analyzing what worked (success) versus what didn't (failure). Follow up by bringing in video analysts with the team afterwards.",
    },
  },
  {
    id: "m6",
    num: "06",
    window: "DUE SEP 15",
    title: "Individual Development",
    focus: "Every player has a plan, and every plan gets real attention.",
    lookFor: [
      "Individual development plans with specific, reviewable targets",
      "Session moments deliberately designed around individual needs",
      "Feedback tailored to the player, not broadcast to the group",
    ],
    recording: {
      format: "Individual / small-group session",
      desc: "A 1-on-1 or small-group session built around specific player development targets.",
    },
  },
  {
    id: "m7",
    num: "07",
    window: "DUE SEP 15",
    title: "Transformational Experience",
    focus: "Coaching that shapes people, not just players — culture, character, connection.",
    lookFor: [
      "Genuine relationships — you know your players beyond the field",
      "Team culture moments built intentionally, not left to chance",
      "Players leave the season more confident than they arrived",
    ],
    recording: {
      format: "Player check-in / culture moment",
      desc: "A recorded player check-in conversation or a team culture activity you lead.",
    },
  },
  {
    id: "m8",
    num: "08",
    window: "DUE SEP 15",
    title: "Club Pathway",
    focus: "Guiding players and families through what comes next at Maryland United.",
    lookFor: [
      "Honest, well-prepared end-of-season player reviews",
      "Clear knowledge of club pathway options and next steps",
      "Advocacy for players moving between teams and levels",
    ],
    recording: {
      format: "End-of-season pathway meeting",
      desc: "A player/family review meeting covering the season and the road ahead.",
    },
  },
];

const emptyModuleState = () => ({
  grade: null,
  evalNotes: "",
  submitted: false,
  subDate: "",
  subLink: "",
  subNotes: "",
});

const defaultData = () => ({
  coachName: "",
  modules: Object.fromEntries(MODULES.map((m) => [m.id, emptyModuleState()])),
});

// ---------- Small pieces ----------
const CalvertBand = () => (
  <div aria-hidden="true">
    <div
      style={{
        height: 14,
        background:
          "repeating-linear-gradient(45deg, #F5B917 0 10px, #16130F 10px 20px), repeating-linear-gradient(-45deg, #F5B917 0 10px, #16130F 10px 20px)",
        backgroundBlendMode: "multiply",
      }}
    />
    <div style={{ height: 3, background: "#D22730" }} />
  </div>
);

function docRef(uid, season) {
  // One document per coach per season, so history stacks up year over year.
  return doc(db, "coachSeasons", `${uid}_${season}`);
}

export default function CoachingPlatform() {
  const [user, setUser] = useState(undefined); // undefined = checking, null = signed out
  const [season, setSeason] = useState(CURRENT_SEASON);
  const [data, setData] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [showScale, setShowScale] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    if (!user) return;
    setData(null);
    (async () => {
      try {
        const snap = await getDoc(docRef(user.uid, season));
        const merged = defaultData();
        if (snap.exists()) {
          const parsed = snap.data();
          merged.coachName = parsed.coachName || "";
          for (const m of MODULES) {
            merged.modules[m.id] = { ...emptyModuleState(), ...(parsed.modules?.[m.id] || {}) };
          }
        }
        setData(merged);
      } catch {
        setData(defaultData());
        setSaveState("error");
      }
    })();
  }, [user, season]);

  const persist = async (next) => {
    setData(next);
    setSaveState("saving");
    try {
      await setDoc(docRef(user.uid, season), { ...next, uid: user.uid, season });
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1500);
    } catch {
      setSaveState("error");
    }
  };

  const updateModule = (id, patch) => {
    const next = {
      ...data,
      modules: { ...data.modules, [id]: { ...data.modules[id], ...patch } },
    };
    persist(next);
  };

  if (user === undefined) {
    return (
      <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#F5B917", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, letterSpacing: 2 }}>
          LOADING…
        </p>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  if (!data) {
    return (
      <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#F5B917", fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, letterSpacing: 2 }}>
          LOADING SEASON…
        </p>
      </div>
    );
  }

  const submittedCount = MODULES.filter((m) => data.modules[m.id].submitted).length;
  const gradedCount = MODULES.filter((m) => data.modules[m.id].grade).length;

  return (
    <div style={S.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Archivo:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <CalvertBand />

      {/* Header */}
      <header style={S.header}>
        <div style={S.headerTop}>
          <p style={S.eyebrow}>MARYLAND UNITED · COACHING EXCELLENCE PATHWAY · DUE SEP 15</p>
          <button style={S.signOutBtn} onClick={() => signOut(auth)}>
            {user.email} · SIGN OUT
          </button>
        </div>
        <h1 style={S.h1}>
          SEASON{" "}
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            style={S.seasonSelect}
            aria-label="Select season"
          >
            {SEASONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </h1>
        <p style={S.sub}>
          Eight modules. Eight recordings. All due September 15 — a fast, focused kickoff to the season.
        </p>
        <input
          style={S.nameInput}
          value={data.coachName}
          placeholder="Coach name"
          onChange={(e) => setData({ ...data, coachName: e.target.value })}
          onBlur={() => persist({ ...data })}
          aria-label="Coach name"
        />
      </header>

      {/* Progress */}
      <section style={S.progressRow} aria-label="Season progress">
        <div style={S.progressCard}>
          <p style={S.progressNum}>
            {submittedCount}<span style={S.progressDen}>/8</span>
          </p>
          <p style={S.progressLabel}>RECORDINGS SUBMITTED</p>
          <div style={S.track}>
            <div style={{ ...S.fill, width: `${(submittedCount / 8) * 100}%`, background: "#F5B917" }} />
          </div>
        </div>
        <div style={S.progressCard}>
          <p style={S.progressNum}>
            {gradedCount}<span style={S.progressDen}>/8</span>
          </p>
          <p style={S.progressLabel}>QUALITIES EVALUATED</p>
          <div style={S.track}>
            <div style={{ ...S.fill, width: `${(gradedCount / 8) * 100}%`, background: "#D22730" }} />
          </div>
        </div>
      </section>

      {/* Grading scale */}
      <section style={{ padding: "0 20px", maxWidth: 860, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <button style={S.scaleToggle} onClick={() => setShowScale(!showScale)}>
          {showScale ? "Hide grading scale" : "View grading scale"}
        </button>
        {showScale && (
          <div style={S.scaleBox}>
            {GRADE_SCALE.map((g) => (
              <div key={g.value} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <span style={S.scaleNum}>{g.value}</span>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
                  <strong style={{ color: "#F5B917" }}>{g.label}.</strong>{" "}
                  <span style={{ color: "#B9B2A4" }}>{g.desc}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modules */}
      <main style={S.main}>
        {MODULES.map((m) => {
          const st = data.modules[m.id];
          const open = openId === m.id;
          const grade = GRADE_SCALE.find((g) => g.value === st.grade);
          return (
            <article key={m.id} style={{ ...S.card, borderColor: open ? "#F5B917" : "#2A251C" }}>
              <button
                style={S.cardHead}
                onClick={() => setOpenId(open ? null : m.id)}
                aria-expanded={open}
              >
                <span style={S.cardNum}>{m.num}</span>
                <span style={{ flex: 1, textAlign: "left" }}>
                  <span style={S.cardWindow}>{m.window}</span>
                  <span style={S.cardTitle}>{m.title.toUpperCase()}</span>
                </span>
                <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {st.submitted && <span style={{ ...S.pill, background: "#F5B917", color: "#16130F" }}>REC ✓</span>}
                  {grade && <span style={{ ...S.pill, background: "#D22730", color: "#FFF" }}>{grade.label.toUpperCase()}</span>}
                  <span style={{ color: "#6E6656", fontSize: 18 }}>{open ? "–" : "+"}</span>
                </span>
              </button>

              {open && (
                <div style={S.cardBody}>
                  <p style={S.focus}>{m.focus}</p>

                  <p style={S.sectionLabel}>WHAT WE LOOK FOR</p>
                  <ul style={S.ul}>
                    {m.lookFor.map((item, i) => (
                      <li key={i} style={S.li}>{item}</li>
                    ))}
                  </ul>

                  {/* Recording submission */}
                  <div style={S.subBox}>
                    <p style={S.sectionLabel}>
                      RECORDING · <span style={{ color: "#F5B917" }}>{m.recording.format.toUpperCase()}</span>
                    </p>
                    <p style={{ margin: "0 0 12px", fontSize: 13.5, color: "#B9B2A4", lineHeight: 1.5 }}>
                      {m.recording.desc}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input
                        style={S.input}
                        placeholder="Video link (Veo, Hudl, Drive…)"
                        value={st.subLink}
                        onChange={(e) => updateModule(m.id, { subLink: e.target.value })}
                      />
                      <input
                        style={S.input}
                        type="date"
                        value={st.subDate}
                        onChange={(e) => updateModule(m.id, { subDate: e.target.value })}
                        aria-label="Recording date"
                      />
                      <textarea
                        style={{ ...S.input, minHeight: 60, resize: "vertical" }}
                        placeholder="Context for the reviewer — age group, session objective, anything to watch for"
                        value={st.subNotes}
                        onChange={(e) => updateModule(m.id, { subNotes: e.target.value })}
                      />
                      <button
                        style={{
                          ...S.btn,
                          background: st.submitted ? "transparent" : "#F5B917",
                          color: st.submitted ? "#F5B917" : "#16130F",
                          border: st.submitted ? "1px solid #F5B917" : "1px solid #F5B917",
                        }}
                        onClick={() => updateModule(m.id, { submitted: !st.submitted })}
                      >
                        {st.submitted ? "SUBMITTED ✓ — TAP TO REOPEN" : "MARK RECORDING SUBMITTED"}
                      </button>
                    </div>
                  </div>

                  {/* Evaluation */}
                  <div style={S.subBox}>
                    <p style={S.sectionLabel}>EVALUATION</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                      {GRADE_SCALE.map((g) => (
                        <button
                          key={g.value}
                          style={{
                            ...S.gradeChip,
                            background: st.grade === g.value ? "#D22730" : "transparent",
                            color: st.grade === g.value ? "#FFF" : "#B9B2A4",
                            borderColor: st.grade === g.value ? "#D22730" : "#3A3428",
                          }}
                          onClick={() => updateModule(m.id, { grade: st.grade === g.value ? null : g.value })}
                        >
                          {g.value} · {g.label}
                        </button>
                      ))}
                    </div>
                    <textarea
                      style={{ ...S.input, minHeight: 70, resize: "vertical" }}
                      placeholder="Evaluator feedback — strengths, growth areas, next steps"
                      value={st.evalNotes}
                      onChange={(e) => updateModule(m.id, { evalNotes: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </main>

      <footer style={S.footer}>
        <p style={{ margin: 0 }}>
          {saveState === "saving" && "Saving…"}
          {saveState === "saved" && "All changes saved"}
          {saveState === "error" && "Couldn't save — check your connection and make another change to retry"}
          {saveState === "idle" && "Progress syncs automatically to your account"}
        </p>
      </footer>
      <CalvertBand />
    </div>
  );
}

// ---------- Styles ----------
const S = {
  page: {
    minHeight: "100vh",
    background: "#16130F",
    color: "#F4F1E8",
    fontFamily: "'Archivo', system-ui, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "36px 20px 20px",
    maxWidth: 860,
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  signOutBtn: {
    background: "transparent",
    border: "1px solid #3A3428",
    color: "#B9B2A4",
    fontSize: 12,
    padding: "5px 10px",
    cursor: "pointer",
    fontFamily: "'Archivo', sans-serif",
    letterSpacing: 0.5,
  },
  eyebrow: {
    margin: 0,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: 3,
    color: "#D22730",
  },
  h1: {
    margin: "6px 0 10px",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(44px, 9vw, 72px)",
    lineHeight: 0.95,
    letterSpacing: 1,
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  seasonSelect: {
    background: "transparent",
    border: "none",
    borderBottom: "3px solid #F5B917",
    color: "#F5B917",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "clamp(36px, 7vw, 58px)",
    letterSpacing: 1,
    cursor: "pointer",
    outline: "none",
  },
  sub: { margin: 0, color: "#B9B2A4", fontSize: 15, lineHeight: 1.55, maxWidth: 520 },
  nameInput: {
    marginTop: 16,
    background: "transparent",
    border: "none",
    borderBottom: "2px solid #3A3428",
    color: "#F5B917",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 1,
    padding: "4px 2px",
    width: "100%",
    maxWidth: 320,
    outline: "none",
  },
  progressRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    padding: "8px 20px 16px",
    maxWidth: 860,
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },
  progressCard: {
    border: "1px solid #2A251C",
    padding: "14px 16px",
    background: "#1C1812",
  },
  progressNum: {
    margin: 0,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 40,
    lineHeight: 1,
  },
  progressDen: { color: "#6E6656", fontSize: 24 },
  progressLabel: {
    margin: "4px 0 10px",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 13,
    letterSpacing: 2,
    color: "#B9B2A4",
  },
  track: { height: 6, background: "#2A251C" },
  fill: { height: "100%", transition: "width .4s ease" },
  scaleToggle: {
    background: "transparent",
    border: "none",
    color: "#F5B917",
    fontFamily: "'Archivo', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
    padding: "4px 0 10px",
  },
  scaleBox: {
    border: "1px solid #2A251C",
    background: "#1C1812",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 8,
  },
  scaleNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    color: "#D22730",
    minWidth: 18,
  },
  main: {
    flex: 1,
    padding: "8px 20px 28px",
    maxWidth: 860,
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: { border: "1px solid #2A251C", background: "#1C1812", transition: "border-color .2s" },
  cardHead: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    width: "100%",
    background: "transparent",
    border: "none",
    color: "#F4F1E8",
    padding: "14px 16px",
    cursor: "pointer",
    fontFamily: "'Archivo', sans-serif",
  },
  cardNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 30,
    color: "#F5B917",
    lineHeight: 1,
  },
  cardWindow: {
    display: "block",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 12,
    letterSpacing: 2.5,
    color: "#6E6656",
  },
  cardTitle: {
    display: "block",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 22,
    letterSpacing: 1,
    lineHeight: 1.1,
  },
  pill: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: 1.5,
    padding: "3px 8px",
  },
  cardBody: { padding: "0 16px 18px", borderTop: "1px solid #2A251C" },
  focus: { margin: "14px 0", color: "#B9B2A4", fontSize: 14.5, lineHeight: 1.55 },
  sectionLabel: {
    margin: "0 0 8px",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: 2.5,
    color: "#F4F1E8",
  },
  ul: { margin: "0 0 16px", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 },
  li: { fontSize: 14, lineHeight: 1.5, color: "#D8D2C4" },
  subBox: { border: "1px solid #2A251C", padding: 14, marginBottom: 12, background: "#16130F" },
  input: {
    background: "#1C1812",
    border: "1px solid #3A3428",
    color: "#F4F1E8",
    padding: "10px 12px",
    fontSize: 14,
    fontFamily: "'Archivo', sans-serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  btn: {
    padding: "12px 14px",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: 2,
    cursor: "pointer",
  },
  gradeChip: {
    border: "1px solid",
    padding: "8px 12px",
    fontFamily: "'Archivo', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    background: "transparent",
  },
  footer: {
    textAlign: "center",
    padding: "14px 20px",
    color: "#6E6656",
    fontSize: 12.5,
  },
};
