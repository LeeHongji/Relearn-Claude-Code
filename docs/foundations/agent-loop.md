# The agent loop

The heart of a coding agent is a **think → act → observe → continue** loop.

In Claude Code, the most important runtime files are:

- `src/main.tsx` — entrypoint and boot logic,
- `src/QueryEngine.ts` — session-level orchestration,
- `src/query.ts` — the main iterative loop.

In the minimal reference, the matching idea appears in:

- `ref_repo/claude-code-from-scratch/src/agent.ts`.

## The loop in plain English

1. Build system context and message history.
2. Ask the model for the next step.
3. Stream tokens to the UI as they arrive.
4. If the model emits tool calls, run them.
5. Add tool results back into the message list.
6. Decide whether to continue, compact, retry, or stop.

## Why Claude Code splits responsibilities

### `main.tsx`

This file is the operational front door. It does more than parse CLI flags. It also starts prefetch tasks such as keychain and settings reads **before** the rest of the imports finish, reducing perceived startup latency.

### `QueryEngine.ts`

This layer holds session state: model selection, memory loading, plugin cache, prompt assembly hooks, transcript recording, and compatibility helpers.

### `query.ts`

This is where the loop becomes a real runtime. It handles:

- message normalization,
- token budget checks,
- tool streaming,
- stop hooks,
- compaction triggers,
- retry and fallback paths.

## A production-grade loop is not just a `while(true)`

A beginner implementation often looks like this:

```ts
while (!done) {
  const reply = await model(messages)
  if (reply.tool_call) {
    const result = await runTool(reply.tool_call)
    messages.push(result)
  } else {
    done = true
  }
}
```

That is enough to learn the concept. It is not enough for production.

Production loops also need:

- cancellation and interruption,
- token budgeting,
- structured tool-result storage,
- failure classification,
- partial streaming and fallback,
- approval checkpoints,
- compaction and recovery.

## One key Claude Code idea: streaming tool execution

`src/services/tools/StreamingToolExecutor.ts` exists because a strong product tries to **hide latency**, not merely survive it. It queues and executes tools while preserving ordered results, instead of waiting for a full batch after the model finishes speaking.

## Design lesson

The model provides decisions. The loop provides **discipline**.
