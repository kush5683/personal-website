# personal-website

This repository is of my personal website hosted at https://kushshah.net 

I use it to learn basic web development.

## Deploying to Cloudflare Workers

This repo is configured to deploy the static site in `public/` via Cloudflare Workers using Wrangler's Assets.

Prereqs:
- Node.js 18+
- Cloudflare account with `wrangler` authenticated: `npx wrangler login`

Scripts:
- `npm run dev` — run locally on a Workers sandbox
- `npm run build` — produce a build artifact in `dist/` (dry-run)
- `npm run deploy` — deploy to your Cloudflare account

Config:
- `wrangler.toml` sets the assets directory and worker entry (`src/worker.js`).
- To bind a custom domain, add a `routes` entry in `wrangler.toml` after you attach a zone.
