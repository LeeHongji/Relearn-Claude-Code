# Runtime loop

The runtime loop is where Claude Code stops being “a CLI wrapper around an API” and becomes a real agent.

## The control-flow spine

The most useful path to remember is:

`main.tsx → QueryEngine.ts → query.ts → StreamingToolExecutor/toolOrchestration`

## Responsibilities by stage

### Stage 1 — Build the turn

`QueryEngine.ts` prepares the session and gathers the current state:

- model and thinking configuration,
- system prompt parts,
- memory prompt loading,
- plugin and tool setup,
- transcript and file-state helpers.

### Stage 2 — Ask the model

`query.ts` sends normalized messages and listens for streamed output.

### Stage 3 — Stream partial UI updates

The runtime does not wait for the full answer. It streams text and tracks tool blocks as they arrive.

### Stage 4 — Execute tools

When tool calls appear, the runtime either:

- runs them concurrently when safe, or
- serializes them when mutations or ordering risks exist.

### Stage 5 — Fold results back in

Tool results become new messages and can mutate tool-use context.

### Stage 6 — Decide whether to continue

At the end of a turn, the runtime may:

- continue normally,
- retry after a classified error,
- compact the conversation,
- stop and return output,
- run hooks or post-processing.

## Why the loop is robust

Three design choices stand out:

1. **Budget awareness** — token thresholds are computed, tracked, and acted upon.
2. **Fallback paths** — the loop distinguishes recoverable vs terminal problems.
3. **Result discipline** — tool outputs are mediated instead of directly mutating state everywhere.

## Engineering takeaway

If you want to build a serious coding agent, the main loop is not a detail. It is the **operating system** of the product.
