---
layout: home

hero:
  name: Observables
  text: 用 Roslyn 连接反应式边界
  tagline: 面向 R3 与 System.Reactive 的源生成器：经典与路由事件、RestAPI 等
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/getting-started
    - theme: alt
      text: GitHub
      link: https://github.com/Skymly/Observables

features:
  - title: 双运行时
    details: 每个功能域提供 Observables.&lt;Feature&gt;.R3 与 Observables.&lt;Feature&gt;.Reactive NuGet 元包。
  - title: Events
    details: 基于接口的 CLR 事件与可选 UI 路由事件（如 Avalonia）可观察封装。
  - title: RestAPI
    details: 声明式 HTTP 客户端，生成 Task 与 Observable 适配器。
  - title: SignalR
    details: Hub 客户端代理：Invoke、Send、流与回调均可观察化。
  - title: Mqtt
    details: 基于 MQTTnet 的主题发布/订阅代理 — `0.1.0-preview4` 起已上 nuget.org。
---

## 状态

::: info NuGet 预览版
**`0.1.0-preview4`** — [Events](https://www.nuget.org/packages/Observables.Events.R3/0.1.0-preview4)、[RestAPI](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.0-preview4)、[SignalR](https://www.nuget.org/packages/Observables.SignalR.R3/0.1.0-preview4)、[Mqtt](https://www.nuget.org/packages/Observables.Mqtt.R3/0.1.0-preview4) 及 Reactive 对应包。参见 [Observables.Samples](https://github.com/Skymly/Observables.Samples) 或 [快速开始](./getting-started.md)。
:::

## 下一步

| 页面 | 说明 |
|------|------|
| [快速开始](./getting-started.md) | NuGet 安装与可选本地克隆 |
| [示例](./samples.md) | 可运行示例仓库 |
| [参考与链接](./reference.md) | 包、仓库、诊断 |

本站将随各 **Feature** 域稳定逐步扩充。参见 [关于本站](./about-this-site.md)。
