# Samples

Runnable applications:

**[github.com/Skymly/Observables.Samples](https://github.com/Skymly/Observables.Samples)**

## Run (NuGet, default)

Requires .NET 8 only — no sibling `Observables` clone.

```powershell
git clone https://github.com/Skymly/Observables.Samples.git
cd Observables.Samples
dotnet run --project Observables.Samples.Events
dotnet run --project Observables.Samples.Events.Reactive
dotnet run --project Observables.Samples.RestAPI
dotnet run --project Observables.Samples.RestAPI.Reactive
dotnet run --project Observables.Samples.SignalR
dotnet run --project Observables.Samples.Mqtt
dotnet run --project Observables.Samples.WebSocket
dotnet run --project Observables.Samples.Grpc
dotnet run --project Observables.Samples.Sse
dotnet run --project Observables.Samples.Sse.Reactive
dotnet run --project Observables.Samples.Nats
dotnet run --project Observables.Samples.Nats.Reactive

# Avalonia routed events (desktop only; not run in CI)
dotnet run --project Observables.Samples.Events.Routed
```

CI uses Nuke `./build.cmd Ci` (console samples only). Default NuGet version **`0.1.2`** ([Events](https://www.nuget.org/packages/Observables.Events.R3/0.1.2), [RestAPI](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.2), [SignalR](https://www.nuget.org/packages/Observables.SignalR.R3/0.1.2), [Mqtt](https://www.nuget.org/packages/Observables.Mqtt.R3/0.1.2), [WebSocket](https://www.nuget.org/packages/Observables.WebSocket.R3/0.1.2), [Grpc](https://www.nuget.org/packages/Observables.Grpc.R3/0.1.2), [Sse](https://www.nuget.org/packages/Observables.Sse.R3/0.1.2), [Nats](https://www.nuget.org/packages/Observables.Nats.R3/0.1.2)).

## Projects

| Sample | Demonstrates |
|--------|------------|
| **Observables.Samples.Events** | `Events()`, `EventHandlers()`, multiple subscribers on one stream |
| **Observables.Samples.Events.Reactive** | `IObservable` from classic events |
| **Observables.Samples.Events.Routed** | Avalonia `AttachedRoutedEvent` + `<ObservableRoutedEvents>` |
| **Observables.Samples.RestAPI** | `Task` / `Observable<T>`, list GET, `ApiException` with MockHttp |
| **Observables.Samples.RestAPI.Reactive** | `IObservable<T>` + `FirstAsync().ToTask()`, 404 handling |
| **Observables.Samples.SignalR** | `[Hub]` interface, `HubService.For` factory registration (CI skips live hub) |
| **Observables.Samples.Mqtt** | `[Mqtt]` topic proxy, `MqttService.For` factory registration (CI skips live broker) |
| **Observables.Samples.WebSocket** | `[WebSocket]` proxy, `WebSocketService.For` factory registration (CI skips live server) |
| **Observables.Samples.Grpc** | `[Grpc]` proxy, `GrpcService.For` factory registration (CI skips live server) |
| **Observables.Samples.Sse** | `[Sse]` proxy, `SseService.For` factory registration (CI skips live server) |
| **Observables.Samples.Sse.Reactive** | `[Sse]` `IObservable` proxy registration (CI skips live server) |
| **Observables.Samples.Nats** | `[Nats]` subject proxy, `NatsService.For` factory registration (CI skips live server) |
| **Observables.Samples.Nats.Reactive** | `[Nats]` `IObservable` proxy registration (CI skips live server) |

## Local generator development

When `../Observables/Observables.slnx` exists:

```powershell
dotnet build -p:UseLocalObservables=true
dotnet run --project Observables.Samples.Events -p:UseLocalObservables=true
```

See the samples repo `build/README-LocalSourceGenerators.md`.
