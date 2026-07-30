# Maryland United — Coaching Excellence Pathway

A season-tracking platform where coaches submit recordings for 8 evaluation
modules and receive graded feedback. Data is stored per coach per season in
Firebase, so progress follows a coach across devices and stays on record
year after year.

## 1. Create your Firebase project (free)

1. Go to https://console.firebase.google.com and click **Add project**.
   Name it something like `mu-coach-platform`. You can skip Google
   Analytics.
2. In the left sidebar, go to **Build > Authentication > Get started**,
   then enable the **Email/Password** sign-in provider.
3. Go to **Build > Firestore Database > Create database**. Start in
   **production mode**, pick a region close to you.
4. Once created, open the **Rules** tab of Firestore and paste in the
   contents of `firestore.rules` from this repo, then click **Publish**.
   This makes sure a coach can only ever read or write their own data.
5. Go to **Project settings** (gear icon) > **General** > scroll to
   **Your apps** > click the **</>** (web) icon to register a new web app.
   Give it any nickname. Firebase will show you a `firebaseConfig` object —
   you'll need those values in step 3 below.

## 2. Run it locally (optional, to test before deploying)

```bash
npm install
cp .env.example .env
# paste your firebaseConfig values into .env
npm run dev
```

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: coach education platform"
gh repo create mu-coach-platform --private --source=. --push
```

(If you don't have the `gh` CLI, create a repo manually on github.com, then:)

```bash
git remote add origin https://github.com/YOUR-USERNAME/mu-coach-platform.git
git branch -M main
git push -u origin main
```

## 4. Deploy to Netlify

1. On https://app.netlify.com, click **Add new site > Import an existing
   project**, and pick your new GitHub repo.
2. Build settings should auto-fill from `netlify.toml` (build command
   `npm run build`, publish directory `dist`) — confirm and continue.
3. Before the first deploy finishes working end-to-end, go to
   **Site configuration > Environment variables** and add the same six
   `VITE_FIREBASE_*` keys from your `.env` file.
4. Trigger a redeploy (Deploys tab > Trigger deploy) so the build picks up
   the new environment variables.
5. In the Firebase console, go to **Authentication > Settings >
   Authorized domains** and add your Netlify domain (e.g.
   `mu-coach-platform.netlify.app`) so sign-in works from the live site.

## Notes

- Each coach creates their own account (email + password) the first time
  they visit the site.
- The season selector at the top lets a coach (or you) look back at any
  prior year's submissions — each season is stored as its own record, so
  nothing gets overwritten year to year.
- `firestore.rules` restricts every coach to their own data. If you later
  want a director-of-coaching view that can see *all* coaches' data, that
  needs a small additions to the rules and a simple admin screen — happy
  to build that when you're ready.
