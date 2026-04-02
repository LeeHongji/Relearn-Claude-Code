# What is an AI agent?

An AI agent is **not just a model**. It is a system that combines a model with:

- **state** — conversation history, files, task status, user preferences,
- **tools** — read files, edit code, run commands, call APIs,
- **policies** — when to ask permission, when to stop, how to retry,
- **memory** — what to carry forward across turns or sessions,
- **control flow** — the loop that decides what happens next.

## The simplest mental model

A useful beginner model is:

1. Read the current task and environment.
2. Ask the model what to do next.
3. If the answer is plain text, show it.
4. If the answer is a tool call, execute the tool.
5. Feed the result back into the model.
6. Repeat until done.

That is the core of a coding agent.

## Why a coding agent is harder than a chatbot

A chatbot can often get away with “input → model → answer.” A coding agent cannot. It must survive:

- large codebases,
- shell commands with real side effects,
- long-running tasks,
- partial failures,
- ambiguous user instructions,
- changing repository state.

That is why production agents grow many supporting subsystems.

## Core components

| Component | Beginner meaning | Engineering meaning |
| --- | --- | --- |
| Model | The brain | Inference engine with latency, cost, and context limits |
| Prompt | Instructions | Dynamic system context assembled from many sources |
| Tools | Hands | Typed interfaces with permission, validation, and tracing |
| Memory | Notes | Structured persistence plus retrieval and compaction |
| Loop | The workflow | Runtime state machine with retries and interrupts |
| UI | The interface | Streaming renderer, approvals, mode switches, telemetry |

## Where Claude Code fits

Claude Code is a **developer-facing terminal agent**. In the source, that means the product is not only “talk to the model,” but also:

- boot the CLI and UI,
- assemble git and project context,
- manage tools and commands,
- enforce permissions,
- compress history,
- recover from failures,
- optionally coordinate multiple agents.

## For beginners

If you are new, remember this rule:

> A great agent is usually a great **system design**, not just a great prompt.

## For senior engineers

A good architecture review question is:

> Which responsibilities belong in the model, and which must be enforced by the runtime?

Claude Code pushes many critical guarantees into the runtime: permissions, concurrency, context management, retries, and file handling.
