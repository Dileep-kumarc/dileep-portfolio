# Dileep Kumar — Portfolio (workspace)

This workspace contains a single-page portfolio (`protfolio.html`) with PWA scaffolding, accessibility improvements, and placeholders for analytics and a Supabase leaderboard.

Quick steps to deploy to Vercel:

1. Create a GitHub repo and push this folder.
2. In Vercel, import the repo and set the root to `/`.
3. (Optional) Create a Supabase project and set `SUPABASE_URL` and `SUPABASE_ANON_KEY` values in `supabase-client.js` or use environment variables via serverless endpoints.
4. Replace `data-domain` in the Plausible script with your domain or add your preferred analytics.

Local preview:

Open `protfolio.html` in a browser (serve from a local static server to test service worker):

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000/protfolio.html
```

Files added:
- `manifest.json`, `service-worker.js`, `favicon.svg`, `icon-192.svg`, `icon-512.svg`
- `supabase-client.js` (scaffold)
- `README.md`, `vercel.json` (Vercel config)

GitHub upload & deployment notes

1. Initialize and push to GitHub:

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

2. If you want the repo to serve as a GitHub Pages site, rename `protfolio.html` to `index.html` or add a redirect `index.html` that forwards to `protfolio.html`.

3. To deploy on Vercel (recommended): Import the GitHub repo in Vercel and deploy. Vercel will use `protfolio.html` as the static entry.

4. To remove Supabase later: delete `supabase-client.js`, remove the Supabase script tag in `protfolio.html`, and clean up any leaderboard UI.

