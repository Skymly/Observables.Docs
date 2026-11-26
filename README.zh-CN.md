# Observables.Docs

[English](README.md) | **简体中文** | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md)

**[Skymly/Observables](https://github.com/Skymly/Observables)** 的静态文档站点，基于 **[VitePress](https://vitepress.dev/)** 构建（支持本地搜索、English + 简体中文）。

## 在线站点

**https://skymly.github.io/Observables.Docs/**

从 `main` 分支通过 **GitHub Pages** 工作流自动部署（`build_type: workflow`）。

## 环境要求

- **Node.js 22**（见 [`.nvmrc`](.nvmrc)）

## 本地开发

```bash
npm install
npm run docs:dev
```

默认本地地址：`http://localhost:5173/Observables.Docs/`

## 构建与预览

```bash
npm run docs:build
npm run docs:preview
```

生产构建输出目录：`.vitepress/dist`

## 仓库布局

| 路径 | 用途 |
|------|------|
| `docs/` | 英文 Markdown |
| `docs/zh/` | 简体中文 Markdown |
| `.vitepress/config.mts` | 站点配置、`base`、多语言、侧边栏 |
| `.github/workflows/github-pages.yml` | CI 构建与 GitHub Pages 部署 |

## 相关仓库

| 链接 | 说明 |
|------|------|
| [Observables](https://github.com/Skymly/Observables) | 源生成器与运行时 |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | 可运行示例应用 |

## 许可证

MIT — 见 [LICENSE](LICENSE)。
