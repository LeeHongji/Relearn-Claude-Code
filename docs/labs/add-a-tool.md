# Lab: add a tool

This lab teaches the difference between “a function the model can call” and “a tool the runtime can trust”.

## Goal

Add one new tool to a minimal coding-agent project.

Good examples:

- `list_recent_files`
- `read_json`
- `run_tests`

## Minimal target

Your tool should have:

1. a name,
2. a description,
3. a JSON-schema-like input shape,
4. an executor,
5. a string or structured result.

## Step 1 — build the simplest version

Use `../ref_repo/claude-code-from-scratch/src/tools.ts` as a reference.

Questions:

- how is the schema declared?
- how is the tool selected at runtime?
- how is the result sent back to the loop?

## Step 2 — add one safety improvement

Now add one runtime protection:

- validate the input path,
- cap output length,
- restrict network access,
- require confirmation for mutations.

## Step 3 — compare with Claude Code

Read:

- `src/Tool.ts`
- `src/tools.ts`
- `services/tools/toolOrchestration.ts`

Then write down:

- what your simple tool still lacks,
- which missing features belong in the runtime,
- whether your tool is concurrency-safe.

## Deliverable

At the end, produce a short note with:

- tool schema,
- runtime checks added,
- one reason the production version needs more infrastructure.
