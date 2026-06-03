# Events

Roslyn source generators turn classic CLR events (and optional UI routed events) into reactive streams.

## Packages

| Package | Stream type |
|---------|-------------|
| [Observables.Events.R3](https://www.nuget.org/packages/Observables.Events.R3) | R3 `Observable<T>` |
| [Observables.Events.Reactive](https://www.nuget.org/packages/Observables.Events.Reactive) | `IObservable<T>` |

Add the matching runtime: **R3** or **System.Reactive**.

## Classic events

```csharp
using Observables.Events.R3;
using R3;

public class ClickSource
{
    public event Action? Click;
}

var stream = new ClickSource().Events().Click;
```

- **Events()** — `Action` → `Observable<Unit>`; `Action<T>` / `EventHandler<T>` → `Observable<T>` (or tuple for `(object, T)` handlers).
- **EventHandlers()** — uses `EventObservable.EventHandler` for `EventHandler` / `(object, T)` shapes.

## Routed events (Avalonia / WPF)

Import `buildTransitive/observables.events.props` from the package (automatic with the meta-package). Enable generation:

```xml
<PropertyGroup>
  <ObservableRoutedEvents>true</ObservableRoutedEvents>
</PropertyGroup>
```

WPF also requires `<UseWPF>true</UseWPF>`.

API surface (R3 namespace `Observables.Events.R3`):

- **RoutedEvents()** / **RoutedEventHandlers()** on controls such as `Button`
- **AttachedRoutedEvent** / **AttachedRoutedEventHandler** on a parent (`Panel`, etc.)

See [Observables.Samples.Events.Routed](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.Events.Routed) for an Avalonia desktop example (local run; not executed in Samples CI).

## Diagnostics

See [Diagnostics](diagnostics.md#events-obs2001obs2004).

## Samples

- [Observables.Samples.Events](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.Events) — R3 classic events
- [Observables.Samples.Events.Reactive](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.Events.Reactive) — System.Reactive
