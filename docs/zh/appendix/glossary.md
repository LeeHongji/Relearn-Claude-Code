# 术语表

## Agent loop
模型输出文本或工具调用，运行时执行动作，再把结果反馈给模型的循环。

## Compaction
在保持任务连续性的前提下压缩会话历史。

## Context engineering
在有限上下文窗口里，组织最有价值信息的工程实践。

## MCP
Model Context Protocol，让 agent 连接外部工具和资源的协议。

## Permission mode
运行时用于决定哪些工具可以直接执行、哪些必须请求确认、哪些应该被拒绝的策略模式。

## Skill
可复用的工作流或指令包。

## Streaming execution
模型输出尚未结束时，系统就开始逐步展示或执行相关动作。

## Worktree
同一 git 仓库的独立工作副本，适合并行 agent 协作。
