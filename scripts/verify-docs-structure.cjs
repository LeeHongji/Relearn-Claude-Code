#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const REQUIRED_PAGES = [
  "docs/index.md",
  "docs/learning-path.md",
  "docs/foundations/what-is-an-agent.md",
  "docs/foundations/agent-loop.md",
  "docs/foundations/context-memory.md",
  "docs/foundations/tools-safety.md",
  "docs/claude-code/architecture.md",
  "docs/claude-code/repo-map.md",
  "docs/claude-code/runtime-loop.md",
  "docs/claude-code/context-engineering.md",
  "docs/claude-code/tools-and-permissions.md",
  "docs/claude-code/commands-ui-extensions.md",
  "docs/claude-code/memory-and-multi-agent.md",
  "docs/claude-code/building-your-own.md",
  "docs/claude-code/mcp-and-external-tools.md",
  "docs/claude-code/skills-and-prompt-loading.md",
  "docs/claude-code/plugins-and-extension-surfaces.md",
  "docs/claude-code/tasks-and-orchestration.md",
  "docs/claude-code/ink-and-terminal-ui.md",
  "docs/claude-code/settings-and-remote-policy.md",
  "docs/claude-code/overflow-recovery-and-reactive-compact.md",
  "docs/claude-code/lsp-and-editor-feedback.md",
  "docs/source-tours/index.md",
  "docs/labs/index.md",
  "docs/appendix/source-atlas.md",
  "docs/appendix/glossary.md",
  "docs/reference-analysis.md",
  "docs/site-information-architecture.md",
  "docs/zh/index.md",
  "docs/zh/learning-path.md",
  "docs/zh/publishing.md",
  "docs/zh/claude-code/mcp-and-external-tools.md",
  "docs/zh/claude-code/skills-and-prompt-loading.md",
  "docs/zh/claude-code/plugins-and-extension-surfaces.md",
  "docs/zh/claude-code/tasks-and-orchestration.md",
  "docs/zh/claude-code/ink-and-terminal-ui.md",
  "docs/zh/claude-code/settings-and-remote-policy.md",
  "docs/zh/claude-code/overflow-recovery-and-reactive-compact.md",
  "docs/zh/claude-code/lsp-and-editor-feedback.md",
  "docs/public/source-inventory.json",
];

const MIN_MARKDOWN_COUNTS = {
  "docs/foundations": 4,
  "docs/claude-code": 16,
  "docs/source-tours": 4,
  "docs/labs": 3,
  "docs/appendix": 2,
  "docs/zh": 3,
};

const REQUIRED_SOURCE_INVENTORY_PATHS = [
  "utils",
  "components",
  "commands",
  "tools",
  "services",
  "hooks",
  "ink",
  "skills",
];

function listMarkdownFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort();
}

function verifyDocsStructure(rootDir = process.cwd()) {
  for (const relPath of REQUIRED_PAGES) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Missing required docs artifact: ${relPath}`);
    }
  }

  const sectionCounts = {};
  for (const [relDir, minCount] of Object.entries(MIN_MARKDOWN_COUNTS)) {
    const fullDir = path.join(rootDir, relDir);
    const markdownFiles = listMarkdownFiles(fullDir);
    sectionCounts[relDir] = markdownFiles.length;
    if (markdownFiles.length < minCount) {
      throw new Error(
        `${relDir} must contain at least ${minCount} markdown files; found ${markdownFiles.length}`,
      );
    }
  }

  const inventory = JSON.parse(
    fs.readFileSync(
      path.join(rootDir, "docs/public/source-inventory.json"),
      "utf8",
    ),
  );

  if (
    !Array.isArray(inventory.topLevel) ||
    inventory.topLevel.length < REQUIRED_SOURCE_INVENTORY_PATHS.length
  ) {
    throw new Error(
      "docs/public/source-inventory.json must contain a topLevel inventory array.",
    );
  }

  const inventoryPaths = new Set(inventory.topLevel.map((entry) => entry.path));
  for (const expectedPath of REQUIRED_SOURCE_INVENTORY_PATHS) {
    if (!inventoryPaths.has(expectedPath)) {
      throw new Error(
        `source inventory is missing expected top-level path: ${expectedPath}`,
      );
    }
  }

  const siteIa = fs.readFileSync(
    path.join(rootDir, "docs/site-information-architecture.md"),
    "utf8",
  );
  if (!siteIa.includes("English is the canonical source path.")) {
    throw new Error(
      "site-information-architecture.md must document the English-first language strategy.",
    );
  }

  const referenceAnalysis = fs.readFileSync(
    path.join(rootDir, "docs/reference-analysis.md"),
    "utf8",
  );
  for (const repoName of [
    "claude-code",
    "how-claude-code-works",
    "claude-code-from-scratch",
  ]) {
    if (!referenceAnalysis.includes(repoName)) {
      throw new Error(`reference-analysis.md must mention ${repoName}.`);
    }
  }

  return {
    requiredPageCount: REQUIRED_PAGES.length,
    sectionCounts,
    inventoryPaths: Array.from(inventoryPaths).sort(),
  };
}

if (require.main === module) {
  try {
    const result = verifyDocsStructure();
    console.log("docs structure verified");
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = {
  REQUIRED_PAGES,
  MIN_MARKDOWN_COUNTS,
  REQUIRED_SOURCE_INVENTORY_PATHS,
  verifyDocsStructure,
};
