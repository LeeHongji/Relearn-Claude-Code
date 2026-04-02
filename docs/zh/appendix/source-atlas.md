# 源码图谱

这不是逐文件清单，而是一个**仓库街区地图**，帮助你快速知道该先去哪看。

## 顶层图谱

| 路径 | 约文件数 | 主要内容 | 为什么重要 |
| --- | ---: | --- | --- |
| `src/main.tsx` | 1 | 启动入口 | 运行时前门 |
| `src/QueryEngine.ts` | 1 | 会话引擎 | 连接启动层与主循环 |
| `src/query.ts` | 1 | 主循环 | think-act-observe 核心 |
| `src/Tool.ts` | 1 | 工具契约 | 工具统一接口 |
| `src/tools.ts` | 1 | 工具注册表 | 能力总面板 |
| `src/commands.ts` | 1 | 命令注册表 | CLI 产品层 |
| `src/context.ts` | 1 | 上下文组装 | prompt 输入中枢 |
| `src/utils/` | 576 | 各类基础设施 | 隐藏的底层骨架 |
| `src/components/` | 405 | UI 组件 | 终端体验与权限展示 |
| `src/commands/` | 219 | 命令实现 | 用户可操作动作 |
| `src/tools/` | 212 | 工具实现 | 文件、shell、web、MCP 等 |
| `src/services/` | 145 | 子系统 | compact、MCP、analytics、plugins |
| `src/hooks/` | 104 | 钩子 | 横切逻辑 |
| `src/ink/` | 98 | 终端渲染层 | 交互基础 |
| `src/skills/` | 53 | 技能系统 | 可复用工作流 |
| `src/memdir/` | 9 | 文件式记忆 | 长会话支撑 |
| `src/coordinator/` | 2 | 调度者模式 | 多智能体角色分离 |

## 快速阅读路线

### 30 分钟看大图
1. `main.tsx`
2. `QueryEngine.ts`
3. `query.ts`
4. `tools.ts`
5. `commands.ts`

### 只关心长上下文
1. `context.ts`
2. `memdir/memdir.ts`
3. `services/compact/autoCompact.ts`
4. `services/compact/compact.ts`

### 只关心 shell 安全
1. `tools/BashTool/BashTool.tsx`
2. `tools/BashTool/bashPermissions.ts`
3. `tools/BashTool/bashSecurity.ts`
4. `utils/permissions/*`
