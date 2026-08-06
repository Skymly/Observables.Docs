# Redis

声明式 **Redis Pub/Sub** 通道接口：编译期生成代理，将订阅与发布桥接为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.Redis.R3` | R3 `Observable<T>`；Publish → `Observable<Unit>` |
| `Observables.Redis.Reactive` | `IObservable<T>`、`IObservable<Unit>` |

两包均含 **Observables.Redis** 运行时（`RedisService`、`RedisObservable` 桥接）及对应 Roslyn 分析器。

Redis 域自 **`0.1.9`** 起发布（与其它域相同）。应用侧还需引用 [StackExchange.Redis](https://www.nuget.org/packages/StackExchange.Redis) 以及 **R3** 或 **System.Reactive**。

**v1 范围**：仅经典 Redis **SUBSCRIBE / PSUBSCRIBE / PUBLISH**。**Streams**、keyspace 通知、请求-响应，以及 Cluster **分片** Pub/Sub 不在首版范围内。

## 定义 Pub/Sub 代理

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

`RedisService.For<T>(IConnectionMultiplexer)` 内部获取 `ISubscriber`。**不会**释放调用方传入的 multiplexer。

### 边界特性

| 特性 | 成员 | Redis | 反应式映射 |
|------|------|-------|------------|
| `[RedisSubscribe]` | 属性 | `SUBSCRIBE` 或 `PSUBSCRIBE` | 热流 |
| `[RedisPublish]` | 方法 | `PUBLISH` | `Observable<Unit>`（冷流，单次完成） |

订阅成员须为**无参属性**；发布成员为**方法**（可选末尾 `CancellationToken`）。

### Channel 与 Pattern

- **Subscribe**：编译期 Channel 或 Pattern 字面量。若字符串含 `*` 或 `?`，代理使用模式订阅（`PSUBSCRIBE`）；否则精确订阅（`SUBSCRIBE`）。**禁止 `{param}` 占位符**（OBS11006）。
- **Publish**：仅精确 Channel。模板可用 `{param}` 绑定方法参数名。**禁止 Pattern 元字符 `*` / `?`**（OBS11006）。
- 省略 Channel / 模板参数时回退为成员名（与 Nats/Mqtt 相同惯例）。

### `RedisMessage<T>` 与仅载荷

| 返回类型 | 语义 |
|----------|------|
| `Observable<T>` / `IObservable<T>` | 仅载荷 |
| `Observable<RedisMessage<T>>` / `IObservable<RedisMessage<T>>` | 信封：具体 Channel + 载荷（Pattern 订阅时可按 Channel 分支） |

`RedisMessage<T>` 位于 `Observables.Redis`（避免与 StackExchange.Redis `ChannelMessage` 命名冲突）。

v1 中订阅投递为**顺序**。Dispose 订阅会取消 Redis 订阅。

## 负载序列化

`RedisObservable` 与生成代理通过 **`RedisPayloadSerializers`** 处理负载。默认：`string` 与 `byte[]` **透传**、不经 JSON。其它 `T` 在支持的 TFM 上默认使用 **System.Text.Json**，也可注册自定义序列化器：

```csharp
RedisPayloadSerializers.Register<MyDto>(mySerializer);
RedisPayloadSerializers.Current = myFallbackSerializer;
```

## System.Reactive

使用 `IObservable<T>` 返回类型与 `Observables.Redis.Reactive`；入口仍为 `RedisService.For<T>(multiplexer)`。

## 诊断

见 [诊断](diagnostics.md#redis-obs11001obs11008-obs11007)。

## 设计说明

实现细节见 Observables 仓库：[`docs/design/redis.md`](https://github.com/Skymly/Observables/blob/main/docs/design/redis.md)。
