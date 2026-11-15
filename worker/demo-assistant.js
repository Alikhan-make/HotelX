// Deterministic, offline demonstration. No language model or external requests.
const demoMoney = (value) => new Intl.NumberFormat("ru-RU").format(Math.round(value)) + " ₸";
const demoNormalize = (text) => text.toLowerCase().replace(/ё/g, "е");

export function assistantInput(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  if (typeof body.prompt !== "string" || !body.prompt.trim() || body.prompt.length > 2000) return null;
  if (body.history !== undefined && (!Array.isArray(body.history) || body.history.length > 40)) return null;
  const history = body.history || [];
  if (history.some((item) => typeof item !== "string" || item.length > 2000)) return null;
  return { prompt: body.prompt.trim(), history };
}

function guestPreferences(turns, parsers) {
  let prefs = { city: null, budget: null, amenities: [], excluded: [], nearCenter: false, sort: "match", nights: null, guests: null };
  for (const turn of turns) {
    const text = demoNormalize(turn);
    if (/начать заново|новый поиск|сбрось|сбросить/.test(text)) {
      prefs = { city: null, budget: null, amenities: [], excluded: [], nearCenter: false, sort: "match", nights: null, guests: null };
    }
    const city = parsers.canonicalCity(turn);
    if (city) prefs.city = city;
    if (/любой город|весь казахстан|по всему казахстану/.test(text)) prefs.city = null;
    const shortBudget = text.match(/(?:до|бюджет|budget)\s*(\d+(?:[.,]\d+)?)\s*(?:тыс|k(?=\s|$))/i);
    const bareBudget = /^(?:а\s+)?(?:до\s+)?([\d\s]+)\s*(?:₸|тенге)?[?.!]*$/.exec(text);
    const budget = parsers.budgetFromPrompt(turn) || (shortBudget ? Number(shortBudget[1].replace(",", ".")) * 1000 : 0) || (bareBudget ? Number(bareBudget[1].replace(/\s/g, "")) : 0);
    if (budget >= 1000) prefs.budget = budget;
    if (/без ограничени[йя] по (?:цене|бюджету)|любой бюджет|бюджет не важен/.test(text)) prefs.budget = null;
    for (const amenity of parsers.amenitiesFromPrompt(turn)) {
      if (!prefs.amenities.includes(amenity)) prefs.amenities.push(amenity);
      prefs.excluded = prefs.excluded.filter((item) => item !== amenity);
    }
    const amenityWords = [["Бассейн", "бассейн|pool"], ["Спа", "спа|spa"], ["Завтрак", "завтрак|breakfast"], ["Парковка", "парковк|parking"], ["Фитнес-зал", "фитнес|gym"]];
    for (const [amenity, words] of amenityWords) {
      if (new RegExp("(?:без|исключи|without)\\s+(?:" + words + ")", "i").test(text)) {
        prefs.amenities = prefs.amenities.filter((item) => item !== amenity);
        if (!prefs.excluded.includes(amenity)) prefs.excluded.push(amenity);
      }
      if (new RegExp("(?:" + words + ")[\\p{L}\\s]{0,16}(?:не обязател|не нужен|не важен)", "iu").test(text)) {
        prefs.amenities = prefs.amenities.filter((item) => item !== amenity);
        prefs.excluded = prefs.excluded.filter((item) => item !== amenity);
      }
    }
    if (/рядом с центром|ближе к центру|в центре/.test(text)) prefs.nearCenter = true;
    if (/центр не важен|не обязательно в центре/.test(text)) prefs.nearCenter = false;
    if (/дешевле|недорог|эконом|по цене/.test(text)) prefs.sort = "price";
    if (/по рейтингу|высокий рейтинг/.test(text)) prefs.sort = "rating";
    const nights = /(?:на\s+)?(\d{1,2})\s*(?:ноч|сут)/.exec(text);
    const guests = /(\d)\s*(?:гост|человек|взросл)/.exec(text);
    if (nights && Number(nights[1]) > 0) prefs.nights = Math.min(30, Number(nights[1]));
    if (guests && Number(guests[1]) > 0) prefs.guests = Math.min(6, Number(guests[1]));
  }
  return prefs;
}

export function guestDemoReply({ prompt, history, catalog, parsers }) {
  const prefs = guestPreferences([...history, prompt], parsers);
  const text = demoNormalize(prompt);
  const matches = catalog.filter((hotel) => hotel.demo === true && (!prefs.city || hotel.city === prefs.city)
    && (!prefs.budget || hotel.price <= prefs.budget)
    && prefs.amenities.every((item) => hotel.amenities.includes(item))
    && prefs.excluded.every((item) => !hotel.amenities.includes(item))
    && (!prefs.nearCenter || hotel.distance <= 3)
    && (!prefs.guests || hotel.rooms.some((room) => room.guests >= prefs.guests && (!prefs.budget || room.price <= prefs.budget))))
    .sort((a, b) => prefs.sort === "price" ? a.price - b.price : prefs.sort === "rating" ? b.rating - a.rating : b.match - a.match || a.price - b.price);
  const scope = prefs.city ? "в городе " + prefs.city : "по Казахстану";
  const conditions = [prefs.budget ? "до " + demoMoney(prefs.budget) + " за ночь" : "", ...prefs.amenities, ...prefs.excluded.map((item) => "без: " + item), prefs.nearCenter ? "не дальше 3 км от центра" : "", prefs.guests ? prefs.guests + " гостя/гостей" : ""].filter(Boolean);
  const summary = scope + (conditions.length ? " · " + conditions.join(" · ") : "");
  const suggestions = [];
  const best = matches[0];
  let reply;
  let showCards = true;
  if (/выручк|revpar|внутренн|доход.*отел/.test(text)) {
    reply = "В гостевом помощнике доступны только данные демо-каталога. Внутренняя выручка и показатели отеля здесь недоступны. Могу помочь выбрать размещение.";
    showCards = false;
  } else if (/^(привет|здравствуй|здравствуйте|что ты умеешь|помощь)[!.?\s]*$/.test(text)) {
    reply = "Я демопомощник HotelX. Подберу отели, запомню пожелания в этом диалоге, сравню цены и посчитаю стоимость ночей. Напишите, например: «Алматы до 60 тысяч с завтраком».";
    showCards = false;
  } else if (/^спасибо[!.?\s]*$/.test(text)) {
    reply = "Пожалуйста! Подбор сохранён в этом диалоге. Можно уточнить пожелания или открыть карточку понравившегося отеля.";
    showCards = false;
  } else if (/забронируй|оплати|оформи брон/.test(text)) {
    reply = "В чате бронь не оформляется. Откройте карточку отеля, выберите номер и проверьте условия. Бронирование и цены в этом проекте демонстрационные.";
  } else if (!best) {
    reply = "В демо-каталоге нет точных совпадений: " + summary + ". Я сохранил пожелания и не заменял их другими. Можно увеличить бюджет, выбрать другой город или написать «бассейн не обязателен».";
    suggestions.push("Без ограничений по бюджету", "Начать заново");
  } else if (/сравни|чем отлич|какой лучше/.test(text)) {
    const top = matches.slice(0, 2);
    reply = top.map((hotel) => hotel.name + ": " + demoMoney(hotel.price) + " за ночь, рейтинг " + hotel.rating + ", до центра " + hotel.distance + " км. " + hotel.pros[0] + ".").join("\n\n");
    reply += top.length > 1 ? "\n\nРазница в цене — " + demoMoney(Math.abs(top[0].price - top[1].price)) + " за ночь. " + best.name + " первым в текущем подборе; компромисс: " + best.cons[0] + "." : "\n\nПо этим пожеланиям найден только один вариант. Для сравнения можно расширить подбор.";
  } else if (/почему|расскажи|подробнее|первый|первом|первого/.test(text)) {
    reply = best.name + " подходит текущему подбору: " + summary + ".\n\n" + best.description + "\n\nПлюсы: " + best.pros.join("; ") + ". Учтите: " + best.cons.join("; ") + ".";
  } else if (/сколько|стоимост|итого|посчитай/.test(text) && prefs.nights) {
    const room = best.rooms.filter((r) => !prefs.guests || r.guests >= prefs.guests).sort((a, b) => a.price - b.price)[0];
    reply = best.name + ", " + room.type + ": " + demoMoney(room.price) + " × " + prefs.nights + " ночи/ночей = " + demoMoney(room.price * prefs.nights) + ". Это расчёт по демотарифу, без проверки дат, сборов и реального наличия.";
  } else if (/сколько|стоимост|итого/.test(text) && !prefs.nights) {
    reply = "Стоимость " + best.name + " — от " + demoMoney(best.price) + " за ночь. На сколько ночей посчитать? Например: «На 3 ночи».";
  } else {
    reply = "Нашёл " + matches.length + " вариант(а/ов): " + summary + ".";
    if (prefs.sort === "price") reply += " Сначала самые доступные.";
    reply += "\n\n" + best.name + " — от " + demoMoney(best.price) + " за ночь, рейтинг " + best.rating + ", " + best.distance + " км до центра. " + best.matchReason;
    if (prefs.nights) reply += "\nОриентир за " + prefs.nights + " ночи/ночей — от " + demoMoney(best.price * prefs.nights) + "; без проверки реального наличия.";
    if (!prefs.city) reply += "\n\nВ каком городе хотите остановиться?";
  }
  if (!suggestions.length) suggestions.push(...(!prefs.city ? ["В Алматы", "В Астане"] : ["Покажи дешевле", "Сравни первые два"]), "Посчитай на 3 ночи");
  const supported = /отел|гостиниц|найди|подбер|покажи|сравни|дешев|рейтинг|бюджет|завтрак|бассейн|спа|парков|центр|ноч|гост|сколько|стоимост|итого|посчитай|почему|расскажи|подробнее|перв|забронируй|оплати|брон|казахстан|сброс|начать заново|тыс|до\s*\d|тенге|₸|привет|здравств|помощь|спасибо|выручк|revpar|внутренн|доход/.test(text) || parsers.canonicalCity(prompt) || /^\d[\d\s]+$/.test(text);
  if (!supported) {
    reply = "В деморежиме я понимаю запросы о поиске отелей, цене, удобствах и сравнении. На этот вопрос у меня нет надёжного ответа. Ваш предыдущий подбор сохранён; попробуйте один из примеров ниже.";
    showCards = false;
  }
  return { mode: "demo", catalogScope: "demo", reply, summary, parsed: { ...prefs, city: prefs.city || "Казахстан", preferences: prefs.amenities }, hotels: matches, cards: showCards ? matches.slice(0, 3) : [], suggestions };
}

export function hotelDemoTopic(prompt, history = []) {
  const classify = (text) => /выручк|доход|adr|revpar|показател/.test(text) ? "metrics" : /цен|тариф|поднять|повыс|сниз|дешев|категор|хуже|слаб|standard|deluxe|suite|%/.test(text) ? "pricing" : /загруз|прогноз|спрос|недел|дней|выходн/.test(text) ? "forecast" : null;
  const text = demoNormalize(prompt);
  return classify(text) || (/^а |почему|подробнее|посчитай|на (?:7|30|90)/.test(text) ? [...history].reverse().map((item) => classify(demoNormalize(item))).find(Boolean) : null) || "help";
}

export function hotelDemoReply({ prompt, history, topic, dashboard, forecast, pricing }) {
  const text = demoNormalize(prompt);
  const combined = [...history, prompt].map(demoNormalize).join(" ");
  const roomTurn = [prompt, ...[...history].reverse()].map(demoNormalize).find((item) => /standard|стандарт|deluxe|делюкс|suite|люкс/.test(item)) || "";
  const room = /suite|люкс/.test(roomTurn) ? pricing[2] : /deluxe|делюкс/.test(roomTurn) ? pricing[1] : pricing[0];
  let reply;
  let suggestions = ["Какая загрузка на 7 дней?", "Нужно ли поднять цены?", "Покажи выручку и RevPAR"];
  let actions = [];
  if (/примени|измени цену|сохрани цену|подтверждаю/.test(text)) {
    reply = "Чат не меняет тарифы. Откройте раздел «Цены», проверьте деморекомендацию и подтвердите действие в отдельном окне.";
    actions = [{ label: "Открыть цены", route: "/hotel/pricing" }];
  } else if (topic === "metrics") {
    const kpi = dashboard.kpis;
    reply = "Демосводка " + dashboard.hotel.name + ":\n• Выручка — " + demoMoney(kpi.revenue) + ".\n• ADR — " + demoMoney(kpi.adr) + " за проданный номер.\n• RevPAR — " + demoMoney(kpi.revpar) + " на доступный номер.\n• Загрузка — " + kpi.occupancy + "%.\n\nПроверка: ADR × загрузка = " + demoMoney(kpi.adr * kpi.occupancy / 100) + ". Это показатели учебного периода, не текущая отчётность.";
    suggestions = ["Объясни прогноз загрузки", "Посчитай цену Standard при повышении на 10%"];
    actions = [{ label: "Открыть дашборд", route: "/hotel/dashboard" }];
  } else if (topic === "pricing") {
    const percent = /(\d{1,2}(?:[.,]\d+)?)\s*%/.exec(text);
    const previousPercent = [...history].reverse().map((item) => /(\d{1,2}(?:[.,]\d+)?)\s*%/.exec(item)).find(Boolean);
    const change = percent || (/а если|посчитай/.test(text) ? previousPercent : null);
    if (change) {
      const amount = Number(change[1].replace(",", "."));
      const lower = /сниз|уменьш|дешев/.test(text) || (!/подн|повыс|увелич/.test(text) && /сниз|уменьш/.test(combined));
      const next = Math.round(room.current * (1 + (lower ? -amount : amount) / 100));
      reply = "Сценарий для " + room.name + ": " + demoMoney(room.current) + (lower ? " − " : " + ") + amount + "% = " + demoMoney(next) + " за ночь. Разница — " + demoMoney(Math.abs(next - room.current)) + " на проданный номер.\n\nЭто арифметический сценарий при неизменной загрузке. Будущую выручку он не гарантирует; тариф не изменён.";
    } else if (/хуже|слаб|категор|сравни/.test(text)) {
      reply = pricing.map((item) => item.name + ": загрузка " + item.occupancy + "%, цена " + demoMoney(item.current) + ", деморекомендация " + demoMoney(item.recommended) + ".").join("\n\n") + "\n\nСлабее всего загружен " + [...pricing].sort((a, b) => a.occupancy - b.occupancy)[0].name + ". Сначала сравните условия и спрос; снижение цены само по себе не гарантирует продажи.";
    } else {
      reply = room.name + ": текущий демотариф " + demoMoney(room.current) + ", загрузка " + room.occupancy + "%. Рекомендация учебного сценария — " + demoMoney(room.recommended) + ".\n\nМожно проверить альтернативу: «А если повысить на 5%?» Никакие изменения из чата не применяются.";
    }
    suggestions = ["А если повысить на 5%?", "Какие категории продаются хуже?", "Покажи прогноз на 30 дней"];
    actions = [{ label: "Открыть цены", route: "/hotel/pricing" }];
  } else if (topic === "forecast") {
    const daysMatch = /(?:на\s+)?(7|30|90)\s*(?:дн|день|дней)/.exec(text);
    const previousDays = [...history].reverse().map((item) => /(?:на\s+)?(7|30|90)\s*д/.exec(item)).find(Boolean);
    const days = Number((daysMatch || previousDays)?.[1] || 7);
    const series = forecast["days" + days];
    const average = Math.round(series.reduce((sum, value) => sum + value, 0) / series.length);
    reply = "Демопрогноз на " + days + " дней: средняя загрузка " + average + "%, диапазон " + Math.min(...series) + "–" + Math.max(...series) + "%. Текущая демозагрузка — " + dashboard.kpis.occupancy + "%.";
    if (days === 7) reply += "\nПо дням учебного периода: " + series.join("% · ") + "%.";
    else reply += "\nСводка по " + series.length + " точкам графика учебного периода.";
    reply += "\n\nВ демосценарии заложен рост спроса на выходные. Реальные события и рынок не проверяются; это не актуальный прогноз.";
    suggestions = ["А на 30 дней?", "А на 90 дней?", "Посчитай повышение цены на 10%"];
    actions = [{ label: "Открыть прогноз", route: "/hotel/forecast" }];
  } else {
    reply = /^спасибо/.test(text) ? "Пожалуйста! Можете продолжить расчёт или начать новый диалог." : "Я демопомощник по данным " + dashboard.hotel.name + ". Могу разобрать загрузку на 7, 30 и 90 дней, сравнить категории, объяснить ADR/RevPAR и посчитать изменение цены на заданный процент. Для других тем демосценария пока нет.";
  }
  return { mode: "demo", reply, suggestions, actions };
}
