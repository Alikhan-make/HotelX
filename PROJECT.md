# HotelX

HotelX is a Kazakhstan-focused hospitality platform with two server-protected contexts:

- Guest: nationwide demo catalogue, AI search, filters, compare, favorites, demo bookings and trips.
- Hotel owner: dashboard, reservations, rooms, pricing, forecast, recommendations, reports and verification.
- Platform admin: owner verification queue, document access and platform controls.

## Architecture

The project is a Cloudflare Worker ESM application with vanilla browser JavaScript and CSS. `worker/index.js` owns API routes, authentication/context checks, CSP and the HTML shell. `worker/app.js` owns the client router and views. `worker/styles.css` is the responsive design system. D1 migrations live in `drizzle/`; the build emits `dist/server/index.js` and packaged migrations.

## Data and demo boundaries

The public hotel catalogue is intentionally marked `catalogScope: "demo"` and every catalogue hotel has `demo: true`. Unsplash images, ratings, availability, owner analytics, forecasts and payment screens are presentation/demo data unless a route explicitly persists through D1. No external PMS, channel manager, payment gateway, map provider or 360° panorama source is connected.

Server-side context and permission checks remain authoritative. Guest requests cannot access hotel or admin APIs; hotel data is scoped by membership and permission.

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

