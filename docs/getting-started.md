# Getting started

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) — **.NET 8** for libraries and samples; **.NET 10** for the generator repo Nuke build (`global.json`)
- Git

## NuGet packages (preview)

**`0.1.0-preview4`** is on [nuget.org](https://www.nuget.org/packages/Observables.Events.R3) (**8** meta-packages: Events, RestAPI, SignalR, and Mqtt). Each feature ships two packages (R3 and System.Reactive):

| Package | Use when |
|---------|----------|
| `Observables.Events.R3` | Classic / routed CLR events → R3 |
| `Observables.Events.Reactive` | Same → `IObservable<T>` |
| `Observables.RestAPI.R3` | Declarative HTTP → `Task` + R3 `Observable<T>` |
| `Observables.RestAPI.Reactive` | Same → System.Reactive |
| `Observables.SignalR.R3` | SignalR hub client → R3 |
| `Observables.SignalR.Reactive` | Same → System.Reactive |
| `Observables.Mqtt.R3` | MQTT topic proxy → R3 |
| `Observables.Mqtt.Reactive` | Same → System.Reactive |

Preview releases use **Git tag + NuGet only** (no GitHub Release). Always add the matching reactive runtime yourself (`R3` or `System.Reactive`).

### Events (R3)

```xml
<PackageReference Include="Observables.Events.R3" Version="0.1.0-preview4" />
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
<PackageReference Include="Observables.RestAPI.R3" Version="0.1.0-preview4" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.RestAPI;
using R3;

var api = RestService.For<IMyApi>(httpClient);
User user = await api.GetUserAsync(42);
User reactive = await api.GetUserObservable(7).FirstAsync();
```

### SignalR (R3)

See [SignalR](signalr.md).

```xml
<PackageReference Include="Observables.SignalR.R3" Version="0.1.0-preview4" />
<PackageReference Include="Microsoft.AspNetCore.SignalR.Client" Version="8.0.8" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.SignalR;
using R3;

var hub = HubService.For<IMyHub>(hubConnection);
```

### Mqtt (R3)

See [Mqtt](mqtt.md).

```xml
<PackageReference Include="Observables.Mqtt.R3" Version="0.1.0-preview4" />
<PackageReference Include="MQTTnet" Version="4.3.7.1207" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.Mqtt;
using R3;

var topics = MqttService.For<IMyTopics>(mqttClient);
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
