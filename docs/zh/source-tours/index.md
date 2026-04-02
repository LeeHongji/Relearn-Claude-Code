# 源码导览

这一部分面向希望沿着**真实执行路径**理解 Claude Code 的读者。

## 导览总图

```mermaid
flowchart LR
  startup[启动到首个回合] --> tools[工具与权限导览]
  tools --> context[上下文与记忆导览]
  context --> ui[命令与界面导览]
```

## 推荐阅读顺序

| 步骤 | 中文支持页                                               | 建议对照的英文原文                                               |
| ---- | -------------------------------------------------------- | ---------------------------------------------------------------- |
| 1    | [启动到首个回合](/zh/source-tours/startup-to-turn)       | [Startup to First Turn](/source-tours/startup-to-turn)           |
| 2    | [工具与权限导览](/zh/source-tours/tools-permission-tour) | [Tools and Permission Tour](/source-tours/tools-permission-tour) |
| 3    | [上下文与记忆导览](/zh/source-tours/context-memory-tour) | [Context and Memory Tour](/source-tours/context-memory-tour)     |
| 4    | [命令与界面导览](/zh/source-tours/commands-ui-tour)      | [Commands and UI Tour](/source-tours/commands-ui-tour)           |

## 为什么保留中文版入口

因为很多读者需要先快速建立中文心智模型，再进入英文源码页面。

阅读时建议做两件事：

1. 先看执行链路图；
2. 再打开 `../ref_repo/claude-code` 对应文件核对边界。

## 使用建议

- 先读中文支持页，明确“这条路径在回答什么问题”。
- 再打开英文原文，按文件路径逐个核对。
- 最后回到中文页，用自己的话写下每个文件的职责边界。
