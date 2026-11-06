const STYLES = "__HOTELX_STYLES__";
const APP_JS = "__HOTELX_APP_JS__";

const HOTELS = [
  {
    id: "aspan-city", name: "Aspan City Hotel", location: "Есильский район · рядом с Ботаническим садом", address: "ул. Акмешит, 17, Астана",
    distance: 2.1, rating: 4.8, reviews: 624, price: 44000, match: 94, type: "City hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=84"],
    description: "Современный городской отель с тихими номерами, панорамным видом и быстрым доступом к деловому центру Астаны.",
    amenities: ["Wi-Fi", "Завтрак", "Парковка", "Фитнес-зал", "Ресторан", "Трансфер"],
    matchReason: "Лучшее соответствие: укладывается в бюджет, находится близко к центру и включает завтрак, парковку и фитнес-зал.",
    pros: ["8 минут до центра", "Завтрак включён", "Высокая оценка гостей"], cons: ["Нет бассейна"],
    rooms: [
      { id: "aspan-standard", type: "Standard King", guests: 2, bed: "1 кровать King", price: 44000, left: 5, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=82", amenities: ["Wi-Fi", "Рабочая зона", "Кондиционер", "Завтрак"] },
      { id: "aspan-deluxe", type: "Deluxe City View", guests: 2, bed: "1 кровать King", price: 52000, left: 2, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=82", amenities: ["Панорамный вид", "Кофемашина", "Поздний выезд"] }
    ]
  },
  {
    id: "nomad-garden", name: "Nomad Garden Astana", location: "Левый берег · квартал Expo", address: "пр. Ұлы Дала, 41, Астана",
    distance: 3.4, rating: 4.7, reviews: 418, price: 48000, match: 91, type: "Spa hotel",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=84"],
    description: "Уютный отель в природной стилистике с крытым бассейном, спа-зоной и семейными номерами.",
    amenities: ["Wi-Fi", "Бассейн", "Спа", "Завтрак", "Парковка", "Ресторан"],
    matchReason: "Сильный вариант для спокойного отдыха: соответствует бюджету, имеет бассейн и получает высокие оценки за сервис.",
    pros: ["Бассейн и спа", "Тихий район", "Подходит для семей"], cons: ["Немного дальше от центра"],
    rooms: [
      { id: "nomad-comfort", type: "Comfort Twin", guests: 2, bed: "2 односпальные кровати", price: 48000, left: 4, image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=900&q=82", amenities: ["Wi-Fi", "Бассейн", "Кондиционер", "Завтрак"] },
      { id: "nomad-family", type: "Family Suite", guests: 4, bed: "King и диван", price: 68000, left: 2, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=82", amenities: ["Гостиная", "Мини-кухня", "Спа"] }
    ]
  },
  {
    id: "qala-grand", name: "Qala Grand", location: "Деловой центр · Мәңгілік Ел", address: "пр. Мәңгілік Ел, 32, Астана",
    distance: 1.3, rating: 4.6, reviews: 792, price: 56000, match: 87, type: "Business hotel",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=84"],
    description: "Премиальный бизнес-отель рядом с ключевыми офисами и городскими достопримечательностями.",
    amenities: ["Wi-Fi", "Завтрак", "Фитнес-зал", "Переговорные", "Ресторан", "Консьерж"],
    matchReason: "Самое удобное расположение и сильная деловая инфраструктура, но цена немного выше указанного бюджета.",
    pros: ["Ближе всего к центру", "Для деловой поездки", "Сервис 24/7"], cons: ["Выше бюджета", "Платная парковка"],
    rooms: [
      { id: "qala-business", type: "Business Queen", guests: 2, bed: "1 кровать Queen", price: 56000, left: 6, image: "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=82", amenities: ["Рабочее место", "Кофемашина", "Завтрак"] },
      { id: "qala-executive", type: "Executive Suite", guests: 3, bed: "King и диван", price: 82000, left: 1, image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=82", amenities: ["Гостиная", "Панорамный вид", "Lounge"] }
    ]
  },
  {
    id: "saryarka-loft", name: "Saryarka Loft Hotel", location: "Старый центр · набережная Есиля", address: "ул. Сарыарқа, 8, Астана",
    distance: 2.8, rating: 4.5, reviews: 356, price: 36000, match: 82, type: "Boutique hotel",
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1400&q=86",
    gallery: ["https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?auto=format&fit=crop&w=1600&q=86", "https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=900&q=84", "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=900&q=84"],
    description: "Небольшой дизайн-отель с локальным характером, кафе и удобным доступом к исторической части города.",
    amenities: ["Wi-Fi", "Кафе", "Парковка", "Коворкинг", "Прачечная"],
    matchReason: "Самый выгодный вариант: заметно дешевле бюджета и рядом с набережной, но набор услуг меньше, чем у лидеров.",
    pros: ["Лучшая цена", "Атмосферный интерьер", "Рядом с набережной"], cons: ["Завтрак отдельно", "Нет фитнес-зала"],
    rooms: [
      { id: "saryarka-loft-room", type: "Loft Double", guests: 2, bed: "1 двуспальная кровать", price: 36000, left: 3, image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&w=900&q=82", amenities: ["Wi-Fi", "Рабочая зона", "Чайная станция"] },
      { id: "saryarka-studio", type: "Corner Studio", guests: 2, bed: "1 кровать Queen", price: 42000, left: 2, image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=82", amenities: ["Мини-кухня", "Вид на город", "Поздний выезд"] }
    ]
  }
];

const DASHBOARD = {
  hotel: { id: "aspan-city", name: "Aspan City Hotel" },
  kpis: { occupancy: 78, revenue: 28400000, adr: 42100, revpar: 32838, reservations: 164, forecast: 84 },
  occupancySeries: [62, 66, 64, 71, 73, 76, 78, 82, 81, 86, 88, 84], revenueSeries: [1.6, 1.9, 1.7, 2.2, 2.4, 2.1, 2.8, 3.0, 2.7, 3.3, 3.1, 3.6],
  insight: { title: "Спрос на выходные вырос на 18%", text: "Темп бронирований на 7–8 ноября выше обычного, а доступность Standard King быстро сокращается." },
  recommendation: { id: "price-weekend", room: "Standard King", currentPrice: 40000, recommendedPrice: 44000, change: 10, impact: 200000, demand: "HIGH", from: "7 ноя", to: "8 ноя" }
};

const RESERVATIONS = [
  { id: "HX-260184", guest: "Дана К.", room: "512 · Deluxe City View", checkIn: "7 ноя", checkOut: "10 ноя", price: 156000, status: "CONFIRMED", channel: "HotelX" },
  { id: "HX-260185", guest: "Тимур С.", room: "304 · Standard King", checkIn: "6 ноя", checkOut: "8 ноя", price: 88000, status: "CHECKED_IN", channel: "Direct" },
  { id: "HX-260186", guest: "Алина М.", room: "410 · Standard King", checkIn: "8 ноя", checkOut: "11 ноя", price: 132000, status: "CONFIRMED", channel: "HotelX" },
  { id: "HX-260187", guest: "Ержан А.", room: "218 · Standard King", checkIn: "9 ноя", checkOut: "10 ноя", price: 44000, status: "PENDING", channel: "Corporate" },
  { id: "HX-260188", guest: "Мария Л.", room: "602 · Deluxe City View", checkIn: "12 ноя", checkOut: "15 ноя", price: 156000, status: "CONFIRMED", channel: "Booking Partner" },
  { id: "HX-260179", guest: "Арман Т.", room: "316 · Standard King", checkIn: "5 ноя", checkOut: "7 ноя", price: 80000, status: "CANCELLED", channel: "HotelX" }
];

const ROOMS = [
  { number: "218", type: "Standard King", status: "Available", price: 44000, occupancy: "—" },
  { number: "304", type: "Standard King", status: "Occupied", price: 44000, occupancy: "Тимур С." },
  { number: "316", type: "Standard King", status: "Cleaning", price: 44000, occupancy: "—" },
  { number: "410", type: "Standard King", status: "Available", price: 44000, occupancy: "—" },
  { number: "512", type: "Deluxe City View", status: "Occupied", price: 52000, occupancy: "Дана К." },
  { number: "602", type: "Deluxe City View", status: "Maintenance", price: 52000, occupancy: "—" }
];

const VERIFICATIONS = [
  { id: "VR-1028", applicant: "Айдана Н.", email: "aidana.n@example.com", phone: "+7 700 000 00 01", hotel: "Aurora Park Hotel", address: "Астана, улица Демо, 12", website: "aurora-park.example", rooms: 86, country: "Казахстан", submitted: "5 ноя, 14:24", status: "PENDING", documents: ["Удостоверение личности", "Бизнес-регистрация", "Право управления"] },
  { id: "VR-1027", applicant: "Марат Б.", email: "marat.b@example.com", phone: "+7 700 000 00 02", hotel: "Steppe Residence", address: "Астана, проспект Үлгі, 24", website: "steppe-residence.example", rooms: 54, country: "Казахстан", submitted: "4 ноя, 19:10", status: "IN_REVIEW", documents: ["Удостоверение личности", "Бизнес-регистрация", "Право управления"] },
  { id: "VR-1024", applicant: "София Р.", email: "sofia.r@example.com", phone: "+7 700 000 00 03", hotel: "Northline Boutique", address: "Астана, переулок Макет, 7", website: "northline.example", rooms: 31, country: "Казахстан", submitted: "2 ноя, 16:45", status: "MORE_INFO_REQUIRED", documents: ["Удостоверение личности", "Бизнес-регистрация"], note: "Нужен документ, подтверждающий право управления отелем." }
];

const PLATFORM_CONTEXTS = [
  { id: "personal", label: "Личный", subtitle: "Гость", role: "GUEST", home: "/app/explore" },
  { id: "business", label: "Aspan City Hotel", subtitle: "Владелец", role: "HOTEL_OWNER", hotelId: "aspan-city", permissions: ["ALL"], home: "/hotel/dashboard" },
  { id: "platform", label: "HotelX Platform", subtitle: "Суперадмин", role: "SUPER_ADMIN", home: "/admin/dashboard" }
];

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extraHeaders } });
}

function safeUser(request, url, env) {
  const siteUserId = request.headers.get("oai-authenticated-user-id");
  const previewUserId = ["localhost", "127.0.0.1"].includes(url.hostname) ? request.headers.get("x-hotelx-preview-user") : null;
  const userId = siteUserId || previewUserId;
  if (!userId) return null;
  const encodedName = request.headers.get("oai-authenticated-user-full-name");
  const isEncoded = request.headers.get("oai-authenticated-user-full-name-encoding") === "percent-encoded-utf-8";
  let name = "Создатель HotelX";
  if (encodedName) { try { name = isEncoded ? decodeURIComponent(encodedName) : encodedName; } catch { name = encodedName; } }
  const email = request.headers.get("oai-authenticated-user-email") || "visitor@hotelx.demo";
  const configuredOwner = String(env?.HOTELX_PLATFORM_OWNER_EMAIL || "").trim().toLowerCase();
  const isPlatformOwner = Boolean(configuredOwner) && email.trim().toLowerCase() === configuredOwner;
  return { id: userId, email, name, isPlatformOwner, contexts: isPlatformOwner ? PLATFORM_CONTEXTS : [PLATFORM_CONTEXTS[0]] };
}

const ROLE_PERMISSIONS = {
  HOTEL_OWNER: ["ALL"],
  HOTEL_MANAGER: ["VIEW_DASHBOARD", "VIEW_ANALYTICS", "VIEW_RESERVATIONS", "EDIT_RESERVATIONS", "VIEW_ROOMS", "EDIT_ROOMS", "VIEW_PRICING", "EDIT_PRICING", "VIEW_REPORTS"],
  HOTEL_STAFF: ["VIEW_RESERVATIONS", "EDIT_RESERVATIONS", "VIEW_ROOMS"]
};

async function hydrateActorAccess(actor, env) {
  if (!env?.DB) return actor;
  await env.DB.prepare("INSERT INTO users (id, email, name, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(id) DO UPDATE SET email = excluded.email, name = excluded.name, updated_at = CURRENT_TIMESTAMP")
    .bind(actor.id, actor.email, actor.name).run();
  await env.DB.prepare("INSERT OR IGNORE INTO hotels (id, name, verification_status) VALUES ('aspan-city', 'Aspan City Hotel', 'VERIFIED')").run();

  if (actor.isPlatformOwner) {
    await env.DB.batch([
      env.DB.prepare("INSERT OR IGNORE INTO platform_admins (user_id) VALUES (?)").bind(actor.id),
      env.DB.prepare("INSERT INTO hotels (id, owner_user_id, name, verification_status) VALUES ('aspan-city', ?, 'Aspan City Hotel', 'VERIFIED') ON CONFLICT(id) DO UPDATE SET owner_user_id = excluded.owner_user_id, verification_status = 'VERIFIED'").bind(actor.id),
      env.DB.prepare("INSERT INTO hotel_memberships (user_id, hotel_id, role, status) VALUES (?, 'aspan-city', 'HOTEL_OWNER', 'ACTIVE') ON CONFLICT(user_id, hotel_id) DO UPDATE SET role = 'HOTEL_OWNER', status = 'ACTIVE'").bind(actor.id)
    ]);
  }

  const [admin, membership, permissionRows] = await Promise.all([
    env.DB.prepare("SELECT 1 AS allowed FROM platform_admins WHERE user_id = ?").bind(actor.id).first(),
    env.DB.prepare("SELECT hm.hotel_id, hm.role, hm.status, h.name, h.verification_status FROM hotel_memberships hm JOIN hotels h ON h.id = hm.hotel_id WHERE hm.user_id = ? AND hm.status = 'ACTIVE' AND h.verification_status = 'VERIFIED' ORDER BY hm.created_at ASC LIMIT 1").bind(actor.id).first(),
    env.DB.prepare("SELECT permission FROM membership_permissions WHERE user_id = ? AND hotel_id = (SELECT hm.hotel_id FROM hotel_memberships hm JOIN hotels h ON h.id = hm.hotel_id WHERE hm.user_id = ? AND hm.status = 'ACTIVE' AND h.verification_status = 'VERIFIED' ORDER BY hm.created_at ASC LIMIT 1) AND allowed = 1").bind(actor.id, actor.id).all()
  ]);

  actor.contexts = [PLATFORM_CONTEXTS[0]];
  if (membership) {
    const defaults = ROLE_PERMISSIONS[membership.role] || [];
    const custom = (permissionRows.results || []).map((row) => row.permission);
    const permissions = [...new Set([...defaults, ...custom])];
    actor.contexts.push({ id: "business", label: membership.name, subtitle: membership.role === "HOTEL_OWNER" ? "Владелец" : membership.role === "HOTEL_MANAGER" ? "Управляющий" : "Персонал", role: membership.role, hotelId: membership.hotel_id, permissions, home: membership.role === "HOTEL_STAFF" ? "/hotel/reservations" : "/hotel/dashboard" });
  }
  if (admin) actor.contexts.push(PLATFORM_CONTEXTS[2]);
  return actor;
}

function selectedContext(request, actor, required, permission) {
  const selectedId = request.headers.get("x-hotelx-context") || "personal";
  const context = actor.contexts.find((item) => item.id === selectedId);
  if (!context) return { error: json({ error: "CONTEXT_NOT_ALLOWED", message: "Этот контекст не назначен пользователю." }, 403) };
  if (required && context.id !== required) return { error: json({ error: "PERMISSION_DENIED", message: "Недостаточно прав для этого действия." }, 403) };
  if (permission && context.id === "business" && !context.permissions?.includes("ALL") && !context.permissions?.includes(permission)) return { error: json({ error: "PERMISSION_DENIED", message: "Для действия требуется разрешение " + permission + "." }, 403) };
  return { context };
}

function protectMutation(request, url) {
  if (!["POST", "PATCH", "PUT", "DELETE"].includes(request.method)) return null;
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) return json({ error: "ORIGIN_REJECTED", message: "Запрос отклонён политикой безопасности." }, 403);
  return null;
}

function publicHotel(hotel) {
  return { id: hotel.id, name: hotel.name, location: hotel.location, address: hotel.address, distance: hotel.distance, rating: hotel.rating, reviews: hotel.reviews, price: hotel.price, match: hotel.match, type: hotel.type, image: hotel.image, gallery: hotel.gallery, description: hotel.description, amenities: hotel.amenities, matchReason: hotel.matchReason, pros: hotel.pros, cons: hotel.cons, rooms: hotel.rooms };
}

async function readBody(request) { try { return await request.json(); } catch { return {}; } }
function apiError(status, error, message) { return json({ error, message }, status); }

function generatedId(prefix) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
}

async function seedVerificationRows(env) {
  if (!env?.DB) return;
  const statements = VERIFICATIONS.map((item) => env.DB.prepare("INSERT OR IGNORE INTO verification_requests (id, hotel_name, applicant_name, email, phone, address, website, rooms_count, country, status, submitted_at, review_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .bind(item.id, item.hotel, item.applicant, item.email, item.phone, item.address, item.website, item.rooms, item.country, item.status, new Date("2026-11-0" + (item.id === "VR-1028" ? "5" : item.id === "VR-1027" ? "4" : "2") + "T09:00:00Z").toISOString(), item.note || null));
  await env.DB.batch(statements);
}

async function readVerificationRows(env) {
  if (!env?.DB) return VERIFICATIONS;
  await seedVerificationRows(env);
  const [result, documentResult] = await Promise.all([
    env.DB.prepare("SELECT id, user_id, hotel_id, hotel_name, applicant_name, email, phone, address, website, rooms_count, country, status, submitted_at, review_note FROM verification_requests ORDER BY submitted_at DESC").all(),
    env.DB.prepare("SELECT verification_id, kind FROM verification_documents ORDER BY uploaded_at ASC").all()
  ]);
  const documentLabels = { identity: "Удостоверение личности", business: "Бизнес-регистрация", ownership: "Право управления" };
  const documentsByRequest = new Map();
  for (const document of documentResult.results || []) {
    const existing = documentsByRequest.get(document.verification_id) || [];
    existing.push(documentLabels[document.kind] || document.kind);
    documentsByRequest.set(document.verification_id, existing);
  }
  return (result.results || []).map((row) => ({
    id: row.id, userId: row.user_id, hotelId: row.hotel_id, applicant: row.applicant_name, email: row.email, phone: row.phone,
    hotel: row.hotel_name, address: row.address, website: row.website, rooms: row.rooms_count, country: row.country,
    submitted: new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Almaty" }).format(new Date(row.submitted_at)),
    status: row.status, documents: documentsByRequest.get(row.id) || (row.id.startsWith("VR-10") ? (row.id === "VR-1024" ? ["Удостоверение личности", "Бизнес-регистрация"] : ["Удостоверение личности", "Бизнес-регистрация", "Право управления"]) : []),
    note: row.review_note || undefined
  }));
}

async function handleApi(request, url, env) {
  void env;
  let actor = safeUser(request, url, env);
  if (!actor) return apiError(401, "AUTH_REQUIRED", "Войдите через ChatGPT, чтобы продолжить.");
  if (!env?.DB && env?.HOTELX_LOCAL_PREVIEW !== "1") return apiError(503, "STORAGE_UNAVAILABLE", "Хранилище временно недоступно. Изменения не выполнялись.");
  actor = await hydrateActorAccess(actor, env);
  const mutationError = protectMutation(request, url);
  if (mutationError) return mutationError;
  const path = url.pathname;

  if (request.method === "GET" && path === "/api/me") {
    const verification = env?.DB ? await env.DB.prepare("SELECT id, status, hotel_name, review_note FROM verification_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1").bind(actor.id).first() : null;
    return json({ user: { id: actor.id, name: actor.name, email: actor.email }, contexts: actor.contexts, defaultContext: "personal", verification, privatePrototype: true });
  }

  if (request.method === "GET" && path === "/api/guest/hotels") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const budget = Number(url.searchParams.get("budget") || 0); const amenity = (url.searchParams.get("amenity") || "").toLowerCase();
    const hotels = HOTELS.filter((hotel) => (!budget || hotel.price <= budget) && (!amenity || hotel.amenities.some((item) => item.toLowerCase().includes(amenity))));
    return json({ hotels: hotels.map(publicHotel), query: { city: "Астана", checkIn: "2026-11-07", checkOut: "2026-11-10", guests: 2 } });
  }

  if (request.method === "POST" && path === "/api/guest/ai-search") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); const prompt = String(body.prompt || "");
    const budgetMatch = prompt.replace(/\s/g, "").match(/(?:до|budget)[^0-9]{0,8}(\d{4,6})/i); const budget = budgetMatch ? Number(budgetMatch[1]) : 50000;
    const wantsPool = /бассейн|pool/i.test(prompt); let hotels = HOTELS.filter((hotel) => hotel.price <= budget || hotel.match >= 90);
    if (wantsPool) hotels = hotels.filter((hotel) => hotel.amenities.includes("Бассейн"));
    return json({ parsed: { city: "Астана", nights: 3, guests: 2, budget, location: "рядом с центром", preferences: wantsPool ? ["Бассейн"] : ["Высокий рейтинг", "Завтрак"] }, hotels: hotels.map(publicHotel), summary: `Нашли ${hotels.length} подходящих варианта. Лучшее совпадение — ${hotels[0]?.name || "не найдено"}.` });
  }

  const guestHotelMatch = path.match(/^\/api\/guest\/hotels\/([a-z0-9-]+)$/);
  if (request.method === "GET" && guestHotelMatch) {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const hotel = HOTELS.find((item) => item.id === guestHotelMatch[1]); return hotel ? json({ hotel: publicHotel(hotel) }) : apiError(404, "HOTEL_NOT_FOUND", "Отель не найден.");
  }

  if (request.method === "POST" && path === "/api/guest/compare") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); const hotels = (Array.isArray(body.ids) ? body.ids : []).map((id) => HOTELS.find((hotel) => hotel.id === id)).filter(Boolean).slice(0, 3);
    if (hotels.length < 2) return apiError(400, "COMPARE_MINIMUM", "Выберите минимум два отеля.");
    const best = [...hotels].sort((a, b) => b.match - a.match)[0]; return json({ hotels: hotels.map(publicHotel), recommendation: `${best.name} — лучший общий выбор: AI Match ${best.match}%, сильное расположение и соответствие вашему бюджету.` });
  }

  if (request.method === "POST" && path === "/api/bookings") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); const hotel = HOTELS.find((item) => item.id === body.hotelId); const room = hotel?.rooms.find((item) => item.id === body.roomId);
    if (!hotel || !room) return apiError(404, "ROOM_NOT_FOUND", "Номер больше не доступен.");
    const guests = Math.max(1, Math.min(6, Number(body.guests) || 2));
    if (guests > room.guests) return apiError(400, "ROOM_CAPACITY_EXCEEDED", "Выбранный номер не рассчитан на такое количество гостей.");
    const checkIn = String(body.checkIn || "2026-11-07");
    const checkOut = String(body.checkOut || "2026-11-10");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checkIn) || !/^\d{4}-\d{2}-\d{2}$/.test(checkOut)) return apiError(400, "INVALID_DATES", "Передайте даты в формате YYYY-MM-DD.");
    const start = Date.parse(checkIn + "T00:00:00Z"); const end = Date.parse(checkOut + "T00:00:00Z");
    const nights = Math.round((end - start) / 86400000);
    if (!Number.isFinite(nights) || nights < 1 || nights > 30) return apiError(400, "INVALID_DATES", "Период должен составлять от 1 до 30 ночей.");
    const total = room.price * nights;
    const dateLabel = (date) => new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
    const booking = { id: generatedId("HX"), hotel: hotel.name, hotelId: hotel.id, room: room.type, roomId: room.id, checkIn: dateLabel(checkIn), checkOut: dateLabel(checkOut), guests, nights, total, status: "CONFIRMED" };
    if (env?.DB) {
      try {
        await env.DB.batch([
          env.DB.prepare("INSERT INTO room_inventory (hotel_id, room_id, check_in, check_out, capacity, booked) VALUES (?, ?, ?, ?, ?, 1) ON CONFLICT(hotel_id, room_id, check_in, check_out) DO UPDATE SET booked = booked + 1")
            .bind(hotel.id, room.id, checkIn, checkOut, room.left),
          env.DB.prepare("INSERT INTO bookings (id, guest_user_id, hotel_id, room_id, room_type, check_in, check_out, guests, nights, total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'CONFIRMED')")
            .bind(booking.id, actor.id, hotel.id, room.id, room.type, checkIn, checkOut, guests, nights, total),
          env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, ?, 'BOOKING_CREATED', 'booking', ?, ?)")
            .bind(generatedId("AUD"), actor.id, hotel.id, booking.id, JSON.stringify({ roomId: room.id, total, checkIn, checkOut }))
        ]);
      } catch (error) {
        if (String(error?.message || error).includes("ROOM_SOLD_OUT")) return apiError(409, "ROOM_SOLD_OUT", "Все номера этой категории уже забронированы на выбранные даты.");
        throw error;
      }
    }
    return json({ booking }, 201);
  }

  if (request.method === "GET" && path === "/api/trips") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    let persisted = [];
    if (env?.DB) {
      const result = await env.DB.prepare("SELECT b.id, h.name AS hotel, b.check_in, b.check_out, b.room_type, b.status, b.total FROM bookings b JOIN hotels h ON h.id = b.hotel_id WHERE b.guest_user_id = ? ORDER BY b.created_at DESC LIMIT 20").bind(actor.id).all();
      persisted = (result.results || []).map((row) => ({ id: row.id, hotel: row.hotel, checkIn: row.check_in, checkOut: row.check_out, room: row.room_type, status: row.status, total: row.total }));
    }
    return json({ trips: [...persisted, { id: "HX-248921", hotel: "Nomad Garden Astana", checkIn: "18 дек 2026", checkOut: "21 дек 2026", room: "Comfort Twin", status: "CONFIRMED", total: 144000 }, { id: "HX-231104", hotel: "Burabay Lakeside", checkIn: "14 авг 2026", checkOut: "17 авг 2026", room: "Lake View", status: "COMPLETED", total: 178000 }] });
  }

  if (request.method === "POST" && path === "/api/applications") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const body = await readBody(request); if (!body.hotelName || !body.phone) return apiError(400, "VALIDATION_ERROR", "Заполните название отеля и телефон.");
    const application = { id: generatedId("VR"), status: "PENDING", hotelName: body.hotelName };
    if (env?.DB) {
      const hotelId = "hotel-" + crypto.randomUUID().slice(0, 12);
      await env.DB.batch([
        env.DB.prepare("INSERT INTO hotels (id, name, verification_status) VALUES (?, ?, 'PENDING')").bind(hotelId, body.hotelName),
        env.DB.prepare("INSERT INTO verification_requests (id, user_id, hotel_id, hotel_name, applicant_name, email, phone, address, website, rooms_count, country, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')")
          .bind(application.id, actor.id, hotelId, body.hotelName, actor.name, actor.email, body.phone, body.address || "", body.website || "", Number(body.rooms) || 0, body.country || "Казахстан"),
        env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id) VALUES (?, ?, ?, 'VERIFICATION_SUBMITTED', 'verification_request', ?)")
          .bind(generatedId("AUD"), actor.id, hotelId, application.id)
      ]);
    }
    return json({ application, message: "Заявка принята. Доступ к управлению появится только после проверки." }, 201);
  }

  if (request.method === "GET" && path === "/api/verifications/me") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const application = await env.DB.prepare("SELECT id, hotel_id, hotel_name, status, submitted_at, review_note FROM verification_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1").bind(actor.id).first();
    if (!application) return json({ application: null, documents: [] });
    const documents = await env.DB.prepare("SELECT kind, content_type, size_bytes, uploaded_at FROM verification_documents WHERE verification_id = ? ORDER BY uploaded_at ASC").bind(application.id).all();
    return json({ application: { id: application.id, hotelId: application.hotel_id, hotelName: application.hotel_name, status: application.status, submittedAt: application.submitted_at, reviewNote: application.review_note }, documents: documents.results || [] });
  }

  if (request.method === "POST" && path === "/api/verifications/me/resubmit") {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    const application = await env.DB.prepare("SELECT id FROM verification_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1").bind(actor.id).first();
    if (!application) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
    await env.DB.batch([
      env.DB.prepare("UPDATE verification_requests SET status = 'PENDING', review_note = NULL, submitted_at = CURRENT_TIMESTAMP WHERE id = ?").bind(application.id),
      env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, action, resource_type, resource_id) VALUES (?, ?, 'VERIFICATION_RESUBMITTED', 'verification_request', ?)").bind(generatedId("AUD"), actor.id, application.id)
    ]);
    return json({ id: application.id, status: "PENDING" });
  }

  const documentUploadMatch = path.match(/^\/api\/verifications\/([^/]+)\/documents\/(identity|business|ownership)$/);
  if (request.method === "POST" && documentUploadMatch) {
    const auth = selectedContext(request, actor, "personal"); if (auth.error) return auth.error;
    if (!env?.BUCKET) return apiError(503, "FILE_STORAGE_UNAVAILABLE", "Хранилище документов временно недоступно.");
    const application = await env.DB.prepare("SELECT id FROM verification_requests WHERE id = ? AND user_id = ?").bind(documentUploadMatch[1], actor.id).first();
    if (!application) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
    const contentType = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(contentType)) return apiError(415, "UNSUPPORTED_DOCUMENT", "Загрузите PDF, JPG, PNG или WEBP.");
    const declaredSize = Number(request.headers.get("content-length") || 0);
    if (declaredSize > 5 * 1024 * 1024) return apiError(413, "DOCUMENT_TOO_LARGE", "Размер документа не должен превышать 5 МБ.");
    const bytes = await request.arrayBuffer();
    if (!bytes.byteLength || bytes.byteLength > 5 * 1024 * 1024) return apiError(bytes.byteLength ? 413 : 400, bytes.byteLength ? "DOCUMENT_TOO_LARGE" : "EMPTY_DOCUMENT", bytes.byteLength ? "Размер документа не должен превышать 5 МБ." : "Файл пуст.");
    const kind = documentUploadMatch[2];
    const objectKey = `verification/${actor.id}/${application.id}/${kind}-${crypto.randomUUID()}`;
    await env.BUCKET.put(objectKey, bytes, { httpMetadata: { contentType } });
    await env.DB.batch([
      env.DB.prepare("INSERT INTO verification_documents (verification_id, kind, object_key, content_type, size_bytes, uploaded_by, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(verification_id, kind) DO UPDATE SET object_key = excluded.object_key, content_type = excluded.content_type, size_bytes = excluded.size_bytes, uploaded_by = excluded.uploaded_by, uploaded_at = CURRENT_TIMESTAMP")
        .bind(application.id, kind, objectKey, contentType, bytes.byteLength, actor.id),
      env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, 'VERIFICATION_DOCUMENT_UPLOADED', 'verification_document', ?, ?)")
        .bind(generatedId("AUD"), actor.id, application.id + ":" + kind, JSON.stringify({ contentType, size: bytes.byteLength }))
    ]);
    return json({ verificationId: application.id, kind, uploaded: true, size: bytes.byteLength }, 201);
  }

  const adminDocumentMatch = path.match(/^\/api\/admin\/verifications\/([^/]+)\/documents\/(identity|business|ownership)$/);
  if (request.method === "GET" && adminDocumentMatch) {
    const auth = selectedContext(request, actor, "platform"); if (auth.error) return auth.error;
    if (!env?.BUCKET) return apiError(503, "FILE_STORAGE_UNAVAILABLE", "Хранилище документов временно недоступно.");
    const document = await env.DB.prepare("SELECT object_key, content_type FROM verification_documents WHERE verification_id = ? AND kind = ?").bind(adminDocumentMatch[1], adminDocumentMatch[2]).first();
    if (!document) return apiError(404, "DOCUMENT_NOT_FOUND", "Документ не найден.");
    const object = await env.BUCKET.get(document.object_key);
    if (!object) return apiError(404, "DOCUMENT_NOT_FOUND", "Документ не найден.");
    return new Response(object.body, { headers: { "content-type": document.content_type, "content-disposition": `attachment; filename="${adminDocumentMatch[2]}-document"`, "cache-control": "private, no-store", "x-content-type-options": "nosniff" } });
  }

  const hotelBaseMatch = path.match(/^\/api\/hotels\/([a-z0-9-]+)\/(dashboard|reservations|rooms|pricing|forecast|recommendations)$/);
  if (request.method === "GET" && hotelBaseMatch) {
    const permissionBySection = { dashboard: "VIEW_DASHBOARD", reservations: "VIEW_RESERVATIONS", rooms: "VIEW_ROOMS", pricing: "VIEW_PRICING", forecast: "VIEW_ANALYTICS", recommendations: "VIEW_PRICING" };
    const auth = selectedContext(request, actor, "business", permissionBySection[hotelBaseMatch[2]]); if (auth.error) return auth.error;
    if (hotelBaseMatch[1] !== auth.context.hotelId) return apiError(404, "HOTEL_NOT_FOUND", "Отель не найден.");
    const section = hotelBaseMatch[2];
    if (section === "dashboard") {
      const dashboard = structuredClone(DASHBOARD);
      if (env?.DB) {
        const override = await env.DB.prepare("SELECT price, updated_at FROM price_overrides WHERE hotel_id = ? AND room_type = 'Standard King' AND from_date = '2026-11-07' AND to_date = '2026-11-08'").bind(auth.context.hotelId).first();
        dashboard.recommendation.applied = Boolean(override);
        if (override) dashboard.recommendation.appliedPrice = override.price;
      }
      return json({ dashboard });
    }
    if (section === "reservations") return json({ reservations: RESERVATIONS });
    if (section === "rooms") return json({ rooms: ROOMS });
    if (section === "pricing") {
      let standardPrice = 40000;
      if (env?.DB) {
        const override = await env.DB.prepare("SELECT price FROM price_overrides WHERE hotel_id = ? AND room_type = 'Standard King' AND from_date = '2026-11-07' AND to_date = '2026-11-08'").bind(auth.context.hotelId).first();
        if (override) standardPrice = override.price;
      }
      return json({ roomTypes: [{ id: "standard", name: "Standard King", current: standardPrice, recommended: 44000, occupancy: 86, demand: "HIGH", impact: 200000 }, { id: "deluxe", name: "Deluxe City View", current: 52000, recommended: 54000, occupancy: 74, demand: "MEDIUM", impact: 96000 }, { id: "suite", name: "Executive Suite", current: 78000, recommended: 76000, occupancy: 51, demand: "LOW", impact: 65000 }] });
    }
    if (section === "forecast") return json({ forecast: { days7: [78, 81, 88, 92, 86, 74, 71], days30: [68, 71, 73, 70, 76, 78, 82, 79, 84, 86, 81, 77], days90: [65, 69, 72, 74, 78, 81, 83, 79, 76, 80, 84, 87], confidence: 92, expectedRevenue: 31400000, cancellations: 6.2 } });
    return json({ recommendations: [DASHBOARD.recommendation, { id: "min-stay", room: "Все категории", title: "Минимум 2 ночи", text: "Ограничение на субботу поможет сохранить номера для более доходных бронирований.", impact: 125000, demand: "MEDIUM" }] });
  }

  const applyMatch = path.match(/^\/api\/hotels\/([a-z0-9-]+)\/recommendations\/([a-z0-9-]+)\/apply$/);
  if (request.method === "POST" && applyMatch) {
    const auth = selectedContext(request, actor, "business", "EDIT_PRICING"); if (auth.error) return auth.error;
    if (applyMatch[1] !== auth.context.hotelId) return apiError(404, "HOTEL_NOT_FOUND", "Отель не найден.");
    if (applyMatch[2] !== DASHBOARD.recommendation.id) return apiError(404, "RECOMMENDATION_NOT_FOUND", "Рекомендация не найдена.");
    const auditId = generatedId("AUD");
    if (env?.DB) {
      await env.DB.batch([
        env.DB.prepare("INSERT INTO price_overrides (hotel_id, room_type, from_date, to_date, price, updated_by, updated_at) VALUES (?, 'Standard King', '2026-11-07', '2026-11-08', ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(hotel_id, room_type, from_date, to_date) DO UPDATE SET price = excluded.price, updated_by = excluded.updated_by, updated_at = CURRENT_TIMESTAMP")
          .bind(auth.context.hotelId, DASHBOARD.recommendation.recommendedPrice, actor.id),
        env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, ?, 'PRICE_RECOMMENDATION_APPLIED', 'recommendation', ?, ?)")
          .bind(auditId, actor.id, auth.context.hotelId, applyMatch[2], JSON.stringify({ from: 40000, to: DASHBOARD.recommendation.recommendedPrice, fromDate: "2026-11-07", toDate: "2026-11-08" }))
      ]);
    }
    return json({ applied: true, auditId, newPrice: DASHBOARD.recommendation.recommendedPrice, message: "Цена обновлена на выбранные даты. Действие записано в журнал." });
  }

  if (request.method === "GET" && path === "/api/admin/verifications") {
    const auth = selectedContext(request, actor, "platform"); if (auth.error) return auth.error; return json({ verifications: await readVerificationRows(env) });
  }

  const adminActionMatch = path.match(/^\/api\/admin\/verifications\/([^/]+)\/(approve|reject|request-info)$/);
  if (request.method === "POST" && adminActionMatch) {
    const auth = selectedContext(request, actor, "platform"); if (auth.error) return auth.error;
    const statusByAction = { approve: "APPROVED", reject: "REJECTED", "request-info": "MORE_INFO_REQUIRED" };
    const status = statusByAction[adminActionMatch[2]];
    if (env?.DB) {
      await seedVerificationRows(env);
      const item = await env.DB.prepare("SELECT id, user_id, hotel_id, hotel_name FROM verification_requests WHERE id = ?").bind(adminActionMatch[1]).first();
      if (!item) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
      const statements = [
        env.DB.prepare("UPDATE verification_requests SET status = ?, reviewed_at = CURRENT_TIMESTAMP, reviewed_by = ? WHERE id = ?").bind(status, actor.id, item.id),
        env.DB.prepare("INSERT INTO audit_events (id, actor_user_id, hotel_id, action, resource_type, resource_id, metadata_json) VALUES (?, ?, ?, ?, 'verification_request', ?, ?)")
          .bind(generatedId("AUD"), actor.id, item.hotel_id, "VERIFICATION_" + status, item.id, JSON.stringify({ hotelName: item.hotel_name }))
      ];
      if (status === "APPROVED" && item.hotel_id) {
        statements.push(env.DB.prepare("UPDATE hotels SET verification_status = 'VERIFIED', owner_user_id = ? WHERE id = ?").bind(item.user_id, item.hotel_id));
        if (item.user_id) statements.push(env.DB.prepare("INSERT INTO hotel_memberships (user_id, hotel_id, role, status) VALUES (?, ?, 'HOTEL_OWNER', 'ACTIVE') ON CONFLICT(user_id, hotel_id) DO UPDATE SET role = 'HOTEL_OWNER', status = 'ACTIVE'").bind(item.user_id, item.hotel_id));
      }
      await env.DB.batch(statements);
      return json({ id: item.id, status, audited: true, message: "Решение сохранено в журнале проверки." });
    }
    const item = VERIFICATIONS.find((verification) => verification.id === adminActionMatch[1]); if (!item) return apiError(404, "VERIFICATION_NOT_FOUND", "Заявка не найдена.");
    return json({ id: item.id, status, audited: true, message: "Решение сохранено в журнале проверки." });
  }

  if (request.method === "GET" && path === "/api/security/probe") {
    const auth = selectedContext(request, actor, "business", "VIEW_DASHBOARD"); if (auth.error) return auth.error; return json({ ok: true, permission: "VIEW_DASHBOARD", hotelId: auth.context.hotelId });
  }
  return apiError(404, "NOT_FOUND", "Маршрут API не найден.");
}

const PAGE = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#101828"><meta name="description" content="HotelX — AI-платформа для поиска отелей, бронирования и управления гостиничным бизнесом."><title>HotelX — AI для гостей и отелей</title><link rel="stylesheet" href="/assets/styles.css"></head>
<body><div id="app"><div class="boot"><div class="brand-mark">HX</div><div><strong>HotelX</strong><span>Загружаем ваш контекст…</span></div></div></div><div id="toast-region" class="toast-region" aria-live="polite"></div><div id="modal-root"></div><script src="/assets/app.js" defer></script></body></html>`;

const SECURITY_HEADERS = {
  "content-security-policy": "default-src 'self'; img-src 'self' https://images.unsplash.com data:; style-src 'self'; style-src-attr 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  "referrer-policy": "strict-origin-when-cross-origin", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "permissions-policy": "camera=(), microphone=(), geolocation=()"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) return handleApi(request, url, env);
    if (url.pathname === "/assets/styles.css") return new Response(STYLES, { headers: { "content-type": "text/css; charset=utf-8", "cache-control": "public, max-age=3600", ...SECURITY_HEADERS } });
    if (url.pathname === "/assets/app.js") return new Response(APP_JS, { headers: { "content-type": "application/javascript; charset=utf-8", "cache-control": "public, max-age=3600", ...SECURITY_HEADERS } });
    if (url.pathname.includes(".")) return new Response("Not found", { status: 404, headers: SECURITY_HEADERS });
    return new Response(PAGE, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...SECURITY_HEADERS } });
  }
};
