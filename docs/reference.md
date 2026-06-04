# Reference & links

## Repositories

| Repository | Role |
|------------|------|
| [Observables](https://github.com/Skymly/Observables) | Roslyn source generators, runtime, tests |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | Demo applications (NuGet `0.1.0-preview4` by default) |
| [Observables.Docs](https://github.com/Skymly/Observables.Docs) | This documentation site |

## NuGet packages (`0.1.0-preview4`)

| Package ID | Feed |
|------------|------|
| [Observables.Events.R3](https://www.nuget.org/packages/Observables.Events.R3/0.1.0-preview4) | nuget.org |
| [Observables.Events.Reactive](https://www.nuget.org/packages/Observables.Events.Reactive/0.1.0-preview4) | nuget.org |
| [Observables.RestAPI.R3](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.0-preview4) | nuget.org |
| [Observables.RestAPI.Reactive](https://www.nuget.org/packages/Observables.RestAPI.Reactive/0.1.0-preview4) | nuget.org |
| [Observables.SignalR.R3](https://www.nuget.org/packages/Observables.SignalR.R3/0.1.0-preview4) | nuget.org |
| [Observables.SignalR.Reactive](https://www.nuget.org/packages/Observables.SignalR.Reactive/0.1.0-preview4) | nuget.org |
| [Observables.Mqtt.R3](https://www.nuget.org/packages/Observables.Mqtt.R3/0.1.0-preview4) | nuget.org |
| [Observables.Mqtt.Reactive](https://www.nuget.org/packages/Observables.Mqtt.Reactive/0.1.0-preview4) | nuget.org |

Also published to GitHub Packages (`https://nuget.pkg.github.com/Skymly/index.json`) when using org feed credentials.

## Feature domains (generator repo)

| Domain | R3 generator | Reactive generator | Notes |
|--------|--------------|-------------------|--------|
| Events | `Observables.Events.R3.SourceGenerators` | `Observables.Events.Reactive.SourceGenerators` | Includes classic + routed events (`ObservableRoutedEvents`) |
| RestAPI | `Observables.RestAPI.R3.SourceGenerators` | `Observables.RestAPI.Reactive.SourceGenerators` | Runtime in meta-package |
| SignalR | `Observables.SignalR.R3.SourceGenerators` | `Observables.SignalR.Reactive.SourceGenerators` | Runtime in meta-package |
| Mqtt | `Observables.Mqtt.R3.SourceGenerators` | `Observables.Mqtt.Reactive.SourceGenerators` | Runtime in meta-package |
| WebSocket, Grpc | skeleton | skeleton | Not packaged yet |

## External runtimes

- [R3](https://github.com/Cysharp/R3)
- [System.Reactive](https://github.com/dotnet/reactive)

## Diagnostics

See the [Diagnostics](diagnostics.md) page (Events `OBS2001`–`OBS2004`, RestAPI `OBS3001`–`OBS3005`, SignalR `OBS4001`–`OBS4006`, Mqtt `OBS5001`–`OBS5006`).
