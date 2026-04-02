# 实验支持页：多智能体准备度

> 这是英文主页面的中文支持页。建议与英文原文对照阅读：[Multi-Agent Readiness](/labs/multi-agent-readiness)

## 实验流程图

```mermaid
flowchart LR
  single[稳定单智能体] --> ownership[任务归属]
  ownership --> isolation[工作区与状态隔离]
  isolation --> verification[验证闭环]
  verification --> multi[受控多智能体]
```

## 这个实验真正要学什么

不是“怎么多开几个 agent”，而是判断：你的系统是否已经具备任务分解、状态隔离、冲突控制和验证回路这些前提。

## 最低完成线

- 给当前系统做一次 1–5 分自评。
- 找出最短板的基础设施项。
- 决定是继续单智能体，还是只加受限子代理。

## 推荐对照页

- 英文原文：[Multi-Agent Readiness](/labs/multi-agent-readiness)
- 深潜配套：[记忆与多智能体](/zh/claude-code/memory-and-multi-agent)

## 下一步

回到总览：[实验室](/zh/labs/)
