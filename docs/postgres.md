# Postgres

Declarative **PostgreSQL LISTEN/NOTIFY** channel interfaces with compile-time proxy generation. Listen and Notify boundaries map to R3 `Observable<T>` or `IObservable<T>`.

## Packages

| Package | Return types |
|---------|----------------|
| `Observables.Postgres.R3` | R3 `Observable<T>`; Notify → `Observable<Unit>` |
| `Observables.Postgres.Reactive` | `IObservable<T>`, `IObservable<Unit>` |

Both include the **Observables.Postgres** runtime (`PostgresService`, `PostgresObservable` bridges) and the matching Roslyn analyzer.

The Postgres domain ships from **`0.1.7`** (same model as the other domains). Also reference [Npgsql](https://www.nuget.org/packages/Npgsql) and **R3** or **System.Reactive** in your app.

**v1 scope**: LISTEN/NOTIFY only. Logical replication, slots, LSN, and ack/checkpoint APIs are **out of scope**.

## Define a channel proxy

```csharp
using Npgsql;
using Observables.Postgres;
using R3;

[Postgres]
public interface IOrderHub
{
    [Listen("orders")]
    Observable<string> Orders { get; }

    [Notify("orders")]
    Observable<Unit> PublishOrder(string payload, CancellationToken cancellationToken = default);
}

await using var connection = new NpgsqlConnection(
    "Host=localhost;Database=app;Username=app;Password=…;Pooling=false;Keepalive=30");
await connection.OpenAsync();
var hub = PostgresService.For<IOrderHub>(connection);

using var sub = hub.Orders.Subscribe(payload => Console.WriteLine(payload));
await hub.PublishOrder("42").FirstAsync();
```

### Boundary attributes

| Attribute | Member | PostgreSQL | Reactive mapping |
|-----------|--------|------------|------------------|
| `[Listen]` | Property | `LISTEN` + `Wait` / `Notification` | Hot stream |
| `[Notify]` | Method | `NOTIFY` / `pg_notify` | Cold `Unit` stream (single completion) |

Channel names must be **compile-time literals** (or fall back to the member name). They must match PostgreSQL identifiers `[A-Za-z_][A-Za-z0-9_]*` (max 63 characters). `{param}` placeholders are rejected (OBS10001 / OBS10006).

Listen members must be **parameterless properties**; Notify members are **methods**.

## Dedicated connection and keepalive

`PostgresService.For<T>(NpgsqlConnection)` takes an open **dedicated, non-pooled** connection:

1. Do **not** take a connection from `NpgsqlDataSource` / the pool for long-lived Listen (`Wait`) loops. Prefer `Pooling=false`.
2. The proxy does **not** dispose the connection. Its lifetime should match Listen subscriptions.
3. Do not run other commands on the same connection concurrently with the Listen wait loop.
4. **Keepalive (recommended):** set Npgsql `Keepalive` on the Listen connection string (seconds, e.g. `Keepalive=30`) so idle LISTEN sessions stay healthy.

Notify may use a short-lived connection or a separate session; it need not share the Listen connection.

## Payload serialization

`PostgresObservable` and generated proxies use **`PostgresPayloadSerializers`**. Default: notification payloads as **`string`**. Other `T` values use **System.Text.Json** unless you register a custom serializer:

```csharp
PostgresPayloadSerializers.Register<MyDto>(mySerializer);
PostgresPayloadSerializers.Current = myFallbackSerializer;
```

## System.Reactive

Use `IObservable<T>` return types and `Observables.Postgres.Reactive`; entry point remains `PostgresService.For<T>(connection)`.

## Diagnostics

See [Diagnostics](diagnostics.md#postgres-obs10001obs10008-obs10007).

## Design notes

Implementation details are documented in the Observables repo: [`docs/design/postgres.md`](https://github.com/Skymly/Observables/blob/main/docs/design/postgres.md).
