# 记忆与多智能体

Claude Code 的源码里已经明显体现出“不是只服务单会话单 agent”的设计方向。

## 记忆

`memdir/` 提供了：

- 入口文件规则；
- 截断限制；
- 类型化的记忆说明；
- 自动记忆与 team memory 的扩展空间。

## Skills

`src/skills/` 表明很多高频流程可以被沉淀成稳定的工作流，而不必每次都临时提示模型。

## 多智能体

相关位置包括：

- `src/tools/AgentTool/*`
- `src/coordinator/coordinatorMode.ts`
- 团队 / 任务相关工具

`coordinatorMode.ts` 的一个重要思想是：调度者角色本身也可以被运行时限制，而不是“让主 agent 什么都做”。

## 工程难点

多智能体最难的不是“多开几个模型”，而是：

1. 如何拆任务；
2. 如何共享状态；
3. 如何避免改同一份文件时互相踩踏。
