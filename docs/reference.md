# Reference & links

## Repositories

| Repository | Role |
|------------|------|
| [Observables](https://github.com/Skymly/Observables) | Roslyn source generators, runtime, tests |
| [Observables.Samples](https://github.com/Skymly/Observables.Samples) | Demo applications |
| [Observables.Docs](https://github.com/Skymly/Observables.Docs) | This documentation site |

## Feature domains (generator repo)

| Domain | R3 analyzer project | Reactive analyzer project |
|--------|---------------------|---------------------------|
| Events | `Observables.Events.R3.SourceGenerators` | `Observables.Events.Reactive.SourceGenerators` |
| RoutedEvents | `Observables.RoutedEvents.R3.SourceGenerators` | `Observables.RoutedEvents.Reactive.SourceGenerators` |
| RestAPI | `Observables.RestAPI.R3.SourceGenerators` | `Observables.RestAPI.Reactive.SourceGenerators` |

## External runtimes

- [R3](https://github.com/Cysharp/R3)
- [System.Reactive](https://github.com/dotnet/reactive)

## Diagnostics

Diagnostic IDs are segmented by domain (for example Events `OBS2xxx`, RestAPI `OBS300x`, RoutedEvents `OBS400x`). A consolidated reference page will be added here as the public API stabilizes; until then see `Observables.SourceGenerators.Shared` in the main repository.
