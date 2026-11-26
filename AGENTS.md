# Observables.Docs

VitePress documentation site only for [Skymly/Observables](https://github.com/Skymly/Observables). Source generator and API changes belong in the main repository.

## Build & Verify

```bash
npm install
npm run docs:dev
npm run docs:build
```

## Version Sync

- `.vitepress/observables-version.ts` is the single source for the displayed package version; markdown pages reference `%%OBS_VERSION%%`.
- `pwsh scripts/sync-observables-version.ps1 -Version <x.y.z>` rewrites it (called automatically by the Observables stable release pipeline).
- `.github/workflows/version-drift.yml` asserts alignment with nuget.org's latest stable version and rejects hardcoded version literals.

## Docs & Language

- Keep user-facing guides paired in sync between English (`docs/`) and Simplified Chinese (`docs/zh/`).
- Commit messages and GitHub Issue/PR text: **English**.
- Do not commit or push unless explicitly requested.
