# Publishing the site

This repo is prepared for static publishing with VitePress.

## Local production build

```bash
npm install
npm run docs:build
```

The output goes to VitePress build artifacts and can be hosted on any static platform.

## GitHub Pages workflow

A GitHub Actions workflow is included at:

`/.github/workflows/deploy-docs.yml`

It builds the docs and publishes them to GitHub Pages.

## Base path behavior

The VitePress config reads:

- `DOCS_BASE` from the environment, or
- falls back to `/`

That means:

- local development works without special configuration,
- project-page deployment can set `DOCS_BASE=/<repo-name>/`.

## Recommended hosting choices

| Host | Why choose it |
| --- | --- |
| GitHub Pages | Good default for open-source documentation |
| Vercel | Fast previews and simple static hosting |
| Netlify | Easy branch previews and redirects |

## Before publishing

Run:

```bash
node scripts/verify-analysis.cjs
node --test test/analysis.test.cjs
npm run docs:build
```

## Recommendation

For a teaching repo like this, publish early and update often. The site structure is already stable enough to support incremental deep dives.
