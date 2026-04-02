# 工具与权限

> 这是英文主页面的中文支持页。建议与英文原文对照阅读：[Tools and Permissions](/claude-code/tools-and-permissions)

Claude Code 真正有力量的地方，是它可以行动；Claude Code 真正值得研究的地方，是它**如何在能行动的同时仍然保持可控**。

这一页的核心观点是：

> Claude Code 不是因为“工具多”而强，而是因为这些工具都经过了统一契约、统一组装管线、统一权限与安全约束。

## 工具系统主图

```mermaid
flowchart TD
  def[Tool.ts / tools/* 中的工具定义] --> pool[tools.ts 组装工具池]
  pool --> visible[模型可见工具集合]
  visible --> call[模型发出 tool_use]
  call --> orchestration[toolOrchestration / StreamingToolExecutor]
  orchestration --> perm[权限与安全检查]
  perm --> exec[工具执行]
  exec --> result[结果消息与上下文更新]
```

## 为什么 `Tool.ts` 很关键

这不是“类型文件”而已，而是整个能力平面的统一契约。

### 注解代码片段

```ts
export type ToolPermissionContext = DeepImmutable<{
  mode: PermissionMode
  alwaysAllowRules: ToolPermissionRulesBySource
  alwaysDenyRules: ToolPermissionRulesBySource
  alwaysAskRules: ToolPermissionRulesBySource
}>
```

以及：

```ts
export type ToolUseContext = {
  options: {
    commands: Command[]
    tools: Tools
    mcpClients: MCPServerConnection[]
    agentDefinitions: AgentDefinitionsResult
  }
  abortController: AbortController
  getAppState(): AppState
  setAppState(f: (prev: AppState) => AppState): void
}
```

**注解**

这说明工具调用不是一个孤立函数，而是发生在一个“活着的 runtime”里：

- 有权限模式
- 有 app state
- 有 MCP / commands / agents
- 有取消信号
- 有跨轮次上下文

## `tools.ts` 为什么不是简单列表

它实际上更像 3 层装配流水线：

1. `getAllBaseTools()` —— 当前 build 下可能存在的能力面
2. `getTools(...)` —— 根据模式和规则进行过滤
3. `assembleToolPool(...)` —— 合并内置工具与 MCP 工具，形成最终 prompt-visible 工具集

### 教学意义

这说明 Claude Code 不只是“在调用时拒绝危险工具”，而是还会在 prompt 构建前就缩小模型看到的能力空间。

## `toolOrchestration.ts` 教的是并发策略，而不只是执行顺序

### 注解代码片段

```ts
for (const { isConcurrencySafe, blocks } of partitionToolCalls(...)) {
  if (isConcurrencySafe) {
    // 并发执行
  } else {
    // 串行执行
  }
}
```

**注解**

Claude Code 并不是“能并发就全部并发”。
它把工具执行分成：

- 可以并发的批次
- 必须串行的批次

这背后处理的是：

- 文件写冲突
- 上下文修改顺序
- 结果可预测性

## Bash 为什么是特殊工具

因为它不是普通能力，而是**能力放大器**。

Shell 可以：
- 改文件
- 删文件
- 访问网络
- 泄露 secrets
- 启动进程
- 拼接很多子命令

所以 Claude Code 不把 Bash 当“普通工具”对待。

## `bashPermissions.ts` 教的是策略，不只是规则匹配

它里面同时处理：

- permission rules
- classifier
- wrapper / prefix 处理
- path constraint
- mode-specific 行为
- suggestion 生成

### 注解代码片段

```ts
export const MAX_SUBCOMMANDS_FOR_SECURITY_CHECK = 50
```

**注解**

这说明系统会主动限制复杂命令分析的工作量。当命令复杂到超出安全理解范围时，系统宁可退回到 `ask`，也不假装自己完全看懂了。

这是非常重要的产品思维：

> 看不懂时，不要装懂；转入更保守的权限路径。

## `bashSecurity.ts` 教的是 defense in depth

源码里枚举了很多 shell 风险面：

- command substitution
- parameter substitution
- malformed tokens
- redirection
- zsh 特有 expansion / equals expansion
- quote / comment desync
- control chars / unicode whitespace

### 注解代码片段

```ts
const BASH_SECURITY_CHECK_IDS = {
  INCOMPLETE_COMMANDS: 1,
  OBFUSCATED_FLAGS: 4,
  DANGEROUS_VARIABLES: 6,
  ZSH_DANGEROUS_COMMANDS: 20,
  COMMENT_QUOTE_DESYNC: 22,
}
```

**注解**

这说明安全检查不是一个“大 regex”，而是很多层面的组合判断。

## 最值得记住的一句

Claude Code 的工具系统，本质上是：

> **带有策略约束和产品约束的 capability plane**，而不只是一个工具箱。

## 推荐结合阅读

- 英文正文：[Tools and Permissions](/claude-code/tools-and-permissions)
- 配套深潜：[运行时主循环](/zh/claude-code/runtime-loop)
- 配套 source tour：[工具与权限导览](/zh/source-tours/tools-permission-tour)
