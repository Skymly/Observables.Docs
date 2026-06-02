# Samples

Runnable applications live in a separate repository:

**[github.com/Skymly/Observables.Samples](https://github.com/Skymly/Observables.Samples)**

## Local sibling layout

```
Skymly/
  Observables/
  Observables.Samples/
```

`Directory.Build.props` in the samples repo sets `UseLocalObservables=true` when `../Observables/Observables.slnx` exists.

## Current projects

| Sample | Description |
|--------|-------------|
| **Observables.Samples.Events** | Console — classic `Action` / `EventHandler` events with the Events R3 analyzer |

Additional samples (RoutedEvents, RestAPI, SignalR, …) will be added as those domains ship stable packages.
