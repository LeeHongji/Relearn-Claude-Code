# 设置同步与实时刷新

Claude Code 并不把设置当成“启动时读一次”的静态文件，而是支持中途刷新、同步与分发的运行时模型。

## 建议对照的源码位置

- `src/services/settingsSync/index.ts`
- `src/utils/settings/changeDetector.ts`
- `src/hooks/useSettingsChange.ts`
- `src/cli/print.ts`
- `src/state/AppState.tsx`

## 这部分真正重要的点

真实产品里，设置常常会变成一种事件流：

- 远程同步进来，
- 驱动缓存失效，
- 通知 UI 和后台服务，
- 还要避免循环触发。
