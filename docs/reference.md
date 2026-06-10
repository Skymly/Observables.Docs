# Reference & links

## Repositories

| Repository | Role |
|------------|------|
| [Observables](https://github.com/Skymly/Observables) | Roslyn source generators, runtime, tests |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | Demo applications (NuGet `0.1.0-preview7` by default) |
| [Observables.Docs](https://github.com/Skymly/Observables.Docs) | This documentation site |

## NuGet packages (`0.1.0-preview7`)

| Package ID | Feed |
|------------|------|
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

Also published to GitHub Packages (`https://nuget.pkg.github.com/Skymly/index.json`) when using org feed credentials.

## Feature domains (generator repo)

| Domain | R3 generator | Reactive generator | Notes |
|--------|--------------|-------------------|--------|
| Events | `Observables.Events.R3.SourceGenerators` | `Observables.Events.Reactive.SourceGenerators` | Includes classic + routed events (`ObservableRoutedEvents`) |
| RestAPI | `Observables.RestAPI.R3.SourceGenerators` | `Observables.RestAPI.Reactive.SourceGenerators` | Runtime in meta-package |
| SignalR | `Observables.SignalR.R3.SourceGenerators` | `Observables.SignalR.Reactive.SourceGenerators` | Runtime in meta-package |
| Mqtt | `Observables.Mqtt.R3.SourceGenerators` | `Observables.Mqtt.Reactive.SourceGenerators` | Runtime in meta-package |
| WebSocket | `Observables.WebSocket.R3.SourceGenerators` | `Observables.WebSocket.Reactive.SourceGenerators` | Runtime in meta-package |
| Grpc | `Observables.Grpc.R3.SourceGenerators` | `Observables.Grpc.Reactive.SourceGenerators` | Runtime in meta-package |
| Sse | `Observables.Sse.R3.SourceGenerators` | `Observables.Sse.Reactive.SourceGenerators` | Runtime in meta-package |

## External runtimes

- [R3](https://github.com/Cysharp/R3)
- [System.Reactive](https://github.com/dotnet/reactive)

## Diagnostics

See the [Diagnostics](diagnostics.md) page (Events `OBS2001`–`OBS2004`, RestAPI `OBS3001`–`OBS3005`, SignalR `OBS4001`–`OBS4007`, Mqtt `OBS5001`–`OBS5007`, WebSocket `OBS6001`–`OBS6007`, gRPC `OBS7001`–`OBS7007`, Sse `OBS8001`–`OBS8007`, shared `OBS0001`).
