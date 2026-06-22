---
layout: home

hero:
  name: Observables
  text: Reactive boundaries from Roslyn
  tagline: Source generators for events, RestAPI, SignalR, Mqtt, WebSocket, and more — R3 and System.Reactive
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Skymly/Observables

features:
  - title: Dual runtimes
    details: Each feature ships as Observables.&lt;Feature&gt;.R3 and Observables.&lt;Feature&gt;.Reactive NuGet meta-packages.
  - title: Events
    details: Interface-based observables for CLR events and optional UI routed events (Avalonia and similar).
  - title: RestAPI
    details: Declarative HTTP clients with generated Task and Observable adapters.
  - title: SignalR
    details: Hub client proxies — invoke, send, stream, and callbacks as observables.
  - title: Mqtt
    details: Topic publish/subscribe proxies over MQTTnet — `Observables.Mqtt.R3` / `.Reactive` on nuget.org.
  - title: WebSocket
    details: Client WebSocket proxies over BCL `ClientWebSocket` — `Observables.WebSocket.R3` / `.Reactive` on nuget.org.
  - title: gRPC
    details: CallInvoker client proxies — unary and streaming RPC as observables (`Observables.Grpc.R3` / `.Reactive`).
  - title: Sse
    details: Server-Sent Events (`text/event-stream`) proxies — named events as observables (`Observables.Sse.R3` / `.Reactive`).
  - title: Nats
    details: Core NATS subject proxies — subscribe, publish, and request-reply (`Observables.Nats.R3` / `.Reactive`).
---

## Status

::: info Preview on NuGet
**`0.1.1`** — **16** meta-packages on nuget.org ([Events](https://www.nuget.org/packages/Observables.Events.R3/0.1.1), [RestAPI](https://www.nuget.org/packages/Observables.RestAPI.R3/0.1.1), [SignalR](https://www.nuget.org/packages/Observables.SignalR.R3/0.1.1), [Mqtt](https://www.nuget.org/packages/Observables.Mqtt.R3/0.1.1), [WebSocket](https://www.nuget.org/packages/Observables.WebSocket.R3/0.1.1), [Grpc](https://www.nuget.org/packages/Observables.Grpc.R3/0.1.1), [Sse](https://www.nuget.org/packages/Observables.Sse.R3/0.1.1), and Reactive counterparts). Try [Observables.Samples](https://github.com/Skymly/Observables.Samples) or [Getting started](./getting-started.md).
:::

## Where to read next

| Page | Purpose |
|------|---------|
| [Getting started](./getting-started.md) | NuGet install and optional local clone |
| [Samples](./samples.md) | Runnable demo repository |
| [Reference](./reference.md) | Packages, repositories, diagnostics |

This site will grow as each **Feature** domain stabilizes. See [About this site](./about-this-site.md).
