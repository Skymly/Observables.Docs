# 示例

可运行示例仓库：

**[github.com/Skymly/Observables.Samples](https://github.com/Skymly/Observables.Samples)**

## 运行（默认 NuGet）

仅需 .NET 8，**无需** 克隆 `Observables`。

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

# Avalonia 路由事件（需图形环境；CI 不运行）
dotnet run --project Observables.Samples.Events.Routed
```

CI 使用 Nuke `./build.cmd Ci`（仅控制台示例）。默认 NuGet 版本 **`0.1.0-preview5`**（[Events](https://www.nuget.org/packages/Observables.Events.R3/0.1.0-preview5)、[RestAPI](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.0-preview5)、[SignalR](https://www.nuget.org/packages/Observables.SignalR.R3/0.1.0-preview5)、[Mqtt](https://www.nuget.org/packages/Observables.Mqtt.R3/0.1.0-preview5)、[WebSocket](https://www.nuget.org/packages/Observables.WebSocket.R3/0.1.0-preview5)）。

## 项目

| 示例 | 内容 |
|------|------|
| **Observables.Samples.Events** | `Events()`、`EventHandlers()`、多订阅同一事件流 |
| **Observables.Samples.Events.Reactive** | 经典事件 → `IObservable` |
| **Observables.Samples.Events.Routed** | Avalonia `AttachedRoutedEvent` + `<ObservableRoutedEvents>` |
| **Observables.Samples.RestAPI** | `Task` / `Observable<T>`、列表 GET、`ApiException`（MockHttp） |
| **Observables.Samples.RestAPI.Reactive** | `IObservable<T>`、`FirstAsync().ToTask()`、404 |
| **Observables.Samples.SignalR** | `[Hub]` 接口、`HubService.For` 工厂注册（CI 不连真实 Hub） |
| **Observables.Samples.Mqtt** | `[Mqtt]` 主题代理、`MqttService.For` 工厂注册（CI 不连真实 Broker） |
| **Observables.Samples.WebSocket** | `[WebSocket]` 代理、`WebSocketService.For` 工厂注册（CI 不连真实服务端） |

## 本地生成器开发

存在 `../Observables/Observables.slnx` 时：

```powershell
dotnet build -p:UseLocalObservables=true
dotnet run --project Observables.Samples.Events -p:UseLocalObservables=true
```

详见示例仓 `build/README-LocalSourceGenerators.md`。
