#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const requiredFiles = [
  'research/claude-code-teaching-site-analysis.json',
  'research/claude-code-teaching-site-analysis.md',
  'docs/reference-analysis.md',
  'docs/site-information-architecture.md',
];

for (const rel of requiredFiles) {
  const full = path.join(process.cwd(), rel);
  if (!fs.existsSync(full)) {
    console.error(`Missing required analysis artifact: ${rel}`);
    process.exit(1);
  }
}

const json = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), 'research/claude-code-teaching-site-analysis.json'),
    'utf8',
  ),
);

if (!Array.isArray(json.audiences) || json.audiences.length < 3) {
  console.error('Analysis JSON must include at least three audiences.');
  process.exit(1);
}

if (json.site_model?.language !== 'english-first-with-chinese-support') {
  console.error('Unexpected language strategy in analysis JSON.');
  process.exit(1);
}

console.log('analysis artifacts verified');
