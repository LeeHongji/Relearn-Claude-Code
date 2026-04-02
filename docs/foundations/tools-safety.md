# Tools and safety

A coding agent becomes useful when it can act on the world. It becomes trustworthy when those actions are constrained.

## The shared tool idea

Claude Code uses a shared tool contract so different actions can pass through the same general machinery.

Key files:

- `src/Tool.ts` — common types and tool-use context,
- `src/tools.ts` — registry of built-in tools,
- `src/services/tools/toolOrchestration.ts` — batching and concurrency,
- `src/services/tools/StreamingToolExecutor.ts` — ordered streaming execution.

## Why a shared tool interface matters

Because once tools share a contract, the runtime can apply the same policies to all of them:

- validation,
- permission checks,
- progress reporting,
- tracing,
- cancellation,
- UI rendering.

That is what turns “a lot of utilities” into “a tool platform.”

## Concurrency

`toolOrchestration.ts` shows a pragmatic design:

- concurrency-safe batches may run in parallel,
- non-safe tool uses run serially,
- context modifiers are applied in a controlled order.

This is a great example of an engineering choice that protects correctness without giving up performance.

## Bash safety is a product, not a regex

Claude Code’s shell protection lives across files such as:

- `src/tools/BashTool/bashPermissions.ts`,
- `src/tools/BashTool/bashSecurity.ts`,
- `src/utils/permissions/*`,
- `src/utils/bash/*`.

The runtime does not simply ask “does this string contain `rm -rf`?” It performs structured parsing, permission-mode checks, and a long list of security validations.

## Five questions every coding agent should answer

1. Can this tool mutate the user’s system?
2. Can it leak secrets or reach the network?
3. Can it run concurrently with other tool calls?
4. How do we explain the risk to the user?
5. How do we recover if the tool fails halfway through?

Claude Code’s tool system is valuable because it encodes those questions into the runtime instead of leaving them to a vague prompt instruction.
