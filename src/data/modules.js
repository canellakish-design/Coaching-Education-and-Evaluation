export const SEASON = "2026\u201327";

// Admin / evaluator accounts. Only these emails see the admin dashboard,
// the self-vs-evaluator gap view, and archetype assignment.
export const ADMIN_EMAILS = ["canellakish@gmail.com"];

export const GRADE_SCALE = [
  { value: 1, label: "Emerging", desc: "Early in development — needs structured support in this area." },
  { value: 2, label: "Developing", desc: "Applies the quality inconsistently — clear growth underway." },
  { value: 3, label: "Proficient", desc: "Meets the Maryland United standard consistently." },
  { value: 4, label: "Exemplary", desc: "Models the standard and can mentor other coaches." },
];

/* ---------------------------------------------------------------
   RUBRIC ITEMS
   Each item is rated twice: once by the coach in Module 1 (coachText),
   once by the evaluator in the matching rubric module (evalText).
   Same construct, same 1-4 anchors — that pairing is what makes the
   self-vs-evaluator gap meaningful.
   meta: true  -> also asks "how do you think your players would rate you?"
   verifiable: true -> objectively checkable, not a judgment call
----------------------------------------------------------------*/
export const RUBRIC_ITEMS = [
  // Module 3 — Team Management
  { id: "i1", module: "m3", coachText: "I clearly define and communicate expectations for behavior, effort, and conduct at the start of the season.", evalText: "Defines and communicates expectations for behavior, effort, and conduct at the start of the season." },
  { id: "i2", module: "m3", coachText: "I proactively communicate with parents rather than only reacting to their questions or concerns.", evalText: "Communicates with parents proactively rather than only reactively." },
  { id: "i3", module: "m3", coachText: "My scheduling, rosters, and season logistics are consistently well-organized.", evalText: "Scheduling, rosters, and season logistics are consistently well-organized." },
  { id: "i4", module: "m3", meta: true, coachText: "I stay composed and professional when parent or player conflicts arise.", evalText: "Stays composed and professional when parent or player conflicts arise." },

  // Module 4 — Game Model
  { id: "i5", module: "m4", coachText: "I can articulate our style of play in simple, memorable terms.", evalText: "Articulates the team's style of play in simple, memorable terms." },
  { id: "i6", module: "m4", coachText: "I regularly connect training activities back to our game model.", evalText: "Connects training activities back to the game model." },
  { id: "i7", module: "m4", meta: true, coachText: "My players can explain our game model in their own words.", evalText: "Players can explain the game model in their own words." },
  { id: "i8", module: "m4", coachText: "I adjust our game model based on personnel and opponent without losing our core identity.", evalText: "Adjusts the game model for personnel and opponent without losing core identity." },

  // Module 5 — Maryland United Training Session
  { id: "i9", module: "m5", coachText: "My sessions are purposefully sequenced with clear objectives.", evalText: "Sessions are purposefully sequenced with clear objectives." },
  { id: "i10", module: "m5", coachText: "I minimize standing in lines and maximize touches and reps.", evalText: "Minimizes lines; maximizes touches and reps." },
  { id: "i11", module: "m5", meta: true, coachText: "I create a training environment where players feel safe to make mistakes.", evalText: "Creates an environment where players are willing to risk mistakes." },
  { id: "i12", module: "m5", coachText: "My coaching points are timely and specific — not constant or vague.", evalText: "Coaching points are timely and specific rather than constant or vague." },

  // Module 6 — Match Preparation & Execution
  { id: "i13", module: "m6", coachText: "My pregame plan is specific to the opponent, not generic.", evalText: "Pregame plan is opponent-specific rather than generic." },
  { id: "i14", module: "m6", coachText: "My team talks are clear, concise, and player-focused.", evalText: "Team talks are clear, concise, and player-focused." },
  { id: "i15", module: "m6", coachText: "I make timely, well-reasoned adjustments during matches.", evalText: "Makes timely, well-reasoned in-match adjustments." },
  { id: "i16", module: "m6", meta: true, coachText: "I stay level-headed and set the emotional tone on the sideline.", evalText: "Stays level-headed and sets the emotional tone on the sideline." },

  // Module 7 — Analysis
  { id: "i17", module: "m7", coachText: "I do thorough, specific prep on opponent tendencies.", evalText: "Opponent prep is thorough and specific to tendencies." },
  { id: "i18", module: "m7", coachText: "My video clips are purposeful, not just a highlight reel.", evalText: "Clips are purposeful and thematic, not a highlight reel." },
  { id: "i19", module: "m7", meta: true, coachText: "My players participate actively in analysis sessions rather than just watching.", evalText: "Players participate actively in analysis rather than passively watching." },
  { id: "i20", module: "m7", coachText: "I connect analysis findings back into training and match plans.", evalText: "Connects analysis findings back into training and match plans." },

  // Module 8 — Individual Development
  { id: "i21", module: "m8", verifiable: true, coachText: "Every player has a specific, written development plan.", evalText: "Every player has a specific, written development plan." },
  { id: "i22", module: "m8", verifiable: true, coachText: "I keep each player's IDP updated regularly throughout the season, not just at the start.", evalText: "Player IDPs are updated regularly throughout the season, not just at the start." },
  { id: "i23", module: "m8", coachText: "I differentiate my coaching and feedback by player.", evalText: "Differentiates coaching and feedback by player." },
  { id: "i24", module: "m8", meta: true, coachText: "I make time for individual attention even during busy stretches.", evalText: "Makes time for individual attention even during busy stretches." },
  { id: "i25", module: "m8", coachText: "I track and revisit individual player progress over time.", evalText: "Tracks and revisits individual player progress over time." },

  // Module 9 — Transformational Experience
  { id: "i26", module: "m9", coachText: "I know my players as people, not just athletes.", evalText: "Knows players as people, not just athletes." },
  { id: "i27", module: "m9", coachText: "I intentionally create moments that build team culture and identity.", evalText: "Intentionally creates moments that build team culture and identity." },
  { id: "i28", module: "m9", meta: true, coachText: "My players leave interactions with me feeling built up, not diminished.", evalText: "Players leave interactions feeling built up, not diminished." },
  { id: "i29", module: "m9", coachText: "I model the standards and values I ask of my players.", evalText: "Models the standards and values asked of players." },

  // Module 10 — Club Pathway
  { id: "i30", module: "m10", coachText: "I give honest, well-prepared end-of-season reviews to players and families.", evalText: "End-of-season reviews are honest and well-prepared." },
  { id: "i31", module: "m10", coachText: "I understand club pathway options well enough to guide families.", evalText: "Understands club pathway options well enough to guide families." },
  { id: "i32", module: "m10", coachText: "I actively advocate for my players' next steps within the club.", evalText: "Advocates for players' next steps within the club." },
  { id: "i33", module: "m10", meta: true, coachText: "I communicate pathway conversations early enough to avoid surprises.", evalText: "Communicates pathway conversations early enough to avoid surprises." },
];

export const itemsForModule = (moduleId) => RUBRIC_ITEMS.filter((i) => i.module === moduleId);
export const META_ITEMS = RUBRIC_ITEMS.filter((i) => i.meta);

/* ---------------------------------------------------------------
   MODULE 1 — reflection prompts
----------------------------------------------------------------*/
export const REFLECTION_PROMPTS = [
  { id: "r1", text: "What's one piece of feedback you've received that surprised you?" },
  { id: "r2", text: "What would you most want to improve this season, and why that?" },
];

/* ---------------------------------------------------------------
   MODULE 2 — What Fills Your Bucket??
----------------------------------------------------------------*/
export const BUCKET_SECTIONS = [
  {
    heading: "THE CORE",
    questions: [
      { id: "b1", text: "Think about a drive home last season when you felt genuinely energized. What had just happened?" },
      { id: "b2", text: "Now the opposite — a drive home where you felt drained or flat. What was that about?" },
      { id: "b3", text: "What part of this job would you keep doing even if no one noticed and no one thanked you for it?" },
      { id: "b4", text: "What part do you find yourself putting off, or getting through as fast as possible?" },
    ],
  },
  {
    heading: "WHAT SUCCESS LOOKS LIKE TO YOU",
    questions: [
      { id: "b5", text: "When a player you've coached succeeds, what kind of success makes you proudest?" },
      { id: "b6", text: "If results were taken off the table entirely, what would make a season feel successful?" },
      { id: "b7", text: "What do you want your players saying about you ten years from now?" },
    ],
  },
  {
    heading: "THE HARDER QUESTIONS",
    questions: [
      { id: "b8", text: "What's the hardest part of coaching for you personally — not the most irritating, the hardest?" },
      { id: "b9", text: "If you could permanently hand off one responsibility, what would it be? What would you take on instead?" },
      { id: "b10", text: "Name a coach you admire and what specifically about them." },
    ],
  },
];

export const BUCKET_QUESTIONS = BUCKET_SECTIONS.flatMap((s) => s.questions);

/* ---------------------------------------------------------------
   COACH ARCHETYPES — internal / evaluator-facing only.
   A coaching-style vocabulary, not a clinical assessment.
   Assigned by the evaluator after reading Module 2 responses.
----------------------------------------------------------------*/
export const ARCHETYPES = [
  {
    id: "tactician",
    name: "The Tactician",
    strength: "Game plans, structure, and tactical clarity. Players know exactly what the plan is.",
    blindSpots: ["Culture-building and relationship depth take a back seat to the plan"],
  },
  {
    id: "motivator",
    name: "The Motivator",
    strength: "Energy, belief, and buy-in. Gets more out of players than the roster suggests.",
    blindSpots: [
      "Leans on emotion over structure — tactical detail can feel like an afterthought",
      "Struggles to deliver hard, honest feedback; prioritizes keeping spirits up over naming real problems",
    ],
  },
  {
    id: "mentor",
    name: "The Mentor",
    strength: "Individual relationships and long-horizon player development.",
    blindSpots: [
      "Avoids tough accountability conversations — protects the relationship over pushing the player",
      "Team-wide tactical cohesion can suffer from an individual-first focus",
    ],
  },
  {
    id: "competitor",
    name: "The Competitor",
    strength: "Drive, in-game execution, and a winning mentality that raises the room.",
    blindSpots: [
      "Over-indexes on results over process — development takes a back seat to winning now",
      "Can burn players out by not reading when to ease off",
    ],
  },
  {
    id: "culture_builder",
    name: "The Culture Builder",
    strength: "Team identity, belonging, and standards that hold when the coach isn't watching.",
    blindSpots: ["Under-invests in their own continued growth and development as a coach"],
  },
  {
    id: "analyst",
    name: "The Analyst",
    strength: "Preparation, detail, and evidence. Nothing is left to guesswork.",
    blindSpots: [
      "Over-plans and under-reacts — struggles to read the room and adjust emotionally in the moment",
      "Relationship-building and culture get neglected in favor of the data",
    ],
  },
];

/* ---------------------------------------------------------------
   MODULES — sequential across the season, no fixed due dates.
----------------------------------------------------------------*/
export const MODULES = [
  {
    id: "m1",
    num: "01",
    window: "AUGUST",
    kind: "selfEval",
    title: "Self-Evaluation of the Key Qualities of a Maryland United Coach",
    focus: "Rate yourself against the same standards your evaluator will use — before they do.",
  },
  {
    id: "m2",
    num: "02",
    window: "AUGUST",
    kind: "bucket",
    title: "What Fills Your Bucket??",
    focus: "What drives you, what drains you, and what makes this job worth doing.",
  },
  {
    id: "m3",
    num: "03",
    window: "SEPTEMBER",
    kind: "rubric",
    title: "Team Management",
    focus: "Standards, communication, and organization that set the tone for the season.",
    recording: {
      format: "First parent meeting",
      desc: "Record your first parent meeting of the season. Record and submit.",
    },
  },
  {
    id: "m4",
    num: "04",
    window: "SEPTEMBER",
    kind: "rubric",
    title: "Game Model",
    focus: "A clear, coachable identity for how your team plays — understood well enough to teach it off the field.",
    recording: {
      format: "Office meeting with tactical board",
      desc: "Record yourself presenting one aspect of your game model to the team using a tactical board. Record and submit.",
    },
  },
  {
    id: "m5",
    num: "05",
    window: "OCTOBER",
    kind: "rubric",
    title: "Maryland United Training Session",
    focus: "Sessions that are safe, demanding, and full of touches, decisions, and joy.",
    recording: {
      format: "Full team training session",
      desc: "An unedited team session from arrival to close, including your coaching interventions.",
    },
  },
  {
    id: "m6",
    num: "06",
    window: "NOVEMBER",
    kind: "rubric",
    title: "Match Preparation & Execution",
    focus: "Game plans, team talks, and in-match decisions that give players clarity.",
    recording: {
      format: "Match day recording",
      desc: "Warm-up, pregame talk, halftime, and bench coaching across one competitive match.",
    },
  },
  {
    id: "m7",
    num: "07",
    window: "DECEMBER – JANUARY",
    kind: "rubric",
    title: "Analysis",
    focus: "Scouting the opponent and turning that work into a prepared, clear-eyed team.",
    recording: {
      format: "Opponent scouting & prep session",
      desc: "Record a session where you prepare the team for a scouted opponent. Submit clips analyzing what worked (success) versus what didn't (failure). Follow up by bringing in video analysts with the team afterwards.",
    },
  },
  {
    id: "m8",
    num: "08",
    window: "FEBRUARY",
    kind: "rubric",
    title: "Individual Development",
    focus: "Every player has a plan, every plan stays current, and every plan gets real attention.",
    recording: {
      format: "Individual / small-group session",
      desc: "A 1-on-1 or small-group session built around specific player development targets.",
    },
  },
  {
    id: "m9",
    num: "09",
    window: "MARCH – APRIL",
    kind: "rubric",
    title: "Transformational Experience",
    focus: "Coaching that shapes people, not just players — culture, character, connection.",
    hasBonding: true,
    recording: {
      format: "Player check-in / culture moment",
      desc: "A recorded player check-in conversation or a team culture activity you lead.",
    },
  },
  {
    id: "m10",
    num: "10",
    window: "MAY – JUNE",
    kind: "rubric",
    title: "Club Pathway",
    focus: "Guiding players and families through what comes next at Maryland United.",
    recording: {
      format: "End-of-season pathway meeting",
      desc: "A player/family review meeting covering the season and the road ahead.",
    },
  },
];

export const RUBRIC_MODULES = MODULES.filter((m) => m.kind === "rubric");

export const emptyModuleState = () => ({
  grade: null,
  evalNotes: "",
  submitted: false,
  subDate: "",
  subLink: "",
  subNotes: "",
  itemGrades: {}, // evaluator's per-item 1-4 ratings, keyed by item id
});

export const emptyBonding = () => [0, 1, 2, 3].map(() => ({ what: "", effective: "", why: "" }));

export const defaultData = (coachName = "") => ({
  coachName,
  selfEval: { ratings: {}, meta: {}, reflections: {}, submitted: false },
  bucket: { answers: {}, submitted: false },
  bonding: emptyBonding(),
  modules: Object.fromEntries(RUBRIC_MODULES.map((m) => [m.id, emptyModuleState()])),
});
