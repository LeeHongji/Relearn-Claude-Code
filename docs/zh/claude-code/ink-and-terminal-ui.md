# Ink 与终端渲染

Claude Code 是终端原生产品，所以它的 UI 层本身就值得单独学习。

## 建议对照的源码位置

- `src/ink/renderer.ts`
- `src/ink/root.ts`
- `src/ink/terminal.ts`
- `src/ink/components/*`
- `src/ink/layout/*`
- `src/ink/events/*`

## 这部分真正重要的点

终端 UI 也一样要处理渲染、布局、输入、焦点和状态变化，而不只是“往 stdout 打字”。
