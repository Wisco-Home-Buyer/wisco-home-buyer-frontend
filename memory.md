# Wisco Home Buyer — Frontend (public site)

## Project concept
Public website for wiscohomebuyer.com, a Wisconsin cash home-buyer lead-gen business. Sellers fill an 8-step wizard; cash buyers/investors join a Buyers List. Part of 3 repos: frontend (this), dashboard (CRM), server (NestJS API). Parent folder has `PROJECT_OVERVIEW.md` (Bangla/English full overview).

## Tech stack and architecture
Next.js App Router (breaking-change version, read `node_modules/next/dist/docs/` first), React, TypeScript, Tailwind, shadcn/base-ui, Redux Toolkit (RTK Query in `src/store/api/`), GSAP + Lenis, Leaflet (dynamic import), Sonner.
- Routes: `/` landing, `/cash-offer` (main CTA target), `/form` (wizard, robots-blocked), `/wholesale` (buyers list), `/privacy-policy`, `/terms-of-service`, sitemap/robots/OG.
- API calls go to `/api/*`, proxied by a `next.config.ts` rewrite to `NEXT_PUBLIC_API_URL`.

## Current state
Core pages, wizard, wholesale form, SEO metadata, sitemap done. Typecheck and lint clean.
Open items: compress `public/images` (about 19 MB of PNG), remove `unoptimized` on CTA/FAQ/Footer images, add analytics (GA4/Meta Pixel), add JSON-LD, verify stats/testimonials with client.

## Key decisions
- All CTAs point to `/cash-offer`, which routes to `/form`; `/form` stays out of the index.
- `NEXT_PUBLIC_API_URL` is required for production builds (build throws if missing). Dev falls back to `http://localhost:3000`.

## Conventions and gotchas
- Next image remote hosts are limited to `api.wiscohomebuyer.com` in `next.config.ts`.
- Wizard draft is stored in localStorage key `tygry8-form-data`.

## Setup and run
`cp .env.example .env`, `npm install`, `npm run dev`. Check: `npx tsc --noEmit`, `npm run lint`, `npm run build`. Deploy via Dokploy (Dockerfile, standalone output).

## Last updated
2026-10-14 — cleanup: sitemap adds /wholesale, robots path fixed, unused assets and dev image hosts removed, API URL made mandatory in production.
