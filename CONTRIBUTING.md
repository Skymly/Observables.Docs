# Contributing to Observables.Docs

1. Edit Markdown under `docs/` (English) and `docs/zh/` (简体中文) together when changing guides.
2. Run `npm run docs:build` before opening a PR.
3. Write the current package version as `%%OBS_VERSION%%`; it is defined once in `.vitepress/observables-version.ts` and substituted at build time (prose, code blocks, and NuGet links).
3. Link to the [Observables](https://github.com/Skymly/Observables) repository for API and diagnostic details as features land.

Pull requests should use **English** titles and descriptions.
