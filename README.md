# Kitsune Innovation Labs Website

Public website for **Kitsune Innovation Labs**, including the Kitsunebi design lab/playground and KitsuneOS site.

## Structure
- `/` — Kitsune Innovation Labs landing page
- `/charter/` — public charter
- `/design/` — Kitsunebi design language and playground
- `/kitsuneos/` — KitsuneOS site

## KitsuneOS development
```bash
cd kitsuneos
npm ci
npm run dev
```

## Deployment
GitHub Actions builds KitsuneOS, assembles the full static site, and deploys it to GitHub Pages at `kitsunelabs.nz`.
