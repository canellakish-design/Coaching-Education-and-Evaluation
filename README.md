# Maryland United — Coaching Excellence Pathway

A standalone Vite + React app with Firebase Authentication (Google Sign-In,
gated by an approved-coach allowlist) and Firestore. Thirteen modules across
the season: an introduction, a self-evaluation, a motivational profile, a
1-on-1 meeting, a midseason feedback placeholder, and eight coaching
qualities assessed through recorded submissions. A schedule sits above the
module list showing when each module is due — see "Schedule" below.

## Structure

**Module 1 — 1-on-1 Meeting**
A private, spoken kickoff meeting between coach and evaluator at the very
start of the season — what to expect, what's ahead, a chance to ask
questions. No written notes are collected in the app for this one — the
coach just marks it completed once it's happened.

**Module 2 — Introduction to the Maryland United Coaching Excellence Platform**
A short onboarding read, stepped one section at a time: why the program
exists, how the year works, how the 1–4 scale works, and what's asked of
coaches. Marking it read unlocks the rest of the season.

**Module 3 — Self-Evaluation**
Coaches rate themselves 1–4 on all 40 rubric items — the *same* items their
evaluator rates in Modules 5–9 and 11–13. Eight of those items also ask a
meta-perception question ("how do you think your players would rate you?").
Two reflection prompts close it out.

**Module 4 — What Drives You?**
Sixteen open-response prompts on motivation, goals, energy, and what makes the job worth
doing. The evaluator reads these and assigns a coaching archetype.

**Modules 5–9, 11–13 — The Rubric**
Set the Standard, Maryland United Game Model, Analysis, Maryland United Training Session, Match
Preparation & Execution, Transformational Experience (includes the Team
Bonding exercise), Individual Development, Club Pathway. Each has a recorded
submission and per-item evaluator grading. There's no per-module written
feedback field — the evaluator gives spoken feedback instead, via the
1-on-1 meeting.

**Module 10 — Midseason Feedback**
Placeholder module (content TBD) sitting between Match Preparation &
Execution and Transformational Experience, around January.

## Schedule

A schedule table sits above the module list, visible to every coach. It
lists all thirteen modules against two date columns — U9–U14 and U15–U19 —
since the two age bands don't run the same season calendar (see
`src/data/teams.js` for the team-to-track mapping). Modules don't carry
their own due date anymore; `SCHEDULE_DATES` in `src/data/modules.js` is
the single source of truth, keyed by module id. Only Modules 1–5 have
confirmed dates so far — everything else shows "TBD" until the rest of the
calendar is set.

## The paired-item design

Every rubric item is stored with two wordings — `coachText` (first person, for
Module 3) and `evalText` (third person, for the evaluator). Same construct,
same 1–4 anchors. This pairing is what makes the self-vs-evaluator gap
meaningful; it's the standard approach in the coaching-leadership literature
(cf. the Leadership Scale for Sports, which exists in parallel coach and
athlete forms). If you add or edit items, keep both wordings aligned.

## Evaluator view

Accounts listed in `ADMIN_EMAILS` (`src/data/modules.js`) see an extra panel:

- **Self vs. Evaluator** — every compared item, sorted by gap size. Positive
  gap means the coach rates themselves higher than you do.
- **Meta-Perception** — self-rating vs. predicted player rating vs. your
  rating, for the 8 flagged items.
- **What Drives You** — all Module 4 answers on one screen.
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
  `intro` (read), `meeting` (completed), `selfEval` (ratings, meta,
  reflections), `bucket` (answers), `bonding` (4 entries), `modules`
  (per-module grade, status, itemGrades, submission links/context notes),
  `notes` (array of `{ id, text, authorEmail, createdAt }`, coach-visible),
  and `archetype`.
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
