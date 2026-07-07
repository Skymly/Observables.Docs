# Diagnostics

Compiler diagnostics emitted by Observables source generators and shared analyzers (IDs are stable per domain).

## Shared (OBS0001, OBS*007)

| ID | Severity | When |
|----|----------|------|
| **OBS0001** | Error | Both `.R3` and `.Reactive` Observables packages referenced for the same feature |
| **OBS3007** | Warning | Empty `[RestApi]` interface (RestAPI) |
| **OBS4007** | Warning | Empty `[Hub]` interface (SignalR) |
| **OBS5007** | Warning | Empty `[Mqtt]` interface |
| **OBS6007** | Warning | Empty `[WebSocket]` interface |
| **OBS7007** | Warning | Empty `[Grpc]` interface |
| **OBS8007** | Warning | Empty `[Sse]` interface |
| **OBS9007** | Warning | Empty `[Nats]` interface |

Category: `Observables` / per-domain analyzer.

## Events (OBS2001–OBS2005)

| ID | Severity | When |
|----|----------|------|
| **OBS2001** | Warning | Classic **Events()** — unsupported event delegate signature |
| **OBS2002** | Warning | **EventHandlers()** — not `EventHandler` / `(object, T)` shape |
| **OBS2003** | Warning | **RoutedEvents()** — unsupported routed event delegate |
| **OBS2004** | Warning | **RoutedEventHandlers()** — unsupported routed handler delegate |
| **OBS2005** | Error | Unexpected internal failure in the Events source generator |

Category: `Observables.Events`.

## RestAPI (OBS3001–OBS3006, OBS3007)

| ID | Severity | When |
|----|----------|------|
| **OBS3001** | Warning | Interface method missing HTTP verb attribute or non-literal path |
| **OBS3002** | Error | Observables.RestAPI runtime not referenced |
| **OBS3003** | Error | Unsupported return type on API method |
| **OBS3004** | Error | Path template does not match method parameters |
| **OBS3005** | Error | `IObservable<T>` return without Observables.RestAPI.Reactive package |
| **OBS3006** | Error | Unexpected internal failure in the RestAPI source generator |
| **OBS3007** | Warning | Empty `[RestApi]` interface (analyzer) |

Category: `Observables.RestAPI`.

## SignalR (OBS4001–OBS4008)

| ID | Severity | When |
|----|----------|------|
| **OBS4001** | Warning | Hub member missing boundary attribute or non-literal hub method name |
| **OBS4002** | Error | Observables.SignalR runtime not referenced |
| **OBS4003** | Error | Unsupported return type (must be `Observable<T>` / `IObservable<T>`; Send needs `Unit`) |
| **OBS4004** | Error | Member shape mismatch (e.g. `[HubOn]` on a method) |
| **OBS4005** | Error | `IObservable<T>` without Observables.SignalR.Reactive package |
| **OBS4006** | Error | Unsupported client-to-server streaming parameter |
| **OBS4008** | Error | Unexpected internal failure in the SignalR source generator |

Category: `Observables.SignalR`.

## Mqtt (OBS5001–OBS5008)

| ID | Severity | When |
|----|----------|------|
| **OBS5001** | Warning | Mqtt member missing boundary attribute or non-literal topic template |
| **OBS5002** | Error | Observables.Mqtt runtime not referenced |
| **OBS5003** | Error | Unsupported return type on Mqtt member |
| **OBS5004** | Error | Member shape mismatch (e.g. `[MqttSubscribe]` on a method) |
| **OBS5005** | Error | `IObservable<T>` without Observables.Mqtt.Reactive package |
| **OBS5006** | Error | Unsupported topic template, extra parameters, or subscribe placeholder syntax |
| **OBS5008** | Error | Unexpected internal failure in the Mqtt source generator |

Category: `Observables.Mqtt`.

## WebSocket (OBS6001–OBS6008)

| ID | Severity | When |
|----|----------|------|
| **OBS6001** | Warning | WebSocket member missing boundary attribute |
| **OBS6002** | Error | Observables.WebSocket runtime not referenced |
| **OBS6003** | Error | Unsupported return type on WebSocket member |
| **OBS6004** | Error | Member shape mismatch (e.g. `[WebSocketReceive]` on a method) |
| **OBS6005** | Error | `IObservable<T>` without Observables.WebSocket.Reactive package |
| **OBS6006** | Error | Unsupported shape or parameter combination |
| **OBS6008** | Error | Unexpected internal failure in the WebSocket source generator |

Category: `Observables.WebSocket`.

## gRPC (OBS7001–OBS7008, OBS7007)

| ID | Severity | When |
|----|----------|------|
| **OBS7001** | Warning | gRPC member missing boundary attribute |
| **OBS7002** | Error | Observables.Grpc runtime not referenced |
| **OBS7003** | Error | Unsupported return type on gRPC member |
| **OBS7004** | Error | Member shape mismatch (e.g. wrong parameters for unary) |
| **OBS7005** | Error | `IObservable<T>` without Observables.Grpc.Reactive package |
| **OBS7006** | Error | Unsupported parameter combination or option |
| **OBS7007** | Warning | Empty `[Grpc]` interface (analyzer) |
| **OBS7008** | Error | Unexpected internal failure in the gRPC source generator |

Category: `Observables.Grpc`.

## Sse (OBS8001–OBS8006, OBS8007)

| ID | Severity | When |
|----|----------|------|
| **OBS8001** | Warning | SSE member missing `[SseEvent]` boundary attribute |
| **OBS8002** | Error | Observables.Sse runtime not referenced |
| **OBS8003** | Error | Unsupported return type on SSE member |
| **OBS8004** | Error | Member shape mismatch (`[SseEvent]` must be applied to a property) |
| **OBS8005** | Error | `IObservable<T>` without Observables.Sse.Reactive package |
| **OBS8006** | Error | Unexpected internal failure in the Sse source generator |
| **OBS8007** | Warning | Empty `[Sse]` interface (analyzer) |

Category: `Observables.Sse`.

## Nats (OBS9001–OBS9008, OBS9007)

| ID | Severity | When |
|----|----------|------|
| **OBS9001** | Warning | Nats member missing boundary attribute or non-literal subject template |
| **OBS9002** | Error | Observables.Nats runtime not referenced |
| **OBS9003** | Error | Unsupported return type on Nats member |
| **OBS9004** | Error | Member shape mismatch (e.g. `[NatsSubscribe]` on a method) |
| **OBS9005** | Error | `IObservable<T>` without Observables.Nats.Reactive package |
| **OBS9006** | Error | Unsupported subject template, extra parameters, or subscribe placeholder syntax |
| **OBS9007** | Warning | Empty `[Nats]` interface (analyzer) |
| **OBS9008** | Error | Unexpected internal failure in the Nats source generator |

Category: `Observables.Nats`.
