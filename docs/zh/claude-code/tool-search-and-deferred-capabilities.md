# 工具搜索与延迟能力发现

Claude Code 的工具系统并不只是固定注册表。源码显示它还支持能力发现、延迟暴露，以及更结构化的输出路径。

## 建议对照的源码位置

- `src/utils/toolSearch.ts`
- `src/tools/ToolSearchTool/ToolSearchTool.ts`
- `src/services/api/claude.ts`
- `src/utils/messages.ts`
- `src/utils/attachments.ts`
- `src/tools/SyntheticOutputTool/SyntheticOutputTool.ts`

## 架构图

```mermaid
flowchart LR
  registry[工具注册表] --> defer[可延迟工具]
  defer --> search[ToolSearchTool]
  search --> model[模型发现/选择能力]
  model --> output[StructuredOutput 或常规结果]
```

## 这部分真正重要的点

大平台常见问题是：

- 工具太多，不能全量粗暴暴露；
- 结构化输出不能只靠 prompt 祈祷模型格式正确。

## 注解代码片段

```ts
export function getToolSearchMode(): ToolSearchMode {
  const value = process.env.ENABLE_TOOL_SEARCH
  return 'tst'
}
```

**注解**

- 工具搜索模式是可配置的，而不是死写死用。
- 说明“有哪些工具”和“当前要不要把它们都暴露给模型”是两个问题。

```ts
export const SYNTHETIC_OUTPUT_TOOL_NAME = 'StructuredOutput'
```

**注解**

- 结构化输出被建模成一个显式工具，而不是只靠自然语言约束模型输出 JSON。
- 这是运行时契约设计，而不只是 prompt 工程。

## 教学意义

- 对初学者：大系统需要按需暴露能力。
- 对资深工程师：能力发现、上下文预算、API 契约和结构化输出在这里交汇。
