# 会话转录与团队记忆

Claude Code 的源码显示：长期运行 agent 的状态，不只是“聊天记录”一种形式，还可能被保存成转录、摘要或团队同步记忆。

## 建议对照的源码位置

- `src/services/sessionTranscript/sessionTranscript.ts`
- `src/services/teamMemorySync/index.ts`
- `src/services/teamMemorySync/watcher.ts`
- `src/services/teamMemorySync/teamMemSecretGuard.ts`
- `src/services/toolUseSummary/toolUseSummaryGenerator.ts`

## 这部分真正重要的点

真正的生产系统往往需要：

- 持久化转录，
- 工具使用摘要，
- 团队共享记忆，
- 在同步前做 secret guard。
