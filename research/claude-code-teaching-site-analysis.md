# Claude Code teaching site analysis

## Main recommendations

1. Teach **AI agent fundamentals first** so beginners can survive the source tour.
2. Use `claude-code-from-scratch` as the **small-system bridge**.
3. Use `how-claude-code-works` as the **topic sequence**, not as the only voice.
4. Use `claude-code` as the **source of implementation truth**.
5. Keep the site **English-first** while providing Chinese support pages.
6. Expand the current short pages into **longer, source-grounded 专题文章-style articles**.

## Why this matters

Claude Code is big enough that readers need both:

- a narrative curriculum,
- and a repo-navigation map.

That is why this site mixes learning paths, deep dives, source tours, and appendices.

The next version of the site should preserve that structure, but make each important page feel more like a serious article than a short topic stub.

## Architecture insight from the latest deep read

The most valuable new editorial insight is that Claude Code has a hidden **control plane** spread across startup, settings, AppState, sync, and capability exposure layers.

That control plane includes:

- safe startup policy boot,
- remote-managed settings,
- live change detection,
- AppState fan-out into UI / headless / bridge / team surfaces,
- deferred capability exposure through tool search,
- schema-backed structured output.

This is one of the strongest teaching opportunities in the codebase because it shows how a production agent stays coherent while the environment changes during a live session.

## Concrete next step

Use the control-plane findings as one of the first major rewrite waves.

Detailed artifact:

- `research/control-plane-state-surfaces-and-page-plan.md`

That note contains:

- source-grounded findings for settings, policy, AppState, sync, tool search, and synthetic output,
- a page-by-page rewrite plan for all current English docs,
- a priority-ranked list of new pages to add next.

## Editorial direction

The rewrite should follow five rules:

1. **Rewrite before translate.** Stabilize English pages first, then update Chinese mirrors.
2. **One page, one system argument.** Split overloaded topics into multiple long-form articles.
3. **Lead with the system question.** Make each page answer a concrete architectural problem.
4. **Use source anchors as evidence.** File paths should justify the claims, not decorate them.
5. **Prefer insight-driven titles.** Titles should promise a lesson, not only name a subsystem.
