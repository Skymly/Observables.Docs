# Events（事件）

Roslyn 源生成器将经典 CLR 事件（以及可选的 UI 路由事件）转为响应式流。

## 包

| 包 | 流类型 |
|----|--------|
| [Observables.Events.R3](https://www.nuget.org/packages/Observables.Events.R3) | R3 `Observable<T>` |
| [Observables.Events.Reactive](https://www.nuget.org/packages/Observables.Events.Reactive) | `IObservable<T>` |

请同时引用对应运行时：**R3** 或 **System.Reactive**。

## 经典事件

```csharp
using Observables.Events.R3;
using R3;

public class ClickSource
{
    public event Action? Click;
}

var stream = new ClickSource().Events().Click;
```

- **Events()** — `Action` → `Observable<Unit>`；带参数委托 → `Observable<T>`（或 `(object, T)` 元组）。
- **EventHandlers()** — 面向 `EventHandler` / `(object, T)` 形态。

## 路由事件（Avalonia / WPF）

引用包后会自动导入 `buildTransitive/observables.events.props`。在项目中启用：

```xml
<PropertyGroup>
  <ObservableRoutedEvents>true</ObservableRoutedEvents>
</PropertyGroup>
```

WPF 还需 `<UseWPF>true</UseWPF>`。

API（R3 命名空间 `Observables.Events.R3`）：

- 控件上的 **RoutedEvents()** / **RoutedEventHandlers()**
- 父元素上的 **AttachedRoutedEvent** / **AttachedRoutedEventHandler**

示例：[Observables.Samples.Events.Routed](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.Events.Routed)（Avalonia 桌面，仅本地运行；Samples CI 不构建）。

## 诊断

见 [诊断](diagnostics.md#events-obs2001obs2004)。

## 示例

- [Observables.Samples.Events](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.Events)
- [Observables.Samples.Events.Reactive](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.Events.Reactive)
