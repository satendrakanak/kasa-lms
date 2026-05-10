# Kasa LMS Theme

Static LMS theme package.

## Versions

- `nextjs-version/` - Next.js, React, TypeScript, Tailwind CSS

## Run

```bash
cd nextjs-version
bun install
bun run dev
```

Open `http://localhost:3000`.

## Build

```bash
cd nextjs-version
bun run build
```

## Static Data

All demo content is served from:

```txt
nextjs-version/lib/static-api.ts
```

The UI keeps the existing public pages, learner dashboard, admin dashboard, faculty dashboard, course pages, article pages, cart, checkout, certificates, orders, and settings screens connected to static demo data.
