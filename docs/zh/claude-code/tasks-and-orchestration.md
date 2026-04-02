# 任务与编排

> 这是英文主页面的中文支持页。建议与英文原文对照阅读：[Tasks and Orchestration](/claude-code/tasks-and-orchestration)

Claude Code 里“任务”不是一个 UI 小组件，而是一个真正的运行时边界。

这页最重要的一句是：

> **task 是 Claude Code 用来表示长期工作、可见进度、后台执行和协作编排的最小 durable work unit。**

## 任务系统主图

```mermaid
flowchart TD
  registry[src/tasks.ts] --> storage[utils/tasks.ts]
  storage --> ui[components/tasks/*]
  storage --> commands[/tasks command]
  storage --> agents[agent / teammate / background work]
```

## 为什么 `src/tasks.ts` 值得读

它不是简单的导出列表，而是在定义：

- 系统承认哪些 task 类型
- 哪些 task 是 feature-gated
- task 类型如何通过统一入口被解析

### 注解代码片段

```ts
export function getAllTasks(): Task[] {
  const tasks: Task[] = [
    LocalShellTask,
    LocalAgentTask,
    RemoteAgentTask,
    DreamTask,
  ]
  if (LocalWorkflowTask) tasks.push(LocalWorkflowTask)
  if (MonitorMcpTask) tasks.push(MonitorMcpTask)
  return tasks
}
```

**注解**

这说明 Claude Code 不是“随手起几个后台任务”，而是把任务类型本身建模成一个 registry。

## 为什么 `utils/tasks.ts` 是关键

真正让 task 成为架构边界的，是它的 durable coordination 逻辑。

### 注解代码片段

```ts
export const TaskSchema = lazySchema(() =>
  z.object({
    id: z.string(),
    subject: z.string(),
    description: z.string(),
    owner: z.string().optional(),
    status: TaskStatusSchema(),
    blocks: z.array(z.string()),
    blockedBy: z.array(z.string()),
  }),
)
```

**注解**

这说明 task 在这里不是普通对象，而是：

- 有 identity
- 有 owner
- 有 blocking relationship
- 有明确状态机

它已经是一个运行时领域对象了。

### 另一个关键片段

```ts
export function getTaskListId(): string {
  if (process.env.CLAUDE_CODE_TASK_LIST_ID) return ...
  const teammateCtx = getTeammateContext()
  if (teammateCtx) return teammateCtx.teamName
  return getTeamName() || leaderTeamName || getSessionId()
}
```

**注解**

这说明 task list 不是只给单用户单会话准备的。
它已经考虑了：

- standalone session
- team leader
- teammate context
- 显式指定的任务列表

所以 task 系统本质上也是一个**协作协调层**。

## 为什么任务不是“UI 列表项”

`commands/tasks/tasks.tsx` 和 `components/tasks/*` 说明：

- runtime 先生产结构化 task state
- UI 再把它投影成 dialog / footer pill / detail view / teammate navigation

这背后的架构 seam 是：

> runtime state 先被正规化，再被产品层展示。

## 为什么这页重要

如果你想理解 Claude Code 怎么从“单轮 agent”走向“长期工作流系统”，任务系统就是最重要的桥梁之一。

## 推荐结合阅读

- 英文正文：[Tasks and Orchestration](/claude-code/tasks-and-orchestration)
- 配套深潜：[工具与权限](/zh/claude-code/tools-and-permissions)
- 配套规划：[rewrite-roadmap](/claude-code/rewrite-roadmap)
