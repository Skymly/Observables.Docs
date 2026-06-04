# 诊断

Observables 源生成器在编译期报告的诊断 ID（按功能域分段）。

## Events（OBS2001–OBS2004）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS2001** | 警告 | 经典 **Events()** — 不支持的委托签名 |
| **OBS2002** | 警告 | **EventHandlers()** — 非 EventHandler / `(object, T)` 形态 |
| **OBS2003** | 警告 | **RoutedEvents()** — 不支持的路由事件委托 |
| **OBS2004** | 警告 | **RoutedEventHandlers()** — 不支持的路由处理器委托 |

类别：`Observables.Events`。

## RestAPI（OBS3001–OBS3005）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS3001** | 警告 | 接口方法缺少 HTTP 特性或 path 非常量 |
| **OBS3002** | 错误 | 未引用 Observables.RestAPI 运行时 |
| **OBS3003** | 错误 | 不支持的返回类型 |
| **OBS3004** | 错误 | 路径模板与参数不匹配 |
| **OBS3005** | 错误 | 返回 `IObservable<T>` 但未引用 Observables.RestAPI.Reactive |

类别：`Observables.RestAPI`。

## SignalR（OBS4001–OBS4006）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS4001** | 警告 | Hub 成员缺少边界特性或 hub 方法名非常量 |
| **OBS4002** | 错误 | 未引用 Observables.SignalR 运行时 |
| **OBS4003** | 错误 | 不支持的返回类型（须为 `Observable<T>` / `IObservable<T>`；Send 须 `Unit`） |
| **OBS4004** | 错误 | 成员形态与特性不匹配（如方法上使用 `[HubOn]`） |
| **OBS4005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.SignalR.Reactive |
| **OBS4006** | 错误 | 不支持的客户端→服务端流式参数 |

类别：`Observables.SignalR`。

## Mqtt（OBS5001–OBS5006）

| ID | 级别 | 场景 |
|----|------|------|
| **OBS5001** | 警告 | Mqtt 成员缺少边界特性或主题模板非常量 |
| **OBS5002** | 错误 | 未引用 Observables.Mqtt 运行时 |
| **OBS5003** | 错误 | 不支持的返回类型 |
| **OBS5004** | 错误 | 成员形态与特性不匹配（如方法上使用 `[MqttSubscribe]`） |
| **OBS5005** | 错误 | 使用 `IObservable<T>` 但未引用 Observables.Mqtt.Reactive |
| **OBS5006** | 错误 | 不支持的主题模板、多余参数或订阅占位符语法 |

类别：`Observables.Mqtt`。
