# Repository map

If you open `ref_repo/claude-code/src`, the scale can be intimidating. A better approach is to learn the **top-level neighborhoods**.

## The most important single files

| File | Why you should care |
| --- | --- |
| `src/main.tsx` | Startup, mode selection, CLI entrypoint, boot-time prefetch |
| `src/QueryEngine.ts` | Session orchestrator |
| `src/query.ts` | Main runtime loop |
| `src/Tool.ts` | Shared tool contracts and execution context |
| `src/tools.ts` | Built-in tool registry |
| `src/commands.ts` | Slash-command registry |
| `src/context.ts` | System and user context assembly |

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

### Question: “How are shell commands kept safe?”
Read `tools/BashTool/bashPermissions.ts`, `tools/BashTool/bashSecurity.ts`, and `utils/permissions/*`.

### Question: “How does it survive long sessions?”
Read `context.ts`, `memdir/memdir.ts`, and `services/compact/*`.

## A practical repo-reading strategy

1. Read the main files.
2. Read one subsystem deeply.
3. Trace inward to utilities only when necessary.
4. Use the high-level directories as product boundaries, not as random folders.

That keeps a 500K-line codebase psychologically manageable.
