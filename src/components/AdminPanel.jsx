import { useState } from "react";
import { RUBRIC_ITEMS, RUBRIC_CATEGORIES, ARCHETYPES, BUCKET_SECTIONS } from "../data/modules";
import RatingRow from "./RatingRow";

/* Self-vs-evaluator gap analysis, the central coaching rubric grading
   surface, and archetype assignment. Visible only to evaluator accounts. */
export default function AdminPanel({ data, archetype, setArchetype, addNote, updateEvalRatings }) {
  const [tab, setTab] = useState("gap");
  const [draftNote, setDraftNote] = useState("");
  const [sending, setSending] = useState(false);

  const sendNote = async () => {
    const text = draftNote.trim();
    if (!text) return;
    setSending(true);
    try {
      await addNote(text);
      setDraftNote("");
    } finally {
      setSending(false);
    }
  };

  const selfRatings = data.selfEval?.ratings || {};
  const evalRatings = data.evalRatings || {};
  const setEvalRating = (id, v) => updateEvalRatings({ [id]: v });

  const rows = RUBRIC_ITEMS.map((item) => {
    const self = selfRatings[item.id] ?? null;
    const selfNum = typeof self === "number" ? self : null;
    const evaluator = evalRatings[item.id] ?? null;
    const gap = selfNum != null && typeof evaluator === "number" ? selfNum - evaluator : null;
    return { item, self, evaluator, gap };
  });

  const scored = rows.filter((r) => r.gap != null);
  const sorted = [...scored].sort((a, b) => Math.abs(b.gap) - Math.abs(a.gap));
  const avgGap = scored.length
    ? (scored.reduce((s, r) => s + r.gap, 0) / scored.length).toFixed(2)
    : null;

  const categoryName = (id) => RUBRIC_CATEGORIES.find((c) => c.id === id)?.name || id;
  const selected = ARCHETYPES.find((a) => a.id === archetype?.id);

  return (
    <section className="mu-admin-panel">
      <p className="mu-eyebrow">EVALUATOR VIEW · NOT VISIBLE TO COACHES</p>

      <div className="mu-tabs">
        {[
          ["gap", "Self vs. Evaluator"],
          ["rubric", "Coaching Rubric"],
          ["bucket", "What Drives You"],
          ["archetype", "Archetype"],
          ["notes", "Notes"],
        ].map(([id, label]) => (
          <button
            key={id}
            className={`mu-tab ${tab === id ? "is-active" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "gap" && (
        <div>
          {scored.length === 0 ? (
            <p className="mu-muted mu-empty">
              No comparisons yet. Gaps appear once the coach has submitted their self-evaluation and
              you've rated the matching items in the rubric modules.
            </p>
          ) : (
            <>
              <p className="mu-gap-summary">
                <strong className="mu-accent">{scored.length}</strong> items compared · average gap{" "}
                <strong className={avgGap > 0 ? "mu-over" : avgGap < 0 ? "mu-under" : ""}>
                  {avgGap > 0 ? `+${avgGap}` : avgGap}
                </strong>{" "}
                <span className="mu-muted">(positive = rates self higher than you do)</span>
              </p>
              <table className="mu-gap-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Self</th>
                    <th>You</th>
                    <th>Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((r) => (
                    <tr key={r.item.id}>
                      <td>
                        <span className="mu-gap-module">{categoryName(r.item.category)}</span>
                        {r.item.evalText}
                      </td>
                      <td className="mu-num">{r.self}</td>
                      <td className="mu-num">{r.evaluator}</td>
                      <td
                        className={`mu-num ${r.gap > 0 ? "mu-over" : r.gap < 0 ? "mu-under" : ""}`}
                      >
                        {r.gap > 0 ? `+${r.gap}` : r.gap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      {tab === "rubric" && (
        <div>
          <p className="mu-muted mu-empty">
            The same 20-item coaching rubric the coach rated themselves on in Module 1 — rate them
            here, once, centrally. These ratings drive the Self vs. Evaluator gap above.
          </p>
          {RUBRIC_CATEGORIES.map((cat) => (
            <div className="mu-subbox" key={cat.id}>
              <p className="mu-section-label">{cat.name.toUpperCase()}</p>
              {cat.items.map((item) => (
                <RatingRow
                  key={item.id}
                  label={item.evalText}
                  value={evalRatings[item.id] ?? null}
                  onChange={(v) => setEvalRating(item.id, v)}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "bucket" && (
        <div>
          {BUCKET_SECTIONS.map((section) => (
            <div key={section.heading} className="mu-bucket-read">
              <p className="mu-section-label">{section.heading}</p>
              {section.questions.map((q) => (
                <div key={q.id} className="mu-qa">
                  <p className="mu-qa-q">{q.text}</p>
                  <p className="mu-qa-a">
                    {data.bucket?.answers?.[q.id] || <span className="mu-muted">— no response —</span>}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {tab === "archetype" && (
        <div>
          <p className="mu-muted mu-empty">
            A coaching-style vocabulary for framing feedback — not a clinical assessment. Assign
            after reading the bucket responses.
          </p>
          <div className="mu-archetype-grid">
            {ARCHETYPES.map((a) => (
              <button
                key={a.id}
                className={`mu-archetype-card ${archetype?.id === a.id ? "is-active" : ""}`}
                onClick={() =>
                  setArchetype({ ...archetype, id: archetype?.id === a.id ? null : a.id })
                }
              >
                {a.name}
              </button>
            ))}
          </div>

          {selected && (
            <div className="mu-subbox">
              <p className="mu-section-label">{selected.name.toUpperCase()}</p>
              <p className="mu-qa-a">
                <strong className="mu-accent">Strength.</strong> {selected.strength}
              </p>
              <p className="mu-section-label" style={{ marginTop: 12 }}>
                WATCH FOR
              </p>
              <ul className="mu-ul">
                {selected.blindSpots.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mu-field">
            <label className="mu-field-label">
              Your reasoning — what in their responses points here?
            </label>
            <textarea
              className="mu-input mu-textarea"
              value={archetype?.notes || ""}
              onChange={(e) => setArchetype({ ...archetype, notes: e.target.value })}
            />
          </div>
        </div>
      )}

      {tab === "notes" && (
        <div>
          <p className="mu-muted mu-empty">
            Unlike the other tabs, the coach sees these — send an observation, feedback, or anything
            else. If the email extension is set up, they'll also get it in their inbox.
          </p>

          <div className="mu-field">
            <label className="mu-field-label">New note</label>
            <textarea
              className="mu-input mu-textarea"
              placeholder="Write a note for this coach…"
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
            />
            <button
              className="mu-btn mu-btn-solid"
              style={{ marginTop: 8 }}
              disabled={!draftNote.trim() || sending}
              onClick={sendNote}
            >
              {sending ? "SENDING…" : "SEND NOTE"}
            </button>
          </div>

          <p className="mu-section-label" style={{ marginTop: 20 }}>
            HISTORY
          </p>
          {!data.notes || data.notes.length === 0 ? (
            <p className="mu-muted mu-empty">No notes sent to this coach yet.</p>
          ) : (
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
          )}
        </div>
      )}
    </section>
  );
}
