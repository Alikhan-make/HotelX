import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import entry from "../api/entry.js";

async function call(path, { method = "GET", context = "personal", body, origin } = {}) {
  const url = new URL("https://hotelx-demo.example/api/entry");
  url.searchParams.set("__hotelx_path", path);
  const response = await entry.fetch(new Request(url, {
    method, headers: { "x-hotelx-context": context, "content-type": "application/json", "oai-authenticated-user-id": "forged-admin", ...(origin ? { origin } : {}) }, body: body ? JSON.stringify(body) : undefined
  }));
  return response;
}
const me = await (await call("/api/me")).json();
assert.equal(me.publicDemo, true);
assert.equal(me.user.id, "public-demo-visitor");
assert.deepEqual(me.contexts.map((x) => x.id), ["personal", "business"]);
for (const path of ["/", "/app/ai", "/hotel/ai", "/hotel/dashboard", "/app/search", "/login", "/register"]) {
  const res = await call(path);
  assert.equal(res.status, 200, path);
  assert.match(res.headers.get("content-type"), /text\/html/);
}
const assets = await call("/assets/app.js");
assert.equal(assets.status, 200);
assert.match(await assets.text(), /public-demo-banner/);
const hotels = await (await call("/api/guest/hotels")).json();
assert.ok(hotels.hotels.length > 0);
assert.ok(hotels.hotels.every((h) => h.demo));
let res = await call("/api/guest/assistant", { method: "POST", body: { prompt: "Алматы до 60 тысяч с завтраком" } });
assert.equal(res.status, 200);
let answer = await res.json();
assert.equal(answer.mode, "demo");
assert.ok(answer.hotels.every((h) => h.city === "Алматы"));
res = await call("/api/hotels/aspan-city/assistant", { method: "POST", context: "business", body: { prompt: "Загрузка на 7 дней" } });
assert.equal(res.status, 200);
assert.match((await res.json()).reply, /81%/);
assert.equal((await call("/api/hotels/aspan-city/assistant", { method: "POST", body: { prompt: "Цены" } })).status, 403);
assert.equal((await call("/api/guest/assistant", { method: "POST", origin: "https://other.example", body: { prompt: "Отель" } })).status, 403);
for (const path of ["/api/bookings", "/api/applications", "/api/hotels/aspan-city/recommendations/price-weekend/apply", "/api/verifications/VR-1028/documents/identity", "/api/admin/verifications/VR-1028/approve"]) {
  res = await call(path, { method: "POST", context: "business", body: {} });
  assert.equal(res.status, 403, path);
  assert.equal((await res.json()).error, "DEMO_READ_ONLY");
}
assert.equal((await call("/api/admin/verifications", { context: "platform" })).status, 403);
assert.equal((await call("/signin-with-chatgpt")).status, 302);
assert.equal((await call("/admin/dashboard")).status, 302);
assert.equal((await call("/assets/missing.js")).status, 404);
for (const file of ["public/index.html", "public/assets/app.js", "public/assets/styles.css", "public/favicon.svg", "vercel/worker.generated.js"]) await access(new URL("../" + file, import.meta.url));
const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url)));
assert.equal(config.outputDirectory, "public");
assert.equal(config.buildCommand, "npm run build:vercel");
assert.ok(config.headers[0].headers.find((x) => x.key === "Content-Security-Policy").value.includes("script-src 'self'"));
console.log("PASS Vercel fixture identity, both assistants, role isolation, read-only mutations, routing, static assets and CSP");
