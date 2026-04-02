# Repository map

If you open `ref_repo/claude-code/src`, the scale can be intimidating. A better approach is to learn the **top-level neighborhoods**.

## The most important single files

| File | Why you should care |
| --- | --- |
| `src/main.tsx` | Startup, mode selection, CLI entrypoint, boot-time prefetch |
| `src/entrypoints/init.ts` | Safe/trusted initialization and control-plane setup |
| `src/QueryEngine.ts` | Session orchestrator |
| `src/query.ts` | Main runtime loop |
| `src/Tool.ts` | Shared tool contracts and execution context |
| `src/tools.ts` | Built-in tool registry |
| `src/tasks.ts` | Task registry for long-lived/backgrounded work |
| `src/commands.ts` | Slash-command registry |
| `src/context.ts` | System and user context assembly |

## The four most useful runtime boundaries

If you only remember one mental model, remember the system by **time horizon**:

| Boundary | Main files | What it owns |
| --- | --- | --- |
| Startup | `main.tsx` | speculative boot, mode selection, deferred warmup |
| Trusted init | `entrypoints/init.ts` | config safety, transport setup, policy/control-plane work |
| Session | `QueryEngine.ts` | conversation-scoped state, transcript/usage continuity |
| Turn | `query.ts` | per-turn transitions: sample, tools, compact, retry, stop |

## Major directories by file count

| Directory | Approx files | Role |
| --- | ---: | --- |
| `utils/` | 576 | General infrastructure, adapters, helpers, token logic, git, config, parsing, permissions |
| `components/` | 405 | Terminal UI components and dialogs |
| `commands/` | 219 | Slash-command implementations |
| `tools/` | 212 | Tool implementations and tool-specific policies |
| `services/` | 145 | Subsystems such as compact, MCP, OAuth, plugins, LSP, analytics |
| `hooks/` | 104 | Runtime/UI hooks |
| `ink/` | 98 | Terminal rendering abstractions |
| `skills/` | 53 | Skill infrastructure and bundled skills |
| `stubs/` | 56 | Placeholder packages/modules required by the research fork |
| `bridge/` | 32 | Bridge and integration support |

## How to navigate the codebase efficiently

### Question: “How does a session start?”
Read `main.tsx`, then `entrypoints/init.ts`, then `QueryEngine.ts`.

### Question: “How does the agent decide what to do?”
Read `query.ts`, `query/config.ts`, and `query/transitions.ts`.

### Question: “How do tools run?”
Read `Tool.ts`, `tools.ts`, `services/tools/StreamingToolExecutor.ts`, and `services/tools/toolOrchestration.ts`.

### Question: “How does long-lived work become a product feature?”
Read `tasks.ts`, `utils/tasks.ts`, `tasks/types.ts`, and `components/tasks/*`.

### Question: “How are shell commands kept safe?”
Read `tools/BashTool/bashPermissions.ts`, `tools/BashTool/bashSecurity.ts`, and `utils/permissions/*`.

### Question: “How does it survive long sessions?”
Read `context.ts`, `memdir/memdir.ts`, and `services/compact/*`.

### Question: “Where does runtime infrastructure become visible UX?”
Read `commands.ts`, `commands/tasks/*`, `components/tasks/*`, and `components/permissions/*`.

## A practical repo-reading strategy

1. Read the main files.
2. Split them into startup/session/turn/tool-task-product boundaries.
3. Read one subsystem deeply.
4. Trace inward to utilities only when necessary.
5. Use the high-level directories as product boundaries, not as random folders.

That keeps a 500K-line codebase psychologically manageable.
