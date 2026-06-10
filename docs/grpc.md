# gRPC

Declarative **gRPC client** interfaces with compile-time proxy generation. Unary, server-streaming, client-streaming, and duplex RPC shapes map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.Grpc.R3` | R3 `Observable<T>` |
| `Observables.Grpc.Reactive` | `IObservable<T>` |

Both include the **Observables.Grpc** runtime (`GrpcService`, `GrpcMarshallers`) and the matching Roslyn analyzer.

Both packages ship on [nuget.org](https://www.nuget.org/packages/Observables.Grpc.R3) from **`0.1.0-preview6`** (same model as Events/RestAPI/SignalR/Mqtt/WebSocket).

Also reference **R3** or **System.Reactive**, and create a **`GrpcChannel`** (or any `CallInvoker`) in your app. The runtime wraps **`Grpc.Core.CallInvoker`** — no `Grpc.Tools` / protoc required in the consumer project.

## Define a gRPC proxy

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
await foreach (var item in client.StreamItems("seed").ToAsyncEnumerable())
{
    Console.WriteLine(item);
}
```

### Boundary attributes

| Attribute | gRPC shape | Reactive mapping |
|-----------|------------|------------------|
| `[GrpcUnary]` | Unary | Single `OnNext` then complete |
| `[GrpcServerStream]` | Server streaming | Multiple `OnNext` until stream ends |
| `[GrpcClientStream]` | Client streaming | `Observable<TReq>` in → single response |
| `[GrpcDuplex]` | Duplex | `Observable<TReq>` in → response stream |

`[Grpc(serviceName?)]` on the interface selects the gRPC service name (defaults to interface name without leading `I`).

Message types are typically `Google.Protobuf.IMessage<T>`; simple string payloads use `GrpcMarshallers.String` in generated code.

## System.Reactive

Use `IObservable<T>` return types and `Observables.Grpc.Reactive`; entry point remains `GrpcService.For<T>(callInvoker)`.

## Diagnostics

See [Diagnostics](diagnostics.md#grpc-obs7001obs7007).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/grpc.md`](https://github.com/Skymly/Observables/blob/main/docs/design/grpc.md).
