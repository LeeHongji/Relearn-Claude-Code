# Control plane and state surfaces analysis + 专题文章 rewrite plan

## Scope

This note covers the worker-2 research lane:

- settings / policy / remote-managed settings,
- app state and external metadata sync,
- settings sync + change detection,
- tool search / deferred capabilities,
- synthetic structured output.

It also answers the added editorial request: after understanding the architecture more deeply, produce the next-step plan for rewriting the current English docs into more detailed **专题文章-style** pages.

## Why this lane matters

The current teaching site already points at the right files, but the subsystem itself is bigger than a “settings page.” It is really Claude Code’s hidden control plane:

- startup decides which policy is safe to apply before trust,
- remote-managed settings can override local expectations,
- change detection keeps long-lived sessions coherent,
- `AppState` fans state into UI, headless, MCP, task, and team surfaces,
- tool search changes what the model is even allowed to *see*,
- `StructuredOutput` turns output format into an explicit runtime contract.

This is exactly the kind of production-grade agent architecture that deserves long-form teaching pages instead of short topic stubs.

## Source-grounded findings

### 1. Startup is already policy bootstrap, not only initialization

Primary anchors:

- `src/entrypoints/init.ts`
- `src/cli/print.ts`

What matters:

- `init.ts` applies **safe** config environment variables early, before trust-sensitive work.
- It initializes remote-managed settings and policy-limit loading promises early so downstream systems can wait safely.
- It configures CA certs, mTLS, proxy agents, cleanup hooks, scratchpad, and LSP shutdown in the same boot phase.
- `print.ts` later waits on remote-managed settings in paths that need them.

Teaching implication:

> Claude Code startup is a control-plane boot sequence. Readers should learn that the runtime is establishing policy, transport, cleanup, and state guarantees before the first real turn.

### 2. Remote-managed settings behave like an enterprise policy service

Primary anchors:

- `src/services/remoteManagedSettings/index.ts`
- `src/services/remoteManagedSettings/securityCheck.tsx`
- `src/services/remoteManagedSettings/syncCacheState.ts`

What matters:

- eligibility depends on auth mode and account type,
- the service creates a loading promise with a timeout to avoid deadlocks,
- checksums are normalized to match server-side hashing,
- fetching uses retry/backoff and fail-open behavior,
- incoming settings pass through security checks,
- successful application triggers hot reload through `settingsChangeDetector.notifyChange('policySettings')`,
- background polling keeps policy current mid-session.

Teaching implication:

> “Remote settings” is not a config fetch. It is a managed-policy pipeline with auth, cache validation, safety review, reload semantics, and background maintenance.

### 3. Change detection is a coherence subsystem, not a watcher helper

Primary anchors:

- `src/utils/settings/changeDetector.ts`
- `src/utils/settings/internalWrites.ts`
- `src/utils/settings/mdm/settings.ts`

What matters:

- file watching uses write-stability thresholds,
- internal-write suppression avoids self-triggered loops,
- deletion grace windows handle delete/recreate update patterns,
- MDM changes are polled because they are not normal file events,
- `fanOut()` resets the settings cache once before notifying subscribers.

This is especially important because the code explicitly avoids every listener clearing cache independently.

Teaching implication:

> Change detection is about ordering, cache behavior, and loop prevention. The interesting question is not “how do we watch a file?” but “how do we refresh the runtime once, in the right order, without thrash?”

### 4. `AppState` is a shared operational fabric, not only UI state

Primary anchors:

- `src/state/AppStateStore.ts`
- `src/state/AppState.tsx`
- `src/state/onChangeAppState.ts`

What matters:

`AppState` carries far more than presentation data. It holds or coordinates:

- settings,
- permission mode,
- tasks and teammate view state,
- MCP clients/tools/resources,
- plugin state and refresh signals,
- team context + inbox,
- remote bridge state,
- prompt suggestion / speculation state,
- sandbox and worker permission queues.

`AppStateProvider` subscribes to settings changes and routes them through `applySettingsChange()`. `onChangeAppState.ts` then bridges important state changes outward, especially permission-mode sync to CCR / SDK metadata and environment-variable reapplication.

Teaching implication:

> The “app state” page should be reframed as a control-surface page. Claude Code uses one state fabric to connect UI, headless mode, bridge sync, tasks, MCP, plugins, and live settings.

### 5. Settings sync is intentionally split from change broadcast

Primary anchors:

- `src/services/settingsSync/index.ts`
- `src/cli/print.ts`

What matters:

- startup download is cached and shared across callers,
- `redownloadUserSettings()` is a one-shot user-triggered refresh path,
- applying remote entries marks internal writes and resets caches,
- the caller is responsible for firing `notifyChange()` after successful mid-session refresh.

That separation is subtle but important: write/apply and notify/broadcast are related, but not identical responsibilities.

Teaching implication:

> A good article should explain why startup sync, user refresh, and downstream notification are separated. Otherwise readers miss the cycle-avoidance design.

### 6. Tool search is a prompt-budget and compatibility policy layer

Primary anchors:

- `src/utils/toolSearch.ts`
- `src/tools/ToolSearchTool/ToolSearchTool.ts`
- `src/services/api/claude.ts`

What matters:

- `ENABLE_TOOL_SEARCH` supports multiple modes (`tst`, `tst-auto`, `standard`),
- auto mode uses context-window thresholds,
- model compatibility is checked because some models do not support `tool_reference`,
- proxy / first-party API behavior affects whether deferred loading is safe,
- the API layer adds beta headers and emits `defer_loading` only when conditions hold,
- `ToolSearchTool` is both a search surface and a direct-selection surface.

Teaching implication:

> Tool search is not “extra UX.” It is capability governance under token-budget, model-compatibility, and API-contract constraints.

### 7. `StructuredOutput` is a synthetic tool that hardens output contracts

Primary anchors:

- `src/tools/SyntheticOutputTool/SyntheticOutputTool.ts`
- `src/cli/print.ts`

What matters:

- the tool is enabled for non-interactive structured output paths,
- the runtime can synthesize a schema-specific tool via AJV,
- invalid output becomes a runtime schema mismatch, not merely a prompt-formatting failure,
- the result returns `structured_output` as a first-class machine-usable payload.

Teaching implication:

> This deserves its own focused article. It teaches a strong design lesson: when you need reliable machine output, make the format part of the tool contract instead of hoping prose obeys instructions.

## Editorial implications for the site

### Current content is directionally right but still too thin

Quick inventory of the current English docs:

- **39** markdown pages total.
- **32 / 39** are at or below roughly **400 words**.
- Every current English page is below roughly **700 words**.

That is fine for a first pass, but too thin for the “detailed 专题文章” goal.

### What should change

1. Keep English as the canonical writing lane.
2. Rewrite the current pages into longer, narrative, source-grounded articles.
3. Split overloaded subsystems into focused articles where one page currently hides multiple design seams.
4. Delay Chinese rewrites until the English structure stabilizes.
5. Treat maintainer/reference pages separately from learner-facing deep dives, but still rewrite them in the same more detailed style.

## Rewrite rules for the next phase

- **Rewrite before translate.** Chinese mirrors should follow the new English information architecture.
- **One page = one argument.** If a page currently hides 3-4 architectural seams, split it.
- **Lead with the system question.** Example: not “settings sync,” but “how does a live runtime stay coherent while config changes under it?”
- **Use source anchors as evidence, not decoration.** Each article should name the concrete files that justify its claims.
- **Prefer article titles that promise an insight.** “The Hidden Control Plane” is stronger than “Settings and Remote Policy.”

## Page-by-page rewrite plan for current English pages

Priority legend:

- **P0** = first rewrite wave, core teaching spine
- **P1** = second wave, expands depth around the spine
- **P2** = later wave, support / maintainer / practice content

### Start here

| Priority | Current page | Rewrite target title | Action |
| --- | --- | --- | --- |
| P0 | `docs/index.md` | **Claude Code, Relearned: the shortest serious path to understanding a coding agent** | Rewrite |
| P0 | `docs/learning-path.md` | **How to study Claude Code without getting lost** | Rewrite |

### Foundations

| Priority | Current page | Rewrite target title | Action |
| --- | --- | --- | --- |
| P1 | `docs/foundations/what-is-an-agent.md` | **What an AI coding agent actually is** | Rewrite |
| P1 | `docs/foundations/agent-loop.md` | **The agent loop: observe, decide, act, repair** | Rewrite |
| P1 | `docs/foundations/context-memory.md` | **Context is a system, not a prompt** | Rewrite |
| P1 | `docs/foundations/tools-safety.md` | **Why tools need contracts, permissions, and sandboxes** | Rewrite |

### Claude Code deep dive

| Priority | Current page | Rewrite target title | Action |
| --- | --- | --- | --- |
| P0 | `docs/claude-code/architecture.md` | **Claude Code architecture: the fastest accurate mental model** | Rewrite |
| P0 | `docs/claude-code/repo-map.md` | **Reading the Claude Code repo without drowning** | Rewrite |
| P0 | `docs/claude-code/runtime-loop.md` | **From startup to turn execution: Claude Code’s runtime loop** | Rewrite |
| P1 | `docs/claude-code/context-engineering.md` | **Context engineering in Claude Code: how the runtime decides what the model sees** | Rewrite |
| P0 | `docs/claude-code/tools-and-permissions.md` | **Tool contracts, permissions, and shell risk in Claude Code** | Rewrite |
| P1 | `docs/claude-code/mcp-and-external-tools.md` | **MCP, external servers, and open-world tool surfaces** | Rewrite |
| P1 | `docs/claude-code/skills-and-prompt-loading.md` | **How skills, prompts, and role surfaces are loaded** | Rewrite |
| P1 | `docs/claude-code/plugins-and-extension-surfaces.md` | **Plugin lifecycle, extension boundaries, and failure surfaces** | Rewrite |
| P1 | `docs/claude-code/tasks-and-orchestration.md` | **Background tasks, workflows, and orchestration state** | Rewrite |
| P2 | `docs/claude-code/ink-and-terminal-ui.md` | **Ink, REPL rendering, and why the terminal is a UI runtime** | Rewrite |
| P0 | `docs/claude-code/settings-and-remote-policy.md` | **The hidden control plane: safe startup, remote settings, and enterprise policy** | Rewrite |
| P1 | `docs/claude-code/lsp-and-editor-feedback.md` | **LSP, diagnostics, and asynchronous editor feedback** | Rewrite |
| P0 | `docs/claude-code/settings-sync-and-live-refresh.md` | **Settings sync, live refresh, and mid-session reconfiguration** | Rewrite |
| P0 | `docs/claude-code/tool-search-and-deferred-capabilities.md` | **Deferred capabilities: tool search, prompt budget, and structured output** | Rewrite |
| P1 | `docs/claude-code/session-transcripts-and-team-memory.md` | **Session logs, team memory, and sync discipline** | Rewrite |
| P2 | `docs/claude-code/overflow-recovery-and-reactive-compact.md` | **What happens when context overflows** | Rewrite |
| P1 | `docs/claude-code/commands-ui-extensions.md` | **Commands, menus, slash interfaces, and product extension surfaces** | Rewrite |
| P1 | `docs/claude-code/memory-and-multi-agent.md` | **Memory, roles, and multi-agent boundaries** | Rewrite |
| P2 | `docs/claude-code/building-your-own.md` | **What to steal from Claude Code when building your own runtime** | Rewrite |

### Source tours

| Priority | Current page | Rewrite target title | Action |
| --- | --- | --- | --- |
| P1 | `docs/source-tours/index.md` | **How to use these source tours** | Rewrite |
| P1 | `docs/source-tours/startup-to-turn.md` | **Source tour: startup to first turn** | Rewrite |
| P1 | `docs/source-tours/tools-permission-tour.md` | **Source tour: tool execution and permission decisions** | Rewrite |
| P1 | `docs/source-tours/context-memory-tour.md` | **Source tour: context assembly and memory flow** | Rewrite |
| P1 | `docs/source-tours/commands-ui-tour.md` | **Source tour: commands, panels, and UI surfaces** | Rewrite |

### Labs

| Priority | Current page | Rewrite target title | Action |
| --- | --- | --- | --- |
| P2 | `docs/labs/index.md` | **Hands-on labs: rebuild the ideas, not just the features** | Rewrite |
| P2 | `docs/labs/add-a-tool.md` | **Lab: add a tool with contracts, permissions, and prompt wiring** | Rewrite |
| P2 | `docs/labs/compact-context.md` | **Lab: build a compaction path that does not break the agent** | Rewrite |
| P2 | `docs/labs/multi-agent-readiness.md` | **Lab: make a single-agent runtime multi-agent ready** | Rewrite |

### Appendix and maintainer pages

| Priority | Current page | Rewrite target title | Action |
| --- | --- | --- | --- |
| P0 | `docs/appendix/source-atlas.md` | **Source atlas: where each Claude Code subsystem lives** | Rewrite |
| P2 | `docs/appendix/glossary.md` | **Glossary: the terms you need before the deep dive** | Rewrite |
| P2 | `docs/reference-analysis.md` | **Why these three reference repos work together** | Rewrite |
| P2 | `docs/site-information-architecture.md` | **Designing the teaching architecture of this site** | Rewrite |
| P2 | `docs/publishing.md` | **How this site is verified, built, and published** | Rewrite |

## New pages that should be added

These are the highest-value additions exposed by this research lane.

| Priority | Proposed path | Target title | Why it should exist |
| --- | --- | --- | --- |
| P0 | `docs/claude-code/startup-control-plane.md` | **Startup as control plane: trust, transport, cleanup, and policy boot** | The current architecture/runtime pages mention startup, but this deserves a dedicated article. |
| P0 | `docs/claude-code/remote-managed-settings-lifecycle.md` | **Remote-managed settings lifecycle: eligibility, fetch, checksum, security, poll** | The current settings page compresses too many enterprise-policy ideas into one stub. |
| P0 | `docs/claude-code/settings-change-detection.md` | **How Claude Code notices settings changes without thrashing itself** | `changeDetector.ts` is rich enough to teach cache invalidation, internal-write suppression, and deletion grace. |
| P0 | `docs/claude-code/app-state-control-surface.md` | **AppState as control surface: UI, MCP, tasks, teams, and bridge state** | Current docs mention state indirectly; this needs a first-class systems page. |
| P1 | `docs/claude-code/settings-sync-paths.md` | **Settings sync paths: startup download, user refresh, and notify semantics** | Splits sync semantics from policy semantics. |
| P1 | `docs/claude-code/bridge-metadata-and-mode-sync.md` | **Bridge metadata and permission-mode sync across CLI, SDK, and CCR** | `onChangeAppState.ts` reveals an important external-state contract that is currently buried. |
| P0 | `docs/claude-code/structured-output-contracts.md` | **Structured output as a tool contract, not a prompt wish** | `SyntheticOutputTool` is one of the best teachable patterns in the codebase. |
| P1 | `docs/claude-code/tool-search-budgeting.md` | **Tool search as context budgeting and API compatibility policy** | Lets the site split tool search from structured output instead of forcing both into one page. |
| P1 | `docs/source-tours/control-plane-tour.md` | **Source tour: the hidden control plane** | Gives readers a guided read across `init.ts`, remote settings, change detection, and AppState hooks. |
| P1 | `docs/appendix/state-surfaces-map.md` | **State surfaces map: settings, AppState, bridge metadata, and external sync** | A reference page that ties together the subsystem maps introduced above. |

## Recommended execution order

1. **P0 rewrite wave**
   - home / learning path,
   - architecture / repo map / runtime loop,
   - tools and permissions,
   - settings + sync + tool search,
   - source atlas.
2. **P0 new-page wave**
   - startup control plane,
   - remote-managed settings lifecycle,
   - settings change detection,
   - AppState as control surface,
   - structured output contracts.
3. **P1 expansion wave**
   - foundations,
   - MCP / plugins / tasks / memory / source tours,
   - bridge metadata + tool search budgeting.
4. **P2 support wave**
   - labs,
   - maintainer pages,
   - glossary polishing,
   - English-first stabilization before Chinese mirrors.

## Bottom line

The deeper architecture read confirms that Claude Code’s most interesting lessons are not only in the agent loop or tools. They are in the hidden control plane that keeps policy, state, sync, and capability exposure coherent during a live session.

That means the next version of the site should not merely “expand the settings pages.” It should explicitly teach:

- startup as policy boot,
- remote settings as enterprise control plane,
- change detection as coherence engineering,
- AppState as shared operational fabric,
- tool search as budgeted capability governance,
- structured output as a runtime contract.
