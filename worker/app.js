const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const ICONS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5M9 20v-6h6v6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>',
  spark: '<path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15ZM5 14l.7 1.8 1.8.7-1.8.7L5 19l-.7-1.8-1.8-.7 1.8-.7L5 14Z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M14 21h-4"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/>',
  booking: '<path d="M4 7h16v14H4zM8 3v4M16 3v4M4 11h16"/><path d="m8 16 2 2 5-5"/>',
  bed: '<path d="M3 19v-8h18v8M3 15h18M6 11V6h6a4 4 0 0 1 4 4v1M3 19v2M21 19v2"/>',
  tag: '<path d="M20.6 13.6 11 23.2 1.8 14V4.8H11z"/><circle cx="7" cy="10" r="1.5"/>',
  forecast: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v4a6 6 0 0 1-12 0V8Z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
  building: '<path d="M3 21h18M6 21V5l6-3v19M12 8h6v13M9 7v1M9 11v1M9 15v1M15 11v1M18 11v1M15 15v1M18 15v1"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  filter: '<path d="M4 5h16M7 12h10M10 19h4"/>',
  map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'
};

function icon(name) {
  return '<span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + (ICONS[name] || ICONS.more) + '</svg></span>';
}

function esc(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function money(value) {
  return new Intl.NumberFormat('ru-RU').format(Number(value || 0)) + ' ₸';
}

function initials(name) {
  return String(name || 'HX').split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

function loadLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function deviceKey(name) {
  return 'hotelx:' + (state.me?.user.id || 'anonymous') + ':' + name;
}

function persistLocal(name, value) {
  localStorage.setItem(deviceKey(name), JSON.stringify(value));
}

const state = {
  me: null,
  context: 'personal',
  path: location.pathname,
  loading: false,
  billingCycle: 'monthly',
  subscription: null,
  pendingSubscription: null,
  error: null,
  contextMenu: false,
  contextMenuAnchor: 'top',
  intent: new URLSearchParams(location.search).get('intent') === 'manager' ? 'manager' : 'guest',
  hotels: null,
  searchPool: null,
  searchResults: null,
  parsedSearch: null,
  filters: { city: '', budget: 0, amenities: [] },
  compare: [],
  favorites: ['aspan-city'],
  dashboard: null,
  reservations: null,
  rooms: null,
  pricing: null,
  forecast: null,
  forecastPeriod: 7,
  recommendations: null,
  recommendationApplied: false,
  verifications: null,
  selectedVerification: null,
  trips: null,
  bookingDraft: null,
  latestBooking: null,
  myVerification: null,
  aiMessages: [{ from: 'ai', text: 'Здравствуйте! Помогу подобрать отель из демо-каталога. Напишите город и пожелания, затем уточняйте их в диалоге — например: «А теперь дешевле».', suggestions: ['Алматы до 60 тысяч с завтраком', 'Астана с бассейном', 'Отель рядом с центром до 50 000 ₸'] }],
  hotelAiMessages: [{ from: 'ai', text: 'Здравствуйте! Разберём демоданные Aspan City Hotel: загрузку, категории и цены. Можно продолжать вопросами «А на 30 дней?» или «А если повысить на 5%?».', suggestions: ['Какая загрузка на 7 дней?', 'Какие категории продаются хуже?', 'Покажи выручку и RevPAR'] }],
  assistantBusy: { guest: false, hotel: false },
  assistantVersion: { guest: 0, hotel: 0 },
  searchSummary: '',
  searchPrompt: ''
};

let lastAnimatedPath = null;
let motionObserver = null;
let motionBound = false;

function viewEnterClass() {
  if (state.loading || lastAnimatedPath === state.path) return '';
  lastAnimatedPath = state.path;
  return ' view-enter';
}

function hotelCities() {
  return [...new Set((state.hotels || []).map((hotel) => hotel.city).filter(Boolean))].sort((left, right) => left.localeCompare(right, 'ru'));
}

function cityOptions(selected = '') {
  return [''].concat(hotelCities()).map((city) => '<option value="' + esc(city) + '" ' + (city === selected ? 'selected' : '') + '>' + (city || 'Весь Казахстан') + '</option>').join('');
}

function setupMotion() {
  document.body.classList.add('motion-ready');
  const targets = $$('.landing-platform, .landing-how, .landing-faq, .hotel-card, .result-card, .kpi, .ai-card, .room-card, .platform-grid > .card, .how-grid > div');
  targets.forEach((target, index) => {
    target.classList.add('motion-target');
    target.style.setProperty('--motion-delay', Math.min(index * 42, 420) + 'ms');
  });
  if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }
  if (!motionObserver) {
    motionObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        motionObserver.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  }
  targets.forEach((target) => {
    if (!target.classList.contains('is-visible')) motionObserver.observe(target);
  });
  if (motionBound) return;
  motionBound = true;
  let pointerFrame = 0;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || reducedMotionQuery.matches) return;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      const hero = $('.hero-visual');
      if (hero) {
        const rect = hero.getBoundingClientRect();
          const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width - 0.5)) * 10;
          const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height - 0.5)) * 8;
        hero.style.setProperty('--pointer-x', x.toFixed(2) + 'px');
        hero.style.setProperty('--pointer-y', y.toFixed(2) + 'px');
      }
      pointerFrame = 0;
    });
  }, { passive: true });
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    document.documentElement.style.setProperty('--scroll-progress', (progress * 100).toFixed(2) + '%');
    document.documentElement.style.setProperty('--scroll-y', window.scrollY.toFixed(1) + 'px');
  }, { passive: true });
  window.dispatchEvent(new Event('scroll'));
}

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('x-hotelx-context', state.context);
  if (options.body && !headers.has('content-type')) headers.set('content-type', 'application/json');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(path, { ...options, headers, signal: controller.signal });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.message || 'Не удалось выполнить запрос.');
      error.code = payload.error;
      error.status = response.status;
      throw error;
    }
    return payload;
  } catch (error) {
    if (error?.name === 'AbortError') {
      const timeoutError = new Error('Сервер не ответил за 15 секунд. Проверьте соединение и повторите попытку.');
      timeoutError.code = 'REQUEST_TIMEOUT';
      timeoutError.status = 504;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function toast(title, text = '', type = '') {
  const region = $('#toast-region');
  const item = document.createElement('div');
  item.className = 'toast ' + type;
  item.innerHTML = icon(type === 'error' ? 'info' : 'check') + '<div><strong>' + esc(title) + '</strong>' + (text ? '<span>' + esc(text) + '</span>' : '') + '</div>';
  region.append(item);
  setTimeout(() => item.remove(), 4200);
}

function showModal(content, large = false) {
  $('#modal-root').innerHTML = '<div class="modal-backdrop" data-action="close-modal"><section class="modal ' + (large ? 'modal-lg' : '') + '" role="dialog" aria-modal="true" data-modal-panel>' + content + '</section></div>';
  requestAnimationFrame(() => $('.modal button, .modal input, .modal select')?.focus());
}

function closeModal() {
  state.pendingSubscription = null;
  $('#modal-root').innerHTML = '';
}

function openVirtualTour(hotelId) {
  const hotel = (state.hotels || []).find((item) => item.id === hotelId);
  if (!hotel) return;
  showModal('<div class="modal-head"><div><p class="eyebrow">HOTELX VIRTUAL · DEMO</p><h2>Фото-тур по ' + esc(hotel.name) + '</h2><p>Панорамный источник 360° ещё не подключён. Ниже — демонстрационная навигация по фотографиям отеля.</p></div><button class="btn btn-icon btn-ghost" data-action="close-modal" aria-label="Закрыть">' + icon('close') + '</button></div><div class="tour-grid">' + hotel.gallery.map((photo, index) => '<figure class="tour-photo"><img src="' + photo + '" alt="' + esc(hotel.name) + ' — зона ' + (index + 1) + '"><figcaption><strong>' + (index === 0 ? 'Лобби и фасад' : index === 1 ? 'Номер' : 'Общая зона') + '</strong><span>Demo photo tour</span></figcaption></figure>').join('') + '</div><div class="ai-card" style="margin-top:18px"><div class="row"><span style="color:var(--ai)">' + icon('info') + '</span><p class="text-sm" style="margin:0;line-height:1.6">Когда владелец загрузит панорамы, здесь появятся точки перехода между помещениями, этажи и привязанные категории номеров.</p></div></div>', true);
}

function currentContext() {
  return state.me?.contexts.find((context) => context.id === state.context) || state.me?.contexts[0];
}

function requiredContext(path = state.path) {
  if (path.startsWith('/hotel')) return 'business';
  if (path.startsWith('/admin')) return 'platform';
  return 'personal';
}

function hasContext(id) {
  return Boolean(state.me?.contexts.some((context) => context.id === id));
}

function setContext(id, goHome = true) {
  const context = state.me?.contexts.find((item) => item.id === id);
  if (!context) {
    toast('Доступ запрещён', 'Этот контекст не назначен вашему аккаунту.', 'error');
    return;
  }
  state.context = id;
  state.contextMenu = false;
  persistLocal('context', id);
  if (goHome) navigate(context.home);
  else render();
}

function navigate(path) {
  const target = new URL(path, location.origin);
  if (target.pathname === '/register') state.intent = target.searchParams.get('intent') === 'manager' ? 'manager' : state.intent;
  const needed = requiredContext(target.pathname);
  if (state.me && needed !== state.context) {
    if (!hasContext(needed)) {
      toast('Нет доступа', 'Маршрут защищён серверными разрешениями.', 'error');
      return;
    }
    state.context = needed;
    persistLocal('context', needed);
  }
  history.pushState({}, '', target.pathname + target.search);
  state.path = target.pathname;
  state.contextMenu = false;
  document.body.classList.remove('sidebar-open');
  window.scrollTo({ top: 0, behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
  hydrateRoute().catch(handleLoadError);
}

function handleLoadError(error) {
  state.loading = false;
  state.error = error;
  render();
  toast(error.status === 403 ? 'Недостаточно прав' : 'Ошибка', error.message, 'error');
}

async function hydrateRoute() {
  state.loading = true;
  state.error = null;
  render();
  const path = state.path;
  if (path.startsWith('/app')) {
    if (!state.hotels) state.hotels = (await api('/api/guest/hotels')).hotels;
    if (path === '/app/verification') state.myVerification = await api('/api/verifications/me');
    if (path === '/app/trips' && !state.trips) state.trips = (await api('/api/trips')).trips;
    if (path === '/app/compare' && state.compare.length >= 2) {
      const result = await api('/api/guest/compare', { method: 'POST', body: JSON.stringify({ ids: state.compare }) });
      state.compareResult = result;
    }
  }
  if (path.startsWith('/hotel')) {
    const dashboardPaths = ['/hotel/dashboard', '/hotel/ai', '/hotel/analytics', '/hotel/pricing', '/hotel/forecast', '/hotel/recommendations'];
    if (dashboardPaths.includes(path) && !state.dashboard) {
      state.dashboard = (await api('/api/hotels/aspan-city/dashboard')).dashboard;
      if (state.dashboard.recommendation?.applied) state.recommendationApplied = true;
    }
    if (path === '/hotel/reservations' && !state.reservations) state.reservations = (await api('/api/hotels/aspan-city/reservations')).reservations;
    if (path === '/hotel/rooms' && !state.rooms) state.rooms = (await api('/api/hotels/aspan-city/rooms')).rooms;
    if (path === '/hotel/pricing' && !state.pricing) state.pricing = (await api('/api/hotels/aspan-city/pricing')).roomTypes;
    if ((path === '/hotel/forecast' || path === '/hotel/analytics') && !state.forecast) state.forecast = (await api('/api/hotels/aspan-city/forecast')).forecast;
    if (path === '/hotel/recommendations' && !state.recommendations) state.recommendations = (await api('/api/hotels/aspan-city/recommendations')).recommendations;
  }
  if (path.startsWith('/admin') && !state.verifications) {
    state.verifications = (await api('/api/admin/verifications')).verifications;
    state.selectedVerification = state.selectedVerification || state.verifications[0]?.id;
  }
  state.loading = false;
  render();
}

function brand(dark = false) {
  return '<button class="brand btn-ghost" data-route="/" aria-label="HotelX — главная"><span class="brand-mark">HX</span><span>HotelX<small>' + (dark ? 'Hotel intelligence' : 'Stay smarter') + '</small></span></button>';
}

function contextPopover(guest = false) {
  if (!state.contextMenu || !state.me) return '';
  return '<div id="profile-menu" class="context-popover ' + (guest || state.contextMenuAnchor === 'top' ? 'guest-context' : '') + '"><a class="context-item subscription-menu-item" href="/plans" data-route="/plans"><span class="avatar">' + icon('card') + '</span><span class="grow"><strong>Подключить подписку</strong><span>Тарифы HotelX · демо</span></span>' + icon('chevron') + '</a><div class="divider" style="margin:7px 3px"></div><div class="text-xs muted" style="padding:8px 11px 5px;font-weight:800">КОНТЕКСТ ДОСТУПА</div>' + state.me.contexts.map((context) =>
    '<button class="context-item ' + (context.id === state.context ? 'active' : '') + '" data-context="' + context.id + '"><span class="avatar">' + initials(context.label) + '</span><span class="grow"><strong>' + esc(context.label) + '</strong><span>' + esc(context.subtitle) + '</span></span>' + (context.id === state.context ? '<span class="context-tag">Активен</span>' : '') + '</button>'
  ).join('') + '<div class="divider" style="margin:7px 3px"></div><div class="text-xs muted" style="padding:3px 11px 8px">Контексты назначены сервером. Выбор не изменяет роль.</div></div>';
}

function positionContextMenu() {
  if (!state.contextMenu || state.contextMenuAnchor !== 'top') return;
  const menu = $('#profile-menu');
  const trigger = $('[data-action="toggle-context"][data-context-anchor="top"]');
  if (!menu || !trigger) return;
  const rect = trigger.getBoundingClientRect();
  const top = Math.max(8, rect.bottom + 8);
  menu.style.top = top + 'px';
  menu.style.right = Math.max(10, window.innerWidth - rect.right) + 'px';
  menu.style.maxHeight = Math.max(0, window.innerHeight - top - 12) + 'px';
}

window.addEventListener('resize', positionContextMenu);
window.addEventListener('scroll', positionContextMenu, { passive: true });

function guestNavLink(path, label, iconName, activePrefix = path) {
  const active = state.path.startsWith(activePrefix);
  return '<a href="' + path + '" data-route="' + path + '" class="' + (active ? 'active' : '') + '">' + icon(iconName) + '<span>' + label + '</span></a>';
}

function guestShell(content, viewClass = '') {
  const name = state.me?.user.name || 'Гость';
  return '<div class="guest-shell' + viewClass + '"><header class="guest-header"><div class="guest-header-inner">' + brand() + '<nav class="guest-nav" aria-label="Навигация гостя">' +
    guestNavLink('/app/explore', 'Поиск', 'search', '/app/explore') + guestNavLink('/app/trips', 'Поездки', 'calendar') + guestNavLink('/app/favorites', 'Избранное', 'heart') + guestNavLink('/app/ai', 'AI-помощник', 'spark') +
    '</nav><div class="guest-actions"><button class="btn btn-icon btn-ghost" aria-label="Уведомления" data-action="notifications">' + icon('bell') + '</button><button class="btn btn-ghost" data-action="toggle-context" data-context-anchor="top" aria-label="Профиль" aria-controls="profile-menu" aria-expanded="' + state.contextMenu + '"><span class="avatar">' + initials(name) + '</span></button></div></div></header>' +
    contextPopover(true) + '<main class="guest-main">' + content + '</main><nav class="guest-bottom-nav" aria-label="Мобильная навигация">' +
    guestNavLink('/app/explore', 'Поиск', 'search', '/app/explore') + guestNavLink('/app/trips', 'Поездки', 'calendar') + guestNavLink('/app/favorites', 'Сохранено', 'heart') + guestNavLink('/app/ai', 'AI', 'spark') + guestNavLink('/app/profile', 'Профиль', 'user') + '</nav>' + compareBar() + '</div>';
}

const HOTEL_NAV = [
  { label: 'Обзор', items: [['/hotel/dashboard','Дашборд','grid'],['/hotel/ai','AI-помощник','spark'],['/hotel/analytics','Аналитика','chart']] },
  { label: 'Отель', items: [['/hotel/reservations','Бронирования','booking'],['/hotel/rooms','Номера','bed'],['/hotel/pricing','Цены','tag'],['/hotel/forecast','Прогноз','forecast']] },
  { label: 'AI', items: [['/hotel/recommendations','Рекомендации','spark']] },
  { label: 'Отчёты', items: [['/hotel/reports','Отчёты','file']] },
  { label: 'Управление', items: [['/hotel/staff','Команда','users'],['/hotel/integrations','Интеграции','plug'],['/hotel/subscription','Подписка','card'],['/hotel/settings','Настройки','settings']] }
];

const ADMIN_NAV = [
  { label: 'Платформа', items: [['/admin/dashboard','Дашборд','grid'],['/admin/verifications','Верификации','shield'],['/admin/users','Пользователи','users'],['/admin/hotels','Отели','building']] },
  { label: 'Система', items: [['/admin/errors','Системные события','forecast'],['/admin/settings','Настройки','settings']] }
];

function sideNav(groups) {
  return groups.map((group) => '<div class="nav-group"><div class="nav-label">' + group.label + '</div><nav class="side-nav">' + group.items.map((item) => {
    const active = state.path === item[0];
    return '<a href="' + item[0] + '" data-route="' + item[0] + '" class="' + (active ? 'active ' : '') + (item[1].startsWith('AI-') || item[1] === 'Рекомендации' ? 'ai-link' : '') + '">' + icon(item[2]) + '<span>' + item[1] + '</span></a>';
  }).join('') + '</nav></div>').join('');
}

function workspaceShell(content, admin = false, viewClass = '') {
  const ctx = currentContext();
  const groups = admin ? ADMIN_NAV : HOTEL_NAV;
  return '<div class="app-shell' + viewClass + '"><aside class="sidebar">' + brand(true) + '<button class="side-context" data-action="toggle-context"><span class="avatar">' + initials(ctx?.label) + '</span><span class="grow"><strong>' + esc(ctx?.label || '') + '</strong><span>' + esc(ctx?.subtitle || '') + '</span></span>' + icon('chevron') + '</button>' + sideNav(groups) +
    '<div class="side-footer"><div class="side-user"><span class="avatar">' + initials(state.me?.user.name) + '</span><span class="grow"><strong>' + esc(state.me?.user.name || '') + '</strong><span>' + esc(state.me?.user.email || '') + '</span></span></div></div></aside>' + contextPopover(false) +
    '<div class="workspace"><header class="workspace-topbar"><button class="btn btn-icon btn-ghost mobile-menu" data-action="open-sidebar" aria-label="Открыть меню">' + icon('menu') + '</button><h2>' + esc(pageTitle()) + '</h2><div class="top-actions"><button class="btn btn-icon btn-ghost" data-action="notifications" aria-label="Уведомления">' + icon('bell') + '</button><button class="btn btn-sm" data-action="toggle-context" data-context-anchor="top" aria-label="Профиль" aria-controls="profile-menu" aria-expanded="' + state.contextMenu + '">' + icon(admin ? 'shield' : 'building') + '<span class="nowrap">' + esc(ctx?.label || '') + '</span></button></div></header><main class="workspace-main">' + content + '</main></div></div>';
}

function pageTitle() {
  const all = [...HOTEL_NAV, ...ADMIN_NAV].flatMap((group) => group.items);
  return all.find((item) => item[0] === state.path)?.[1] || 'HotelX';
}

const HOTEL_ROUTE_PERMISSIONS = {
  '/hotel/dashboard': 'VIEW_DASHBOARD', '/hotel/ai': 'VIEW_ANALYTICS', '/hotel/analytics': 'VIEW_ANALYTICS',
  '/hotel/reservations': 'VIEW_RESERVATIONS', '/hotel/rooms': 'VIEW_ROOMS', '/hotel/pricing': 'VIEW_PRICING',
  '/hotel/forecast': 'VIEW_ANALYTICS', '/hotel/recommendations': 'VIEW_PRICING', '/hotel/reports': 'VIEW_REPORTS',
  '/hotel/staff': 'MANAGE_STAFF', '/hotel/integrations': 'MANAGE_INTEGRATIONS', '/hotel/settings': 'MANAGE_SETTINGS',
  '/hotel/subscription': 'MANAGE_SETTINGS', '/hotel/verification': 'ALL'
};

function canHotelRoute(path) {
  const context = currentContext();
  const required = HOTEL_ROUTE_PERMISSIONS[path];
  if (!required) return true;
  return context?.permissions?.includes('ALL') || context?.permissions?.includes(required);
}

function permissionDeniedBlock() {
  return '<div class="card empty"><div class="empty-icon" style="background:var(--red-soft);color:var(--red)">' + icon('lock') + '</div><h3>Недостаточно прав</h3><p>Сервер не разрешает этот раздел для вашей роли в отеле.</p><button class="btn btn-primary" data-route="' + (currentContext()?.home || '/app/explore') + '">Вернуться</button></div>';
}

function loadingBlock() {
  return '<div class="card empty"><div class="empty-icon">' + icon('spark') + '</div><h3>Обновляем данные</h3><p>Проверяем доступ и загружаем актуальную информацию…</p></div>';
}

function errorBlock() {
  return '<div class="card empty"><div class="empty-icon" style="background:var(--red-soft);color:var(--red)">' + icon('lock') + '</div><h3>' + (state.error?.status === 403 ? 'Доступ запрещён' : 'Не удалось загрузить') + '</h3><p>' + esc(state.error?.message || 'Попробуйте ещё раз.') + '</p><button class="btn btn-primary" data-action="retry">Повторить</button></div>';
}

function bootstrapError() {
  const title = state.error?.status === 403 ? 'Доступ запрещён' : 'HotelX не удалось запустить';
  return '<main class="boot boot-error"><section class="card empty"><div class="empty-icon" style="background:var(--red-soft);color:var(--red)">' + icon('info') + '</div><h2>' + title + '</h2><p>' + esc(state.error?.message || 'Проверьте соединение и повторите попытку.') + '</p><button class="btn btn-primary" data-action="retry-init">Повторить загрузку</button></section></main>';
}

function compareBar() {
  if (!state.path.startsWith('/app') || state.compare.length === 0 || state.path === '/app/compare') return '';
  const hotels = (state.hotels || []).filter((hotel) => state.compare.includes(hotel.id));
  return '<div class="compare-bar"><div class="compare-mini">' + hotels.map((hotel) => '<img src="' + hotel.image + '" alt="">').join('') + '</div><div class="grow"><strong>' + hotels.length + ' из 3</strong><div class="text-xs" style="color:#98a2b3">Выбрано для сравнения</div></div><button class="btn btn-sm" data-action="clear-compare">Очистить</button><button class="btn btn-sm btn-primary" data-route="/app/compare" ' + (hotels.length < 2 ? 'disabled' : '') + '>Сравнить ' + icon('arrow') + '</button></div>';
}

function hotelCard(hotel) {
  const favorite = state.favorites.includes(hotel.id);
  return '<article class="hotel-card"><div class="hotel-image"><img src="' + hotel.image + '" alt="' + esc(hotel.name) + '" loading="lazy"><button class="favorite-btn ' + (favorite ? 'active' : '') + '" data-favorite="' + hotel.id + '" aria-label="В избранное">' + icon('heart') + '</button><span class="match-pill">✦ AI Match ' + hotel.match + '%</span></div><div class="hotel-body"><div class="row-between" style="align-items:flex-start"><h3>' + esc(hotel.name) + '</h3><span class="badge badge-brand">' + esc(hotel.city) + '</span></div><div class="hotel-location">' + esc(hotel.location) + '</div><div class="hotel-meta"><span class="rating">' + hotel.rating + ' <span class="muted">(' + hotel.reviews + ')</span></span><div class="hotel-price"><strong class="price">' + money(hotel.price) + '</strong><span>за ночь</span></div></div><div class="row" style="margin-top:15px"><button class="btn btn-sm grow" data-compare="' + hotel.id + '">' + (state.compare.includes(hotel.id) ? '✓ В сравнении' : 'Сравнить') + '</button><button class="btn btn-sm btn-primary grow" data-route="/app/hotel/' + hotel.id + '">Смотреть</button></div></div></article>';
}


// Illustrative SaaS plans only; never grant permissions or initiate a payment.
const SUBSCRIPTION_PLANS = [
  { id: 'starter', name: 'Starter', monthly: 19900, description: 'Для небольшого отеля и первого знакомства с HotelX.', features: ['1 отель · до 30 номеров', 'До 3 участников команды', 'Бронирования и базовые отчёты', 'Демопомощник для владельца'] },
  { id: 'pro', name: 'Pro', monthly: 49900, description: 'Для команды, которая управляет выручкой каждый день.', features: ['1 отель · до 150 номеров', 'До 15 участников команды', 'Аналитика ADR и RevPAR', 'Прогноз спроса и рекомендации', 'Расширенные демоотчёты'] },
  { id: 'enterprise', name: 'Enterprise', monthly: 99900, description: 'Для сети отелей с общими процессами и аналитикой.', features: ['До 10 отелей · до 1 000 номеров', 'До 100 участников команды', 'Возможности Pro для сети', 'Макеты интеграций и сводных отчётов', 'Индивидуальное сопровождение — концепт'] }
];

function normalizeSubscription(value) {
  return value && SUBSCRIPTION_PLANS.some((plan) => plan.id === value.plan) && ['monthly', 'annual'].includes(value.cycle) ? { plan: value.plan, cycle: value.cycle } : null;
}

function subscriptionQuote(plan, cycle) {
  const monthly = cycle === 'annual' ? plan.monthly * 0.8 : plan.monthly;
  return { monthly, total: monthly * (cycle === 'annual' ? 12 : 1), saving: cycle === 'annual' ? plan.monthly * 12 - monthly * 12 : 0 };
}

function setBillingCycle(cycle) {
  if (!['monthly', 'annual'].includes(cycle)) return;
  state.billingCycle = cycle;
  render();
  $('[data-billing-cycle="' + cycle + '"]')?.focus();
}

function renderSubscriptions() {
  const active = normalizeSubscription(state.subscription);
  const activePlan = SUBSCRIPTION_PLANS.find((plan) => plan.id === active?.plan);
  return '<section class="subscription-section" id="plans" aria-labelledby="plans-title"><div class="subscription-heading"><p class="eyebrow">HOTELX ДЛЯ БИЗНЕСА</p><h2 id="plans-title">Ваш отель растёт. HotelX рядом.</h2><p class="muted">Выберите подходящий масштаб работы — от первого отеля до сети.</p><span class="badge badge-warning">Демо-подписки · без списаний</span></div>' +
    '<div class="billing-switch" role="group" aria-label="Период подписки"><button class="btn' + (state.billingCycle === 'monthly' ? ' btn-primary' : '') + '" data-billing-cycle="monthly" aria-pressed="' + (state.billingCycle === 'monthly') + '">Месяц</button><button class="btn' + (state.billingCycle === 'annual' ? ' btn-primary' : '') + '" data-billing-cycle="annual" aria-pressed="' + (state.billingCycle === 'annual') + '">Год <span class="billing-saving">−20%</span></button></div>' +
    (activePlan ? '<div class="subscription-current" role="status"><div><strong>Демо-план: ' + activePlan.name + '</strong><p>' + (active.cycle === 'annual' ? 'Годовой' : 'Месячный') + ' период · ' + money(subscriptionQuote(activePlan, active.cycle).total) + ' условно за период. Списаний и автопродления нет.</p></div><button class="btn btn-sm" data-action="cancel-subscription">Отменить демо-подписку</button></div>' : '') +
    '<div class="subscription-grid">' + SUBSCRIPTION_PLANS.map((plan) => {
      const quote = subscriptionQuote(plan, state.billingCycle);
      const selected = active?.plan === plan.id && active?.cycle === state.billingCycle;
      return '<article class="card subscription-card' + (plan.id === 'pro' ? ' subscription-featured' : '') + '"><div class="subscription-card-top"><span class="report-icon">' + icon(plan.id === 'starter' ? 'building' : plan.id === 'pro' ? 'spark' : 'briefcase') + '</span>' + (plan.id === 'pro' ? '<span class="badge badge-brand">Выбор команды</span>' : '') + '</div><h3>' + plan.name + '</h3><p class="muted subscription-description">' + plan.description + '</p><div class="subscription-price"><strong>' + money(quote.monthly) + '</strong><span> / мес.</span></div><p class="subscription-total">' + (state.billingCycle === 'annual' ? money(quote.total) + ' за год · экономия ' + money(quote.saving) : money(quote.total) + ' за месяц · без обязательств') + '</p><button class="btn ' + (plan.id === 'pro' ? 'btn-primary' : '') + '" data-subscription-plan="' + plan.id + '" ' + (selected ? 'disabled' : '') + '>' + (selected ? 'Текущий демо-план' : 'Попробовать ' + plan.name) + '</button><ul class="subscription-features">' + plan.features.map((feature) => '<li>' + icon('check') + '<span>' + feature + '</span></li>').join('') + '</ul></article>';
    }).join('') + '</div><p class="subscription-disclaimer">Цены и лимиты условные. Выбор сохраняется только в этом браузере для демо-отеля Aspan City Hotel. Карта не нужна, оплаты и автопродления нет. Тариф не изменяет доступ к функциям: все демовозможности остаются доступны в рамках вашей роли.</p></section>';
}

function openSubscriptionConfirmation(id) {
  const plan = SUBSCRIPTION_PLANS.find((item) => item.id === id);
  if (!plan) return;
  state.pendingSubscription = { plan: id, cycle: state.billingCycle };
  const quote = subscriptionQuote(plan, state.billingCycle);
  showModal('<div class="modal-head"><div><p class="eyebrow">ДЕМО-ПОДПИСКА</p><h2>Попробовать ' + plan.name + '?</h2><p>Проверьте выбранный период перед подтверждением.</p></div><button class="btn btn-icon btn-ghost" data-action="close-modal" aria-label="Закрыть">' + icon('close') + '</button></div><div class="detail-list"><div class="detail-item"><span>Период</span><strong>' + (state.billingCycle === 'annual' ? '12 месяцев' : '1 месяц') + '</strong></div><div class="detail-item"><span>Условная стоимость</span><strong>' + money(quote.total) + '</strong></div><div class="detail-item"><span>К оплате сейчас</span><strong>0 ₸</strong></div></div><p class="subscription-disclaimer">Это демонстрация. Деньги не списываются, платёжные данные не запрашиваются. Предыдущий демо-план будет заменён после подтверждения.</p><div class="modal-actions"><button class="btn" data-action="close-modal">Назад</button><button class="btn btn-primary" data-action="confirm-subscription">Подтвердить демо-план</button></div>');
}

function saveDemoSubscription(value) {
  try { persistLocal('demo-subscription:aspan-city', value); }
  catch { toast('Не удалось сохранить', 'Разрешите локальное хранилище браузера и повторите выбор.', 'error'); return false; }
  state.subscription = value;
  closeModal();
  render();
  return true;
}

function confirmSubscription() {
  const pending = normalizeSubscription(state.pendingSubscription);
  if (pending && saveDemoSubscription(pending)) toast('Демо-подписка выбрана', 'План сохранён в этом браузере. Списаний нет.', 'success');
}

function openSubscriptionCancellation() {
  if (!state.subscription) return;
  state.pendingSubscription = null;
  showModal('<div class="modal-head"><div><h2>Отменить демо-подписку?</h2><p>Выбор тарифа будет сброшен только в этом браузере. Все демофункции останутся доступны.</p></div><button class="btn btn-icon btn-ghost" data-action="close-modal" aria-label="Закрыть">' + icon('close') + '</button></div><div class="modal-actions"><button class="btn" data-action="close-modal">Оставить план</button><button class="btn btn-danger" data-action="confirm-cancel-subscription">Отменить демо-подписку</button></div>');
}

function cancelSubscription() {
  if (state.subscription && saveDemoSubscription(null)) toast('Демо-подписка отменена', 'Сохранённый выбор сброшен. Списаний не было.', 'success');
}

function landingSections() {
  return '<section class="landing-platform"><div class="section-head"><div><p class="eyebrow">HOTELX PLATFORM</p><h2>Один рабочий контур для отеля и гостя</h2><p>Публичный каталог и приватная аналитика разделены ролями и серверными разрешениями.</p></div><span class="badge badge-warning">MVP · Demo data</span></div><div class="platform-grid"><article class="card"><div class="report-icon">' + icon('chart') + '</div><h3>Для владельца</h3><p class="muted">Загрузка, ADR, RevPAR, прогноз спроса и рекомендации по ценам с подтверждением перед применением.</p><button class="btn btn-sm" data-route="/hotel/dashboard">Открыть dashboard</button></article><article class="card"><div class="report-icon">' + icon('search') + '</div><h3>Для путешественника</h3><p class="muted">Диалог о поездке, подбор по демо-каталогу, сравнение, избранное и прозрачная демо-бронь.</p><button class="btn btn-sm btn-primary" data-route="/app/explore">Найти отель</button></article><article class="card"><div class="report-icon">' + icon('shield') + '</div><h3>Безопасность по умолчанию</h3><p class="muted">Guest не видит revenue и owner API. Доступ к отелю выдаётся только после серверной верификации.</p><button class="btn btn-sm" data-route="/register?intent=manager">Подключить отель</button></article></div></section>' +
    '<section class="landing-how"><div><p class="eyebrow">КАК ЭТО РАБОТАЕТ</p><h2>От запроса до решения за несколько шагов</h2></div><div class="how-grid"><div><span>01</span><strong>Опишите поездку</strong><p>Город, бюджет, даты и удобства обычными словами.</p></div><div><span>02</span><strong>Сравните варианты</strong><p>AI объясняет совпадение и показывает компромиссы.</p></div><div><span>03</span><strong>Примите решение</strong><p>Гость бронирует демо-вариант, владелец подтверждает изменения цены.</p></div></div></section>' +
    renderSubscriptions() + '<section class="landing-faq"><div><p class="eyebrow">FAQ</p><h2>Прозрачный MVP</h2></div><div class="faq-list"><details><summary>Это реальные цены и наличие?</summary><p>Нет. Публичный каталог явно помечен как демо до подключения PMS или channel manager.</p></details><details><summary>AI сам меняет цену?</summary><p>Нет. Рекомендация показывает объяснение и ждёт подтверждения владельца.</p></details><details><summary>Есть ли настоящий 360°-тур?</summary><p>Пока нет. В карточке доступен фото-тур с явной пометкой demo; панорамы можно подключить позже.</p></details></div></section><footer class="landing-footer"><span>© 2026 HotelX</span><span>Казахстан · KZT · Русский по умолчанию</span><button class="link" data-route="/login">Войти</button></footer>';
}

function renderLanding(viewClass = '') {
  return '<div class="landing"><main><hotelx-harbor></hotelx-harbor><div class="harbor-demo-slot"></div>' +
    '<section class="value-strip" id="how"><div class="value-grid"><div class="value-item"><span class="value-number">01</span><div><h3>Спрос обычными словами</h3><p>Напишите пожелания — демопомощник подберёт отели и запомнит уточнения в диалоге.</p></div></div><div class="value-item"><span class="value-number">02</span><div><h3>Выбор с объяснением</h3><p>Сравните варианты и поймите, почему HotelX рекомендует именно этот отель.</p></div></div><div class="value-item"><span class="value-number">03</span><div><h3>Управление на данных</h3><p>Отель получает прогноз спроса и проверяемые рекомендации по цене.</p></div></div></div></section>' + landingSections() + '</main></div>';
}

function renderExplore() {
  const hotels = state.hotels || [];
  return '<section class="explore-hero"><div class="explore-content"><p class="eyebrow" style="color:#bfcaff">ДЕМОПОМОЩНИК · КАЗАХСТАН</p><h1>Откройте Казахстан с AI.</h1><p>Просто расскажите о поездке. Демопомощник подберёт варианты и поможет уточнить выбор в диалоге.</p><form class="ai-search" id="ai-search-form"><span class="ai-orb">✦</span><input id="ai-search-input" aria-label="AI-запрос" maxlength="2000" placeholder="Например: отель в Актау с бассейном до 60 000 ₸"><button class="btn btn-ai" type="submit">Подобрать отель ' + icon('arrow') + '</button></form></div></section>' +
    '<section class="section"><div class="section-head"><div><div class="row wrap" style="margin-bottom:8px"><span class="badge badge-warning">Демо-каталог</span><span class="text-sm muted">' + hotels.length + ' отелей · ' + hotelCities().length + ' городов</span></div><h2>Популярные отели Казахстана</h2><p>Сравните цену, расположение, удобства и отзывы гостей.</p></div><button class="link" data-action="all-hotels">Весь каталог →</button></div><div class="hotel-grid">' + hotels.slice(0, 6).map(hotelCard).join('') + '</div></section>' +
    '<section class="section ai-card"><div class="row-between wrap"><div style="max-width:700px"><div class="ai-label">✦ Как работает AI Match</div><h2 style="margin-bottom:8px">Не просто процент — понятное объяснение</h2><p class="muted" style="margin:0;line-height:1.6">HotelX сопоставляет ваш бюджет, расстояние, удобства и стиль поездки. Откройте карточку, чтобы увидеть плюсы и возможные компромиссы.</p></div><button class="btn btn-ai" data-route="/app/hotel/aspan-city">Посмотреть анализ</button></div></section>';
}

function renderSearchResults() {
  const hotels = state.searchResults || state.hotels || [];
  return '<div class="page-head"><div><p class="eyebrow">ПОДБОР В ДИАЛОГЕ</p><h1>Подходящие отели</h1><p>' + hotels.length + ' вариант(а/ов) из демо-каталога</p></div><button class="btn btn-ai" data-route="/app/ai">' + icon('spark') + ' Продолжить диалог</button></div>' +
    '<section class="ai-card search-conversation"><div class="row-between wrap"><div><span class="badge badge-warning">Демо · без подключения к ИИ</span><h2>Пожелания можно просто написать</h2><p class="muted">' + esc(state.searchSummary || 'Город, бюджет и удобства — своими словами, без заполнения фильтров.') + '</p></div></div><form class="ai-search" id="ai-search-form"><input id="ai-search-input" maxlength="2000" aria-label="Уточнить подбор" placeholder="Например: а теперь до 40 тысяч или в другом городе" ' + (state.assistantBusy.guest ? 'disabled' : '') + '><button class="btn btn-ai" type="submit" ' + (state.assistantBusy.guest ? 'disabled' : '') + '>' + (state.assistantBusy.guest ? 'Подбираю…' : 'Уточнить подбор') + '</button></form></section>' +
    '<div class="result-list results-conversation">' + (hotels.length ? hotels.map(renderResultCard).join('') : '<div class="card empty"><div class="empty-icon">' + icon('search') + '</div><h3>Точных совпадений нет</h3><p>Пожелания сохранены. Напишите, что можно изменить — например, «без ограничений по бюджету».</p><button class="btn btn-primary" data-route="/app/ai">Обсудить с помощником</button></div>') + '</div>';
}

function renderResultCard(hotel) {
  return '<article class="card result-card"><div class="hotel-image"><img src="' + hotel.image + '" alt="' + esc(hotel.name) + '"><span class="match-pill">✦ AI Match ' + hotel.match + '%</span><button class="favorite-btn ' + (state.favorites.includes(hotel.id) ? 'active' : '') + '" data-favorite="' + hotel.id + '">' + icon('heart') + '</button></div><div class="result-content"><div class="row-between"><div><div class="row wrap" style="margin-bottom:6px"><span class="badge badge-brand">' + esc(hotel.city) + '</span><span class="badge badge-warning">Демо</span></div><h3>' + esc(hotel.name) + '</h3><div class="muted text-sm">' + esc(hotel.location) + ' · ' + hotel.distance + ' км до центра</div></div><span class="rating">' + hotel.rating + '</span></div><div class="result-amenities">' + hotel.amenities.slice(0, 5).map((item) => '<span class="amenity">' + esc(item) + '</span>').join('') + '</div><p class="text-sm muted" style="line-height:1.55">' + esc(hotel.matchReason) + '</p><div class="result-bottom"><label class="compare-check"><input type="checkbox" data-compare-checkbox="' + hotel.id + '" ' + (state.compare.includes(hotel.id) ? 'checked' : '') + '> Сравнить</label><div class="row"><div class="hotel-price"><strong class="price">' + money(hotel.price) + '</strong><span>' + money(hotel.price * (state.parsedSearch?.nights || 3)) + ' за ' + (state.parsedSearch?.nights || 3) + ' ночи/ночей</span></div><button class="btn btn-primary" data-route="/app/hotel/' + hotel.id + '">Смотреть</button></div></div></div></article>';
}

function currentHotel() {
  const match = state.path.match(/^\/app\/hotel\/([^/]+)/);
  return (state.hotels || []).find((hotel) => hotel.id === match?.[1]);
}

function renderHotelDetail() {
  const hotel = currentHotel();
  if (!hotel) return notFound();
  return '<button class="btn btn-ghost btn-sm" data-route="/app/search" style="margin-bottom:16px">← Назад к результатам</button><div class="gallery">' + hotel.gallery.map((photo, index) => '<img src="' + photo + '" alt="' + esc(hotel.name) + (index ? ' — интерьер' : '') + '">').join('') + '</div><div class="hotel-detail-head"><div><div class="row wrap" style="margin-bottom:8px"><span class="badge badge-brand">' + esc(hotel.city) + '</span><span class="badge badge-brand">' + esc(hotel.type) + '</span><span class="badge badge-warning">Демо-каталог</span><span class="rating">' + hotel.rating + ' · ' + hotel.reviews + ' отзывов</span></div><h1>' + esc(hotel.name) + '</h1><p class="muted">' + icon('map') + ' ' + esc(hotel.address) + ' · ' + hotel.distance + ' км до центра</p></div><div class="row wrap"><button class="btn" data-action="open-tour" data-hotel="' + hotel.id + '">' + icon('eye') + ' Фото-тур</button><button class="btn" data-favorite="' + hotel.id + '">' + icon('heart') + (state.favorites.includes(hotel.id) ? ' Сохранено' : ' Сохранить') + '</button><button class="btn" data-compare="' + hotel.id + '">Сравнить</button></div></div>' +
    '<div class="detail-layout"><div class="stack"><section class="card"><h2>Об отеле</h2><p class="muted" style="line-height:1.7">' + esc(hotel.description) + '</p><div class="feature-list">' + hotel.amenities.map((item) => '<div class="feature">✓ ' + esc(item) + '</div>').join('') + '</div></section><section><div class="section-head"><div><h2>Доступные номера</h2><p>7–10 ноября · 3 ночи · 2 гостя</p></div></div><div class="stack">' + hotel.rooms.map((room) => renderRoom(hotel, room)).join('') + '</div></section></div>' +
    '<aside class="stack detail-side"><section class="ai-card"><div class="ai-label">✦ AI-анализ</div><div class="score-big"><div class="match-ring"><span>' + hotel.match + '%</span></div><div><h3 style="margin-bottom:4px">Сильное совпадение</h3><span class="muted text-sm">с вашим запросом</span></div></div><div class="divider"></div><p class="text-sm" style="line-height:1.6">' + esc(hotel.matchReason) + '</p><h4>Почему подойдёт</h4>' + hotel.pros.map((item) => '<div class="text-sm" style="margin:8px 0;color:#087a5a">✓ ' + esc(item) + '</div>').join('') + '<h4 style="margin-top:16px">Учтите</h4>' + hotel.cons.map((item) => '<div class="text-sm muted" style="margin:8px 0">• ' + esc(item) + '</div>').join('') + '</section><section class="card"><span class="text-xs muted">Цена от</span><h2 class="price" style="margin:5px 0">' + money(hotel.price) + ' <small class="muted" style="font-size:12px;font-weight:500">/ ночь</small></h2><p class="text-sm muted">Все сборы будут показаны до оплаты.</p><button class="btn btn-primary" style="width:100%" data-book="' + hotel.rooms[0].id + '" data-hotel="' + hotel.id + '">Выбрать номер</button></section></aside></div>';
}

function renderRoom(hotel, room) {
  return '<article class="card room-card"><img src="' + room.image + '" alt="' + esc(room.type) + '"><div class="room-info"><h3>' + esc(room.type) + '</h3><p class="text-sm muted">' + room.guests + ' гостя · ' + esc(room.bed) + '</p><div class="result-amenities">' + room.amenities.map((item) => '<span class="amenity">' + esc(item) + '</span>').join('') + '</div><span class="badge badge-warning">Осталось ' + room.left + '</span></div><div class="room-book"><div><strong class="price" style="font-size:20px">' + money(room.price) + '</strong><div class="text-xs muted">за ночь</div></div><button class="btn btn-primary" data-book="' + room.id + '" data-hotel="' + hotel.id + '">Забронировать</button></div></article>';
}

function renderCompare() {
  const result = state.compareResult;
  if (!result || result.hotels.length < 2) return '<div class="page-head"><div><h1>Сравнение отелей</h1><p>Выберите от двух до трёх вариантов.</p></div></div><div class="card empty"><div class="empty-icon">' + icon('grid') + '</div><h3>Добавьте ещё один отель</h3><p>Сравнение поможет увидеть отличия по цене, локации и удобствам.</p><button class="btn btn-primary" data-route="/app/search">К результатам</button></div>';
  const hotels = result.hotels;
  const row = (label, value) => '<tr><th>' + label + '</th>' + hotels.map((hotel) => '<td>' + value(hotel) + '</td>').join('') + '</tr>';
  return '<div class="page-head"><div><p class="eyebrow">AI COMPARE</p><h1>Сравнение отелей</h1><p>' + hotels.length + ' варианта по главным параметрам поездки.</p></div><button class="btn" data-action="clear-compare">Очистить</button></div><div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Параметр</th>' + hotels.map((hotel) => '<th><div class="compare-hotel"><img src="' + hotel.image + '" alt=""><strong>' + esc(hotel.name) + '</strong></div></th>').join('') + '</tr></thead><tbody>' + row('AI Match', (h) => '<span class="badge badge-ai">✦ ' + h.match + '%</span>') + row('Город', (h) => esc(h.city)) + row('Цена / ночь', (h) => '<strong>' + money(h.price) + '</strong>') + row('Рейтинг', (h) => '<span class="rating">' + h.rating + '</span> · ' + h.reviews) + row('До центра', (h) => h.distance + ' км') + row('Завтрак', (h) => h.amenities.includes('Завтрак') ? '✓ Включён' : '—') + row('Бассейн', (h) => h.amenities.includes('Бассейн') ? '✓ Есть' : '—') + '<tr><th>Действие</th>' + hotels.map((hotel) => '<td><button class="btn btn-sm btn-primary" data-route="/app/hotel/' + hotel.id + '">Открыть</button></td>').join('') + '</tr></tbody></table></div><section class="ai-card" style="margin-top:18px"><div class="ai-label">✦ Рекомендация HotelX</div><h2>Лучший общий выбор</h2><p style="line-height:1.65;max-width:820px">' + esc(result.recommendation) + '</p><button class="btn btn-ai" data-route="/app/hotel/' + hotels[0].id + '">Выбрать рекомендованный</button></section>';
}

function bookingInfo() {
  let draft = state.bookingDraft || {};
  const hotel = (state.hotels || []).find((item) => item.id === draft.hotelId) || currentHotel();
  const room = hotel?.rooms.find((item) => item.id === draft.roomId) || hotel?.rooms[0];
  if (hotel && room && (!draft.hotelId || !draft.roomId)) {
    draft = { ...draft, hotelId: hotel.id, roomId: room.id, step: draft.step || 1, guests: draft.guests || 2, nights: draft.nights || 3 };
    state.bookingDraft = draft;
    persistLocal('booking-draft', draft);
  }
  return { draft, hotel, room };
}

function renderBooking() {
  if (state.latestBooking && state.bookingDraft?.step === 4) return renderConfirmation();
  const { draft, hotel, room } = bookingInfo();
  if (!hotel || !room) return errorBlock();
  const step = draft.step || 1;
  const labels = ['Номер', 'Гость', 'Оплата', 'Готово'];
  return '<div class="page-head"><div><p class="eyebrow">Безопасное бронирование</p><h1>Завершите бронирование</h1><p>Проверьте детали — стоимость пересчитывается на сервере.</p></div></div><div class="steps">' + labels.map((label, index) => '<div class="step ' + (step >= index + 1 ? 'active' : '') + '"><span class="step-num">' + (step > index + 1 ? '✓' : index + 1) + '</span><span>' + label + '</span></div>').join('') + '</div><div class="booking-layout"><section class="card">' + bookingStep(step, hotel, room) + '</section><aside class="card booking-summary">' + bookingSummary(hotel, room) + '</aside></div>';
}

function bookingStep(step, hotel, room) {
  if (step === 1) return '<h2>Детали проживания</h2><p class="muted">Выбранный номер доступен на эти даты.</p><div class="form-grid"><div class="field"><label>Заезд</label><input class="input" value="7 ноября 2026" readonly></div><div class="field"><label>Выезд</label><input class="input" value="10 ноября 2026" readonly></div><div class="field"><label>Гости</label><select class="select" id="booking-guests"><option>2 гостя</option><option>1 гость</option></select></div><div class="field"><label>Номер</label><input class="input" value="' + esc(room.type) + '" readonly></div></div><div class="modal-actions"><button class="btn btn-primary" data-booking-next="2">Продолжить ' + icon('arrow') + '</button></div>';
  if (step === 2) return '<h2>Информация о госте</h2><p class="muted">Контакты сохранятся только в демонстрационной брони HotelX.</p><div class="form-grid"><div class="field"><label>Имя</label><input class="input" id="guest-first" value="' + esc(state.me?.user.name?.split(' ')[0] || 'Алекс') + '"></div><div class="field"><label>Фамилия</label><input class="input" id="guest-last" placeholder="Фамилия"></div><div class="field"><label>Email</label><input class="input" type="email" id="guest-email" value="' + esc(state.me?.user.email || '') + '"></div><div class="field"><label>Телефон</label><input class="input" id="guest-phone" placeholder="+7 700 000 00 00"></div><div class="field full"><label>Пожелания</label><textarea class="textarea" id="guest-note" placeholder="Например: тихий номер, высокий этаж"></textarea></div></div><div class="modal-actions"><button class="btn" data-booking-next="1">Назад</button><button class="btn btn-primary" data-booking-next="3">К демо-подтверждению ' + icon('arrow') + '</button></div>';
  return '<h2>Демо-подтверждение</h2><div class="ai-card" style="margin-bottom:18px"><div class="row"><span style="color:var(--mint)">' + icon('lock') + '</span><div><strong>Тестовая форма оплаты</strong><div class="text-xs muted">Данные карты не сохраняются, платёж и списание не выполняются.</div></div></div></div><div class="form-grid"><div class="field full"><label>Номер карты</label><input class="input" value="4242 4242 4242 4242" inputmode="numeric"></div><div class="field"><label>Срок</label><input class="input" value="12/28"></div><div class="field"><label>CVC</label><input class="input" value="123" inputmode="numeric"></div><div class="field full"><label>Имя на карте</label><input class="input" value="HOTELX DEMO"></div></div><div class="modal-actions"><button class="btn" data-booking-next="2">Назад</button><button class="btn btn-primary" data-action="confirm-booking">Подтвердить демо-бронь · ' + money(room.price * 3) + '</button></div>';
}

function bookingSummary(hotel, room) {
  return '<div class="summary-hotel"><img src="' + hotel.image + '" alt=""><div><strong>' + esc(hotel.name) + '</strong><div class="text-xs muted" style="margin-top:4px">' + esc(hotel.location) + '</div><span class="rating text-xs">' + hotel.rating + '</span></div></div><div class="divider"></div><div class="summary-line"><span class="muted">Номер</span><strong>' + esc(room.type) + '</strong></div><div class="summary-line"><span class="muted">Даты</span><strong>7–10 ноя</strong></div><div class="summary-line"><span class="muted">Гости</span><strong>2</strong></div><div class="summary-line"><span class="muted">3 ночи</span><span>' + money(room.price * 3) + '</span></div><div class="summary-line"><span class="muted">Сборы</span><span>Включены</span></div><div class="divider" style="margin:10px 0"></div><div class="summary-line"><strong>Итого</strong><strong class="price" style="font-size:20px">' + money(room.price * 3) + '</strong></div>';
}

function renderConfirmation() {
  const booking = state.latestBooking;
  return '<section class="confirmation"><div class="success-mark">✓</div><p class="eyebrow" style="color:var(--mint)">Бронирование сохранено</p><h1 style="font-size:42px;letter-spacing:-.05em">Приятной поездки!</h1><p class="muted">Демо-бронь сохранена в HotelX. Списание и email-уведомление в прототипе не выполняются.</p><div class="card" style="text-align:left;margin:26px 0"><div class="row-between"><div><span class="text-xs muted">Номер бронирования</span><h2 style="margin:5px 0">' + esc(booking.id) + '</h2></div><span class="badge badge-success">Подтверждено</span></div><div class="divider"></div><div class="form-grid"><div class="detail-item"><span>Отель</span><strong>' + esc(booking.hotel) + '</strong></div><div class="detail-item"><span>Номер</span><strong>' + esc(booking.room) + '</strong></div><div class="detail-item"><span>Даты</span><strong>' + booking.checkIn + ' — ' + booking.checkOut + '</strong></div><div class="detail-item"><span>Итого</span><strong>' + money(booking.total) + '</strong></div></div></div><div class="row" style="justify-content:center"><button class="btn" data-route="/app/explore">На главную</button><button class="btn btn-primary" data-route="/app/trips">В поездки</button></div></section>';
}

function renderTrips() {
  const trips = [...(state.latestBooking ? [state.latestBooking] : []), ...(state.trips || []).filter((trip) => trip.id !== state.latestBooking?.id)];
  return '<div class="page-head"><div><p class="eyebrow">Мои поездки</p><h1>Планы и история</h1><p>Все бронирования в одном месте.</p></div></div><div class="segmented" style="margin-bottom:20px"><button class="segment active">Предстоящие</button><button class="segment">Прошедшие</button><button class="segment">Отменённые</button></div>' + (trips.length ? '<div class="stack">' + trips.map((trip) => '<article class="card row-between wrap"><div class="row"><div class="report-icon" style="margin:0">' + icon('calendar') + '</div><div><h3 style="margin-bottom:5px">' + esc(trip.hotel) + '</h3><div class="text-sm muted">' + trip.checkIn + ' — ' + trip.checkOut + ' · ' + esc(trip.room) + '</div></div></div><div class="row wrap"><span class="status ' + trip.status + '">' + (trip.status === 'COMPLETED' ? 'Завершено' : 'Подтверждено') + '</span><strong class="price">' + money(trip.total) + '</strong><button class="btn btn-sm">Детали</button></div></article>').join('') + '</div>' : '<div class="card empty"><div class="empty-icon">' + icon('calendar') + '</div><h3>Поездок пока нет</h3><p>Здесь появятся ваши подтверждённые бронирования.</p><button class="btn btn-primary" data-route="/app/explore">Найти отель</button></div>');
}

function renderFavorites() {
  const hotels = (state.hotels || []).filter((hotel) => state.favorites.includes(hotel.id));
  return '<div class="page-head"><div><p class="eyebrow">Сохранено</p><h1>Избранные отели</h1><p>Вернитесь к вариантам, которые вам понравились.</p></div></div>' + (hotels.length ? '<div class="hotel-grid">' + hotels.map(hotelCard).join('') + '</div>' : '<div class="card empty"><div class="empty-icon">' + icon('heart') + '</div><h3>Пока пусто</h3><p>Нажимайте на сердце в карточках отелей.</p><button class="btn btn-primary" data-route="/app/explore">Найти отели</button></div>');
}

function renderAssistantMessages(messages, kind) {
  return messages.map((message, index) => '<article class="message ' + (message.from === 'user' ? 'user' : 'ai') + '"><div class="message-author">' + (message.from === 'user' ? 'Вы' : '✦ HotelX · демопомощник') + '</div><div class="message-text">' + esc(message.text) + '</div>' +
    (message.cards?.length ? '<div class="assistant-hotels">' + message.cards.map((hotel) => '<a class="assistant-hotel" href="/app/hotel/' + esc(hotel.id) + '" data-route="/app/hotel/' + esc(hotel.id) + '"><img src="' + esc(hotel.image) + '" alt="" loading="lazy"><div><strong>' + esc(hotel.name) + '</strong><span>' + esc(hotel.city) + ' · ★ ' + hotel.rating + '</span><span>' + money(hotel.price) + ' / ночь</span></div>' + icon('arrow') + '</a>').join('') + '<button class="btn btn-sm" data-route="/app/search">Весь текущий подбор</button></div>' : '') +
    (message.actions?.length ? '<div class="assistant-actions">' + message.actions.map((action) => '<button class="btn btn-sm" data-route="' + esc(action.route) + '">' + esc(action.label) + '</button>').join('') + '</div>' : '') +
    (message.error && index === messages.length - 1 ? '<button class="btn btn-sm" data-retry-assistant="' + kind + '">Повторить отправку</button>' : '') + '</article>').join('');
}

function renderAssistant(kind) {
  const guest = kind === 'guest';
  const messages = guest ? state.aiMessages : state.hotelAiMessages;
  const busy = state.assistantBusy[kind];
  const suggestions = messages[messages.length - 1]?.suggestions || [];
  return '<div class="page-head"><div><p class="eyebrow">HOTELX · ДИАЛОГ</p><h1>' + (guest ? 'Помощник путешественника' : 'AI-помощник отеля') + '</h1><p>' + (guest ? 'Расскажите о поездке — подберём и сравним отели.' : 'Разберите показатели и проверьте сценарий изменения цены.') + '</p></div><button class="btn btn-sm" data-reset-assistant="' + kind + '" ' + (busy ? 'disabled' : '') + '>' + icon('plus') + ' Новый диалог</button></div>' +
    '<div class="assistant-demo-note"><span class="badge badge-warning">Деморежим</span><span>' + (guest ? 'Подбор по учебному каталогу. Цены и наличие демонстрационные.' : 'Расчёты по учебным данным. Реальные тарифы из чата не изменяются.') + ' Ответы формируются локальной логикой, без подключения к языковой модели.</span></div>' +
    '<div class="chat-layout assistant-layout"><div class="messages" role="log" aria-live="polite" aria-label="История диалога">' + renderAssistantMessages(messages, kind) + (busy ? '<div class="message ai assistant-pending" role="status">' + (guest ? 'Подбираю варианты…' : 'Считаю по демоданным…') + '</div>' : '') + '</div><div class="assistant-compose-area">' +
    '<div class="prompt-chips">' + suggestions.map((prompt) => '<button class="prompt-chip" data-' + kind + '-prompt="' + esc(prompt) + '" ' + (busy ? 'disabled' : '') + '>' + esc(prompt) + '</button>').join('') + '</div>' +
    '<form class="chat-compose" id="' + kind + '-chat-form"><input id="' + kind + '-chat-input" aria-label="Сообщение помощнику" maxlength="2000" autocomplete="off" placeholder="' + (guest ? 'Например: Алматы, до 60 тысяч, с завтраком…' : 'Например: а если повысить цену на 5%?') + '" ' + (busy ? 'disabled' : '') + '><button class="btn btn-ai" type="submit" aria-label="Отправить сообщение" ' + (busy ? 'disabled' : '') + '>' + icon('arrow') + '<span>Отправить</span></button></form><p class="assistant-footnote">Контекст хранится в этом диалоге до обновления страницы. Новый диалог очищает историю.</p></div></div>';
}

function renderGuestAi() { return renderAssistant('guest'); }

function renderProfile() {
  const user = state.me?.user || {};
  return '<div class="page-head"><div><p class="eyebrow">Аккаунт</p><h1>Профиль</h1><p>Личные данные и предпочтения поездок.</p></div></div><div class="detail-layout"><section class="card"><div class="row" style="margin-bottom:22px"><span class="avatar avatar-lg">' + initials(user.name) + '</span><div><h2 style="margin-bottom:4px">' + esc(user.name) + '</h2><span class="muted text-sm">' + esc(user.email) + '</span></div></div><div class="form-grid"><div class="field"><label>Имя</label><input class="input" value="' + esc(user.name) + '"></div><div class="field"><label>Email</label><input class="input" value="' + esc(user.email) + '" readonly></div><div class="field"><label>Телефон</label><input class="input" placeholder="+7 700 000 00 00"></div><div class="field"><label>Город</label><input class="input" value="Астана"></div><div class="field"><label>Язык</label><select class="select"><option>Русский</option><option>Қазақша</option><option>English</option></select></div><div class="field"><label>Валюта</label><select class="select"><option>KZT — ₸</option><option>USD — $</option></select></div></div><div class="modal-actions"><button class="btn btn-primary" data-action="save-settings">Сохранить</button></div></section><aside class="card"><h3>Доступы аккаунта</h3><p class="text-sm muted">Это серверно назначенные контексты. Переключение не меняет роль.</p><div class="stack">' + state.me.contexts.map((context) => '<div class="context-item ' + (context.id === state.context ? 'active' : '') + '"><span class="avatar">' + initials(context.label) + '</span><span class="grow"><strong>' + esc(context.label) + '</strong><span>' + esc(context.subtitle) + '</span></span><button class="btn btn-sm" data-context="' + context.id + '">Открыть</button></div>').join('') + '</div></aside></div>';
}

function renderLogin(viewClass = '') {
  return '<div class="auth-page' + viewClass + '"><section class="auth-panel">' + brand() + '<div class="auth-form"><p class="eyebrow">С возвращением</p><h1>Войдите в HotelX</h1><p class="muted" style="line-height:1.6">Безопасная идентификация выполняется через ваш аккаунт ChatGPT. Пароли не хранятся в приложении.</p><a class="btn btn-primary" style="width:100%;margin-top:20px" href="/signin-with-chatgpt?return_to=/app/explore" target="_top">Продолжить с ChatGPT ' + icon('arrow') + '</a><button class="btn" style="width:100%;margin-top:10px" data-route="/">Вернуться на главную</button><div class="ai-card" style="margin-top:22px"><div class="row"><span style="color:var(--ai)">' + icon('shield') + '</span><div><strong>Роли проверяются на сервере</strong><div class="text-xs muted" style="margin-top:3px">Frontend не может выдать права владельца или администратора.</div></div></div></div></div></section><aside class="auth-aside"><div class="auth-quote"><p class="eyebrow" style="color:#c9d2ff">HOTELX PLATFORM</p><h2>Один аккаунт. Личные и бизнес-контексты.</h2><p style="color:rgba(255,255,255,.72);line-height:1.7">После подтверждения отеля вы сможете переходить между поиском поездок и управлением бизнесом без подмены роли.</p></div></aside></div>';
}

function renderRegister(viewClass = '') {
  const manager = state.intent === 'manager';
  return '<div class="auth-page' + viewClass + '"><section class="auth-panel">' + brand() + '<div class="auth-form"><p class="eyebrow">Создать профиль</p><h1>' + (manager ? 'Подключите отель' : 'Начните путешествие') + '</h1><p class="muted">Выберите, что хотите сделать. Управление отелем станет доступно только после проверки.</p><div class="intent-grid"><button class="intent ' + (!manager ? 'active' : '') + '" data-intent="guest">' + icon('search') + '<strong>Найти и забронировать</strong><span>Поиск, AI Match, сравнение и поездки.</span></button><button class="intent ' + (manager ? 'active' : '') + '" data-intent="manager">' + icon('building') + '<strong>Управлять отелем</strong><span>Заявка, документы и ручная верификация.</span></button></div>' + (manager ? managerApplicationForm() : guestRegistrationForm()) + '</div></section><aside class="auth-aside"><div class="auth-quote"><p class="eyebrow" style="color:#c9d2ff">БЕЗОПАСНОСТЬ ПО УМОЛЧАНИЮ</p><h2>Права владельца нельзя получить одной кнопкой.</h2><p style="color:rgba(255,255,255,.72);line-height:1.7">Заявка проходит проверку личности, бизнеса и связи с отелем. До одобрения доступен только Verification Center.</p></div></aside></div>';
}

function guestRegistrationForm() {
  return '<form id="guest-register-form"><div class="form-grid"><div class="field"><label>Имя</label><input class="input" required placeholder="Имя"></div><div class="field"><label>Фамилия</label><input class="input" required placeholder="Фамилия"></div><div class="field full"><label>Email</label><input class="input" type="email" required value="' + esc(state.me?.user.email || '') + '"></div><div class="field"><label>Страна</label><input class="input" value="Казахстан"></div><div class="field"><label>Город</label><input class="input" value="Астана"></div></div><button class="btn btn-primary" style="width:100%;margin-top:20px" type="submit">Создать гостевой профиль</button></form>';
}

function managerApplicationForm() {
  return '<form id="manager-application-form"><div class="form-grid"><div class="field"><label>Полное имя</label><input class="input" required value="' + esc(state.me?.user.name || '') + '"></div><div class="field"><label>Телефон</label><input class="input" id="application-phone" required placeholder="+7 700 000 00 00"></div><div class="field"><label>Компания</label><input class="input" placeholder="ТОО Hotel Group"></div><div class="field"><label>Название отеля</label><input class="input" id="application-hotel" required placeholder="Название отеля"></div><div class="field full"><label>Адрес</label><input class="input" id="application-address" placeholder="Город, улица, дом"></div><div class="field"><label>Количество номеров</label><input class="input" id="application-rooms" type="number" min="1" placeholder="50"></div><div class="field"><label>Сайт</label><input class="input" id="application-website" placeholder="https://"></div></div><div class="divider"></div><h3>Документы для проверки</h3><p class="text-sm muted">PDF, JPG, PNG или WEBP · до 5 МБ каждый · закрытое хранилище.</p><div class="form-grid"><div class="field"><label>Удостоверение личности</label><input class="input" id="document-identity" type="file" accept=".pdf,image/jpeg,image/png,image/webp" required></div><div class="field"><label>Регистрация бизнеса</label><input class="input" id="document-business" type="file" accept=".pdf,image/jpeg,image/png,image/webp" required></div><div class="field full"><label>Связь с отелем / право управления</label><input class="input" id="document-ownership" type="file" accept=".pdf,image/jpeg,image/png,image/webp" required></div></div><div class="ai-card" style="margin-top:16px;padding:15px"><div class="row"><span style="color:var(--ai)">' + icon('shield') + '</span><p class="text-xs" style="margin:0">После отправки статус будет <strong>PENDING_VERIFICATION</strong>. Права HOTEL_OWNER не выдаются автоматически.</p></div></div><button class="btn btn-primary" style="width:100%;margin-top:16px" type="submit">Отправить заявку на проверку</button></form>';
}

function renderApplicantVerification() {
  const payload = state.myVerification;
  const application = payload?.application;
  if (!application) return '<div class="page-head"><div><p class="eyebrow">VERIFICATION CENTER</p><h1>Заявка не найдена</h1><p>Подайте данные отеля, чтобы начать проверку.</p></div></div><div class="card empty"><div class="empty-icon">' + icon('shield') + '</div><h3>Подключите свой отель</h3><p>Права владельца появятся только после проверки документов.</p><button class="btn btn-primary" data-route="/register?intent=manager">Подать заявку</button></div>';
  const statusClass = application.status === 'APPROVED' ? 'badge-success' : application.status === 'REJECTED' ? 'badge-danger' : application.status === 'MORE_INFO_REQUIRED' ? 'badge-ai' : 'badge-warning';
  const uploaded = new Set((payload.documents || []).map((document) => document.kind));
  return '<div class="page-head"><div><p class="eyebrow">VERIFICATION CENTER · ' + esc(application.id) + '</p><h1>' + esc(application.hotelName) + '</h1><p>Здесь видны статус и документы вашей заявки.</p></div><span class="badge ' + statusClass + '">' + esc(application.status) + '</span></div><section class="card"><div class="verification-stepper"><div class="verify-step done">Аккаунт создан</div><div class="verify-step done">Данные отеля</div><div class="verify-step ' + (uploaded.has('identity') ? 'done' : 'current') + '">Личность</div><div class="verify-step ' + (uploaded.has('ownership') ? 'done' : '') + '">Связь с отелем</div><div class="verify-step ' + (uploaded.has('business') ? 'done' : '') + '">Бизнес</div></div>' + (application.reviewNote ? '<div class="ai-card"><div class="ai-label">Комментарий проверки</div><p style="margin:0">' + esc(application.reviewNote) + '</p></div>' : '<div class="ai-card"><div class="ai-label">Статус проверки</div><p style="margin:0">Ваша информация находится в защищённой очереди администратора. Мы не выдаём HOTEL_OWNER до завершения проверки.</p></div>') + '<div class="section-head" style="margin-top:26px"><div><h2>Документы</h2><p>Можно безопасно заменить файл до повторной отправки.</p></div></div><div class="document-list">' + [['identity','Удостоверение личности'],['business','Регистрация бизнеса'],['ownership','Право управления отелем']].map((item) => '<div class="document">' + icon('file') + '<div class="grow"><strong>' + item[1] + '</strong><div class="text-xs muted">' + (uploaded.has(item[0]) ? 'Загружено в закрытое хранилище' : 'Файл ещё не загружен') + '</div></div><label class="btn btn-sm"><input type="file" hidden data-verification-upload="' + item[0] + '" data-id="' + esc(application.id) + '" accept=".pdf,image/jpeg,image/png,image/webp">' + (uploaded.has(item[0]) ? 'Заменить' : 'Загрузить') + '</label></div>').join('') + '</div>' + (['REJECTED','MORE_INFO_REQUIRED'].includes(application.status) ? '<div class="modal-actions"><button class="btn btn-primary" data-action="resubmit-verification">Отправить повторно</button></div>' : '') + '</section>';
}

function kpiCard(label, value, trend, iconName) {
  return '<div class="card kpi"><div class="kpi-label"><span>' + label + '</span><span style="color:var(--brand)">' + icon(iconName) + '</span></div><div class="kpi-value">' + value + '</div><div class="trend">↑ ' + trend + ' к прошлому периоду</div></div>';
}

function renderDashboard() {
  const data = state.dashboard;
  if (!data) return loadingBlock();
  const k = data.kpis;
  return '<div class="page-head"><div><p class="eyebrow">6 ноября 2026 · Aspan City Hotel</p><h1>Добрый день, ' + esc(state.me?.user.name?.split(' ')[0] || 'управляющий') + '</h1><p>Ключевые показатели, прогноз и рекомендации на сегодня.</p></div><div class="row wrap"><span class="badge badge-warning">Демо-данные</span><button class="btn">' + icon('calendar') + ' 1–30 ноября</button><button class="btn btn-primary" data-route="/hotel/reports">' + icon('download') + ' Отчёт</button></div></div><div class="kpi-grid">' +
    kpiCard('Загрузка', k.occupancy + '%', '6.2%', 'bed') + kpiCard('Выручка', money(k.revenue), '12.4%', 'chart') + kpiCard('ADR', money(k.adr), '4.8%', 'tag') + kpiCard('RevPAR', money(k.revpar), '9.1%', 'forecast') + '</div>' +
    '<div class="dashboard-grid"><section class="card chart-card"><div class="row-between"><div><h2 style="margin-bottom:5px">Загрузка на 12 недель</h2><p class="muted text-sm">Факт и прогноз по доступным номерам</p></div><span class="badge badge-success">Прогноз ' + k.forecast + '%</span></div><div class="chart">' + data.occupancySeries.map((value, index) => '<div class="bar" style="height:' + value + '%" title="' + value + '%"><span>' + (index + 1) + '</span></div>').join('') + '</div></section>' +
    '<aside class="card recommendation"><div class="recommendation-top"><div class="ai-label">✦ AI-вывод сегодня</div><h2 style="margin-bottom:7px">' + esc(data.insight.title) + '</h2><p class="text-sm muted" style="margin:0;line-height:1.55">' + esc(data.insight.text) + '</p></div><div class="recommendation-body">' + recommendationBody(data.recommendation) + '</div></aside></div>' +
    '<section class="section"><div class="section-head"><div><h2>Сегодня в отеле</h2><p>Операционная сводка на текущую смену.</p></div><button class="link" data-route="/hotel/reservations">Все бронирования →</button></div><div class="kpi-grid">' + kpiCard('Заезды', '24', '3', 'booking') + kpiCard('Выезды', '19', '2', 'logout') + kpiCard('Свободно', '31 номер', '5', 'bed') + kpiCard('Новые брони', '17', '8.5%', 'plus') + '</div></section>';
}

function recommendationBody(rec) {
  const applied = state.recommendationApplied;
  return '<div class="row-between"><div><span class="text-xs muted">Рекомендация</span><h3 style="margin:5px 0">Повысить цену на ' + rec.change + '%</h3></div><span class="badge ' + (applied ? 'badge-success' : 'badge-ai') + '">' + (applied ? '✓ Применено' : rec.demand) + '</span></div><div class="price-change"><div class="price-box"><small>Текущая</small><strong class="price">' + money(rec.currentPrice) + '</strong></div><span class="arrow">→</span><div class="price-box"><small>Рекомендуемая</small><strong class="price">' + money(rec.recommendedPrice) + '</strong></div></div><div class="mini-stats"><div class="mini-stat"><span>Период</span><strong>' + rec.from + ' — ' + rec.to + '</strong></div><div class="mini-stat"><span>Эффект</span><strong style="color:var(--mint)">+' + money(rec.impact) + '</strong></div><div class="mini-stat"><span>Уверенность</span><strong>92%</strong></div></div><button class="btn ' + (applied ? '' : 'btn-ai') + '" style="width:100%;margin-top:16px" data-action="apply-recommendation" ' + (applied ? 'disabled' : '') + '>' + (applied ? 'Рекомендация применена' : 'Рассмотреть и применить') + '</button>';
}

function renderHotelAi() { return renderAssistant('hotel'); }

function renderAnalytics() {
  const data = state.dashboard;
  const forecast = state.forecast;
  if (!data || !forecast) return loadingBlock();
  return '<div class="page-head"><div><p class="eyebrow">Аналитика · Ноябрь 2026</p><h1>Эффективность отеля</h1><p>Выручка, загрузка и каналы продаж в одном обзоре.</p></div><div class="segmented"><button class="segment active">30 дней</button><button class="segment">90 дней</button><button class="segment">Год</button></div></div><div class="kpi-grid">' + kpiCard('Выручка', money(28400000), '12.4%', 'chart') + kpiCard('Броней', '164', '8.1%', 'booking') + kpiCard('Средний чек', money(128400), '3.2%', 'tag') + kpiCard('Отмены', '6.2%', '1.1%', 'forecast') + '</div><div class="dashboard-grid"><section class="card chart-card"><div class="row-between"><div><h2>Выручка по неделям</h2><p class="muted text-sm">млн ₸</p></div><span class="badge badge-success">+12.4%</span></div><div class="chart">' + data.revenueSeries.map((value, index) => '<div class="bar" style="height:' + (value / 4 * 100) + '%"><span>' + (index + 1) + '</span></div>').join('') + '</div></section><aside class="card"><h2>Каналы продаж</h2><p class="muted text-sm">Доля бронирований</p>' + [['HotelX',42,'#315efb'],['Прямые',31,'#7657e8'],['Партнёры',19,'#159b74'],['Корпоративные',8,'#d97904']].map((item) => '<div style="margin:18px 0"><div class="row-between text-sm"><strong>' + item[0] + '</strong><span>' + item[1] + '%</span></div><div class="demand-meter"><span style="width:' + item[1] + '%;background:' + item[2] + '"></span></div></div>').join('') + '</aside></div>';
}

function statusText(status) {
  const map = { CONFIRMED: 'Подтверждено', CHECKED_IN: 'В отеле', PENDING: 'Ожидает', CANCELLED: 'Отменено', APPROVED: 'Одобрено', IN_REVIEW: 'На проверке', MORE_INFO_REQUIRED: 'Нужны данные', REJECTED: 'Отклонено' };
  return map[status] || status;
}

function renderReservations() {
  const rows = state.reservations || [];
  return '<div class="page-head"><div><p class="eyebrow">Операции</p><h1>Бронирования</h1><p>' + rows.length + ' последних записей · все каналы.</p></div><button class="btn btn-primary" data-action="new-reservation">' + icon('plus') + ' Новая бронь</button></div><div class="card table-card"><div class="table-toolbar"><div class="input-shell" style="width:min(360px,100%)">' + icon('search') + '<input placeholder="Найти по гостю или номеру"></div><div class="row"><select class="select" style="width:auto"><option>Все статусы</option><option>Подтверждено</option><option>В отеле</option></select><button class="btn btn-icon">' + icon('download') + '</button></div></div><div class="table-wrap"><table class="responsive"><thead><tr><th>ID</th><th>Гость</th><th>Номер</th><th>Заезд</th><th>Выезд</th><th>Стоимость</th><th>Статус</th><th>Канал</th></tr></thead><tbody>' + rows.map((row) => '<tr><td data-label="ID"><button class="table-link" data-action="reservation-detail" data-id="' + row.id + '">' + row.id + '</button></td><td data-label="Гость"><strong>' + esc(row.guest) + '</strong></td><td data-label="Номер">' + esc(row.room) + '</td><td data-label="Заезд">' + row.checkIn + '</td><td data-label="Выезд">' + row.checkOut + '</td><td data-label="Стоимость"><strong>' + money(row.price) + '</strong></td><td data-label="Статус"><span class="status ' + row.status + '"><span class="dot"></span>' + statusText(row.status) + '</span></td><td data-label="Канал">' + esc(row.channel) + '</td></tr>').join('') + '</tbody></table></div></div>';
}

function renderRooms() {
  const rows = state.rooms || [];
  const counts = { Available: 0, Occupied: 0, Cleaning: 0, Maintenance: 0 };
  rows.forEach((room) => { counts[room.status] = (counts[room.status] || 0) + 1; });
  return '<div class="page-head"><div><p class="eyebrow">Номерной фонд</p><h1>Номера</h1><p>Статусы, цены и текущая загрузка.</p></div><button class="btn btn-primary">' + icon('plus') + ' Добавить номер</button></div><div class="kpi-grid">' + kpiCard('Доступно', String(counts.Available), '2', 'check') + kpiCard('Занято', String(counts.Occupied), '1', 'bed') + kpiCard('Уборка', String(counts.Cleaning), '1', 'spark') + kpiCard('Обслуживание', String(counts.Maintenance), '0', 'settings') + '</div><div class="card table-card" style="margin-top:18px"><div class="table-toolbar"><h3 style="margin:0">Все номера</h3><select class="select" style="width:auto"><option>Все статусы</option><option>Доступно</option><option>Занято</option></select></div><div class="table-wrap"><table class="responsive"><thead><tr><th>Номер</th><th>Категория</th><th>Статус</th><th>Цена</th><th>Гость</th><th></th></tr></thead><tbody>' + rows.map((room) => '<tr><td data-label="Номер"><strong>' + room.number + '</strong></td><td data-label="Категория">' + esc(room.type) + '</td><td data-label="Статус"><span class="status ' + room.status + '">' + room.status + '</span></td><td data-label="Цена"><strong>' + money(room.price) + '</strong></td><td data-label="Гость">' + esc(room.occupancy) + '</td><td data-label="Действие"><button class="btn btn-sm">Изменить</button></td></tr>').join('') + '</tbody></table></div></div>';
}

function renderPricing() {
  const rows = state.pricing || [];
  return '<div class="page-head"><div><p class="eyebrow">Revenue management</p><h1>Цены и AI-рекомендации</h1><p>Публичные цены, спрос и ожидаемый эффект.</p></div><button class="btn">' + icon('calendar') + ' 7–13 ноября</button></div><div class="ai-card" style="margin-bottom:18px"><div class="row-between wrap"><div><div class="ai-label">✦ Сигнал спроса</div><h2 style="margin-bottom:6px">Выходные продаются быстрее обычного</h2><p class="muted" style="margin:0">Рекомендуем скорректировать Standard King до заполнения последних 14% доступности.</p></div><button class="btn btn-ai" data-action="apply-recommendation" ' + (state.recommendationApplied ? 'disabled' : '') + '>' + (state.recommendationApplied ? '✓ Применено' : 'Применить рекомендацию') + '</button></div></div><div class="pricing-grid">' + rows.map((room) => '<article class="card pricing-card"><div class="row-between"><div><h3>' + esc(room.name) + '</h3><span class="text-xs muted">Спрос и загрузка</span></div><span class="badge ' + (room.demand === 'HIGH' ? 'badge-warning' : room.demand === 'LOW' ? '' : 'badge-brand') + '">' + room.demand + '</span></div><div class="demand-meter"><span style="width:' + room.occupancy + '%"></span></div><div class="row-between text-sm"><span class="muted">Загрузка</span><strong>' + room.occupancy + '%</strong></div><div class="price-change"><div class="price-box"><small>Текущая</small><strong>' + money(state.recommendationApplied && room.id === 'standard' ? room.recommended : room.current) + '</strong></div><span class="arrow">→</span><div class="price-box"><small>AI цена</small><strong>' + money(room.recommended) + '</strong></div></div><div class="row-between"><span class="text-xs muted">Ожидаемый эффект</span><strong style="color:var(--mint)">+' + money(room.impact) + '</strong></div><button class="btn" style="width:100%;margin-top:14px" data-action="edit-price">Изменить цену</button></article>').join('') + '</div>';
}

function forecastSeries() {
  if (!state.forecast) return [];
  return state.forecast['days' + state.forecastPeriod] || state.forecast.days7;
}

function renderForecast() {
  const forecast = state.forecast;
  if (!forecast) return loadingBlock();
  const series = forecastSeries();
  return '<div class="page-head"><div><p class="eyebrow">AI FORECAST</p><h1>Прогноз спроса</h1><p>Ожидаемая загрузка, выручка и риск отмен.</p></div><div class="segmented">' + [7,30,90].map((period) => '<button class="segment ' + (state.forecastPeriod === period ? 'active' : '') + '" data-forecast-period="' + period + '">' + period + ' дней</button>').join('') + '</div></div><div class="forecast-grid"><section class="card"><div class="row-between"><div><h2>Прогноз загрузки</h2><p class="muted text-sm">Модель обновлена сегодня в 09:20</p></div><span class="badge badge-ai">Уверенность ' + forecast.confidence + '%</span></div><div class="forecast-line">' + series.map((value, index) => '<div class="forecast-point"><strong class="text-xs">' + value + '%</strong><div class="forecast-stick" style="height:' + value + '%"></div><small>' + (state.forecastPeriod === 7 ? ['Пт','Сб','Вс','Пн','Вт','Ср','Чт'][index] : index + 1) + '</small></div>').join('') + '</div></section><aside class="stack"><div class="card"><span class="text-xs muted">Ожидаемая выручка</span><div class="kpi-value">' + money(forecast.expectedRevenue) + '</div><span class="trend">↑ 10.6% к базе</span></div><div class="card"><span class="text-xs muted">Вероятность отмен</span><div class="kpi-value">' + forecast.cancellations + '%</div><span class="text-sm muted">Ниже среднего на 0.8 п.п.</span></div><div class="ai-card"><div class="ai-label">✦ Что влияет</div><p class="text-sm" style="line-height:1.6;margin:0">События в Expo, деловой форум и ограниченная доступность в центре повышают спрос на выходные.</p></div></aside></div>';
}

function renderRecommendations() {
  const rows = state.recommendations || [];
  return '<div class="page-head"><div><p class="eyebrow">AI DECISIONS</p><h1>Рекомендации</h1><p>Каждое действие содержит объяснение, эффект и требует подтверждения.</p></div><span class="badge badge-ai">2 активные</span></div><div class="stack">' + rows.map((rec, index) => '<article class="card"><div class="row-between wrap"><div class="row"><div class="report-icon" style="margin:0;background:var(--ai-soft);color:var(--ai)">' + icon(index ? 'calendar' : 'tag') + '</div><div><span class="badge ' + (rec.demand === 'HIGH' ? 'badge-warning' : 'badge-brand') + '">' + rec.demand + ' DEMAND</span><h2 style="margin:8px 0 4px">' + esc(rec.title || ('Повысить ' + rec.room + ' на ' + rec.change + '%')) + '</h2><p class="muted text-sm" style="margin:0">' + esc(rec.text || 'Темп бронирований выше обычного, а доступность сокращается.') + '</p></div></div><div style="text-align:right"><span class="text-xs muted">Ожидаемый эффект</span><h3 style="color:var(--mint);margin:5px 0">+' + money(rec.impact) + '</h3></div></div><div class="divider"></div><div class="row-between wrap"><div class="row text-sm"><span class="badge">Уверенность 92%</span><span class="badge">7–8 ноября</span></div><div class="row"><button class="btn btn-sm">Анализ</button><button class="btn btn-sm btn-ai" ' + (index || state.recommendationApplied ? 'disabled' : '') + ' data-action="apply-recommendation">' + (state.recommendationApplied && !index ? '✓ Применено' : 'Применить') + '</button></div></div></article>').join('') + '</div>';
}

function renderReports() {
  const reports = [['Ежедневный отчёт','Заезды, выезды, загрузка и операции','calendar'],['Недельный отчёт','Динамика спроса и ключевые изменения','chart'],['Отчёт по выручке','ADR, RevPAR, доход и каналы продаж','tag'],['Отчёт по загрузке','Категории, даты и доступность','bed'],['AI-отчёт','Выводы, прогноз и рекомендации','spark'],['Отмены','Причины, динамика и риск','forecast']];
  return '<div class="page-head"><div><p class="eyebrow">REPORTING</p><h1>Отчёты</h1><p>Сформируйте документ за выбранный период.</p></div><button class="btn">' + icon('calendar') + ' Ноябрь 2026</button></div><div class="report-grid">' + reports.map((item) => '<article class="card card-hover"><div class="report-icon">' + icon(item[2]) + '</div><h3>' + item[0] + '</h3><p class="text-sm muted" style="line-height:1.55">' + item[1] + '</p><button class="btn btn-sm" data-action="generate-report">' + icon('download') + ' Сформировать</button></article>').join('') + '</div>';
}

function renderStaff() {
  const staff = [['Алексей С.','HOTEL_OWNER','Владелец','AS'],['Мадина Т.','HOTEL_MANAGER','Управляющий','МТ'],['Руслан К.','HOTEL_STAFF','Front Desk','РК']];
  return '<div class="page-head"><div><p class="eyebrow">ACCESS CONTROL</p><h1>Команда и права</h1><p>Роли и разрешения привязаны к Aspan City Hotel.</p></div><button class="btn btn-primary" data-action="invite-staff">' + icon('plus') + ' Пригласить</button></div><div class="staff-grid">' + staff.map((person) => '<article class="card"><div class="row"><span class="avatar avatar-lg">' + person[3] + '</span><div><h3 style="margin-bottom:4px">' + person[0] + '</h3><span class="badge ' + (person[1] === 'HOTEL_OWNER' ? 'badge-ai' : 'badge-brand') + '">' + person[1] + '</span></div></div><div class="divider"></div><div class="row-between"><span class="text-sm muted">' + person[2] + '</span><button class="btn btn-sm">Права</button></div></article>').join('') + '</div><section class="card" style="margin-top:18px"><h3>Матрица разрешений</h3><p class="text-sm muted">Owner — все права. Manager — операции, аналитика и pricing. Staff — только бронирования и номера.</p><div class="table-wrap"><table><thead><tr><th>Роль</th><th>Dashboard</th><th>Reservations</th><th>Rooms</th><th>Pricing</th><th>Staff</th></tr></thead><tbody><tr><td><strong>Owner</strong></td><td>✓</td><td>✓ Edit</td><td>✓ Edit</td><td>✓ Edit</td><td>✓ Manage</td></tr><tr><td><strong>Manager</strong></td><td>✓</td><td>✓ Edit</td><td>✓ Edit</td><td>✓ Edit</td><td>—</td></tr><tr><td><strong>Staff</strong></td><td>—</td><td>✓ Edit</td><td>✓ View</td><td>—</td><td>—</td></tr></tbody></table></div></section>';
}

function renderIntegrations() {
  const items = [['Cloudbeds','PMS · макет синхронизации номеров','Демо'],['Booking Partner','Канал продаж · макет бронирований','Демо'],['Stripe Test','Платежи · демонстрационный режим','Тест'],['Google Hotel Ads','Маркетинг · цены и доступность','Не подключено'],['1C Hotel','Финансы · экспорт выручки','Не подключено'],['Webhooks','События бронирований и цен','Не подключено']];
  return '<div class="page-head"><div><p class="eyebrow">ECOSYSTEM</p><h1>Интеграции</h1><p>Это прототип интерфейса; внешние сервисы пока не подключены.</p></div></div><div class="integration-grid">' + items.map((item, index) => '<article class="card card-hover"><div class="row-between"><div class="integration-icon">' + icon(index === 2 ? 'card' : 'plug') + '</div><span class="badge ' + (item[2] === 'Демо' || item[2] === 'Тест' ? 'badge-warning' : '') + '">' + item[2] + '</span></div><h3>' + item[0] + '</h3><p class="text-sm muted">' + item[1] + '</p><button class="btn btn-sm" data-action="connect-integration">' + (item[2] === 'Не подключено' ? 'Подробнее' : 'Открыть макет') + '</button></article>').join('') + '</div>';
}

function renderHotelSettings() {
  return '<div class="page-head"><div><p class="eyebrow">HOTEL SETTINGS</p><h1>Настройки отеля</h1><p>Публичная информация, правила и уведомления.</p></div></div><div class="detail-layout"><section class="card"><h2>Основная информация</h2><div class="form-grid"><div class="field"><label>Название</label><input class="input" value="Aspan City Hotel"></div><div class="field"><label>Тип</label><select class="select"><option>City hotel</option><option>Business hotel</option></select></div><div class="field full"><label>Адрес</label><input class="input" value="ул. Акмешит, 17, Астана"></div><div class="field"><label>Телефон</label><input class="input" value="+7 7172 000 000"></div><div class="field"><label>Email</label><input class="input" value="hello@aspan.demo"></div><div class="field full"><label>Описание</label><textarea class="textarea">Современный городской отель с панорамным видом и быстрым доступом к деловому центру.</textarea></div></div><div class="modal-actions"><button class="btn btn-primary" data-action="save-settings">Сохранить изменения</button></div></section><aside class="stack"><section class="card"><h3>Статус</h3><div class="row-between"><span class="muted text-sm">Верификация</span><span class="badge badge-success">✓ VERIFIED</span></div><div class="divider"></div><button class="btn" style="width:100%" data-route="/hotel/verification">Центр верификации</button></section><section class="card"><h3>Опасная зона</h3><p class="text-sm muted">Снятие отеля с публикации не удаляет исторические бронирования.</p><button class="btn btn-danger">Снять с публикации</button></section></aside></div>';
}

function renderVerificationCenter() {
  return '<div class="page-head"><div><p class="eyebrow">VERIFICATION CENTER</p><h1>Отель подтверждён</h1><p>Aspan City Hotel прошёл проверку бизнеса и связи с владельцем.</p></div><span class="badge badge-success">✓ VERIFIED</span></div><section class="card"><div class="verification-stepper"><div class="verify-step done">Аккаунт создан</div><div class="verify-step done">Данные отеля</div><div class="verify-step done">Личность</div><div class="verify-step done">Связь с отелем</div><div class="verify-step done">Бизнес</div></div><div class="ai-card"><div class="row"><span style="color:var(--mint)">' + icon('shield') + '</span><div><h3 style="margin-bottom:5px">Проверка завершена 28 октября 2026</h3><p class="text-sm muted" style="margin:0">Роль HOTEL_OWNER и бизнес-контекст выданы сервером после одобрения SUPER_ADMIN.</p></div></div></div><div class="section-head" style="margin-top:26px"><div><h2>Проверенные документы</h2><p>Оригиналы не доступны по публичным ссылкам.</p></div></div><div class="document-list"><div class="document">' + icon('file') + '<div class="grow"><strong>Удостоверение личности</strong><div class="text-xs muted">Зашифровано · проверено</div></div><span class="badge badge-success">✓</span></div><div class="document">' + icon('file') + '<div class="grow"><strong>Регистрация бизнеса</strong><div class="text-xs muted">Зашифровано · проверено</div></div><span class="badge badge-success">✓</span></div><div class="document">' + icon('file') + '<div class="grow"><strong>Право управления отелем</strong><div class="text-xs muted">Зашифровано · проверено</div></div><span class="badge badge-success">✓</span></div></div></section>';
}

function renderAdminDashboard() {
  const verifications = state.verifications || [];
  return '<div class="page-head"><div><p class="eyebrow">PLATFORM CONTROL</p><h1>Обзор HotelX</h1><p>Состояние маркетплейса и очередь ручной проверки.</p></div><span class="badge badge-success">● Все системы работают</span></div><div class="admin-stats">' + kpiCard('Пользователи', '12 480', '14.2%', 'users') + kpiCard('Отели', '286', '8.6%', 'building') + kpiCard('Бронирования', '3 914', '18.4%', 'booking') + kpiCard('На проверке', String(verifications.filter((v) => v.status !== 'APPROVED').length), '1', 'shield') + '</div><div class="dashboard-grid"><section class="card chart-card"><div class="row-between"><div><h2>Активность платформы</h2><p class="muted text-sm">Бронирования за 12 недель</p></div><span class="badge badge-brand">+18.4%</span></div><div class="chart">' + [46,51,49,58,62,68,65,73,79,82,88,94].map((value, index) => '<div class="bar" style="height:' + value + '%"><span>' + (index + 1) + '</span></div>').join('') + '</div></section><aside class="card"><div class="row-between"><div><h2>Очередь проверки</h2><p class="muted text-sm">Требует внимания</p></div><button class="link" data-route="/admin/verifications">Открыть →</button></div><div class="stack" style="margin-top:18px">' + verifications.map((item) => '<button class="context-item" data-route="/admin/verifications"><span class="avatar">' + initials(item.hotel) + '</span><span class="grow"><strong>' + esc(item.hotel) + '</strong><span>' + esc(item.applicant) + ' · ' + item.submitted + '</span></span><span class="status ' + item.status + '">' + statusText(item.status) + '</span></button>').join('') + '</div></aside></div><section class="section card"><div class="row-between wrap"><div><div class="ai-label">✦ Платформенная безопасность</div><h2 style="margin-bottom:6px">Гостевой AI отделён от приватных данных</h2><p class="muted" style="margin:0">Публичные ответы содержат только availability, цены, удобства, локацию и отзывы. Revenue и внутренние рекомендации не покидают hotel context.</p></div><button class="btn" data-action="security-test">Проверить 403</button></div></section>';
}

function renderVerifications() {
  const rows = state.verifications || [];
  const selected = rows.find((item) => item.id === state.selectedVerification) || rows[0];
  return '<div class="page-head"><div><p class="eyebrow">TRUST & SAFETY</p><h1>Верификация отелей</h1><p>Проверьте заявителя, бизнес и связь с отелем.</p></div><div class="segmented"><button class="segment active">В работе ' + rows.length + '</button><button class="segment">Архив</button></div></div><div class="verification-layout"><section class="card table-card"><div class="table-toolbar"><div class="input-shell" style="width:min(320px,100%)">' + icon('search') + '<input placeholder="Отель или заявитель"></div><select class="select" style="width:auto"><option>Все статусы</option><option>Ожидает</option><option>На проверке</option></select></div><div class="table-wrap"><table class="responsive"><thead><tr><th>Заявитель</th><th>Отель</th><th>Страна</th><th>Отправлено</th><th>Статус</th></tr></thead><tbody>' + rows.map((item) => '<tr style="cursor:pointer" data-verification="' + item.id + '"><td data-label="Заявитель"><strong>' + esc(item.applicant) + '</strong><div class="text-xs muted">' + esc(item.email) + '</div></td><td data-label="Отель">' + esc(item.hotel) + '</td><td data-label="Страна">' + esc(item.country) + '</td><td data-label="Отправлено">' + item.submitted + '</td><td data-label="Статус"><span class="status ' + item.status + '">' + statusText(item.status) + '</span></td></tr>').join('') + '</tbody></table></div></section>' + (selected ? reviewPanel(selected) : '') + '</div>';
}

function documentKind(label) {
  if (/личност/i.test(label)) return 'identity';
  if (/бизнес/i.test(label)) return 'business';
  return 'ownership';
}

function reviewPanel(item) {
  return '<aside class="card review-panel"><div class="row-between"><div><span class="text-xs muted">ЗАЯВКА ' + item.id + '</span><h2 style="margin:5px 0">' + esc(item.hotel) + '</h2></div><span class="status ' + item.status + '">' + statusText(item.status) + '</span></div>' + (item.note ? '<div class="ai-card" style="padding:13px;margin:15px 0"><p class="text-xs" style="margin:0">' + esc(item.note) + '</p></div>' : '<div class="divider"></div>') + '<h4>Заявитель</h4><div class="detail-list"><div class="detail-item"><span>Имя</span><strong>' + esc(item.applicant) + '</strong></div><div class="detail-item"><span>Email</span><strong>' + esc(item.email) + '</strong></div><div class="detail-item"><span>Телефон</span><strong>' + esc(item.phone) + '</strong></div></div><div class="divider"></div><h4>Отель</h4><div class="detail-list"><div class="detail-item"><span>Адрес</span><strong>' + esc(item.address) + '</strong></div><div class="detail-item"><span>Сайт</span><strong>' + esc(item.website) + '</strong></div><div class="detail-item"><span>Номеров</span><strong>' + item.rooms + '</strong></div></div><div class="divider"></div><h4>Документы</h4><div class="document-list">' + (item.documents.length ? item.documents.map((document) => '<div class="document">' + icon('file') + '<span class="grow text-sm">' + esc(document) + '</span><button class="btn btn-icon btn-sm" title="Скачать защищённый документ" data-action="view-document" data-id="' + item.id + '" data-kind="' + documentKind(document) + '">' + icon('download') + '</button></div>').join('') : '<p class="text-sm muted">Документы ещё не загружены.</p>') + '</div><div class="modal-actions" style="display:grid;grid-template-columns:1fr 1fr"><button class="btn btn-danger" data-admin-action="reject" data-id="' + item.id + '">Отклонить</button><button class="btn" data-admin-action="request-info" data-id="' + item.id + '">Запросить данные</button><button class="btn btn-primary" style="grid-column:1/-1" data-admin-action="approve" data-id="' + item.id + '">' + icon('check') + ' Одобрить отель</button></div></aside>';
}

function renderAdminUsers() {
  const users = [['Алексей С.','owner@aspan.demo','HOTEL_OWNER','Активен'],['Айдана Н.','aidana.n@example.com','GUEST · APPLICANT','На проверке'],['Мадина Т.','manager@aspan.demo','HOTEL_MANAGER','Активен'],['Дана К.','dana.k@example.com','GUEST','Активен'],['Руслан К.','staff@aspan.demo','HOTEL_STAFF','Активен']];
  return '<div class="page-head"><div><p class="eyebrow">IDENTITY</p><h1>Пользователи</h1><p>Роли назначаются только через серверные процессы.</p></div><button class="btn">' + icon('download') + ' Экспорт</button></div><div class="card table-card"><div class="table-toolbar"><div class="input-shell" style="width:min(380px,100%)">' + icon('search') + '<input placeholder="Имя или email"></div><select class="select" style="width:auto"><option>Все роли</option><option>Guest</option><option>Hotel Owner</option></select></div><div class="table-wrap"><table class="responsive"><thead><tr><th>Пользователь</th><th>Email</th><th>Роль / контекст</th><th>Статус</th><th></th></tr></thead><tbody>' + users.map((user) => '<tr><td data-label="Пользователь"><strong>' + user[0] + '</strong></td><td data-label="Email">' + user[1] + '</td><td data-label="Роль"><span class="badge badge-brand">' + user[2] + '</span></td><td data-label="Статус"><span class="badge badge-success">' + user[3] + '</span></td><td data-label="Действие"><button class="btn btn-icon btn-sm">' + icon('more') + '</button></td></tr>').join('') + '</tbody></table></div></div>';
}

function renderAdminHotels() {
  const hotels = [['Aspan City Hotel','Астана','86','VERIFIED','78%'],['Nomad Garden Astana','Астана','54','VERIFIED','72%'],['Aurora Park Hotel','Астана','86','PENDING','—'],['Steppe Residence','Астана','54','IN_REVIEW','—'],['Saryarka Loft Hotel','Астана','31','VERIFIED','64%']];
  return '<div class="page-head"><div><p class="eyebrow">MARKETPLACE</p><h1>Отели платформы</h1><p>Верификация, активность и состояние публикации.</p></div><button class="btn">' + icon('download') + ' Экспорт</button></div><div class="card table-card"><div class="table-toolbar"><div class="input-shell" style="width:min(380px,100%)">' + icon('search') + '<input placeholder="Название или город"></div><select class="select" style="width:auto"><option>Все статусы</option><option>Verified</option><option>Pending</option></select></div><div class="table-wrap"><table class="responsive"><thead><tr><th>Отель</th><th>Город</th><th>Номеров</th><th>Верификация</th><th>Загрузка</th><th></th></tr></thead><tbody>' + hotels.map((hotel) => '<tr><td data-label="Отель"><strong>' + hotel[0] + '</strong></td><td data-label="Город">' + hotel[1] + '</td><td data-label="Номеров">' + hotel[2] + '</td><td data-label="Статус"><span class="status ' + hotel[3] + '">' + statusText(hotel[3]) + '</span></td><td data-label="Загрузка"><strong>' + hotel[4] + '</strong></td><td data-label="Действие"><button class="btn btn-icon btn-sm">' + icon('more') + '</button></td></tr>').join('') + '</tbody></table></div></div>';
}

function renderAdminSystem(kind) {
  return '<div class="page-head"><div><p class="eyebrow">SYSTEM</p><h1>' + (kind === 'errors' ? 'Системные события' : 'Настройки платформы') + '</h1><p>Инструменты владельца платформы.</p></div></div><div class="card empty"><div class="empty-icon">' + icon(kind === 'errors' ? 'forecast' : 'settings') + '</div><h3>' + (kind === 'errors' ? 'Критических ошибок нет' : 'Конфигурация защищена') + '</h3><p>' + (kind === 'errors' ? 'Все основные сервисы работают штатно.' : 'Изменения требуют прав SUPER_ADMIN и записываются в аудит.') + '</p></div>';
}

function render() {
  const app = $('#app');
  const viewClass = state.me || state.error ? viewEnterClass() : '';
  if (!state.me) {
    if (state.error?.status === 401 || state.path === '/login') app.innerHTML = renderLogin(viewClass);
    else if (state.error) app.innerHTML = bootstrapError();
    else app.innerHTML = '<div class="boot"><div class="brand-mark">HX</div><div><strong>HotelX</strong><span>Проверяем защищённый доступ…</span></div></div>';
    bindForms();
    setupMotion();
    return;
  }

  if (state.path === '/' && app.querySelector('hotelx-harbor')) {
    $('#plans').outerHTML = renderSubscriptions();
    return;
  }
  if (state.path === '/') app.innerHTML = renderLanding(viewClass);
  else if (state.path === '/plans') app.innerHTML = guestShell(renderSubscriptions(), viewClass);
  else if (state.path === '/login') app.innerHTML = state.me.publicDemo ? renderDemoEntry() : renderLogin(viewClass);
  else if (state.path === '/register') app.innerHTML = state.me.publicDemo ? renderDemoEntry() : renderRegister(viewClass);
  else if (state.path.startsWith('/app/')) {
    let content = '';
    if (state.error) content = errorBlock();
    else if (state.loading && !state.hotels) content = loadingBlock();
    else if (state.path === '/app/explore') content = renderExplore();
    else if (state.path === '/app/search') content = renderSearchResults();
    else if (state.path === '/app/compare') content = renderCompare();
    else if (/^\/app\/hotel\/[^/]+\/booking$/.test(state.path)) content = renderBooking();
    else if (/^\/app\/hotel\/[^/]+$/.test(state.path)) content = renderHotelDetail();
    else if (state.path === '/app/trips') content = state.loading && !state.trips ? loadingBlock() : renderTrips();
    else if (state.path === '/app/favorites') content = renderFavorites();
    else if (state.path === '/app/ai') content = renderGuestAi();
    else if (state.path === '/app/profile') content = renderProfile();
    else if (state.path === '/app/verification') content = state.loading && !state.myVerification ? loadingBlock() : renderApplicantVerification();
    else content = notFound();
    app.innerHTML = guestShell(content, viewClass);
  } else if (state.path.startsWith('/hotel/')) {
    let content = '';
    if (!canHotelRoute(state.path)) content = permissionDeniedBlock();
    else if (state.error) content = errorBlock();
    else if (state.loading && !state.dashboard) content = loadingBlock();
    else if (state.path === '/hotel/dashboard') content = renderDashboard();
    else if (state.path === '/hotel/ai') content = renderHotelAi();
    else if (state.path === '/hotel/analytics') content = renderAnalytics();
    else if (state.path === '/hotel/reservations') content = state.loading && !state.reservations ? loadingBlock() : renderReservations();
    else if (state.path === '/hotel/rooms') content = state.loading && !state.rooms ? loadingBlock() : renderRooms();
    else if (state.path === '/hotel/pricing') content = state.loading && !state.pricing ? loadingBlock() : renderPricing();
    else if (state.path === '/hotel/forecast') content = state.loading && !state.forecast ? loadingBlock() : renderForecast();
    else if (state.path === '/hotel/recommendations') content = state.loading && !state.recommendations ? loadingBlock() : renderRecommendations();
    else if (state.path === '/hotel/reports') content = renderReports();
    else if (state.path === '/hotel/staff') content = renderStaff();
    else if (state.path === '/hotel/integrations') content = renderIntegrations();
    else if (state.path === '/hotel/subscription') content = renderSubscriptions();
    else if (state.path === '/hotel/settings') content = renderHotelSettings();
    else if (state.path === '/hotel/verification') content = renderVerificationCenter();
    else content = notFound();
    app.innerHTML = workspaceShell(content, false, viewClass);
  } else if (state.path.startsWith('/admin/')) {
    let content = '';
    if (state.error) content = errorBlock();
    else if (state.loading && !state.verifications) content = loadingBlock();
    else if (state.path === '/admin/dashboard') content = renderAdminDashboard();
    else if (state.path === '/admin/verifications') content = renderVerifications();
    else if (state.path === '/admin/users') content = renderAdminUsers();
    else if (state.path === '/admin/hotels') content = renderAdminHotels();
    else if (state.path === '/admin/errors') content = renderAdminSystem('errors');
    else if (state.path === '/admin/settings') content = renderAdminSystem('settings');
    else content = notFound();
    app.innerHTML = workspaceShell(content, true, viewClass);
  } else app.innerHTML = renderLanding(viewClass);
  if (state.me.publicDemo) {
    const banner = document.createElement('aside');
    banner.className = 'public-demo-banner';
    banner.innerHTML = '<strong>HotelX · открытая демоверсия</strong><span>Учебные данные. Брони, цены и настройки не сохраняются.</span><div><button class="btn btn-sm" data-route="/app/ai">Гость · помощник</button><button class="btn btn-sm" data-route="/hotel/ai">Владелец · помощник</button></div>';
    const slot = app.querySelector('.harbor-demo-slot');
    if (slot) slot.append(banner);
    else app.prepend(banner);
  }
  bindForms();
  setupMotion();
  positionContextMenu();
}

function renderDemoEntry() {
  return '<main class="card demo-entry"><h1>Попробуйте HotelX</h1><p>Вход и регистрация в демоверсии не нужны. Выберите интерфейс для знакомства с учебными данными.</p><div class="row wrap"><button class="btn btn-ai" data-route="/app/ai">Помощник путешественника</button><button class="btn" data-route="/hotel/ai">Помощник владельца</button></div></main>';
}

function notFound() {
  return '<div class="card empty"><div class="empty-icon">404</div><h3>Страница не найдена</h3><p>Вернитесь в основной раздел HotelX.</p><button class="btn btn-primary" data-route="' + (state.context === 'platform' ? '/admin/dashboard' : state.context === 'business' ? '/hotel/dashboard' : '/app/explore') + '">На главную</button></div>';
}

function bindForms() {
  const aiSearch = $('#ai-search-form');
  if (aiSearch) aiSearch.addEventListener('submit', submitAiSearch);
  const guestChat = $('#guest-chat-form');
  if (guestChat) guestChat.addEventListener('submit', submitGuestChat);
  const hotelChat = $('#hotel-chat-form');
  if (hotelChat) hotelChat.addEventListener('submit', submitHotelChat);
  const guestRegister = $('#guest-register-form');
  if (guestRegister) guestRegister.addEventListener('submit', (event) => { event.preventDefault(); toast('Профиль готов', 'Гостевой доступ активирован.', 'success'); navigate('/app/explore'); });
  const managerForm = $('#manager-application-form');
  if (managerForm) managerForm.addEventListener('submit', submitManagerApplication);
}

async function submitAiSearch(event) {
  event.preventDefault();
  const prompt = $('#ai-search-input')?.value.trim();
  if (!prompt || state.assistantBusy.guest) return;
  const path = state.path;
  const status = event.currentTarget.querySelector('[role="status"]');
  if (status) status.textContent = 'Подбираем варианты…';
  const result = await sendAssistant('guest', prompt, { reset: path === '/' || path === '/app/explore' });
  if (status) status.textContent = result ? '' : 'Подбор не завершён. Попробуйте ещё раз.';
  if (result && state.context === 'personal' && state.path === path) navigate('/app/search');
}

function resetAssistant(kind) {
  if (state.assistantBusy[kind]) return;
  state.assistantVersion[kind] += 1;
  if (kind === 'guest') {
    state.aiMessages = [{ from: 'ai', text: 'Новый подбор! В каком городе хотите остановиться и что для вас важно?', suggestions: ['Алматы до 60 тысяч с завтраком', 'Астана с бассейном', 'Весь Казахстан'] }];
    state.searchResults = null; state.parsedSearch = null; state.searchSummary = ''; state.searchPrompt = '';
    state.filters = { city: '', budget: 0, amenities: [] };
  } else state.hotelAiMessages = [{ from: 'ai', text: 'Новый диалог по демоданным Aspan City Hotel. Что разберём?', suggestions: ['Какая загрузка на 7 дней?', 'Нужно ли поднять цены?', 'Покажи выручку и RevPAR'] }];
}

async function sendAssistant(kind, prompt, { reset = false, retry = false } = {}) {
  if (state.assistantBusy[kind] || !prompt.trim()) return null;
  if (reset) resetAssistant(kind);
  const messages = kind === 'guest' ? state.aiMessages : state.hotelAiMessages;
  if (messages.filter((item) => item.from === 'user').length >= 40 && !retry) { toast('Начните новый диалог', 'Демодиалог рассчитан на 40 сообщений.'); return null; }
  if (retry) messages.pop(); // Remove only the failed assistant response; keep its user turn.
  const history = messages.filter((item) => item.from === 'user').map((item) => item.text);
  if (retry) history.pop();
  else messages.push({ from: 'user', text: prompt });
  const version = state.assistantVersion[kind];
  state.assistantBusy[kind] = true;
  render();
  try {
    const result = await api(kind === 'guest' ? '/api/guest/assistant' : '/api/hotels/aspan-city/assistant', { method: 'POST', body: JSON.stringify({ prompt, history }) });
    if (version !== state.assistantVersion[kind]) return null;
    messages.push({ from: 'ai', text: result.reply, cards: result.cards, actions: result.actions, suggestions: result.suggestions });
    if (kind === 'guest') {
      state.searchResults = result.hotels;
      state.parsedSearch = result.parsed;
      state.searchSummary = result.summary;
      state.searchPrompt = prompt;
      state.filters = { city: result.parsed.city === 'Казахстан' ? '' : result.parsed.city, budget: result.parsed.budget || 0, amenities: result.parsed.amenities || [] };
    }
    return result;
  } catch (error) {
    messages.push({ from: 'ai', text: 'Сообщение не обработано: ' + error.message, error: true });
    return null;
  } finally {
    state.assistantBusy[kind] = false;
    render();
    requestAnimationFrame(() => {
      $('.assistant-pending')?.scrollIntoView({ block: 'nearest' });
      if (state.path === (kind === 'guest' ? '/app/ai' : '/hotel/ai')) {
        $('.messages')?.lastElementChild?.scrollIntoView({ block: 'nearest', behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
        $('#' + kind + '-chat-input')?.focus({ preventScroll: true });
      }
    });
  }
}

async function submitGuestChat(event) {
  event.preventDefault();
  const prompt = $('#guest-chat-input')?.value.trim();
  if (prompt) await sendAssistant('guest', prompt);
}

async function submitHotelChat(event) {
  event.preventDefault();
  const prompt = $('#hotel-chat-input')?.value.trim();
  if (prompt) await sendAssistant('hotel', prompt);
}

async function submitManagerApplication(event) {
  event.preventDefault();
  const hotelName = $('#application-hotel')?.value.trim();
  const phone = $('#application-phone')?.value.trim();
  const files = {
    identity: $('#document-identity')?.files?.[0],
    business: $('#document-business')?.files?.[0],
    ownership: $('#document-ownership')?.files?.[0]
  };
  const submit = event.currentTarget.querySelector('button[type="submit"]');
  submit.disabled = true;
  submit.textContent = 'Отправляем и шифруем документы…';
  try {
    const result = await api('/api/applications', { method: 'POST', body: JSON.stringify({ hotelName, phone, address: $('#application-address')?.value.trim(), website: $('#application-website')?.value.trim(), rooms: Number($('#application-rooms')?.value || 0) }) });
    for (const [kind, file] of Object.entries(files)) await uploadVerificationDocument(result.application.id, kind, file);
    state.myVerification = await api('/api/verifications/me');
    showModal('<div class="modal-head"><div><p class="eyebrow">VERIFICATION CENTER</p><h2>Заявка принята</h2><p>' + esc(result.application.id) + ' · статус PENDING</p></div><button class="btn btn-icon btn-ghost" data-action="close-modal">' + icon('close') + '</button></div><div class="verification-stepper"><div class="verify-step done">Аккаунт</div><div class="verify-step done">Данные отеля</div><div class="verify-step done">Личность</div><div class="verify-step done">Связь</div><div class="verify-step done">Бизнес</div></div><div class="ai-card"><p style="margin:0;line-height:1.6">Документы сохранены в закрытом хранилище. Полный доступ появится только после решения администратора.</p></div><div class="modal-actions"><button class="btn btn-primary" data-route="/app/verification">Открыть Verification Center</button></div>', true);
  } catch (error) { toast('Не удалось отправить', error.message, 'error'); submit.disabled = false; submit.textContent = 'Отправить заявку на проверку'; }
}

async function uploadVerificationDocument(verificationId, kind, file) {
  if (!file) throw new Error('Выберите все три документа для проверки.');
  const response = await fetch('/api/verifications/' + encodeURIComponent(verificationId) + '/documents/' + kind, {
    method: 'POST',
    headers: { 'content-type': file.type || 'application/octet-stream', 'x-hotelx-context': 'personal' },
    body: file
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Не удалось загрузить документ.');
  return payload;
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id) ? state.favorites.filter((item) => item !== id) : [...state.favorites, id];
  persistLocal('favorites', state.favorites);
  render();
}

function toggleCompare(id) {
  if (state.compare.includes(id)) state.compare = state.compare.filter((item) => item !== id);
  else if (state.compare.length >= 3) return toast('Можно сравнить до трёх', 'Удалите один из выбранных отелей.', 'error');
  else state.compare.push(id);
  persistLocal('compare', state.compare);
  state.compareResult = null;
  render();
}

function startBooking(hotelId, roomId) {
  state.bookingDraft = { hotelId, roomId, step: 1, guests: 2, nights: 3 };
  state.latestBooking = null;
  persistLocal('booking-draft', state.bookingDraft);
  navigate('/app/hotel/' + hotelId + '/booking');
}

function setBookingStep(step) {
  if (state.bookingDraft?.step === 2 && step === 3) {
    state.bookingDraft.guestInfo = {
      firstName: $('#guest-first')?.value.trim() || '',
      lastName: $('#guest-last')?.value.trim() || '',
      email: $('#guest-email')?.value.trim() || '',
      phone: $('#guest-phone')?.value.trim() || '',
      note: $('#guest-note')?.value.trim() || ''
    };
    if (!state.bookingDraft.guestInfo.email || !state.bookingDraft.guestInfo.phone) {
      toast('Заполните контакты', 'Email и телефон нужны для подтверждения.', 'error');
      return;
    }
  }
  state.bookingDraft = { ...(state.bookingDraft || {}), step };
  persistLocal('booking-draft', state.bookingDraft);
  render();
}

async function confirmBooking(button) {
  const draft = state.bookingDraft;
  if (!draft) return;
  button.disabled = true;
  button.textContent = 'Подтверждаем…';
  try {
    const result = await api('/api/bookings', { method: 'POST', body: JSON.stringify(draft) });
    state.latestBooking = result.booking;
    state.bookingDraft.step = 4;
    persistLocal('latest-booking', result.booking);
    persistLocal('booking-draft', state.bookingDraft);
    render();
    toast('Демо-бронь сохранена', result.booking.id, 'success');
  } catch (error) { toast('Бронь не создана', error.message, 'error'); button.disabled = false; }
}

function openApplyRecommendation() {
  const rec = state.dashboard?.recommendation;
  if (!rec || state.recommendationApplied) return;
  showModal('<div class="modal-head"><div><div class="ai-label">✦ Подтверждение AI-действия</div><h2>Изменить цену Standard King?</h2><p>Проверьте параметры до применения.</p></div><button class="btn btn-icon btn-ghost" data-action="close-modal">' + icon('close') + '</button></div><div class="price-change"><div class="price-box"><small>Старая цена</small><strong>' + money(rec.currentPrice) + '</strong></div><span class="arrow">→</span><div class="price-box"><small>Новая цена</small><strong>' + money(rec.recommendedPrice) + '</strong></div></div><div class="form-grid"><div class="field"><label>Начало</label><input class="input" value="7 ноября 2026" readonly></div><div class="field"><label>Окончание</label><input class="input" value="8 ноября 2026" readonly></div></div><div class="ai-card" style="margin-top:16px;padding:15px"><div class="row-between"><span class="text-sm">Ожидаемый эффект</span><strong style="color:var(--mint)">+' + money(rec.impact) + '</strong></div></div><div class="modal-actions"><button class="btn" data-action="close-modal">Отмена</button><button class="btn btn-ai" data-action="confirm-recommendation">Применить цену</button></div>');
}

async function confirmRecommendation(button) {
  button.disabled = true;
  button.textContent = 'Применяем…';
  try {
    const result = await api('/api/hotels/aspan-city/recommendations/price-weekend/apply', { method: 'POST', body: '{}' });
    state.recommendationApplied = true;
    persistLocal('recommendation-applied', true);
    closeModal(); render();
    toast('Цена обновлена', 'Новая цена ' + money(result.newPrice) + ' · действие записано в аудит.', 'success');
  } catch (error) { toast('Изменение отклонено', error.message, 'error'); button.disabled = false; }
}

function openAdminDecision(action, id) {
  const item = state.verifications?.find((verification) => verification.id === id);
  if (!item) return;
  const titles = { approve: 'Одобрить отель?', reject: 'Отклонить заявку?', 'request-info': 'Запросить дополнительные данные?' };
  const descriptions = { approve: 'Пользователь получит HOTEL_OWNER и business context. Решение будет записано в аудит.', reject: 'Укажите причину — заявитель сможет отправить заявку повторно.', 'request-info': 'Статус изменится на MORE_INFO_REQUIRED.' };
  showModal('<div class="modal-head"><div><p class="eyebrow">' + item.id + '</p><h2>' + titles[action] + '</h2><p>' + esc(item.hotel) + ' · ' + esc(item.applicant) + '</p></div><button class="btn btn-icon btn-ghost" data-action="close-modal">' + icon('close') + '</button></div><div class="ai-card"><p class="text-sm" style="margin:0;line-height:1.6">' + descriptions[action] + '</p></div>' + (action !== 'approve' ? '<div class="field" style="margin-top:16px"><label>Комментарий</label><textarea class="textarea" id="admin-review-note" placeholder="Причина или список нужных документов" required></textarea></div>' : '') + '<div class="modal-actions"><button class="btn" data-action="close-modal">Отмена</button><button class="btn ' + (action === 'reject' ? 'btn-danger' : 'btn-primary') + '" data-confirm-admin="' + action + '" data-id="' + id + '">Подтвердить</button></div>');
}

async function confirmAdminDecision(button) {
  const action = button.dataset.confirmAdmin;
  const id = button.dataset.id;
  button.disabled = true;
  button.textContent = 'Сохраняем…';
  try {
    const result = await api('/api/admin/verifications/' + id + '/' + action, { method: 'POST', body: JSON.stringify({ reviewNote: $('#admin-review-note')?.value.trim() || '' }) });
    const item = state.verifications.find((verification) => verification.id === id);
    if (item) item.status = result.status;
    closeModal(); render();
    toast('Решение сохранено', result.status + ' · событие добавлено в аудит.', 'success');
  } catch (error) { toast('Действие отклонено', error.message, 'error'); button.disabled = false; }
}

async function downloadVerificationDocument(button) {
  try {
    const response = await fetch('/api/admin/verifications/' + encodeURIComponent(button.dataset.id) + '/documents/' + button.dataset.kind, { headers: { 'x-hotelx-context': 'platform' } });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.message || 'Документ недоступен.');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = button.dataset.kind + '-document';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast('Документ загружен', 'Файл получен через защищённый admin endpoint.', 'success');
  } catch (error) { toast('Не удалось открыть документ', error.message, 'error'); }
}

document.addEventListener('click', async (event) => {
  const route = event.target.closest('[data-route]');
  if (route) { event.preventDefault(); if (!route.disabled) navigate(route.dataset.route); return; }
  const context = event.target.closest('[data-context]');
  if (context) { setContext(context.dataset.context); return; }
  const favorite = event.target.closest('[data-favorite]');
  if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
  const compare = event.target.closest('[data-compare]');
  if (compare) { toggleCompare(compare.dataset.compare); return; }
  const book = event.target.closest('[data-book]');
  if (book) { startBooking(book.dataset.hotel, book.dataset.book); return; }
  const tour = event.target.closest('[data-action="open-tour"]');
  if (tour) { openVirtualTour(tour.dataset.hotel); return; }
  const step = event.target.closest('[data-booking-next]');
  if (step) { setBookingStep(Number(step.dataset.bookingNext)); return; }
  const forecast = event.target.closest('[data-forecast-period]');
  if (forecast) { state.forecastPeriod = Number(forecast.dataset.forecastPeriod); render(); return; }
  const verification = event.target.closest('[data-verification]');
  if (verification) { state.selectedVerification = verification.dataset.verification; render(); return; }
  const adminAction = event.target.closest('[data-admin-action]');
  if (adminAction) { openAdminDecision(adminAction.dataset.adminAction, adminAction.dataset.id); return; }
  const confirmAdmin = event.target.closest('[data-confirm-admin]');
  if (confirmAdmin) { await confirmAdminDecision(confirmAdmin); return; }
  const guestPrompt = event.target.closest('[data-guest-prompt]');
  if (guestPrompt) { await sendAssistant('guest', guestPrompt.dataset.guestPrompt); return; }
  const hotelPrompt = event.target.closest('[data-hotel-prompt]');
  if (hotelPrompt) { await sendAssistant('hotel', hotelPrompt.dataset.hotelPrompt); return; }
  const resetChat = event.target.closest('[data-reset-assistant]');
  if (resetChat) { resetAssistant(resetChat.dataset.resetAssistant); render(); return; }
  const retryChat = event.target.closest('[data-retry-assistant]');
  if (retryChat) { const kind = retryChat.dataset.retryAssistant; const messages = kind === 'guest' ? state.aiMessages : state.hotelAiMessages; const prompt = messages[messages.length - 2]?.text; if (prompt) await sendAssistant(kind, prompt, { retry: true }); return; }
  const intent = event.target.closest('[data-intent]');
  if (intent) { state.intent = intent.dataset.intent; render(); return; }
  const billing = event.target.closest('[data-billing-cycle]');
  if (billing) { setBillingCycle(billing.dataset.billingCycle); return; }
  const plan = event.target.closest('[data-subscription-plan]');
  if (plan) { openSubscriptionConfirmation(plan.dataset.subscriptionPlan); return; }
  const action = event.target.closest('[data-action]');
  if (!action) {
    if (state.contextMenu && !event.target.closest('.context-popover')) { state.contextMenu = false; render(); }
    return;
  }
  const name = action.dataset.action;
  if (name === 'confirm-subscription') confirmSubscription();
  else if (name === 'cancel-subscription') openSubscriptionCancellation();
  else if (name === 'confirm-cancel-subscription') cancelSubscription();
  else if (name === 'toggle-context') { state.contextMenuAnchor = action.dataset.contextAnchor === 'top' ? 'top' : 'bottom'; state.contextMenu = !state.contextMenu; render(); }
  else if (name === 'open-sidebar') document.body.classList.add('sidebar-open');
  else if (name === 'close-modal') { if (!event.target.closest('[data-modal-panel]') || event.target.closest('button')) closeModal(); }
  else if (name === 'retry') hydrateRoute().catch(handleLoadError);
  else if (name === 'retry-init') { state.error = null; render(); init(); }
  else if (name === 'all-hotels') { state.filters = { city: '', budget: 0, amenities: [] }; state.searchPool = state.hotels; state.searchResults = state.hotels; state.parsedSearch = null; navigate('/app/search'); }
  else if (name === 'clear-compare') { state.compare = []; state.compareResult = null; persistLocal('compare', []); if (state.path === '/app/compare') navigate('/app/search'); else render(); }
  else if (name === 'notifications') toast('Новых уведомлений нет', 'Мы сообщим об изменениях бронирований и заявок.');
  else if (name === 'confirm-booking') await confirmBooking(action);
  else if (name === 'apply-recommendation') openApplyRecommendation();
  else if (name === 'confirm-recommendation') await confirmRecommendation(action);
  else if (name === 'save-settings') toast('Изменения сохранены', 'Настройки обновлены.', 'success');
  else if (name === 'generate-report') toast('Макет отчёта сформирован', 'Экспорт PDF в прототипе ещё не подключён.', 'success');
  else if (name === 'connect-integration') toast('Демонстрационный экран', 'Реальное OAuth-подключение внешнего сервиса ещё не настроено.');
  else if (name === 'view-document') await downloadVerificationDocument(action);
  else if (name === 'resubmit-verification') {
    try { await api('/api/verifications/me/resubmit', { method: 'POST', body: '{}' }); state.myVerification = await api('/api/verifications/me'); render(); toast('Заявка отправлена повторно', 'Статус изменён на PENDING.', 'success'); }
    catch (error) { toast('Не удалось отправить', error.message, 'error'); }
  }
  else if (name === 'security-test') {
    try { await api('/api/security/probe'); toast('Проверка выполнена', 'Бизнес-контекст разрешён.'); }
    catch (error) { if (error.status === 403) toast('Защита работает', 'Платформенный контекст не получил hotel permission: 403.', 'success'); else toast('Ошибка проверки', error.message, 'error'); }
  }
  else if (name === 'invite-staff') showModal('<div class="modal-head"><div><h2>Пригласить сотрудника</h2><p>Роль и права будут привязаны только к Aspan City Hotel.</p></div><button class="btn btn-icon btn-ghost" data-action="close-modal">' + icon('close') + '</button></div><div class="field"><label>Email</label><input class="input" type="email" placeholder="manager@hotel.com"></div><div class="field" style="margin-top:14px"><label>Роль</label><select class="select"><option>HOTEL_MANAGER</option><option>HOTEL_STAFF</option></select></div><div class="modal-actions"><button class="btn" data-action="close-modal">Отмена</button><button class="btn btn-primary" data-action="close-modal">Отправить приглашение</button></div>');
  else if (name === 'new-reservation') toast('Форма новой брони', 'В MVP основной поток создаётся из Guest interface.');
  else if (name === 'edit-price') openApplyRecommendation();
  else if (name === 'reservation-detail') toast('Бронирование ' + action.dataset.id, 'Детальная карточка открыта.');
});

document.addEventListener('change', async (event) => {
  if (event.target.matches('[data-verification-upload]')) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await uploadVerificationDocument(event.target.dataset.id, event.target.dataset.verificationUpload, file);
      state.myVerification = await api('/api/verifications/me');
      render();
      toast('Документ сохранён', 'Файл загружен в закрытое хранилище.', 'success');
    } catch (error) { toast('Не удалось загрузить', error.message, 'error'); }
    return;
  }
  if (event.target.matches('[data-compare-checkbox]')) toggleCompare(event.target.dataset.compareCheckbox);

});

window.addEventListener('popstate', () => {
  state.path = location.pathname;
  const needed = requiredContext(state.path);
  if (hasContext(needed)) state.context = needed;
  hydrateRoute().catch(handleLoadError);
});

async function init() {
  state.error = null;
  try {
    const me = await api('/api/me');
    state.me = me;
    state.subscription = normalizeSubscription(loadLocal(deviceKey('demo-subscription:aspan-city'), null));
    if (state.subscription) state.billingCycle = state.subscription.cycle;
    state.compare = loadLocal(deviceKey('compare'), []);
    state.favorites = loadLocal(deviceKey('favorites'), ['aspan-city']);
    state.recommendationApplied = loadLocal(deviceKey('recommendation-applied'), false);
    state.bookingDraft = loadLocal(deviceKey('booking-draft'), null);
    state.latestBooking = loadLocal(deviceKey('latest-booking'), null);
    if (me.verification && !me.contexts.some((context) => context.id === 'business') && ['/', '/login', '/hotel/verification'].includes(state.path)) {
      state.path = '/app/verification';
      history.replaceState({}, '', state.path);
    }
    const needed = requiredContext(state.path);
    state.context = hasContext(needed) ? needed : me.defaultContext;
    persistLocal('context', state.context);
    if (state.path.startsWith('/app') || state.path.startsWith('/hotel') || state.path.startsWith('/admin')) await hydrateRoute();
    else render();
  } catch (error) {
    state.error = error;
    render();
  }
}

init();
