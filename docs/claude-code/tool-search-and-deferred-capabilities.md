# Tool search and deferred capabilities

Claude Code’s tool system is not only “here is a fixed registry.” The source shows a more advanced idea: tools and capabilities can be discovered, deferred, and surfaced progressively.

## Relevant source areas

- `src/utils/toolSearch.ts`
- `src/tools/ToolSearchTool/ToolSearchTool.ts`
- `src/services/api/claude.ts`
- `src/utils/messages.ts`
- `src/utils/attachments.ts`
- `src/tools/SyntheticOutputTool/SyntheticOutputTool.ts`

## Why this subsystem matters

A large agent platform eventually runs into two problems:

1. too many tools to expose naively all at once,
2. structured output needs that are more precise than plain text.

Claude Code appears to address both with tool-search-aware behavior and a synthetic-output tool path.

## What the source teaches

### Tool search

`utils/toolSearch.ts` and `ToolSearchTool.ts` suggest a runtime that can reveal or reference capabilities more dynamically than a static always-on registry.

### API coupling

`services/api/claude.ts` includes tool-search-related header/beta handling, which is a reminder that capability discovery can affect the API contract itself.

### Message and attachment flow

`utils/messages.ts` and `utils/attachments.ts` matter because discovered/deferred capabilities still need to be represented coherently in what the model sees and what the user sees.

### Synthetic output

`SyntheticOutputTool.ts` is a useful teaching example because it shows that sometimes the runtime adds a structured-output surface as a tool, rather than expecting the model to format everything perfectly by prompt alone.

## Main design lesson

For beginners:

> Not every capability has to be fully visible all the time. Large agent platforms need discovery strategies.

For advanced readers:

> Tool search and synthetic output show that capability design is partly an API-shaping problem, not just a prompt or registry problem.
