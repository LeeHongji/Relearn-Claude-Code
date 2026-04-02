const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('research JSON is present and parseable', () => {
  const raw = fs.readFileSync(
    'research/claude-code-teaching-site-analysis.json',
    'utf8',
  );
  const data = JSON.parse(raw);
  assert.equal(data.title, 'Claude Code teaching site analysis');
  assert.ok(data.reference_roles['claude-code']);
});

test('maintainer docs exist', () => {
  assert.ok(fs.existsSync('docs/reference-analysis.md'));
  assert.ok(fs.existsSync('docs/site-information-architecture.md'));
});
