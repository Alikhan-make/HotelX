# HotelX agent notes

Preserve the existing Cloudflare Worker architecture. Do not replace the project with a new framework or remove existing routes. Build with `npm run build`; validate with `npm test` before publishing.

Important invariants:

- Keep `.openai/hosting.json` project identity and D1/R2 bindings unchanged.
- Keep strict CSP; never add `unsafe-inline` to `script-src` and never expose secrets in frontend code.
- Use `selectedContext()` and server-side permission checks for every private mutation/read.
- Public hotels and AI search must return only explicitly marked demo catalogue data until a real provider is connected.
- Keep `$` as `querySelector` and `$$` as `querySelectorAll` in `worker/app.js`.
- Use the Sites publishing workflow for production changes. Preserve the existing owner-only audience.

When adding a feature, update `PROJECT.md`, add a regression test in `scripts/`, run the build and D1 tests, and document demo-only behavior in the UI.

