# 实验室

实验章节的目标是把“看懂”变成“自己实现一小段”。

## 实验总图

```mermaid
flowchart LR
  tool[添加一个工具] --> compact[压缩上下文]
  compact --> multi[多智能体准备度]
```

## 中文支持页导航

| 实验     | 中文支持页                                       | 建议对照的英文原文                                   |
| -------- | ------------------------------------------------ | ---------------------------------------------------- |
| 工具能力 | [添加一个工具](/zh/labs/add-a-tool)              | [Add a Tool](/labs/add-a-tool)                       |
| 长上下文 | [压缩上下文](/zh/labs/compact-context)           | [Compact Context](/labs/compact-context)             |
| 协作系统 | [多智能体准备度](/zh/labs/multi-agent-readiness) | [Multi-Agent Readiness](/labs/multi-agent-readiness) |

## 中文读者的使用建议

每个实验都可以按下面顺序做：

1. 先读中文支持页，明确实验目标与最低完成线；
2. 再看英文原文，按步骤自己实现；
3. 记录第一次失败或不顺手的地方；
4. 回到 Claude Code 深潜页，补一个生产级改进点。
