# Memory and multi-agent

Claude Code contains evidence of a platform that thinks beyond single-turn single-agent usage.

## Memory

The `memdir/` subsystem is the clearest foundation. It defines:

- entrypoint file rules,
- truncation limits,
- structured memory guidance,
- auto-memory behavior,
- optional team-memory support behind feature gates.

This keeps memory understandable and inspectable.

## Skills and reusable workflows

The `src/skills/` area shows that reusable operational knowledge can be packaged separately from the core loop.

That is important because agent systems often need stable recipes:

- do cleanup this way,
- do code review this way,
- do release verification this way.

## Multi-agent features

Relevant source areas include:

- `src/tools/AgentTool/*`
- `src/coordinator/coordinatorMode.ts`
- team-related tools in `src/tools.ts`

A notable idea in `coordinatorMode.ts` is that the coordinator can be put into a restricted role where it mainly delegates instead of doing all work directly.

That is an architectural statement: **role separation can be enforced by the runtime**.

## Why this is harder than it looks

Multiple agents create three classes of difficulty:

1. **Coordination** — who owns which task?
2. **State sharing** — what do all agents need to know?
3. **Conflict control** — how do you stop them from trampling the same files?

The broader Claude Code ecosystem often uses worktrees and explicit task messaging because “just spawn more agents” is not enough.

## A good lesson for builders

Start with one agent.
Then add:

- task decomposition,
- role boundaries,
- shared memory,
- isolated workspaces,
- verification loops.

That is the safe path from toy multi-agent demos to systems that can actually ship work.
