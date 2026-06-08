# SignalR

Declarative **ASP.NET Core SignalR client** hub interfaces with compile-time proxy generation. Hub invokes, sends, server streams, and client callbacks map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.SignalR.R3` | R3 `Observable<T>`, `Observable<Unit>` for sends |
| `Observables.SignalR.Reactive` | `IObservable<T>`, `IObservable<Unit>` |

Both include the **Observables.SignalR** runtime (`HubService`, `SignalRObservable` bridges) and the matching Roslyn analyzer. **`0.1.0-preview5`** and later are on [nuget.org](https://www.nuget.org/packages/Observables.SignalR.R3) (same model as Events/RestAPI).

Also reference [Microsoft.AspNetCore.SignalR.Client](https://www.nuget.org/packages/Microsoft.AspNetCore.SignalR.Client) and **R3** or **System.Reactive** in your app.

## Define a hub

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

using var sub = hub.ReceiveMessage.Subscribe(m => Console.WriteLine(m.Text));
await hub.Send("alice", "hello").FirstAsync();
int count = await hub.GetUserCount().FirstAsync();
```

### Boundary attributes

| Attribute | Member | SignalR client API |
|-----------|--------|-------------------|
| `[HubInvoke]` | Method | `InvokeAsync<T>` (cold, single value) |
| `[HubSend]` | Method | `SendAsync` → `Observable<Unit>` |
| `[HubStream]` | Method | `StreamAsync<T>` (multiple values) |
| `[HubOn]` | Property | `On<T>` (hot multicast per proxy property) |

Method names default to the hub method name when the attribute name is omitted. Optional trailing `CancellationToken` is forwarded to invoke/stream calls.

## System.Reactive

Use `IObservable<T>` return types and `Observables.SignalR.Reactive`; entry point remains `HubService.For<T>(connection)`.

## Diagnostics

See [Diagnostics](diagnostics.md#signalr-obs4001obs4006).

## Design notes

Implementation details and generator output shape are documented in the Observables repo: [`docs/design/signalr.md`](https://github.com/Skymly/Observables/blob/main/docs/design/signalr.md).
