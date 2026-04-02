# 自己实现一个类似 Claude Code 的 agent

学习大系统的最好方法之一，是拿一个更小的镜像系统来对照。

这就是为什么 `claude-code-from-scratch` 很有价值。

## 小系统到大系统的映射

| 最小实现文件 | 真实系统对应 | 含义 |
| --- | --- | --- |
| `src/agent.ts` | `src/query.ts` + `src/QueryEngine.ts` | 主循环会演化成运行时子系统 |
| `src/tools.ts` | `src/Tool.ts` + `src/tools.ts` + `src/tools/*` | 一个工具文件会演化成平台 |
| `src/prompt.ts` | `src/context.ts` | prompt 拼接会演化成上下文工程 |
| `src/cli.ts` | `src/main.tsx` + commands + UI | CLI 会演化成完整产品壳 |

## 推荐演进路径

### 第 1 阶段：最小可用 agent
- 主循环
- 4～6 个工具
- 基本流式输出
- shell 确认
- 会话保存

### 第 2 阶段：可靠单智能体
- 重试
- token 预算
- 自动压缩
- 工具并发策略
- 更好的编辑能力

### 第 3 阶段：产品级 agent
- 配置与认证
- 命令系统
- 权限 UI
- skills / plugins / MCP
- 诊断与遥测

### 第 4 阶段：多智能体平台
- 委派角色
- 任务模型
- 隔离工作区
- 共享记忆
- 验证循环
