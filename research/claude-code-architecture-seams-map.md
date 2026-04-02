# Claude Code architecture seams map

This document is a **planning-oriented seam map** for future topic-article rewrites.
It does **not** try to be a full rewrite roadmap or a full chapter crosswalk.
Instead, it answers a narrower question:

> If we explain Claude Code as a set of system seams rather than a flat repo tour, what are the major architectural boundaries, what source files anchor each one, and which future articles should grow out of those seams?

This should help future 专题文章 pages stay close to the real product architecture while avoiding a return to broad overview pages.

Primary source anchors used for this map:

- runtime spine: `ref_repo/claude-code/src/main.tsx`, `src/setup.ts`, `src/entrypoints/init.ts`, `src/QueryEngine.ts`, `src/query.ts`
- control plane: `ref_repo/claude-code/src/state/AppState.tsx`, `src/state/AppStateStore.ts`, `src/state/onChangeAppState.ts`, `src/hooks/useSettingsChange.ts`, `src/utils/settings/*`
- tool plane: `ref_repo/claude-code/src/Tool.ts`, `src/tools.ts`, `src/services/tools/toolOrchestration.ts`, `src/services/tools/toolExecution.ts`, `src/utils/toolSearch.ts`
- product/UI plane: `ref_repo/claude-code/src/components/App.tsx`, `src/ink/components/App.tsx`, `src/components/tasks/*`, `src/components/permissions/*`, `src/commands/*`
- memory/transcript/team-state plane: `ref_repo/claude-code/src/memdir/*`, `src/services/compact/*`, `src/utils/tasks.ts`, `src/hooks/useInboxPoller.ts`, `src/hooks/useMailboxBridge.ts`
- extension plane: `ref_repo/claude-code/src/services/mcp/*`, `src/plugins/*`, `src/skills/*`, `src/hooks/toolPermission/*`, `src/hooks/useMergedTools.ts`, `src/hooks/useMergedCommands.ts`

Reference quality bar:

- `ref_repo/how-claude-code-works/docs/01-overview.md`
- `ref_repo/how-claude-code-works/docs/02-agent-loop.md`
- `ref_repo/how-claude-code-works/docs/03-context-engineering.md`
- `ref_repo/how-claude-code-works/docs/04-tool-system.md`
- `ref_repo/how-claude-code-works/docs/07-multi-agent.md`
- `ref_repo/how-claude-code-works/docs/10-permission-security.md`
- `ref_repo/how-claude-code-works/docs/11-user-experience.md`

---

## Seam overview

The most useful way to explain Claude Code now is as **six connected seams**:

1. **runtime spine** — how a session is shaped and a turn is driven
2. **control plane** — how settings, mode, app state, and external metadata stay synchronized
3. **tool plane** — how capabilities are defined, assembled, filtered, and executed
4. **product/UI plane** — how the runtime becomes observable and usable in the terminal product
5. **memory / transcript / team-state plane** — how long-running state survives beyond one turn
6. **extension plane** — how MCP, plugins, skills, hooks, and merged registries extend the system without rewriting the core loop

These seams overlap at the edges, but they are still the best “teaching cuts” through the system.

---

## 1) Runtime spine

### What this seam is

The runtime spine is the narrow path that turns:

- a CLI launch,
- into a configured session,
- into an active query engine,
- into a think-act-observe turn loop.

This seam exists to answer:

- how a session begins,
- where the turn loop really lives,
- what is session-scoped vs turn-scoped,
- where retries, compaction gates, and stopping decisions happen.

### Primary source anchors

- `ref_repo/claude-code/src/main.tsx`
- `ref_repo/claude-code/src/setup.ts`
- `ref_repo/claude-code/src/entrypoints/init.ts`
- `ref_repo/claude-code/src/QueryEngine.ts`
- `ref_repo/claude-code/src/query.ts`
- `ref_repo/claude-code/src/context.ts`

### Key teaching claim

Claude Code does not have one giant “agent brain” file.
It has a **runtime spine** where startup/session shaping, session orchestration, and per-turn execution are intentionally separated.

### Why this seam matters for future rewrites

If future docs keep collapsing `main.tsx`, `QueryEngine.ts`, and `query.ts` into one “runtime” page, readers will miss the most important boundary:

- `QueryEngine.ts` is the **session orchestrator**
- `query.ts` is the **turn loop and recovery engine**

That is exactly the kind of difference that chapter-style docs should surface early.

---

## 2) Control plane

### What this seam is

The control plane is the part of Claude Code that governs runtime behavior without being the loop itself.
It includes:

- app state
- permission mode
- settings changes
- live refresh / sync
- external metadata propagation
- session-wide feature toggles and UI state

### Primary source anchors

- `ref_repo/claude-code/src/state/AppState.tsx`
- `ref_repo/claude-code/src/state/AppStateStore.ts`
- `ref_repo/claude-code/src/state/onChangeAppState.ts`
- `ref_repo/claude-code/src/hooks/useSettingsChange.ts`
- `ref_repo/claude-code/src/hooks/useSettings.ts`
- `ref_repo/claude-code/src/utils/settings/*`
- `ref_repo/claude-code/src/utils/sessionState.js`

### Key teaching claim

Claude Code’s control plane keeps the runtime, UI, and external session metadata coherent.
It is not “just React state.”

### What is easy to miss

Without a dedicated seam explanation, readers tend to miss that permission mode and related state are:

- mutable at runtime,
- synchronized through app state transitions,
- surfaced to external clients,
- not just read once from config files.

### Why this seam matters for future rewrites

This seam should reshape pages about:

- settings and policy,
- live refresh,
- tool search / deferred capability visibility,
- app state,
- external session synchronization.

In other words, it should push the site toward a real **control-plane narrative**.

---

## 3) Tool plane

### What this seam is

The tool plane is the system’s capability layer.
It defines:

- what a tool is,
- how tools enter the session,
- how visibility is filtered,
- which calls can parallelize,
- how results mutate context,
- where capability discovery is deferred.

### Primary source anchors

- `ref_repo/claude-code/src/Tool.ts`
- `ref_repo/claude-code/src/tools.ts`
- `ref_repo/claude-code/src/constants/tools.ts`
- `ref_repo/claude-code/src/services/tools/toolOrchestration.ts`
- `ref_repo/claude-code/src/services/tools/toolExecution.ts`
- `ref_repo/claude-code/src/utils/toolSearch.ts`

### Key teaching claim

Claude Code does not expose a static bag of tools.
It assembles a **tool plane** governed by contracts, feature gates, permission rules, and runtime filtering.

### What is easy to miss

The most under-taught details here are:

- compile-time feature-gated tool inclusion
- runtime deny filtering before model-visible tool exposure
- concurrency-safe batching of reads vs serialized writes
- deterministic application of context mutations
- deferred capability discovery as a token/cost strategy

### Why this seam matters for future rewrites

This seam should push future docs to separate:

- **tool contract and capability gating**
- **permission runtime and safety enforcement**
- **editing strategy**

Those are related, but not identical, stories.

---

## 4) Product / UI plane

### What this seam is

The product/UI plane is where Claude Code becomes a usable terminal product instead of a headless loop.
It covers:

- React provider setup
- Ink runtime shell
- raw mode / focus / cursor / selection handling
- approval dialogs
- task status presentation
- commands as user-facing control surfaces

### Primary source anchors

- `ref_repo/claude-code/src/components/App.tsx`
- `ref_repo/claude-code/src/ink/components/App.tsx`
- `ref_repo/claude-code/src/components/tasks/*`
- `ref_repo/claude-code/src/components/permissions/*`
- `ref_repo/claude-code/src/commands/*`
- `ref_repo/claude-code/src/hooks/useGlobalKeybindings.tsx`

### Key teaching claim

The terminal shell is not polish.
It is the product layer that makes autonomous behavior visible, interruptible, and trustworthy.

### What is easy to miss

A shallow “UI page” often misses that:

- permissions are product UX as much as backend policy
- task state is translated into user-visible semantics
- terminal focus/raw-mode/cursor behavior is part of runtime correctness
- commands are a shell around the engine, not a side feature

### Why this seam matters for future rewrites

This seam should drive stronger docs for:

- commands and product shell
- terminal UX and observable autonomy
- approvals and trust-building
- task visibility in the interface

---

## 5) Memory / transcript / team-state plane

### What this seam is

This seam captures the difference between **one-turn context** and **durable state that lives longer than a turn**.
It includes:

- memory storage and retrieval
- compaction layers
- session transcript surfaces
- task lists / team state / mailbox-like coordination surfaces

### Primary source anchors

- `ref_repo/claude-code/src/memdir/memdir.ts`
- `ref_repo/claude-code/src/memdir/memoryTypes.ts`
- `ref_repo/claude-code/src/memdir/findRelevantMemories.ts`
- `ref_repo/claude-code/src/services/compact/*`
- `ref_repo/claude-code/src/utils/tasks.ts`
- `ref_repo/claude-code/src/hooks/useInboxPoller.ts`
- `ref_repo/claude-code/src/hooks/useMailboxBridge.ts`
- `ref_repo/claude-code/src/hooks/useTaskListWatcher.ts`

### Key teaching claim

Claude Code uses several different durability surfaces, and they are not interchangeable:

- memory is not transcript,
- transcript is not team state,
- compaction is not durable memory,
- tasks are not just logs.

### What is easy to miss

Current docs often blur:

- memdir-style memory
- transcript/session history
- compacted conversation state
- task/team coordination state

That blur makes the system look simpler than it is.

### Why this seam matters for future rewrites

Future pages should likely split into:

- memory types and recall
- transcript/log/team memory boundaries
- context lifecycle and compaction

instead of folding everything into one persistence page.

---

## 6) Extension plane

### What this seam is

The extension plane explains how Claude Code grows without turning the main loop into an everything-file.
It includes:

- MCP tools/resources
- plugins
- skills
- hooks
- merged registries for commands, tools, and clients

### Primary source anchors

- `ref_repo/claude-code/src/services/mcp/*`
- `ref_repo/claude-code/src/plugins/*`
- `ref_repo/claude-code/src/skills/*`
- `ref_repo/claude-code/src/hooks/toolPermission/*`
- `ref_repo/claude-code/src/hooks/useMergedTools.ts`
- `ref_repo/claude-code/src/hooks/useMergedCommands.ts`
- `ref_repo/claude-code/src/hooks/useMergedClients.ts`

### Key teaching claim

Claude Code uses an **extension plane** so new capabilities can be introduced as bounded surfaces instead of constant edits to `query.ts`.

### What is easy to miss

Without a seam-specific article, docs usually flatten together:

- MCP as external capability protocol
- plugins as packaged extensions
- skills as workflow prompts
- hooks as interception/governance surface
- commands as user-facing shell actions

These are related, but each widens the system in a different way.

### Why this seam matters for future rewrites

This seam should drive a better separation between:

- hooks and extension boundaries
- skills and prompt workflows
- MCP and external tools
- plugins and packaged capability bundles

---

## 7) Which current relearn pages each seam should strengthen

This section is intentionally practical: if the seam map is used during future rewrites, which current pages should it directly influence?

| Seam | Current relearn pages it should strengthen first | Why |
| --- | --- | --- |
| Runtime spine | `docs/claude-code/architecture.md`, `docs/claude-code/runtime-loop.md`, `docs/source-tours/startup-to-turn.md` | These are the core session/turn explanation surfaces. |
| Control plane | `docs/claude-code/settings-and-remote-policy.md`, `docs/claude-code/settings-sync-and-live-refresh.md`, `docs/claude-code/tool-search-and-deferred-capabilities.md` | These pages already touch control surfaces but need a unifying architecture frame. |
| Tool plane | `docs/claude-code/tools-and-permissions.md`, `docs/claude-code/mcp-and-external-tools.md`, `docs/labs/add-a-tool.md` | These are the current capability-related entry points. |
| Product/UI plane | `docs/claude-code/commands-ui-extensions.md`, `docs/claude-code/ink-and-terminal-ui.md`, `docs/source-tours/commands-ui-tour.md` | Current UX/product-shell coverage is especially shallow. |
| Memory / transcript / team-state plane | `docs/claude-code/memory-and-multi-agent.md`, `docs/claude-code/session-transcripts-and-team-memory.md`, `docs/claude-code/overflow-recovery-and-reactive-compact.md`, `docs/foundations/context-memory.md` | These topics are present but currently mixed together. |
| Extension plane | `docs/claude-code/plugins-and-extension-surfaces.md`, `docs/claude-code/skills-and-prompt-loading.md`, `docs/claude-code/mcp-and-external-tools.md`, `docs/claude-code/commands-ui-extensions.md` | Extension surfaces exist in the site but are not yet cleanly separated. |

### Most urgent page-strengthening opportunities

If only a small next wave happens, the seam map suggests prioritizing:

1. `docs/claude-code/architecture.md`
2. `docs/claude-code/runtime-loop.md`
3. `docs/claude-code/tools-and-permissions.md`
4. `docs/claude-code/commands-ui-extensions.md`
5. `docs/claude-code/memory-and-multi-agent.md`
6. `docs/claude-code/settings-and-remote-policy.md`

That set best absorbs the seam model without needing a full IA rewrite first.

---

## 8) Top future dedicated pages

These are the seam-driven future dedicated pages most justified by the current architecture understanding.

### 1. `startup-and-session-bootstrap.md`

**Driven by seam:** runtime spine  
**Need:** separate startup/session shaping from the turn loop.

### 2. `app-state-and-control-plane.md`

**Driven by seam:** control plane  
**Need:** unify settings, permission mode, external metadata, and live refresh in one narrative.

### 3. `tool-contract-and-capability-gating.md`

**Driven by seam:** tool plane  
**Need:** explain tool contracts, feature gates, filtering, concurrency, and deferred visibility.

### 4. `permission-runtime-and-defense-in-depth.md`

**Driven by seam:** tool plane + control plane + product/UI plane  
**Need:** explain safety as a layered runtime system rather than a single permission rule page.

### 5. `terminal-product-shell.md`

**Driven by seam:** product/UI plane  
**Need:** explain observable autonomy, Ink runtime mechanics, approvals, and user trust.

### 6. `memory-types-and-recall.md`

**Driven by seam:** memory/transcript/team-state plane  
**Need:** separate memory semantics from transcript and team-state persistence.

### 7. `transcripts-team-state-and-durable-coordination.md`

**Driven by seam:** memory/transcript/team-state plane  
**Need:** clarify how transcripts, team/task state, and session continuity differ.

### 8. `hooks-and-extension-boundaries.md`

**Driven by seam:** extension plane  
**Need:** explain hooks, plugins, skills, commands, and MCP as different extension surfaces with different responsibilities.

### 9. `agent-runtime-boundaries.md`

**Driven by seam:** tool plane + product/UI plane + memory/team-state plane  
**Need:** explain workers, async agents, worktrees, remote runs, task state, and user-visible delegation boundaries.

### 10. `minimal-vs-production-agent.md`

**Driven by seam:** runtime spine + product/UI plane + extension plane  
**Need:** help builders distinguish irreducible agent core from production shell complexity.

---

## Final recommendation

The strongest editorial shift now is this:

- stop teaching Claude Code mainly as a big repo with many features
- start teaching it as a **governed system of seams**

That shift will improve future 专题文章 pages because each article can answer a cleaner question:

- which seam is this about,
- what problem does that seam solve,
- which source files prove it,
- and which neighboring seams should the reader study next?

That is the most architecture-faithful way to turn current relearn pages into deeper topic articles without collapsing back into broad summaries.
