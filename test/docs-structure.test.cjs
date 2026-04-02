const test = require('node:test');
const assert = require('node:assert/strict');

const {
  REQUIRED_PAGES,
  MIN_MARKDOWN_COUNTS,
  REQUIRED_SOURCE_INVENTORY_PATHS,
  verifyDocsStructure,
} = require('../scripts/verify-docs-structure.cjs');

test('docs structure verification passes for the teaching site baseline', () => {
  const result = verifyDocsStructure();

  assert.equal(result.requiredPageCount, REQUIRED_PAGES.length);
  for (const [section, minCount] of Object.entries(MIN_MARKDOWN_COUNTS)) {
    assert.ok(result.sectionCounts[section] >= minCount, `${section} should have at least ${minCount} pages`);
  }
  for (const expectedPath of REQUIRED_SOURCE_INVENTORY_PATHS) {
    assert.ok(result.inventoryPaths.includes(expectedPath), `inventory should include ${expectedPath}`);
  }
});
