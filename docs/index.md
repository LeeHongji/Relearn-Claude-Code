---
layout: home

hero:
  name: Relearn Claude Code
  text: Learn the architecture of a production AI coding agent
  tagline: English-first, Chinese-supported teaching platform built from the Claude Code source, how-claude-code-works, and claude-code-from-scratch.
  image:
    src: /agent-stack.svg
    alt: AI agent learning ladder
  actions:
    - theme: brand
      text: Start with the learning path
      link: /learning-path
    - theme: alt
      text: Jump into Claude Code architecture
      link: /claude-code/architecture
    - theme: alt
      text: 阅读中文
      link: /zh/

features:
  - title: Beginner to expert
    details: Start with AI agent basics, then move into the real source layout, compaction pipeline, tool runtime, and multi-agent coordination.
  - title: Source-grounded
    details: Pages are anchored to concrete files under `ref_repo/claude-code`, with pedagogical comparisons to `claude-code-from-scratch`.
  - title: Built as a teaching repo
    details: The site itself lives in `relearn-claude-code/`, so you can extend the docs, add labs, or publish the site directly.
---

## What this site is for

This repo is a **teaching platform**, not just a notes dump. It is designed for two readers at once:

1. **Newcomers** who need a clean mental model of what an AI agent is, why coding agents need tools and safety layers, and how a terminal product differs from a chatbot.
2. **Senior engineers** who want an implementation map: entrypoints, registries, feature gates, context compression, permission checks, and extension surfaces.

## The three source pillars

| Source | Role in this site | Why it matters |
| --- | --- | --- |
| `ref_repo/claude-code` | Primary subject | Large-scale production-style coding agent architecture |
| `ref_repo/how-claude-code-works` | Teaching reference | A strong topic-based way to explain a very large codebase |
| `ref_repo/claude-code-from-scratch` | Minimal mirror | Shows what the smallest useful version looks like |

## Suggested first stops

- **New to agents?** Read [What Is an Agent?](/foundations/what-is-an-agent) and [The Agent Loop](/foundations/agent-loop).
- **Already ship agentic systems?** Start with [Runtime Loop](/claude-code/runtime-loop) and [Tools and Permissions](/claude-code/tools-and-permissions).
- **Trying to navigate the repo fast?** Open [Repository Map](/claude-code/repo-map) and [Source Atlas](/appendix/source-atlas).

## What makes Claude Code interesting

Claude Code is worth studying because it is not “just prompt engineering.” It is a full product stack with:

- startup orchestration and boot-time prefetching,
- a streaming think-act-observe loop,
- dozens of tools behind a shared interface,
- explicit permission and shell-safety logic,
- layered context engineering and memory,
- slash commands, skills, plugins, MCP, and multi-agent features.

That means the codebase teaches more than “how to call an LLM.” It teaches how to turn a model into a **reliable developer-facing system**.
