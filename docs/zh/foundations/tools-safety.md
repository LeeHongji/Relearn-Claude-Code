# 工具与安全

agent 一旦拥有工具，就从“会说话”变成了“会做事”。一旦会做事，就必须回答安全问题。

## 统一工具接口

Claude Code 的关键文件有：

- `src/Tool.ts`
- `src/tools.ts`
- `src/services/tools/toolOrchestration.ts`
- `src/services/tools/StreamingToolExecutor.ts`

统一接口的好处是：

- 统一校验；
- 统一权限；
- 统一进度展示；
- 统一取消和错误处理。

## 并发控制

`toolOrchestration.ts` 体现了一个非常实用的原则：

- 只读操作尽量并发；
- 写操作尽量串行；
- 上下文更新保持可预测顺序。

## Bash 安全不是正则表达式

Claude Code 在 shell 安全上花了非常多工程力，重点文件包括：

- `tools/BashTool/bashPermissions.ts`
- `tools/BashTool/bashSecurity.ts`
- `utils/permissions/*`
- `utils/bash/*`

真正可靠的 coding agent，不能只靠 prompt 说一句“不要执行危险命令”。
