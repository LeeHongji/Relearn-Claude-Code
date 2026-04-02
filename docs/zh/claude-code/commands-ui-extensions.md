# 命令、界面与扩展

Claude Code 不只是一个核心引擎，它还是一个开发者产品。

## 命令层

`src/commands.ts` 是 slash command 注册中心，挂接了 memory、compact、config、MCP、review、tasks、skills 等大量产品动作。

## 终端 UI

主要位于：

- `src/components/`
- `src/ink/`
- `src/hooks/`

这决定了：

- 流式输出怎么展示；
- 权限弹窗怎么做；
- diff、状态、错误如何呈现。

## 扩展层

Claude Code 的扩展边界包括：

- Skills
- Plugins
- MCP
- Custom agents
- Commands

这说明它不是把所有能力都塞进主循环，而是保留了长期可演进的边界。
