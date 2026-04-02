# Source tour: commands and UI

This tour explains how Claude Code becomes a usable developer product instead of a hidden runtime.

## The path

`src/commands.ts → src/commands/* → src/components/* → src/ink/* → src/hooks/*`

## 1. Command registry

`src/commands.ts` is the user-facing action map.

It tells you:

- what slash commands exist,
- which capabilities are productized,
- which features are optional or gated,
- how much behavior is intentionally outside the core loop.

## 2. Command implementations

The `src/commands/` directory is where product workflows live:

- memory,
- config,
- compact,
- review,
- tasks,
- skills,
- session operations,
- onboarding and auth-related commands.

This is an important design move:

> not every capability should be expressed as “ask the model to do it.”

Some actions deserve explicit product affordances.

## 3. UI components

The `src/components/` tree contains the visible user experience:

- permission prompts,
- dialogs,
- structured diffs,
- settings views,
- status surfaces.

This is where trust gets rendered.

## 4. Ink and terminal behavior

The `src/ink/` tree handles terminal rendering and interaction primitives.

For agent builders, the lesson is:

- terminal UI is still UI,
- streaming text is still rendering,
- approvals and diffs are still interaction design.

## 5. Hooks and cross-cutting behavior

`src/hooks/` and related runtime hooks show how Claude Code lets behavior be extended or intercepted.

That means the UX is not only visual. It is operational.

## Minimal counterpart

Compare with `../ref_repo/claude-code-from-scratch/src/cli.ts` and `ui.ts`.

The minimal implementation proves that a simple REPL is enough to learn.
Claude Code proves how much additional product craft is required to make it feel safe and polished.

## What to write down

After this tour, you should be able to explain:

- why commands exist alongside the agent loop,
- where user trust is built in the interface,
- which UX concerns are really runtime concerns wearing a UI surface.
