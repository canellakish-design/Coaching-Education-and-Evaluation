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
   Each item is rated twice: once by the coach in the Self-Evaluation step
   of Module 1 (coachText),
   once by the evaluator in the matching rubric module (evalText).
   Same construct, same 1-4 anchors — that pairing is what makes the
   self-vs-evaluator gap meaningful.
   meta: true  -> also asks "how do you think your players would rate you?"
   verifiable: true -> objectively checkable, not a judgment call
----------------------------------------------------------------*/
export const RUBRIC_ITEMS = [
  // Module 2 — Set the Standard
  { id: "i1", module: "m3", coachText: "The Set the Standard meeting has happened with my team, and my players can repeat the non-negotiables.", evalText: "The Set the Standard meeting has happened, and players can repeat the non-negotiables." },
  { id: "i2", module: "m3", coachText: "The visible habits hold without me — gear, early arrival, phones away, walking out together.", evalText: "The visible habits hold without the coach present — gear, early arrival, phones away, walking out together." },
  { id: "i3", module: "m3", coachText: "My language is consistent daily — effort, encouragement, we over me — and I correct silence like a technical mistake.", evalText: "Language is consistent daily — effort, encouragement, we over me — and silence gets corrected like a technical mistake." },
  { id: "i4", module: "m3", coachText: "My players police the standard themselves, and recognition runs on a rhythm.", evalText: "Players police the standard themselves; recognition runs on a rhythm." },
  { id: "i41", module: "m3", coachText: "I'm organized — brief, consistent in-person team meetings, and planning through the bi-weekly coaches' meetings.", evalText: "Organized: brief, consistent in-person team meetings; planning through the bi-weekly coaches' meetings." },
  { id: "i34", module: "m3", verifiable: true, coachText: "I manage PlayMetrics and double-check it for accuracy.", evalText: "Manages PlayMetrics and double-checks it for accuracy." },
  { id: "i35", module: "m3", coachText: "I check my email regularly.", evalText: "Checks email regularly." },
  { id: "i36", module: "m3", coachText: "I respond to messages in a timely manner.", evalText: "Responds to messages in a timely manner." },
  { id: "i37", module: "m3", coachText: "I contact the appropriate person on technical staff for the task at hand.", evalText: "Contacts the appropriate person on technical staff for the task at hand." },

  // Module 3 — Program Game Model
  { id: "i5", module: "m4", coachText: "I can state our identity in one sentence — and so can my players.", evalText: "Can state the identity in one sentence — and so can their players." },
  { id: "i6", module: "m4", coachText: "My team deck is complete — building vs a front 1/2/3, pressing vs a back four and back three, creation patterns #1–#3.", evalText: "Team deck is complete: building vs a front 1/2/3, pressing vs a back four and back three, creation patterns #1–#3." },
  { id: "i7", module: "m4", coachText: "My coaching points are written as IF/THEN sub-principles in game-model language.", evalText: "Coaching points are written as IF/THEN sub-principles in game-model language." },
  { id: "i8", module: "m4", coachText: "My players' turnovers show the model — press-or-cover decisions happen without prompting.", evalText: "Turnovers show the model: press-or-cover decisions happen without prompting." },
  { id: "i42", module: "m4", coachText: "My team's identity survives a formation change — principles first, shape second.", evalText: "The identity survives a formation change — principles first, shape second." },

  // Module 4 — Girls Program Technical Plan
  { id: "i43", module: "technicalPlan", coachText: "My current cycle traces to a game-model principle by name — I can say which and why.", evalText: "Current cycle traces to a game-model principle by name — the coach can say which and why." },
  { id: "i44", module: "technicalPlan", coachText: "My week is sequenced: Tuesday group night, Wednesday primary phase, Thursday the transition that follows it.", evalText: "Week is sequenced: Tuesday group night, Wednesday primary phase, Thursday the transition that follows it." },
  { id: "i45", module: "technicalPlan", coachText: "I arrive at the bi-weekly meeting with match evidence for the next cycle pick.", evalText: "Arrives at the bi-weekly meeting with match evidence for the next cycle pick." },
  { id: "i46", module: "technicalPlan", coachText: "My players can name the week's theme in game-model language.", evalText: "Players can name the week's theme in game-model language." },
  { id: "i47", module: "technicalPlan", coachText: "Homework goes out every week — S&C plus a half of soccer — and I follow up on it.", evalText: "Homework goes out every week — S&C plus a half of soccer — and the coach follows up on it." },

  // Module 5 — Individual Development Plans
  { id: "i21", module: "m8", verifiable: true, coachText: "Every player has a current, specific plan — not a generic one.", evalText: "Every player has a current, specific plan — not a generic one." },
  { id: "i22", module: "m8", coachText: "Feedback is continuous through the year, not a single end-of-season report.", evalText: "Feedback is continuous through the year, not a single end-of-season report." },
  { id: "i23", module: "m8", coachText: "The plan connects to training, home work, and film.", evalText: "The plan connects to training, home work, and film." },
  { id: "i24", module: "m8", coachText: "The plan speaks the technical plan's language — her work maps to what her position is asked to do.", evalText: "The plan speaks the technical plan's language — the player's work maps to what her position is asked to do." },
  { id: "i25", module: "m8", coachText: "The player owns it — she can tell me her focus in one sentence.", evalText: "The player owns it — she can tell the coach her focus in one sentence." },

  // Module 6 — Video Analysis
  { id: "i17", module: "m7", coachText: "Every clip I use is tagged to a playing-style principle — no generic film, ever.", evalText: "Every clip is tagged to a playing-style principle — no generic film, ever." },
  { id: "i18", module: "m7", coachText: "Players do the analysis in position groups and present it themselves — I draft, give feedback, and review.", evalText: "Players do the analysis in position groups and present it themselves; the coach drafts, gives feedback, and reviews." },
  { id: "i19", module: "m7", coachText: "Strong and weak moments carry equal weight in my sessions — clear-eyed, not a highlight reel.", evalText: "Strong and weak moments carry equal weight — clear-eyed, not a highlight reel." },
  { id: "i20", module: "m7", coachText: "My opponent scouting produces a short list of coaching points the team actually hears before kickoff.", evalText: "Opponent scouting produces a short list of coaching points the team actually hears before kickoff." },
  { id: "i48", module: "m7", coachText: "Each player's named HUDL playlist stays current across games and feeds her IDP.", evalText: "Each player's named HUDL playlist stays current across games and feeds her IDP." },

  // Module 7 — Training Session Basics
  { id: "i9", module: "m5", coachText: "My session theme comes from the current phase-of-play cycle, and my objectives are written in game-model language.", evalText: "Session theme comes from the current phase-of-play cycle, and objectives are written in game-model language." },
  { id: "i10", module: "m5", coachText: "My stages build toward the game and reference each other — what Stage 1 rehearses, Stage 3 reveals.", evalText: "Stages build toward the game and reference each other — what Stage 1 rehearses, Stage 3 reveals." },
  { id: "i11", module: "m5", coachText: "My intervals, formats, and intensity are planned before I arrive — demand is engineered, not improvised.", evalText: "Intervals, formats, and intensity are planned before arrival — demand is engineered, not improvised." },
  { id: "i12", module: "m5", coachText: "My constraints produce constant touches and decisions; I coach within the game, with few stoppages.", evalText: "Constraints produce constant touches and decisions; coaching happens within the game, with few stoppages." },
  { id: "i49", module: "m5", coachText: "My environment is safe and demanding at once — top intensity from the first minute, and players who love competing.", evalText: "Environment is safe and demanding at once — top intensity from the first minute, and players who love competing." },

  // Module 8 — Match Preparation & Execution
  { id: "i13", module: "m6", coachText: "Players see my plan before kickoff — a pre-match presentation, not a coach-only sheet.", evalText: "Players see the plan before kickoff — a pre-match presentation, not a coach-only sheet." },
  { id: "i14", module: "m6", coachText: "My game plan is the game model applied, with keys drawn from the scouting work.", evalText: "The game plan is the game model applied, with keys drawn from the scouting work." },
  { id: "i15", module: "m6", coachText: "My talks and halftime adjustments are short imperatives in game-model language — one idea each.", evalText: "Talks and halftime adjustments are short imperatives in game-model language — one idea each." },
  { id: "i16", module: "m6", coachText: "I set the tone; I don't react. My touchline matches what I demand from the first minute.", evalText: "Sets the tone rather than reacting. The touchline matches what's demanded from the first minute." },
  { id: "i50", module: "m6", verifiable: true, coachText: "My matchday and travel standards hold: gear, arrival, phones, sanctioned hotels, supervised events.", evalText: "Matchday and travel standards hold: gear, arrival, phones, sanctioned hotels, supervised events." },
  { id: "i38", module: "m6", coachText: "I work as a colleague with other staff on competitive nights.", evalText: "Works as a colleague with other staff on competitive nights." },

  // Module 9 — Midseason Feedback
  { id: "i51", module: "midseason", coachText: "I re-rated myself honestly, before seeing the evaluator's scores — not after.", evalText: "Re-rated themselves honestly, before seeing the evaluator's scores — not after." },
  { id: "i52", module: "midseason", coachText: "I reviewed my own audio and film from the fall as evidence, not memory.", evalText: "Reviewed their own audio and film from the fall as evidence, not memory." },
  { id: "i53", module: "midseason", coachText: "My scores show movement since August — or I can give an honest account of why they don't.", evalText: "Scores show movement since August — or an honest account of why they don't." },
  { id: "i54", module: "midseason", coachText: "I sat with the feedback before responding: read it, let it land, then decided what to do with it.", evalText: "Sat with the feedback before responding: read it, let it land, then decided what to do with it." },
  { id: "i55", module: "midseason", coachText: "The gap between my reading and the evaluator's became a plan, not an argument.", evalText: "The gap between the coach's reading and the evaluator's became a plan, not an argument." },

  // Module 10 — Transformational Experience
  { id: "i26", module: "m9", coachText: "My players can say why a standard exists — not just what it is.", evalText: "Players can say why a standard exists — not just what it is." },
  { id: "i27", module: "m9", coachText: "Peer recognition runs on a rhythm on my team; effort and character are celebrated over results, in players' voices.", evalText: "Peer recognition runs on a rhythm; effort and character are celebrated over results, in players' voices." },
  { id: "i28", module: "m9", coachText: "My values work is periodized across the season — on the calendar like tactics, not a one-off talk.", evalText: "Values work is periodized across the season — on the calendar like tactics, not a one-off talk." },
  { id: "i29", module: "m9", coachText: "I coach disappointment — players respond to tough decisions with resilience and curiosity, not blame.", evalText: "Disappointment is coached: players respond to tough decisions with resilience and curiosity, not blame." },
  { id: "i56", module: "m9", coachText: "I model accountability — owning my mistakes in front of the team.", evalText: "Models accountability — owning mistakes in front of the team." },

  // Module 11 — Club Pathway
  { id: "i30", module: "m10", coachText: "I can explain the full ladder — tiers, bands, birth-year placement — accurately, without notes.", evalText: "Can explain the full ladder — tiers, bands, birth-year placement — accurately, without notes." },
  { id: "i31", module: "m10", coachText: "My \"what comes next\" message matches the age — next tier and next band at U9–U14; the recruiting timeline only at U15+.", evalText: "\"What comes next\" message matches the age: next tier and next band at U9–U14; the recruiting timeline only at U15+." },
  { id: "i32", module: "m10", coachText: "Families hear developmental-environment framing from me, not league branding.", evalText: "Families hear developmental-environment framing from the coach, not league branding." },
  { id: "i33", module: "m10", coachText: "My honest assessments run all season, so no placement conversation in May is a surprise.", evalText: "Honest assessments run all season, so no placement conversation in May is a surprise." },
  { id: "i57", module: "m10", coachText: "I send dates and logistics to PlayMetrics; I carry the why.", evalText: "Dates and logistics go to PlayMetrics; the coach carries the why." },
  { id: "i39", module: "m10", coachText: "I actively help my players through the recruiting process.", evalText: "Actively helps players through the recruiting process." },
  { id: "i40", module: "m10", verifiable: true, coachText: "I hold a one-on-one meeting with every sophomore to discuss recruiting.", evalText: "Holds a one-on-one meeting with every sophomore to discuss recruiting." },
];

export const itemsForModule = (moduleId) => RUBRIC_ITEMS.filter((i) => i.module === moduleId);
export const META_ITEMS = RUBRIC_ITEMS.filter((i) => i.meta);

/* ---------------------------------------------------------------
   SELF-EVALUATION — closing reflection prompts (part of Module 1)
----------------------------------------------------------------*/
export const REFLECTION_PROMPTS = [
  { id: "r1", text: "What's one piece of feedback you've received that surprised you?" },
  { id: "r2", text: "What would you most want to improve this season, and why that?" },
];

/* ---------------------------------------------------------------
   WHAT DRIVES YOU — bucket questionnaire (part of Module 1)
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
    ],
  },
  {
    heading: "THE HARDER QUESTIONS",
    questions: [
      { id: "b8", text: "What's the hardest part of coaching for you personally — not the most irritating, the hardest?" },
      { id: "b9", text: "If you could permanently hand off one responsibility, what would it be? What would you take on instead?" },
    ],
  },
  {
    heading: "GOALS",
    questions: [
      { id: "b11", text: "Where do you want to be as a coach in five years?" },
      { id: "b12", text: "What's one goal you have for yourself this season that has nothing to do with wins or losses?" },
    ],
  },
  {
    heading: "WHAT MAKES YOU TICK",
    questions: [
      { id: "b14", text: "What's a belief about coaching you hold strongly that not everyone agrees with?" },
      { id: "b15", text: "What did coaching give you that you didn't expect when you started?" },
    ],
  },
];

export const BUCKET_QUESTIONS = BUCKET_SECTIONS.flatMap((s) => s.questions);

/* ---------------------------------------------------------------
   COACH ARCHETYPES — internal / evaluator-facing only.
   A coaching-style vocabulary, not a clinical assessment.
   Assigned by the evaluator after reading the What Drives You responses.
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
    heading: "WHY THIS EXISTS",
    body: [
      "We ask our players to spend the whole season getting better. To work at the things they aren't good at yet. To take feedback without flinching. To keep a plan and actually come back to it.",
      "This platform asks the same of us.",
      "Most coaching feedback happens by accident — a comment after a match, a conversation in the parking lot, a season that ends without anyone saying much at all. This replaces that with something deliberate. Over the year you'll work through the eight qualities that define coaching at Maryland United, submit real footage of your own coaching, and get specific feedback on each one.",
      "It's a development program, not a verdict. No single score here decides who coaches what team. The point is to give you exactly what we try to give every player: a clear picture of where you are, and a specific idea of what to work on next.",
    ],
  },
  {
    heading: "THE IDEA BEHIND IT",
    body: [
      "A club can't credibly claim to develop players while its coaches stand still.",
      "If we want players who are better in June than they were in August, the people teaching them have to be moving too. That's the whole idea here — coach development and player development aren't two projects. They're the same one, seen from two sides of the same touchline.",
      "Everything that follows is built on that.",
    ],
  },
  {
    heading: "THE EIGHT QUALITIES",
    lead: "These are the eight qualities that define coaching at Maryland United. You'll work through one at a time, across the year.",
    list: [
      "Set the Standard",
      "Program Game Model",
      "Video Analysis",
      "Training Session Basics",
      "Match Preparation & Execution",
      "Transformational Experience",
      "Individual Development Plans",
      "Club Pathway",
    ],
    body: [
      "Every quality has specific sub-standards you'll be measured against. Nothing is hidden — you'll see the exact criteria before you're ever evaluated on them.",
    ],
  },
  {
    heading: "HOW THE YEAR WORKS",
    body: [
      "The eight modules run in sequence, August through June — roughly one a month.",
      "Each one asks for a real piece of your coaching: a parent meeting, a training session, a match day, a film session. You record it, link it, and add a short note on what you'd like your reviewer to notice. Then you get feedback on that quality, specific to what you submitted.",
      "Real footage, one quality at a time, all year. That's the rhythm.",
    ],
  },
  {
    heading: "HOW THE SCALE WORKS",
    lead: "Every quality is scored on a four-point scale:",
    scale: true,
    body: [
      { strong: "Three is the standard.", text: " It's what strong, effective coaching at this club looks like." },
      "Four isn't the expectation — it's what shows up when a coach is ready to teach others. And a 2 isn't a bad mark; it's a starting point with a direction attached. We would rather see honest 2s that move over the year than defensive 3s that don't.",
      "The score matters less than what it points you toward.",
    ],
  },
  {
    heading: "WHAT WE ASK OF YOU",
    body: [
      "Three things.",
      { strong: "Submit real footage, not curated highlights.", text: " The process only works on the coaching you actually do." },
      { strong: "Rate yourself honestly.", text: " The gap between how you see yourself and how you're seen is the single most useful thing this produces — and it only appears if you're candid." },
      { strong: "Sit with the feedback before you respond to it.", text: " Read it, let it land, then decide what to do with it." },
      "And to be straight with you about the bigger picture: no single score here is a scorecard, and no one form decides anything. But over time, how you engage with your own development becomes part of how the club knows you as a coach — the same way it does with everything else you do here. Coaches who lean into this tend to be the ones who lean into everything, and that has a way of showing.",
      "That's the ask. It's the same one we make of our players every week.",
    ],
  },
];

export const INTRO_NEXT = {
  heading: "WHAT COMES NEXT",
  body: [
    { strong: "Self-Evaluation", text: " asks you to rate yourself on the exact criteria your evaluator will use — before any evaluation happens." },
    { strong: "What Drives You", text: " asks what actually drives you as a coach." },
    "Both take real thought. Do them when you can think, not between two other things.",
  ],
  cta: "Mark this as read to continue.",
};

/* ---------------------------------------------------------------
   MODULES — sequential across the season, no fixed due dates.
----------------------------------------------------------------*/
export const MODULES = [
  {
    id: "onboarding",
    num: "01",
    window: "AUGUST",
    kind: "onboarding",
    title: "Getting Started",
    focus: "Your 1-on-1 meeting, the platform introduction, your self-evaluation, and what drives you — one flow, four steps.",
  },
  {
    id: "m3",
    num: "02",
    window: "SEPTEMBER",
    kind: "rubric",
    title: "Set the Standard",
    focus: "Standards, communication, and organization that set the tone for the season.",
    standardNote: "Three is the standard. Four is a coach whose team pulls other teams up — the standard-bearers younger groups copy.",
    resources: [
      { title: "Set the Standard player meeting deck", description: "The 8-section meeting — per-team versions exist for every roster", url: "https://drive.google.com/file/d/1vXoUDYDSCAX-g0Vh-q2s_Sd_irHT_P-Q/view" },
      { title: "U13–U18 Girls Program Coaching Manual — Culture & Standards", description: "Dress code, 15-minutes-early, phone policy, self-led warmups, awards, accountability", url: "https://docs.google.com/document/d/17Cy9KC2P2QFqqU5DKT1m6Il2fvQy9C0Mvoz_IsV9Ex4/edit" },
      { title: "Building a High-Performance Culture from Day One", description: "Seven takeaways on designing culture: visible standards, guided arrival, peer awards, top-down modeling", url: "https://docs.google.com/document/d/1ZdRWy9tp8ouPx5Scp91Jufy0WxtaCgjr5PenGZPUGN4/edit" },
    ],
    reflectPrompts: [
      "What is one thing you have been tolerating that your standard says you shouldn't?",
      "Could your players run the non-negotiables meeting without you — and who would lead it?",
      "When the standard slips, does the correction come from you or from a teammate?",
    ],
    recording: {
      format: "1st Parent Meeting — one per team",
      desc: "Record your first parent meeting of the season for every team you coach. Before you record, put together a short agenda or presentation covering your core values — the things you want parents to know matter to you as a coach — and walk through it live during the meeting. If you coach more than one team, submit a separate link for each below.",
      tip: "Be concrete when you present — specifics build trust, vague reassurances don't. Say exactly what you'll do and what you expect, and don't promise anything you can't actually deliver. That's not the same as playing it safe: parents can tell the difference between a coach who's decisive and one who's hedging. Pick a position and hold it — nothing undercuts a first meeting faster than contradicting yourself twenty minutes in.",
      exampleUrl: "https://docs.google.com/presentation/d/1fOlaB8GfXE81QLNx7nN-yGB0K33yikcbs_P5tpCELl8/edit?slide=id.g18f4df606e3_0_16#slide=id.g18f4df606e3_0_16",
      exampleLabel: "View an example core values presentation",
      needsMaterialLink: true,
    },
    recording2: {
      format: "1st Player Meeting — office in Liberty, one per team",
      desc: "Record a standards meeting with your players, held in the office in Liberty, for every team you coach. Set expectations directly with the team — behavior, effort, and conduct for the season. If you coach more than one team, submit a separate link for each below.",
      tip: "It's your team to manage — this meeting is where that job starts. Ground it in the same three things we ask of every coach: commitment, courage, passion. Before you ask your players, answer it yourself: what does commitment look like to you? Then make the standard concrete, not just a feeling.",
      nonNegotiables: [
        "Communicate directly with your coach",
        "PlayMetrics availability doesn't replace direct communication",
        "Maryland United gear at all times — cold, rain, or shine",
        "100% commitment",
        "100% effort",
      ],
    },
  },
  {
    id: "m4",
    num: "03",
    window: "SEPTEMBER",
    draft: true,
    kind: "rubric",
    title: "Program Game Model",
    focus: "A clear, coachable identity for how your team plays — understood well enough to teach it off the field.",
    standardNote: "Three is the standard. Four is a coach other coaches borrow the whiteboard from.",
    resources: [
      { title: "Coaching Manual — Maryland United FC Tactical Game Model", description: "The five principles with IF/THEN sub-principles across all four moments, plus systems of play", url: "https://docs.google.com/document/d/17Cy9KC2P2QFqqU5DKT1m6Il2fvQy9C0Mvoz_IsV9Ex4/edit" },
      { title: "Game Model Presentations — club template", description: "The deck every coach fills in: building shapes, pressing setups, creation patterns", url: "https://docs.google.com/presentation/d/1yxsxG1wvlmdD7ypGwTTTvj2exanqRmCn1RPDczWY2oo/edit" },
      { title: "2011 ECNL Game Model 2025–26 — worked team example", description: "A full team model: style-of-play pillars, pressing cues, set pieces, opponent goals slide", url: "https://docs.google.com/presentation/d/10MFXUS4shML_vKbMWC0dQT5LELgLyb_a4Aw60rTxFnY/edit" },
      { title: "13 ECNL Game Model (2024) — build-out example", description: "The \"accepted / rejected\" #6 build-out reads — teachable team-specific detail", url: "https://docs.google.com/presentation/d/1NaDcTc_Z7cMPInI9YGXELEKtAObfOMOTNc98X1vlz3s/edit" },
    ],
    reflectPrompts: [
      "Could your players draw your building shape against a front two without you in the room?",
      "Which of the five principles does your team live least on Saturdays — and what IF/THEN would fix it?",
      "If you had to change formation tomorrow, what would actually change about how you play?",
    ],
    recording: {
      format: "Team game model deck + off-field teaching walkthrough",
      desc: "Build your team game model deck from the club template, then record yourself teaching it off the field — a whiteboard or film-room walkthrough, not a live training session. Add a note on what you want your reviewer to notice.",
    },
  },
  {
    id: "technicalPlan",
    num: "04",
    window: "SEPTEMBER",
    draft: true,
    kind: "rubric",
    title: "Girls Program Technical Plan",
    focus: "The game model, translated into what every player must master.",
    standardNote: "Three is the standard. Four is a coach whose cycle plans other coaches ask to copy.",
    resources: [
      { title: "Coaching Manual — Technical Plan: Phase-of-Play Weekly Cycles", description: "The five cycles, the Tue/Wed/Thu structure, and the meeting governance — one document with the game model", url: "https://docs.google.com/document/d/17Cy9KC2P2QFqqU5DKT1m6Il2fvQy9C0Mvoz_IsV9Ex4/edit" },
      { title: "Girls Technical Plan — planning spreadsheet", description: "The operational calendar view: weekly themes, day formats, homework, post-match video standard", url: "https://docs.google.com/spreadsheets/d/1resX2lX2XaCSmzvFP9t8zzB4-7H6dlY0MqdzVMLzSe0/edit" },
      { title: "Technical Plan | 13–18 ECNL, RL, and Premier", description: "The age-banded delivery deck of Cycles 1–5", url: "https://docs.google.com/presentation/d/1VwqjHq_rqe9ukRUJ7RLvflmbDgi4to7J3nzUFpZnoXY/edit" },
      { title: "Girls Program Coaches Handbook — Google Site", description: "The hub every technical plan document links back to", url: "https://sites.google.com/mdunitedfc.org/girls-program-coaches-handbook/home" },
    ],
    reflectPrompts: [
      "Which game-model demand does your team meet worst right now — and which cycle trains it?",
      "Could a visitor at Thursday's session name your week's cycle without asking you?",
      "Pick one player: what is her positional demand, and where does it show up in her plan?",
    ],
    recording: {
      format: "Weekly phase-of-play cycle plan (Tue–Thu)",
      desc: "Submit your weekly plan for a current phase-of-play cycle — Tuesday through Thursday — with a note naming the game-model principle it trains and what you want your reviewer to notice.",
    },
  },
  {
    id: "m8",
    num: "05",
    window: "AUGUST – SEPTEMBER",
    kind: "rubric",
    title: "Individual Development Plans",
    focus: "Every player has a plan, every plan stays current, and every plan gets real attention.",
    standardNote: "Three is the standard — what strong, consistent IDP work looks like at this club. Four is what shows up when you're ready to help other coaches do it.",
    resources: [
      { title: "Next Level IDP Platform", description: "The U13–U18 player portal — where plans live", url: "https://marylandunitednextlevelidp.netlify.app/" },
      { title: "Summer IDP Process", description: "The philosophy & family-facing rollout", url: "https://docs.google.com/document/d/10LJ5C0J2knsKabLB-pMZx3-rY5o3LFlaXAjabpbJnWg/edit" },
      { title: "Team IDP Form", description: "Track your group's plans in one place", url: "https://docs.google.com/spreadsheets/d/1SiRaq2Lsuc3r1djZ-SINVVEuiC5pK0QKEnTgi7qKmFE/edit" },
      { title: "Player IDP Plan — template", description: "The per-player plan structure", url: "https://docs.google.com/spreadsheets/d/1vwvv5Viu7T1zSJiODYsT3qlGcWtETTHDf5LOtwBRyHw/edit" },
      { title: "IDP Webinar", description: "Walkthrough of the process", url: "https://docs.google.com/presentation/d/19hJWvRaxgzGbBdmsNp8MUV6zWNYxeRnx2eaO03gR7vg/edit" },
      { title: "How to Make a Clip on HUDL", description: "Film habits that feed the plan", url: "https://docs.google.com/document/d/17x6quLKULnIZ_Nba6RtsAc-e5fVjYyOGWggxknwDrFc/edit" },
    ],
    reflectPrompts: [
      "Can each of your players tell you her current focus in one sentence?",
      "Where does the plan actually live — somewhere she returns to, or a slide she saw once?",
      "Which player would gain the most from a sharper plan this month, and what's step one?",
    ],
    recording: {
      format: "IDP meeting with a player",
      desc: "Record one IDP meeting with a player, and submit the plan you built for her alongside it. We'll review it together in your one-on-one, with one question front and center: did the plan give her a clear next step she can act on this week?",
    },
  },
  {
    id: "m7",
    num: "06",
    window: "OCTOBER",
    draft: true,
    kind: "rubric",
    title: "Video Analysis",
    focus: "Scouting the opponent and turning that work into a prepared, clear-eyed team.",
    standardNote: "Three is the standard. Four is film work strong enough to teach other coaches.",
    resources: [
      { title: "TEMPLATE | Video Analysis", description: "The blank functional template — position groups, strong/weak pairs, 25 words + 3 bullets", url: "https://docs.google.com/presentation/d/14YU7E5zSsw86fihSPUybmihH1DYVB2mZka0t3TxqI90" },
      { title: "Worked example — own-team film", description: "A completed player project; the standard of finished analysis", url: "https://docs.google.com/presentation/d/1kN_O_voYf7RpKqewyCxXfuzeANhKDQe8d8Lp0XSnk0w" },
      { title: "Worked example — pro-match study", description: "The same template applied to a professional match", url: "https://docs.google.com/presentation/d/1Kv6HXX9XzrJKSV-ODYN5lagPPiAqy3dgN4jbfHggEMs" },
      { title: "How to Make a Clip on HUDL", description: "Create, extend, save — one named playlist per player, shared with you", url: "https://docs.google.com/document/d/17x6quLKULnIZ_Nba6RtsAc-e5fVjYyOGWggxknwDrFc" },
      { title: "U17 Video Session — coach notes", description: "Real coach-led film prep: timestamps plus one-line game-model points", url: "https://docs.google.com/document/d/1hDW3sCA7lm_O9FPFZIKjB0dvO84jmA116_RD1d5uFwY" },
    ],
    reflectPrompts: [
      "Can your players name the principle a clip belongs to before you tell them?",
      "When did a weak moment on film last change what you trained that week?",
      "What did your last opponent scout give your team that they actually used on Saturday?",
    ],
    recording: {
      format: "Team film session",
      desc: "Record a film session with your team — you, the screen, and your players. Link it on the platform and add a note on what you want your reviewer to notice.",
    },
  },
  {
    id: "m5",
    num: "07",
    window: "NOVEMBER",
    draft: true,
    kind: "rubric",
    title: "Training Session Basics",
    focus: "Sessions that are safe, demanding, and full of touches, decisions, and joy.",
    standardNote: "Three is the standard. Four is a session other coaches should watch to learn from.",
    resources: [
      { title: "Weekly Session Plan | Maryland United FC", description: "The current weekly structure: theme, Tue/Wed/Thu, three stages", url: "https://docs.google.com/spreadsheets/d/10OdWvdEVpTjUHUq73Ak3vp58th96IzKlo4rq3w-10QY/edit" },
      { title: "Training Sessions | Maryland United FC", description: "The session library by phase, with written intervals", url: "https://docs.google.com/spreadsheets/d/1ETMyLb4J3polwYLehjjVdIBFCvcgZWR7S-8dQA69Wy0/edit" },
      { title: "Training Sessions | Spring 2025", description: "Full themed sessions, stage by stage, with coaching notes", url: "https://docs.google.com/spreadsheets/d/1_VgEQcGsGZIVCe5Joyh6huZfEbRlpg_HWjDY2SflMJQ/edit" },
      { title: "Weekly Session Plan | 9–12", description: "The U9–U12 template: Activity / Objective / Description, plus Homework", url: "https://docs.google.com/spreadsheets/d/1qIy42zzOOL-TDnMU9V3QFT8aggJbIh16kRJagLcnI1E/edit" },
      { title: "Session Planner Template", description: "Periodization: energy systems, intervals, intensity levels", url: "https://docs.google.com/spreadsheets/d/1gU4C7q-E1i5c0Hsqj98eOOqwriAvxOXNqMyucqpaoc4/edit" },
    ],
    reflectPrompts: [
      "Could a stranger reading this week's session plans name your theme — and connect it to how we play?",
      "In your last session, how many minutes did the ball sit still while you talked?",
      "Was the intensity of each stage planned before you arrived, or decided on the fly?",
    ],
    recording: {
      format: "Full training session",
      desc: "Record one full training session — link it on the platform with a note telling your reviewer what to watch for. Before you submit, listen back to yourself. The audio doesn't lie.",
    },
  },
  {
    id: "m6",
    num: "08",
    window: "DECEMBER",
    draft: true,
    kind: "rubric",
    title: "Match Preparation & Execution",
    focus: "Game plans, team talks, and in-match decisions that give players clarity.",
    standardNote: "Three is the standard. Four means you're ready to teach other coaches how to prepare a team.",
    resources: [
      { title: "Pre-Match Player Presentation (U12–U18)", description: "Prepare Well = Play Well, Playing to Play vs. Playing to Win, and the Pyramid of Success", url: "https://docs.google.com/presentation/d/1b9W6VeQt125-jI80H9pwFsaCTc8A5a5lR-QN_S_UAoQ" },
      { title: "MD United Girls Travel Guide 2026–2027", description: "Per-event logistics: sanctioned hotels, booking deadlines, team links and codes", url: "https://docs.google.com/spreadsheets/d/1o4v5e167jIm_mTNoFz3lXDuPr_eN3KBxa0bFRhLtrUM" },
      { title: "U17 Video Session (coach notes)", description: "The voice and brevity of in-match coaching points drawn from film", url: "https://docs.google.com/document/d/1hDW3sCA7lm_O9FPFZIKjB0dvO84jmA116_RD1d5uFwY" },
    ],
    reflectPrompts: [
      "Could every player on your roster name the one key from this week's game plan?",
      "Listen to your last halftime talk — how many tactical ideas did you give, and how many landed?",
      "When the game turned against you, did you set the tone or react to it?",
    ],
    recording: {
      format: "Matchday recording",
      desc: "Record a real matchday — your pre-match talk, halftime, and touchline coaching. Link it on the platform and add a note on what you want your reviewer to notice. Then listen back before your reviewer does. The audio doesn't lie.",
    },
  },
  {
    id: "midseason",
    num: "09",
    window: "JANUARY",
    draft: true,
    kind: "rubric",
    title: "Midseason Feedback",
    focus: "The same criteria from August, re-scored — movement is what we measure.",
    standardNote: "Three is the standard. At midseason we score how you engage with feedback itself — the quality this whole platform runs on.",
    resources: [
      { title: "COACHING IDP, 2026", description: "The current-season grid — End of Fall is the midseason re-score", url: "https://docs.google.com/spreadsheets/d/1Fu_XGRIW1_u6MY-Gn9_o9N-N21wxclfYDvAlB3IghWQ" },
      { title: "Coaching Evaluations (13–18)", description: "The five-step live cycle: scrimmage → theme → HUDL meeting → filmed session → debrief", url: "https://docs.google.com/document/d/1vypwRmba2QvEzWfC7E_A6iR_GlgI55OqIh8XUcTzZL0" },
      { title: "What Does Elite Coaching Look Like? Self-Evaluation", description: "The August self-evaluation your midseason reading is compared against", url: "https://docs.google.com/spreadsheets/d/1ruu40Yd6YskBfouHWfARk2aaaRF1AZhqFrNJIP1_XSg" },
    ],
    reflectPrompts: [
      "Which quality moved the most since August — and what, specifically, moved it?",
      "Where is the biggest gap between your reading and your evaluator's, and what does it tell you?",
      "Is there a 3 on your sheet you haven't actually tested since August?",
    ],
    recording: {
      format: "A real piece of your coaching (re-scored)",
      desc: "Re-rate yourself on the same criteria you scored in August, before you see your evaluator's scores. Then submit a real piece of your coaching from this stretch of the season — record it, link it, and add a note telling your reviewer what you want them to notice. The specific midseason artifact is still being finalized — confirm the current ask on the platform before you submit.",
    },
  },
  {
    id: "m9",
    num: "10",
    window: "JANUARY – FEBRUARY",
    draft: true,
    kind: "rubric",
    title: "Transformational Experience",
    focus: "Coaching that shapes people, not just players — culture, character, connection.",
    standardNote: "Three is the standard. Four is what shows up when you're ready to teach other coaches how you do it.",
    resources: [
      { title: "OUR VALUES — the six cultural principles", description: "The full text of the six principles, including the \"transformational\" line", url: "https://docs.google.com/presentation/d/1T63s_eHIu2oQFprndQnMEk0cklyoIHJf68URd7UITuA/edit" },
      { title: "Periodization of Values", description: "The method for sequencing values work across a season: Your Why → Your Core → Your Commitment", url: "https://docs.google.com/presentation/d/1fdWGFK6X4KzULw54b3E3jCYUhghkbaAHcwzvEDN8rjQ/edit" },
      { title: "Building a High-Performance Culture from Day One", description: "Celebrate effort and character over results; peer recognition as character education", url: "https://docs.google.com/document/d/1ZdRWy9tp8ouPx5Scp91Jufy0WxtaCgjr5PenGZPUGN4/edit" },
      { title: "Coaching Manual — Leadership & Accountability", description: "Accountability beyond the field, coach modeling, the leadership ladder", url: "https://docs.google.com/document/d/17Cy9KC2P2QFqqU5DKT1m6Il2fvQy9C0Mvoz_IsV9Ex4/edit" },
    ],
    reflectPrompts: [
      "Which of your habits this season were transactional — effort traded for validation — and what would the transformational version look like?",
      "Think of the last tough decision you made. Did the player leave it with a teacher or just a verdict?",
      "What will your players still be carrying from this season in ten years — and are you coaching that on purpose?",
    ],
    hasBonding: true,
    recording: {
      format: "A real piece of your coaching in action",
      desc: "Submit a real piece of your coaching that shows this quality in action — record it, link it, and add a note telling your reviewer what you want them to notice.",
    },
  },
  {
    id: "m10",
    num: "11",
    window: "MAY – JUNE",
    draft: true,
    kind: "rubric",
    title: "Club Pathway",
    focus: "Guiding players and families through what comes next at Maryland United.",
    standardNote: "Three is the standard. Four is the coach other coaches send confused families to.",
    resources: [
      { title: "2026–2027 Girls Teams & Coaches", description: "The canonical roster — every team and coach, U5–U18/19, including South", url: "https://docs.google.com/spreadsheets/d/17mDeybpAmoKkhXDQLoEmjt1RGSv5PZKvbo6Mf7HL-6g" },
      { title: "Rising U11/U12 Program Webinar", description: "How we walk families into the Pre-ECNL step", url: "https://docs.google.com/presentation/d/15W5CXQt61-me77TVRFXvdb_7dpaza2rR_qeVeIatm64" },
      { title: "Why Join our Premier and Elite Program? (U13–U18/19)", description: "The current-season pathway deck: bridge to ECNL/RL, National 1 League", url: "https://docs.google.com/presentation/d/1oxDC4gd2thleLnx4TTUTtvJBfzqDSIBW0nFAf6zR6tE" },
      { title: "Why play in the MD United FC Premier | Elite Program?", description: "The coaching pod, internal promotion, and recruiting support in prose", url: "https://docs.google.com/document/d/1Qgvtf8E0InTNO4e5_1Leuvn6G5ulIafYT6LJ_bvzrlw" },
      { title: "College Recruiting 101: Freshman Year", description: "The parent-facing script for \"be patient\" — NCAA rules, fit over speed", url: "https://docs.google.com/document/d/13ksNkALE_ol9LrlhMMJ245hHUyHlACoCoYmiwyoO-aY" },
      { title: "2025 Girls College Recruiting Seminar", description: "D1/D2/D3 differences, contact dates, the coach-as-reference role", url: "https://docs.google.com/presentation/d/1vfEOM_NxVq1sbA_fLgRL_iAeWdyevOmQYMExtvR5ztU" },
    ],
    reflectPrompts: [
      "Could you draw the club ladder for a family right now, from Academy to U18/19, without checking anything?",
      "Which of your players is closest to being ready for the next tier — and does she already know what you think?",
      "Is your \"what comes next\" message genuinely matched to your age group, or does college creep in early?",
    ],
    recording: {
      format: "A real pathway conversation",
      desc: "Record a real piece of your pathway coaching — a genuine \"what comes next\" conversation with a player or family, at the level appropriate to their age. Link it and add a note on what you want your reviewer to notice.",
    },
  },
];

export const RUBRIC_MODULES = MODULES.filter((m) => m.kind === "rubric");

// Schedule shown above the module list — same modules, two tracks by team
// age (see src/data/teams.js). Only the U9-U14 track has confirmed dates
// so far (Getting Started, Set the Standard); U15-U19 and everything
// else is TBD across the board (default fallback in
// CoachingEvaluation.jsx).
export const SCHEDULE_DATES = {
  onboarding: { young: "AUG 14" },
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
  subLink: "",
  subMaterialLink: "",
  subNotes: "",
  // Second recording — only used by modules with a `recording2` requirement.
  submitted2: false,
  sub2Link: "",
  sub2Notes: "",
  itemGrades: {}, // evaluator's per-item 1-4 ratings, keyed by item id
});

export const emptyBonding = () => [0, 1, 2, 3].map(() => ({ what: "", effective: "", why: "" }));

export const defaultData = (coachName = "") => ({
  coachName,
  lastOpenId: null,
  notes: [],
  onboardingStep: 0,
  intro: { read: false },
  meeting: { completed: false },
  selfEval: { ratings: {}, meta: {}, reflections: {}, submitted: false },
  bucket: { answers: {}, submitted: false },
  bonding: emptyBonding(),
  modules: Object.fromEntries(RUBRIC_MODULES.map((m) => [m.id, emptyModuleState()])),
});
