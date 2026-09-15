# WebSocket

Declarative **client WebSocket** interfaces with compile-time proxy generation. Connect, close, send, and receive boundaries map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.WebSocket.R3` | R3 `Observable<T>`, `Observable<Unit>` for lifecycle/send |
| `Observables.WebSocket.Reactive` | `IObservable<T>`, `IObservable<Unit>` |

Both include the backend-neutral **Observables.WebSocket** runtime (`WebSocketService`) and the matching Roslyn analyzer. The `WebSocketObservable` R3 bridges ship only in the `.R3` package; the `.Reactive` package carries its System.Reactive adapter instead.

Both packages ship on [nuget.org](https://www.nuget.org/packages/Observables.WebSocket.R3) from **`0.1.1`** (same model as Events/RestAPI/SignalR/Mqtt).

Also reference **R3** or **System.Reactive** in your app. The runtime uses BCL **`System.Net.WebSockets.ClientWebSocket`** only — no third-party WebSocket library.

## Define a WebSocket proxy

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

### Boundary attributes

| Attribute | Member | BCL API |
|-----------|--------|---------|
| `[WebSocketConnect]` | Method | `ClientWebSocket.ConnectAsync` |
| `[WebSocketClose]` | Method | `ClientWebSocket.CloseAsync` (`NormalClosure`) |
| `[WebSocketSend]` | Method | `ClientWebSocket.SendAsync` → `Observable<Unit>` (cold) |
| `[WebSocketReceive]` | Property | Background receive loop (hot, cached per proxy) |

**Connect** requires exactly one `Uri` parameter and optional trailing `CancellationToken`. **Close** has no non-CT parameters. **Send** supports no payload (empty frame), `string` (UTF-8 text), or `byte[]` (binary); other types are JSON-serialized on **net8+** only. **Receive** members are read-only properties; the observable is lazy-cached on the proxy instance.

Configure headers, TLS, keep-alive, and other `ClientWebSocket` options **before** passing the socket to `WebSocketService.For<T>`.

### Named sends

A raw socket has no subject or topic to address, so the name in `[WebSocketSend(messageName)]` travels in the message itself. A named send frames a JSON envelope instead of the raw payload:

```csharp
[WebSocketSend("chat.send")]
Observable<Unit> SendChat(string message, CancellationToken cancellationToken = default);

await hub.SendChat("hello").FirstAsync();
// text frame: {"type":"chat.send","payload":"hello"}
```

`payload` is omitted when the method takes no arguments and becomes an object when it takes several. Because the envelope is JSON, named sends work on **net8+** only and throw `NotSupportedException` on netstandard2.0; a `byte[]` argument inside an envelope is base64-encoded rather than sent as a binary frame. Sends without a name keep the plain dispatch described above.

`[WebSocketReceive(messageName)]` accepts a name too, but the receive loop does not filter on it yet.

## System.Reactive

Use `IObservable<T>` return types and `Observables.WebSocket.Reactive`; entry point remains `WebSocketService.For<T>(socket)`.

## Diagnostics

See [Diagnostics](diagnostics.md#websocket-obs6001obs6006).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/websocket.md`](https://github.com/Skymly/Observables/blob/main/docs/design/websocket.md).
