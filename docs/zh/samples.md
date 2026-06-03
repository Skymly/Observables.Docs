# 示例

可运行示例仓库：

**[github.com/Skymly/Observables.Samples](https://github.com/Skymly/Observables.Samples)**

## 运行（默认 NuGet）

仅需 .NET 8，**无需** 克隆 `Observables`。

```powershell
git clone https://github.com/Skymly/Observables.Samples.git
cd Observables.Samples
dotnet run --project Observables.Samples.Events
dotnet run --project Observables.Samples.RestAPI
```

包版本：**`Observables.Events.R3`**、**`Observables.RestAPI.R3`** **`0.1.0-preview1`**。

## 项目

| 示例 | 内容 |
|------|------|
| **Observables.Samples.Events** | `Events()`、`EventHandlers()`、多订阅同一事件流 |
| **Observables.Samples.RestAPI** | `Task` / `Observable<T>`、列表 GET、`ApiException`（MockHttp） |

## 本地生成器开发

存在 `../Observables/Observables.slnx` 时：

```powershell
dotnet build -p:UseLocalObservables=true
dotnet run --project Observables.Samples.Events -p:UseLocalObservables=true
```

详见示例仓 `build/README-LocalSourceGenerators.md`。
