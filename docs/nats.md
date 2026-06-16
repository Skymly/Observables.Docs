# Nats

Declarative **Core NATS** subject interfaces with compile-time proxy generation. Subscribe, publish, and request-reply boundaries map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.Nats.R3` | R3 `Observable<T>`; publish → `Observable<Unit>`; request → cold single-value stream |
| `Observables.Nats.Reactive` | `IObservable<T>`, `IObservable<Unit>` |

Both include the **Observables.Nats** runtime (`NatsService`, `NatsObservable` bridges) and the matching Roslyn analyzer.

The NATS domain ships from **`0.1.0`** (same model as the other domains). Also reference [NATS.Client.Core](https://www.nuget.org/packages/NATS.Client.Core) and **R3** or **System.Reactive** in your app.

**v1 scope**: Core NATS **Subscribe / Publish / Request-Reply** only. **JetStream** is documented as follow-up work in the Observables design notes — not part of the first release.

## Define a subject proxy

```csharp
using NATS.Client.Core;
using Observables.Nats;
using R3;

[Nats]
public interface IOrderHub
{
    [NatsSubscribe("orders.>")]
    Observable<OrderEvent> OrderEvents { get; }

    [NatsPublish("orders.{id}.cancel")]
    Observable<Unit> Cancel(string id, CancellationToken cancellationToken = default);

    [NatsRequest("orders.validate")]
    Observable<ValidationResult> Validate(OrderRequest request, CancellationToken cancellationToken = default);
}

await using var nats = new NatsConnection(new NatsOpts { Url = "nats://127.0.0.1:4222" });
var hub = NatsService.For<IOrderHub>(nats);

using var sub = hub.OrderEvents.Subscribe(e => Console.WriteLine(e));
await hub.Cancel("42").FirstAsync();
var result = await hub.Validate(new OrderRequest()).FirstAsync();
```

### Boundary attributes

| Attribute | Member | NATS client API |
|-----------|--------|-----------------|
| `[NatsSubscribe]` | Property | `SubscribeAsync` → hot stream |
| `[NatsPublish]` | Method | `PublishAsync` → `Observable<Unit>` (cold, single completion) |
| `[NatsRequest]` | Method | `RequestAsync` → cold single-value `Observable<TResponse>` |

Subject templates use `.` as the token separator. Wildcards: `*` (single token) and `>` (trailing multi-token, suffix only). Publish and request templates may use `{parameter}` placeholders bound to method parameters (`NatsSubject.Format`). **Subscribe subjects must be literal filters** — `{param}` placeholders are rejected (OBS9006).

Subscribe members must be **parameterless properties**; publish and request members are **methods**.

## Payload serialization

`NatsObservable` and generated proxies deserialize payloads through **`NatsPayloadSerializers`**. The built-in default supports **`byte[]`** and UTF-8 **`string`**. On .NET 8+, other types use **System.Text.Json** unless you register a custom serializer:

```csharp
NatsPayloadSerializers.Register<MyDto>(mySerializer);
NatsPayloadSerializers.Current = myFallbackSerializer;
```

Publish and request methods serialize the payload parameter (when present) before sending.

## System.Reactive

Use `IObservable<T>` return types and `Observables.Nats.Reactive`; entry point remains `NatsService.For<T>(connection)`.

## Diagnostics

See [Diagnostics](diagnostics.md#nats-obs9001obs9006-obs9007).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/nats.md`](https://github.com/Skymly/Observables/blob/main/docs/design/nats.md).
