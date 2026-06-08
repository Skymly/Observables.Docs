# Mqtt

声明式 **MQTT 客户端**主题接口：编译期生成代理，将发布/订阅桥接为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.Mqtt.R3` | R3 `Observable<T>`；发布为 `Observable<Unit>` |
| `Observables.Mqtt.Reactive` | `IObservable<T>`、`IObservable<Unit>` |

两包均含 **Observables.Mqtt** 运行时（`MqttService`、`MqttObservable` 桥接）及对应 Roslyn 分析器。

自 **`0.1.0-preview5`** 起，两包已发布至 [nuget.org](https://www.nuget.org/packages/Observables.Mqtt.R3)（与 Events/RestAPI/SignalR 相同）。

应用侧还需引用 [MQTTnet](https://www.nuget.org/packages/MQTTnet) **4.3.7.1207**（4.x 线）以及 **R3** 或 **System.Reactive**。请与元包使用**相同主版本**，在 Observables 明确支持之前**不要**与 **MQTTnet 5.x** 混用。

## 为何使用 MQTTnet 4.x（而非 5.x）

Observables.Mqtt 基于 **[MQTTnet 4.3.7.1207](https://www.nuget.org/packages/MQTTnet/4.3.7.1207)** 构建与测试。此处指 NuGet 包 **`MQTTnet` 的主版本**，与 **MQTT 线协议**版本（3.1.1 / 5.0）不是同一概念。

| 原因 | 说明 |
|------|------|
| **目标框架** | `Observables.Mqtt.R3` / `.Reactive` 含 **`netstandard2.0`** 构建。[MQTTnet 5](https://github.com/dotnet/MQTTnet/wiki/Upgrading-guide) 仅支持 **.NET 8+**，不再提供 netstandard。 |
| **公共 API 一致** | 运行时使用 4.x 的 `IMqttClient`、`MqttFactory`、`ApplicationMessageReceivedAsync` 等。MQTTnet 5 移除部分接口、拆分工厂类并调整事件模型，迁移会打破 `MqttService.For<T>` 等现有 API。 |
| **功能范围** | 首版只做 **发布 / 订阅**（3.1.1 时代即有的 pub/sub）。MQTT 5 专有特性（请求-响应、User Properties、Reason Code）及 MQTTnet 5 升级列为 Observables **后续 follow-up**。 |
| **Broker 兼容** | MQTTnet 4 连接时默认多为 **MQTT 3.1.1**；多数 Broker 仍支持。协议版本可在应用侧 `ConnectAsync` 选项中配置。Observables 当前不依赖 MQTT 5 专有线协议能力。 |

Observables 支持 MQTTnet 5 时会在发布说明与本页更新。在此之前请固定 **4.3.7.1207**（或与元包传递依赖一致的其它 **4.x** 版本）。4.x 与 5.x 差异见 [MQTTnet 升级指南](https://github.com/dotnet/MQTTnet/wiki/Upgrading-guide)。

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

## 载荷序列化

`MqttObservable` 与生成代理通过 **`MqttPayloadSerializers.Current`**（`IMqttPayloadSerializer`）反序列化订阅载荷。内置默认仅支持 **`byte[]`** 与 UTF-8 **`string`** — **Observables.Mqtt 不引用** System.Text.Json 等序列化库。

对 DTO（JSON、Protobuf 等），注册**按类型**的 serializer（推荐）或替换全局 fallback：

```csharp
// 按类型（推荐）
MqttPayloadSerializers.Register<TemperatureReading>(myReadingSerializer);
// 或使用委托
MqttPayloadSerializers.Register<int>(
    payload => int.Parse(Encoding.UTF8.GetString(payload)),
    value => Encoding.UTF8.GetBytes(value.ToString()));

// 未注册类型的全局 fallback
MqttPayloadSerializers.Current = myFallbackSerializer;
```

后续可能提供可选 NuGet 适配包；运行时本身与具体序列化实现解耦。

## System.Reactive

返回类型改为 `IObservable<T>`，引用 `Observables.Mqtt.Reactive`；入口仍为 `MqttService.For<T>(client)`。

## 诊断

见 [诊断](diagnostics.md#mqtt-obs5001obs5006)。

## 设计说明

见 Observables 仓库 [`docs/design/mqtt.md`](https://github.com/Skymly/Observables/blob/main/docs/design/mqtt.md)。
