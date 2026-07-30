import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../contexts/AuthContext";
import {
  SEASON,
  MODULES,
  RUBRIC_MODULES,
  GRADE_SCALE,
  ADMIN_EMAILS,
  defaultData,
  emptyModuleState,
  emptyBonding,
} from "../data/modules";
import SelfEvalModule from "../components/SelfEvalModule";
import BucketModule from "../components/BucketModule";
import RubricModule from "../components/RubricModule";
import AdminPanel from "../components/AdminPanel";
import "./CoachingEvaluation.css";

const docId = (uid) => `${SEASON.replace(/\s/g, "")}_${uid}`;

const hydrate = (remote, fallbackName) => {
  const base = defaultData(fallbackName);
  if (!remote) return base;
  return {
    coachName: remote.coachName || base.coachName,
    selfEval: { ...base.selfEval, ...(remote.selfEval || {}) },
    bucket: { ...base.bucket, ...(remote.bucket || {}) },
    bonding:
      Array.isArray(remote.bonding) && remote.bonding.length === 4 ? remote.bonding : emptyBonding(),
    modules: Object.fromEntries(
      RUBRIC_MODULES.map((m) => [m.id, { ...emptyModuleState(), ...(remote.modules?.[m.id] || {}) }])
    ),
    archetype: remote.archetype || null,
  };
};

export default function CoachingEvaluation() {
  const { user, profile, logout } = useAuth();
  const isAdmin = ADMIN_EMAILS.includes((user?.email || "").toLowerCase());

  const [data, setData] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [saveState, setSaveState] = useState("idle");
  const [showScale, setShowScale] = useState(false);

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
  const updateSelfEval = (patch) => persist({ ...data, selfEval: { ...data.selfEval, ...patch } });
  const updateBucket = (patch) => persist({ ...data, bucket: { ...data.bucket, ...patch } });
  const setBonding = (idx, patch) => {
    const next = data.bonding.map((b, i) => (i === idx ? { ...b, ...patch } : b));
    persist({ ...data, bonding: next });
  };
  const setArchetype = (a) => persist({ ...data, archetype: a });

  const isSubmitted = (m) => {
    if (m.kind === "selfEval") return data.selfEval.submitted;
    if (m.kind === "bucket") return data.bucket.submitted;
    return data.modules[m.id]?.submitted;
  };
  const gradeFor = (m) =>
    m.kind === "rubric" ? GRADE_SCALE.find((g) => g.value === data.modules[m.id]?.grade) : null;

  const total = MODULES.length;
  const submittedCount = MODULES.filter(isSubmitted).length;
  const gradedCount = RUBRIC_MODULES.filter((m) => data.modules[m.id]?.grade).length;

  return (
    <div className="mu-page">
      {openId !== "m1" && (
        <div aria-hidden="true">
          <div className="mu-checker" />
          <div className="mu-redline" />
        </div>
      )}

      <header className="mu-header">
        <div className="mu-header-top">
          <div>
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
        <AdminPanel data={data} archetype={data.archetype} setArchetype={setArchetype} />
      )}

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
                  <strong className="mu-accent">{g.label}.</strong>{" "}
                  <span className="mu-muted">{g.desc}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <main className="mu-main">
        {MODULES.map((m, idx) => {
          const open = openId === m.id;
          const grade = gradeFor(m);
          return (
            <div key={m.id}>
              {idx === 2 && <p className="mu-divider">THE RUBRIC</p>}
              <article className={`mu-card ${open ? "mu-card-open" : ""}`}>
                <button
                  className="mu-card-head"
                  onClick={() => setOpenId(open ? null : m.id)}
                  aria-expanded={open}
                >
                  <span className="mu-card-num">{m.num}</span>
                  <span className="mu-card-title-block">
                    <span className="mu-card-window">{m.window}</span>
                    <span className="mu-card-title">{m.title.toUpperCase()}</span>
                  </span>
                  <span className="mu-card-pills">
                    {isSubmitted(m) && <span className="mu-pill mu-pill-gold">✓</span>}
                    {grade && <span className="mu-pill mu-pill-red">{grade.label.toUpperCase()}</span>}
                    <span className="mu-toggle-icon">{open ? "–" : "+"}</span>
                  </span>
                </button>

                {open && m.kind === "selfEval" && (
                  <SelfEvalModule state={data.selfEval} update={updateSelfEval} />
                )}
                {open && m.kind === "bucket" && (
                  <BucketModule state={data.bucket} update={updateBucket} />
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
