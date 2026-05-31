# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # start dev server
npm run build     # production build
npm run start     # serve production build
npm run lint      # run ESLint (uses eslint CLI directly, NOT next lint)
```

No test framework is configured.

## Stack

- **Next.js 16.2.6** with App Router (`src/app/`)
- **React 19.2.4**; React Compiler is installed but currently disabled (`reactCompiler: false` in `next.config.ts`)
- **TypeScript** strict mode; path alias `@/*` → `./src/*`
- **Bootstrap 5.3** loaded via CDN `<link>` in `layout.tsx` (the `bootstrap` npm package is a dev dependency but Bootstrap is consumed from CDN, not imported)
- All styles live in `globals.css`; `page.module.css` exists but is not imported anywhere
- Thai fonts (Sarabun, Prompt, Noto Sans Thai) loaded via Google Fonts CDN `<link>` in `layout.tsx` — not via `next/font`
- **Lucide React** for icons; custom inline SVG for the Facebook icon

## App structure

- `src/app/page.tsx` — single-page marketing site (Thai language) for Jaturachok Group furniture company; sections: Hero, About, Services, Contact, Footer
- `src/app/login/page.tsx` — login form UI (`/login`); form submission is a no-op (no auth logic wired up)
- `src/app/layout.tsx` — loads fonts, Bootstrap, and overrides Bootstrap's `--bs-primary` / `--bs-secondary` CSS vars to brand colors (`#008864` green, `#ff991b` amber)
- `src/app/globals.css` — all global styles; defines brand CSS vars, navbar scroll-state classes (`.navbar-transparent` / `.navbar-scrolled`), scroll-triggered animation classes (`.anim-item` / `.anim-visible`), and mobile overlay nav

Brand colors: primary `#008864` (green), secondary `#ff991b` (amber), dark `#222222`.

## Next.js 16 breaking changes (vs. training data)

Before writing any routing, caching, or middleware code, read the relevant guide in `node_modules/next/dist/docs/`. Key changes from v15:

- **`middleware` → `proxy`**: The `middleware.ts` filename and `middleware` named export are deprecated. Use `proxy.ts` with a `proxy` export. The `edge` runtime is NOT supported in `proxy`; it runs Node.js only. Config keys like `skipMiddlewareUrlNormalize` are renamed to `skipProxyUrlNormalize`.
- **Async Request APIs are fully async** (no sync fallback): `cookies()`, `headers()`, `draftMode()`, and `params` in `layout`, `page`, `route`, `default`, and image-generation files must all be awaited.
- **`revalidateTag` requires a second `cacheLife` argument**: the single-argument form produces a TypeScript error.
- **ESLint**: `next lint` is removed; linting runs via the `eslint` CLI directly (see `eslint.config.mjs`).
- **Image defaults changed**: `minimumCacheTTL` now defaults to 4 hours, `16` removed from default `imageSizes`, `qualities` defaults to `[75]` only, local IP optimization blocked by default, local images with query strings require `images.localPatterns.search`.
- **Instant navigation**: if fixing slow client-side navigations, Suspense alone is not enough — export `unstable_instant` from the route. Read `node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md`.
