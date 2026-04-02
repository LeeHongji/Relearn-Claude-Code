# Claude Code page rewrite plan (专题文章版)

This plan is the next-step rewrite map after a deeper pass on the **orchestration / product-boundary** lane in `ref_repo/claude-code`, cross-checked against the chapter style in `ref_repo/how-claude-code-works`.

## What the latest architecture pass clarified

### 1. The current site is accurate, but still too summary-like
The current `docs/claude-code/*` pages mostly explain **what exists**. The next version should explain **why each subsystem exists, what problem it solves, where the boundary sits, and what the reader should inspect next**.

### 2. The most under-taught architectural seam is the product shell around the loop
The runtime is not just `query.ts`.
The real system boundary is:

- startup and session shaping (`main.tsx`, `entrypoints/init.ts`, `setup.ts`)
- session orchestration (`QueryEngine.ts`)
- tool pool assembly + capability gating (`Tool.ts`, `tools.ts`, `constants/tools.ts`, `utils/toolSearch.ts`)
- task and agent lifecycle (`tasks.ts`, `tasks/*`, `tools/AgentTool/*`, `utils/tasks.ts`)
- product shell / UI runtime (`components/App.tsx`, `ink/components/App.tsx`, `state/AppState.tsx`, `commands/*`)

### 3. Task and agent pages should teach “delegation as a product feature,” not just “multi-agent exists”
The strongest angle from the source is that Claude Code does **not** bolt agents on top of chat history. It turns delegation into explicit runtime objects:

- separate tool pools for workers
- explicit task registration / updates / completion
- `<task-notification>`-style re-entry
- background agent registration and naming
- UI-visible task state
- worktree / remote isolation as product-level boundaries

### 4. The control plane needs its own narrative
The current site spreads state/config/live-refresh ideas across multiple pages, but the real concept is a **control plane**:

- settings / policy / mode
- app state and session state
- dynamic reload and sync
- deferred capabilities and tool search
- permission context as runtime state, not a static config file

### 5. `how-claude-code-works` is strongest when each page is a focused chapter with a thesis
The next rewrite should use that chapter feel:

- one page = one strong claim
- open with the product problem
- trace the implementation path
- highlight tradeoffs and failure modes
- end with “what to read next” / “what to copy into your own agent”

## Rewrite principles

1. **Prefer thesis-driven专题文章 over overview dumps.**
2. **Keep source grounding explicit** with key files near the top.
3. **Split by architectural boundary, not by folder count.**
4. **Rewrite existing pages before adding too many new ones.**
5. **Use source tours as secondary companions**, not as the main teaching path.
6. **Chinese mirrors should lag one wave behind English canon** to keep maintenance sustainable.

## Priority waves

### Wave P0 — deepen core system understanding first
These pages should be rewritten before broadening the catalog.

1. `docs/claude-code/architecture.md`
2. `docs/claude-code/runtime-loop.md`
3. `docs/claude-code/tools-and-permissions.md`
4. `docs/claude-code/tasks-and-orchestration.md`
5. `docs/claude-code/commands-ui-extensions.md`
6. `docs/claude-code/settings-and-remote-policy.md`
7. `docs/claude-code/settings-sync-and-live-refresh.md`
8. `docs/claude-code/tool-search-and-deferred-capabilities.md`

### Wave P1 — fill missing product-boundary chapters
Add narrowly scoped chapters only after P0 pages become deeper.

1. `docs/claude-code/startup-and-session-bootstrap.md` **(new)**
2. `docs/claude-code/tool-pool-and-capability-gating.md` **(new)**
3. `docs/claude-code/app-state-and-control-plane.md` **(new)**
4. `docs/claude-code/agent-runtime-boundaries.md` **(new)**
5. `docs/claude-code/terminal-product-shell.md` **(new)**

### Wave P2 — restructure supporting materials around the new canon

1. source tours
2. learning path
3. repo map / source atlas
4. labs
5. Chinese mirror entry pages

## Page-by-page rewrite matrix

### Canonical foundations / navigation

| Current page | Action | Priority | Target title | Rewrite intent |
| --- | --- | --- | --- | --- |
| `docs/index.md` | rewrite | P1 | **Relearn Claude Code: from agent loop to product system** | Keep the home page, but shift the pitch from “site overview” to “why Claude Code is a systems study, not a prompt demo.” |
| `docs/learning-path.md` | rewrite | P2 | **Study tracks: learner, builder, architecture reviewer** | Re-sequence around the new deeper chapters and make the wave order visible. |
| `docs/site-information-architecture.md` | rewrite | P1 | **Maintainer IA for chapter-style docs** | Turn this into an explicit maintainer contract: canon pages, companion pages, mirror strategy, and rewrite waves. |
| `docs/reference-analysis.md` | rewrite | P2 | **How the three reference repos divide teaching labor** | Make the comparison explicit: production truth vs narrative style vs minimal implementation. |

### Foundations cluster

| Current page | Action | Priority | Target title | Rewrite intent |
| --- | --- | --- | --- | --- |
| `docs/foundations/what-is-an-agent.md` | rewrite | P2 | **What makes a coding agent different from chat and autocomplete** | Sharpen the paradigm ladder and link directly to runtime loop and tool system chapters. |
| `docs/foundations/agent-loop.md` | rewrite | P2 | **Think → act → observe as a controlled runtime loop** | Make this the conceptual prequel to the production `runtime-loop.md` page. |
| `docs/foundations/context-memory.md` | rewrite | P2 | **Why context engineering becomes a systems problem** | Prepare readers for compaction, memory, and state surfaces. |
| `docs/foundations/tools-safety.md` | rewrite | P2 | **Tools, side effects, and why safety belongs in runtime code** | Make the “runtime-owned safety” argument more explicit before the Claude Code deep dive. |

### Claude Code core deep dive

| Current page | Action | Priority | Target title | Rewrite intent |
| --- | --- | --- | --- | --- |
| `docs/claude-code/architecture.md` | rewrite | P0 | **Claude Code as a layered product system** | Expand beyond four layers: startup spine, control plane, runtime engine, capability plane, and product shell. |
| `docs/claude-code/repo-map.md` | rewrite | P1 | **How to read the Claude Code repo without getting lost** | Keep the navigation value, but align the neighborhoods with the new architectural chapters. |
| `docs/claude-code/runtime-loop.md` | rewrite | P0 | **The production think-act-observe loop** | Emphasize query lifecycle, retries, compaction checkpoints, stop conditions, and why `QueryEngine.ts` is not the same as `query.ts`. |
| `docs/claude-code/context-engineering.md` | rewrite | P1 | **Context engineering as admission control, compaction, and recall** | Keep the topic, but bind it more tightly to state/control surfaces and turn economics. |
| `docs/claude-code/tools-and-permissions.md` | rewrite | P0 | **Tools, permission state, and ordered execution** | Go deeper on `Tool.ts`, `tools.ts`, tool partitioning, streaming execution, and why permission context is runtime state. |
| `docs/claude-code/commands-ui-extensions.md` | rewrite | P0 | **The product shell: commands, Ink UI, and extension boundaries** | Reframe as the place where Claude Code becomes a product: commands, React/Ink runtime, AppState, approvals, discovery, and extensions. |
| `docs/claude-code/memory-and-multi-agent.md` | rewrite | P1 | **Memory, delegation, and long-running coordination** | Split the current page so memory is not drowned out by multi-agent details. |
| `docs/claude-code/building-your-own.md` | rewrite | P2 | **What to copy, what to simplify, what not to cargo-cult** | End-state synthesis page after the deeper chapters are in place. |
| `docs/claude-code/settings-and-remote-policy.md` | rewrite | P0 | **Settings, policy, and who is allowed to shape the session** | Teach this as control plane governance rather than just config files. |
| `docs/claude-code/plugins-and-extension-surfaces.md` | rewrite | P1 | **Extension surfaces without rewriting the core loop** | Position plugins, skills, commands, MCP, and custom agents as boundary-preserving extension points. |
| `docs/claude-code/ink-and-terminal-ui.md` | rewrite | P1 | **Why terminal UI is a systems component, not polish** | Focus on render loop, input handling, state propagation, and UX constraints in the terminal. |
| `docs/claude-code/skills-and-prompt-loading.md` | rewrite | P1 | **Skill loading, prompt assembly, and behavior shaping** | Tie prompt-loading to product composition rather than prompt snippets. |
| `docs/claude-code/lsp-and-editor-feedback.md` | rewrite | P1 | **Editor feedback loops: LSP, diagnostics, and trust-building** | Explain how tooling feedback shortens the model’s correction loop. |
| `docs/claude-code/tool-search-and-deferred-capabilities.md` | rewrite | P0 | **Deferred capabilities: why not every tool should be eagerly visible** | Go deeper on tool search, deferred schema cost, and capability discovery. |
| `docs/claude-code/settings-sync-and-live-refresh.md` | rewrite | P0 | **Live refresh, sync, and dynamic control-plane updates** | Make it the runtime reconfiguration page rather than a settings appendix. |
| `docs/claude-code/tasks-and-orchestration.md` | rewrite | P0 | **Tasks, background work, and agent orchestration as first-class runtime objects** | Expand around `tasks.ts`, task types, task UI, async agents, worker tool pools, notifications, and isolation modes. |
| `docs/claude-code/session-transcripts-and-team-memory.md` | rewrite | P1 | **Session transcripts, durable traces, and team memory surfaces** | Clarify transcript/log/memory boundaries and why not all persistence is the same. |
| `docs/claude-code/overflow-recovery-and-reactive-compact.md` | rewrite | P1 | **Overflow recovery: keeping the session alive under pressure** | Tie reactive compact to user-perceived continuity and fallback economics. |
| `docs/claude-code/mcp-and-external-tools.md` | rewrite | P1 | **MCP and external tools inside the same execution contract** | Show how external tools still flow through permission, rendering, and state boundaries. |

### New Claude Code chapters to add

| New page | Priority | Target title | Why add it |
| --- | --- | --- | --- |
| `docs/claude-code/startup-and-session-bootstrap.md` | P1 | **Startup and session bootstrap: how a Claude Code session gets shaped before the first turn** | The current site under-teaches `main.tsx`, `entrypoints/init.ts`, and `setup.ts` as a cohesive startup system. |
| `docs/claude-code/tool-pool-and-capability-gating.md` | P1 | **Capability gating: how Claude Code decides which tools exist right now** | `tools.ts`, feature flags, deny filters, deferred tools, and MCP merging deserve their own page. |
| `docs/claude-code/app-state-and-control-plane.md` | P1 | **App state and control plane: the runtime behind the runtime** | Consolidates settings, policy, app state, sync, live refresh, and permission context. |
| `docs/claude-code/agent-runtime-boundaries.md` | P1 | **Agent boundaries: foreground, background, worktree, remote** | Makes the isolation story explicit instead of scattering it across task and agent pages. |
| `docs/claude-code/terminal-product-shell.md` | P1 | **Terminal product shell: AppState, Ink, commands, and user trust** | A stronger companion to the rewritten commands/UI page for readers focused on product engineering. |

### Source tours

| Current page | Action | Priority | Target title | Rewrite intent |
| --- | --- | --- | --- | --- |
| `docs/source-tours/index.md` | rewrite | P2 | **Source tours: guided code-reading companions** | Reposition source tours as code-reading drills that follow the canonical chapters. |
| `docs/source-tours/startup-to-turn.md` | rewrite | P2 | **Tour: startup spine to first turn** | Align directly with the new startup/bootstrap chapter. |
| `docs/source-tours/context-memory-tour.md` | rewrite | P2 | **Tour: context, memory, and compaction flows** | Pair with context engineering and overflow recovery chapters. |
| `docs/source-tours/tools-permission-tour.md` | rewrite | P2 | **Tour: tool execution and permission enforcement** | Pair with the rewritten tools-and-permissions chapter. |
| `docs/source-tours/commands-ui-tour.md` | rewrite | P2 | **Tour: commands, AppState, and terminal UI plumbing** | Pair with the product-shell chapters. |

### Labs

| Current page | Action | Priority | Target title | Rewrite intent |
| --- | --- | --- | --- | --- |
| `docs/labs/index.md` | rewrite | P2 | **Labs: rebuild the patterns, not the whole product** | Make labs clearly derivative from the main chapter set. |
| `docs/labs/add-a-tool.md` | rewrite | P2 | **Lab: add a tool with schema, runtime checks, and UI affordances** | Teach extension through the stronger `Tool.ts` / `tools.ts` story. |
| `docs/labs/compact-context.md` | rewrite | P2 | **Lab: design a compaction ladder for long-running sessions** | Tie to context engineering and overflow recovery. |
| `docs/labs/multi-agent-readiness.md` | rewrite | P2 | **Lab: when is your agent ready for delegation?** | Ground multi-agent decisions in explicit runtime/task boundaries. |

### Appendix / publishing / Chinese mirrors

| Current page | Action | Priority | Target title | Rewrite intent |
| --- | --- | --- | --- | --- |
| `docs/appendix/glossary.md` | rewrite | P2 | **Glossary for Claude Code system terms** | Update terminology to match control plane / product shell / capability gating language. |
| `docs/appendix/source-atlas.md` | rewrite | P2 | **Source atlas: file-level anchor map for the rewritten chapters** | Convert atlas into the maintenance index for source-grounded pages. |
| `docs/publishing.md` | keep/light rewrite | P3 | **Publishing the teaching site** | Only light updates needed after IA changes. |
| `docs/zh/index.md` | rewrite later | P3 | **中文版入口（与英文专题结构保持同步）** | Mirror the new canon after English P0/P1 stabilize. |
| `docs/zh/learning-path.md` | rewrite later | P3 | **中文学习路径** | Update only after English learning-path rewrite. |
| `docs/zh/publishing.md` | keep/light rewrite | P3 | **中文发布说明** | Minimal maintenance page. |

## Source anchors for the first rewrite cluster

### 1. `architecture.md` rewrite anchors

- `ref_repo/claude-code/src/QueryEngine.ts` — session orchestration boundary, not the whole runtime.
- `ref_repo/claude-code/src/Tool.ts` — shared execution contract and `ToolUseContext`.
- `ref_repo/claude-code/src/tools.ts` — compile-time + runtime tool-pool assembly.
- `ref_repo/claude-code/src/components/App.tsx` — top-level interactive session wrapper.
- `ref_repo/claude-code/src/ink/components/App.tsx` — terminal runtime shell: input, focus, cursor, raw mode, selection.

### 2. `tools-and-permissions.md` rewrite anchors

- `ref_repo/claude-code/src/Tool.ts` — tool metadata, schema, permission context, UI hooks.
- `ref_repo/claude-code/src/tools.ts` — `getAllBaseTools()`, `getTools()`, `assembleToolPool()`.
- `ref_repo/claude-code/src/services/tools/toolOrchestration.ts` — concurrency-safe partitioning and deterministic context mutation.
- `ref_repo/claude-code/src/constants/tools.ts` — allowed/disallowed tool sets for agent modes.
- `ref_repo/claude-code/src/utils/toolSearch.ts` — deferred capability discovery.

### 3. `tasks-and-orchestration.md` rewrite anchors

- `ref_repo/claude-code/src/tasks.ts` — task type registry mirroring the tool registry pattern.
- `ref_repo/claude-code/src/utils/tasks.ts` — durable task-list storage, locking, team/shared-task resolution.
- `ref_repo/claude-code/src/tools/AgentTool/AgentTool.tsx` — worker tool pools, async agent registration, notification flow.
- `ref_repo/claude-code/src/tools/AgentTool/agentToolUtils.ts` — per-agent tool filtering.
- `ref_repo/claude-code/src/tools/AgentTool/forkSubagent.ts` — forked-message model and `<task-notification>` interaction shape.
- `ref_repo/claude-code/src/components/tasks/*` — tasks as a UI concept, not just background metadata.

### 4. `commands-ui-extensions.md` rewrite anchors

- `ref_repo/claude-code/src/components/App.tsx` — React providers and top-level app state wrapping.
- `ref_repo/claude-code/src/ink/components/App.tsx` — terminal event loop and UX plumbing.
- `ref_repo/claude-code/src/state/AppState.tsx` — state surface exposed to the UI tree.
- `ref_repo/claude-code/src/state/onChangeAppState.ts` — side effects triggered by state transitions.
- `ref_repo/claude-code/src/commands/*` — user-facing shell around the engine.
- `ref_repo/claude-code/src/components/permissions/*` — approvals as product UX, not backend-only logic.

## Recommended execution order

### Step 1 — rewrite the canon pages that unlock everything else

1. `architecture.md`
2. `runtime-loop.md`
3. `tools-and-permissions.md`
4. `tasks-and-orchestration.md`
5. `commands-ui-extensions.md`

### Step 2 — consolidate the control plane story

6. `settings-and-remote-policy.md`
7. `settings-sync-and-live-refresh.md`
8. `tool-search-and-deferred-capabilities.md`
9. add `app-state-and-control-plane.md`

### Step 3 — add missing boundary chapters

10. add `startup-and-session-bootstrap.md`
11. add `tool-pool-and-capability-gating.md`
12. add `agent-runtime-boundaries.md`
13. add `terminal-product-shell.md`

### Step 4 — re-thread supporting navigation

14. `repo-map.md`
15. `learning-path.md`
16. `source-atlas.md`
17. `source-tours/*`
18. `labs/*`

## Suggested editorial template for every rewritten chapter

1. **Thesis:** one sentence explaining the page’s main claim.
2. **Why this subsystem exists:** product problem first.
3. **Primary source files:** 3-8 files, not a giant list.
4. **Execution path / data flow:** the actual runtime path.
5. **Boundary decisions:** what belongs here vs elsewhere.
6. **Failure modes / tradeoffs:** where the design is expensive or subtle.
7. **If you are building your own:** what to copy or simplify.
8. **Read next:** explicit next chapter links.

## Immediate maintainer recommendation

If only one rewrite lane starts next, start with this cluster:

- `docs/claude-code/architecture.md`
- `docs/claude-code/tools-and-permissions.md`
- `docs/claude-code/tasks-and-orchestration.md`
- `docs/claude-code/commands-ui-extensions.md`

That cluster best captures the latest deeper understanding: Claude Code is not just a model loop with tools — it is a **product shell that turns delegation, permissions, and capability discovery into explicit runtime architecture**.
