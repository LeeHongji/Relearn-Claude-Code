# 上下文工程

Claude Code 把 context 当成一条流水线来设计，而不是一个随便拼接的大字符串。

## 核心源码位置

- `src/context.ts`
- `src/memdir/memdir.ts`
- `src/services/compact/compact.ts`
- `src/services/compact/autoCompact.ts`

## `context.ts` 在做什么？

它会把 git 状态、项目指令、系统上下文、用户上下文等有结构地整理出来，然后再交给模型。

## `memdir/` 在做什么？

它体现的是“可审查的文件式记忆”思路：

- 有尺寸限制；
- 有截断规则；
- 有类型和入口约定；
- 便于人和 agent 一起理解。

## `compact.ts` 在做什么？

它不是简单摘要历史，而是要在压缩之后仍然保持任务连续性、附件有效性、最近工作集可恢复。

## `autoCompact.ts` 在做什么？

它决定何时应该压缩，以及压缩失败时如何避免反复无效重试。
