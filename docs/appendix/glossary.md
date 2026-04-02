# Glossary

## Agent loop
The repeated runtime cycle where the model produces text or tool calls, the runtime executes actions, and the result is fed back for the next step.

## Compaction
A process that reduces conversation size while keeping enough signal for the task to continue.

## Context engineering
The disciplined assembly of prompt inputs, memory, environment state, and recent results so the model receives the most useful information inside a limited window.

## Concurrency-safe tool
A tool call that can run in parallel with other safe operations without corrupting shared state.

## MCP
Model Context Protocol. A standard way for models and runtimes to connect to external tools and resources.

## Permission mode
A runtime policy that decides what tool actions may proceed automatically, what must prompt the user, and what is denied.

## Skill
A reusable workflow or instruction bundle for recurring tasks.

## Source atlas
A teaching-oriented map of the codebase that groups files by responsibility.

## Streaming execution
Rendering or acting on model output incrementally while tokens are still arriving, instead of waiting for a fully finished response.

## Worktree
A separate checked-out working copy from the same git repo, useful for isolated parallel agent work.
