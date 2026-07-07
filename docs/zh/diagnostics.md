# 诊断

Observables 源生成器与共享分析器在编译期报告的诊断 ID（按功能域分段）。

## 共享（OBS0001、OBS*007）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS0001** | 错误 | 同一功能域同时引用 `.R3` 与 `.Reactive` 包 |
| **OBS3007** | 警告 | 空 `[RestApi]` 接口（RestAPI） |
| **OBS4007** | 警告 | 空 `[Hub]` 接口（SignalR） |
| **OBS5007** | 警告 | 空 `[Mqtt]` 接口 |
| **OBS6007** | 警告 | 空 `[WebSocket]` 接口 |
| **OBS7007** | 警告 | 空 `[Grpc]` 接口 |
| **OBS8007** | 警告 | 空 `[Sse]` 接口 |
| **OBS9007** | 警告 | 空 `[Nats]` 接口 |

类别：`Observables` / 各域分析器。

## Events（OBS2001–OBS2005）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS2001** | 警告 | 经典 **Events()** — 不支持的委托签名 |
| **OBS2002** | 警告 | **EventHandlers()** — 非 EventHandler / `(object, T)` 形态 |
| **OBS2003** | 警告 | **RoutedEvents()** — 不支持的路由事件委托 |
| **OBS2004** | 警告 | **RoutedEventHandlers()** — 不支持的路由处理器委托 |
| **OBS2005** | 错误 | Events 源生成器发生意外内部错误 |

类别：`Observables.Events`。

## RestAPI（OBS3001–OBS3006、OBS3007）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS3001** | 警告 | 接口方法缺少 HTTP 特性或 path 非常量 |
| **OBS3002** | 错误 | 未引用 Observables.RestAPI 运行时 |
| **OBS3003** | 错误 | 不支持的返回类型 |
| **OBS3004** | 错误 | 路径模板与参数不匹配 |
| **OBS3005** | 错误 | 返回 `IObservable<T>` 但未引用 Observables.RestAPI.Reactive |
| **OBS3006** | 错误 | RestAPI 源生成器发生意外内部错误 |
| **OBS3007** | 警告 | 空 `[RestApi]` 接口（分析器） |

类别：`Observables.RestAPI`。

## SignalR（OBS4001–OBS4008）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS4001** | 警告 | Hub 成员缺少边界特性或 hub 方法名非常量 |
| **OBS4002** | 错误 | 未引用 Observables.SignalR 运行时 |
| **OBS4003** | 错误 | 不支持的返回类型（须为 `Observable<T>` / `IObservable<T>`；Send 须 `Unit`） |
| **OBS4004** | 错误 | 成员形态与特性不匹配（如方法上使用 `[HubOn]`） |
| **OBS4005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.SignalR.Reactive |
| **OBS4006** | 错误 | 不支持的客户端→服务端流式参数 |
| **OBS4008** | 错误 | SignalR 源生成器发生意外内部错误 |

类别：`Observables.SignalR`。

## Mqtt（OBS5001–OBS5008）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS5001** | 警告 | Mqtt 成员缺少边界特性或主题模板非常量 |
| **OBS5002** | 错误 | 未引用 Observables.Mqtt 运行时 |
| **OBS5003** | 错误 | 不支持的返回类型 |
| **OBS5004** | 错误 | 成员形态与特性不匹配（如方法上使用 `[MqttSubscribe]`） |
| **OBS5005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Mqtt.Reactive |
| **OBS5006** | 错误 | 不支持的主题模板、多余参数或订阅占位符语法 |
| **OBS5008** | 错误 | Mqtt 源生成器发生意外内部错误 |

类别：`Observables.Mqtt`。

## WebSocket（OBS6001–OBS6008）

| ID | 级别 | 场景 |
|----|--------|----------|
| **OBS6001** | 警告 | WebSocket 成员缺少边界特性 |
| **OBS6002** | 错误 | 未引用 Observables.WebSocket 运行时 |
| **OBS6003** | 错误 | WebSocket 成员返回类型不受支持 |
| **OBS6004** | 错误 | 成员形态与特性不匹配（如方法上使用 `[WebSocketReceive]`） |
| **OBS6005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.WebSocket.Reactive |
| **OBS6006** | 错误 | 不支持的形态或参数组合 |
| **OBS6008** | 错误 | WebSocket 源生成器发生意外内部错误 |

类别：`Observables.WebSocket`。

## gRPC（OBS7001–OBS7008、OBS7007）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS7001** | 警告 | gRPC 成员缺少边界特性 |
| **OBS7002** | 错误 | 未引用 Observables.Grpc 运行时 |
| **OBS7003** | 错误 | gRPC 成员返回类型不受支持 |
| **OBS7004** | 错误 | 成员形态与边界特性不匹配 |
| **OBS7005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Grpc.Reactive |
| **OBS7006** | 错误 | 不支持的参数组合或选项 |
| **OBS7007** | 警告 | 空 `[Grpc]` 接口（分析器） |
| **OBS7008** | 错误 | gRPC 源生成器发生意外内部错误 |

类别：`Observables.Grpc`。

## Sse（OBS8001–OBS8006、OBS8007）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS8001** | 警告 | SSE 成员缺少 `[SseEvent]` 边界特性 |
| **OBS8002** | 错误 | 未引用 Observables.Sse 运行时 |
| **OBS8003** | 错误 | SSE 成员返回类型不受支持 |
| **OBS8004** | 错误 | 成员形态与特性不匹配（`[SseEvent]` 须用于属性） |
| **OBS8005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Sse.Reactive |
| **OBS8006** | 错误 | Sse 源生成器发生意外内部错误 |
| **OBS8007** | 警告 | 空 `[Sse]` 接口（分析器） |

类别：`Observables.Sse`。

## Nats（OBS9001–OBS9008、OBS9007）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS9001** | 警告 | Nats 成员缺少边界特性或 subject 模板非常量 |
| **OBS9002** | 错误 | 未引用 Observables.Nats 运行时 |
| **OBS9003** | 错误 | 不支持的返回类型 |
| **OBS9004** | 错误 | 成员形态与特性不匹配（如方法上使用 `[NatsSubscribe]`） |
| **OBS9005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Nats.Reactive |
| **OBS9006** | 错误 | 不支持的 subject 模板、多余参数或订阅占位符语法 |
| **OBS9007** | 警告 | 空 `[Nats]` 接口（分析器） |
| **OBS9008** | 错误 | Nats 源生成器发生意外内部错误 |

类别：`Observables.Nats`。
