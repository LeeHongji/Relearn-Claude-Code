# Agent 循环

coding agent 的核心是 **think → act → observe → continue**。

在 Claude Code 里，最重要的几份文件是：

- `src/main.tsx`
- `src/QueryEngine.ts`
- `src/query.ts`

在最小实现里，对应的是 `ref_repo/claude-code-from-scratch/src/agent.ts`。

## 循环的朴素版本

1. 组装系统上下文和消息历史；
2. 调用模型；
3. 流式输出文本；
4. 如果模型产生工具调用，就执行工具；
5. 把结果塞回消息历史；
6. 判断继续、压缩、重试还是停止。

## 为什么真实工程要拆层？

### `main.tsx`
负责启动、初始化、预取和模式判断。

### `QueryEngine.ts`
负责会话级状态：模型、记忆、插件、转录、提示词部件。

### `query.ts`
负责真正的主循环：消息标准化、预算控制、工具流式执行、停止钩子、压缩与恢复。

## 一个关键点：流式工具执行

`StreamingToolExecutor.ts` 说明 Claude Code 不只是“调用完模型再统一执行工具”，而是尽量**把工具执行延迟藏进用户感知之外**。
