# Postgres

声明式 **PostgreSQL LISTEN/NOTIFY** 通道接口：编译期生成代理，将 Listen / Notify 边界桥接为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.Postgres.R3` | R3 `Observable<T>`；Notify 为 `Observable<Unit>` |
| `Observables.Postgres.Reactive` | `IObservable<T>`、`IObservable<Unit>` |

两包均含 **Observables.Postgres** 运行时（`PostgresService`、`PostgresObservable` 桥接）及对应 Roslyn 分析器。

Postgres 域自 **`0.1.7`** 起发布（与其它域相同）。应用侧还需引用 [Npgsql](https://www.nuget.org/packages/Npgsql) 以及 **R3** 或 **System.Reactive**。

**v1 范围**：仅 LISTEN/NOTIFY。逻辑复制、slot、LSN、ack/checkpoint 等结算类 API **不在范围内**。

## 定义通道代理

```csharp
using Npgsql;
using Observables.Postgres;
using R3;

[Postgres]
public interface IOrderHub
{
    [Listen("orders")]
    Observable<string> Orders { get; }

    [Notify("orders")]
    Observable<Unit> PublishOrder(string payload, CancellationToken cancellationToken = default);
}

await using var connection = new NpgsqlConnection(
    "Host=localhost;Database=app;Username=app;Password=…;Pooling=false;Keepalive=30");
await connection.OpenAsync();
var hub = PostgresService.For<IOrderHub>(connection);

using var sub = hub.Orders.Subscribe(payload => Console.WriteLine(payload));
await hub.PublishOrder("42").FirstAsync();
```

### 边界属性

| 属性 | 成员 | PostgreSQL | 反应式映射 |
|------|------|------------|------------|
| `[Listen]` | 属性 | `LISTEN` + `Wait` / `Notification` | 热流 |
| `[Notify]` | 方法 | `NOTIFY` / `pg_notify` | 冷流 `Unit`（单次完成） |

通道名须为 **编译期字面量**（或回退为成员名），并符合 PostgreSQL 标识符 `[A-Za-z_][A-Za-z0-9_]*`（最长 63）。禁止 `{param}` 占位符（OBS10001 / OBS10006）。

Listen 成员须为**无参属性**；Notify 成员为**方法**。

## 专用连接与 keepalive

`PostgresService.For<T>(NpgsqlConnection)` 接受已打开的 **专用、非池化** 连接：

1. **不要**把从 `NpgsqlDataSource` / 连接池借来的连接用于长生命周期 Listen（`Wait`）循环。优先 `Pooling=false`。
2. 代理**不**释放该连接；生命周期应与 Listen 订阅对齐。
3. 同一连接上不要与 Listen 的 wait 循环并行执行其它命令。
4. **Keepalive（推荐）：** 在 Listen 连接字符串上设置 Npgsql `Keepalive`（秒，例如 `Keepalive=30`），避免空闲 LISTEN 会话被断开。

Notify 可用短生命周期连接或另一会话，不必与 Listen 共用同一连接。

## 负载序列化

`PostgresObservable` 与生成代理通过 **`PostgresPayloadSerializers`** 处理负载。默认将通知载荷视为 **`string`**。其它 `T` 使用 **System.Text.Json**，也可注册自定义序列化器：

```csharp
PostgresPayloadSerializers.Register<MyDto>(mySerializer);
PostgresPayloadSerializers.Current = myFallbackSerializer;
```

## System.Reactive

使用 `IObservable<T>` 返回类型与 `Observables.Postgres.Reactive`；入口仍为 `PostgresService.For<T>(connection)`。

## 诊断

见 [诊断](diagnostics.md#postgres-obs10001obs10008-obs10007)。

## 设计说明

实现细节见 Observables 仓库：[`docs/design/postgres.md`](https://github.com/Skymly/Observables/blob/main/docs/design/postgres.md)。
