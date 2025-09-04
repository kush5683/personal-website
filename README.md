# personal-website

This repository is of my personal website hosted at https://kushshah.net 

I use it to learn basic web development.

## Deploying to Cloudflare Workers

This repo is configured to deploy the static site in `public/` via Cloudflare Workers using Wrangler's Assets.

Prereqs:
- Node.js 18+
- Cloudflare account with `wrangler` authenticated: `npx wrangler login`

Scripts:
- `npm run dev` — Vite dev server for the React app (served at `/react/`)
- `npm run dev:worker` — build then run the Worker locally, serving React at `/`
- `npm run build` — build React to `public/react/`
- `npm run deploy:worker` — deploy Worker to production (binds `kushshah.net/*`)

Config:
- `wrangler.toml` sets the assets directory and worker entry (`src/worker.js`).
- Routes are configured under the `production` env; the deploy script uses `--env production` to bind `kushshah.net/*`.
