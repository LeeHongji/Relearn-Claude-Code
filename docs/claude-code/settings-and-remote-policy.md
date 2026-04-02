# Settings and remote policy

Claude Code does not treat configuration as a static file loaded once at startup. The source shows a more dynamic model: **safe early configuration, remote-managed policy, change detection, and background sync**.

## Relevant source areas

- `src/entrypoints/init.ts`
- `src/services/remoteManagedSettings/index.ts`
- `src/utils/settings/changeDetector.ts`
- `src/services/settingsSync/index.ts`
- `src/utils/managedEnv.js` and related settings helpers referenced from init

## Why this subsystem matters

This is where product policy meets runtime behavior.

The system needs to answer questions like:

- which settings are safe to apply before trust is established?
- how do enterprise or remotely managed settings override local expectations?
- how are settings changes detected during a live session?
- how can settings sync fail without breaking startup?

## What `init.ts` reveals

The init path in Claude Code performs more than startup plumbing. It applies **safe config environment variables** early, wires remote-managed settings loading, and coordinates cleanup, telemetry, scratchpad, and LSP-related initialization.

The key idea is:

> startup is also policy setup.

## What remote-managed settings reveal

`services/remoteManagedSettings/index.ts` is a strong production signal:

- eligibility checks,
- caching,
- checksums,
- graceful degradation,
- background polling,
- security checks on incoming settings.

This is not a toy feature. It is how a developer tool becomes manageable at team and enterprise scale.

## What settings change detection reveals

`utils/settings/changeDetector.ts` shows that settings are not frozen after boot. The runtime watches for:

- stable file writes,
- internal-vs-external writes,
- deletion grace windows,
- MDM or platform-managed changes.

That means the system is designed to stay coherent **while the environment changes under it**.

## What settings sync reveals

`services/settingsSync/index.ts` adds a different angle: configuration portability across environments.

This shows another production tradeoff:

- sync enough to reduce friction,
- fail open when needed,
- avoid blocking startup,
- preserve observability.

## Teaching takeaway

For beginners:

> Configuration is part of the agent’s runtime, not a boring setup file.

For advanced readers:

> Settings, remote policy, and live change detection form a hidden control plane for the product.
