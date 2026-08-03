import {
  RUBRIC_MODULES,
  itemsForModule,
  REFLECTION_PROMPTS,
  GRADE_SCALE,
} from "../data/modules";
import RatingRow from "./RatingRow";

export default function SelfEvalModule({ state, update }) {
  const { ratings = {}, meta = {}, reflections = {}, submitted } = state;

  const setRating = (id, v) => update({ ratings: { ...ratings, [id]: v } });
  const setMeta = (id, v) => update({ meta: { ...meta, [id]: v } });
  const setReflection = (id, v) => update({ reflections: { ...reflections, [id]: v } });

  const totalItems = RUBRIC_MODULES.reduce((n, m) => n + itemsForModule(m.id).length, 0);
  const done = Object.values(ratings).filter(Boolean).length;

  return (
    <div className="mu-card-body">
      <p className="mu-focus">
        Rate yourself on each quality using the same 1–4 scale your evaluator will use. Answer
        honestly — the value here comes from comparing your view against theirs, not from a high score.
      </p>

      <div className="mu-scale-inline">
        {GRADE_SCALE.map((g) => (
          <span key={g.value}>
            <strong className="mu-accent">{g.value}</strong> {g.label}
          </span>
        ))}
      </div>

      <p className="mu-progress-inline">
        {done} of {totalItems} rated
      </p>

      {RUBRIC_MODULES.map((m) => (
        <div className="mu-subbox" key={m.id}>
          <p className="mu-section-label">{m.title.toUpperCase()}</p>
          {itemsForModule(m.id).map((item) => (
            <div key={item.id}>
              <RatingRow
                label={item.coachText}
                value={ratings[item.id] ?? null}
                onChange={(v) => setRating(item.id, v)}
                allowNA
              />
              {item.meta && (
                <RatingRow
                  label="How do you think your players would rate you on this?"
                  sublabel=" "
                  value={meta[item.id] ?? null}
                  onChange={(v) => setMeta(item.id, v)}
                  allowNA
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <div className="mu-subbox">
        <p className="mu-section-label">REFLECTION</p>
        {REFLECTION_PROMPTS.map((p) => (
          <div key={p.id} className="mu-field">
            <label className="mu-field-label">{p.text}</label>
            <textarea
              className="mu-input mu-textarea"
              value={reflections[p.id] || ""}
              onChange={(e) => setReflection(p.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        className={`mu-btn ${submitted ? "mu-btn-outline" : "mu-btn-solid"}`}
        onClick={() => update({ submitted: !submitted })}
      >
        {submitted ? "SUBMITTED ✓ — TAP TO REOPEN" : "SUBMIT SELF-EVALUATION"}
      </button>
    </div>
  );
}
