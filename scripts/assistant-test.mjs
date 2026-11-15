import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import worker from "../dist/server/index.js";

async function chat(prompt, history = [], { hotel = false, context = hotel ? "business" : "personal", email = "owner@hotelx.demo", origin } = {}) {
  const response = await worker.fetch(new Request("http://localhost" + (hotel ? "/api/hotels/aspan-city/assistant" : "/api/guest/assistant"), {
    method: "POST", headers: { "x-hotelx-preview-user": "assistant-qa", "oai-authenticated-user-email": email, "x-hotelx-context": context, "content-type": "application/json", ...(origin ? { origin } : {}) },
    body: JSON.stringify({ prompt, history })
  }), { HOTELX_LOCAL_PREVIEW: "1", HOTELX_PLATFORM_OWNER_EMAIL: "owner@hotelx.demo" });
  return { status: response.status, data: await response.json() };
}

const history = ["Алматы до 60 тысяч с завтраком"];
const first = await chat(history[0]);
assert.equal(first.status, 200);
assert.equal(first.data.mode, "demo");
assert.equal(first.data.parsed.budget, 60000);
assert.ok(first.data.cards.length);
assert.ok(first.data.hotels.every((h) => h.demo && h.city === "Алматы" && h.price <= 60000 && h.amenities.includes("Завтрак")));
const cheaper = await chat("А теперь до 40 тысяч", history);
assert.equal(cheaper.data.parsed.city, "Алматы");
assert.equal(cheaper.data.parsed.budget, 40000);
assert.deepEqual(cheaper.data.parsed.amenities, ["Завтрак"]);
assert.ok(cheaper.data.hotels.every((h) => h.price <= 40000));
const city = await chat("Теперь в Астане", history);
assert.equal(city.data.parsed.city, "Астана");
assert.equal(city.data.parsed.budget, 60000);
assert.ok(city.data.hotels.every((h) => h.city === "Астана"));
const none = await chat("Алматы до 1000 с бассейном");
assert.equal(none.data.hotels.length, 0);
assert.match(none.data.reply, /нет точных совпадений/);
const excluded = await chat("Без бассейна", ["Астана с бассейном"]);
assert.ok(excluded.data.hotels.length);
assert.ok(excluded.data.hotels.every((h) => !h.amenities.includes("Бассейн")));
const relaxed = await chat("Бассейн не обязателен", ["Астана с бассейном"]);
assert.deepEqual(relaxed.data.parsed.amenities, []);
const total = await chat("Посчитай на 3 ночи", history);
assert.ok(total.data.reply.includes(new Intl.NumberFormat("ru-RU").format(total.data.hotels[0].price * 3)));
const comparison = await chat("Сравни первые два", ["В Астане"]);
assert.ok(comparison.data.reply.includes(comparison.data.hotels[0].name));
assert.ok(comparison.data.reply.includes(comparison.data.hotels[1].name));
assert.match(comparison.data.reply, /Разница в цене/);
const unknown = await chat("Напиши стих про космос", history);
assert.match(unknown.data.reply, /нет надёжного ответа/);
assert.equal(unknown.data.cards.length, 0);
assert.equal(unknown.data.parsed.city, "Алматы");
const fresh = await chat("Начать заново", history);
assert.equal(fresh.data.parsed.city, "Казахстан");
assert.equal(fresh.data.parsed.budget, null);
assert.deepEqual(fresh.data.parsed.amenities, []);
assert.equal((await chat("", [])).status, 400);
assert.equal((await chat("a".repeat(2001))).status, 400);
assert.equal((await chat("Отель", Array(41).fill("Алматы"))).status, 400);
assert.equal((await chat("Отель", [{ from: "user", text: "Алматы" }])).status, 400);
assert.equal((await chat("Отель", [], { context: "business" })).status, 403);
assert.equal((await chat("Цены", [], { hotel: true, context: "personal" })).status, 403);
assert.equal((await chat("Цены", [], { hotel: true, email: "ordinary@example.com" })).status, 403);
assert.equal((await chat("Отель", [], { origin: "https://other.example" })).status, 403);
const forecast = await chat("Загрузка на 7 дней", [], { hotel: true });
assert.match(forecast.data.reply, /81%.*71–92%/);
const month = await chat("А на 30 дней?", ["Загрузка на 7 дней"], { hotel: true });
assert.match(month.data.reply, /на 30 дней/);
assert.notEqual(month.data.reply, forecast.data.reply);
const price = await chat("Повысить Standard на 10%", [], { hotel: true });
assert.match(price.data.reply.replace(/\s/g, ""), /40000₸\+10%=44000₸/);
const suite = await chat("А если повысить на 5%?", ["Какая цена Executive Suite?"], { hotel: true });
assert.match(suite.data.reply.replace(/\s/g, ""), /ExecutiveSuite:78000₸\+5%=81900₸/);
const noMutation = await chat("Примени цену", [], { hotel: true });
assert.match(noMutation.data.reply, /Чат не меняет тарифы/);
const occupancy = await chat("Какая загрузка на 7 дней", [], { hotel: true });
assert.equal(occupancy.data.mode, "demo");
const metrics = await chat("Покажи ADR и RevPAR", [], { hotel: true });
assert.match(metrics.data.reply, /32 838/);

const source = await readFile(new URL("../worker/app.js", import.meta.url), "utf8");
const context = { window: { matchMedia: () => ({ matches: true }), addEventListener() {} }, document: { addEventListener() {} }, location: { pathname: "/app/ai", search: "" }, URLSearchParams, Intl };
runInNewContext(source.replace(/\ninit\(\);\s*$/, "") + "\nglobalThis.qa = { state, renderGuestAi, renderHotelAi, renderExplore, renderSearchResults, resetAssistant };", context);
const qa = context.qa;
qa.state.hotels = first.data.hotels;
for (const html of [qa.renderExplore(), qa.renderSearchResults()]) {
  assert.doesNotMatch(html, /classic-city|city-filter|open-filters|name="budget"|data-amenity|sort-hotels/);
  assert.match(html, /ai-search-form/);
}
for (const html of [qa.renderGuestAi(), qa.renderHotelAi()]) {
  assert.match(html, /Деморежим/);
  assert.match(html, /без подключения к языковой модели/);
  assert.match(html, /role="log"/);
  assert.match(html, /maxlength="2000"/);
  assert.match(html, /Новый диалог/);
  assert.match(html, /aria-label="Отправить сообщение"/);
}
qa.state.aiMessages.push({ from: "user", text: '<img src=x onerror="alert(1)">' });
assert.ok(qa.renderGuestAi().includes("&lt;img"));
assert.ok(!qa.renderGuestAi().includes('<img src=x'));
qa.resetAssistant("guest");
assert.equal(qa.state.aiMessages.length, 1);
assert.equal(qa.state.searchResults, null);
console.log("PASS demo assistant multi-turn search, exclusions, maths, RBAC, validation, UI and escaping");
