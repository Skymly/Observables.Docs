# Sse (Server-Sent Events)

Declarative **Server-Sent Events** (`text/event-stream`) interfaces with compile-time proxy generation. Each named event boundary maps to an R3 `Observable<T>` or `IObservable<T>` that filters by event name and deserializes the payload.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.Sse.R3` | R3 `Observable<T>` |
| `Observables.Sse.Reactive` | `IObservable<T>` |

Both include the **Observables.Sse** runtime (`SseService`, `SseConnection`, `SseObservable` bridges) and the matching Roslyn analyzer.

The SSE domain is implemented and validated; it ships from **`0.1.0-preview7`** (same model as the other domains). Also reference **R3** or **System.Reactive** in your app. The runtime uses BCL **`System.Net.Http.HttpClient`** only — no third-party SSE library.

## Define an SSE proxy

```csharp
using Observables.Sse;
using R3;

[Sse]
public interface IPriceFeed
{
    [SseEvent("price")]
    Observable<PriceTick> Prices { get; }

    [SseEvent("trade")]
    Observable<string> Trades { get; }

    [SseEvent]
    Observable<string> Heartbeats { get; } // default "message" event
}

var connection = new SseConnection(new HttpClient(), new Uri("https://feed.example.com/stream"));
var feed = SseService.For<IPriceFeed>(connection);

using var sub = feed.Prices.Subscribe(tick => Console.WriteLine(tick));
```

### Boundary attribute

| Attribute | Member | Behavior |
|-----------|--------|----------|
| `[SseEvent("name")]` | Property | Filters the stream by `event: name`, deserializes `data:` payloads |
| `[SseEvent]` | Property | Maps to the default `message` event |

**Members must be read-only properties** returning `Observable<T>` (R3) or `IObservable<T>` (System.Reactive). `string` payloads pass through verbatim; any other `T` is deserialized with **`System.Text.Json`** (net8+). Each `Subscribe` opens a fresh SSE connection over the supplied `HttpClient`; multi-line `data:` fields are joined with `\n` and comment lines (`:`) are ignored per the SSE specification.

Configure base address, default headers, and handlers on the `HttpClient` **before** constructing the `SseConnection`.

`[Sse(endpointName?)]` on the interface optionally selects the endpoint name (defaults to the interface name without the leading `I`). When omitted, the endpoint name is inferred from the interface.

## System.Reactive

Use `IObservable<T>` return types and `Observables.Sse.Reactive`; entry point remains `SseService.For<T>(connection)`.

## Diagnostics

See [Diagnostics](diagnostics.md#sse-obs8001obs8005-obs8007).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/sse.md`](https://github.com/Skymly/Observables/blob/main/docs/design/sse.md).
