# Context and memory

Every coding agent eventually hits the same wall: the model cannot hold an infinite amount of context.

Claude Code treats context management as a first-class subsystem.

## Context is more than chat history

The runtime assembles context from several sources:

- system instructions,
- user message history,
- git state,
- project instructions like `CLAUDE.md`,
- memory files,
- recent tool results,
- dynamic session metadata.

In the source, the core entry file for this is `src/context.ts`.

## Why context engineering matters

Without careful context design, an agent will:

- forget what it changed,
- repeat expensive searches,
- lose the user’s constraints,
- overpay for token usage,
- become slow and unreliable.

## Claude Code’s memory surface

The `src/memdir/` directory shows that memory is not a magical vector database by default. It begins as **disciplined file-based knowledge** with rules for size, truncation, and prompt inclusion.

A good beginner takeaway is:

> Memory is valuable only if the runtime knows **when to load it, how much to load, and how to keep it small enough to stay useful**.

## Compaction

The `src/services/compact/` directory exists because long conversations must be compressed rather than allowed to grow forever.

Two important files:

- `services/compact/compact.ts` — the main compaction workflow,
- `services/compact/autoCompact.ts` — threshold logic and automatic triggering.

## The compaction ladder

A good mental model for Claude Code’s strategy is:

1. **Track token pressure**.
2. **Warn before the hard limit**.
3. **Compact before the session breaks**.
4. **Restore the most important recent state after compaction**.

## Beginner interpretation

Think of compaction as “writing better notes for your future self.”

## Senior-engineer interpretation

Compaction is a runtime policy that trades off:

- fidelity,
- cost,
- latency,
- recoverability,
- task continuity.

That is why the compaction code interacts with hooks, attachments, memory, transcripts, and token estimation rather than living in isolation.
