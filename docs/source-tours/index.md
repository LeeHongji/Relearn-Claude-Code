# Source tours

Source tours are for readers who learn best by **following real execution paths** instead of reading isolated concept pages.

## Why these tours exist

Claude Code is large enough that “open the repo and start reading” is inefficient. A source tour narrows the question:

- how does startup become a usable turn?
- where do permissions actually get enforced?
- where does long-context resilience live?
- how do commands and UI fit around the core loop?

## Recommended order

1. [Startup to First Turn](/source-tours/startup-to-turn)
2. [Tools and Permission Tour](/source-tours/tools-permission-tour)
3. [Context and Memory Tour](/source-tours/context-memory-tour)
4. [Commands and UI Tour](/source-tours/commands-ui-tour)

## How to use a source tour

For each page:

1. read the diagram and checkpoints,
2. open the referenced files in `../ref_repo/claude-code`,
3. write down the runtime boundary you think the file owns,
4. compare that boundary to the next file in the path.

That turns passive reading into systems understanding.
