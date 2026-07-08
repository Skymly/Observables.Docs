# 诊断

Observables 源生成器与共享分析器在编译期报告的诊断 ID（按功能域分段）。

## 共享（OBS0001、OBS*007）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs0001">**OBS0001**</span> | 错误 | 同一功能域同时引用 `.R3` 与 `.Reactive` 包 |
| <span id="obs3007">**OBS3007**</span> | 警告 | 空 `[RestApi]` 接口（RestAPI） |
| <span id="obs4007">**OBS4007**</span> | 警告 | 空 `[Hub]` 接口（SignalR） |
| <span id="obs5007">**OBS5007**</span> | 警告 | 空 `[Mqtt]` 接口 |
| <span id="obs6007">**OBS6007**</span> | 警告 | 空 `[WebSocket]` 接口 |
| <span id="obs7007">**OBS7007**</span> | 警告 | 空 `[Grpc]` 接口 |
| <span id="obs8007">**OBS8007**</span> | 警告 | 空 `[Sse]` 接口 |
| <span id="obs9007">**OBS9007**</span> | 警告 | 空 `[Nats]` 接口 |

类别：`Observables` / 各域分析器。

## Events（OBS2001–OBS2005）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs2001">**OBS2001**</span> | 警告 | 经典 **Events()** — 不支持的委托签名 |
| <span id="obs2002">**OBS2002**</span> | 警告 | **EventHandlers()** — 非 EventHandler / `(object, T)` 形态 |
| <span id="obs2003">**OBS2003**</span> | 警告 | **RoutedEvents()** — 不支持的路由事件委托 |
| <span id="obs2004">**OBS2004**</span> | 警告 | **RoutedEventHandlers()** — 不支持的路由处理器委托 |
| <span id="obs2005">**OBS2005**</span> | 错误 | Events 源生成器发生意外内部错误 |

类别：`Observables.Events`。

## RestAPI（OBS3001–OBS3006、OBS3007）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs3001">**OBS3001**</span> | 警告 | 接口方法缺少 HTTP 特性或 path 非常量 |
| <span id="obs3002">**OBS3002**</span> | 错误 | 未引用 Observables.RestAPI 运行时 |
| <span id="obs3003">**OBS3003**</span> | 错误 | 不支持的返回类型 |
| <span id="obs3004">**OBS3004**</span> | 错误 | 路径模板与参数不匹配 |
| <span id="obs3005">**OBS3005**</span> | 错误 | 返回 `IObservable<T>` 但未引用 Observables.RestAPI.Reactive |
| <span id="obs3006">**OBS3006**</span> | 错误 | RestAPI 源生成器发生意外内部错误 |
| <span id="obs3007">**OBS3007**</span> | 警告 | 空 `[RestApi]` 接口（分析器） |

类别：`Observables.RestAPI`。

## SignalR（OBS4001–OBS4008）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs4001">**OBS4001**</span> | 警告 | Hub 成员缺少边界特性或 hub 方法名非常量 |
| <span id="obs4002">**OBS4002**</span> | 错误 | 未引用 Observables.SignalR 运行时 |
| <span id="obs4003">**OBS4003**</span> | 错误 | 不支持的返回类型（须为 `Observable<T>` / `IObservable<T>`；Send 须 `Unit`） |
| <span id="obs4004">**OBS4004**</span> | 错误 | 成员形态与特性不匹配（如方法上使用 `[HubOn]`） |
| <span id="obs4005">**OBS4005**</span> | 错误 | 使用 `IObservable<T>` 但未引用 Observables.SignalR.Reactive |
| <span id="obs4006">**OBS4006**</span> | 错误 | 不支持的客户端→服务端流式参数 |
| <span id="obs4008">**OBS4008**</span> | 错误 | SignalR 源生成器发生意外内部错误 |

类别：`Observables.SignalR`。

## Mqtt（OBS5001–OBS5008）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs5001">**OBS5001**</span> | 警告 | Mqtt 成员缺少边界特性或主题模板非常量 |
| <span id="obs5002">**OBS5002**</span> | 错误 | 未引用 Observables.Mqtt 运行时 |
| <span id="obs5003">**OBS5003**</span> | 错误 | 不支持的返回类型 |
| <span id="obs5004">**OBS5004**</span> | 错误 | 成员形态与特性不匹配（如方法上使用 `[MqttSubscribe]`） |
| <span id="obs5005">**OBS5005**</span> | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Mqtt.Reactive |
| <span id="obs5006">**OBS5006**</span> | 错误 | 不支持的主题模板、多余参数或订阅占位符语法 |
| <span id="obs5008">**OBS5008**</span> | 错误 | Mqtt 源生成器发生意外内部错误 |

类别：`Observables.Mqtt`。

## WebSocket（OBS6001–OBS6008）

| ID | 级别 | 场景 |
|----|--------|----------|
| <span id="obs6001">**OBS6001**</span> | 警告 | WebSocket 成员缺少边界特性 |
| <span id="obs6002">**OBS6002**</span> | 错误 | 未引用 Observables.WebSocket 运行时 |
| <span id="obs6003">**OBS6003**</span> | 错误 | WebSocket 成员返回类型不受支持 |
| <span id="obs6004">**OBS6004**</span> | 错误 | 成员形态与特性不匹配（如方法上使用 `[WebSocketReceive]`） |
| <span id="obs6005">**OBS6005**</span> | 错误 | 使用 `IObservable<T>` 但未引用 Observables.WebSocket.Reactive |
| <span id="obs6006">**OBS6006**</span> | 错误 | 不支持的形态或参数组合 |
| <span id="obs6008">**OBS6008**</span> | 错误 | WebSocket 源生成器发生意外内部错误 |

类别：`Observables.WebSocket`。

## gRPC（OBS7001–OBS7008、OBS7007）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs7001">**OBS7001**</span> | 警告 | gRPC 成员缺少边界特性 |
| <span id="obs7002">**OBS7002**</span> | 错误 | 未引用 Observables.Grpc 运行时 |
| <span id="obs7003">**OBS7003**</span> | 错误 | gRPC 成员返回类型不受支持 |
| <span id="obs7004">**OBS7004**</span> | 错误 | 成员形态与边界特性不匹配 |
| <span id="obs7005">**OBS7005**</span> | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Grpc.Reactive |
| <span id="obs7006">**OBS7006**</span> | 错误 | 不支持的参数组合或选项 |
| <span id="obs7007">**OBS7007**</span> | 警告 | 空 `[Grpc]` 接口（分析器） |
| <span id="obs7008">**OBS7008**</span> | 错误 | gRPC 源生成器发生意外内部错误 |

类别：`Observables.Grpc`。

## Sse（OBS8001–OBS8006、OBS8007）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs8001">**OBS8001**</span> | 警告 | SSE 成员缺少 `[SseEvent]` 边界特性 |
| <span id="obs8002">**OBS8002**</span> | 错误 | 未引用 Observables.Sse 运行时 |
| <span id="obs8003">**OBS8003**</span> | 错误 | SSE 成员返回类型不受支持 |
| <span id="obs8004">**OBS8004**</span> | 错误 | 成员形态与特性不匹配（`[SseEvent]` 须用于属性） |
| <span id="obs8005">**OBS8005**</span> | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Sse.Reactive |
| <span id="obs8006">**OBS8006**</span> | 错误 | Sse 源生成器发生意外内部错误 |
| <span id="obs8007">**OBS8007**</span> | 警告 | 空 `[Sse]` 接口（分析器） |

类别：`Observables.Sse`。

## Nats（OBS9001–OBS9008、OBS9007）

| ID | 级别 | 场景 |
|----|------|------|
| <span id="obs9001">**OBS9001**</span> | 警告 | Nats 成员缺少边界特性或 subject 模板非常量 |
| <span id="obs9002">**OBS9002**</span> | 错误 | 未引用 Observables.Nats 运行时 |
| <span id="obs9003">**OBS9003**</span> | 错误 | 不支持的返回类型 |
| <span id="obs9004">**OBS9004**</span> | 错误 | 成员形态与特性不匹配（如方法上使用 `[NatsSubscribe]`） |
| <span id="obs9005">**OBS9005**</span> | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Nats.Reactive |
| <span id="obs9006">**OBS9006**</span> | 错误 | 不支持的 subject 模板、多余参数或订阅占位符语法 |
| <span id="obs9007">**OBS9007**</span> | 警告 | 空 `[Nats]` 接口（分析器） |
| <span id="obs9008">**OBS9008**</span> | 错误 | Nats 源生成器发生意外内部错误 |

类别：`Observables.Nats`。
