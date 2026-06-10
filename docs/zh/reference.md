# 参考与链接

## 仓库

| 仓库 | 作用 |
|------|------|
| [Observables](https://github.com/Skymly/Observables) | Roslyn 源生成器、运行时、测试 |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | 示例应用（默认 NuGet `0.1.0-preview7`） |
| [Observables.Docs](https://github.com/Skymly/Observables.Docs) | 本文档站点 |

## NuGet 包（`0.1.0-preview7`）

| 包 ID | 源 |
|-------|-----|
| [Observables.Events.R3](https://www.nuget.org/packages/Observables.Events.R3/0.1.0-preview7) | nuget.org |
| [Observables.Events.Reactive](https://www.nuget.org/packages/Observables.Events.Reactive/0.1.0-preview7) | nuget.org |
| [Observables.RestAPI.R3](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.0-preview7) | nuget.org |
| [Observables.RestAPI.Reactive](https://www.nuget.org/packages/Observables.RestAPI.Reactive/0.1.0-preview7) | nuget.org |
| [Observables.SignalR.R3](https://www.nuget.org/packages/Observables.SignalR.R3/0.1.0-preview7) | nuget.org |
| [Observables.SignalR.Reactive](https://www.nuget.org/packages/Observables.SignalR.Reactive/0.1.0-preview7) | nuget.org |
| [Observables.Mqtt.R3](https://www.nuget.org/packages/Observables.Mqtt.R3/0.1.0-preview7) | nuget.org |
| [Observables.Mqtt.Reactive](https://www.nuget.org/packages/Observables.Mqtt.Reactive/0.1.0-preview7) | nuget.org |
| [Observables.WebSocket.R3](https://www.nuget.org/packages/Observables.WebSocket.R3/0.1.0-preview7) | nuget.org |
| [Observables.WebSocket.Reactive](https://www.nuget.org/packages/Observables.WebSocket.Reactive/0.1.0-preview7) | nuget.org |
| [Observables.Grpc.R3](https://www.nuget.org/packages/Observables.Grpc.R3/0.1.0-preview7) | nuget.org |
| [Observables.Grpc.Reactive](https://www.nuget.org/packages/Observables.Grpc.Reactive/0.1.0-preview7) | nuget.org |
| [Observables.Sse.R3](https://www.nuget.org/packages/Observables.Sse.R3/0.1.0-preview7) | nuget.org |
| [Observables.Sse.Reactive](https://www.nuget.org/packages/Observables.Sse.Reactive/0.1.0-preview7) | nuget.org |

亦可从 GitHub Packages（`https://nuget.pkg.github.com/Skymly/index.json`）还原（需凭据）。

## 功能域（生成器仓库）

| 域 | R3 生成器 | Reactive 生成器 | 说明 |
|----|-----------|-----------------|------|
| Events | `Observables.Events.R3.SourceGenerators` | `Observables.Events.Reactive.SourceGenerators` | 含经典与路由事件（`ObservableRoutedEvents`） |
| RestAPI | `Observables.RestAPI.R3.SourceGenerators` | `Observables.RestAPI.Reactive.SourceGenerators` | 运行时在元包内 |
| SignalR | `Observables.SignalR.R3.SourceGenerators` | `Observables.SignalR.Reactive.SourceGenerators` | 运行时在元包内 |
| Mqtt | `Observables.Mqtt.R3.SourceGenerators` | `Observables.Mqtt.Reactive.SourceGenerators` | 运行时在元包内 |
| WebSocket | `Observables.WebSocket.R3.SourceGenerators` | `Observables.WebSocket.Reactive.SourceGenerators` | 运行时在元包内 |
| Grpc | `Observables.Grpc.R3.SourceGenerators` | `Observables.Grpc.Reactive.SourceGenerators` | 运行时在元包内 |
| Sse | `Observables.Sse.R3.SourceGenerators` | `Observables.Sse.Reactive.SourceGenerators` | 运行时在元包内 |

## 外部运行时

- [R3](https://github.com/Cysharp/R3)
- [System.Reactive](https://github.com/dotnet/reactive)

## 诊断

见 [诊断](diagnostics.md) 专页（Events `OBS2001`–`OBS2004`、RestAPI `OBS3001`–`OBS3005`、SignalR `OBS4001`–`OBS4007`、Mqtt `OBS5001`–`OBS5007`、WebSocket `OBS6001`–`OBS6007`、gRPC `OBS7001`–`OBS7007`、Sse `OBS8001`–`OBS8007`、共享 `OBS0001`）。
