# Redis

Declarative **Redis Pub/Sub** channel interfaces with compile-time proxy generation. Subscribe and Publish boundaries map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.Redis.R3` | R3 `Observable<T>`; Publish → `Observable<Unit>` |
| `Observables.Redis.Reactive` | `IObservable<T>`, `IObservable<Unit>` |

Both include the **Observables.Redis** runtime (`RedisService`, `RedisObservable` bridges) and the matching Roslyn analyzer.

The Redis domain ships from **`0.1.9`** (same model as the other domains). Also reference [StackExchange.Redis](https://www.nuget.org/packages/StackExchange.Redis) and **R3** or **System.Reactive** in your app.

**v1 scope**: classic Redis **SUBSCRIBE / PSUBSCRIBE / PUBLISH** only. **Streams**, keyspace notifications, request-reply, and Cluster **sharded** Pub/Sub are out of scope for the first release.

## Define a Pub/Sub proxy

```csharp
using Observables.Redis;
using R3;
using StackExchange.Redis;

[Redis]
public interface INewsHub
{
    [RedisSubscribe("news.sports")]
    Observable<string> Sports { get; }

    [RedisSubscribe("news.*")]
    Observable<RedisMessage<string>> NewsFamily { get; }

    [RedisPublish("news.{topic}")]
    Observable<Unit> Publish(string topic, string payload, CancellationToken cancellationToken = default);
}

await using var mux = await ConnectionMultiplexer.ConnectAsync("localhost:6379");
var hub = RedisService.For<INewsHub>(mux);

using var sub = hub.Sports.Subscribe(s => Console.WriteLine(s));
await hub.Publish("sports", "goal").FirstAsync();
```

`RedisService.For<T>(IConnectionMultiplexer)` obtains an `ISubscriber` internally. It does **not** dispose the multiplexer you pass in.

### Boundary attributes

| Attribute | Member | Redis | Reactive mapping |
|-----------|--------|-------|------------------|
| `[RedisSubscribe]` | Property | `SUBSCRIBE` or `PSUBSCRIBE` | Hot stream |
| `[RedisPublish]` | Method | `PUBLISH` | `Observable<Unit>` (cold, single completion) |

Subscribe members must be **parameterless properties**; Publish members are **methods** (optional trailing `CancellationToken`).

### Channel vs Pattern

- **Subscribe**: compile-time Channel or Pattern literal. If the string contains `*` or `?`, the proxy uses pattern subscribe (`PSUBSCRIBE`); otherwise exact subscribe (`SUBSCRIBE`). **`{param}` placeholders are rejected** (OBS11006).
- **Publish**: exact Channel only. Templates may use `{param}` bound to method parameter names. **Pattern metacharacters `*` / `?` are rejected** (OBS11006).
- When the Channel / template argument is omitted, the member name is used (same convention as Nats/Mqtt).

### `RedisMessage<T>` vs payload-only

| Return type | Semantics |
|-------------|-----------|
| `Observable<T>` / `IObservable<T>` | Payload only |
| `Observable<RedisMessage<T>>` / `IObservable<RedisMessage<T>>` | Envelope: concrete Channel + payload (Pattern subscribe can branch on Channel) |

`RedisMessage<T>` lives in `Observables.Redis` (avoids clashing with StackExchange.Redis `ChannelMessage`).

Subscribe delivery is **sequential** in v1. Disposing a subscription unsubscribes from Redis.

## Payload serialization

`RedisObservable` and generated proxies use **`RedisPayloadSerializers`**. Default: **`string`** and **`byte[]`** pass through without JSON. Other `T` values use **System.Text.Json** on supported TFMs unless you register a custom serializer:

```csharp
RedisPayloadSerializers.Register<MyDto>(mySerializer);
RedisPayloadSerializers.Current = myFallbackSerializer;
```

## System.Reactive

Use `IObservable<T>` return types and `Observables.Redis.Reactive`; entry point remains `RedisService.For<T>(multiplexer)`.

## Diagnostics

See [Diagnostics](diagnostics.md#redis-obs11001obs11008-obs11007).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/redis.md`](https://github.com/Skymly/Observables/blob/main/docs/design/redis.md).
