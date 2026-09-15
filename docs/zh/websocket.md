# WebSocket

声明式 **WebSocket 客户端**接口：编译期生成代理，将连接、关闭、发送与接收桥接为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.WebSocket.R3` | R3 `Observable<T>`；生命周期/发送为 `Observable<Unit>` |
| `Observables.WebSocket.Reactive` | `IObservable<T>`、`IObservable<Unit>` |

两包均含后端中立的 **Observables.WebSocket** 运行时（`WebSocketService`）及对应 Roslyn 分析器。`WebSocketObservable` 这层 R3 桥接只随 `.R3` 包发布；`.Reactive` 包装的是它自己的 System.Reactive 适配器。

自 **`0.1.1`** 起，两包已发布至 [nuget.org](https://www.nuget.org/packages/Observables.WebSocket.R3)（与 Events/RestAPI/SignalR/Mqtt 相同）。

应用侧还需引用 **R3** 或 **System.Reactive**。运行时使用 BCL **`System.Net.WebSockets.ClientWebSocket`**，无第三方 WebSocket 库依赖。

## 定义 WebSocket 代理

```csharp
using Observables.WebSocket;
using R3;
using System.Net.WebSockets;

[WebSocket]
public interface IEchoHub
{
    [WebSocketConnect]
    Observable<Unit> Connect(Uri uri, CancellationToken cancellationToken = default);

    [WebSocketClose]
    Observable<Unit> Close(CancellationToken cancellationToken = default);

    [WebSocketSend]
    Observable<Unit> SendText(string message, CancellationToken cancellationToken = default);

    [WebSocketReceive("echo")]
    Observable<string> EchoText { get; }
}

var socket = new ClientWebSocket();
var hub = WebSocketService.For<IEchoHub>(socket);

await hub.Connect(new Uri("wss://echo.example.com")).FirstAsync();
using var sub = hub.EchoText.Subscribe(text => Console.WriteLine(text));
await hub.SendText("hello").FirstAsync();
await hub.Close().FirstAsync();
```

### 边界属性

| 属性 | 成员 | BCL API |
|------|------|---------|
| `[WebSocketConnect]` | 方法 | `ClientWebSocket.ConnectAsync` |
| `[WebSocketClose]` | 方法 | `ClientWebSocket.CloseAsync`（`NormalClosure`） |
| `[WebSocketSend]` | 方法 | `ClientWebSocket.SendAsync` → `Observable<Unit>`（冷流） |
| `[WebSocketReceive]` | 属性 | 后台接收循环（热流，代理实例内缓存） |

**Connect** 须恰好一个 `Uri` 参数，可选末尾 `CancellationToken`。**Close** 除 CT 外无参数。**Send** 支持无负载（空帧）、`string`（UTF-8 文本）、`byte[]`（二进制）；其它类型在 **net8+** 上 JSON 序列化。**Receive** 为只读属性；可观察序列在代理上懒加载并缓存。

在将 socket 传给 `WebSocketService.For<T>` **之前**，请自行配置请求头、TLS、Keep-Alive 等 `ClientWebSocket` 选项。

### 具名发送

裸 socket 没有 subject 或 topic 可寻址，所以 `[WebSocketSend(messageName)]` 里的名字只能随报文一起走。具名发送不再直接发原始负载，而是发一个 JSON 信封：

```csharp
[WebSocketSend("chat.send")]
Observable<Unit> SendChat(string message, CancellationToken cancellationToken = default);

await hub.SendChat("hello").FirstAsync();
// 文本帧：{"type":"chat.send","payload":"hello"}
```

方法无参数时省略 `payload`，多参数时 `payload` 为参数组成的对象。信封是 JSON，所以具名发送仅 **net8+** 可用，netstandard2.0 上抛 `NotSupportedException`；信封里的 `byte[]` 参数会编码成 base64 而不再是二进制帧。没写名字的发送仍按上面的原始分派走。

`[WebSocketReceive(messageName)]` 同样接受名字，但接收循环目前不按它过滤。

## System.Reactive

使用 `IObservable<T>` 返回类型与 `Observables.WebSocket.Reactive`；入口仍为 `WebSocketService.For<T>(socket)`。

## 诊断

见 [诊断](diagnostics.md#websocket-obs6001obs6006)。

## 设计说明

实现细节见 Observables 仓库：[`docs/design/websocket.md`](https://github.com/Skymly/Observables/blob/main/docs/design/websocket.md)。
