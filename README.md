# Maryland United — Coaching Excellence Pathway

A standalone Vite + React app with Firebase Authentication (Google Sign-In,
gated by an approved-coach allowlist) and Firestore. Eleven modules across the
season: an introduction, a self-evaluation, a motivational profile, and eight
coaching qualities assessed through recorded submissions.

## Structure

**Module 1 — Introduction to the Maryland United Coaching Excellence Platform**
A short onboarding read, stepped one section at a time: why the program
exists, how the year works, how the 1–4 scale works, and what's asked of
coaches. Marking it read unlocks the rest of the season.

**Module 2 — Self-Evaluation**
Coaches rate themselves 1–4 on all 34 rubric items — the *same* items their
evaluator rates in Modules 4–11. Eight of those items also ask a
meta-perception question ("how do you think your players would rate you?").
Two reflection prompts close it out.

**Module 3 — What Fills Your Bucket?**
Sixteen open-response prompts on motivation, goals, energy, and what makes the job worth
doing. The evaluator reads these and assigns a coaching archetype.

**Modules 4–11 — The Rubric**
Team Management, Maryland United Game Model, Analysis, Maryland United Training Session, Match
Preparation & Execution, Transformational Experience (includes the Team
Bonding exercise), Individual Development, Club Pathway. Each has a recorded
submission and per-item evaluator grading.

## The paired-item design

Every rubric item is stored with two wordings — `coachText` (first person, for
Module 2) and `evalText` (third person, for the evaluator). Same construct,
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
- **Bucket Responses** — all Module 3 answers on one screen.
- **Archetype** — assign one of six archetypes with your reasoning. Each
  carries a strength and its characteristic blind spots.

Admins also get a coach selector to view and grade any coach's record.

Archetypes are a coaching-style vocabulary for framing feedback, **not** a
clinical or psychometric assessment. Coaches never see their archetype,
the gap analysis, or evaluator notes in the app.

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

## Data model

- `approvedCoaches/{email}` — allowlist.
- `coaches/{uid}` — `{ name, email, createdAt }`, created on first sign-in.
- `coachEvaluations/{season}_{uid}` — one doc per coach per season:
  `intro` (read), `selfEval` (ratings, meta, reflections), `bucket` (answers),
  `bonding` (4 entries), `modules` (per-module grade, itemGrades, notes,
  submission), and `archetype`.

## Deploying to Netlify

Connected to GitHub; pushes to `main` auto-deploy. `netlify.toml` sets the
build command and publish directory plus the SPA redirect rule.

Netlify's secret scanner flags Firebase's public web API key as a false
positive. Three site environment variables suppress it:
`SECRETS_SCAN_OMIT_KEYS=VITE_FIREBASE_API_KEY`,
`SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES=<your api key>`, and
`SECRETS_SCAN_OMIT_PATHS=node_modules/**`.
