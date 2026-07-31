# Diagnostics

Compiler diagnostics emitted by Observables source generators and shared analyzers (IDs are stable per domain).

## Shared (OBS0001, OBS*007)

| ID | Severity | When |
|----|----------|------|
| <span id="obs0001">**OBS0001**</span> | Error | Both `.R3` and `.Reactive` Observables packages referenced for the same feature |
| <span id="obs3007">**OBS3007**</span> | Warning | Empty `[RestApi]` interface (RestAPI) |
| <span id="obs4007">**OBS4007**</span> | Warning | Empty `[Hub]` interface (SignalR) |
| <span id="obs5007">**OBS5007**</span> | Warning | Empty `[Mqtt]` interface |
| <span id="obs6007">**OBS6007**</span> | Warning | Empty `[WebSocket]` interface |
| <span id="obs7007">**OBS7007**</span> | Warning | Empty `[Grpc]` interface |
| <span id="obs8007">**OBS8007**</span> | Warning | Empty `[Sse]` interface |
| <span id="obs9007">**OBS9007**</span> | Warning | Empty `[Nats]` interface |
| <span id="obs10007">**OBS10007**</span> | Warning | Empty `[Postgres]` interface |

Category: `Observables` / per-domain analyzer.

## Events (OBS2001–OBS2005)

| ID | Severity | When |
|----|----------|------|
| <span id="obs2001">**OBS2001**</span> | Warning | Classic **Events()** — unsupported event delegate signature |
| <span id="obs2002">**OBS2002**</span> | Warning | **EventHandlers()** — not `EventHandler` / `(object, T)` shape |
| <span id="obs2003">**OBS2003**</span> | Warning | **RoutedEvents()** — unsupported routed event delegate |
| <span id="obs2004">**OBS2004**</span> | Warning | **RoutedEventHandlers()** — unsupported routed handler delegate |
| <span id="obs2005">**OBS2005**</span> | Error | Unexpected internal failure in the Events source generator |

Category: `Observables.Events`.

## RestAPI (OBS3001–OBS3006, OBS3007)

| ID | Severity | When |
|----|----------|------|
| <span id="obs3001">**OBS3001**</span> | Warning | Interface method missing HTTP verb attribute or non-literal path |
| <span id="obs3002">**OBS3002**</span> | Error | Observables.RestAPI runtime not referenced |
| <span id="obs3003">**OBS3003**</span> | Error | Unsupported return type on API method |
| <span id="obs3004">**OBS3004**</span> | Error | Path template does not match method parameters |
| <span id="obs3005">**OBS3005**</span> | Error | `IObservable<T>` return without Observables.RestAPI.Reactive package |
| <span id="obs3006">**OBS3006**</span> | Error | Unexpected internal failure in the RestAPI source generator |
| <span id="obs3007">**OBS3007**</span> | Warning | Empty `[RestApi]` interface (analyzer) |

Category: `Observables.RestAPI`.

## SignalR (OBS4001–OBS4008)

| ID | Severity | When |
|----|----------|------|
| <span id="obs4001">**OBS4001**</span> | Warning | Hub member missing boundary attribute or non-literal hub method name |
| <span id="obs4002">**OBS4002**</span> | Error | Observables.SignalR runtime not referenced |
| <span id="obs4003">**OBS4003**</span> | Error | Unsupported return type (must be `Observable<T>` / `IObservable<T>`; Send needs `Unit`) |
| <span id="obs4004">**OBS4004**</span> | Error | Member shape mismatch (e.g. `[HubOn]` on a method) |
| <span id="obs4005">**OBS4005**</span> | Error | `IObservable<T>` without Observables.SignalR.Reactive package |
| <span id="obs4006">**OBS4006**</span> | Error | Unsupported client-to-server streaming parameter |
| <span id="obs4008">**OBS4008**</span> | Error | Unexpected internal failure in the SignalR source generator |

Category: `Observables.SignalR`.

## Mqtt (OBS5001–OBS5008)

| ID | Severity | When |
|----|----------|------|
| <span id="obs5001">**OBS5001**</span> | Warning | Mqtt member missing boundary attribute or non-literal topic template |
| <span id="obs5002">**OBS5002**</span> | Error | Observables.Mqtt runtime not referenced |
| <span id="obs5003">**OBS5003**</span> | Error | Unsupported return type on Mqtt member |
| <span id="obs5004">**OBS5004**</span> | Error | Member shape mismatch (e.g. `[MqttSubscribe]` on a method) |
| <span id="obs5005">**OBS5005**</span> | Error | `IObservable<T>` without Observables.Mqtt.Reactive package |
| <span id="obs5006">**OBS5006**</span> | Error | Unsupported topic template, extra parameters, or subscribe placeholder syntax |
| <span id="obs5008">**OBS5008**</span> | Error | Unexpected internal failure in the Mqtt source generator |

Category: `Observables.Mqtt`.

## WebSocket (OBS6001–OBS6008)

| ID | Severity | When |
|----|----------|------|
| <span id="obs6001">**OBS6001**</span> | Warning | WebSocket member missing boundary attribute |
| <span id="obs6002">**OBS6002**</span> | Error | Observables.WebSocket runtime not referenced |
| <span id="obs6003">**OBS6003**</span> | Error | Unsupported return type on WebSocket member |
| <span id="obs6004">**OBS6004**</span> | Error | Member shape mismatch (e.g. `[WebSocketReceive]` on a method) |
| <span id="obs6005">**OBS6005**</span> | Error | `IObservable<T>` without Observables.WebSocket.Reactive package |
| <span id="obs6006">**OBS6006**</span> | Error | Unsupported shape or parameter combination |
| <span id="obs6008">**OBS6008**</span> | Error | Unexpected internal failure in the WebSocket source generator |

Category: `Observables.WebSocket`.

## gRPC (OBS7001–OBS7008, OBS7007)

| ID | Severity | When |
|----|----------|------|
| <span id="obs7001">**OBS7001**</span> | Warning | gRPC member missing boundary attribute |
| <span id="obs7002">**OBS7002**</span> | Error | Observables.Grpc runtime not referenced |
| <span id="obs7003">**OBS7003**</span> | Error | Unsupported return type on gRPC member |
| <span id="obs7004">**OBS7004**</span> | Error | Member shape mismatch (e.g. wrong parameters for unary) |
| <span id="obs7005">**OBS7005**</span> | Error | `IObservable<T>` without Observables.Grpc.Reactive package |
| <span id="obs7006">**OBS7006**</span> | Error | Unsupported parameter combination or option |
| <span id="obs7007">**OBS7007**</span> | Warning | Empty `[Grpc]` interface (analyzer) |
| <span id="obs7008">**OBS7008**</span> | Error | Unexpected internal failure in the gRPC source generator |

Category: `Observables.Grpc`.

## Sse (OBS8001–OBS8006, OBS8007)

| ID | Severity | When |
|----|----------|------|
| <span id="obs8001">**OBS8001**</span> | Warning | SSE member missing `[SseEvent]` boundary attribute |
| <span id="obs8002">**OBS8002**</span> | Error | Observables.Sse runtime not referenced |
| <span id="obs8003">**OBS8003**</span> | Error | Unsupported return type on SSE member |
| <span id="obs8004">**OBS8004**</span> | Error | Member shape mismatch (`[SseEvent]` must be applied to a property) |
| <span id="obs8005">**OBS8005**</span> | Error | `IObservable<T>` without Observables.Sse.Reactive package |
| <span id="obs8006">**OBS8006**</span> | Error | Unexpected internal failure in the Sse source generator |
| <span id="obs8007">**OBS8007**</span> | Warning | Empty `[Sse]` interface (analyzer) |

Category: `Observables.Sse`.

## Nats (OBS9001–OBS9008, OBS9007)

| ID | Severity | When |
|----|----------|------|
| <span id="obs9001">**OBS9001**</span> | Warning | Nats member missing boundary attribute or non-literal subject template |
| <span id="obs9002">**OBS9002**</span> | Error | Observables.Nats runtime not referenced |
| <span id="obs9003">**OBS9003**</span> | Error | Unsupported return type on Nats member |
| <span id="obs9004">**OBS9004**</span> | Error | Member shape mismatch (e.g. `[NatsSubscribe]` on a method) |
| <span id="obs9005">**OBS9005**</span> | Error | `IObservable<T>` without Observables.Nats.Reactive package |
| <span id="obs9006">**OBS9006**</span> | Error | Unsupported subject template, extra parameters, or subscribe placeholder syntax |
| <span id="obs9007">**OBS9007**</span> | Warning | Empty `[Nats]` interface (analyzer) |
| <span id="obs9008">**OBS9008**</span> | Error | Unexpected internal failure in the Nats source generator |

Category: `Observables.Nats`.

<span id="postgres-obs10001obs10008-obs10007"></span>

## Postgres (OBS10001–OBS10008, OBS10007)

| ID | Severity | When |
|----|----------|------|
| <span id="obs10001">**OBS10001**</span> | Warning | Postgres member missing `[Listen]`/`[Notify]` or non-literal channel name |
| <span id="obs10002">**OBS10002**</span> | Error | Observables.Postgres runtime not referenced |
| <span id="obs10003">**OBS10003**</span> | Error | Unsupported return type on Postgres member |
| <span id="obs10004">**OBS10004**</span> | Error | Member shape mismatch (e.g. `[Listen]` on a method) |
| <span id="obs10005">**OBS10005**</span> | Error | `IObservable<T>` without Observables.Postgres.Reactive package |
| <span id="obs10006">**OBS10006**</span> | Error | Unsupported channel name, `{param}` placeholder, or Notify parameter shape |
| <span id="obs10007">**OBS10007**</span> | Warning | Empty `[Postgres]` interface (analyzer) |
| <span id="obs10008">**OBS10008**</span> | Error | Unexpected internal failure in the Postgres source generator |

Category: `Observables.Postgres`.
