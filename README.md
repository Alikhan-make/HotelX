# HotelX

Hotel search and hotel management demo for Kazakhstan, with conversational demo assistants in both interfaces. The assistants use deterministic local logic, not a language model. No API key is required.

## Deploy the public demo to Vercel

Import `Alikhan-make/HotelX`, branch `main`:

| Setting | Value |
| --- | --- |
| Project name | `hotelx` (or any available name) |
| Root directory | `./` |
| Framework / Application preset | Other |
| Build command | `npm run build:vercel` |
| Output directory | `public` |
| Install command | Default (`npm install`) |
| Environment variables | None |

`vercel.json` supplies the build command, output directory, routing and security headers. Leave dashboard overrides off, or use the exact values above. Click **Deploy**. If the project was imported earlier, deploy the latest `main` commit.

Demo entry points:

- `/app/ai` — traveller assistant and catalogue
- `/hotel/ai` — hotel owner assistant
- `/hotel/dashboard` — hotel demo dashboard

A persistent demo notice provides links to both assistants. No registration is needed. Everyone sees the same **fixture** hotel identity; this is not real authentication. Admin APIs and database writes are disabled. Bookings, tariff changes, verification uploads and other writes return a clear `DEMO_READ_ONLY` error. Do not upload personal documents. Chat history and browsing state stay in the browser; there is no connected database, PMS, payment provider or external AI service.

The adapter never imports Sites credentials, DB bindings, secrets, or real user data. Incoming identity headers are replaced with the fixed demo identity.

## Development and tests

Requires Node.js 22.13+ (for the SQLite regression tests), or Node.js 24.

```sh
npm test
npm run test:vercel
npm run dev
```

`npm run dev` previews the original Worker using a local fixture identity at `http://127.0.0.1:4173`. It is not a Vercel emulator. `test:vercel` builds and tests the Vercel request adapter directly; a hosted Vercel deployment must still be checked after publication.

## Deployment architecture

The existing Cloudflare/Sites build is preserved: `npm run build` emits `dist/server/index.js`, with D1/R2 configuration in `.openai/hosting.json`. The Vercel target adds a separate build, generates public browser assets into `public/`, and bundles the same Worker behind `api/entry.js`. Generated assets are excluded from Git and rebuilt during deployment. Details of the original app and demo data boundaries are in [PROJECT.md](PROJECT.md).

## Real hotels and 360-degree tours

The Vercel guest catalogue now lists Hotel Almaty, Hotel Uyut and City Stay Apart-Hotel with official sources, real hotel photographs and individual interactive tours. Open a card's **360°-тур** tab and click to load the provider's viewer; use the separate-window link if embedding fails. Rates, review scores and room availability are not fabricated. HotelX is not claiming a partnership or live booking integration. The owner dashboard remains an explicitly labelled independent demo.
