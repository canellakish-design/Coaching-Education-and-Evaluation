import { GRADE_SCALE } from "../data/modules";

export default function RatingRow({ label, value, onChange, sublabel, allowNA }) {
  return (
    <div className="mu-rating-row">
      <p className="mu-rating-label">
        {label}
        {sublabel && <span className="mu-rating-sublabel">{sublabel}</span>}
      </p>
      <div className="mu-rating-chips">
        {GRADE_SCALE.map((g) => (
          <button
            key={g.value}
            type="button"
            title={`${g.value} — ${g.label}`}
            className={`mu-rating-chip ${value === g.value ? "is-active" : ""}`}
            onClick={() => onChange(value === g.value ? null : g.value)}
          >
            {g.value}
          </button>
        ))}
        {allowNA && (
          <button
            type="button"
            title="Not applicable"
            className={`mu-rating-chip mu-rating-chip-na ${value === "N/A" ? "is-active" : ""}`}
            onClick={() => onChange(value === "N/A" ? null : "N/A")}
          >
            N/A
          </button>
        )}
      </div>
    </div>
  );
}
