# Samples

Runnable applications:

**[github.com/Skymly/Observables.Samples](https://github.com/Skymly/Observables.Samples)**

## Run (NuGet, default)

Requires .NET 8 only — no sibling `Observables` clone.

```powershell
git clone https://github.com/Skymly/Observables.Samples.git
cd Observables.Samples
dotnet run --project Observables.Samples.Events
dotnet run --project Observables.Samples.RestAPI
```

Packages: **`Observables.Events.R3`** and **`Observables.RestAPI.R3`** at **`0.1.0-preview1`**.

## Projects

| Sample | Demonstrates |
|--------|------------|
| **Observables.Samples.Events** | `Events()`, `EventHandlers()`, multiple subscribers on one stream |
| **Observables.Samples.RestAPI** | `Task` / `Observable<T>`, list GET, `ApiException` with MockHttp |

## Local generator development

When `../Observables/Observables.slnx` exists:

```powershell
dotnet build -p:UseLocalObservables=true
dotnet run --project Observables.Samples.Events -p:UseLocalObservables=true
```

See the samples repo `build/README-LocalSourceGenerators.md`.
