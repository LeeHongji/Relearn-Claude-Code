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

## The common contract

`src/Tool.ts` defines the common execution types and the shared `ToolUseContext` that threads state across tool calls.

That shared context is the reason the runtime can treat tools as a family instead of one-off hacks.

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
3. Separate concurrency policy from tool business logic.
4. Put risky validations in the runtime, not only in prompts.
