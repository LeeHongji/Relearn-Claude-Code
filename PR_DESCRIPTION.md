# PR Title

Build an English-first bilingual teaching platform for Claude Code

# Summary

This PR turns `relearn-claude-code` into a publishable teaching platform for learning Claude Code and AI agent engineering.

It introduces:

- AI agent foundations for beginners,
- source-grounded Claude Code architecture pages,
- source tours that follow real execution paths,
- hands-on labs,
- Chinese support pages,
- advanced subsystem coverage for MCP, skills, plugins, tasks, and Ink,
- VitePress publishing infrastructure,
- repo-local verification scripts and tests.

# What changed

## Documentation platform

- Added a VitePress site under `docs/`
- Added English-first navigation with Chinese support
- Added deploy support via GitHub Pages workflow and `DOCS_BASE`

## Core learning content

- Added foundations pages for agent basics, the loop, context/memory, and tool safety
- Added Claude Code deep dives for architecture, runtime loop, context engineering, permissions, commands/UI, memory/multi-agent, and build-your-own guidance
- Added advanced subsystem pages for:
  - MCP and external tools
  - skills and prompt loading
  - plugins and extension surfaces
  - tasks and orchestration
  - Ink and terminal UI

## Learning utilities

- Added source tours for startup, tools/permissions, context/memory, and commands/UI
- Added hands-on labs for tools, context compaction, and multi-agent readiness
- Added appendix pages including glossary and source atlas

## Chinese support

- Added and expanded `docs/zh/` support pages
- Added Chinese support pages for source tours, labs, and advanced Claude Code topics

## Verification + maintainability

- Added `scripts/verify-analysis.cjs`
- Added `scripts/verify-docs-structure.cjs`
- Added tests under `test/`
- Added `lint` and `test` package scripts
- Added `RELEASE_NOTES.md`

# Why this matters

Claude Code is a large and difficult codebase to approach directly. This PR creates a structured path that works for both:

- readers new to AI agents,
- and experienced engineers studying production-grade agent architecture.

# Verification

Ran locally:

- `npm run lint`
- `npm test`
- `npm run docs:build`
- `DOCS_BASE=/demo/ npm run docs:build`
- `git diff --check`

# Notes for reviewers

- The docs are English-first, with Chinese support rather than full one-to-one translation everywhere.
- The site was expanded with OMX team-assisted parallel research/implementation, then integrated and re-verified locally.
- One VitePress build error encountered during development was caused by concurrent builds racing on `.vitepress/.temp`; sequential builds pass.

# Follow-ups

Potential follow-up work:

1. expand Chinese parity for every advanced page,
2. add richer diagrams/visualizations,
3. add more focused deep dives for MCP auth/config and task UIs,
4. publish to a configured remote.
