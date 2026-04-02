# 工具与权限

Claude Code 的工具层让系统真正具备执行能力，但也让系统必须承担风险控制责任。

## 工具注册表

`src/tools.ts` 把大量内置工具组织成统一平台，包括：

- 文件读写；
- shell；
- grep / glob；
- MCP；
- LSP；
- task / team；
- 技能和模式切换。

## 统一工具契约

`src/Tool.ts` 提供公共类型与 `ToolUseContext`。这意味着所有工具都能走统一的执行、校验与展示路径。

## 流式有序执行

`StreamingToolExecutor.ts` 负责在保持结果顺序的同时，尽量提早执行工具来降低用户感知延迟。

## 并发策略

`toolOrchestration.ts` 把工具拆成：

- 可以并发的批次；
- 必须串行的批次。

## 权限系统

重要位置：

- `src/utils/permissions/*`
- `src/components/permissions/*`
- `src/tools/BashTool/*`

尤其是 Bash，Claude Code 不是简单做关键字匹配，而是有解析、规则匹配、模式控制和确认流程。
