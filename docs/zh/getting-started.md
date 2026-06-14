# 快速开始

## 环境

- [.NET SDK](https://dotnet.microsoft.com/download) — 库与示例为 **.NET 8**；生成器仓库 Nuke 使用 **.NET 10**（`global.json`）
- Git

## NuGet 包（预览）

**`0.1.0-preview8`** 已发布至 [nuget.org](https://www.nuget.org/packages/Observables.Events.R3)（**16** 个元包：Events、RestAPI、SignalR、Mqtt、WebSocket、Grpc、Sse）。每个功能域有两个包（R3 与 System.Reactive）：

| 包 | 适用场景 |
|----|----------|
| `Observables.Events.R3` | 经典 / 路由 CLR 事件 → R3 |
| `Observables.Events.Reactive` | 同上 → `IObservable<T>` |
| `Observables.RestAPI.R3` | 声明式 HTTP → `Task` + R3 `Observable<T>` |
| `Observables.RestAPI.Reactive` | 同上 → System.Reactive |
| `Observables.SignalR.R3` | SignalR 客户端 Hub → R3 |
| `Observables.SignalR.Reactive` | 同上 → System.Reactive |
| `Observables.Mqtt.R3` | MQTT 主题代理 → R3 |
| `Observables.Mqtt.Reactive` | 同上 → System.Reactive |
| `Observables.WebSocket.R3` | WebSocket 客户端代理 → R3 |
| `Observables.WebSocket.Reactive` | 同上 → System.Reactive |
| `Observables.Grpc.R3` | gRPC 客户端代理 → R3 |
| `Observables.Grpc.Reactive` | 同上 → System.Reactive |
| `Observables.Sse.R3` | SSE（`text/event-stream`）代理 → R3 |
| `Observables.Sse.Reactive` | 同上 → System.Reactive |
| `Observables.Nats.R3` | Core NATS subject 代理 → R3（规划 `0.1.0-preview8`） |
| `Observables.Nats.Reactive` | 同上 → System.Reactive（规划 `0.1.0-preview8`） |

预览版仅 **打 tag + 推 NuGet**，**不**创建 GitHub Release。请自行添加 `R3` 或 `System.Reactive`。

### Events（R3）

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

路由 UI 事件（如 Avalonia）已并入 **Events**；在项目中设置 `<ObservableRoutedEvents>true</ObservableRoutedEvents>`（见 [Events](events.md#路由事件avalonia--wpf)）。

### RestAPI（R3）

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

### SignalR（R3）

见 [SignalR](signalr.md)。

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

### Mqtt（R3）

见 [Mqtt](mqtt.md)。

```xml
<PackageReference Include="Observables.Mqtt.R3" Version="0.1.0-preview8" />
<PackageReference Include="MQTTnet" Version="4.3.7.1207" />
<PackageReference Include="R3" Version="1.3.0" />
```

请固定 **MQTTnet 4.x**（勿用 5.x），说明见 [Mqtt — 为何使用 MQTTnet 4.x](mqtt.md#为何使用-mqttnet-4x-而非-5x)。

```csharp
using Observables.Mqtt;
using R3;

var topics = MqttService.For<IMyTopics>(mqttClient);
```

### WebSocket（R3）

见 [WebSocket](websocket.md)。

```xml
<PackageReference Include="Observables.WebSocket.R3" Version="0.1.0-preview8" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.WebSocket;
using R3;

var hub = WebSocketService.For<IMyHub>(clientWebSocket);
```

### gRPC（R3）

见 [gRPC](grpc.md)。

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

### Sse（R3）

见 [Sse](sse.md)。

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

### Nats（R3）

见 [Nats](nats.md)。

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

## 并列克隆（可选）

开发生成器时可并列放置于 **Observables** 项目目录下（与 Code Root 工作区布局一致）：

```
<workspace-root>/
  Skymly/
    Observables/
      Observables/
      Observables.Samples/
      Observables.Docs/
```

[Observables.Samples](https://github.com/Skymly/Observables.Samples) 默认用 NuGet；存在 `../Observables` 时可用 `-p:UseLocalObservables=true`。

## 构建生成器解决方案

```powershell
cd Observables
dotnet build Observables.slnx
```

## 本地预览文档

```bash
cd Observables.Docs
npm install
npm run docs:dev
```
