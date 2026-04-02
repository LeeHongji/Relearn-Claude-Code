# Context engineering

Claude Code treats context as a pipeline rather than a blob.

## Core source locations

- `src/context.ts`
- `src/memdir/memdir.ts`
- `src/services/compact/compact.ts`
- `src/services/compact/autoCompact.ts`

## What `context.ts` contributes

This file gathers durable environment signals such as:

- git branch and status,
- recent commits,
- project instructions,
- injected context overrides,
- system and user context sections.

The crucial idea is that **useful context is structured before it reaches the model**.

## What `memdir/` contributes

The memory system is file-based and policy-heavy:

- size limits,
- truncation rules,
- memory types,
- prompt-friendly index design,
- team-memory hooks behind feature gates.

This is good product engineering because it keeps memory inspectable by humans.

## What `compact.ts` contributes

Compaction is not only “summarize history.” It also has to preserve task continuity, attachments, hook behavior, and the most relevant working set.

That is why the compaction code touches:

- token estimation,
- session activity,
- plans,
- attachments,
- permissions and hooks,
- recent-file restoration.

## What `autoCompact.ts` contributes

This file answers: **when should compaction happen?**

The logic includes:

- effective context window,
- reserved output budget,
- warning and error thresholds,
- autocompact buffer,
- a circuit breaker for repeated failures.

## Design lessons

### For beginners

A good agent does not merely “remember more.” It remembers **the right abstractions**.

### For experienced engineers

Context engineering is a systems problem with at least four constraints:

- model limits,
- user trust,
- latency,
- state continuity.

Claude Code’s architecture is useful because it handles these as runtime policies rather than hand-wavy prompt advice.
