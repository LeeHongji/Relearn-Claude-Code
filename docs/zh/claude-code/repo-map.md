# 仓库地图

直接打开 `ref_repo/claude-code/src` 往往会让人失去方向。更好的方式是先认识**顶层街区**。

## 最重要的单文件入口

| 文件 | 为什么重要 |
| --- | --- |
| `src/main.tsx` | 启动入口、模式选择、预取与初始化 |
| `src/QueryEngine.ts` | 会话级编排层 |
| `src/query.ts` | 主循环 |
| `src/Tool.ts` | 工具统一契约 |
| `src/tools.ts` | 工具注册表 |
| `src/commands.ts` | slash command 注册表 |
| `src/context.ts` | 上下文组装 |

## 主要目录（按文件量）

| 目录 | 约文件数 | 作用 |
| --- | ---: | --- |
| `utils/` | 576 | 各类基础设施和通用逻辑 |
| `components/` | 405 | 终端 UI 组件 |
| `commands/` | 219 | 命令实现 |
| `tools/` | 212 | 工具实现 |
| `services/` | 145 | 子系统：compact、MCP、OAuth、plugins 等 |
| `hooks/` | 104 | 钩子和交互辅助 |
| `ink/` | 98 | 终端渲染基础 |
| `skills/` | 53 | 技能系统 |
| `stubs/` | 56 | 研究 fork 的占位模块 |

## 快速定位法

- 想看启动：`main.tsx`
- 想看主循环：`QueryEngine.ts` + `query.ts`
- 想看工具：`Tool.ts` + `tools.ts` + `services/tools/*`
- 想看权限：`tools/BashTool/*` + `utils/permissions/*`
- 想看长会话：`context.ts` + `memdir/*` + `services/compact/*`
