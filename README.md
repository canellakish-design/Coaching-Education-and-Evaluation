# Maryland United — Coaching Excellence Evaluation Platform

A standalone Vite + React app with Firebase Authentication (Google Sign-In,
restricted to an approved list of coach emails) and Firestore, tracking
coaches through 8 evaluation modules across the season — video submissions,
1–4 grading scale (Emerging → Exemplary), and progress tracking. Not
connected to any other Maryland United platform.

## Local setup

```bash
npm install
cp .env.example .env   # fill in your Firebase project values
npm run dev
```

## Firebase setup

1. Create a Firebase project (or use an existing one).
2. Enable **Authentication → Sign-in method → Google**.
3. Enable **Firestore Database**.
4. Copy your web app config values into `.env`.
5. Deploy `firestore.rules` (Firebase Console → Firestore → Rules, or via CLI:
   `firebase deploy --only firestore:rules`).
6. **Add approved coaches** — since coaches sign in with personal Gmail
   accounts (no shared company domain to restrict by), access is controlled
   by an allowlist instead. In Firestore, create a collection called
   `approvedCoaches`. For each coach, add a document whose **ID is their
   lowercased email address** (e.g. `canellakish@gmail.com`) — the document's
   contents don't matter, just its existence. Any Google account not on this
   list will be signed out immediately with an "access denied" message.

## Data model

- `coaches/{uid}` — `{ name, email, createdAt }`, created on registration.
- `coachEvaluations/{season}_{uid}` — one document per coach per season,
  storing submission + grading state for all 8 modules.

## Deploying to Netlify via GitHub

1. Push to GitHub:
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Netlify → **Add new site → Import an existing project → GitHub** → select this repo.
3. Netlify reads `netlify.toml` automatically (`npm run build`, publish `dist`).
4. Add the six `VITE_FIREBASE_*` variables under **Site settings → Environment variables**.
5. Deploy. Future pushes to `main` auto-deploy.

## The 8 modules

1. Team Management — first parent meeting (due Aug 25)
2. Game Model — office meeting with tactical board (due Aug 25)
3. Maryland United Training Session — full team training session
4. Match Preparation & Execution — match day recording
5. Analysis — opponent scouting & prep, clips of success vs. failure
6. Individual Development — 1-on-1 / small-group session
7. Transformational Experience — player check-in / culture moment
8. Club Pathway — end-of-season pathway meeting
