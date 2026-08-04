import { INTRO_SECTIONS, INTRO_NEXT, GRADE_SCALE } from "../data/modules";
import OneOnOneModule from "./OneOnOneModule";
import SelfEvalModule from "./SelfEvalModule";
import BucketModule from "./BucketModule";

const renderParagraph = (p, i) =>
  typeof p === "string" ? (
    <p key={i} className="mu-focus">
      {p}
    </p>
  ) : (
    <p key={i} className="mu-focus">
      <strong className="mu-accent">{p.strong}</strong>
      {p.text}
    </p>
  );

// One flat sequence — no nested steppers, no sections-within-sections.
const STEPS = [
  { key: "meeting", label: "1-on-1 Meeting", task: "meeting" },
  ...INTRO_SECTIONS.map((s, i) => ({ key: `intro-${i}`, label: s.heading, introIndex: i })),
  { key: "intro-final", label: INTRO_NEXT.heading, task: "intro" },
  { key: "selfEval", label: "Self-Evaluation", task: "selfEval" },
  { key: "bucket", label: "What Drives You", task: "bucket" },
];

const TASKS = ["meeting", "intro", "selfEval", "bucket"];

const isTaskDone = (data, task) => {
  if (task === "meeting") return Boolean(data.meeting?.completed);
  if (task === "intro") return Boolean(data.intro?.read);
  if (task === "selfEval") return Boolean(data.selfEval?.submitted);
  if (task === "bucket") return Boolean(data.bucket?.submitted);
  return false;
};

export default function OnboardingModule({
  data,
  step,
  setStep,
  updateMeeting,
  updateIntro,
  updateSelfEval,
  updateBucket,
}) {
  const current = STEPS[step] || STEPS[0];
  const canAdvance = current.task ? isTaskDone(data, current.task) : true;
  const completedTasks = TASKS.filter((t) => isTaskDone(data, t)).length;

  const goBack = () => setStep(Math.max(0, step - 1));
  const goNext = () => setStep(Math.min(STEPS.length - 1, step + 1));

  return (
    <div className="mu-card-body">
      {current.key === "meeting" && <OneOnOneModule state={data.meeting} update={updateMeeting} />}

      {current.introIndex != null &&
        (() => {
          const section = INTRO_SECTIONS[current.introIndex];
          return (
            <div className="mu-intro-section">
              {current.introIndex === 0 && (
                <img src="/crest.png" alt="Maryland United FC" className="mu-crest" />
              )}
              <p className="mu-section-label">{section.heading}</p>
              {section.lead && <p className="mu-focus">{section.lead}</p>}
              {section.list && (
                <div className="mu-intro-list">
                  {section.list.map((item) => (
                    <div key={item} className="mu-intro-list-item">
                      {item}
                    </div>
                  ))}
                </div>
              )}
              {section.scale && (
                <div className="mu-scale-inline">
                  {GRADE_SCALE.map((g) => (
                    <span key={g.value}>
                      <strong className="mu-accent">{g.value}</strong> {g.label}
                    </span>
                  ))}
                </div>
              )}
              {section.body.map(renderParagraph)}
            </div>
          );
        })()}

      {current.key === "intro-final" && (
        <div className="mu-intro-section">
          <p className="mu-section-label">{INTRO_NEXT.heading}</p>
          {INTRO_NEXT.body.map(renderParagraph)}
          <p className="mu-intro-cta">{INTRO_NEXT.cta}</p>
          <button
            className={`mu-btn ${data.intro?.read ? "mu-btn-outline" : "mu-btn-solid"}`}
            onClick={() => updateIntro({ read: !data.intro?.read })}
          >
            {data.intro?.read ? "MARKED AS READ ✓ — TAP TO REOPEN" : "MARK AS READ"}
          </button>
        </div>
      )}

      {current.key === "selfEval" && <SelfEvalModule state={data.selfEval} update={updateSelfEval} />}
      {current.key === "bucket" && <BucketModule state={data.bucket} update={updateBucket} />}

      <div className="mu-onboarding-nav">
        {step > 0 && (
          <button className="mu-btn mu-btn-outline" onClick={goBack}>
            BACK
          </button>
        )}
        {step < STEPS.length - 1 && (
          <button
            className="mu-btn mu-btn-solid"
            disabled={!canAdvance}
            title={canAdvance ? undefined : "Complete this step to continue"}
            onClick={goNext}
          >
            NEXT
          </button>
        )}
      </div>

      <div className="mu-onboarding-progress-wrap">
        <p className="mu-onboarding-progress-label">
          STEP {step + 1} OF {STEPS.length} — {current.label.toUpperCase()} · {completedTasks} OF{" "}
          {TASKS.length} COMPLETE
        </p>
        <div className="mu-track">
          <div
            className="mu-fill mu-fill-gold"
            style={{ width: `${(completedTasks / TASKS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
