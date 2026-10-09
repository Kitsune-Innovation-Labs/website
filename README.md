# Kitsune Innovation Labs Website

Public website for **Kitsune Innovation Labs**, including the main organisation site, public charter, Kitsunebi design lab/playground, KitsuneOS site, and GameTable product page.

## Structure
- `/` — Kitsune Innovation Labs landing page
- `/charter/` — public charter
- `/design/` — Kitsunebi design language and playground
- `/kitsuneos/` — KitsuneOS site
- `/gametable/` — GameTable product page

## KitsuneOS development

```bash
cd kitsuneos
npm ci
npm run dev
```

## Branches

- `main` is the production source branch.
- `dev` is the website staging/development branch.

Website changes should normally be developed and reviewed on `dev` before being promoted to `main`.

## Staging

The staging site is published at:

```text
https://dev.kitsunelabs.nz
```

The separate `Kitsune-Innovation-Labs/website-dev` repository mirrors the assembled `website` `dev` branch for GitHub Pages staging.

Its sync workflow:

1. checks out `website` at `dev`;
2. builds KitsuneOS with Node 22;
3. assembles the static site, including `/`, `/charter/`, `/design/`, `/kitsuneos/`, `/gametable/`, and shared assets;
4. publishes the assembled result to `website-dev` `main`;
5. serves it through the `dev.kitsunelabs.nz` custom domain.

The workflow runs on a short schedule and can also be triggered manually when immediate staging refresh is needed.

## Production deployment

GitHub Actions builds KitsuneOS, assembles the full static site, and deploys `main` to GitHub Pages at:

```text
https://kitsunelabs.nz
```

Production should remain untouched while visual/content changes are still being validated on staging.
