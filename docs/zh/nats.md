# Nats

声明式 **Core NATS** subject 接口：编译期生成代理，将订阅、发布与请求-响应桥接为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.Nats.R3` | R3 `Observable<T>`；发布为 `Observable<Unit>`；请求为冷流单值 |
| `Observables.Nats.Reactive` | `IObservable<T>`、`IObservable<Unit>` |

两包均含 **Observables.Nats** 运行时（`NatsService`、`NatsObservable` 桥接）及对应 Roslyn 分析器。

NATS 域自 **`0.1.1`** 起发布（与其它域相同）。应用侧还需引用 [NATS.Client.Core](https://www.nuget.org/packages/NATS.Client.Core) 以及 **R3** 或 **System.Reactive**。

**v1 范围**：仅 Core NATS 的 **Subscribe / Publish / Request-Reply**。**JetStream** 持久化消费记录在 Observables 设计文档的 follow-up 中，首版不包含。

## 定义 subject 代理

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

### 边界属性

| 属性 | 成员 | NATS 客户端 API |
|------|------|-----------------|
| `[NatsSubscribe]` | 属性 | `SubscribeAsync` → 热流 |
| `[NatsPublish]` | 方法 | `PublishAsync` → `Observable<Unit>`（冷流，单次完成） |
| `[NatsRequest]` | 方法 | `RequestAsync` → 冷流单值 `Observable<TResponse>` |

Subject 模板以 `.` 分隔 token。通配符：`*`（单 token）、`>`（尾部多 token，仅末尾）。发布与请求模板可用 `{parameter}` 绑定方法参数（`NatsSubject.Format`）。**订阅 subject 须为字面量 filter**，禁止 `{param}` 占位符（OBS9006）。

订阅成员须为**无参属性**；发布与请求成员为**方法**。

接口上的 `[Nats(connectionName?)]` 可选指定 NATS 连接名称（默认去掉 leading `I` 的接口名）。省略时从接口名推断。

## 负载序列化

`NatsObservable` 与生成代理通过 **`NatsPayloadSerializers`** 反序列化负载。内置默认支持 **`byte[]`** 与 UTF-8 **`string`**。在 .NET 8+ 上，其它类型默认使用 **System.Text.Json**，也可注册自定义序列化器：

```csharp
NatsPayloadSerializers.Register<MyDto>(mySerializer);
NatsPayloadSerializers.Current = myFallbackSerializer;
```

发布与请求方法在发送前序列化 payload 参数（若存在）。

## System.Reactive

使用 `IObservable<T>` 返回类型与 `Observables.Nats.Reactive`；入口仍为 `NatsService.For<T>(connection)`。

## 诊断

见 [诊断](diagnostics.md#nats-obs9001obs9006-obs9007)。

## 设计说明

实现细节见 Observables 仓库：[`docs/design/nats.md`](https://github.com/Skymly/Observables/blob/main/docs/design/nats.md)。
