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

# Avalonia routed events (desktop only; not run in CI)
dotnet run --project Observables.Samples.Events.Routed
```

CI uses Nuke `./build.cmd Ci` (console samples only). Default NuGet version **`0.1.0-preview3`** ([Events](https://www.nuget.org/packages/Observables.Events.R3/0.1.0-preview3), [RestAPI](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.0-preview3), [SignalR](https://www.nuget.org/packages/Observables.SignalR.R3/0.1.0-preview3) — SignalR has no sample project here; see [SignalR](./signalr.md)).

## Projects

| Sample | Demonstrates |
|--------|------------|
| **Observables.Samples.Events** | `Events()`, `EventHandlers()`, multiple subscribers on one stream |
| **Observables.Samples.Events.Reactive** | `IObservable` from classic events |
| **Observables.Samples.Events.Routed** | Avalonia `AttachedRoutedEvent` + `<ObservableRoutedEvents>` |
| **Observables.Samples.RestAPI** | `Task` / `Observable<T>`, list GET, `ApiException` with MockHttp |
| **Observables.Samples.RestAPI.Reactive** | `IObservable<T>` + `FirstAsync().ToTask()`, 404 handling |

## Local generator development

When `../Observables/Observables.slnx` exists:

```powershell
dotnet build -p:UseLocalObservables=true
dotnet run --project Observables.Samples.Events -p:UseLocalObservables=true
```

See the samples repo `build/README-LocalSourceGenerators.md`.
