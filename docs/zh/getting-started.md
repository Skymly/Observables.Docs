# 快速开始

## 环境

- [.NET SDK](https://dotnet.microsoft.com/download) — 库多为 **.NET 8**；生成器仓库的 `global.json` 使用 **.NET 10** 运行 Nuke CI
- Git

## 推荐目录结构

将仓库并列放在同一父目录下（例如 `Skymly/`）：

```
Skymly/
  Observables/              ← 生成器与运行时
  Observables.Samples/      ← 示例应用
  Observables.Docs/         ← 本文档站点
```

## 本地引用 Events 分析器（R3）

```xml
<ProjectReference Include="..\Observables\Observables.Events.R3.SourceGenerators\Observables.Events.R3.SourceGenerators.csproj"
                  OutputItemType="Analyzer"
                  ReferenceOutputAssembly="false" />
<PackageReference Include="R3" Version="1.3.0" />
```

示例（较新分支入口名为 `Events()`；合并重命名 PR 前 `main` 上可能仍为 `FromEvents()`）：

```csharp
var source = new ClickSource();
source.FromEvents().Click.Subscribe(_ => Console.WriteLine("Clicked"));
```

完整控制台示例见 [Observables.Samples](https://github.com/Skymly/Observables.Samples)。

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
