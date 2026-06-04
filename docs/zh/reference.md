# 参考与链接

## 仓库

| 仓库 | 作用 |
|------|------|
| [Observables](https://github.com/Skymly/Observables) | Roslyn 源生成器、运行时、测试 |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | 示例应用（默认 NuGet `0.1.0-preview2`） |
| [Observables.Docs](https://github.com/Skymly/Observables.Docs) | 本文档站点 |

## NuGet 包（`0.1.0-preview2`）

| 包 ID | 源 |
|-------|-----|
| [Observables.Events.R3](https://www.nuget.org/packages/Observables.Events.R3/0.1.0-preview2) | nuget.org |
| [Observables.Events.Reactive](https://www.nuget.org/packages/Observables.Events.Reactive/0.1.0-preview2) | nuget.org |
| [Observables.RestAPI.R3](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.0-preview2) | nuget.org |
| [Observables.RestAPI.Reactive](https://www.nuget.org/packages/Observables.RestAPI.Reactive/0.1.0-preview2) | nuget.org |
| Observables.SignalR.R3 | 下一版预览（仓库 CI 已打包） |
| Observables.SignalR.Reactive | 下一版预览（仓库 CI 已打包） |

亦可从 GitHub Packages（`https://nuget.pkg.github.com/Skymly/index.json`）还原（需凭据）。

## 功能域（生成器仓库）

| 域 | R3 生成器 | Reactive 生成器 | 说明 |
|----|-----------|-----------------|------|
| Events | `Observables.Events.R3.SourceGenerators` | `Observables.Events.Reactive.SourceGenerators` | 含经典与路由事件（`ObservableRoutedEvents`） |
| RestAPI | `Observables.RestAPI.R3.SourceGenerators` | `Observables.RestAPI.Reactive.SourceGenerators` | 运行时在元包内 |
| SignalR | `Observables.SignalR.R3.SourceGenerators` | `Observables.SignalR.Reactive.SourceGenerators` | 仓库已实现；NuGet 随下一预览发布 |
| WebSocket、Mqtt、Grpc | 骨架 | 骨架 | 尚未打包 |

## 外部运行时

- [R3](https://github.com/Cysharp/R3)
- [System.Reactive](https://github.com/dotnet/reactive)

## 诊断

见 [诊断](diagnostics.md) 专页（Events `OBS2001`–`OBS2004`、RestAPI `OBS3001`–`OBS3005`、SignalR `OBS4001`–`OBS4006`）。
