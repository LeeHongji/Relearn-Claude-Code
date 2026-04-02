# how-claude-code-works crosswalk for relearn Claude Code

This is a **chapter-crosswalk planning artifact**, not a full rewrite roadmap.
Its job is to map the chapter structure of `ref_repo/how-claude-code-works` onto:

1. the **current** `relearn-claude-code` pages,
2. the places where those pages are **still too shallow**, and
3. the **next-wave 专题文章 pages** that would close the gap.

This note is intentionally narrower than a repo-wide roadmap so it does not overlap with worker-4’s broader conversion plan.

Reference sources:

- `ref_repo/how-claude-code-works/docs/01-overview.md`
- `ref_repo/how-claude-code-works/docs/02-agent-loop.md`
- `ref_repo/how-claude-code-works/docs/03-context-engineering.md`
- `ref_repo/how-claude-code-works/docs/04-tool-system.md`
- `ref_repo/how-claude-code-works/docs/05-code-editing-strategy.md`
- `ref_repo/how-claude-code-works/docs/06-hooks-extensibility.md`
- `ref_repo/how-claude-code-works/docs/07-multi-agent.md`
- `ref_repo/how-claude-code-works/docs/08-memory-system.md`
- `ref_repo/how-claude-code-works/docs/09-skills-system.md`
- `ref_repo/how-claude-code-works/docs/10-permission-security.md`
- `ref_repo/how-claude-code-works/docs/11-user-experience.md`
- `ref_repo/how-claude-code-works/docs/12-minimal-components.md`

Supporting Claude Code source anchors used in this crosswalk:

- `ref_repo/claude-code/src/Tool.ts`
- `ref_repo/claude-code/src/tools.ts`
- `ref_repo/claude-code/src/services/tools/toolOrchestration.ts`
- `ref_repo/claude-code/src/tasks.ts`
- `ref_repo/claude-code/src/utils/tasks.ts`
- `ref_repo/claude-code/src/tools/AgentTool/AgentTool.tsx`
- `ref_repo/claude-code/src/tools/AgentTool/agentToolUtils.ts`
- `ref_repo/claude-code/src/tools/FileEditTool/*`
- `ref_repo/claude-code/src/tools/FileWriteTool/*`
- `ref_repo/claude-code/src/hooks/*`
- `ref_repo/claude-code/src/plugins/*`
- `ref_repo/claude-code/src/skills/*`
- `ref_repo/claude-code/src/memdir/*`
- `ref_repo/claude-code/src/services/compact/*`
- `ref_repo/claude-code/src/utils/permissions/*`
- `ref_repo/claude-code/src/components/permissions/*`
- `ref_repo/claude-code/src/components/App.tsx`
- `ref_repo/claude-code/src/ink/components/App.tsx`
- `ref_repo/claude-code/src/state/AppState.tsx`
- `ref_repo/claude-code/src/state/onChangeAppState.ts`

---

## 1) Reference chapter → current page mapping

| Reference chapter | Main theme | Current relearn page mapping | Coverage status | Proposed future 专题文章 page(s) |
| --- | --- | --- | --- | --- |
| `01-overview.md` | Claude Code as a production coding agent | `docs/index.md`, `docs/claude-code/architecture.md`, `docs/learning-path.md` | Partial | `claude-code-as-a-product-system.md` |
| `02-agent-loop.md` | dual-layer loop, QueryEngine vs query | `docs/claude-code/runtime-loop.md`, `docs/claude-code/architecture.md` | Good but compressed | `production-agent-loop.md` |
| `03-context-engineering.md` | prompt assembly, context budget, compaction | `docs/claude-code/context-engineering.md`, `docs/claude-code/overflow-recovery-and-reactive-compact.md`, `docs/claude-code/session-transcripts-and-team-memory.md` | Good but split loosely | `context-lifecycle-and-compaction.md` |
| `04-tool-system.md` | Tool contract, registry, orchestration | `docs/claude-code/tools-and-permissions.md`, `docs/claude-code/tool-search-and-deferred-capabilities.md`, `docs/claude-code/mcp-and-external-tools.md` | Strong base, needs deeper contract framing | `tool-contract-and-capability-gating.md` |
| `05-code-editing-strategy.md` | edit/write strategy, low-destructive changes | `docs/claude-code/tools-and-permissions.md`, `docs/labs/add-a-tool.md`, `docs/claude-code/building-your-own.md` | Thin | `code-editing-strategy.md` |
| `06-hooks-extensibility.md` | hooks, plugins, extension boundaries | `docs/claude-code/plugins-and-extension-surfaces.md`, `docs/claude-code/commands-ui-extensions.md`, `docs/claude-code/mcp-and-external-tools.md` | Thin and scattered | `hooks-and-extension-boundaries.md` |
| `07-multi-agent.md` | subagents, coordinator, swarm/team modes | `docs/claude-code/memory-and-multi-agent.md`, `docs/claude-code/tasks-and-orchestration.md` | Underdeveloped | `agent-runtime-boundaries.md` |
| `08-memory-system.md` | memory types, retrieval, team memory | `docs/claude-code/memory-and-multi-agent.md`, `docs/claude-code/session-transcripts-and-team-memory.md`, `docs/foundations/context-memory.md` | Partial, mixed with other topics | `memory-types-and-recall.md` |
| `09-skills-system.md` | skills as prompt workflows, load order | `docs/claude-code/skills-and-prompt-loading.md`, `docs/claude-code/plugins-and-extension-surfaces.md` | Thin | `skills-as-workflow-surface.md` |
| `10-permission-security.md` | layered permission/security stack | `docs/claude-code/tools-and-permissions.md`, `docs/claude-code/settings-and-remote-policy.md` | Present but not defense-in-depth enough | `permission-runtime-and-defense-in-depth.md` |
| `11-user-experience.md` | terminal UX, observable autonomy, trust | `docs/claude-code/commands-ui-extensions.md`, `docs/claude-code/ink-and-terminal-ui.md` | Too shallow | `terminal-product-shell.md` |
| `12-minimal-components.md` | minimal-vs-production decomposition | `docs/claude-code/building-your-own.md`, `docs/reference-analysis.md`, `docs/foundations/*` | Partial | `minimal-vs-production-agent.md` |

### Quick reading of the current shape

The current relearn site already covers almost every **topic area**, but often with a **horizontal overview page** where `how-claude-code-works` would use a deeper vertical chapter.

The major crosswalk lesson is:

- **coverage breadth is already decent**
- **coverage depth and chapter posture are the real gap**

---

## 2) Gaps where current relearn pages are too shallow

These are the most obvious “too shallow” spots when the current site is compared to the chapter depth of `how-claude-code-works`.

### Gap A — orchestration is under-taught

Current pages:

- `docs/claude-code/tasks-and-orchestration.md` — only ~27 lines
- `docs/claude-code/memory-and-multi-agent.md` — topic bundle, not a deep runtime article

Missing depth:

- task registry as a runtime abstraction
- durable task-list storage and locking
- worker-specific tool pools
- async agent registration and lifecycle
- worktree/remote isolation as execution boundaries
- UI-visible task state and notification flows

### Gap B — terminal UX is under-taught

Current pages:

- `docs/claude-code/ink-and-terminal-ui.md` — only ~30 lines
- `docs/claude-code/commands-ui-extensions.md` — broader product-shell page, but still overview-heavy

Missing depth:

- React wrapper vs Ink runtime split
- raw mode / cursor / focus / selection / click/hover handling
- why observable autonomy is a UX decision, not mere polish
- approvals and task status as user trust mechanisms

### Gap C — editing strategy is mostly implicit

Current pages mention tools and permissions, but there is no dedicated article for:

- why `FileEditTool` and `FileWriteTool` are different classes of action
- why low-destructive edit strategy matters
- how code-editing strategy differs from tool registry design

This makes the site weaker for readers who want to understand **how coding agents modify code safely**, not only that they have file tools.

### Gap D — extension surfaces are spread too thinly

Current pages:

- `plugins-and-extension-surfaces.md`
- `mcp-and-external-tools.md`
- `skills-and-prompt-loading.md`
- `commands-ui-extensions.md`

Missing depth:

- hooks as a runtime interception layer
- the distinction between hooks, plugins, skills, commands, MCP, and custom agents
- why extension boundaries exist to protect `query.ts` from constant rewrites

### Gap E — memory is mixed with unrelated persistence topics

Current pages:

- `memory-and-multi-agent.md`
- `session-transcripts-and-team-memory.md`

Missing depth:

- memory types as different semantic storage classes
- retrieval/relevance behavior
- distinction between memory, transcripts, logs, and compacted conversation state
- why memory is a product behavior, not “just save notes”

### Gap F — permissions need a stronger “defense in depth” story

Current pages explain permissions, but the framing is still too tool-centric.
What is missing is the full architectural point:

- layered enforcement
- permission mode propagation through app state
- tool-specific checks + shell-specific checks + user-facing approval UI
- product trust as a result of stacked safeguards, not one rule engine

### Gap G — the home/architecture pages still flatten the system

Current pages are broadly correct, but they still tend to collapse the system into:

- startup
- runtime loop
- tools
- UI

The deeper chapter model suggests a richer boundary map:

- startup/session shaping
- loop/orchestrator
- capability plane
- task/agent plane
- control plane
- terminal product shell

---

## 3) Recommended split / merge / rewrite decisions

These decisions are crosswalk-driven and intentionally narrower than a full site roadmap.

### Rewrite in place

These pages already occupy the right conceptual slot and should mostly be **rewritten deeper**, not replaced.

| Current page | Decision | Why |
| --- | --- | --- |
| `docs/claude-code/architecture.md` | rewrite deeper | It is already the canonical entry point. |
| `docs/claude-code/runtime-loop.md` | rewrite deeper | Strong slot, but needs more chapter-style execution-path teaching. |
| `docs/claude-code/tools-and-permissions.md` | rewrite deeper | Strongest current base for the tool/security story. |
| `docs/claude-code/context-engineering.md` | rewrite deeper | Good existing slot for context economics. |
| `docs/claude-code/settings-and-remote-policy.md` | rewrite deeper | Useful control-plane chapter anchor. |

### Split into more focused chapters

| Current page | Decision | Why |
| --- | --- | --- |
| `docs/claude-code/memory-and-multi-agent.md` | split | Memory and agent orchestration are both too large to share one page. |
| `docs/claude-code/commands-ui-extensions.md` | split | Commands/product shell vs extension boundaries deserve distinct treatment. |
| `docs/claude-code/tools-and-permissions.md` | split or pair with companion page | Tool contract/capability gating and defense-in-depth permissions are separable deep topics. |
| `docs/claude-code/session-transcripts-and-team-memory.md` | split or narrow | Transcripts/logs/team memory are related but not identical concepts. |

### Merge or subordinate as companion material

| Current page | Decision | Why |
| --- | --- | --- |
| `docs/claude-code/ink-and-terminal-ui.md` | merge upward into a stronger terminal-shell article | Too short to stand alone in its current form. |
| `docs/claude-code/plugins-and-extension-surfaces.md` | merge with a stronger hooks/extensions chapter or keep as companion | Current page is too thin to carry the full extension story. |
| `docs/claude-code/skills-and-prompt-loading.md` | keep but deepen or nest under a workflow-surface cluster | Topic is real, current page is just light coverage. |

### Add new canonical 专题文章 pages

These are the new pages the crosswalk most strongly justifies:

1. `docs/claude-code/tool-contract-and-capability-gating.md`
2. `docs/claude-code/code-editing-strategy.md`
3. `docs/claude-code/hooks-and-extension-boundaries.md`
4. `docs/claude-code/agent-runtime-boundaries.md`
5. `docs/claude-code/memory-types-and-recall.md`
6. `docs/claude-code/permission-runtime-and-defense-in-depth.md`
7. `docs/claude-code/terminal-product-shell.md`
8. `docs/claude-code/minimal-vs-production-agent.md`

---

## 4) Top 8 future 专题 pages with source anchors

These are the most valuable future article candidates that emerge from the crosswalk.
They are intentionally source-backed and do not attempt to reproduce the whole roadmap.

### 1. Tool contract and capability gating

**Why:** This is the missing bridge between `how-claude-code-works` chapter 4 and the current relearn tool pages.

**Target claim:** Claude Code does not expose a static tool list; it assembles a dynamic capability plane shaped by contracts, feature gates, permission rules, and deferred discovery.

**Source anchors:**

- `ref_repo/claude-code/src/Tool.ts`
- `ref_repo/claude-code/src/tools.ts`
- `ref_repo/claude-code/src/constants/tools.ts`
- `ref_repo/claude-code/src/utils/toolSearch.ts`
- `ref_repo/claude-code/src/services/tools/toolOrchestration.ts`

### 2. Code editing strategy

**Why:** Current relearn coverage barely isolates this topic, yet `how-claude-code-works` makes it a full chapter.

**Target claim:** A coding agent’s safety and reliability depend not only on what tools exist, but on the editing strategy those tools push the model toward.

**Source anchors:**

- `ref_repo/claude-code/src/tools/FileEditTool/FileEditTool.ts`
- `ref_repo/claude-code/src/tools/FileEditTool/prompt.ts`
- `ref_repo/claude-code/src/tools/FileEditTool/types.ts`
- `ref_repo/claude-code/src/tools/FileWriteTool/FileWriteTool.ts`
- `ref_repo/claude-code/src/tools/NotebookEditTool/NotebookEditTool.ts`

### 3. Hooks and extension boundaries

**Why:** This is the clearest under-covered counterpart to reference chapter 6.

**Target claim:** Claude Code extends itself through multiple bounded surfaces so new capabilities can be added without constant surgery on the main loop.

**Source anchors:**

- `ref_repo/claude-code/src/hooks/toolPermission/*`
- `ref_repo/claude-code/src/hooks/useMergedTools.ts`
- `ref_repo/claude-code/src/hooks/useMergedCommands.ts`
- `ref_repo/claude-code/src/plugins/*`
- `ref_repo/claude-code/src/skills/loadSkillsDir.ts`
- `ref_repo/claude-code/src/skills/mcpSkills.ts`

### 4. Agent runtime boundaries

**Why:** This is the strongest crosswalk-derived gap from reference chapter 7.

**Target claim:** Delegation in Claude Code creates a new execution context with its own permissions, task lifecycle, isolation mode, and user-visible state.

**Source anchors:**

- `ref_repo/claude-code/src/tasks.ts`
- `ref_repo/claude-code/src/utils/tasks.ts`
- `ref_repo/claude-code/src/tools/AgentTool/AgentTool.tsx`
- `ref_repo/claude-code/src/tools/AgentTool/agentToolUtils.ts`
- `ref_repo/claude-code/src/tools/AgentTool/forkSubagent.ts`
- `ref_repo/claude-code/src/tools/AgentTool/runAgent.ts`

### 5. Memory types and recall

**Why:** Current pages talk about memory, but not yet as a full semantic storage system.

**Target claim:** Claude Code’s memory system is not one bag of notes; it separates user feedback, project facts, references, and retrieval behavior so the agent can stay coherent over time.

**Source anchors:**

- `ref_repo/claude-code/src/memdir/memdir.ts`
- `ref_repo/claude-code/src/memdir/memoryTypes.ts`
- `ref_repo/claude-code/src/memdir/findRelevantMemories.ts`
- `ref_repo/claude-code/src/memdir/teamMemPrompts.ts`
- `ref_repo/claude-code/src/memdir/teamMemPaths.ts`

### 6. Permission runtime and defense in depth

**Why:** This is the strongest missing counterpart to reference chapter 10.

**Target claim:** User trust in Claude Code comes from layered runtime enforcement spanning permission modes, rule matching, shell-specific checks, tool-specific checks, and approval UX.

**Source anchors:**

- `ref_repo/claude-code/src/utils/permissions/*`
- `ref_repo/claude-code/src/hooks/toolPermission/*`
- `ref_repo/claude-code/src/components/permissions/*`
- `ref_repo/claude-code/src/tools/BashTool/*`

### 7. Terminal product shell

**Why:** This is the strongest missing counterpart to reference chapter 11.

**Target claim:** Claude Code’s terminal UX is a systems component that turns autonomous behavior into observable, interruptible, trustable product behavior.

**Source anchors:**

- `ref_repo/claude-code/src/components/App.tsx`
- `ref_repo/claude-code/src/ink/components/App.tsx`
- `ref_repo/claude-code/src/state/AppState.tsx`
- `ref_repo/claude-code/src/state/onChangeAppState.ts`
- `ref_repo/claude-code/src/components/tasks/taskStatusUtils.tsx`
- `ref_repo/claude-code/src/commands/*`

### 8. Minimal vs production agent

**Why:** This is the best way to translate reference chapter 12 into relearn’s builder-focused teaching lane.

**Target claim:** The fastest way to understand Claude Code is to separate the minimal irreducible agent loop from the production shell layered around it.

**Source anchors:**

- `ref_repo/claude-code/src/QueryEngine.ts`
- `ref_repo/claude-code/src/query.ts`
- `ref_repo/claude-code/src/context.ts`
- `ref_repo/claude-code/src/Tool.ts`
- `ref_repo/claude-code/src/tools.ts`
- `ref_repo/claude-code/src/components/App.tsx`
- `ref_repo/claude-code/src/ink/components/App.tsx`

---

## 5) Suggested authoring order

This is the authoring order that best follows the crosswalk while staying close to the strongest current research.

1. **Tool contract and capability gating**
   - best bridge from current tool pages to deeper chapter style
2. **Agent runtime boundaries**
   - most obvious under-covered area in the current site
3. **Permission runtime and defense in depth**
   - should be written near the tool contract article
4. **Terminal product shell**
   - complements orchestration and permission visibility
5. **Code editing strategy**
   - gives the coding-agent-specific action story its own page
6. **Memory types and recall**
   - clarifies a currently mixed topic cluster
7. **Hooks and extension boundaries**
   - improves the extensibility story after core runtime boundaries are clear
8. **Minimal vs production agent**
   - works best as a synthesis article after the deeper system pages exist

---

## Top recommendations

### Recommendation 1
Use `how-claude-code-works` mainly as a **chapter-depth benchmark**, not just a topic checklist.
The current site already has enough topics; it needs stronger thesis-driven articles.

### Recommendation 2
Prioritize chapters where current relearn coverage is structurally weakest:

- orchestration
- terminal UX
- editing strategy
- extension boundaries
- defense-in-depth permissions

### Recommendation 3
Do not let future rewrites collapse multiple concepts back into one overview page.
The most important split decisions are:

- memory **vs** multi-agent
- commands/product shell **vs** extension surfaces
- tool contract/capability plane **vs** permission runtime

### Recommendation 4
Treat the top 8 future pages above as the **crosswalk-derived canon expansion set**.
They are the clearest way to make relearn feel as deep and chapter-shaped as `how-claude-code-works` while staying grounded in the actual Claude Code source.
