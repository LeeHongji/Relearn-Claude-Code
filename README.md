# Relearn Claude Code

English-first, bilingual (English + 中文) teaching platform for understanding:

- Claude Code as a production-grade coding agent,
- AI agent fundamentals for newcomers,
- system-design patterns useful to senior engineers.

This repo is built from three reference sources in `../ref_repo/`:

1. `claude-code` — the large research fork and primary source subject
2. `how-claude-code-works` — topic-oriented architecture explanations
3. `claude-code-from-scratch` — the minimal teaching implementation

## What is inside

- `docs/` — the VitePress site
- `docs/foundations/` — AI agent basics
- `docs/claude-code/` — source-grounded deep dives
- `docs/appendix/` — glossary and source atlas
- `docs/zh/` — Chinese mirrors/supporting pages
- `research/` — maintainers' analysis artifacts used to shape the site
- `scripts/verify-analysis.cjs` — validates the analysis pack
- `test/analysis.test.cjs` — lightweight Node test for the research artifacts

## Local development

```bash
npm install
npm run docs:dev
```

## Production build

```bash
npm run docs:build
```

## Current teaching shape

The current site is organized as:

1. **Foundations** — what an agent is, how the loop works, why context/tools/safety matter
2. **Claude Code Deep Dive** — architecture, repo map, runtime loop, context engineering, permissions, extensibility
3. **Source Tours** — follow real execution paths through startup, tools, context, and UI
4. **Labs** — turn the material into implementation exercises
5. **Appendix** — source atlas, glossary, and publishing guidance
6. **Chinese support** — mirrored entry pages for bilingual reading

## Publishing

This repo now includes a GitHub Pages workflow:

- `.github/workflows/deploy-docs.yml`

The docs config also supports a deployment base path via `DOCS_BASE`.

## Maintainer notes

- English is the canonical language for the main learning path.
- Chinese pages support accessibility and cross-language study.
- `../ref_repo` is treated as read-only source material.
