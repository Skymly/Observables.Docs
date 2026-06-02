# 参考与链接

## 仓库

| 仓库 | 作用 |
|------|------|
| [Observables](https://github.com/Skymly/Observables) | Roslyn 源生成器、运行时、测试 |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | 示例应用 |
| [Observables.Docs](https://github.com/Skymly/Observables.Docs) | 本文档站点 |

## 功能域（生成器仓库）

| 域 | R3 生成器 | Reactive 生成器 |
|----|-----------|-----------------|
| Events | `Observables.Events.R3.SourceGenerators` | `Observables.Events.Reactive.SourceGenerators` |
| RoutedEvents | `Observables.RoutedEvents.R3.SourceGenerators` | `Observables.RoutedEvents.Reactive.SourceGenerators` |
| RestAPI | `Observables.RestAPI.R3.SourceGenerators` | `Observables.RestAPI.Reactive.SourceGenerators` |

## 外部运行时

- [R3](https://github.com/Cysharp/R3)
- [System.Reactive](https://github.com/dotnet/reactive)

## 诊断

诊断 ID 按域分段（例如 Events `OBS2xxx`、RestAPI `OBS300x`、RoutedEvents `OBS400x`）。公开 API 稳定后将在本站提供汇总页；目前请参阅主仓库 `Observables.SourceGenerators.Shared`。
