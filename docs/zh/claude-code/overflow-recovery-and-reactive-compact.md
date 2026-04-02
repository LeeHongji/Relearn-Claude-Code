# 溢出恢复与响应式压缩

主压缩页面解释了计划性的上下文管理，这一页关注更微妙的生产问题：**当系统仍然发生溢出或内容被截留时，运行时怎样恢复？**

## 建议对照的源码位置

- `src/query.ts`
- `src/services/compact/reactiveCompact.ts`
- `src/services/contextCollapse/index.ts`
- `src/commands/compact/compact.ts`

## 这部分真正重要的点

这里体现的并不是一个单一“压缩策略”，而是：

- 预防性压缩，
- 与故障发生后的响应式恢复。

这说明可靠性来自多条恢复路径，而不是一次性完美摘要。
