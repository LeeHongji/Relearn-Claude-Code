# Overflow recovery and reactive compact

The main compaction docs explain planned context management. This page focuses on a more subtle production concern: **what happens when the system still overflows or withholds content during real execution?**

## Relevant source areas

- `src/query.ts`
- `src/services/compact/reactiveCompact.ts`
- `src/services/contextCollapse/index.ts`
- `src/commands/compact/compact.ts`

## Why this subsystem matters

Long-context systems rarely fail in just one neat way. They can hit:

- prompt-too-long conditions,
- media-size issues,
- withheld content,
- partial overflow states,
- recovery paths that need to preserve momentum.

That is why Claude Code distinguishes proactive compaction from **reactive recovery**.

## What `query.ts` reveals

The main loop references both reactive compact and context collapse. That means overflow handling is not bolted on later — it is directly in the control-flow spine.

This is a strong production pattern:

> recovery logic belongs near the place where failure is observed.

## Reactive compact

Even though the stubbed research fork only exposes a placeholder module here, the references in `query.ts` and command paths show that the runtime expects a reactive mode able to recover when the conversation has already crossed a bad boundary.

The important architectural idea is not the exact implementation details. It is that the system distinguishes:

- preventive compaction,
- and post-failure compaction/recovery.

## Context collapse

The `contextCollapse` hooks in `query.ts` point toward a second idea: you do not always have to summarize everything. You can sometimes collapse or stage context more selectively.

That is a more nuanced design than “summarize old messages.”

## Why this teaches something new

A beginner agent often has only one response to overflow: crash, or do a single summary pass.

Claude Code’s structure implies several recovery modes, each attached to specific runtime conditions.

## Teaching takeaway

For beginners:

> Real reliability often comes from special-case recovery paths, not from one perfect general policy.

For advanced readers:

> Overflow recovery is part of runtime control-flow design, not just prompt compression.
