# Claude Code architecture rewrite roadmap

This document is a **maintainer roadmap** for turning the current Claude Code section from a set of compact survey pages into a set of deeper, chapter-like **专题文章** pages.

It is based on three inputs:

1. the current docs in `docs/claude-code/`,
2. the primary source repo in `../ref_repo/claude-code`,
3. the chapter depth and narrative shape in `../ref_repo/how-claude-code-works/docs/`.

The goal is **not** to rewrite everything at once. The goal is to sequence the work so the site first gains a deeper explanation of the core system, then expands outward into specialized subsystems.

## Scope of this roadmap

This roadmap covers the current English Claude Code deep-dive pages under `docs/claude-code/`.

It does **not** yet rewrite:

- `docs/foundations/*`
- `docs/source-tours/*`
- `docs/labs/*`
- `docs/zh/*`

Chinese pages should follow only **after** the English architecture articles stabilize.

## Editorial quality bar

The quality bar should move from the current **survey-page** style to a more chapter-like **teaching + source-grounded** style.

Use `how-claude-code-works` as the quality bar for:

- explicit chapter framing,
- subsystem-first structure,
- clear stage-by-stage flow explanation,
- concrete source anchors,
- design tradeoff callouts,
- explanation of why a boundary exists, not just where the files live.

Do **not** copy its tone or structure blindly. This site should stay English-first, more concise, and more maintainable. But each important page should feel closer to a real chapter than to a quick repo note.

## Current problem statement

The current `docs/claude-code/*.md` set gives good breadth, but most pages are still too short for the teaching job:

- many pages are roughly **125–350 words**,
- only a few exceed **550–660 words**,
- several pages compress multiple subsystems into one page,
- some pages name source areas without fully explaining the runtime boundary or design rationale.

That is acceptable for orientation, but not sufficient for a durable architecture curriculum.

## Rewrite strategy in one sentence

**Deepen the runtime spine and control plane first, then split broad survey pages into narrower topic articles, then backfill specialized subsystems.**

## Priority ladder

### Priority 0 — must deepen first

These pages define the reader's mental model of the system. Rewrite them before widening the catalog.

1. `architecture.md`
2. `runtime-loop.md`
3. `tools-and-permissions.md`
4. `settings-and-remote-policy.md`
5. `settings-sync-and-live-refresh.md`

### Priority 1 — next major deepening wave

These pages explain the subsystems that make Claude Code production-grade rather than merely functional.

1. `context-engineering.md`
2. `tool-search-and-deferred-capabilities.md`
3. `session-transcripts-and-team-memory.md`
4. `tasks-and-orchestration.md`
5. `commands-ui-extensions.md`
6. `memory-and-multi-agent.md`

### Priority 2 — split broad surfaces into dedicated专题 articles

These should usually become **new pages**, not just longer versions of the existing survey pages.

1. startup architecture
2. code editing strategy
3. hooks and extensibility
4. permission and security design
5. user experience / terminal UI design
6. minimal components / minimal-to-production bridge
7. multi-agent architecture
8. memory system
9. skills system

### Priority 3 — cleanup and curriculum alignment

After the main rewrites land:

- adjust sidebar ordering,
- re-sequence `learning-path.md`,
- add links from survey pages to deeper chapters,
- mirror stable pages into `docs/zh/`.

## Page-by-page conversion plan

The table below covers **every current page in `docs/claude-code/`** and states whether it should be rewritten, split, replaced, or kept mostly as-is.

| Current page | Current role | Decision | Priority | Target outcome |
| --- | --- | --- | --- | --- |
| `architecture.md` | top-level survey | **rewrite + deepen** | P0 | Become the authoritative overview of the four-plane architecture and how readers should navigate the codebase |
| `runtime-loop.md` | short loop summary | **rewrite + deepen** | P0 | Become the runtime-spine chapter centered on `QueryEngine.ts` and `query.ts` |
| `tools-and-permissions.md` | tool + safety survey | **rewrite + split later** | P0 | First deepen this page, then later split security-heavy material into a dedicated permission/security chapter |
| `settings-and-remote-policy.md` | control-plane survey | **rewrite + coordinate with sync page** | P0 | Explain remote-managed settings, policy limits, and initialization-time control flow |
| `settings-sync-and-live-refresh.md` | sync/change-detection survey | **rewrite + coordinate with settings page** | P0 | Explain live refresh, change detection, and app-state propagation |
| `context-engineering.md` | compact overview | **rewrite + deepen** | P1 | Become a real context-engineering chapter with budgets, prompt composition, memory loading, and compaction tiers |
| `tool-search-and-deferred-capabilities.md` | advanced subsystem note | **rewrite + deepen** | P1 | Explain deferred capability discovery as a product/runtime boundary |
| `session-transcripts-and-team-memory.md` | advanced subsystem note | **rewrite + deepen** | P1 | Explain transcript persistence, summaries, team memory sync, and secrecy boundaries |
| `tasks-and-orchestration.md` | placeholder-level page | **rewrite + widen** | P1 | Explain task abstraction, background work, UI/runtime seams, and orchestration surfaces |
| `commands-ui-extensions.md` | merged survey | **split + replace** | P1 | Replace with narrower pages for commands/product surfaces and extension surfaces |
| `memory-and-multi-agent.md` | merged survey | **split + replace** | P1 | Replace with separate memory-system and multi-agent-architecture pages |
| `mcp-and-external-tools.md` | focused subsystem page | **rewrite + deepen** | P2 | Tie MCP integration to the wider tool system and external capability boundary |
| `skills-and-prompt-loading.md` | short subsystem note | **split + replace** | P2 | Replace with a dedicated skills-system page and a lighter prompt-loading subsection elsewhere |
| `plugins-and-extension-surfaces.md` | short subsystem note | **merge + deepen** | P2 | Merge into a broader hooks/plugins/extensions architecture page |
| `ink-and-terminal-ui.md` | short subsystem note | **split + replace** | P2 | Replace with a user-experience / terminal UI chapter |
| `overflow-recovery-and-reactive-compact.md` | focused advanced page | **rewrite + keep** | P2 | Keep as a dedicated advanced chapter after the context/runtime chapters deepen |
| `lsp-and-editor-feedback.md` | focused advanced page | **rewrite + keep** | P2 | Keep as a dedicated product-integrations chapter |
| `repo-map.md` | navigation aid | **light rewrite** | P3 | Keep as a fast navigation page, but align links to the new chapter structure |
| `building-your-own.md` | builder bridge | **light rewrite** | P3 | Update once the new chapter set exists so it points to the right deep-dive sequence |

## Target future article set

The current catalog should evolve toward the following deeper article set.

### Core architecture sequence

1. **Claude Code Architecture: Boot, Runtime, Tool Plane, Product Plane**
2. **Startup Architecture: From `main.tsx` to Initialized Session**
3. **The Runtime Spine: `QueryEngine`, `query()`, Streaming, and Continue Sites**
4. **Context Engineering: Prompt Assembly, Budgets, and Compaction Tiers**
5. **Tool System and Permission Pipeline**
6. **Control Plane: Settings, Remote Policy, and Live Refresh**

### Product and orchestration sequence

7. **Tasks and Orchestration: Background Work, State Surfaces, and UI Seams**
8. **Commands and Product Surfaces**
9. **MCP and External Capability Boundaries**
10. **Hooks, Plugins, and Extension Surfaces**
11. **User Experience Design: Ink, Streaming UI, and Terminal Ergonomics**
12. **LSP and Editor Feedback**

### Advanced systems sequence

13. **Overflow Recovery and Reactive Compact**
14. **Tool Search and Deferred Capabilities**
15. **Session Transcripts, Summaries, and Team Memory**
16. **Memory System Architecture**
17. **Multi-Agent Architecture**
18. **Skills System and Prompt Loading**
19. **Code Editing Strategy**
20. **Permission and Security Design**
21. **Minimal Components: What the Smallest Useful Coding Agent Needs**
22. **Build Your Own Claude-Code-Like Agent**

## Recommended chapter order for publication

The publication order should follow dependency of understanding, not merely current filename order.

### Wave 1 — establish the mental model

1. Architecture
2. Startup Architecture
3. Runtime Spine
4. Tool System and Permission Pipeline
5. Context Engineering
6. Control Plane

### Wave 2 — explain production surfaces

7. Tasks and Orchestration
8. Commands and Product Surfaces
9. User Experience Design
10. MCP and External Capability Boundaries
11. Hooks, Plugins, and Extension Surfaces
12. LSP and Editor Feedback

### Wave 3 — explain scaling mechanisms

13. Overflow Recovery and Reactive Compact
14. Tool Search and Deferred Capabilities
15. Session Transcripts, Summaries, and Team Memory
16. Memory System Architecture
17. Skills System and Prompt Loading
18. Multi-Agent Architecture

### Wave 4 — bridge to builders

19. Code Editing Strategy
20. Permission and Security Design
21. Minimal Components
22. Build Your Own Claude-Code-Like Agent

## Detailed article briefs

This section gives each future article a **target title**, the **main source anchors**, and the **editorial goal**.

### 1. Claude Code Architecture: Boot, Runtime, Tool Plane, Product Plane

**Primary anchors**
- `src/main.tsx`
- `src/entrypoints/init.ts`
- `src/QueryEngine.ts`
- `src/query.ts`
- `src/Tool.ts`
- `src/tools.ts`

**Editorial goal**
- give the 30-minute map,
- define the four-plane architecture,
- explain which later chapters own which depth.

### 2. Startup Architecture: From `main.tsx` to Initialized Session

**Primary anchors**
- `src/main.tsx`
- `src/entrypoints/init.ts`
- startup-related helpers loaded by `init.ts`

**Editorial goal**
- explain boot-time parallelism,
- show mode selection and session shaping,
- cover remote settings wait points, early env mutation, and initialization ordering.

### 3. The Runtime Spine: `QueryEngine`, `query()`, Streaming, and Continue Sites

**Primary anchors**
- `src/QueryEngine.ts`
- `src/query.ts`
- `src/services/tools/StreamingToolExecutor.ts`
- `src/services/tools/toolOrchestration.ts`

**Editorial goal**
- explain the double-layer generator architecture,
- separate session lifecycle from single-query looping,
- teach why continue sites and recovery loops matter.

### 4. Context Engineering: Prompt Assembly, Budgets, and Compaction Tiers

**Primary anchors**
- `src/context.ts`
- `src/context/*`
- `src/memdir/*`
- `src/services/compact/autoCompact.ts`
- `src/services/compact/compact.ts`
- reactive/snip/context-collapse modules referenced by `query.ts`

**Editorial goal**
- explain prompt composition and memory inclusion,
- show why compaction is layered,
- relate token budgets to runtime behavior.

### 5. Tool System and Permission Pipeline

**Primary anchors**
- `src/Tool.ts`
- `src/tools.ts`
- `src/constants/tools.ts`
- `src/tools/*`
- permission helpers under `src/utils/permissions/*`
- bash safety helpers under `src/utils/bash/*`

**Editorial goal**
- show the unified tool contract,
- explain registry assembly and tool pool shaping,
- walk through permission checks, concurrency decisions, and execution flow.

### 6. Control Plane: Settings, Remote Policy, and Live Refresh

**Primary anchors**
- `src/entrypoints/init.ts`
- settings / sync / change-detection modules referenced by current settings pages
- app-state surfaces that propagate settings changes

**Editorial goal**
- explain how policy and settings shape the runtime before and during a session,
- connect remote-managed settings to live app-state updates.

### 7. Tasks and Orchestration: Background Work, State Surfaces, and UI Seams

**Primary anchors**
- `src/tasks*`
- `src/utils/tasks*`
- `src/components/tasks/*`
- task/orchestration surfaces referenced from runtime and tool code

**Editorial goal**
- explain why long-running work becomes a first-class product object,
- connect runtime task state to visible UI state.

### 8. Commands and Product Surfaces

**Primary anchors**
- `src/commands.ts`
- `src/commands/*`
- command-related UI/rendering surfaces in `src/components/*`

**Editorial goal**
- distinguish slash commands, product features, and runtime core,
- explain what belongs in command land rather than in the agent loop.

### 9. MCP and External Capability Boundaries

**Primary anchors**
- `src/services/mcp/*`
- MCP-aware tool assembly paths
- external tool integration points in runtime state

**Editorial goal**
- explain how external capabilities enter the system without rewriting the main loop,
- connect MCP to capability discovery, permissions, and product trust boundaries.

### 10. Hooks, Plugins, and Extension Surfaces

**Primary anchors**
- hook-related modules
- plugin loading surfaces
- extension points touched by `init.ts`, tools, and runtime services

**Editorial goal**
- explain extension lifecycle,
- separate hooks from skills, plugins, and MCP,
- show where the system is intentionally open and where it stays closed.

### 11. User Experience Design: Ink, Streaming UI, and Terminal Ergonomics

**Primary anchors**
- `src/components/*`
- `src/ink/*`
- keybindings / terminal rendering surfaces

**Editorial goal**
- explain how a coding agent becomes a product,
- cover streaming UI, approvals, progress surfaces, and terminal-specific interaction design.

### 12. LSP and Editor Feedback

**Primary anchors**
- LSP client/registry modules
- passive feedback and diagnostic surfaces

**Editorial goal**
- explain passive versus active editor integration,
- show why diagnostics belong to the product layer rather than the core loop.

### 13. Overflow Recovery and Reactive Compact

**Primary anchors**
- `src/query.ts`
- compact / reactive compact helpers

**Editorial goal**
- explain why prompt-too-long recovery is a runtime design problem,
- document proactive vs reactive compaction paths.

### 14. Tool Search and Deferred Capabilities

**Primary anchors**
- tool search modules
- synthetic output tool surfaces
- capability discovery helpers

**Editorial goal**
- explain why not all tools should be eagerly exposed,
- connect token budget, discoverability, and UX.

### 15. Session Transcripts, Summaries, and Team Memory

**Primary anchors**
- transcript persistence modules
- summary generation modules
- team memory sync / secret-guard surfaces

**Editorial goal**
- explain durable history, summarization, collaboration state, and secrecy boundaries.

### 16. Memory System Architecture

**Primary anchors**
- memory loading / retrieval surfaces
- memdir and memory prompt assembly logic

**Editorial goal**
- split "memory" from the overloaded multi-agent page,
- explain memory types, loading order, freshness, and recall policy.

### 17. Multi-Agent Architecture

**Primary anchors**
- agent-related tools and orchestration code
- team / swarm / coordinator surfaces

**Editorial goal**
- separate child-agent execution from team orchestration,
- explain product boundaries, role assignment, and result handoff.

### 18. Skills System and Prompt Loading

**Primary anchors**
- `src/skills/*`
- prompt loading / skill search paths

**Editorial goal**
- explain how reusable workflows are loaded, discovered, and preserved across compaction,
- treat skills as a first-class behavior surface rather than a minor add-on.

### 19. Code Editing Strategy

**Primary anchors**
- file edit / file write / notebook edit tools
- diff rendering and edit-coordination helpers

**Editorial goal**
- explain why editing is not "just write a file",
- compare search-and-replace, full rewrite, notebook editing, and multi-file coordination.

### 20. Permission and Security Design

**Primary anchors**
- permission rules
- bash security helpers
- sandbox / path-boundary / environment-variable protections

**Editorial goal**
- pull the deepest security material out of the broader tools page,
- explain layered defense and its product implications.

### 21. Minimal Components: What the Smallest Useful Coding Agent Needs

**Primary anchors**
- `../ref_repo/claude-code-from-scratch`
- selected minimal slices from `../ref_repo/claude-code`

**Editorial goal**
- bridge the big production system back to the smallest teachable system,
- help readers rebuild the core ideas themselves.

### 22. Build Your Own Claude-Code-Like Agent

**Primary anchors**
- `docs/claude-code/building-your-own.md`
- minimal + production comparison artifacts already in this repo

**Editorial goal**
- convert the existing bridge page into a capstone page that points back to the new chapter set.

## Rewrite patterns to use repeatedly

Each rewritten专题 article should usually contain the following sections:

1. **Why this subsystem matters**
2. **Mental model / architecture sketch**
3. **Primary source anchors**
4. **Control flow or lifecycle walkthrough**
5. **Key design boundaries / tradeoffs**
6. **Failure or recovery behavior**
7. **What builders should learn from it**

This structure is close enough to the chapter style in `how-claude-code-works` to raise quality, while staying consistent with this site's English editorial voice.

## What should remain concise

Not every page should become a 3,000-word chapter.

Keep these concise even after the roadmap lands:

- `repo-map.md`
- `building-your-own.md` (as a capstone/bridge, not a full subsystem chapter)
- atlas / glossary pages

The deep articles should hold the detail; navigation pages should stay fast.

## Concrete implementation order inside this repo

If this roadmap is executed incrementally, use this order:

1. add the roadmap document,
2. rewrite `architecture.md`,
3. add `startup-architecture.md`,
4. rewrite `runtime-loop.md`,
5. rewrite `tools-and-permissions.md`,
6. merge/reframe the two settings pages into a control-plane sequence,
7. rewrite `context-engineering.md`,
8. rewrite `tasks-and-orchestration.md`,
9. split `commands-ui-extensions.md`,
10. split `memory-and-multi-agent.md`,
11. backfill specialized pages.

## Exit criteria for the rewrite program

The rewrite program is on track when:

- the first six core pages explain the runtime spine in chapter-level depth,
- each current broad survey page has an explicit rewrite/split/replace decision executed,
- source anchors are present in every major page,
- the chapter order in `learning-path.md` matches the new architecture sequence,
- the Chinese mirrors only begin after the English architecture pages stop moving.
