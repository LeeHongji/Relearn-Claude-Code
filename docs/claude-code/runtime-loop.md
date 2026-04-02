# Runtime loop

The runtime loop is where Claude Code stops being “a CLI wrapper around an API” and becomes a real agent.

## The control-flow spine

The most useful path to remember is:

`main.tsx → QueryEngine.ts → query.ts → StreamingToolExecutor/toolOrchestration`

The most important architectural split is:

- `QueryEngine.ts` owns **conversation-scoped state**
- `query.ts` owns **turn-scoped state transitions**

## Responsibilities by stage

### Stage 1 — Build the turn

`QueryEngine.ts` prepares the session and gathers the current state:

- model and thinking configuration,
- system prompt parts,
- memory prompt loading,
- plugin and tool setup,
- transcript and file-state helpers.

The strong signal from the source is that `QueryEngine` is **not** a thin wrapper over `query()`.
It persists state across turns:

- mutable transcript messages,
- accumulated usage,
- permission denials,
- read-file cache state,
- nested memory / skill-discovery bookkeeping.

That persistence is why the repo has a session layer at all. Without it, every turn would need to reconstruct conversation state from scratch.

### Stage 2 — Ask the model

`query.ts` sends normalized messages and listens for streamed output.

But internally it behaves more like a state machine than a single request helper. The loop carries an explicit `State` object with fields like:

- `messages`
- `toolUseContext`
- `autoCompactTracking`
- `maxOutputTokensRecoveryCount`
- `hasAttemptedReactiveCompact`
- `pendingToolUseSummary`
- `turnCount`
- `transition`

That is the clearest sign that Claude Code expects turns to recover, continue, compact, or stop for multiple different reasons.

### Stage 3 — Stream partial UI updates

The runtime does not wait for the full answer. It streams text and tracks tool blocks as they arrive.

### Stage 4 — Execute tools

When tool calls appear, the runtime either:

- runs them concurrently when safe, or
- serializes them when mutations or ordering risks exist.

There are two important execution branches:

- `StreamingToolExecutor` when tool results can be surfaced while the assistant trajectory is still unfolding
- `runTools(...)` when the system can treat tool execution as a normal batched step

This means “tool use” is not one subsystem. It is a runtime decision about **how interactive the execution path should be**.

### Stage 5 — Fold results back in

Tool results become new messages and can mutate tool-use context.

### Stage 6 — Decide whether to continue

At the end of a turn, the runtime may:

- continue normally,
- retry after a classified error,
- compact the conversation,
- stop and return output,
- run hooks or post-processing.

The source is unusually explicit about *why* continuation happens. `transition` reasons include cases such as:

- normal `next_turn`
- `stop_hook_blocking`
- `token_budget_continuation`
- reactive compact retry paths
- `max_output_tokens` recovery/escalation paths

That makes the loop debuggable: you can reason about **which control-flow decision kept the agent alive**.

## Why the loop is robust

Three design choices stand out:

1. **Budget awareness** — token thresholds are computed, tracked, and acted upon.
2. **Fallback paths** — the loop distinguishes recoverable vs terminal problems.
3. **Result discipline** — tool outputs are mediated instead of directly mutating state everywhere.

Two more are worth adding:

4. **History boundary management** — the loop repeatedly reasons about compact boundaries, snip/microcompact, and tool-result budgeting.
5. **Stop-hook mediation** — even “the model wants to stop” is filtered through product policy before the loop fully ends.

## Engineering takeaway

If you want to build a serious coding agent, the main loop is not a detail. It is the **operating system** of the product.

The deeper lesson is that the runtime is split by time horizon:

- session ownership in `QueryEngine.ts`,
- per-turn control flow in `query.ts`,
- tool execution in dedicated orchestration modules.

That separation is what lets Claude Code stay interactive, resilient, and policy-aware at the same time.
