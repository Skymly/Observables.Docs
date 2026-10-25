# Observables.Docs — AI agent notes

## Scope

Documentation site only (VitePress). Generator and API changes belong in [Observables](https://github.com/Skymly/Observables).

## Commands

```bash
npm install
npm run docs:dev
npm run docs:build
```

## Version sync

- `.vitepress/observables-version.ts` is the single source for the shown package version; pages use the `%%OBS_VERSION%%` token.
- `pwsh scripts/sync-observables-version.ps1 -Version <x.y.z>` rewrites it. The Observables release pipeline calls it to open a bump PR after a stable release.
- `.github/workflows/version-drift.yml` asserts the referenced version equals the latest stable on nuget.org and scans for stale version literals.

## Language

- User-facing docs: English under `docs/`, 简体中文 under `docs/zh/` (keep pairs in sync when editing guides).
- Commit messages and GitHub Issue/PR text: **English**.

## Git

- Do not commit or push unless the user asks.
