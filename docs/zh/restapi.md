# RestAPI

声明式 HTTP 客户端接口（Refit 风格特性），在编译期生成实现。

## 包

| 包 | 返回类型 |
|----|----------|
| [Observables.RestAPI.R3](https://www.nuget.org/packages/Observables.RestAPI.R3) | `Task<T>`、R3 `Observable<T>` 等 |
| [Observables.RestAPI.Reactive](https://www.nuget.org/packages/Observables.RestAPI.Reactive) | `Task<T>`、`IObservable<T>` 等 |

均包含 **Observables.RestAPI** 运行时。请自行添加对应的反应式后端：`.R3` 包配 **R3**，`.Reactive` 包配 **System.Reactive**。同一功能域两后端互斥（见 [OBS0001](diagnostics.md#共享-obs0001obs007)）。

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

### `IApiResponse<T>`

需要查看状态码、响应头或错误且不抛异常时，返回 `IApiResponse<T>`。该包装实现 `IDisposable`，并**拥有**底层 `HttpResponseMessage` —— 读完内容后 dispose `IApiResponse` 即可，不要单独 dispose 内部 HTTP 响应。

### HttpClient 生命周期

`RestService.For<T>(httpClient)` 使用你传入的 `HttpClient`，**不会**释放它。

`RestService.For<T>("https://api.example.com")` 会为该基址创建 `HttpClient`。生成的代理实现 `IDisposable`，且仅在 RestAPI 自己创建客户端时才释放。若接口继承 `IDisposable`，用完后对代理调用 `Dispose()`。

查询参数默认按 `UriFormat.UriEscaped` 编码。方法末尾的 `CancellationToken` 不论参数名叫什么都会转发。

### 可选 `[RestApi]` 标记

RestAPI 接口通常通过方法上的 HTTP 特性（`[Get]`、`[Post]` 等）识别。在接口上添加可选的 `[RestApi]` 标记，可让空接口分析器（[OBS3007](diagnostics.md#共享-obs0001obs007)）在接口尚无方法时也报告警告，或在文档与工具中显式声明代理意图：

```csharp
[RestApi]
public interface IUserApi
{
    [Get("/users/{id}")]
    Task<User> GetUserAsync(int id);
}
```

`[RestApi]` **非必需**——源生成器无需此特性即可工作；它仅用于启用空接口诊断并作为显式声明。

## System.Reactive

```csharp
using System.Reactive.Linq;
using System.Reactive.Threading.Tasks;

User user = await api.GetUserObservable(7).FirstAsync().ToTask();
```

## 诊断

见 [诊断](diagnostics.md#restapi-obs3001obs3007)。

## 示例

- [Observables.Samples.RestAPI](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.RestAPI)
- [Observables.Samples.RestAPI.Reactive](https://github.com/Skymly/Observables.Samples/tree/main/Observables.Samples.RestAPI.Reactive)
