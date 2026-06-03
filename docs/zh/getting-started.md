# 快速开始

## 环境

- [.NET SDK](https://dotnet.microsoft.com/download) — 库与示例为 **.NET 8**；生成器仓库 Nuke 使用 **.NET 10**（`global.json`）
- Git

## NuGet 包（预览）

**`0.1.0-preview2`** 已发布至 [nuget.org](https://www.nuget.org/packages/Observables.Events.R3)。每个功能域有两个元包（R3 与 System.Reactive）：

| 包 | 适用场景 |
|----|----------|
| `Observables.Events.R3` | 经典 / 路由 CLR 事件 → R3 |
| `Observables.Events.Reactive` | 同上 → `IObservable<T>` |
| `Observables.RestAPI.R3` | 声明式 HTTP → `Task` + R3 `Observable<T>` |
| `Observables.RestAPI.Reactive` | 同上 → System.Reactive |

预览版仅 **打 tag + 推 NuGet**，**不**创建 GitHub Release。请自行添加 `R3` 或 `System.Reactive`。

### Events（R3）

```xml
<PackageReference Include="Observables.Events.R3" Version="0.1.0-preview2" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.Events.R3;
using R3;

var source = new ClickSource();
source.Events().Click.Subscribe(_ => Console.WriteLine("Clicked"));
```

路由 UI 事件（如 Avalonia）已并入 **Events**；在项目中设置 `<ObservableRoutedEvents>true</ObservableRoutedEvents>`（见 [Events](events.md#路由事件avalonia--wpf)）。

### RestAPI（R3）

```xml
<PackageReference Include="Observables.RestAPI.R3" Version="0.1.0-preview2" />
<PackageReference Include="R3" Version="1.3.0" />
```

```csharp
using Observables.RestAPI;
using R3;

var api = RestService.For<IMyApi>(httpClient);
User user = await api.GetUserAsync(42);
User reactive = await api.GetUserObservable(7).FirstAsync();
```

## 并列克隆（可选）

开发生成器时可并列放置：

```
Skymly/
  Observables/
  Observables.Samples/
  Observables.Docs/
```

[Observables.Samples](https://github.com/Skymly/Observables.Samples) 默认用 NuGet；存在 `../Observables` 时可用 `-p:UseLocalObservables=true`。

## 构建生成器解决方案

```powershell
cd Observables
dotnet build Observables.slnx
```

## 本地预览文档

```bash
cd Observables.Docs
npm install
npm run docs:dev
```
