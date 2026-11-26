# Observables.Docs

[English](README.md) | [简体中文](README.zh-CN.md) | **繁體中文** | [日本語](README.ja.md)

**[Skymly/Observables](https://github.com/Skymly/Observables)** 的靜態文件網站，使用 **[VitePress](https://vitepress.dev/)** 建置（支援本機搜尋、English + 简体中文）。

## 線上網站

**https://skymly.github.io/Observables.Docs/**

由 `main` 分支透過 **GitHub Pages** 工作流程自動部署（`build_type: workflow`）。

## 環境需求

- **Node.js 22**（請參閱 [`.nvmrc`](.nvmrc)）

## 本機開發

```bash
npm install
npm run docs:dev
```

預設開發網址：`http://localhost:5173/Observables.Docs/`

## 建置與預覽

```bash
npm run docs:build
npm run docs:preview
```

正式建置輸出目錄：`.vitepress/dist`

## 儲存庫版面配置

| 路徑 | 用途 |
|------|------|
| `docs/` | 英文 Markdown |
| `docs/zh/` | 簡體中文 Markdown |
| `.vitepress/config.mts` | 網站組態、`base`、多語系、側邊欄 |
| `.github/workflows/github-pages.yml` | CI 建置與 GitHub Pages 部署 |

## 相關連結

| 連結 | 說明 |
|------|------|
| [Observables](https://github.com/Skymly/Observables) | 原始碼產生器與執行階段 |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | 可執行範例應用程式 |

## 授權條款

MIT — 請參閱 [LICENSE](LICENSE)。
