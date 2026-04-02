# 运行时主循环

> 这是英文主页面的中文支持页。建议与英文原文对照阅读：[Runtime Loop](/claude-code/runtime-loop)

如果 `architecture.md` 解决的是“整体架构怎么看”，那这一页解决的是另一个更核心的问题：

> **一条用户消息，究竟是怎样变成一个可恢复、可继续、可调用工具的 agent turn 的？**

## 最重要的理解前提

先记住这条边界：

| 文件 | 时间尺度 | 职责 |
| --- | --- | --- |
| `QueryEngine.ts` | 会话 / conversation | 管理跨多轮对话持续存在的状态 |
| `query.ts` | 单轮 / turn | 管理这一轮里怎么压缩、怎么调用模型、怎么执行工具、怎么恢复 |

如果你把两者看成一个“大循环”，源码就会显得很乱。
如果你把它们看成“会话 owner”与“单轮状态机”，结构就开始清楚了。

## 运行时主干图

```mermaid
flowchart TD
  user[用户输入] --> engine[QueryEngine.submitMessage]
  engine --> process[processUserInput]
  process --> query[query()]
  query --> compact[budget / compact / collapse]
  compact --> api[流式模型调用]
  api --> tools[StreamingToolExecutor / runTools]
  tools --> cont{是否继续}
  cont -->|继续| query
  cont -->|停止| result[最终结果]
```

## 为什么 `submitMessage()` 不是“发请求”这么简单

它承担的是 session 侧的工作：

- 清理上一轮技能发现状态
- 包装权限函数，追踪 permission denial
- 组装 system prompt / user context / system context
- 处理 slash command 与附件
- 持久化 transcript
- 决定是否真的进入 `query()`

也就是说，`submitMessage()` 是 **用户交互边界**，不是单纯 API wrapper。

## 注解代码片段：QueryEngine 配置为什么这么重

```ts
export type QueryEngineConfig = {
  cwd: string
  tools: Tools
  commands: Command[]
  mcpClients: MCPServerConnection[]
  agents: AgentDefinition[]
  canUseTool: CanUseToolFn
  getAppState: () => AppState
  setAppState: (f: (prev: AppState) => AppState) => void
  readFileCache: FileStateCache
  userSpecifiedModel?: string
  fallbackModel?: string
  maxTurns?: number
  maxBudgetUsd?: number
  taskBudget?: { total: number }
}
```

**注解**

这说明 `QueryEngine` 拥有的不只是“消息列表”，而是整个会话的执行壳：

- 工具面
- 命令面
- MCP 连接
- AppState bridge
- 文件缓存
- 模型与预算策略

所以它应当被理解成 **session owner**。

## `query.ts` 为什么更像状态机

`query.ts` 里最关键的不是某一个 API 调用，而是它维护的状态对象：

```ts
type State = {
  messages: Message[]
  toolUseContext: ToolUseContext
  autoCompactTracking: AutoCompactTrackingState | undefined
  maxOutputTokensRecoveryCount: number
  hasAttemptedReactiveCompact: boolean
  pendingToolUseSummary: Promise<ToolUseSummaryMessage | null> | undefined
  stopHookActive: boolean | undefined
  turnCount: number
  transition: Continue | undefined
}
```

**注解**

普通 demo agent 往往只记：
- messages
- maybe 当前 tool call

Claude Code 要记得更多，因为它要处理：
- 自动压缩是否已经尝试过
- output token 恢复是否已经升级过
- stop hook 是否正在接管
- 上一次 continue 的原因是什么

这说明 `query.ts` 的核心不是“调用模型”，而是**维持这一轮在压力下仍然可继续**。

## compaction 为什么属于 runtime loop，而不是旁支功能

在 `query.ts` 的单轮执行路径里，消息会经过：

- tool-result budget
- snip
- microcompact
- context collapse
- autocompact

然后才发 API 请求。

这说明：

> 上下文工程不是会话结束后的整理工作，而是 turn 执行本身的一部分。

## tool execution 为什么也是 loop 逻辑的一部分

这里不能简单理解成“模型输出工具调用，运行一下就好”。

源码里有两条关键执行路径：

- `StreamingToolExecutor`
- `runTools(...)`

这意味着 runtime 同时在权衡：

- 交互性（尽早让用户看到进展）
- 顺序正确性（上下文修改必须可预测）
- 并发安全（读操作可并发，写操作必须谨慎）

## 最重要的一句总结

如果你想真正看懂 Claude Code 的运行时，请记住：

> `QueryEngine.ts` 管“对话还活着”，`query.ts` 管“这一轮怎么活下去”。

## 推荐结合阅读

- 英文正文：[Runtime Loop](/claude-code/runtime-loop)
- 配套深潜：[架构总览](/zh/claude-code/architecture)
- 配套 source tour：[启动到首个回合](/zh/source-tours/startup-to-turn)
