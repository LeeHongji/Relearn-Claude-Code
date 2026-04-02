# Tasks and orchestration

As coding agents grow, “just keep a chat history” stops being enough. You need explicit task structures.

## Relevant source areas

- `src/tasks.ts`
- `src/utils/tasks.ts`
- `src/components/tasks/*`

## Why tasks matter

Tasks give the runtime a way to represent work that is long-running, backgrounded, delegated, or worth showing separately in the UI.

That becomes important for shell execution, remote sessions, multi-agent work, and workflows that outlive a single synchronous turn.

## What to look for

### Task model

Look for task state transitions, IDs/metadata, and helper utilities.

### Task UI

The `components/tasks/` tree shows that tasks are not only runtime data. They are also a visible user concept.

Interesting examples include background-task dialogs, progress views, detail dialogs, and task status rendering.
