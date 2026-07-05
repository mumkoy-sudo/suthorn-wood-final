# Suthorn Wood — LIVE source for suthorn.co.th

This repository is the canonical live source for the Suthorn Wood static website.

- Live domain: https://suthorn.co.th
- Netlify project: `magnificent-lamington-d64acd`
- Netlify deploy source: `mumkoy-sudo/suthorn-wood-final` branch `main`
- Deploy method: push to `main` → Netlify auto-deploys production
- No build step: static HTML/CSS/JS, `netlify.toml` publishes the repository root (`.`)

Important files:

- `google58c5545170f0d245.html` — Google Search Console verification file. Do not remove.
- `robots.txt` — SEO crawler rules.
- `sitemap.xml` — sitemap submitted to search engines.
- `AUTO_DEPLOY_CHECK.txt` — harmless verification file used to confirm Netlify auto-deploy.

Operational note:

There is another repository/folder named `suthorn-wood-website` that has been used as a staging/working copy. For production changes, sync approved files into this repository and push here.
