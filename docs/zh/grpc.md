# gRPC

声明式 **gRPC 客户端**接口，编译期生成代理。Unary、服务端流、客户端流与双向流映射为 R3 `Observable<T>` 或 `IObservable<T>`。

## 包

| 包 | 返回类型 |
|----|----------|
| `Observables.Grpc.R3` | R3 `Observable<T>` |
| `Observables.Grpc.Reactive` | `IObservable<T>` |

两包均含 **Observables.Grpc** 运行时（`GrpcService`、`GrpcMarshallers`）及对应 Roslyn 分析器。

自 **`0.1.0-preview6`** 起发布至 [nuget.org](https://www.nuget.org/packages/Observables.Grpc.R3)（与 Events/RestAPI/SignalR/Mqtt/WebSocket 相同）。

另需引用 **R3** 或 **System.Reactive**，并在应用中创建 **`GrpcChannel`**（或任意 `CallInvoker`）。运行时封装 **`Grpc.Core.CallInvoker`** — 消费者项目**不需要** `Grpc.Tools` / protoc。

## 定义 gRPC 代理

```csharp
using Observables.Grpc;
using Grpc.Net.Client;
using R3;

[Grpc("my.Service")]
public interface IMyService
{
    [GrpcUnary("SayHello")]
    Observable<string> SayHello(string request, CancellationToken cancellationToken = default);

    [GrpcServerStream("StreamItems")]
    Observable<string> StreamItems(string request, CancellationToken cancellationToken = default);
}

var channel = GrpcChannel.ForAddress("https://localhost:5001");
var client = GrpcService.For<IMyService>(channel.CreateCallInvoker());

var reply = await client.SayHello("hello").FirstAsync();
```

### 边界特性

| 特性 | gRPC 形态 | 反应式映射 |
|------|-----------|------------|
| `[GrpcUnary]` | Unary | 单次 `OnNext` 后完成 |
| `[GrpcServerStream]` | 服务端流 | 多项 `OnNext` 直至流结束 |
| `[GrpcClientStream]` | 客户端流 | `Observable<TReq>` 入 → 单次响应 |
| `[GrpcDuplex]` | 双向流 | `Observable<TReq>` 入 → 响应流 |

接口上的 `[Grpc(serviceName?)]` 指定 gRPC 服务名（默认去掉 leading `I` 的接口名）。

消息类型通常为 `Google.Protobuf.IMessage<T>`；简单字符串载荷在生成代码中使用 `GrpcMarshallers.String`。

## System.Reactive

返回类型使用 `IObservable<T>` 并引用 `Observables.Grpc.Reactive`；入口仍为 `GrpcService.For<T>(callInvoker)`。

## 诊断

见 [诊断](diagnostics.md#grpc-obs7001obs7007)。

## 设计说明

实现细节见 Observables 主仓 [`docs/design/grpc.md`](https://github.com/Skymly/Observables/blob/main/docs/design/grpc.md)。
