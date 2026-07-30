import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import { SEASON, GRADE_SCALE, MODULES, emptyModuleState } from "../data/modules";
import "./CoachingEvaluation.css";

// Firestore doc path: coachEvaluations/{seasonId}_{uid}
const docId = (uid) => `${SEASON.replace(/\s/g, "")}_${uid}`;

const defaultData = (coachName) => ({
  coachName: coachName || "",
  modules: Object.fromEntries(MODULES.map((m) => [m.id, emptyModuleState()])),
});

export default function CoachingEvaluation() {
  const { user, profile, logout } = useAuth();
  const [data, setData] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [saveState, setSaveState] = useState("idle");
  const [showScale, setShowScale] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const ref = doc(db, "coachEvaluations", docId(user.uid));
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const remote = snap.data();
          const merged = defaultData(profile?.name);
          merged.coachName = remote.coachName || merged.coachName;
          for (const m of MODULES) {
            merged.modules[m.id] = { ...emptyModuleState(), ...(remote.modules?.[m.id] || {}) };
          }
          setData(merged);
        } else {
          setData(defaultData(profile?.name));
        }
      } catch (err) {
        console.error("Failed to load evaluation data", err);
        setData(defaultData(profile?.name));
      }
    })();
  }, [user, profile]);

  const persist = useCallback(
    async (next) => {
      setData(next);
      setSaveState("saving");
      try {
        const ref = doc(db, "coachEvaluations", docId(user.uid));
        await setDoc(
          ref,
          { ...next, coachUid: user.uid, season: SEASON, updatedAt: serverTimestamp() },
          { merge: true }
        );
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 1500);
      } catch (err) {
        console.error("Failed to save evaluation data", err);
        setSaveState("error");
      }
    },
    [user]
  );

  const updateModule = (id, patch) => {
    const next = { ...data, modules: { ...data.modules, [id]: { ...data.modules[id], ...patch } } };
    persist(next);
  };

  if (!data) {
    return <div className="mu-loading">LOADING SEASON…</div>;
  }

  const submittedCount = MODULES.filter((m) => data.modules[m.id].submitted).length;
  const gradedCount = MODULES.filter((m) => data.modules[m.id].grade).length;
  const total = MODULES.length;

  return (
    <div className="mu-page">
      <div className="mu-calvert-band" aria-hidden="true">
        <div className="mu-checker" />
        <div className="mu-redline" />
      </div>

      <header className="mu-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div>
            <p className="mu-eyebrow">MARYLAND UNITED · COACHING EXCELLENCE PATHWAY</p>
            <h1 className="mu-h1">
              SEASON <span className="mu-accent">{SEASON}</span>
            </h1>
          </div>
          <button
            onClick={logout}
            style={{
              background: "transparent",
              border: "1px solid #3a3428",
              color: "#b9b2a4",
              padding: "8px 14px",
              cursor: "pointer",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            Sign out
          </button>
        </div>
        <p className="mu-sub">
          {total} modules, {total} recordings — tracked across the season.
        </p>
        <input
          className="mu-name-input"
          value={data.coachName}
          placeholder="Coach name"
          onChange={(e) => setData({ ...data, coachName: e.target.value })}
          onBlur={() => persist({ ...data })}
        />
      </header>

      <section className="mu-progress-row">
        <div className="mu-progress-card">
          <p className="mu-progress-num">
            {submittedCount}
            <span className="mu-progress-den">/{total}</span>
          </p>
          <p className="mu-progress-label">RECORDINGS SUBMITTED</p>
          <div className="mu-track">
            <div className="mu-fill mu-fill-gold" style={{ width: `${(submittedCount / total) * 100}%` }} />
          </div>
        </div>
        <div className="mu-progress-card">
          <p className="mu-progress-num">
            {gradedCount}
            <span className="mu-progress-den">/{total}</span>
          </p>
          <p className="mu-progress-label">QUALITIES EVALUATED</p>
          <div className="mu-track">
            <div className="mu-fill mu-fill-red" style={{ width: `${(gradedCount / total) * 100}%` }} />
          </div>
        </div>
      </section>

      <section className="mu-scale-section">
        <button className="mu-scale-toggle" onClick={() => setShowScale(!showScale)}>
          {showScale ? "Hide grading scale" : "View grading scale"}
        </button>
        {showScale && (
          <div className="mu-scale-box">
            {GRADE_SCALE.map((g) => (
              <div key={g.value} className="mu-scale-row">
                <span className="mu-scale-num">{g.value}</span>
                <p>
                  <strong className="mu-accent">{g.label}.</strong> <span className="mu-muted">{g.desc}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <main className="mu-main">
        {MODULES.map((m) => {
          const st = data.modules[m.id];
          const open = openId === m.id;
          const grade = GRADE_SCALE.find((g) => g.value === st.grade);
          return (
            <article key={m.id} className={`mu-card ${open ? "mu-card-open" : ""}`}>
              <button className="mu-card-head" onClick={() => setOpenId(open ? null : m.id)} aria-expanded={open}>
                <span className="mu-card-num">{m.num}</span>
                <span className="mu-card-title-block">
                  <span className="mu-card-window">{m.window}</span>
                  <span className="mu-card-title">{m.title.toUpperCase()}</span>
                </span>
                <span className="mu-card-pills">
                  {st.submitted && <span className="mu-pill mu-pill-gold">REC ✓</span>}
                  {grade && <span className="mu-pill mu-pill-red">{grade.label.toUpperCase()}</span>}
                  <span className="mu-toggle-icon">{open ? "–" : "+"}</span>
                </span>
              </button>

              {open && (
                <div className="mu-card-body">
                  <p className="mu-focus">{m.focus}</p>

                  <p className="mu-section-label">WHAT WE LOOK FOR</p>
                  <ul className="mu-ul">
                    {m.lookFor.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="mu-subbox">
                    <p className="mu-section-label">
                      RECORDING · <span className="mu-accent">{m.recording.format.toUpperCase()}</span>
                    </p>
                    <p className="mu-recording-desc">{m.recording.desc}</p>
                    <div className="mu-form-col">
                      <input
                        className="mu-input"
                        placeholder="Video link (Veo, Hudl, Drive…)"
                        value={st.subLink}
                        onChange={(e) => updateModule(m.id, { subLink: e.target.value })}
                      />
                      <input
                        className="mu-input"
                        type="date"
                        value={st.subDate}
                        onChange={(e) => updateModule(m.id, { subDate: e.target.value })}
                      />
                      <textarea
                        className="mu-input mu-textarea"
                        placeholder="Context for the reviewer — age group, session objective, anything to watch for"
                        value={st.subNotes}
                        onChange={(e) => updateModule(m.id, { subNotes: e.target.value })}
                      />
                      <button
                        className={`mu-btn ${st.submitted ? "mu-btn-outline" : "mu-btn-solid"}`}
                        onClick={() => updateModule(m.id, { submitted: !st.submitted })}
                      >
                        {st.submitted ? "SUBMITTED ✓ — TAP TO REOPEN" : "MARK RECORDING SUBMITTED"}
                      </button>
                    </div>
                  </div>

                  <div className="mu-subbox">
                    <p className="mu-section-label">EVALUATION</p>
                    <div className="mu-grade-row">
                      {GRADE_SCALE.map((g) => (
                        <button
                          key={g.value}
                          className={`mu-grade-chip ${st.grade === g.value ? "mu-grade-chip-active" : ""}`}
                          onClick={() => updateModule(m.id, { grade: st.grade === g.value ? null : g.value })}
                        >
                          {g.value} · {g.label}
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="mu-input mu-textarea"
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

      <footer className="mu-footer">
        {saveState === "saving" && "Saving…"}
        {saveState === "saved" && "All changes saved"}
        {saveState === "error" && "Couldn't save — check your connection and try again"}
        {saveState === "idle" && "Progress saves automatically to your account"}
      </footer>
    </div>
  );
}
