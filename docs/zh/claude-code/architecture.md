# Claude Code 架构总览

Claude Code 最适合按四层理解：

![Claude Code architecture](/claude-code-architecture.svg)

## 第一层：启动与会话准备

核心入口：`src/main.tsx`

这里负责：

- 启动时的宏与 profiler；
- 配置、凭据等预取；
- CLI 参数解析；
- 插件、技能、遥测和渲染环境初始化。

## 第二层：查询与控制流

核心文件：

- `src/QueryEngine.ts`
- `src/query.ts`

这层负责真正的 agent runtime：模型选择、消息组织、重试、工具调用、压缩与停止条件。

## 第三层：工具、权限与集成

核心目录：

- `src/tools/`
- `src/services/`
- `src/utils/permissions/`

这是 agent 具备“行动能力”的地方。

## 第四层：产品体验

核心目录：

- `src/components/`
- `src/ink/`
- `src/commands/`
- `src/hooks/`

这层决定 Claude Code 是否像一个真正的开发者产品，而不仅仅是一个 API wrapper。
