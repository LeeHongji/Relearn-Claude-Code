# Ink and terminal UI

Claude Code is a terminal-native agent product, so its UI architecture matters as much as its model loop.

## Relevant source areas

- `src/ink/renderer.ts`
- `src/ink/root.ts`
- `src/ink/terminal.ts`
- `src/ink/components/*`
- `src/ink/layout/*`
- `src/ink/events/*`

## Why this subsystem matters

A terminal app still has to solve real UI problems: rendering, layout, input, focus, scrolling, selection, and visual feedback.

## What to look for

### Rendering and root management

Files like `renderer.ts` and `root.ts` help you understand how the terminal UI is driven and updated.

### Components

The `ink/components/` tree contains product primitives like text, buttons, links, boxes, scroll containers, and contexts for terminal size/focus.

### Layout and events

The `layout/` and `events/` directories remind you that terminal apps still need geometry and event-dispatch systems.
