# HotelX

HotelX is a Kazakhstan-focused hospitality platform with two server-protected contexts:

- Guest: nationwide demo catalogue, conversational demo search, compare, favorites, demo bookings and trips. Manual search criteria and filters have been removed from the guest UI.
- Hotel owner: dashboard, reservations, rooms, pricing, forecast, recommendations, reports and verification.
- Platform admin: owner verification queue, document access and platform controls.

## Architecture

The project is a Cloudflare Worker ESM application with vanilla browser JavaScript and CSS. `worker/index.js` owns API routes, authentication/context checks, CSP and the HTML shell. `worker/app.js` owns the client router and views. `worker/styles.css` is the responsive design system. D1 migrations live in `drizzle/`; the build emits `dist/server/index.js` and packaged migrations.

## Data and demo boundaries

The public hotel catalogue is intentionally marked `catalogScope: "demo"` and every catalogue hotel has `demo: true`. Unsplash images, ratings, availability, owner analytics, forecasts and payment screens are presentation/demo data unless a route explicitly persists through D1. No external PMS, channel manager, payment gateway, map provider or 360° panorama source is connected.

Server-side context and permission checks remain authoritative. Guest requests cannot access hotel or admin APIs; hotel data is scoped by membership and permission.

## Demo assistants

Both `/app/ai` and `/hotel/ai` are explicitly labelled offline demonstrations, with no OpenAI API key, language model, or external AI service. `worker/demo-assistant.js` uses deterministic intent parsing and computations from the existing demo catalogue and hotel snapshots. It is bundled into the single Worker by `scripts/build.mjs`.

The guest assistant remembers city, nightly budget, amenities/exclusions, central location, party size and duration across up to 40 user turns. It returns matching hotel cards, comparisons and estimates, preserving constraints when no hotels match. Exploration and results use the same conversation; a new dialogue clears its state. Unknown topics get a limitation message. History lives in page memory until refresh and is not persisted.

The hotel assistant calculates 7/30/90-day demo forecast summaries, explains demo KPIs, compares room categories and calculates percentage price scenarios. It reads persisted Standard King price overrides and never applies changes from chat. Existing confirmation flows remain required. Business context, hotel membership and topic-specific permissions are checked server-side on every assistant request.

`scripts/assistant-test.mjs` checks multi-turn matching, comparisons, calculations, invalid input, role isolation and guest UI rendering. D1 tests verify persisted price awareness and restricted staff permissions.

## Local development

```bash
npm run dev
npm test
```

The local preview is served at `http://127.0.0.1:4173`. `npm test` builds first, then runs API/RBAC/CSP/catalog regression tests and D1 persistence tests.

## Current limitations / next milestones

1. Connect a real PMS/channel manager before presenting live availability or rates.
2. Add durable room/category CRUD and CSV import endpoints.
3. Add review ingestion from an approved source and a real forecast service.
4. Add real 360° assets; the current HotelX Virtual entry point is a clearly labelled photo-tour demo.
5. Complete translation coverage for Kazakh and English; Russian remains the default UI language.


## Vercel public demo target

`npm run build:vercel` produces `public/` and the ignored generated Worker module consumed by `api/entry.js`. `vercel.json` provides rewrites and strict security headers. This target injects a fixed public fixture identity, exposes guest, hotel and read-only platform demo views, opens the two-interface landing page at the root, and rejects all writes except conversational search and comparisons. The Vercel-only `/api/demo/platform/verifications` endpoint returns the static verification fixtures. Private administration endpoints and document downloads remain blocked. It has no D1/R2 binding or external secrets. The original Sites build and authentication checks remain unchanged. Generic frontend support displays a public-demo banner only when `/api/me` returns `publicDemo: true`. See README.md for deployment settings and limitations.

## Illustrative SaaS subscriptions

`/plans`, the landing page and `/hotel/subscription` show Starter, Pro and Enterprise plans in KZT. Annual billing applies an illustrative 20% discount and displays the entire annual amount. Selection, switching and cancellation require confirmation and persist only in namespaced browser localStorage for the fixture hotel. Prices, quotas and plan benefits are conceptual; there is no payment, automatic renewal, server subscription, or entitlement enforcement. No private API routes or permissions change. The hotel navigation entry uses MANAGE_SETTINGS. `scripts/subscription-test.mjs` checks quotes, rendering, confirmation, cancellation, invalid persisted values and unavailable browser storage.

The upper-right Profile button opens an account popover with “Подключить подписку”, linking to `/plans` from both guest and hotel views. The popover stays anchored at the top right for header buttons; the sidebar context switcher retains its bottom-left position. Selecting the plan link uses the existing router and closes the popover.
