# RestAPI

Declarative HTTP client interfaces (Refit-style attributes) with implementations generated at compile time.

## Packages

| Package | Return types |
|---------|----------------|
| [Observables.RestAPI.R3](https://www.nuget.org/packages/Observables.RestAPI.R3) | `Task<T>`, R3 `Observable<T>`, … |
| [Observables.RestAPI.Reactive](https://www.nuget.org/packages/Observables.RestAPI.Reactive) | `Task<T>`, `IObservable<T>`, … |

Both include the **Observables.RestAPI** runtime. Add the matching reactive backend yourself: **R3** for the `.R3` package, **System.Reactive** for the `.Reactive` package. The two backends are mutually exclusive per feature (see [OBS0001](diagnostics.md#shared-obs0001obs007)).

## Define an API

```csharp
using Observables.RestAPI;
using R3;

public interface IUserApi
{
    [Get("/users/{id}")]
    Task<User> GetUserAsync(int id);

    [Get("/users/{id}")]
    Observable<User> GetUserObservable(int id);
}

var api = RestService.For<IUserApi>(httpClient);
User user = await api.GetUserAsync(42);
User reactive = await api.GetUserObservable(7).FirstAsync();
```

Use **FirstAsync** (with a cancellation token in apps) for single-response observables. Errors surface as **ApiException** (same family as Refit).

### Optional `[RestApi]` marker

RestAPI interfaces are normally identified by HTTP method attributes (`[Get]`, `[Post]`, …) on their methods. Apply the optional `[RestApi]` marker on the interface when you want the empty-interface analyzer ([OBS3007](diagnostics.md#shared-obs0001obs007)) to report a warning even when the interface has no methods yet, or to make the proxy intent explicit in documentation and tooling:

```csharp
[RestApi]
public interface IUserApi
{
    [Get("/users/{id}")]
    Task<User> GetUserAsync(int id);
}
```

`[RestApi]` is **not required** for the source generator to work — it only opts the interface into the empty-interface diagnostic and serves as an explicit declaration.

## System.Reactive

```csharp
using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;

User user = await api.GetUserObservable(7).FirstAsync().ToTask();
```

## Diagnostics

See [Diagnostics](diagnostics.md#restapi-obs3001obs3007).

## Samples

- [Observables.Samples.RestAPI](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.RestAPI)
- [Observables.Samples.RestAPI.Reactive](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.RestAPI.Reactive)
