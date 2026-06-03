# Observables.Docs

Static documentation for **[Skymly/Observables](https://github.com/Skymly/Observables)**, built with **[VitePress](https://vitepress.dev/)** (local search, English + 简体中文).

## Live site

**https://skymly.github.io/Observables.Docs/**

Deployed from `main` via the **GitHub Pages** workflow (`build_type: workflow`).

## Prerequisites

- **Node.js 22** (see [`.nvmrc`](.nvmrc))

## Local development

```bash
npm install
npm run docs:dev
```

Default dev URL: `http://localhost:5173/Observables.Docs/`

## Build and preview

```bash
npm run docs:build
npm run docs:preview
```

Production output: `.vitepress/dist`

## Repository layout

| Path | Purpose |
|------|---------|
| `docs/` | English Markdown |
| `docs/zh/` | 简体中文 Markdown |
| `.vitepress/config.mts` | Site config, `base`, i18n, sidebar |
| `.github/workflows/github-pages.yml` | CI build and GitHub Pages deploy |

## Related

| Link | Description |
|------|-------------|
| [Observables](https://github.com/Skymly/Observables) | Source generators and runtime |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | Runnable sample apps |

## License

MIT — see [LICENSE](LICENSE).
