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

后续域（如 SignalR）将使用新号段（例如 `OBS4xxx`）。
