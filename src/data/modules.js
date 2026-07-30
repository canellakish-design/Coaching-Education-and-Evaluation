export const SEASON = "2026\u201327";

export const GRADE_SCALE = [
  { value: 1, label: "Emerging", desc: "Early in development — needs structured support in this area." },
  { value: 2, label: "Developing", desc: "Applies the quality inconsistently — clear growth underway." },
  { value: 3, label: "Proficient", desc: "Meets the Maryland United standard consistently." },
  { value: 4, label: "Exemplary", desc: "Models the standard and can mentor other coaches." },
];

export const MODULES = [
  {
    id: "m1",
    num: "01",
    window: "DUE AUG 25",
    title: "Team Management",
    focus: "Standards, communication, and organization that set the tone for the season.",
    lookFor: [
      "Clear team standards and expectations communicated to players and parents",
      "Organized, confident handling of parent questions and concerns",
      "Consistent, professional communication rhythm with families",
    ],
    recording: {
      format: "First parent meeting",
      desc: "Record your first parent meeting of the season. Record and submit.",
    },
  },
  {
    id: "m2",
    num: "02",
    window: "DUE AUG 25",
    title: "Game Model",
    focus: "A clear, coachable identity for how your team plays — understood well enough to teach it off the field.",
    lookFor: [
      "A defined game model articulated in principles players can recognize on the field",
      "Confident use of the tactical board to explain shape, phases, and key moments",
      "Team engagement — players asked to explain the model back, not just hear it",
    ],
    recording: {
      format: "Office meeting with tactical board",
      desc: "Record yourself presenting one aspect of your game model to the team using a tactical board. Record and submit.",
    },
  },
  {
    id: "m3",
    num: "03",
    window: "DUE SEP 15",
    title: "Maryland United Training Session",
    focus: "Sessions that are safe, demanding, and full of touches, decisions, and joy.",
    lookFor: [
      "High activity level — minimal lines, maximal ball rolling time",
      "Session structure with clear objectives and progressive difficulty",
      "Environment where players feel safe to try, fail, and try again",
    ],
    recording: {
      format: "Full team training session",
      desc: "An unedited team session from arrival to close, including your coaching interventions.",
    },
  },
  {
    id: "m4",
    num: "04",
    window: "DUE SEP 15",
    title: "Match Preparation & Execution",
    focus: "Game plans, team talks, and in-match decisions that give players clarity.",
    lookFor: [
      "Purposeful warm-up connected to the game plan",
      "Concise, player-focused pregame and halftime talks",
      "In-game adjustments and substitutions with a clear rationale",
    ],
    recording: {
      format: "Match day recording",
      desc: "Warm-up, pregame talk, halftime, and bench coaching across one competitive match.",
    },
  },
  {
    id: "m5",
    num: "05",
    window: "DUE SEP 15",
    title: "Analysis",
    focus: "Scouting the opponent and turning that work into a prepared, clear-eyed team.",
    lookFor: [
      "Opponent tendencies identified and translated into a specific game plan",
      "Clips organized around success vs. failure, not just a highlight reel",
      "Players talk more than the coach — guided discovery over lecture",
      "Video analysts brought in with the team afterwards to reinforce the session",
    ],
    recording: {
      format: "Opponent scouting & prep session",
      desc: "Record a session where you prepare the team for a scouted opponent. Submit clips analyzing what worked (success) versus what didn't (failure). Follow up by bringing in video analysts with the team afterwards.",
    },
  },
  {
    id: "m6",
    num: "06",
    window: "DUE SEP 15",
    title: "Individual Development",
    focus: "Every player has a plan, and every plan gets real attention.",
    lookFor: [
      "Individual development plans with specific, reviewable targets",
      "Session moments deliberately designed around individual needs",
      "Feedback tailored to the player, not broadcast to the group",
    ],
    recording: {
      format: "Individual / small-group session",
      desc: "A 1-on-1 or small-group session built around specific player development targets.",
    },
  },
  {
    id: "m7",
    num: "07",
    window: "DUE SEP 15",
    title: "Transformational Experience",
    focus: "Coaching that shapes people, not just players — culture, character, connection.",
    lookFor: [
      "Genuine relationships — you know your players beyond the field",
      "Team culture moments built intentionally, not left to chance",
      "Players leave the season more confident than they arrived",
    ],
    recording: {
      format: "Player check-in / culture moment",
      desc: "A recorded player check-in conversation or a team culture activity you lead.",
    },
  },
  {
    id: "m8",
    num: "08",
    window: "DUE SEP 15",
    title: "Club Pathway",
    focus: "Guiding players and families through what comes next at Maryland United.",
    lookFor: [
      "Honest, well-prepared end-of-season player reviews",
      "Clear knowledge of club pathway options and next steps",
      "Advocacy for players moving between teams and levels",
    ],
    recording: {
      format: "End-of-season pathway meeting",
      desc: "A player/family review meeting covering the season and the road ahead.",
    },
  },
];

export const emptyModuleState = () => ({
  grade: null,
  evalNotes: "",
  submitted: false,
  subDate: "",
  subLink: "",
  subNotes: "",
});
