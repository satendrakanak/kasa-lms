# Vercel Demo Deployment

## Project

KASA LMS - Modern Next.js Learning Management System & Admin Dashboard

## Deploy Directory

Deploy from:

```bash
nextjs-version
```

## Production Deploy Command

```bash
npx vercel --prod --yes
```

If the Vercel CLI reports an invalid token, refresh auth first:

```bash
npx vercel login
```

Then run the production deploy command again from `nextjs-version`.

## Recommended Vercel Settings

- Framework Preset: Next.js
- Root Directory: `nextjs-version`
- Build Command: `bun run build`
- Install Command: `bun install`
- Output Directory: leave default

## Demo Notes

The theme runs with static demo data and does not require Docker, a backend server, a payment gateway, or API keys for the public preview.
