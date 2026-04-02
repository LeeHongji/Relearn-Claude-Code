---
layout: home

hero:
  name: 重学 Claude Code
  text: 学懂生产级 AI Coding Agent 的架构
  tagline: 以英文为主、支持中文的教学网站；基于 Claude Code 源码、how-claude-code-works 与 claude-code-from-scratch 构建。
  image:
    src: /agent-stack.svg
    alt: AI agent 学习阶梯
  actions:
    - theme: brand
      text: 从学习路径开始
      link: /zh/learning-path
    - theme: alt
      text: 进入源码架构
      link: /zh/claude-code/architecture
    - theme: alt
      text: Read in English
      link: /

features:
  - title: 面向新手与资深工程师
    details: 先讲清 AI agent 的基本心智模型，再逐步进入运行时、工具系统、上下文压缩、权限与多智能体协作。
  - title: 以源码为依据
    details: 每个专题都尽量锚定 `ref_repo/claude-code` 的具体文件，并对照 `claude-code-from-scratch` 做教学化简化。
  - title: 可直接继续扩展
    details: 整个教学网站 repo 就在 `relearn-claude-code/`，可以直接继续写文档、加实验章节、发布静态站点。
---

## 这个站点是做什么的？

这不是简单的读书笔记，而是一个**教学平台型 repo**。它同时服务两类读者：

1. **刚接触 AI agent 的读者**：需要先理解 agent 是什么、为什么 coding agent 需要工具、为什么权限和上下文管理是刚需。
2. **已经做过工程系统的读者**：希望快速定位入口、主循环、工具注册、压缩管线、权限体系与扩展边界。

## 三个核心参考源

| 来源                                | 在本站中的作用 | 价值                                 |
| ----------------------------------- | -------------- | ------------------------------------ |
| `ref_repo/claude-code`              | 主分析对象     | 生产级 coding agent 的真实大体量架构 |
| `ref_repo/how-claude-code-works`    | 教学表达参考   | 展示如何把大仓库拆成专题来讲         |
| `ref_repo/claude-code-from-scratch` | 最小实现镜像   | 帮助理解“最少需要什么”               |

## 推荐入口

- **如果你刚接触 agent**：先读 [什么是 Agent？](/zh/foundations/what-is-an-agent) 和 [Agent 循环](/zh/foundations/agent-loop)。
- **如果你已经在做 agent 产品**：建议从 [运行时主循环](/zh/claude-code/runtime-loop) 和 [工具与权限](/zh/claude-code/tools-and-permissions) 开始。
- **如果你只想快速认仓库**：直接看 [仓库地图](/zh/claude-code/repo-map) 和 [源码图谱](/zh/appendix/source-atlas)。

## 进阶专题

- [MCP 与外部工具](/zh/claude-code/mcp-and-external-tools)
- [Skills 与提示词装载](/zh/claude-code/skills-and-prompt-loading)
- [插件与扩展边界](/zh/claude-code/plugins-and-extension-surfaces)
- [任务与编排](/zh/claude-code/tasks-and-orchestration)
- [Ink 与终端渲染](/zh/claude-code/ink-and-terminal-ui)
- [设置与远程策略](/zh/claude-code/settings-and-remote-policy)
- [LSP 与编辑器反馈](/zh/claude-code/lsp-and-editor-feedback)
- [溢出恢复与响应式压缩](/zh/claude-code/overflow-recovery-and-reactive-compact)
