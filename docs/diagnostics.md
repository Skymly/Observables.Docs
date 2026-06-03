# Diagnostics

Compiler diagnostics emitted by Observables source generators (IDs are stable per domain).

## Events (OBS2001–OBS2004)

| ID | Severity | When |
|----|----------|------|
| **OBS2001** | Warning | Classic **Events()** — unsupported event delegate signature |
| **OBS2002** | Warning | **EventHandlers()** — not `EventHandler` / `(object, T)` shape |
| **OBS2003** | Warning | **RoutedEvents()** — unsupported routed event delegate |
| **OBS2004** | Warning | **RoutedEventHandlers()** — unsupported routed handler delegate |

Category: `Observables.Events`.

## RestAPI (OBS3001–OBS3005)

| ID | Severity | When |
|----|----------|------|
| **OBS3001** | Warning | Interface method missing HTTP verb attribute or non-literal path |
| **OBS3002** | Error | Observables.RestAPI runtime not referenced |
| **OBS3003** | Error | Unsupported return type on API method |
| **OBS3004** | Error | Path template does not match method parameters |
| **OBS3005** | Error | `IObservable<T>` return without Observables.RestAPI.Reactive package |

Category: `Observables.RestAPI`.

Future domains (e.g. SignalR) will use new ID ranges (for example `OBS4xxx`).
