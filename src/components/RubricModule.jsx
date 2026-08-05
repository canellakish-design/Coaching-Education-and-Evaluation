import { GRADE_SCALE, STATUS_OPTIONS, SUBMISSION_STEPS } from "../data/modules";

export default function RubricModule({ module: m, state, update, bonding, setBonding, isAdmin }) {
  return (
    <div className="mu-card-body">
      <p className="mu-focus">{m.focus}</p>
      {m.standardNote && <p className="mu-recording-tip">{m.standardNote}</p>}

      {/* Resources — coach-facing */}
      {m.resources && (
        <div className="mu-subbox">
          <p className="mu-section-label">RESOURCES · WHAT TO PULL FROM</p>
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

      {/* Recording submission — coach-facing */}
      <div className="mu-subbox">
        <p className="mu-section-label">
          RECORDING · <span className="mu-accent">{m.recording.format.toUpperCase()}</span>
        </p>
        <p className="mu-recording-desc">{m.recording.desc}</p>
        {m.recording.exampleUrl && (
          <a
            className="mu-example-link"
            href={m.recording.exampleUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {m.recording.exampleLabel || "View example"} ↗
          </a>
        )}
        {m.recording.tip && <p className="mu-recording-tip">{m.recording.tip}</p>}

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
          {m.recording.needsMaterialLink && (
            <input
              className="mu-input"
              placeholder="Link to the agenda or presentation you used (Drive, Google Slides…)"
              value={state.subMaterialLink || ""}
              onChange={(e) => update({ subMaterialLink: e.target.value })}
            />
          )}
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

      {/* Second recording submission — coach-facing, only when the module needs two */}
      {m.recording2 && (
        <div className="mu-subbox">
          <p className="mu-section-label">
            RECORDING · <span className="mu-accent">{m.recording2.format.toUpperCase()}</span>
          </p>
          <p className="mu-recording-desc">{m.recording2.desc}</p>
          {m.recording2.tip && <p className="mu-recording-tip">{m.recording2.tip}</p>}
          {m.recording2.nonNegotiables && (
            <>
              <p className="mu-section-label">NON-NEGOTIABLES</p>
              <ul className="mu-ul">
                {m.recording2.nonNegotiables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}

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
              value={state.sub2Link}
              onChange={(e) => update({ sub2Link: e.target.value })}
            />
            <textarea
              className="mu-input mu-textarea"
              placeholder="Context for the reviewer — age group, session objective, anything to watch for"
              value={state.sub2Notes}
              onChange={(e) => update({ sub2Notes: e.target.value })}
            />
            <button
              className={`mu-btn ${state.submitted2 ? "mu-btn-outline" : "mu-btn-solid"}`}
              onClick={() => update({ submitted2: !state.submitted2 })}
            >
              {state.submitted2 ? "SUBMITTED ✓ — TAP TO REOPEN" : "MARK RECORDING SUBMITTED"}
            </button>
          </div>
        </div>
      )}

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

      {/* Reflect — coach-facing */}
      {m.reflectPrompts && (
        <div className="mu-subbox">
          <p className="mu-section-label">REFLECT · BEFORE YOU MOVE ON</p>
          <ol className="mu-reflect">
            {m.reflectPrompts.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Evaluation — evaluator only */}
      {isAdmin && (
        <div className="mu-subbox mu-admin-box">
          <p className="mu-section-label">EVALUATION · EVALUATOR ONLY</p>

          <p className="mu-section-label" style={{ marginTop: 0 }}>
            STATUS
          </p>
          <div className="mu-grade-row">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                className={`mu-grade-chip ${state.status === s.value ? "mu-grade-chip-active" : ""}`}
                onClick={() => update({ status: state.status === s.value ? null : s.value })}
              >
                {s.label}
              </button>
            ))}
          </div>

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
        </div>
      )}
    </div>
  );
}
