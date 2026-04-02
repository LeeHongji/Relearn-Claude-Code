# MCP and external tools

Claude Code is not limited to built-in file and shell tools. A large part of its power comes from how it connects to **external capability surfaces**.

## Why this subsystem matters

Once a coding agent can reach external tools and resources, it stops being “a local automation helper” and becomes a programmable integration platform.

In the source, the MCP-related surface spans files such as:

- `src/services/mcp/client.ts`
- `src/services/mcp/MCPConnectionManager.tsx`
- `src/services/mcp/config.ts`
- `src/services/mcp/types.ts`
- `src/services/mcp/officialRegistry.ts`
- `src/services/mcp/useManageMCPConnections.ts`

## Mental model

Think of MCP as a standardized bridge between:

1. the model/runtime,
2. external tools/resources,
3. connection/auth/config management.

## What to look for in the code

### `client.ts`

This is where you should expect runtime-facing MCP operations such as enumeration, invocation, and resource access.

### `MCPConnectionManager.tsx`

This file matters because real integrations are partly UX problems: connection state, failures, recovery, and user trust.

### `config.ts` and `types.ts`

These are the contract files: configuration shape, normalization rules, and data structures the runtime depends on.

### `officialRegistry.ts`

A productized ecosystem needs some notion of discoverability and trusted defaults, not just arbitrary local config.

## A simple architecture sketch

```mermaid
flowchart LR
  model[Model output] --> runtime[Claude Code runtime]
  runtime --> registry[MCP config / registry]
  registry --> conn[Connection manager]
  conn --> server[MCP server]
  server --> tools[External tools/resources]
  tools --> runtime
```

## Compare with the smaller system

`claude-code-from-scratch` keeps tools local and direct. Claude Code adds MCP because a serious agent needs extensibility, interoperability, and resource lookup beyond the local repo.
