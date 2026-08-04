import { BUCKET_SECTIONS } from "../data/modules";

export default function BucketModule({ state, update }) {
  const { answers = {}, submitted } = state;
  const setAnswer = (id, v) => update({ answers: { ...answers, [id]: v } });

  return (
    <>
      <p className="mu-focus">
        No right answers here, and nothing is scored. Write like you'd talk — a few sentences each
        is plenty.
      </p>

      {BUCKET_SECTIONS.map((section) => (
        <div className="mu-subbox" key={section.heading}>
          <p className="mu-section-label">{section.heading}</p>
          {section.questions.map((q) => (
            <div key={q.id} className="mu-field">
              <label className="mu-field-label">{q.text}</label>
              <textarea
                className="mu-input mu-textarea"
                value={answers[q.id] || ""}
                onChange={(e) => setAnswer(q.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}

      <button
        className={`mu-btn ${submitted ? "mu-btn-outline" : "mu-btn-solid"}`}
        onClick={() => update({ submitted: !submitted })}
      >
        {submitted ? "SUBMITTED ✓ — TAP TO REOPEN" : "SUBMIT RESPONSES"}
      </button>
    </>
  );
}
