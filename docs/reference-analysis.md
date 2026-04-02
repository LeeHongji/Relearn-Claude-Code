# Reference analysis

This page explains how the three reference repos shape the teaching platform.

## The role of each repo

| Repo | Best use | Teaching value |
| --- | --- | --- |
| `../ref_repo/claude-code` | Primary source evidence | Real subsystem boundaries, product complexity, implementation clues |
| `../ref_repo/how-claude-code-works` | Curriculum structure | Good topic breakdown for a very large codebase |
| `../ref_repo/claude-code-from-scratch` | Beginner bridge | Minimal loop/tool/prompt implementation for hands-on learning |

## Why the combination works

Using only the large source repo overwhelms beginners.
Using only the from-scratch repo hides production realities.
Using only narrative deep dives can feel detached from the code.

This site deliberately combines all three:

1. **learn the mental model,**
2. **see the small implementation,**
3. **map it onto the production system.**

## Main editorial rule

Every major concept should answer three questions:

1. What is the idea?
2. What does the minimal version look like?
3. Where does the production version live?
