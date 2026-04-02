# Source tour: context and memory

This tour explains how Claude Code survives long sessions without turning the model context into chaos.

## The path

`src/context.ts → src/memdir/memdir.ts → services/compact/autoCompact.ts → services/compact/compact.ts`

## 1. `src/context.ts`

This file is the structured front door for prompt context.

Look for:

- git-state loading,
- project instruction inclusion,
- system vs user context split,
- caching behavior.

Beginner trap:

> thinking “context” means only the chat log.

In this repo, context is a composition problem.

## 2. `src/memdir/memdir.ts`

This file shows that memory is not vague “agent magic”.

It has:

- entrypoint naming,
- truncation limits,
- formatting guidance,
- prompt-facing memory discipline.

That means memory is engineered for both machines **and** maintainers.

## 3. `services/compact/autoCompact.ts`

This file decides when to compact.

Focus on:

- effective context window,
- reserved output budget,
- thresholds and buffers,
- failure circuit breakers.

That is where the runtime decides not just “can we continue?” but “can we continue safely and efficiently?”

## 4. `services/compact/compact.ts`

This file handles the heavy operation itself:

- message grouping,
- prompt generation for compaction,
- session continuity concerns,
- interaction with attachments, hooks, plans, and transcript state.

This is why compaction deserves its own subsystem.

## Minimal counterpart

Compare with:

- `../ref_repo/claude-code-from-scratch/src/prompt.ts`
- portions of `../ref_repo/claude-code-from-scratch/src/agent.ts`

The minimal version shows the need.
Claude Code shows the production cost of doing it well.

## What to write down

After this tour, you should be able to explain:

- the difference between context assembly and memory persistence,
- why automatic compaction needs thresholds and failure limits,
- why long-context resilience is an architecture problem, not a model prompt trick.
