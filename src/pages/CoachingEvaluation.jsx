import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import {
  SEASON,
  MODULES,
  RUBRIC_MODULES,
  GRADE_SCALE,
  ADMIN_EMAILS,
  CREATOR_EMAILS,
  STATUS_OPTIONS,
  SCHEDULE_DATES,
  defaultData,
  emptyModuleState,
  emptyBonding,
} from "../data/modules";
import OnboardingModule from "../components/OnboardingModule";
import RubricModule from "../components/RubricModule";
import AdminPanel from "../components/AdminPanel";
import "./CoachingEvaluation.css";

const docId = (uid) => `${SEASON.replace(/\s/g, "")}_${uid}`;

const hydrate = (remote, fallbackName) => {
  const base = defaultData(fallbackName);
  if (!remote) return base;
  return {
    coachName: remote.coachName || base.coachName,
    lastOpenId: remote.lastOpenId || base.lastOpenId,
    notes: Array.isArray(remote.notes) ? remote.notes : base.notes,
    onboardingStep: typeof remote.onboardingStep === "number" ? remote.onboardingStep : base.onboardingStep,
    intro: { ...base.intro, ...(remote.intro || {}) },
    meeting: { ...base.meeting, ...(remote.meeting || {}) },
    selfEval: { ...base.selfEval, ...(remote.selfEval || {}) },
    bucket: { ...base.bucket, ...(remote.bucket || {}) },
    bonding:
      Array.isArray(remote.bonding) && remote.bonding.length === 4 ? remote.bonding : emptyBonding(),
    modules: Object.fromEntries(
      RUBRIC_MODULES.map((m) => [m.id, { ...emptyModuleState(), ...(remote.modules?.[m.id] || {}) }])
    ),
    evalRatings: { ...base.evalRatings, ...(remote.evalRatings || {}) },
    archetype: remote.archetype || null,
  };
};

export default function CoachingEvaluation() {
  const { user, profile, logout } = useAuth();
  const isAdmin = ADMIN_EMAILS.includes((user?.email || "").toLowerCase());
  const isCreator = CREATOR_EMAILS.includes((user?.email || "").toLowerCase());

  const [data, setData] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [saveState, setSaveState] = useState("idle");

  // Admin: browse other coaches
  const [coaches, setCoaches] = useState([]);
  const [viewUid, setViewUid] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const targetUid = viewUid || user?.uid;
  const readOnly = isAdmin && viewUid && viewUid !== user?.uid;

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const snap = await getDocs(collection(db, "coaches"));
        setCoaches(snap.docs.map((d) => ({ uid: d.id, ...d.data() })));
      } catch (err) {
        console.error("Could not list coaches", err);
      }
    })();
  }, [isAdmin]);

  useEffect(() => {
    if (!targetUid) return;
    setData(null);
    (async () => {
      try {
        const snap = await getDoc(doc(db, "coachEvaluations", docId(targetUid)));
        setData(hydrate(snap.exists() ? snap.data() : null, viewUid ? "" : profile?.name));
      } catch (err) {
        console.error("Failed to load evaluation", err);
        setData(defaultData(profile?.name));
      }
    })();
  }, [targetUid, profile, viewUid]);

  const persist = useCallback(
    async (next) => {
      setData(next);
      setSaveState("saving");
      try {
        await setDoc(
          doc(db, "coachEvaluations", docId(targetUid)),
          { ...next, coachUid: targetUid, season: SEASON, updatedAt: serverTimestamp() },
          { merge: true }
        );
        setSaveState("saved");
        setTimeout(() => setSaveState("idle"), 1500);
      } catch (err) {
        console.error("Failed to save", err);
        setSaveState("error");
      }
    },
    [targetUid]
  );

  if (!data) return <div className="mu-loading">LOADING SEASON…</div>;

  const updateModule = (id, patch) =>
    persist({ ...data, modules: { ...data.modules, [id]: { ...data.modules[id], ...patch } } });
  const updateIntro = (patch) => persist({ ...data, intro: { ...data.intro, ...patch } });
  const updateMeeting = (patch) => persist({ ...data, meeting: { ...data.meeting, ...patch } });
  const updateSelfEval = (patch) => persist({ ...data, selfEval: { ...data.selfEval, ...patch } });
  const updateEvalRatings = (patch) =>
    persist({ ...data, evalRatings: { ...data.evalRatings, ...patch } });
  const updateBucket = (patch) => persist({ ...data, bucket: { ...data.bucket, ...patch } });
  const setOnboardingStep = (onboardingStep) => persist({ ...data, onboardingStep });
  const setBonding = (idx, patch) => {
    const next = data.bonding.map((b, i) => (i === idx ? { ...b, ...patch } : b));
    persist({ ...data, bonding: next });
  };
  const setArchetype = (a) => persist({ ...data, archetype: a });

  const addNote = async (text) => {
    const note = {
      id: crypto.randomUUID(),
      text,
      authorEmail: user.email,
      createdAt: new Date().toISOString(),
    };
    await persist({ ...data, notes: [...(data.notes || []), note] });

    const coachEmail =
      coaches.find((c) => c.uid === targetUid)?.email || (targetUid === user.uid ? user.email : null);
    if (coachEmail) {
      try {
        await addDoc(collection(db, "mail"), {
          to: [coachEmail],
          message: {
            subject: "New note from your evaluator — Maryland United Coaching Excellence Pathway",
            text,
          },
        });
      } catch (err) {
        console.error("Failed to queue note email", err);
      }
    }
  };

  const openModule = (id) => {
    setOpenId(id);
    if (data.lastOpenId !== id) persist({ ...data, lastOpenId: id });
  };
  const confirmLeave = () =>
    window.confirm(
      "Saved ✓ — your work in this module is saved automatically. Leave this module?"
    );

  const toggleOpen = (m) => {
    if (m.draft && !isCreator) return;
    const current = MODULES.find((x) => x.id === openId);
    if (current && isSubmitted(current) && !confirmLeave()) return;
    return openId === m.id ? setOpenId(null) : openModule(m.id);
  };

  const isSubmitted = (m) => {
    if (m.kind === "onboarding") {
      return Boolean(
        data.meeting?.completed && data.intro?.read && data.selfEval?.submitted && data.bucket?.submitted
      );
    }
    const ms = data.modules[m.id];
    if (m.recording2) return Boolean(ms?.submitted && ms?.submitted2);
    return ms?.submitted;
  };
  const gradeFor = (m) =>
    m.kind === "rubric" ? GRADE_SCALE.find((g) => g.value === data.modules[m.id]?.grade) : null;
  const statusFor = (m) =>
    m.kind === "rubric" ? STATUS_OPTIONS.find((s) => s.value === data.modules[m.id]?.status) : null;

  const total = MODULES.length;
  const submittedCount = MODULES.filter(isSubmitted).length;
  const gradedCount = RUBRIC_MODULES.filter((m) => data.modules[m.id]?.grade).length;

  return (
    <div className="mu-page">
      <header className="mu-header">
        <div className="mu-header-top">
          <div>
            <img src="/crest.png" alt="Maryland United FC" className="mu-header-crest" />
            <p className="mu-eyebrow">MARYLAND UNITED · COACHING EXCELLENCE PATHWAY</p>
            <h1 className="mu-h1">
              SEASON <span className="mu-accent">{SEASON}</span>
            </h1>
          </div>
          <button onClick={logout} className="mu-signout">
            Sign out
          </button>
        </div>
        <p className="mu-sub">
          {total} modules across the season — a self-evaluation, a look at what drives you, and eight
          qualities assessed through recorded submissions.
        </p>
        <p className="mu-values">OUR VALUES · COMMITMENT. COURAGE. PASSION.</p>
        {isCreator && <p className="mu-creator-note">CREATOR VIEW · DRAFT MODULES UNLOCKED</p>}

        {isAdmin ? (
          <div className="mu-admin-bar">
            <label className="mu-field-label">Viewing coach</label>
            <select
              className="mu-input"
              value={viewUid || user.uid}
              onChange={(e) => setViewUid(e.target.value === user.uid ? null : e.target.value)}
            >
              <option value={user.uid}>{profile?.name || "Me"} (you)</option>
              {coaches
                .filter((c) => c.uid !== user.uid)
                .map((c) => (
                  <option key={c.uid} value={c.uid}>
                    {c.name || c.email}
                  </option>
                ))}
            </select>
            <button className="mu-btn mu-btn-outline" onClick={() => setShowAdmin(!showAdmin)}>
              {showAdmin ? "HIDE EVALUATOR VIEW" : "EVALUATOR VIEW"}
            </button>
          </div>
        ) : (
          <input
            className="mu-name-input"
            value={data.coachName}
            placeholder="Coach name"
            onChange={(e) => setData({ ...data, coachName: e.target.value })}
            onBlur={() => persist(data)}
          />
        )}
      </header>

      <section className="mu-progress-row">
        <div className="mu-progress-card">
          <p className="mu-progress-num">
            {submittedCount}
            <span className="mu-progress-den">/{total}</span>
          </p>
          <p className="mu-progress-label">MODULES SUBMITTED</p>
          <div className="mu-track">
            <div
              className="mu-fill mu-fill-gold"
              style={{ width: `${(submittedCount / total) * 100}%` }}
            />
          </div>
        </div>
        <div className="mu-progress-card">
          <p className="mu-progress-num">
            {gradedCount}
            <span className="mu-progress-den">/{RUBRIC_MODULES.length}</span>
          </p>
          <p className="mu-progress-label">QUALITIES EVALUATED</p>
          <div className="mu-track">
            <div
              className="mu-fill mu-fill-red"
              style={{ width: `${(gradedCount / RUBRIC_MODULES.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {isAdmin && showAdmin && (
        <AdminPanel
          data={data}
          archetype={data.archetype}
          setArchetype={setArchetype}
          addNote={addNote}
          updateEvalRatings={updateEvalRatings}
        />
      )}

      {!(isAdmin && showAdmin) && data.notes?.length > 0 && (
        <section className="mu-notes-section">
          <p className="mu-section-label">NOTES FROM YOUR EVALUATOR</p>
          <div className="mu-notes-list">
            {[...data.notes].reverse().map((n) => (
              <div key={n.id} className="mu-note">
                <p className="mu-note-date">
                  {new Date(n.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="mu-note-text">{n.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mu-schedule-section">
        <p className="mu-section-label">SCHEDULE</p>
        <p className="mu-recording-desc">
          Same modules for every coach — the date just depends on which age group you coach.
        </p>
        <div className="mu-schedule-table-wrap">
          <table className="mu-schedule-table">
            <thead>
              <tr>
                <th>MODULE</th>
                <th>U9–U14</th>
                <th>U15–U19</th>
              </tr>
            </thead>
            <tbody>
              {MODULES.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.num} · {m.title}
                  </td>
                  <td>{SCHEDULE_DATES[m.id]?.young || "TBD"}</td>
                  <td>{SCHEDULE_DATES[m.id]?.old || "TBD"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <main className="mu-main">
        {(openId ? MODULES.filter((m) => m.id === openId) : MODULES).map((m, idx) => {
          const open = openId === m.id;
          const grade = gradeFor(m);
          const status = statusFor(m);
          const locked = m.draft && !isCreator;
          return (
            <div key={m.id}>
              {idx === 1 && <p className="mu-divider">THE RUBRIC</p>}
              <article className={`mu-card ${open ? "mu-card-open" : ""} ${locked ? "mu-card-disabled" : ""}`}>
                <button
                  className="mu-card-head"
                  onClick={() => toggleOpen(m)}
                  aria-expanded={open}
                  disabled={locked}
                >
                  <span className="mu-card-num">{m.num}</span>
                  <span className="mu-card-title-block">
                    <span className="mu-card-title">{m.title.toUpperCase()}</span>
                    <span className="mu-card-focus">{m.focus}</span>
                  </span>
                  <span className="mu-card-pills">
                    {locked && <span className="mu-pill mu-pill-soon">COMING SOON</span>}
                    {m.draft && isCreator && <span className="mu-pill mu-pill-draft">DRAFT</span>}
                    {!open && data.lastOpenId === m.id && (
                      <span className="mu-pill mu-pill-continue">CONTINUE</span>
                    )}
                    {isSubmitted(m) && <span className="mu-pill mu-pill-gold">✓</span>}
                    {grade && <span className="mu-pill mu-pill-red">{grade.label.toUpperCase()}</span>}
                    {status && (
                      <span
                        className={`mu-pill ${status.value === "complete" ? "mu-pill-gold" : "mu-pill-red"}`}
                      >
                        {status.label}
                      </span>
                    )}
                    {!locked && <span className="mu-toggle-icon">{open ? "–" : "+"}</span>}
                  </span>
                </button>

                {open && m.kind === "onboarding" && (
                  <OnboardingModule
                    data={data}
                    step={data.onboardingStep ?? 0}
                    setStep={setOnboardingStep}
                    updateMeeting={updateMeeting}
                    updateIntro={updateIntro}
                    updateSelfEval={updateSelfEval}
                    updateBucket={updateBucket}
                  />
                )}
                {open && m.kind === "placeholder" && (
                  <div className="mu-card-body">
                    <p className="mu-focus">{m.focus}</p>
                    {m.resources && (
                      <div className="mu-subbox">
                        <p className="mu-section-label">RESOURCES</p>
                        <div className="mu-resources">
                          {m.resources.map((r) => (
                            <a
                              key={r.url}
                              className="mu-resource-row"
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="mu-resource-title">{r.title}</span>
                              <span className="mu-resource-desc">{r.description}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {open && m.kind === "rubric" && (
                  <RubricModule
                    module={m}
                    state={data.modules[m.id]}
                    update={(patch) => updateModule(m.id, patch)}
                    bonding={data.bonding}
                    setBonding={setBonding}
                    isAdmin={isAdmin}
                  />
                )}
              </article>
            </div>
          );
        })}
      </main>

      <footer className="mu-footer">
        {readOnly && <span className="mu-readonly">Viewing another coach — edits save to their record. </span>}
        {saveState === "saving" && "Saving…"}
        {saveState === "saved" && "All changes saved"}
        {saveState === "error" && "Couldn't save — check your connection and try again"}
        {saveState === "idle" && "Progress saves automatically to your account"}
      </footer>
    </div>
  );
}
