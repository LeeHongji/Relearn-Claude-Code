# LSP and editor feedback

One of the most underappreciated parts of a production coding agent is how it learns from editor-quality signals instead of only from the model and shell.

## Relevant source areas

- `src/tools/LSPTool/LSPTool.ts`
- `src/services/lsp/LSPClient.ts`
- `src/services/lsp/passiveFeedback.ts`
- `src/services/lsp/LSPDiagnosticRegistry.ts`
- `src/services/lsp/config.ts`

## Why this subsystem matters

LSP turns the agent from “text-generating assistant” into something that can reason with structured editor intelligence:

- definitions,
- references,
- symbols,
- hover info,
- diagnostics.

That matters because code understanding is not only about reading files. It is also about reading the language server’s view of the project.

## Active use vs passive feedback

Claude Code appears to use LSP in two complementary ways:

1. **active LSP tool calls** through `LSPTool`,
2. **passive diagnostic intake** through the LSP feedback pipeline.

That second part is especially interesting because it means the runtime can surface editor errors asynchronously, not only when the model asks for them.

## Diagnostic registry

`LSPDiagnosticRegistry.ts` shows mature behavior:

- pending-diagnostic storage,
- deduplication,
- volume limiting,
- delivery tracking.

This is what a production system does when it wants diagnostics to be useful rather than noisy.

## Passive feedback

`passiveFeedback.ts` converts raw LSP diagnostics into Claude-facing attachments or diagnostic structures. That is a bridge between an IDE-like feedback stream and an agent conversation loop.

## What `LSPClient.ts` teaches

This file is worth reading because it contains the operational reality of editor intelligence:

- process startup,
- stdio transport,
- initialization flow,
- request/notification handling,
- crash and timeout behavior.

This is a reminder that “use LSP” really means “operate another distributed subsystem inside your product.”

## Teaching takeaway

For beginners:

> LSP is how a coding agent can borrow the same structural hints your editor uses.

For advanced readers:

> The interesting design is not only the LSP request format. It is how diagnostics are filtered, attached, and made conversation-safe.
