# RestAPI

声明式 HTTP 客户端接口（Refit 风格特性），在编译期生成实现。

## 包

| 包 | 返回类型 |
|----|----------|
| [Observables.RestAPI.R3](https://www.nuget.org/packages/Observables.RestAPI.R3) | `Task<T>`、R3 `Observable<T>` 等 |
| [Observables.RestAPI.Reactive](https://www.nuget.org/packages/Observables.RestAPI.Reactive) | `Task<T>`、`IObservable<T>` 等 |

均包含 **Observables.RestAPI** 运行时。Reactive 包另需 **System.Reactive**（共享核心可能还需 **R3** 运行时）。

## 定义接口

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

单次响应的 Observable 请用 **FirstAsync**（应用内建议带取消令牌）。错误类型为 **ApiException**。

## System.Reactive

```csharp
using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;

User user = await api.GetUserObservable(7).FirstAsync().ToTask();
```

## 诊断

见 [诊断](diagnostics.md#restapi-obs3001obs3005)。

## 示例

- [Observables.Samples.RestAPI](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.RestAPI)
- [Observables.Samples.RestAPI.Reactive](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.RestAPI.Reactive)
