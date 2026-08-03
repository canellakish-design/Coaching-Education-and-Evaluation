import { itemsForModule, GRADE_SCALE, SUBMISSION_STEPS } from "../data/modules";
import RatingRow from "./RatingRow";

export default function RubricModule({ module: m, state, update, bonding, setBonding, isAdmin }) {
  const items = itemsForModule(m.id);
  const itemGrades = state.itemGrades || {};

  const setItemGrade = (id, v) => update({ itemGrades: { ...itemGrades, [id]: v } });

  return (
    <div className="mu-card-body">
      <p className="mu-focus">{m.focus}</p>

      <p className="mu-section-label">WHAT WE LOOK FOR</p>
      <ul className="mu-ul">
        {items.map((item) => (
          <li key={item.id}>{item.evalText}</li>
        ))}
      </ul>

      {/* Recording submission — coach-facing */}
      <div className="mu-subbox">
        <p className="mu-section-label">
          RECORDING · <span className="mu-accent">{m.recording.format.toUpperCase()}</span>
        </p>
        <p className="mu-recording-desc">{m.recording.desc}</p>

        <p className="mu-section-label">HOW TO SUBMIT</p>
        <ol className="mu-steps">
          {SUBMISSION_STEPS.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        <div className="mu-form-col">
          <textarea
            className="mu-input mu-textarea"
            placeholder="Video link(s) — one per team, one per line (Drive, Veo, Hudl…)"
            value={state.subLink}
            onChange={(e) => update({ subLink: e.target.value })}
          />
          <input
            className="mu-input"
            type="date"
            value={state.subDate}
            onChange={(e) => update({ subDate: e.target.value })}
          />
          <textarea
            className="mu-input mu-textarea"
            placeholder="Context for the reviewer — age group, session objective, anything to watch for"
            value={state.subNotes}
            onChange={(e) => update({ subNotes: e.target.value })}
          />
          <button
            className={`mu-btn ${state.submitted ? "mu-btn-outline" : "mu-btn-solid"}`}
            onClick={() => update({ submitted: !state.submitted })}
          >
            {state.submitted ? "SUBMITTED ✓ — TAP TO REOPEN" : "MARK RECORDING SUBMITTED"}
          </button>
        </div>
      </div>

      {/* Team Bonding — coach-facing, Transformational Experience only */}
      {m.hasBonding && (
        <div className="mu-subbox">
          <p className="mu-section-label">TEAM BONDING</p>
          <p className="mu-recording-desc">
            List four team bonding events from this season — what it was, whether it worked, and why.
          </p>
          {bonding.map((entry, idx) => (
            <div key={idx} className="mu-bonding-entry">
              <p className="mu-bonding-num">EVENT {idx + 1}</p>
              <input
                className="mu-input"
                placeholder="What was it?"
                value={entry.what}
                onChange={(e) => setBonding(idx, { what: e.target.value })}
              />
              <div className="mu-effective-row">
                {["Effective", "Ineffective"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`mu-grade-chip ${entry.effective === opt ? "mu-grade-chip-active" : ""}`}
                    onClick={() => setBonding(idx, { effective: entry.effective === opt ? "" : opt })}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <textarea
                className="mu-input mu-textarea"
                placeholder="Why did it work — or why didn't it?"
                value={entry.why}
                onChange={(e) => setBonding(idx, { why: e.target.value })}
              />
            </div>
          ))}
        </div>
      )}

      {/* Evaluation — evaluator only */}
      {isAdmin && (
        <div className="mu-subbox mu-admin-box">
          <p className="mu-section-label">EVALUATION · EVALUATOR ONLY</p>

          {items.map((item) => (
            <RatingRow
              key={item.id}
              label={item.evalText}
              sublabel={item.verifiable ? " · verifiable" : undefined}
              value={itemGrades[item.id] ?? null}
              onChange={(v) => setItemGrade(item.id, v)}
            />
          ))}

          <p className="mu-section-label" style={{ marginTop: 16 }}>
            OVERALL
          </p>
          <div className="mu-grade-row">
            {GRADE_SCALE.map((g) => (
              <button
                key={g.value}
                className={`mu-grade-chip ${state.grade === g.value ? "mu-grade-chip-active" : ""}`}
                onClick={() => update({ grade: state.grade === g.value ? null : g.value })}
              >
                {g.value} · {g.label}
              </button>
            ))}
          </div>
          <textarea
            className="mu-input mu-textarea"
            placeholder="Evaluator feedback — strengths, growth areas, next steps"
            value={state.evalNotes}
            onChange={(e) => update({ evalNotes: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
