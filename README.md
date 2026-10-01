# Kitsune Innovation Labs Website

Public website for **Kitsune Innovation Labs**, including the Kitsunebi design lab/playground and KitsuneOS site.

## Structure

- `/` — Kitsune Innovation Labs landing page
- `/charter/` — public charter
- `/design/` — Kitsunebi design language and playground
- `/kitsuneos/` — KitsuneOS site, built from the React/Vite source in `kitsuneos/`

## Development

The root site, charter, and Kitsunebi build are static files. KitsuneOS is a Vite application:

```bash
cd kitsuneos
npm ci
npm run dev
```

## Deployment

GitHub Actions builds the KitsuneOS application, assembles the complete site, and deploys it to GitHub Pages. The production custom domain is `kitsunelabs.nz`.
