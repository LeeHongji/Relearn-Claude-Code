# Lab: multi-agent readiness

This lab is for builders who are tempted to add multiple agents too early.

## Goal

Evaluate whether your current single-agent runtime is ready for delegation.

## The checklist

Before you add subagents or a coordinator, can your system already do these things?

### Runtime basics

- track task state,
- capture tool results cleanly,
- survive retries and interrupts,
- keep context coherent across long turns.

### Safety basics

- isolate writable work areas,
- gate dangerous tools,
- record who executed what,
- preserve enough logs to debug failures.

### Coordination basics

- define task ownership,
- pass structured task descriptions,
- merge or reconcile outputs,
- detect stale or conflicting work.

## Why this matters

Many agent systems fail because they add “more agents” before building the infrastructure that one reliable agent already needs.

Claude Code-style ecosystems tend to add:

- task models,
- worktrees,
- role boundaries,
- mailbox or messaging patterns,
- verification lanes.

## Exercise

Score your system from 1 to 5 on:

1. task decomposition,
2. state isolation,
3. merge strategy,
4. verification,
5. observability.

Then decide whether you should:

- stay single-agent longer,
- add bounded subagents,
- or build a real coordinator workflow.
