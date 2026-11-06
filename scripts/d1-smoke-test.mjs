import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import worker from "../dist/server/index.js";

class D1Statement {
  constructor(database, sql) { this.database = database; this.sql = sql; this.values = []; }
  bind(...values) { this.values = values; return this; }
  run() { const result = this.database.prepare(this.sql).run(...this.values); return Promise.resolve({ success: true, meta: { changes: result.changes } }); }
  first() { return Promise.resolve(this.database.prepare(this.sql).get(...this.values) || null); }
  all() { return Promise.resolve({ success: true, results: this.database.prepare(this.sql).all(...this.values) }); }
}

class TestD1 {
  constructor(database) { this.database = database; }
  prepare(sql) { return new D1Statement(this.database, sql); }
  async batch(statements) {
    this.database.exec("BEGIN");
    try {
      const results = [];
      for (const statement of statements) results.push(await statement.run());
      this.database.exec("COMMIT");
      return results;
    } catch (error) {
      this.database.exec("ROLLBACK");
      throw error;
    }
  }
}

class TestBucket {
  constructor() { this.objects = new Map(); }
  async put(key, value) { this.objects.set(key, value instanceof ArrayBuffer ? new Uint8Array(value) : value); }
  async get(key) { const value = this.objects.get(key); return value ? { body: value } : null; }
}

const database = new DatabaseSync(":memory:");
database.exec(await readFile(new URL("../drizzle/0000_hotelx_core.sql", import.meta.url), "utf8"));
database.exec(await readFile(new URL("../drizzle/0001_nightly_room_inventory.sql", import.meta.url), "utf8"));
const env = { DB: new TestD1(database), BUCKET: new TestBucket(), HOTELX_PLATFORM_OWNER_EMAIL: "owner@hotelx.demo" };

async function call(path, { method = "GET", context = "personal", body, userId = "owner-user", email = "owner@hotelx.demo", contentType } = {}) {
  const headers = new Headers({ "x-hotelx-preview-user": userId, "oai-authenticated-user-email": email, "x-hotelx-context": context });
  if (body) headers.set("content-type", contentType || "application/json");
  const response = await worker.fetch(new Request(`http://localhost${path}`, { method, headers, body }), env);
  const responseType = response.headers.get("content-type") || "";
  return { status: response.status, payload: responseType.includes("application/json") ? await response.json() : await response.arrayBuffer() };
}

const owner = await call("/api/me");
if (owner.status !== 200 || owner.payload.contexts.length !== 3) throw new Error("Owner contexts were not provisioned");

const ordinaryOptions = { userId: "guest-user", email: "guest@example.com" };
const ordinary = await call("/api/me", ordinaryOptions);
if (ordinary.status !== 200 || ordinary.payload.contexts.length !== 1) throw new Error("Ordinary user received privileged context");

const application = await call("/api/applications", { ...ordinaryOptions, method: "POST", body: JSON.stringify({ hotelName: "Demo River Hotel", phone: "+7 700 111 22 33", rooms: 24 }) });
if (application.status !== 201) throw new Error("Application was not persisted");

const documentUpload = await call(`/api/verifications/${application.payload.application.id}/documents/identity`, { ...ordinaryOptions, method: "POST", body: new TextEncoder().encode("demo-pdf"), contentType: "application/pdf" });
if (documentUpload.status !== 201) throw new Error("Protected document upload failed");
for (const kind of ["business", "ownership"]) {
  const upload = await call(`/api/verifications/${application.payload.application.id}/documents/${kind}`, { ...ordinaryOptions, method: "POST", body: new TextEncoder().encode("demo-pdf"), contentType: "application/pdf" });
  if (upload.status !== 201) throw new Error(`Protected ${kind} document upload failed`);
}

const queue = await call("/api/admin/verifications", { context: "platform" });
if (!queue.payload.verifications.some((item) => item.id === application.payload.application.id)) throw new Error("Persisted application is missing from admin queue");
const protectedDownload = await call(`/api/admin/verifications/${application.payload.application.id}/documents/identity`, { context: "platform" });
if (protectedDownload.status !== 200 || protectedDownload.payload.byteLength === 0) throw new Error("Admin document download failed");

const approval = await call(`/api/admin/verifications/${application.payload.application.id}/approve`, { context: "platform", method: "POST", body: "{}" });
if (approval.status !== 200 || approval.payload.status !== "APPROVED") throw new Error("Approval transaction failed");
const terminalReject = await call(`/api/admin/verifications/${application.payload.application.id}/reject`, { context: "platform", method: "POST", body: JSON.stringify({ reviewNote: "Поздний отказ" }) });
if (terminalReject.status !== 409) throw new Error("Approved verification was not treated as terminal");
const terminalResubmit = await call("/api/verifications/me/resubmit", { ...ordinaryOptions, method: "POST", body: "{}" });
if (terminalResubmit.status !== 409) throw new Error("Approved applicant could resubmit a terminal request");

const promoted = await call("/api/me", ordinaryOptions);
if (!promoted.payload.contexts.some((context) => context.role === "HOTEL_OWNER")) throw new Error("Approved applicant did not receive hotel membership");

const booking = await call("/api/bookings", { ...ordinaryOptions, method: "POST", body: JSON.stringify({ hotelId: "aspan-city", roomId: "aspan-standard", guests: 2, nights: 3 }) });
if (booking.status !== 201 || booking.payload.booking.nights !== 3) throw new Error("Booking persistence or server-side date calculation failed");
const trips = await call("/api/trips", ordinaryOptions);
if (!trips.payload.trips.some((trip) => trip.id === booking.payload.booking.id)) throw new Error("Persisted booking is missing from trips");
for (let index = 0; index < 4; index += 1) {
  const extraBooking = await call("/api/bookings", { ...ordinaryOptions, method: "POST", body: JSON.stringify({ hotelId: "aspan-city", roomId: "aspan-standard", guests: 2, checkIn: "2026-11-07", checkOut: "2026-11-10" }) });
  if (extraBooking.status !== 201) throw new Error("Inventory rejected an available room");
}
const soldOut = await call("/api/bookings", { ...ordinaryOptions, method: "POST", body: JSON.stringify({ hotelId: "aspan-city", roomId: "aspan-standard", guests: 2, checkIn: "2026-11-07", checkOut: "2026-11-10" }) });
if (soldOut.status !== 409) throw new Error("Overbooking protection did not reject the sixth booking");
const overlappingSoldOut = await call("/api/bookings", { ...ordinaryOptions, method: "POST", body: JSON.stringify({ hotelId: "aspan-city", roomId: "aspan-standard", guests: 2, checkIn: "2026-11-08", checkOut: "2026-11-09" }) });
if (overlappingSoldOut.status !== 409) throw new Error("Overlapping-date overbooking was not rejected");
const invalidDate = await call("/api/bookings", { ...ordinaryOptions, method: "POST", body: JSON.stringify({ hotelId: "aspan-city", roomId: "aspan-deluxe", guests: 2, checkIn: "2026-02-30", checkOut: "2026-03-02" }) });
if (invalidDate.status !== 400) throw new Error("Invalid calendar date was normalized instead of rejected");

const price = await call("/api/hotels/aspan-city/recommendations/price-weekend/apply", { context: "business", method: "POST", body: "{}" });
if (price.status !== 200) throw new Error("Price override failed");
const dashboard = await call("/api/hotels/aspan-city/dashboard", { context: "business" });
if (!dashboard.payload.dashboard.recommendation.applied) throw new Error("Applied price was not persisted");

const auditCount = database.prepare("SELECT count(*) AS count FROM audit_events").get().count;
if (auditCount < 4) throw new Error("Audit trail is incomplete");

console.log("PASS D1 persistence, RBAC, approval transaction, booking, pricing and audit");
database.close();
