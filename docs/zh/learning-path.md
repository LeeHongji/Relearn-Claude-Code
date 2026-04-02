# 学习路径

本网站希望让**新手和资深工程师都能沿着同一套材料往下走**。

## 路线 A：第一次系统学习 AI agent

建议顺序：

1. [什么是 Agent？](/zh/foundations/what-is-an-agent)
2. [Agent 循环](/zh/foundations/agent-loop)
3. [上下文与记忆](/zh/foundations/context-memory)
4. [工具与安全](/zh/foundations/tools-safety)
5. [自己实现一个](/zh/claude-code/building-your-own)

## 路线 B：想自己做 coding agent

建议顺序：

1. [架构总览](/zh/claude-code/architecture)
2. [运行时主循环](/zh/claude-code/runtime-loop)
3. [上下文工程](/zh/claude-code/context-engineering)
4. [工具与权限](/zh/claude-code/tools-and-permissions)
5. [记忆与多智能体](/zh/claude-code/memory-and-multi-agent)
6. [自己实现一个](/zh/claude-code/building-your-own)

## 路线 C：资深工程师 / 架构评审视角

建议顺序：

1. [仓库地图](/zh/claude-code/repo-map)
2. [运行时主循环](/zh/claude-code/runtime-loop)
3. [工具与权限](/zh/claude-code/tools-and-permissions)
4. [命令、界面与扩展](/zh/claude-code/commands-ui-extensions)
5. [源码图谱](/zh/appendix/source-atlas)

## 每周实践建议

| 天数 | 目标 | 输出 |
| --- | --- | --- |
| Day 1 | 建立心智模型 | 自己画一张 think-act-observe 图 |
| Day 2 | 阅读主入口文件 | 梳理 `main.tsx → QueryEngine.ts → query.ts` |
| Day 3 | 研究工具层 | 写一个最小工具注册表 |
| Day 4 | 研究上下文压缩 | 设计自己的 compact 策略 |
| Day 5 | 研究权限 | 写一个 shell 安全检查草稿 |
| Day 6 | 对照最小实现 | 比较 from-scratch 与真实源码差距 |
| Day 7 | 自己复刻一小段 | 实现一个可运行的最小 agent slice |
