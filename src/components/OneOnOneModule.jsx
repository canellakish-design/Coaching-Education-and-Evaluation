export default function OneOnOneModule({ state, update }) {
  const { completed } = state;

  return (
    <div className="mu-card-body">
      <p className="mu-focus">
        Schedule a private 1-on-1 with your evaluator to talk through your self-evaluation and bucket
        answers before the season gets going. This is where you get real, spoken feedback — nothing
        written here, just a conversation.
      </p>

      <button
        className={`mu-btn ${completed ? "mu-btn-outline" : "mu-btn-solid"}`}
        onClick={() => update({ completed: !completed })}
      >
        {completed ? "MEETING COMPLETED ✓ — TAP TO REOPEN" : "MARK MEETING COMPLETED"}
      </button>
    </div>
  );
}
