import worker from "../dist/server/index.js";

async function call(path, { method = "GET", context = "personal", body, origin, email = "owner@hotelx.demo" } = {}) {
  const headers = new Headers({ "x-hotelx-preview-user": "qa-user", "oai-authenticated-user-email": email, "x-hotelx-context": context });
  if (body) headers.set("content-type", "application/json");
  if (origin) headers.set("origin", origin);
  const response = await worker.fetch(new Request(`http://localhost${path}`, { method, headers, body }), { HOTELX_PLATFORM_OWNER_EMAIL: "owner@hotelx.demo", HOTELX_LOCAL_PREVIEW: "1" });
  return response.status;
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
