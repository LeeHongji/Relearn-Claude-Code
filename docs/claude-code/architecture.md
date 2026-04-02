# Claude Code architecture

Claude Code is best understood as **four interacting layers**.

![Claude Code architecture](/claude-code-architecture.svg)

## Layer 1 — Boot and session setup

Primary file: `src/main.tsx`

What happens here:

- runtime macro injection,
- startup profiling,
- parallel prefetching for settings and credentials,
- CLI flag parsing,
- initialization of commands, plugins, skills, telemetry, and render context.

This is where the product decides **what kind of session is about to exist**.

## Layer 2 — Query and control flow

Primary files:

- `src/QueryEngine.ts`
- `src/query.ts`

This is the agent runtime proper. It owns:

- model selection,
- message normalization,
- turn state,
- retry behavior,
- transitions between tool use, compaction, and stop conditions.

## Layer 3 — Tools, permissions, and integrations

Primary directories:

- `src/tools/`
- `src/services/`
- `src/utils/permissions/`
- `src/services/mcp/`

This is the action layer. It makes the agent capable of interacting with the repo, shell, MCP servers, plugins, and external services.

## Layer 4 — Product experience

Primary directories:

- `src/components/`
- `src/ink/`
- `src/commands/`
- `src/hooks/`

This is where Claude Code becomes a usable terminal product rather than a backend library.

## Why this architecture scales

The repo is large, but the layering is surprisingly understandable:

- entrypoint chooses the mode,
- engine owns the turn,
- tools own action execution,
- services own subsystems,
- UI and commands own interaction.

## Key architectural themes

### 1. Feature-gated complexity

Many optional capabilities are behind `feature(...)` checks and lazy imports. This keeps the default path lighter while allowing internal or staged capabilities.

### 2. Runtime-owned safety

The codebase repeatedly chooses runtime guarantees over prompt-only guarantees.

### 3. User-perceived performance

Startup prefetch, streaming output, and concurrent-safe tool execution all serve one goal: make the system **feel fast without becoming reckless**.

### 4. Extensibility without rewriting the core

Skills, plugins, commands, agents, and MCP are all ways to widen behavior without editing the central loop every time.
