# Commands, UI, and extensions

Claude Code is not only an engine. It is also a developer product with a command surface, terminal UI, and extension system.

## Commands

`src/commands.ts` is the slash-command registry. It wires together a large set of product actions such as:

- memory,
- compact,
- config,
- login/logout,
- MCP,
- review,
- tasks,
- skills,
- session, status, usage, theme, and more.

This means commands are a **product shell around the core loop**.

## UI

The UI lives across:

- `src/components/`
- `src/ink/`
- `src/hooks/`

A terminal agent still needs serious UX work:

- streaming output,
- dialogs,
- approval prompts,
- status indicators,
- structured diffs,
- progress and error presentation.

## Extensions

Claude Code exposes multiple ways to extend the system:

| Surface | Purpose |
| --- | --- |
| Skills | Repeatable workflows and prompts |
| Plugins | Product extension surface |
| MCP | External tool/resource protocol |
| Custom agents | Specialized roles and behaviors |
| Commands | User-facing actions in the CLI |

## Why this matters architecturally

A mature product cannot put every feature inside the main loop. It needs **extension boundaries**.

Those boundaries help the team add capabilities without rewriting `query.ts` every week.

## Engineering lesson

For newcomers, commands and UI may seem secondary. In practice they determine whether the system feels professional. The model may be identical, but the product quality will differ radically depending on:

- how approvals are presented,
- how progress is shown,
- how recoveries are surfaced,
- how users learn available capabilities.
