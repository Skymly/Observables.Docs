# SignalR

声明式 **ASP.NET Core SignalR 客户端** Hub 接口：编译期生成代理，将 Invoke/Send/流式调用与服务端回调桥接为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.SignalR.R3` | R3 `Observable<T>`；Send 为 `Observable<Unit>` |
| `Observables.SignalR.Reactive` | `IObservable<T>`、`IObservable<Unit>` |

两包均含 **Observables.SignalR** 运行时（`HubService`、`SignalRObservable` 桥接）及对应 Roslyn 分析器。**`0.1.1`** 及更新版本已发布至 [nuget.org](https://www.nuget.org/packages/Observables.SignalR.R3)（与 Events/RestAPI 相同模式）。

应用侧还需引用 [Microsoft.AspNetCore.SignalR.Client](https://www.nuget.org/packages/Microsoft.AspNetCore.SignalR.Client) 以及 **R3** 或 **System.Reactive**。

## 定义 Hub 接口

```csharp
using Observables.SignalR;
using R3;
using Microsoft.AspNetCore.SignalR.Client;

[Hub]
public interface IChatHub
{
    [HubInvoke]
    Observable<int> GetUserCount();

    [HubSend("Send")]
    Observable<Unit> Send(string user, string message);

    [HubStream("Counter")]
    Observable<int> Counter(int count, int delayMs);

    [HubOn("ReceiveMessage")]
    Observable<ChatMessage> ReceiveMessage { get; }
}

var connection = new HubConnectionBuilder()
    .WithUrl("https://example.com/chathub")
    .Build();
await connection.StartAsync();

var hub = HubService.For<IChatHub>(connection);
```

### 边界特性

| 特性 | 成员 | 对应客户端 API |
|------|------|----------------|
| `[HubInvoke]` | 方法 | `InvokeAsync<T>`（冷流，单元素） |
| `[HubSend]` | 方法 | `SendAsync` → `Observable<Unit>` |
| `[HubStream]` | 方法 | `StreamAsync<T>`（多元素） |
| `[HubOn]` | 属性 | `On<T>`（代理属性级多播热流） |

特性未写方法名时，默认使用成员名。方法末尾可选 `CancellationToken`，会传给 Invoke/Stream。

## System.Reactive

返回类型改为 `IObservable<T>`，引用 `Observables.SignalR.Reactive`；入口仍为 `HubService.For<T>(connection)`。

## 诊断

见 [诊断](diagnostics.md#signalr-obs4001obs4006)。

## 设计说明

实现与生成物形状见 Observables 仓库 [`docs/design/signalr.md`](https://github.com/Skymly/Observables/blob/main/docs/design/signalr.md)。
