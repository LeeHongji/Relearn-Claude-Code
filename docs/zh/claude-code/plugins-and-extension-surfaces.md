# 插件与扩展边界

插件系统体现了 Claude Code 并不想把所有能力都塞进主循环，而是保留长期演进的扩展边界。

## 建议对照的源码位置

- `src/services/plugins/PluginInstallationManager.ts`
- `src/services/plugins/pluginCliCommands.ts`
- `src/services/plugins/pluginOperations.ts`
- `src/cli/handlers/plugins.ts`

## 这部分真正重要的点

插件不是单纯加载一段代码，更是生命周期与信任边界的产品治理问题。
