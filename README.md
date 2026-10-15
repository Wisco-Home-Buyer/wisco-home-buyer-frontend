# WiscoHome Buyer Website

Public website for wiscohomebuyer.com, a Wisconsin cash home-buyer lead
generation business. Sellers get a cash offer through an 8-step form; investors
join the Buyers List and browse wholesale listings. Backend:
`wisco-home-buyer-server`.

## Stack

- **Next.js** (App Router), React, TypeScript, Tailwind CSS
- **Redux Toolkit (RTK Query)** for API calls, **GSAP** + Lenis for animation, **Leaflet** for maps

> This Next.js version has breaking changes from older releases. Read the guide in
> `node_modules/next/dist/docs/` before changing routing or data fetching.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/cash-offer` | Cash offer landing page |
| `/form` | 8-step seller intake wizard |
| `/wholesale` | Buyers List signup |
| `/wholesale-listings` | Public wholesale listings (server-rendered, always fresh) |
| `/wholesale-listings/[id]` | Listing detail: photo gallery with popup, YouTube/Vimeo embed, "I'm interested" form (available listings) |
| `/privacy-policy`, `/terms-of-service` | Legal |

Listings come from `GET /api/wholesale-listings/public`. Only listings marked
Public in the dashboard appear.

## Getting started

```bash
cp .env.example .env     # set NEXT_PUBLIC_API_URL to the API origin
npm install
npm run dev -- -p 3002   # the API uses 3000 and the dashboard 3001 by default
```

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks) |
| `npm start` | Run the production build |
| `npm run lint` | ESLint |

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API origin, no trailing slash. Required for production builds; also used for Next rewrites of `/api/*` |

Never put secrets in `NEXT_PUBLIC_*` variables: they are shipped to the browser.

## Project structure

```
src/
├── app/            # routes (form, cash-offer, wholesale, wholesale-listings, ...), sitemap, robots
├── components/     # shared layout (Navbar, Footer) and feature components
├── lib/            # helpers, wholesale listings fetch + formatting
└── store/          # RTK Query base API and per-feature endpoints
```

## Deployment

`output: "standalone"` Docker build. Set `NEXT_PUBLIC_API_URL` at build time. Add new
public routes to `src/app/sitemap.ts`.
