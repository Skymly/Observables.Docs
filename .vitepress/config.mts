import { defineConfig } from 'vitepress'
import { readSiteMeta } from './site-meta.node'

const siteBuildMeta = readSiteMeta()

const githubObservables = 'https://github.com/Skymly/Observables'

const enSidebar = [
  { text: 'Introduction', link: '/' },
  { text: 'About this site', link: '/about-this-site' },
  { text: 'Getting started', link: '/getting-started' },
  { text: 'Events', link: '/events' },
  { text: 'RestAPI', link: '/restapi' },
  { text: 'SignalR', link: '/signalr' },
  { text: 'Mqtt', link: '/mqtt' },
  { text: 'Diagnostics', link: '/diagnostics' },
  { text: 'Samples', link: '/samples' },
  { text: 'Reference & links', link: '/reference' },
]

const zhSidebar = [
  { text: '概览', link: '/zh/' },
  { text: '关于本站', link: '/zh/about-this-site' },
  { text: '快速开始', link: '/zh/getting-started' },
  { text: 'Events', link: '/zh/events' },
  { text: 'RestAPI', link: '/zh/restapi' },
  { text: 'SignalR', link: '/zh/signalr' },
  { text: 'Mqtt', link: '/zh/mqtt' },
  { text: '诊断', link: '/zh/diagnostics' },
  { text: '示例', link: '/zh/samples' },
  { text: '参考与链接', link: '/zh/reference' },
]

export default defineConfig({
  srcDir: 'docs',
  vite: {
    define: {
      __SITE_META__: JSON.stringify(siteBuildMeta),
    },
  },
  title: 'Observables',
  description: 'Roslyn source generators bridging events, HTTP, and messaging to R3 and System.Reactive',
  base: '/Observables.Docs/',
  cleanUrls: true,
  lastUpdated: {
    formatOptions: {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZoneName: 'short',
    },
  },
  themeConfig: {
    logo: { text: 'Observables' },
    socialLinks: [{ icon: 'github', link: githubObservables }],
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Skymly',
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/getting-started' },
          { text: 'Samples', link: '/samples' },
          { text: 'GitHub', link: githubObservables },
        ],
        sidebar: enSidebar,
        editLink: {
          pattern:
            'https://github.com/Skymly/Observables.Docs/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        lastUpdatedText: 'Last updated',
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/getting-started' },
          { text: '示例', link: '/zh/samples' },
          { text: 'GitHub', link: githubObservables },
        ],
        sidebar: zhSidebar,
        editLink: {
          pattern:
            'https://github.com/Skymly/Observables.Docs/edit/main/docs/zh/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: '基于 MIT 许可证发布。',
          copyright: 'Copyright © Skymly',
        },
        lastUpdatedText: '页面最后更新于',
      },
    },
  },
})
