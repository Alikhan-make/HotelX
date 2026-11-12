import assert from "node:assert/strict";
import { Script } from "node:vm";
import worker from "../dist/server/index.js";

async function request(path, { method = "GET", context = "personal", body, origin, email = "owner@hotelx.demo" } = {}) {
  const headers = new Headers({ "x-hotelx-preview-user": "qa-user", "oai-authenticated-user-email": email, "x-hotelx-context": context });
  if (body) headers.set("content-type", "application/json");
  if (origin) headers.set("origin", origin);
  return worker.fetch(new Request(`http://localhost${path}`, { method, headers, body }), { HOTELX_PLATFORM_OWNER_EMAIL: "owner@hotelx.demo", HOTELX_LOCAL_PREVIEW: "1" });
}

async function call(path, options) {
  return (await request(path, options)).status;
}

const checks = [
  ["identity", await call("/api/me"), 200],
  ["guest search", await call("/api/guest/hotels"), 200],
  ["guest cannot view dashboard", await call("/api/hotels/aspan-city/dashboard"), 403],
  ["business dashboard", await call("/api/hotels/aspan-city/dashboard", { context: "business" }), 200],
  ["ownership isolation", await call("/api/hotels/other-hotel/dashboard", { context: "business" }), 404],
  ["admin verification", await call("/api/admin/verifications", { context: "platform" }), 200],
  ["ordinary user cannot self-assign admin", await call("/api/admin/verifications", { context: "platform", email: "ordinary@example.com" }), 403],
  ["booking", await call("/api/bookings", { method: "POST", body: JSON.stringify({ hotelId: "aspan-city", roomId: "aspan-standard", nights: 3 }) }), 201],
  ["cross-origin write", await call("/api/bookings", { method: "POST", body: "{}", origin: "https://evil.example" }), 403]
];

let failed = 0;
for (const [name, actual, expected] of checks) {
  const ok = actual === expected;
  if (!ok) failed += 1;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}: ${actual}`);
}
if (failed) process.exit(1);

const catalogResponse = await request("/api/guest/hotels");
assert.equal(catalogResponse.status, 200);
const catalog = await catalogResponse.json();
assert.equal(catalog.catalogScope, "demo", "Expanded catalogue must stay explicitly marked as demo data");
assert.ok(catalog.hotels.length >= 10, "Kazakhstan catalogue must contain at least ten hotels");
assert.ok(new Set(catalog.hotels.map((hotel) => hotel.city)).size >= 8, "Kazakhstan catalogue must cover at least eight cities");
assert.equal(new Set(catalog.hotels.map((hotel) => hotel.id)).size, catalog.hotels.length, "Catalogue hotel ids must be unique");
assert.ok(catalog.hotels.every((hotel) => hotel.demo === true), "Every catalogue hotel must be marked as demo data");

const almatyResponse = await request(`/api/guest/hotels?city=${encodeURIComponent("Алматы")}`);
assert.equal(almatyResponse.status, 200);
const almatyCatalog = await almatyResponse.json();
assert.ok(almatyCatalog.hotels.length > 0, "Almaty filter must return matching hotels");
assert.ok(almatyCatalog.hotels.every((hotel) => hotel.city === "Алматы"), "City filter must not leak hotels from other cities");

const combinedResponse = await request(`/api/guest/hotels?city=${encodeURIComponent("Алматы")}&budget=60000&amenity=${encodeURIComponent("Завтрак")}`);
assert.equal(combinedResponse.status, 200);
const combinedCatalog = await combinedResponse.json();
assert.ok(combinedCatalog.hotels.length > 0, "Combined city, budget and amenity filter must return a match");
assert.ok(combinedCatalog.hotels.every((hotel) => hotel.city === "Алматы" && hotel.price <= 60000 && hotel.amenities.includes("Завтрак")), "Combined filters must all be enforced");

for (const [prompt, expectedCity] of [
  ["Hotel in Almaty with breakfast", "Алматы"],
  ["Отель в Ақтау с бассейном", "Актау"],
  ["Гостиница в Караганде", "Караганда"],
  ["Қонақ үй Нұр Сұлтан", "Астана"]
]) {
  const aiResponse = await request("/api/guest/ai-search", { method: "POST", body: JSON.stringify({ prompt }) });
  assert.equal(aiResponse.status, 200);
  const aiSearch = await aiResponse.json();
  assert.equal(aiSearch.parsed.city, expectedCity, `AI search must canonicalize ${prompt}`);
  assert.ok(aiSearch.hotels.length > 0, `AI search must find a hotel for ${expectedCity}`);
  assert.ok(aiSearch.hotels.every((hotel) => hotel.city === expectedCity), "AI city search must not expand back to the nationwide catalogue");
}

const formattedBudgetResponse = await request("/api/guest/ai-search", { method: "POST", body: JSON.stringify({ prompt: "Hotel in Almaty budget 70,000 with spa" }) });
assert.equal(formattedBudgetResponse.status, 200);
const formattedBudgetSearch = await formattedBudgetResponse.json();
assert.equal(formattedBudgetSearch.parsed.budget, 70000, "AI search must normalize formatted English budgets");
assert.deepEqual(formattedBudgetSearch.parsed.amenities, ["Спа"], "AI search must recognize spa without ASCII word-boundary assumptions");
assert.ok(formattedBudgetSearch.hotels.length > 0 && formattedBudgetSearch.hotels.every((hotel) => hotel.city === "Алматы" && hotel.price <= 70000 && hotel.amenities.includes("Спа")), "Parsed AI constraints must all be enforced");
const negativeSpaResponse = await request("/api/guest/ai-search", { method: "POST", body: JSON.stringify({ prompt: "Отель в Алматы без спа" }) });
assert.equal(negativeSpaResponse.status, 200);
const negativeSpaSearch = await negativeSpaResponse.json();
assert.deepEqual(negativeSpaSearch.parsed.amenities, [], "Negative spa preference must not become a positive filter");
const thanksResponse = await request("/api/guest/ai-search", { method: "POST", body: JSON.stringify({ prompt: "Спасибо, отель в Алматы" }) });
assert.equal(thanksResponse.status, 200);
assert.deepEqual((await thanksResponse.json()).parsed.amenities, [], "The word Спасибо must not trigger the spa filter");

assert.equal(await call("/api/guest/hotels/not-a-real-hotel"), 404, "Unknown hotel slug must return 404");
assert.equal(await call("/api/bookings", { method: "POST", body: JSON.stringify({ hotelId: "caspian-breeze", roomId: "caspian-sea-view", guests: 2 }) }), 201, "A room from the expanded catalogue must be bookable");
console.log("PASS nationwide demo catalogue, combined filters, aliases, detail 404 and expanded booking");

const rootResponse = await request("/");
assert.equal(rootResponse.status, 200);
const csp = rootResponse.headers.get("content-security-policy") || "";
const html = await rootResponse.text();
assert.match(csp, /(?:^|;)\s*script-src 'self'(?:;|$)/, "CSP must allow only same-origin application scripts");
assert.doesNotMatch(csp, /script-src[^;]*'unsafe-inline'/, "CSP must not allow inline scripts");
assert.match(csp, /script-src-attr 'none'/, "Inline script handlers must be disabled");
assert.doesNotMatch(html, /\son[a-z]+\s*=/i, "HTML must not contain inline event handlers");
const scriptTags = [...html.matchAll(/<script\b([^>]*)><\/script>/gi)];
assert.equal(scriptTags.length, 1, "Page must contain exactly one application script");
const scriptSrc = /\bsrc="([^"]+)"/i.exec(scriptTags[0][1])?.[1];
assert.match(scriptSrc || "", /^\/assets\/app\.js\?v=[a-f0-9]{12}$/);

const appResponse = await request(scriptSrc);
assert.equal(appResponse.status, 200);
const appSource = await appResponse.text();
new Script(appSource, { filename: "assets/app.js" });
assert.equal((appSource.match(/const \$ =/g) || []).length, 1, "Single-selector helper must be declared once");
assert.equal((appSource.match(/const \$\$ =/g) || []).length, 1, "Multi-selector helper must survive bundling");
assert.match(appSource, /function openVirtualTour\(/, "Hotel detail must expose the demo virtual-tour flow");
assert.match(appSource, /data-action="open-tour"/, "Virtual-tour trigger must be wired to an action");
console.log("PASS browser bundle syntax, selectors, versioning and strict CSP");
