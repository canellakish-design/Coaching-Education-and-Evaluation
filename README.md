# Maryland United — Coaching Excellence Pathway

A standalone Vite + React app with Firebase Authentication (Google Sign-In,
gated by an approved-coach allowlist) and Firestore. Ten modules across
the season: a combined onboarding module and nine coaching qualities, each
assessed through a recorded submission. Content for every module — criteria,
resources, and reflection prompts — is drawn from *The Maryland United
Coaching Handbook 2026–27*. A schedule sits above the module list showing
when each module is due — see "Schedule" below.

## Structure

**Module 1 — Getting Started**
A single combined module that steps a coach through one flat sequence of
ten pages — no nested sections, one Back/Next control throughout, and a
bottom progress bar (`src/components/OnboardingModule.jsx`):

1. **1-on-1 Meeting** — a private, spoken kickoff meeting between coach and
   evaluator at the very start of the season. No written notes are
   collected in the app for this one — the coach just marks it completed.
2–7. **Introduction** — six individual reading pages (why the program
   exists, how the year works, how the 1–4 scale works, what's asked of
   coaches, etc.), each just Back/Next since there's nothing to complete.
8. **What Comes Next** — the closing intro page, with its own "Mark as
   Read" action (separate from the Next control, same pattern as every
   other page).
9. **Self-Evaluation** — coaches rate themselves 1–4 on all 49 rubric
   items — the *same* items their evaluator rates across Modules 2–3
   and 5–10. Two reflection prompts close it out.
10. **What Drives You** — twelve open-response prompts on motivation,
   goals, energy, and what makes the job worth doing. The evaluator reads
   these and assigns a coaching archetype.

"Next" is gated on completing the current page where there's something to
complete (meeting marked complete / intro marked read / self-eval
submitted / bucket submitted) — reading-only pages never gate. Each page
still autosaves on every change — the progress bar and current page
position are also saved (`onboardingStep`), so a coach who leaves mid-flow
picks up where they left off. The module's own ✓ checkmark only appears
once all four underlying tasks are done.

**Modules 2–3, 5–10 — The Rubric**
Set the Standard, Program Game Model, Individual Development Plans,
Video Analysis, Training Session Basics, Match Preparation & Execution,
Transformational Experience (includes the Team Bonding exercise), Club
Pathway. All but Set the Standard are currently `draft: true` — shown
as "COMING SOON" and unclickable for coaches while they're being
reviewed; accounts in `CREATOR_EMAILS` (`src/data/modules.js`) can
still open them, tagged "DRAFT". Each has a recorded submission and
per-item evaluator grading. There's no per-module written feedback
field — the evaluator gives spoken feedback instead, via the 1-on-1
meeting (or a written Note — see below).

Every rubric module also carries, straight from the handbook: a **WHAT
WE LOOK FOR** criteria list (the same items rated in Module 1's
Self-Evaluation and by the evaluator here), a short **standard note**
on what a 3 vs. a 4 looks like, a **RESOURCES** list of the real
planning docs/decks/sheets behind that module, and a closing **REFLECT**
section of open questions — display-only, not collected as data.

**Module 4 — Girls Program Technical Plan**
A lightweight placeholder, not a rubric module — no criteria, no
recorded submission, no evaluator grading. Just a short note ("we will
meet once a month to establish a plan as a staff") and a link to the
staff planning deck, under a **RESOURCES** list like the rubric
modules use.

## Schedule

A schedule table sits above the module list, visible to every coach. It
lists all ten modules against two date columns — U9–U14 and U15–U19 —
since the two age bands don't run the same season calendar (see
`src/data/teams.js` for the team-to-track mapping). Modules don't carry
their own due date anymore; `SCHEDULE_DATES` in `src/data/modules.js` is
the single source of truth, keyed by module id. Only Modules 1–2 have
confirmed U9–U14 dates so far (Getting Started, Set the Standard);
U15–U19 and everything else shows "TBD" until the rest of the calendar
is set.

## The paired-item design

Every rubric item is stored with two wordings — `coachText` (first person,
for the Self-Evaluation page of Module 1) and `evalText` (third person, for
the evaluator). Same construct, same 1–4 anchors. This pairing is what makes
the self-vs-evaluator gap meaningful; it's the standard approach in the
coaching-leadership literature (cf. the Leadership Scale for Sports, which
exists in parallel coach and athlete forms). If you add or edit items, keep
both wordings aligned.

## Evaluator view

Accounts listed in `ADMIN_EMAILS` (`src/data/modules.js`) see an extra panel:

- **Self vs. Evaluator** — every compared item, sorted by gap size. Positive
  gap means the coach rates themselves higher than you do.
- **Meta-Perception** — self-rating vs. predicted player rating vs. your
  rating, for the 8 flagged items.
- **What Drives You** — all answers from that page of Module 1 on one screen.
- **Archetype** — assign one of six archetypes with your reasoning. Each
  carries a strength and its characteristic blind spots.

Admins also get a coach selector to view and grade any coach's record. Inside
each rubric module's evaluator box, the admin sets a COMPLETE / INCOMPLETE
(LATE) status per module — separate from the coach's own "submitted" toggle
and shown as a pill on the module card.

Archetypes are a coaching-style vocabulary for framing feedback, **not** a
clinical or psychometric assessment. Coaches never see their archetype or
the gap analysis in the app. Structured per-module feedback is spoken,
delivered through the 1-on-1 meeting rather than written — but see Notes
below for a written channel that *is* coach-visible.

### Notes (coach-visible)

The **Notes** tab in the evaluator panel is the one exception to "coaches
don't see evaluator content" — anything sent there (an observation,
feedback, anything else) appears in a "Notes from your evaluator" section
on the coach's own dashboard, dated and in order. If the Trigger Email
extension (see Firebase setup below) is configured, the coach also gets an
email.

## Local setup

```bash
npm install
cp .env.example .env   # fill in your Firebase project values
npm run dev
```

## Firebase setup

1. Enable **Authentication → Sign-in method → Google**.
2. Enable **Firestore Database** (production mode).
3. Add your deployed domain under **Authentication → Settings → Authorized domains**.
4. Copy web app config values into `.env`.
5. Publish `firestore.rules` (Firebase Console → Firestore → Rules).
6. **Approve coaches** — create a `approvedCoaches` collection; add one
   document per coach with the **document ID set to their lowercased email**.
   Contents don't matter, only existence. Anyone not listed is signed out.
7. **Set evaluators** — update `ADMIN_EMAILS` in `src/data/modules.js` *and*
   the matching list inside `firestore.rules`. Both must agree.
8. **(Optional) Email notes to coaches** — install the official **Trigger
   Email** extension (Firebase Console → Extensions → search "Trigger
   Email from Firestore"), point it at an SMTP provider (Gmail SMTP,
   SendGrid, etc.), and set its watched collection to `mail`. Without this,
   notes still save and show up in the app — they just won't also send an
   email.

## Data model

- `approvedCoaches/{email}` — allowlist.
- `coaches/{uid}` — `{ name, email, createdAt }`, created on first sign-in.
- `coachEvaluations/{season}_{uid}` — one doc per coach per season:
  `onboardingStep` (which page of Module 1 the coach is on, 0-3), `intro`
  (read), `meeting` (completed), `selfEval` (ratings, meta, reflections),
  `bucket` (answers), `bonding` (4 entries), `modules` (per-module grade,
  status, itemGrades, submission links/context notes), `notes` (array of
  `{ id, text, authorEmail, createdAt }`, coach-visible), and `archetype`.
- `mail/{autoId}` — write-only queue for the Trigger Email extension;
  evaluators create documents here when they send a note, nobody reads
  them back through the app.

`src/data/teams.js` holds the season's team roster (name, birth-year window,
coaches, email, schedule track) — the actual coaches who log into the app.
It's reference data for the schedule; it doesn't yet drive `approvedCoaches`
automatically, so add each coach's email there separately per the Firebase
setup steps above.

## Deploying to Netlify

Connected to GitHub; pushes to `main` auto-deploy. `netlify.toml` sets the
build command and publish directory plus the SPA redirect rule.

Netlify's secret scanner flags Firebase's public web API key as a false
positive. Three site environment variables suppress it:
`SECRETS_SCAN_OMIT_KEYS=VITE_FIREBASE_API_KEY`,
`SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES=<your api key>`, and
`SECRETS_SCAN_OMIT_PATHS=node_modules/**`.
