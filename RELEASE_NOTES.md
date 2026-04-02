# Release Notes

## Summary

This release turns `relearn-claude-code` from an empty target directory into a **publishable, English-first, bilingual teaching platform** for learning Claude Code and AI agent engineering.

It now includes:

- beginner-friendly AI agent foundations,
- source-grounded Claude Code architecture deep dives,
- source tours that follow real execution paths,
- hands-on labs,
- Chinese support pages,
- deployable VitePress infrastructure,
- verification scripts and tests for maintaining docs structure as the site grows.

## Highlights

### 1. English-first teaching site

Added a VitePress documentation site under `docs/` with:

- foundations,
- Claude Code deep dives,
- source tours,
- labs,
- appendix/reference pages.

### 2. Chinese support

Added and expanded `docs/zh/` so readers can use Chinese support pages while following the English-first canonical structure.

### 3. Advanced subsystem coverage

Added new deep-dive pages for:

- MCP and external tools,
- skills and prompt loading,
- plugins and extension surfaces,
- tasks and orchestration,
- Ink and terminal UI.

### 4. Team-driven research and verification

Used OMX team execution to parallelize:

- architecture analysis,
- information architecture work,
- Chinese support expansion,
- docs verification and integration.

### 5. Publishing readiness

Added:

- `DOCS_BASE` support in VitePress config,
- GitHub Pages workflow,
- docs verification scripts and tests.

## Key files added or updated

- `docs/.vitepress/config.mts`
- `docs/foundations/*`
- `docs/claude-code/*`
- `docs/source-tours/*`
- `docs/labs/*`
- `docs/appendix/*`
- `docs/zh/**`
- `scripts/verify-analysis.cjs`
- `scripts/verify-docs-structure.cjs`
- `test/analysis.test.cjs`
- `test/docs-structure.test.cjs`
- `.github/workflows/deploy-docs.yml`
- `README.md`
- `package.json`

## Verification performed

- `npm run lint`
- `npm test`
- `npm run docs:build`
- `DOCS_BASE=/demo/ npm run docs:build`
- `git diff --check`

## Known limitations

- GitHub Pages workflow was prepared but not executed in this environment.
- Chinese coverage is strong, but can still be expanded for full parity on every advanced page.
- Some team-integrated work required leader-side task-state cleanup after runtime integration completed.

## Suggested next steps

1. Add richer diagrams or animated visuals for the most complex subsystem pages.
2. Expand Chinese parity further for advanced Claude Code deep dives.
3. Add more focused pages for commands, MCP auth/config, and task UIs.
4. Publish the site and iterate from real reader feedback.
