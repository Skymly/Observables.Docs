# Getting started

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) — **.NET 8** for libraries and samples; **.NET 10** for the generator repo Nuke build (`global.json`)
- Git

## NuGet packages (preview)

**`0.1.0-preview8`** is on [nuget.org](https://www.nuget.org/packages/Observables.Events.R3) (**16** meta-packages: Events, RestAPI, SignalR, Mqtt, WebSocket, Grpc, and Sse). Each feature ships two packages (R3 and System.Reactive):

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
| `Observables.WebSocket.R3` | WebSocket client proxy → R3 |
| `Observables.WebSocket.Reactive` | Same → System.Reactive |
| `Observables.Grpc.R3` | gRPC client proxy → R3 |
| `Observables.Grpc.Reactive` | Same → System.Reactive |
| `Observables.Sse.R3` | Server-Sent Events proxy → R3 |
| `Observables.Sse.Reactive` | Same → System.Reactive |
| `Observables.Nats.R3` | Core NATS subject proxy → R3 (planned `0.1.0-preview8`) |
| `Observables.Nats.Reactive` | Same → System.Reactive (planned `0.1.0-preview8`) |

Preview releases use **Git tag + NuGet only** (no GitHub Release). Always add the matching reactive runtime yourself (`R3` or `System.Reactive`).

### Events (R3)

```xml
<PackageReference Include="Observables.Events.R3" Version="0.1.0-preview8" />
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
<PackageReference Include="Observables.RestAPI.R3" Version="0.1.0-preview8" />
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
<PackageReference Include="Observables.SignalR.R3" Version="0.1.0-preview8" />
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
<PackageReference Include="Observables.Mqtt.R3" Version="0.1.0-preview8" />
<PackageReference Include="MQTTnet" Version="4.3.7.1207" />
<PackageReference Include="R3" Version="1.3.0" />
```

Pin **MQTTnet 4.x** (not 5.x) — see [Mqtt — Why MQTTnet 4.x](mqtt.md#why-mqttnet-4-x-not-5-x).

```csharp
using Observables.Mqtt;
using R3;

var topics = MqttService.For<IMyTopics>(mqttClient);
```

### WebSocket (R3)

See [WebSocket](websocket.md).

```xml
<PackageReference Include="Observables.WebSocket.R3" Version="0.1.0-preview8" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.WebSocket;
using R3;

var hub = WebSocketService.For<IMyHub>(clientWebSocket);
```

### gRPC (R3)

See [gRPC](grpc.md).

```xml
<PackageReference Include="Observables.Grpc.R3" Version="0.1.0-preview8" />
<PackageReference Include="Grpc.Net.Client" Version="2.67.0" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.Grpc;
using Grpc.Net.Client;
using R3;

var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = GrpcService.For<IMyService>(channel.CreateCallInvoker());
```

### Sse (R3)

See [Sse](sse.md).

```xml
<PackageReference Include="Observables.Sse.R3" Version="0.1.0-preview8" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.Sse;
using R3;

var feed = SseService.For<IPriceFeed>(new SseConnection(httpClient, endpoint));
using var sub = feed.Prices.Subscribe(tick => Console.WriteLine(tick));
```

### Nats (R3)

See [Nats](nats.md).

```xml
<PackageReference Include="Observables.Nats.R3" Version="0.1.0-preview8" />
<PackageReference Include="NATS.Client.Core" Version="2.8.1" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.Nats;
using R3;

var hub = NatsService.For<IMyHub>(natsConnection);
```

## Clone layout (optional)

For generator development, place repositories as siblings under the **Observables** project folder (same layout as the Code Root workspace):

```
<workspace-root>/
  Skymly/
    Observables/
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
