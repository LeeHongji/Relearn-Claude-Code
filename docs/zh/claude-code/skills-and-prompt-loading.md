# Skills 与提示词装载

Skills 展示了 Claude Code 怎样把可复用工作流从主循环里抽出来，形成可命名、可维护的能力层。

## 建议对照的源码位置

- `src/skills/loadSkillsDir.ts`
- `src/skills/bundled/index.ts`
- `src/skills/bundledSkills.ts`
- `src/skills/mcpSkills.ts`

## 为什么它重要

如果没有 skills，很多高频工作流最终都会变成重复提示词、脆弱说明，或硬编码进主循环。
