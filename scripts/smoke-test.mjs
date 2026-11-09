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
console.log("PASS browser bundle syntax, selectors, versioning and strict CSP");
