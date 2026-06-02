# 示例

可运行示例位于独立仓库：

**[github.com/Skymly/Observables.Samples](https://github.com/Skymly/Observables.Samples)**

## 并列克隆

```
Skymly/
  Observables/
  Observables.Samples/
```

示例仓库中的 `Directory.Build.props` 在检测到 `../Observables/Observables.slnx` 时会自动 `UseLocalObservables=true`。

## 当前项目

| 示例 | 说明 |
|------|------|
| **Observables.Samples.Events** | 控制台 — Events R3 分析器与经典 CLR 事件 |

RoutedEvents、RestAPI、SignalR 等示例将随对应域稳定后补充。
