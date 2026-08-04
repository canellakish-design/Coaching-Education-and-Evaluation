import OneOnOneModule from "./OneOnOneModule";
import IntroModule from "./IntroModule";
import SelfEvalModule from "./SelfEvalModule";
import BucketModule from "./BucketModule";

const STEPS = [
  { key: "meeting", label: "1-on-1 Meeting" },
  { key: "intro", label: "Introduction" },
  { key: "selfEval", label: "Self-Evaluation" },
  { key: "bucket", label: "What Drives You" },
];

const isStepDone = (data, key) => {
  if (key === "meeting") return Boolean(data.meeting?.completed);
  if (key === "intro") return Boolean(data.intro?.read);
  if (key === "selfEval") return Boolean(data.selfEval?.submitted);
  if (key === "bucket") return Boolean(data.bucket?.submitted);
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
  const canAdvance = isStepDone(data, current.key);
  const completedCount = STEPS.filter((s) => isStepDone(data, s.key)).length;

  const goBack = () => setStep(Math.max(0, step - 1));
  const goNext = () => setStep(Math.min(STEPS.length - 1, step + 1));

  return (
    <div className="mu-card-body">
      {current.key === "meeting" && (
        <OneOnOneModule state={data.meeting} update={updateMeeting} />
      )}
      {current.key === "intro" && (
        <IntroModule state={data.intro} update={updateIntro} onContinue={goNext} />
      )}
      {current.key === "selfEval" && (
        <SelfEvalModule state={data.selfEval} update={updateSelfEval} />
      )}
      {current.key === "bucket" && (
        <BucketModule state={data.bucket} update={updateBucket} />
      )}

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
          STEP {step + 1} OF {STEPS.length} — {current.label.toUpperCase()} · {completedCount} OF{" "}
          {STEPS.length} COMPLETE
        </p>
        <div className="mu-track">
          <div
            className="mu-fill mu-fill-gold"
            style={{ width: `${(completedCount / STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
