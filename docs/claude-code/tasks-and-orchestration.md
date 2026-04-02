# Tasks and orchestration

As coding agents grow, “just keep a chat history” stops being enough. You need explicit task structures.

## Relevant source areas

- `src/tasks.ts`
- `src/utils/tasks.ts`
- `src/tasks/types.ts`
- `src/commands/tasks/*`
- `src/components/tasks/*`

## Why tasks matter

Tasks give the runtime a way to represent work that is long-running, backgrounded, delegated, or worth showing separately in the UI.

That becomes important for shell execution, remote sessions, multi-agent work, and workflows that outlive a single synchronous turn.

The architectural lesson is:

> in Claude Code, a “task” is not just a UX list item. It is the contract between runtime orchestration, persistence, and visible product state.

## 1. `src/tasks.ts` is the runtime registry

Start with `src/tasks.ts`.

It mirrors the same pattern you see in `tools.ts`:

- core task types are imported directly,
- optional task types are feature-gated,
- `getAllTasks()` is the single registry entrypoint,
- `getTaskByType()` resolves the concrete handler for execution.

That tells you tasks are treated as a **first-class runtime subsystem**, not an afterthought bolted onto the UI.

The registry also reveals the product boundaries:

- `LocalShellTask`
- `LocalAgentTask`
- `RemoteAgentTask`
- `DreamTask`
- optional workflow / monitoring tasks

Each one represents a different kind of long-lived work the product wants to surface coherently.

## 2. `src/utils/tasks.ts` is the durable coordination layer

The deeper orchestration logic lives in `utils/tasks.ts`.

Important signals from the source:

- task status is schema-defined (`pending`, `in_progress`, `completed`),
- task list IDs resolve differently for standalone sessions vs teammates vs team leaders,
- task files are persisted under a shared tasks directory,
- lock files and retry/backoff exist to serialize concurrent updates,
- a high-water-mark file prevents task ID reuse after resets.

That is a strong production sign. The task system is designed for:

- multiple agents mutating the same task list,
- cross-process durability,
- predictable numbering and claims,
- same-process subscribers via `tasksUpdated`.

So “tasks” are not merely app-state arrays. They are a **coordination substrate**.

## 3. Task types define product-visible work classes

`src/tasks/types.ts` is small but revealing.

It unions concrete task state types such as:

- local shell work,
- local agent work,
- remote agent work,
- workflow / monitoring work,
- teammate and dream tasks.

It also distinguishes *all task state* from *background task state*.

That matters because the product does not show every running thing the same way:

- foreground work can stay attached to the active flow,
- backgrounded work becomes a separate user-visible object,
- remote and teammate tasks need different detail views and recovery behavior.

## 4. UI/runtime seams are explicit, not accidental

The command/UI boundary makes this especially clear.

Examples:

- `src/commands/tasks/tasks.tsx` turns `/tasks` into a `BackgroundTasksDialog`,
- `src/components/tasks/BackgroundTaskStatus.tsx` reads `AppState.tasks` and renders footer pills,
- teammate/task view helpers let the footer switch the user into another agent’s task context.

That means the UI is not polling random runtime globals. It is reading a structured task model and projecting it into:

- dialogs,
- footer indicators,
- detail views,
- teammate navigation.

This is a classic product seam:

> runtime state is normalized first, then the terminal UI chooses how to reveal it.

## 5. What to look for next

If you want to read deeper, follow one task end to end:

1. registry lookup in `tasks.ts`
2. persistence / claims / IDs in `utils/tasks.ts`
3. concrete task implementation like `LocalShellTask` or `RemoteAgentTask`
4. UI rendering in `components/tasks/*`
5. command entrypoints in `commands/tasks/*`

That path shows the real architecture:

- task definitions describe kinds of work,
- utilities make them durable and shareable,
- UI turns them into a product concept the user can actually manage.
