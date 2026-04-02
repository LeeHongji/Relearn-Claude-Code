# Learning path

This site is organized so that **the same material works for a first-time learner and a senior engineer doing architecture study**.

## Track A — New to AI agents

Read in this order:

1. [What Is an Agent?](/foundations/what-is-an-agent)
2. [The Agent Loop](/foundations/agent-loop)
3. [Context and Memory](/foundations/context-memory)
4. [Tools and Safety](/foundations/tools-safety)
5. [Build Your Own](/claude-code/building-your-own)

### What to focus on

- Why agents need tools instead of pure text output.
- Why a loop matters more than a single prompt.
- Why memory is not “just save everything forever”.
- Why permissions and shell validation are product features, not optional extras.

## Track B — Building your own coding agent

Read in this order:

1. [Architecture](/claude-code/architecture)
2. [Runtime Loop](/claude-code/runtime-loop)
3. [Context Engineering](/claude-code/context-engineering)
4. [Tools and Permissions](/claude-code/tools-and-permissions)
5. [Memory and Multi-Agent](/claude-code/memory-and-multi-agent)
6. [Build Your Own](/claude-code/building-your-own)

### What to focus on

- Entrypoints and boot-time parallelism.
- Tool registry and concurrency control.
- Compaction and retry strategies.
- Extension surfaces: commands, skills, plugins, MCP.

## Track C — Senior engineer / architecture review

Read in this order:

1. [Repository Map](/claude-code/repo-map)
2. [Runtime Loop](/claude-code/runtime-loop)
3. [Tools and Permissions](/claude-code/tools-and-permissions)
4. [Commands, UI, and Extensions](/claude-code/commands-ui-extensions)
5. [Source Atlas](/appendix/source-atlas)

### What to focus on

- Boundary choices: core loop vs services vs UI vs commands.
- Feature gates and lazy loading.
- Failure containment and fallback behavior.
- Where product complexity lives: permissions, UX, context, platform-specific integration.

## A practical weekly study plan

| Day | Goal | Output |
| --- | --- | --- |
| 1 | Learn the agent mental model | One-page summary of the think-act-observe loop |
| 2 | Read the main runtime files | Diagram of `main.tsx → QueryEngine.ts → query.ts` |
| 3 | Study tools and permissions | Write your own safe minimal tool interface |
| 4 | Study context and compaction | Design a policy for long conversations |
| 5 | Study commands and UI | Decide what belongs in CLI, UI, or background services |
| 6 | Compare with `claude-code-from-scratch` | Make a “minimal vs production” gap list |
| 7 | Rebuild a slice yourself | Implement one small end-to-end agent feature |

## Recommended exercises

1. Implement a **mini tool registry** with JSON schemas.
2. Implement a **streaming loop** that can execute tools while tokens are still arriving.
3. Add a **permission gate** for shell commands.
4. Add a **compaction step** when token usage crosses a threshold.
5. Add a **source atlas page** for your own agent repo.
