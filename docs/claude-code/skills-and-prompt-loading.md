# Skills and prompt loading

Skills are one of the clearest examples of Claude Code separating **reusable operational knowledge** from the main runtime loop.

## Relevant source areas

- `src/skills/loadSkillsDir.ts`
- `src/skills/bundled/index.ts`
- `src/skills/bundledSkills.ts`
- `src/skills/mcpSkills.ts`
- `src/skills/mcpSkillBuilders.ts`

## Why skills exist

Without a skill system, recurring workflows tend to become repeated long prompts, fragile copy-paste instructions, or hardcoded logic inside the main loop.

Skills provide a middle ground:

- reusable,
- inspectable,
- easier to version,
- easier to constrain than ad-hoc prompting.

## What to look for

### `loadSkillsDir.ts`

This is the key loader boundary: where skills are discovered and how on-disk definitions become runtime data.

### Bundled skills

The bundled-skill files show what the product team considers worth operationalizing: verify, debug, remember, loop, config changes, and more.

### MCP-backed skills

These matter because skill loading is not only about local markdown prompts. It can also adapt to connected capability surfaces.

## Architecture lesson

Skills are not “just prompts.” They sit at the boundary between prompt engineering, workflow design, product affordance, and permission/runtime integration.
