# Tools and permissions

The tool layer is where Claude Code becomes operationally powerful — and operationally dangerous.

## The registry

`src/tools.ts` imports and registers the built-in tools. Even a partial scan shows the breadth of the platform:

- file read/write/edit,
- bash,
- grep/glob,
- MCP access,
- LSP,
- plan mode transitions,
- task and team tools,
- skill invocation,
- browser and web fetch capabilities behind flags.

The important architectural detail is that `tools.ts` is not just a flat list. It is a **tool-assembly pipeline**.

Read it as three stages:

1. `getAllBaseTools()` defines the total built-in capability surface for the current build,
2. `getTools(...)` filters that surface by mode and deny rules,
3. `assembleToolPool(...)` merges built-ins with MCP tools into the final prompt-visible pool.

That split is why the code can support feature-gated tools, permission-driven hiding, and MCP expansion without making the rest of the runtime care where each tool came from.

## The common contract

`src/Tool.ts` defines the common execution types and the shared `ToolUseContext` that threads state across tool calls.

That shared context is the reason the runtime can treat tools as a family instead of one-off hacks.

The deeper lesson from `ToolUseContext` is that tools are not dumb RPC handlers. They are allowed to participate in runtime state.

The context includes capabilities such as:

- app-state reads/writes,
- task-safe state updates (`setAppStateForTasks`),
- message injection,
- OS notifications,
- query-chain tracking,
- content-replacement state,
- conversation message access.

So a tool invocation is really:

> “run this capability inside the active runtime,” not “call an isolated helper function.”

## Runtime filtering happens before the model sees the tools

`tools.ts` does more than permission checks at call time.

It can remove tools from the available pool before prompt construction by:

- excluding deny-ruled tools,
- hiding REPL-only substitutions,
- feature-gating optional tools,
- enabling task / team / search tools only when the surrounding mode allows them.

That is a major production choice. Claude Code does not rely only on “if the model calls it, then reject it.” It also shrinks the *visible action space* up front.

This is why permissions feel more like product policy than exception handling.

## Tool pooling is also a product boundary

`assembleToolPool(...)` merges built-in tools and MCP tools, deduplicates by name, and preserves a stable built-in prefix before the MCP suffix.

That sounds like implementation trivia, but it reveals a bigger concern:

- built-in capabilities are treated as a stable product surface,
- dynamic tools are appended without destabilizing the whole prompt/tool order,
- the system wants extensibility without constantly perturbing runtime behavior.

In other words, tool ordering is partly a caching/performance concern and partly a product-contract concern.

## Ordered streaming execution

`src/services/tools/StreamingToolExecutor.ts` shows a subtle but important product decision:

- start tools quickly,
- buffer results,
- preserve ordered emission,
- abort sibling subprocesses if necessary.

This is how you get a responsive agent without turning the UI into chaos.

## Concurrency rules

`src/services/tools/toolOrchestration.ts` partitions tool calls into concurrency-safe and non-safe batches.

The mental model is simple:

- reads can often parallelize,
- writes often cannot,
- context mutations must still apply deterministically.

## Permissions

A Claude Code-style product needs permissions for more than shell commands. It needs them for any side-effectful capability.

Relevant areas include:

- `src/utils/permissions/*`
- `src/components/permissions/*`
- `src/tools/BashTool/*`

## Bash is special

Shell execution is uniquely dangerous because it can do almost anything:

- mutate files,
- access secrets,
- reach the network,
- delete data,
- spawn background processes.

That is why Claude Code uses a layered approach with parsing, semantic checks, rule matching, mode logic, and user confirmation.

## Why `bashSecurity.ts` matters

The code enumerates many shell-specific hazards, including command substitution, redirection, malformed tokens, operator confusion, zsh-specific attacks, and comment/quote desynchronization.

This is exactly the kind of engineering work that separates a trustworthy coding agent from a dangerous demo.

## Practical takeaway

If you are designing your own agent, copy the principle rather than the exact implementation:

1. Give every tool a typed schema.
2. Centralize execution context.
3. Filter the visible tool pool as well as the call-time permission path.
4. Separate concurrency policy from tool business logic.
5. Put risky validations in the runtime, not only in prompts.
