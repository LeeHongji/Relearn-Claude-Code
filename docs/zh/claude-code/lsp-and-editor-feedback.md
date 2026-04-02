# LSP 与编辑器反馈

一个成熟 coding agent 的强大之处，不仅在于模型和 shell，还在于它如何利用编辑器级结构化信号。

## 建议对照的源码位置

- `src/tools/LSPTool/LSPTool.ts`
- `src/services/lsp/LSPClient.ts`
- `src/services/lsp/passiveFeedback.ts`
- `src/services/lsp/LSPDiagnosticRegistry.ts`

## 这部分真正重要的点

Claude Code 看起来同时利用了两类 LSP 能力：

1. 主动 LSP 工具调用；
2. 被动接收诊断反馈。

这意味着系统不只是“模型想问才去查”，还会把编辑器诊断作为异步信号纳入运行时。
