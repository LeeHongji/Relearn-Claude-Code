# Build your own Claude-Code-like agent

The best way to study a large system is to pair it with a smaller mirror.

That is why `ref_repo/claude-code-from-scratch` is so valuable.

## The small-to-large mapping

| Minimal file | Production analogue | Lesson |
| --- | --- | --- |
| `src/agent.ts` | `src/query.ts` + `src/QueryEngine.ts` | The loop expands into a runtime subsystem |
| `src/tools.ts` | `src/Tool.ts` + `src/tools.ts` + `src/tools/*` | One tool file becomes a platform |
| `src/prompt.ts` | `src/context.ts` + prompt utilities | Prompt building becomes context engineering |
| `src/cli.ts` | `src/main.tsx` + commands + UI | CLI becomes product shell + UX |
| `src/session.ts` | memory/transcripts/session services | State persistence becomes multi-layered |

## A realistic growth ladder

### Stage 1 — Minimal useful agent

Ship:

- message loop,
- 4–6 tools,
- streaming text,
- shell confirmation,
- basic session persistence.

### Stage 2 — Reliable individual agent

Add:

- retry policy,
- token budgeting,
- automatic compaction,
- tool concurrency rules,
- richer file editing and diffing.

### Stage 3 — Product-quality agent

Add:

- settings and auth management,
- command surface,
- permission UI,
- skills/plugins/MCP,
- analytics and diagnostics.

### Stage 4 — Multi-agent platform

Add:

- delegation roles,
- task models,
- isolated workspaces,
- shared memory,
- verification and orchestration lanes.

## A warning for ambitious builders

Do not start by copying the biggest codebase you can find.

Instead:

1. build the smallest loop that teaches the concept,
2. add the smallest safety layer that prevents obvious harm,
3. add the smallest context policy that keeps the agent coherent,
4. only then add more power.

That is exactly why the from-scratch project is such a useful companion to the full Claude Code source.
