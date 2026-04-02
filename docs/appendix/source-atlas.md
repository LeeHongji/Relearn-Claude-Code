# Source atlas

This page is a **map of the repo neighborhoods** rather than a line-by-line catalog. The goal is to answer: *where should I look first?*

## Top-level atlas

| Path | Approx files | What lives there | Why it matters |
| --- | ---: | --- | --- |
| `src/main.tsx` | 1 | Boot entrypoint | The operational front door |
| `src/QueryEngine.ts` | 1 | Session engine | Bridges setup and runtime loop |
| `src/query.ts` | 1 | Main loop | The core think-act-observe runtime |
| `src/Tool.ts` | 1 | Tool contracts | Shared execution interface |
| `src/tools.ts` | 1 | Tool registry | Platform capability surface |
| `src/commands.ts` | 1 | Command registry | CLI product surface |
| `src/context.ts` | 1 | Context assembly | Prompt and environment inputs |
| `src/utils/` | 576 | Helpers, adapters, model/git/config/token logic | Hidden backbone of the system |
| `src/components/` | 405 | UI components | Terminal UX and approval flows |
| `src/commands/` | 219 | Slash commands | User-operated actions |
| `src/tools/` | 212 | Tool implementations | File, shell, web, MCP, tasks, plans |
| `src/services/` | 145 | Product subsystems | Compact, MCP, analytics, OAuth, plugins |
| `src/hooks/` | 104 | Hooks and interaction helpers | Cross-cutting runtime behavior |
| `src/ink/` | 98 | Terminal rendering primitives | Ink-based UI plumbing |
| `src/stubs/` | 56 | Research-fork placeholders | Makes the leaked snapshot buildable |
| `src/skills/` | 53 | Skill infrastructure | Reusable workflows |
| `src/bridge/` | 32 | Bridge / integration logic | Remote or IDE-linked behavior |
| `src/constants/` | 21 | Product constants | Shared naming and configuration |
| `src/cli/` | 19 | CLI transport/handler support | Front-door protocol handling |
| `src/tasks/` | 14 | Task abstractions | Structured task state |
| `src/keybindings/` | 14 | Input bindings | Terminal ergonomics |
| `src/types/` | 12 | Shared domain types | Runtime contracts |
| `src/server/` | 11 | Server-side support | Backend or daemon functionality |
| `src/migrations/` | 11 | Data migrations | State evolution |
| `src/entrypoints/` | 11 | Alternative startup flows | Mode-aware initialization |
| `src/memdir/` | 9 | File-based memory | Memory entrypoint and policies |
| `src/context/` | 9 | Context helpers | Structured prompt subsections |
| `src/state/` | 6 | App state types | Session/UI state holders |
| `src/buddy/` | 6 | Buddy mode support | Specialized collaboration behavior |
| `src/vim/` | 5 | Vim mode helpers | Input workflow support |
| `src/assistant/` | 5 | Assistant-mode pieces | Feature-gated alternative mode |
| `src/remote/` | 4 | Remote-mode support | Networked execution surfaces |
| `src/query/` | 4 | Loop support modules | Config, deps, transitions, budgets |
| `src/native-ts/` | 4 | Native TS bindings | Performance-sensitive pieces |
| `src/plugins/` | 2 | Plugin surfaces | Product extensibility |
| `src/coordinator/` | 2 | Coordinator mode | Multi-agent role separation |

## Fast reading recipes

### I want the big picture in 30 minutes

Read:

1. `main.tsx`
2. `QueryEngine.ts`
3. `query.ts`
4. `tools.ts`
5. `commands.ts`

### I care about long-context reliability

Read:

1. `context.ts`
2. `memdir/memdir.ts`
3. `services/compact/autoCompact.ts`
4. `services/compact/compact.ts`

### I care about shell safety

Read:

1. `tools/BashTool/BashTool.tsx`
2. `tools/BashTool/bashPermissions.ts`
3. `tools/BashTool/bashSecurity.ts`
4. `utils/permissions/*`
5. `utils/bash/*`

### I care about extensibility

Read:

1. `commands.ts`
2. `skills/`
3. `plugins/`
4. `services/mcp/`
5. `tools/AgentTool/*`

## Why this atlas exists

Large codebases often feel unlearnable because the reader has no map. The point of this atlas is to turn the repo into a **set of neighborhoods with clear reasons to visit each one**.
