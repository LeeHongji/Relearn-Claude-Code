# Plugins and extension surfaces

A mature coding agent cannot keep every feature in the core loop forever. It needs extension boundaries.

## Relevant source areas

- `src/services/plugins/PluginInstallationManager.ts`
- `src/services/plugins/pluginCliCommands.ts`
- `src/services/plugins/pluginOperations.ts`
- `src/cli/handlers/plugins.ts`
- `src/plugins/`

## Why plugins matter

Plugins are a governance decision as much as a technical one. They answer what third parties can add, how lifecycle operations work, and how trust is preserved.

## What to look for

### Installation manager

Look for lifecycle tracking, state management, and failure handling.

### CLI commands for plugins

These show how plugin operations become user-facing product actions.

### Operations

This is where install/update/remove mechanics are centralized.

## Relationship to skills and MCP

| Surface | Main purpose |
| --- | --- |
| Skills | Reusable workflows/prompts |
| MCP | External tool/resource protocol |
| Plugins | Packaged extension lifecycle |
|
The lesson is that Claude Code does not force one abstraction to do every job.
