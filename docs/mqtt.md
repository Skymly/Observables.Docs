# Mqtt

Declarative **MQTT client** topic interfaces with compile-time proxy generation. Publish and subscribe boundaries map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.Mqtt.R3` | R3 `Observable<T>`; publish → `Observable<Unit>` |
| `Observables.Mqtt.Reactive` | `IObservable<T>`, `IObservable<Unit>` |

Both include the **Observables.Mqtt** runtime (`MqttService`, `MqttObservable` bridges) and the matching Roslyn analyzer.

Both packages ship on [nuget.org](https://www.nuget.org/packages/Observables.Mqtt.R3) from **`0.1.0-preview4`** (same model as Events/RestAPI/SignalR).

Also reference [MQTTnet](https://www.nuget.org/packages/MQTTnet) and **R3** or **System.Reactive** in your app.

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

Payload deserialization (net8+) uses **System.Text.Json** for non-`string` / non-`byte[]` types unless you handle raw bytes explicitly.

## System.Reactive

Use `IObservable<T>` return types and `Observables.Mqtt.Reactive`; entry point remains `MqttService.For<T>(client)`.

## Diagnostics

See [Diagnostics](diagnostics.md#mqtt-obs5001obs5006).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/mqtt.md`](https://github.com/Skymly/Observables/blob/main/docs/design/mqtt.md).
