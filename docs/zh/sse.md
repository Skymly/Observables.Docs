# Sse（Server-Sent Events）

声明式 **Server-Sent Events**（`text/event-stream`）接口：编译期生成代理，将每个命名事件桥接为按事件名过滤、自动反序列化负载的 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.Sse.R3` | R3 `Observable<T>` |
| `Observables.Sse.Reactive` | `IObservable<T>` |

两包均含 **Observables.Sse** 运行时（`SseService`、`SseConnection`、`SseObservable` 桥接）及对应 Roslyn 分析器。

SSE 域已实现并通过校验，自 **`0.1.1-preview7`** 起发布（与其它域相同）。应用侧还需引用 **R3** 或 **System.Reactive**。运行时仅使用 BCL **`System.Net.Http.HttpClient`**，无第三方 SSE 库依赖。

## 定义 SSE 代理

```csharp
using Observables.Sse;
using R3;

[Sse]
public interface IPriceFeed
{
    [SseEvent("price")]
    Observable<PriceTick> Prices { get; }

    [SseEvent("trade")]
    Observable<string> Trades { get; }

    [SseEvent]
    Observable<string> Heartbeats { get; } // 默认 message 事件
}

var connection = new SseConnection(new HttpClient(), new Uri("https://feed.example.com/stream"));
var feed = SseService.For<IPriceFeed>(connection);

using var sub = feed.Prices.Subscribe(tick => Console.WriteLine(tick));
```

### 边界属性

| 属性 | 成员 | 行为 |
|------|------|------|
| `[SseEvent("name")]` | 属性 | 按 `event: name` 过滤，反序列化 `data:` 负载 |
| `[SseEvent]` | 属性 | 映射默认 `message` 事件 |

**成员须为只读属性**，返回 `Observable<T>`（R3）或 `IObservable<T>`（System.Reactive）。`string` 负载原样透传；其它 `T` 用 **`System.Text.Json`** 反序列化（net8+）。每次 `Subscribe` 在所提供的 `HttpClient` 上发起一次新的 SSE 连接；多行 `data:` 字段以 `\n` 连接，注释行（`:`）按 SSE 规范忽略。

请在构造 `SseConnection` **之前**，在 `HttpClient` 上配置基址、默认请求头与 handler。

## System.Reactive

使用 `IObservable<T>` 返回类型与 `Observables.Sse.Reactive`；入口仍为 `SseService.For<T>(connection)`。

## 诊断

见 [诊断](diagnostics.md#sse-obs8001obs8005-obs8007)。

## 设计说明

实现细节见 Observables 仓库：[`docs/design/sse.md`](https://github.com/Skymly/Observables/blob/main/docs/design/sse.md)。
