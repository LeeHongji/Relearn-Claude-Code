# Session transcripts and team memory

Claude Code contains signals that long-lived work is not only stored as chat history. The source suggests additional durable artifacts such as transcript segments and synchronized team memory.

## Relevant source areas

- `src/services/sessionTranscript/sessionTranscript.ts`
- `src/services/teamMemorySync/index.ts`
- `src/services/teamMemorySync/watcher.ts`
- `src/services/teamMemorySync/teamMemSecretGuard.ts`
- `src/services/toolUseSummary/toolUseSummaryGenerator.ts`

## Why this subsystem matters

A production agent often needs more than “messages in RAM”:

- durable transcript output,
- summaries of tool-heavy work,
- shared memory for collaborative or multi-session flows,
- secret scanning before synchronized memory leaves a local boundary.

## What the source teaches

### Session transcripts

`sessionTranscript.ts` suggests the runtime can persist transcript segments or related artifacts as part of the operational story, not just the visible chat thread.

### Team memory sync

The `teamMemorySync/` area is especially interesting because it treats shared memory as a synchronization problem with safety requirements.

### Secret guard

`teamMemSecretGuard.ts` is a strong product lesson: shared memory systems need scanning/guard rails, not only convenient sync logic.

### Tool-use summary

`toolUseSummaryGenerator.ts` shows another layer of durable abstraction: compressing tool-heavy behavior into more reusable summaries.

## Main design lesson

For beginners:

> Durable agent state can live in more than one shape: raw chat, summaries, transcripts, and synced memory.

For advanced readers:

> The real challenge is which artifacts become durable, who can consume them, and how the runtime prevents leaks when memory becomes collaborative.
