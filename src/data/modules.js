export const SEASON = "2026\u201327";

// Admin / evaluator accounts. Only these emails see the admin dashboard,
// the self-vs-evaluator gap view, and archetype assignment.
export const ADMIN_EMAILS = ["canellakish@gmail.com", "harry.canellakis@mdunitedfc.org"];

// Creator accounts. Only these emails can open modules marked draft: true —
// everyone else sees them listed but can't click into them yet.
export const CREATOR_EMAILS = ["canellakish@gmail.com", "harry.canellakis@mdunitedfc.org"];

export const GRADE_SCALE = [
  { value: 1, label: "Emerging", desc: "Early in development — needs structured support in this area." },
  { value: 2, label: "Developing", desc: "Applies the quality inconsistently — clear growth underway." },
  { value: 3, label: "Proficient", desc: "Meets the Maryland United standard consistently." },
  { value: 4, label: "Exemplary", desc: "Models the standard and can mentor other coaches." },
];

// How to submit a recording — shown in every rubric module's submission box.
export const SUBMISSION_STEPS = [
  "Open Google Drive using your Maryland United Google account.",
  "Upload your recording (or record straight into Drive from your phone).",
  'Right-click the file → Share → set access to "Anyone with the link" (Viewer).',
  "Copy the link and paste it below. Coaching more than one team? Paste one link per team, each on its own line.",
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
  // Module 3 — Set the Standard (Team Management)
  { id: "i1", module: "m3", coachText: "I clearly define and communicate expectations for behavior, effort, and conduct at the start of the season.", evalText: "Defines and communicates expectations for behavior, effort, and conduct at the start of the season." },
  { id: "i2", module: "m3", coachText: "I proactively communicate with parents rather than only reacting to their questions or concerns.", evalText: "Communicates with parents proactively rather than only reactively." },
  { id: "i3", module: "m3", coachText: "My scheduling, rosters, and season logistics are consistently well-organized.", evalText: "Scheduling, rosters, and season logistics are consistently well-organized." },
  { id: "i4", module: "m3", meta: true, coachText: "I stay composed and professional when parent or player conflicts arise.", evalText: "Stays composed and professional when parent or player conflicts arise." },
  { id: "i34", module: "m3", verifiable: true, coachText: "I manage PlayMetrics and double-check it for accuracy.", evalText: "Manages PlayMetrics and double-checks it for accuracy." },

  // Module 4 — Maryland United Game Model
  { id: "i5", module: "m4", coachText: "I can articulate our style of play in simple, memorable terms.", evalText: "Articulates the team's style of play in simple, memorable terms." },
  { id: "i6", module: "m4", coachText: "I present my Game Model to the team.", evalText: "Presents their Game Model to the team." },
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
   MODULE 2 — What Fills Your Bucket?
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
  {
    heading: "GOALS",
    questions: [
      { id: "b11", text: "Where do you want to be as a coach in five years?" },
      { id: "b12", text: "What's one goal you have for yourself this season that has nothing to do with wins or losses?" },
      { id: "b13", text: "What's something you haven't accomplished yet as a coach that you still want to?" },
    ],
  },
  {
    heading: "WHAT MAKES YOU TICK",
    questions: [
      { id: "b14", text: "What's a belief about coaching you hold strongly that not everyone agrees with?" },
      { id: "b15", text: "What did coaching give you that you didn't expect when you started?" },
      { id: "b16", text: "What's something about you your players would be surprised to learn?" },
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
   INTRO MODULE — onboarding content, stepped one section per screen.
----------------------------------------------------------------*/
export const INTRO_SECTIONS = [
  {
    heading: "INTRODUCTION TO PLATFORM",
    body: [
      "We ask our players to be developing all season — to work at the things they're not yet good at, to take feedback without flinching, to keep a plan and revisit it. This platform asks the same of us.",
      "Most coaching feedback happens by accident: a comment after a match, a conversation in a parking lot, a season that ends without anyone saying much at all. This replaces that with something deliberate. Over the year you'll work through eight qualities that define coaching at Maryland United, submit real footage of your actual coaching, and get specific feedback on each one.",
      "This is a development program, not a performance review. Nothing here decides who coaches what team. The point is to give you the same thing we try to give every player — a clear picture of where you are, and a specific idea of what to work on next.",
    ],
  },
  {
    heading: "COACHING EDUCATION AND EVALUATION PLATFORM",
    body: [
      "A club can't credibly claim to develop players while its coaches stand still. If we want players who are better in June than they were in August, the people teaching them have to be too. That's the whole idea here — coach development and player development as the same project, not separate ones.",
    ],
  },
  {
    heading: "THE EIGHT QUALITIES",
    list: [
      "Set the Standard",
      "Maryland United Game Model",
      "Analysis",
      "Maryland United Training Session",
      "Match Preparation & Execution",
      "Transformational Experience",
      "Individual Development",
      "Club Pathway",
    ],
    body: [
      "Every quality has specific sub-standards you'll be measured against. Nothing is hidden — you'll see the exact criteria before you're ever evaluated on them.",
    ],
  },
  {
    heading: "HOW THE YEAR WORKS",
    body: [
      "Modules run sequentially from August through June, roughly one a month. Each of the eight quality modules asks for a recorded submission — a parent meeting, a training session, a match day, a film session. You record it, link it, and add context on what you'd like the reviewer to notice.",
    ],
  },
  {
    heading: "HOW THE SCALE WORKS",
    scale: true,
    body: [
      "Three is the standard. Four isn't the expectation — it's what happens when a coach is ready to teach others. A 2 isn't a bad mark; it's a starting point with a direction attached. We'd rather see honest 2s that move than defensive 3s that don't.",
    ],
  },
  {
    heading: "WHAT WE ASK OF YOU",
    body: [
      "Submit real footage, not curated highlights. Rate yourself honestly — the gap between how you see yourself and how you're seen is the most useful thing this process produces, and it only works if you're candid. When feedback comes back, sit with it before responding to it.",
      "Over time, this becomes part of the fuller picture the club has of you as a coach — the same picture that naturally factors into staffing decisions down the line. It's not a scorecard, and it's not about any single form. Coaches who lean into this tend to be the coaches who lean into everything else here, and that shows.",
      "That's the ask. It's the same one we make of our players every week.",
    ],
  },
];

export const INTRO_NEXT = {
  heading: "WHAT COMES NEXT",
  body: "Module 2 asks you to rate yourself on the same criteria your evaluator will use, before any evaluation happens. Module 3 asks what actually drives you as a coach. Both take real time — do them when you can think, not between two other things.",
  cta: "Mark this as read to continue to Module 2.",
};

/* ---------------------------------------------------------------
   MODULES — sequential across the season, no fixed due dates.
----------------------------------------------------------------*/
export const MODULES = [
  {
    id: "intro",
    num: "01",
    window: "START HERE",
    kind: "intro",
    title: "Introduction to the Maryland United Coaching Excellence Platform",
    focus: "What this program is, how the year works, and what we're asking of you.",
  },
  {
    id: "m1",
    num: "02",
    window: "AUGUST",
    kind: "selfEval",
    title: "Self-Evaluation",
    focus: "Rate yourself against the same standards your evaluator will use — before they do.",
  },
  {
    id: "m2",
    num: "03",
    window: "AUGUST",
    kind: "bucket",
    title: "What Fills Your Bucket?",
    focus: "What drives you, what drains you, and what makes this job worth doing.",
  },
  {
    id: "meeting1",
    num: "04",
    window: "AUGUST",
    kind: "meeting",
    title: "1-on-1 Meeting",
    focus: "A private check-in with your evaluator to talk through your self-evaluation and bucket answers before the season gets going.",
  },
  {
    id: "m3",
    num: "05",
    window: "SEPTEMBER",
    kind: "rubric",
    title: "Set the Standard",
    focus: "Standards, communication, and organization that set the tone for the season.",
    recording: {
      format: "First parent meeting — one per team",
      desc: "Record your first parent meeting of the season for every team you coach. Before you record, put together a short agenda or presentation covering your core values — the things you want parents to know matter to you as a coach — and walk through it live during the meeting. If you coach more than one team, submit a separate link for each below.",
      tip: "Be concrete when you present — specifics build trust, vague reassurances don't. Say exactly what you'll do and what you expect, and don't promise anything you can't actually deliver. That's not the same as playing it safe: parents can tell the difference between a coach who's decisive and one who's hedging. Pick a position and hold it — nothing undercuts a first meeting faster than contradicting yourself twenty minutes in.",
      exampleUrl: "https://docs.google.com/presentation/d/1fOlaB8GfXE81QLNx7nN-yGB0K33yikcbs_P5tpCELl8/edit?slide=id.g18f4df606e3_0_16#slide=id.g18f4df606e3_0_16",
      exampleLabel: "View an example core values presentation",
      needsMaterialLink: true,
    },
    recording2: {
      format: "Standards meeting with players — office in Liberty, one per team",
      desc: "Record a standards meeting with your players, held in the office in Liberty, for every team you coach. Set expectations directly with the team — behavior, effort, and conduct for the season. If you coach more than one team, submit a separate link for each below.",
      tip: "It's your team to manage — this meeting is where that job starts. Ground it in the same three things we ask of every coach: commitment, courage, passion. Before you ask your players, answer it yourself: what does commitment look like to you? Then make the standard concrete, not just a feeling.",
      nonNegotiables: ["Training gear", "Attendance"],
    },
  },
  {
    id: "m4",
    num: "06",
    window: "SEPTEMBER",
    draft: true,
    kind: "rubric",
    title: "Maryland United Game Model",
    focus: "A clear, coachable identity for how your team plays — understood well enough to teach it off the field.",
    recording: {
      format: "Office meeting with tactical board",
      desc: "Record yourself presenting one aspect of your game model to the team using a tactical board. Record and submit.",
    },
  },
  {
    id: "m7",
    num: "07",
    window: "OCTOBER",
    draft: true,
    kind: "rubric",
    title: "Analysis",
    focus: "Scouting the opponent and turning that work into a prepared, clear-eyed team.",
    recording: {
      format: "Opponent scouting & prep session",
      desc: "Record a session where you prepare the team for a scouted opponent. Submit clips analyzing what worked (success) versus what didn't (failure). Follow up by bringing in video analysts with the team afterwards.",
    },
  },
  {
    id: "m5",
    num: "08",
    window: "NOVEMBER",
    draft: true,
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
    num: "09",
    window: "DECEMBER",
    draft: true,
    kind: "rubric",
    title: "Match Preparation & Execution",
    focus: "Game plans, team talks, and in-match decisions that give players clarity.",
    recording: {
      format: "Match day recording",
      desc: "Warm-up, pregame talk, halftime, and bench coaching across one competitive match.",
    },
  },
  {
    id: "midseason",
    num: "10",
    window: "JANUARY",
    draft: true,
    kind: "placeholder",
    title: "Midseason Feedback",
    focus: "TBD",
  },
  {
    id: "m9",
    num: "11",
    window: "JANUARY – FEBRUARY",
    draft: true,
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
    id: "m8",
    num: "12",
    window: "MARCH – APRIL",
    draft: true,
    kind: "rubric",
    title: "Individual Development",
    focus: "Every player has a plan, every plan stays current, and every plan gets real attention.",
    recording: {
      format: "Individual / small-group session",
      desc: "A 1-on-1 or small-group session built around specific player development targets.",
    },
  },
  {
    id: "m10",
    num: "13",
    window: "MAY – JUNE",
    draft: true,
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

// Schedule shown above the module list — same modules, two tracks by team
// age (see src/data/teams.js). Dates confirmed so far only cover the
// U9-U14 track for Modules 1-5; U15-U19 dates aren't set yet, so they're
// TBD across the board (default fallback in CoachingEvaluation.jsx).
export const SCHEDULE_DATES = {
  intro: { young: "AUG 10" },
  m1: { young: "AUG 10" },
  m2: { young: "AUG 10" },
  meeting1: { young: "AUG 10" },
  m3: { young: "AUG 20" },
};

// Evaluator-set completion status per module, separate from the coach's own
// "submitted" toggle — this is the evaluator's call, not the coach's.
export const STATUS_OPTIONS = [
  { value: "complete", label: "COMPLETE" },
  { value: "incomplete", label: "INCOMPLETE (LATE)" },
];

export const emptyModuleState = () => ({
  grade: null,
  status: null,
  evalNotes: "",
  submitted: false,
  subDate: "",
  subLink: "",
  subMaterialLink: "",
  subNotes: "",
  // Second recording — only used by modules with a `recording2` requirement.
  submitted2: false,
  sub2Date: "",
  sub2Link: "",
  sub2Notes: "",
  itemGrades: {}, // evaluator's per-item 1-4 ratings, keyed by item id
});

export const emptyBonding = () => [0, 1, 2, 3].map(() => ({ what: "", effective: "", why: "" }));

export const defaultData = (coachName = "") => ({
  coachName,
  lastOpenId: null,
  intro: { read: false },
  meeting: { completed: false },
  selfEval: { ratings: {}, meta: {}, reflections: {}, submitted: false },
  bucket: { answers: {}, submitted: false },
  bonding: emptyBonding(),
  modules: Object.fromEntries(RUBRIC_MODULES.map((m) => [m.id, emptyModuleState()])),
});
