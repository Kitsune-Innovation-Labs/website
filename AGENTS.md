# Agent Instructions — Kitsune Innovation Labs Website

This repository contains the public website for Kitsune Innovation Labs.

## Scope
- Preserve the public site at `/`.
- Preserve the public charter at `/charter/`.
- Preserve the Kitsunebi design lab/playground at `/design/`.
- Build and preserve the KitsuneOS site at `/kitsuneos/`.
- Preserve the GameTable product page at `/gametable/`.

## Branch and deployment model
- `main` is the production source branch for `kitsunelabs.nz`.
- `dev` is the staging/development branch.
- Visual, content, navigation and deployment-affecting site changes should normally be validated on `dev` before promotion to `main`.
- Staging is assembled by `Kitsune-Innovation-Labs/website-dev` and published at `dev.kitsunelabs.nz`.
- Keep `main` untouched while a change is still under staging review unless the Board explicitly authorises production promotion.

## Rules
- Do not publish private or internal-only Kitsune Innovation Labs material here.
- Treat `Kitsune-Innovation-Labs/kitsunelabs` as the canonical organisational knowledge repository when available.
- Prefer small, reviewable changes.
- Do not modify established Kitsunebi design principles merely to simplify implementation.
- Keep generated build output out of Git; GitHub Actions should build it during deployment.
- When adding a new public top-level route, update the deployment assembly, relevant site navigation, and repository documentation together.
- Preserve the custom domains `kitsunelabs.nz` for production and `dev.kitsunelabs.nz` for staging unless the Board explicitly changes them.
