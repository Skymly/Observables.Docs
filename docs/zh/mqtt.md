# Mqtt

声明式 **MQTT 客户端**主题接口：编译期生成代理，将发布/订阅桥接为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.Mqtt.R3` | R3 `Observable<T>`；发布为 `Observable<Unit>` |
| `Observables.Mqtt.Reactive` | `IObservable<T>`、`IObservable<Unit>` |

两包均含 **Observables.Mqtt** 运行时（`MqttService`、`MqttObservable` 桥接）及对应 Roslyn 分析器。

自 **`0.1.0-preview4`** 起，两包已发布至 [nuget.org](https://www.nuget.org/packages/Observables.Mqtt.R3)（与 Events/RestAPI/SignalR 相同）。

应用侧还需引用 [MQTTnet](https://www.nuget.org/packages/MQTTnet) 以及 **R3** 或 **System.Reactive**。

## 定义主题代理接口

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

var client = new MqttFactory().CreateMqttClient();
await client.ConnectAsync(
    new MqttClientOptionsBuilder()
        .WithTcpServer("broker.example.com", 1883)
        .Build());

var topics = MqttService.For<ISensorTopics>(client);
```

### 边界特性

| 特性 | 成员 | 对应客户端 API |
|------|------|----------------|
| `[MqttPublish]` | 方法 | `PublishAsync` → `Observable<Unit>`（冷流，单次完成） |
| `[MqttSubscribe]` | 属性 | `SubscribeAsync` + `ApplicationMessageReceived`（热流） |

主题模板中的 `{parameter}` 与方法参数绑定（`MqttTopic.Format`）。`+` / `#` 通配符保留在模板字面量中。订阅须为**无参属性**；发布须为**方法**。

## System.Reactive

返回类型改为 `IObservable<T>`，引用 `Observables.Mqtt.Reactive`；入口仍为 `MqttService.For<T>(client)`。

## 诊断

见 [诊断](diagnostics.md#mqtt-obs5001obs5006)。

## 设计说明

见 Observables 仓库 [`docs/design/mqtt.md`](https://github.com/Skymly/Observables/blob/main/docs/design/mqtt.md)。
