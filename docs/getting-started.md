# Getting started

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) — **.NET 8** for libraries and samples; **.NET 10** for the generator repo Nuke build (`global.json`)
- Git

## NuGet packages (preview)

**`0.1.0-preview1`** is on [nuget.org](https://www.nuget.org/packages/Observables.Events.R3). Each feature ships two meta-packages (R3 and System.Reactive):

| Package | Use when |
|---------|----------|
| `Observables.Events.R3` | Classic / routed CLR events → R3 |
| `Observables.Events.Reactive` | Same → `IObservable<T>` |
| `Observables.RestAPI.R3` | Declarative HTTP → `Task` + R3 `Observable<T>` |
| `Observables.RestAPI.Reactive` | Same → System.Reactive |

Preview releases use **Git tag + NuGet only** (no GitHub Release). Always add the matching reactive runtime yourself (`R3` or `System.Reactive`).

### Events (R3)

```xml
<PackageReference Include="Observables.Events.R3" Version="0.1.0-preview1" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.Events.R3;
using R3;

var source = new ClickSource();
source.Events().Click.Subscribe(_ => Console.WriteLine("Clicked"));
```

Routed UI events (Avalonia, etc.) are included in **Events**; enable with `<ObservableRoutedEvents>true</ObservableRoutedEvents>` in your project (see [Events](events.md#routed-events-avalonia--wpf)).

### RestAPI (R3)

```xml
<PackageReference Include="Observables.RestAPI.R3" Version="0.1.0-preview1" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.RestAPI;
using R3;

var api = RestService.For<IMyApi>(httpClient);
User user = await api.GetUserAsync(42);
User reactive = await api.GetUserObservable(7).FirstAsync();
```

## Clone layout (optional)

For generator development, place repositories as siblings:

```
Skymly/
  Observables/
  Observables.Samples/
  Observables.Docs/
```

[Observables.Samples](https://github.com/Skymly/Observables.Samples) defaults to NuGet; use `-p:UseLocalObservables=true` when `../Observables` exists.

## Build the generator solution

```powershell
cd Observables
dotnet build Observables.slnx
dotnet run --project build/_build.csproj -- --target Ci --configuration Release
```

## Documentation site (this repo)

```bash
cd Observables.Docs
npm install
npm run docs:dev
```
