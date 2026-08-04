export default function OneOnOneModule({ state, update }) {
  const { completed } = state;

  return (
    <>
      <p className="mu-focus">
        Schedule a private kickoff meeting with your evaluator before the season gets going — what to
        expect, what's ahead, and a chance to ask questions. This is where you get real, spoken
        feedback — nothing written here, just a conversation.
      </p>

      <button
        className={`mu-btn ${completed ? "mu-btn-outline" : "mu-btn-solid"}`}
        onClick={() => update({ completed: !completed })}
      >
        {completed ? "MEETING COMPLETED ✓ — TAP TO REOPEN" : "MARK MEETING COMPLETED"}
      </button>
    </>
  );
}
