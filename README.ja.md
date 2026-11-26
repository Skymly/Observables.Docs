# Observables.Docs

[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | **日本語**

**[Skymly/Observables](https://github.com/Skymly/Observables)** 向けの静的ドキュメントサイトです（**[VitePress](https://vitepress.dev/)** 製・ローカル検索対応・English + 简体中文）。

## 公開サイト

**https://skymly.github.io/Observables.Docs/**

`main` ブランチから **GitHub Pages** ワークフロー（`build_type: workflow`）によりデプロイされます。

## 前提条件

- **Node.js 22**（[`.nvmrc`](.nvmrc) を参照）

## ローカル開発

```bash
npm install
npm run docs:dev
```

デフォルトの開発 URL：`http://localhost:5173/Observables.Docs/`

## ビルドとプレビュー

```bash
npm run docs:build
npm run docs:preview
```

本番出力先：`.vitepress/dist`

## リポジトリ構成

| パス | 用途 |
|------|------|
| `docs/` | 英語 Markdown |
| `docs/zh/` | 簡体字中国語 Markdown |
| `.vitepress/config.mts` | サイト設定、`base`、i18n、サイドバー |
| `.github/workflows/github-pages.yml` | CI ビルドと GitHub Pages デプロイ |

## 関連リンク

| リンク | 説明 |
|------|------|
| [Observables](https://github.com/Skymly/Observables) | ソースジェネレーターとランタイム |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | 実行可能なサンプルアプリ |

## ライセンス

MIT — [LICENSE](LICENSE) を参照してください。
