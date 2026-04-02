# Settings sync and live refresh

Claude Code does not treat settings as something loaded once at startup and forgotten forever. The source shows a more dynamic model where settings can be refreshed, propagated, and reacted to mid-session.

## Relevant source areas

- `src/services/settingsSync/index.ts`
- `src/utils/settings/changeDetector.ts`
- `src/hooks/useSettingsChange.ts`
- `src/cli/print.ts`
- `src/state/AppState.tsx`

## Why this subsystem matters

Many agent tools start with “read config on boot.” Production tools quickly need more:

- updating settings from a remote source,
- refreshing cached runtime state,
- notifying UI and background systems,
- avoiding change-feedback loops.

## What the source teaches

### Settings sync

`services/settingsSync/index.ts` is where sync logic becomes a runtime service instead of an ad-hoc helper. It suggests mid-session updates are expected, not exceptional.

### Change detection

`utils/settings/changeDetector.ts` is important because the hard part is rarely “did something change?” The hard part is how to fan out that change safely to many consumers without duplicate work or loops.

### Hooks and app state

`hooks/useSettingsChange.ts` plus `AppState.tsx` show that live settings affect both runtime state and visible product behavior.

### CLI/headless surface

`cli/print.ts` matters because a serious product often needs settings behavior in both interactive and headless modes.

## Main design lesson

For beginners:

> Configuration is not only data. In a real product it becomes an event stream.

For advanced readers:

> The interesting challenge is coordinated invalidation and refresh across UI, plugins, hooks, and services.
