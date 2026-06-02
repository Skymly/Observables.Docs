# Getting started

## Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) — **.NET 8** for most libraries; **.NET 10** for the solution build script (see `global.json` in the generator repo)
- Git

## Clone layout

For local development, place repositories as siblings under one folder (for example `Skymly/`):

```
Skymly/
  Observables/              ← generators and runtime
  Observables.Samples/      ← sample apps
  Observables.Docs/         ← this documentation site
```

## Reference the Events analyzer (local)

In a consuming project:

```xml
<ProjectReference Include="..\Observables\Observables.Events.R3.SourceGenerators\Observables.Events.R3.SourceGenerators.csproj"
                  OutputItemType="Analyzer"
                  ReferenceOutputAssembly="false" />
<PackageReference Include="R3" Version="1.3.0" />
```

Example usage (entry method name may be `Events()` on newer branches; `FromEvents()` on `main` until the rename ships):

```csharp
var source = new ClickSource();
source.FromEvents().Click.Subscribe(_ => Console.WriteLine("Clicked"));
```

See [Observables.Samples](https://github.com/Skymly/Observables.Samples) for a complete console project and `Directory.Build.props` that auto-detects `../Observables`.

## Build the generator solution

```powershell
cd Observables
dotnet build Observables.slnx
dotnet run --project build/_build.csproj -- --target Ci --configuration Release
```

## Documentation site (this repo)

```bash
cd Observables.Docs
npm install
npm run docs:dev
```
