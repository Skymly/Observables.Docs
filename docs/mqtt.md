# Mqtt

Declarative **MQTT client** topic interfaces with compile-time proxy generation. Publish and subscribe boundaries map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.Mqtt.R3` | R3 `Observable<T>`; publish → `Observable<Unit>` |
| `Observables.Mqtt.Reactive` | `IObservable<T>`, `IObservable<Unit>` |

Both include the **Observables.Mqtt** runtime (`MqttService`, `MqttObservable` bridges) and the matching Roslyn analyzer.

Both packages ship on [nuget.org](https://www.nuget.org/packages/Observables.Mqtt.R3) from **`0.1.0`** (same model as Events/RestAPI/SignalR).

Also reference [MQTTnet](https://www.nuget.org/packages/MQTTnet) **4.3.7.1207** (4.x line) and **R3** or **System.Reactive** in your app. Use the **same major version** as the meta-package — do not mix **MQTTnet 5.x** with `Observables.Mqtt` until a future release documents support.

## Why MQTTnet 4.x (not 5.x)

Observables.Mqtt is built and tested against **[MQTTnet 4.3.7.1207](https://www.nuget.org/packages/MQTTnet/4.3.7.1207)**. This is the **library** major version (NuGet package `MQTTnet`), not the same thing as the **MQTT wire protocol** version (3.1.1 vs 5.0).

| Reason | Explanation |
|--------|-------------|
| **Target frameworks** | `Observables.Mqtt.R3` / `.Reactive` include a `netstandard2.0` build. [MQTTnet 5](https://github.com/dotnet/MQTTnet/wiki/Upgrading-guide) targets **.NET 8+ only** and drops netstandard. |
| **Public API alignment** | The runtime uses 4.x types such as `IMqttClient`, `MqttFactory`, and `ApplicationMessageReceivedAsync`. MQTTnet 5 removes several interfaces, splits `MqttClientFactory` / `MqttServerFactory`, and changes event patterns — a breaking migration for `MqttService.For<T>`. |
| **Feature scope** | The first release maps **publish / subscribe** only (MQTT 3.1.1-style pub/sub). MQTT-5-only features (request/response, user properties, reason codes) and a MQTTnet 5 upgrade are **follow-up** work in the Observables repo. |
| **Broker compatibility** | MQTTnet 4 typically negotiates **MQTT 3.1.1** by default. Most brokers still support that; you can configure protocol version in your own `ConnectAsync` options when the broker requires it. Observables does not depend on MQTT-5-only wire features today. |

When Observables adds MQTTnet 5 support, it will be called out in release notes and this page. Until then, pin **4.3.7.1207** (or another **4.x** version compatible with your app, matching the transitive dependency from the meta-package). See the [MQTTnet upgrading guide](https://github.com/dotnet/MQTTnet/wiki/Upgrading-guide) for differences between 4.x and 5.x.

## Define a topic proxy

```csharp
using Observables.Mqtt;
using MQTTnet;
using MQTTnet.Client;
using R3;

[Mqtt]
public interface ISensorTopics
{
    [MqttSubscribe("sensors/{deviceId}/temperature")]
    Observable<double> Temperature { get; }

    [MqttPublish("commands/{deviceId}/restart")]
    Observable<Unit> Restart(string deviceId);
}

var factory = new MqttFactory();
var client = factory.CreateMqttClient();
await client.ConnectAsync(
    new MqttClientOptionsBuilder()
        .WithTcpServer("broker.example.com", 1883)
        .Build());

var topics = MqttService.For<ISensorTopics>(client);

using var sub = topics.Temperature.Subscribe(t => Console.WriteLine(t));
await topics.Restart("device-42").FirstAsync();
```

### Boundary attributes

| Attribute | Member | MQTT client API |
|-----------|--------|-----------------|
| `[MqttPublish]` | Method | `PublishAsync` → `Observable<Unit>` (cold, single completion) |
| `[MqttSubscribe]` | Property | `SubscribeAsync` + `ApplicationMessageReceived` (hot stream) |

Topic templates use `{parameter}` placeholders bound to method parameters (`MqttTopic.Format`). MQTT `+` and `#` wildcards stay in the template literal. Subscribe members must be **parameterless properties**; publish members are **methods**.

## Payload serialization

`MqttObservable` and generated proxies deserialize subscribe payloads through **`MqttPayloadSerializers.Current`** (`IMqttPayloadSerializer`). The built-in default supports **`byte[]`** and UTF-8 **`string`** only — Observables.Mqtt does **not** reference System.Text.Json or other serializers.

For DTO types (JSON, Protobuf, etc.), register a **typed** serializer (preferred) or replace the global fallback:

```csharp
// Per-type (recommended)
MqttPayloadSerializers.Register<TemperatureReading>(myReadingSerializer);
// or with delegates
MqttPayloadSerializers.Register<int>(
    payload => int.Parse(Encoding.UTF8.GetString(payload)),
    value => Encoding.UTF8.GetBytes(value.ToString()));

// Global fallback for unregistered types
MqttPayloadSerializers.Current = myFallbackSerializer;
```

Future optional packages may ship ready-made adapters; the runtime stays serializer-agnostic.

## System.Reactive

Use `IObservable<T>` return types and `Observables.Mqtt.Reactive`; entry point remains `MqttService.For<T>(client)`.

## Diagnostics

See [Diagnostics](diagnostics.md#mqtt-obs5001obs5006).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/mqtt.md`](https://github.com/Skymly/Observables/blob/main/docs/design/mqtt.md).
