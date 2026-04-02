# Orchestration and product boundaries handoff

This note is a low-conflict handoff artifact for the deeper documentation rewrite. It focuses on the architectural seam that is easiest to under-explain when reading Claude Code only as a model loop: **the product/runtime shell that turns tools, tasks, agents, and UI into one coherent system**.

It is grounded in:

- `ref_repo/claude-code/src/Tool.ts`
- `ref_repo/claude-code/src/tools.ts`
- `ref_repo/claude-code/src/services/tools/toolOrchestration.ts`
- `ref_repo/claude-code/src/tasks.ts`
- `ref_repo/claude-code/src/utils/tasks.ts`
- `ref_repo/claude-code/src/tools/AgentTool/*`
- `ref_repo/claude-code/src/components/App.tsx`
- `ref_repo/claude-code/src/ink/components/App.tsx`
- `ref_repo/claude-code/src/state/AppState.tsx`
- `ref_repo/claude-code/src/state/onChangeAppState.ts`
- `ref_repo/how-claude-code-works/docs/04-tool-system.md`
- `ref_repo/how-claude-code-works/docs/07-multi-agent.md`

## Core thesis

Claude Code is not only a think-act-observe runtime. It is a **product shell** that makes delegation, permission state, capability discovery, and background work visible, governable, and recoverable.

That means the teaching site should explain five boundaries separately:

1. **session orchestrator** — `QueryEngine.ts` coordinates the turn lifecycle but does not own every subsystem
2. **capability plane** — `Tool.ts` + `tools.ts` decide what operations exist and under which rules
3. **task/agent plane** — task registries, async agent registration, worker tool pools, notifications, worktrees
4. **control plane** — `AppState`, settings sync, permission-mode propagation, live refresh
5. **terminal product shell** — React + Ink wrappers, input/focus/raw-mode handling, approvals, task status, commands

## Findings that should change how the docs are written

### 1. Tooling is a capability plane, not just a registry

`src/Tool.ts` defines far more than “a callable tool.”
It packages:

- schema and JSON-schema concerns
- permission context
- progress and rendering hooks
- mutable shared runtime context (`ToolUseContext`)
- app-state accessors
- message injection and notification surfaces

This means a future article should teach tools as a **runtime contract between model, executor, UI, and permission system**, not as a flat list of built-ins.

### 2. `tools.ts` is where compile-time and runtime policy meet

`src/tools.ts` mixes several layers of decision-making:

- compile-time feature gating via `feature(...)`
- environment-sensitive inclusion/exclusion
- default preset assembly
- deny-rule filtering
- MCP merge behavior
- special cases like deferred tool discovery and worktree/team modes

A good teaching page should explain that Claude Code does not have one static tool list. It has a **dynamic capability pool** shaped by build flags, runtime state, and permission rules.

### 3. Tool concurrency is policy, not tool-local behavior

`src/services/tools/toolOrchestration.ts` makes an important architectural move:

- first, partition tool calls into concurrency-safe and serial batches
- then run read-safe batches concurrently
- then apply context mutations deterministically after the batch

That means “parallel reads, serialized writes” is not just convention. It is enforced by a dedicated orchestration layer that protects ordering while still letting the product feel fast.

### 4. Tasks are first-class runtime objects

`src/tasks.ts` mirrors the tool registry pattern with a task-type registry.
`src/utils/tasks.ts` then adds the product behavior:

- durable task-list IDs
- leader/team/shared-task resolution
- lock-protected writes
- high-water-mark ID tracking
- immediate UI refresh hooks

This is the key teaching point: Claude Code does not treat background work as hidden implementation state. It turns it into **durable product state**.

### 5. Agent delegation is constrained by worker-specific capability assembly

Inside `src/tools/AgentTool/AgentTool.tsx`, worker agents do **not** inherit the parent tool pool blindly.
Instead, the runtime rebuilds a worker pool from `assembleToolPool(...)` using the worker’s own permission mode.

That is a big architectural idea worth foregrounding:

- delegation does not just create a new prompt
- delegation creates a new execution context
- execution context includes permissions, isolation, tool visibility, async/sync behavior, and task registration

This is much stronger than “Claude Code supports subagents.”

### 6. `filterToolsForAgent()` reveals delegation as policy design

`src/tools/AgentTool/agentToolUtils.ts` shows explicit policy shaping:

- all agents lose some globally disallowed tools
- custom agents lose additional tools
- async agents are restricted further
- in-process teammates get carefully chosen exceptions
- plan-mode agents regain `ExitPlanMode` even when broader filtering would hide it

This is a perfect example of a “product boundary” page because it teaches that **agent types are policy bundles**, not just prompt personalities.

### 7. App state is a control plane, not a React convenience layer

`src/state/AppState.tsx` and `src/state/onChangeAppState.ts` together reveal a deeper pattern:

- `AppStateProvider` owns the session-wide store exposed to the UI tree
- settings changes are subscribed and applied into the store
- bypass-permission availability is normalized on mount
- mailbox and voice providers are attached at the state boundary
- `onChangeAppState` propagates permission-mode changes outward to CCR/SDK metadata
- model changes and persisted UI toggles are synchronized through the same diff hook

The right teaching frame is not “here is the React state.”
It is: **this is the control plane that keeps the runtime, external clients, and product UI in sync**.

### 8. Terminal UI is part of the runtime boundary, not frosting

The split between `src/components/App.tsx` and `src/ink/components/App.tsx` is instructive:

- `components/App.tsx` wraps interactive sessions with state/stats/FPS providers
- `ink/components/App.tsx` owns raw mode, focus, cursor visibility, selection behavior, click/hover dispatch, terminal resume detection, and keyboard plumbing

In other words, the terminal shell is not merely “rendering.” It is responsible for turning a streaming runtime into a controlled interactive product.

### 9. Task visibility is designed UX, not incidental telemetry

`src/components/tasks/taskStatusUtils.tsx` shows task state being translated into icons, colors, teammate activity summaries, and footer visibility logic.

That means task state is intended to be **interpreted by users**, not only stored for internal bookkeeping.
A future page on orchestration should explicitly teach the UI layer as part of the task system.

## How this should reshape future chapters

### Rewrite priority implications

If a maintainer only rewrites four core pages first, the most leverage comes from:

1. `docs/claude-code/architecture.md`
2. `docs/claude-code/tools-and-permissions.md`
3. `docs/claude-code/tasks-and-orchestration.md`
4. `docs/claude-code/commands-ui-extensions.md`

These four pages can carry most of the deeper story:

- system layers
- capability gating
- runtime orchestration
- product shell and user-visible execution state

### Better target theses for those pages

#### `architecture.md`
**Target thesis:** Claude Code is a layered product system whose runtime loop is only one layer inside a larger startup, control-plane, capability-plane, and product-shell architecture.

#### `tools-and-permissions.md`
**Target thesis:** Tools are the shared capability contract that binds schema, execution, permission, concurrency, and rendering into one operational surface.

#### `tasks-and-orchestration.md`
**Target thesis:** Claude Code turns delegation and background work into explicit runtime objects with durable state, constrained capabilities, and UI-visible lifecycle.

#### `commands-ui-extensions.md`
**Target thesis:** Commands, Ink UI, AppState, and approvals form the product shell that makes a coding agent usable, inspectable, and trustworthy.

## Source anchors for future detailed articles

### Capability plane article

- `ref_repo/claude-code/src/Tool.ts`
- `ref_repo/claude-code/src/tools.ts`
- `ref_repo/claude-code/src/constants/tools.ts`
- `ref_repo/claude-code/src/utils/toolSearch.ts`
- `ref_repo/claude-code/src/services/tools/toolOrchestration.ts`

### Task and agent orchestration article

- `ref_repo/claude-code/src/tasks.ts`
- `ref_repo/claude-code/src/utils/tasks.ts`
- `ref_repo/claude-code/src/tools/AgentTool/AgentTool.tsx`
- `ref_repo/claude-code/src/tools/AgentTool/agentToolUtils.ts`
- `ref_repo/claude-code/src/tools/AgentTool/forkSubagent.ts`
- `ref_repo/claude-code/src/tools/AgentTool/runAgent.ts`
- `ref_repo/claude-code/src/components/tasks/*`

### Control-plane article

- `ref_repo/claude-code/src/state/AppState.tsx`
- `ref_repo/claude-code/src/state/AppStateStore.ts`
- `ref_repo/claude-code/src/state/onChangeAppState.ts`
- `ref_repo/claude-code/src/utils/settings/*`
- `ref_repo/claude-code/src/utils/sessionState.js`

### Terminal product-shell article

- `ref_repo/claude-code/src/components/App.tsx`
- `ref_repo/claude-code/src/ink/components/App.tsx`
- `ref_repo/claude-code/src/components/permissions/*`
- `ref_repo/claude-code/src/commands/*`
- `ref_repo/claude-code/src/components/tasks/taskStatusUtils.tsx`

## Chapter-style guidance from `how-claude-code-works`

The most reusable quality bar from `how-claude-code-works` is not only topic selection. It is the **chapter posture**:

- begin from the product problem
- state the architectural claim clearly
- show a small set of key files
- explain why the design exists, not only how it is wired
- call out tradeoffs, restrictions, and failure containment
- end with what to copy into your own agent

The teaching site should adopt that posture consistently for every future “专题文章” page.

## Recommended next low-conflict use of this note

Use this note as input when rewriting or expanding:

- `docs/claude-code/architecture.md`
- `docs/claude-code/tools-and-permissions.md`
- `docs/claude-code/tasks-and-orchestration.md`
- `docs/claude-code/commands-ui-extensions.md`

It is especially useful for avoiding a common mistake: explaining Claude Code only as a loop with tools, instead of a **governed product system with explicit boundaries and user-visible runtime state**.
