import { useRef, useState, type ReactNode } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const stays = [
  { id: 'zailiyskiy-resort', name: 'Zailiyskiy Mountain Resort', city: 'Алматы', setting: 'В горах', type: 'Горный курорт' },
  { id: 'aspan-city', name: 'Aspan City Hotel', city: 'Астана', setting: 'В городе', type: 'Городской отель' },
  { id: 'caspian-breeze', name: 'Caspian Breeze Hotel', city: 'Актау', setting: 'У моря', type: 'Отель у моря' },
] as const;

type Glyph = 'spark' | 'lens' | 'mountain' | 'pin' | 'menu' | 'key' | 'grid';
function Icon({ name }: { name: Glyph }) {
  const paths: Record<Glyph, ReactNode> = {
    spark: <><path d="M12 2c1.4 6.5 3.5 8.6 10 10-6.5 1.4-8.6 3.5-10 10C10.6 15.5 8.5 13.4 2 12c6.5-1.4 8.6-3.5 10-10Z"/></>,
    lens: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    mountain: <><path d="m2 19 8-14 5 9 2-4 5 9H2Z"/><path d="m7.7 9 2.3 2.3L12 9"/></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></>,
    menu: <path d="M3 8h18M3 16h18"/>,
    key: <><circle cx="8" cy="9" r="4.5"/><path d="m11.5 12.5 7 7 2-2m-5-1 2-2"/></>,
    grid: <><path d="M3 20h18M5 20V7l8-4v17m0-12h6v12M9 9v1m0 3v1m7-3v1m0 3v1"/></>,
  };
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Route({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return <a href={to} data-route={to} className={className}>{children}</a>;
}

function Navigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  const links = <><a href="#collection">Коллекция</a><a href="#how">Как работает</a><Route to="/hotel/dashboard">Для отелей</Route><a href="#plans">Тарифы</a></>;
  return <nav className="hx-nav hx-wrap" aria-label="Основная навигация">
    <Route to="/" className="hx-logo">Hotel<span>X</span></Route>
    <div className="hx-links">{links}</div>
    <div className="flex items-center gap-3"><Route to="/login" className="hx-enter">Войти</Route>
      <details className="hx-menu" ref={menu} onKeyDown={event => {
        if (event.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); }
      }}><summary aria-label="Меню"><Icon name="menu"/></summary><div onClick={() => { if (menu.current) menu.current.open = false; }}>{links}</div></details>
    </div>
  </nav>;
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const shift = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  return <section className="hx-hero" ref={section} aria-labelledby="hx-title">
    <m.div className="hx-scene" style={{ y: reduced ? 0 : shift }}>
      <picture><source media="(max-width: 640px)" srcSet="/assets/alatau-mobile.webp"/><img src="/assets/alatau-wide.webp" fetchPriority="high" width="1920" height="715" alt="Архитектурная иллюстрация HotelX. Горный отель в вечернем свете."/></picture>
    </m.div>
    <Navigation/>
    <div className="hx-hero-main hx-wrap">
      <div className="hx-kicker hx-hero-kicker"><span/> КАЗАХСТАН · ДЕМО-КАТАЛОГ</div>
      <h1 id="hx-title">Искусство<br/><em>жить в пути.</em></h1>
      <p>От тихих шале у подножия гор до отелей в центре города. Найдите место под свой ритм.</p>
      <div className="hx-actions"><Route to="/app/explore" className="hx-button hx-light"><Icon name="lens"/>Найти отель</Route><Route to="/app/ai" className="hx-button hx-glass"><Icon name="spark"/>Спросить помощника</Route></div>
    </div>
    <div className="hx-hero-foot hx-wrap">
      <a className="hx-discover" href="#collection"><i aria-hidden="true"/>К коллекции</a>
      <Route to="/app/hotel/zailiyskiy-resort" className="hx-location"><Icon name="mountain"/><span><small>ГОРНОЕ НАПРАВЛЕНИЕ</small>Заилийский Алатау</span></Route>
    </div>
  </section>;
}

function Collection() {
  const [filter, setFilter] = useState('Все');
  const reduced = useReducedMotion();
  return <section className="hx-collection hx-wrap" id="collection">
    <div className="hx-kicker"><span/> ДЕМО-КАТАЛОГ</div>
    <div className="hx-heading-row"><h2>Коллекция <em>HotelX</em></h2><Route to="/app/explore" className="hx-text-link">Весь каталог</Route></div>
    <div className="hx-tabs flex flex-wrap gap-2" role="group" aria-label="Тип отдыха">{['Все', ...stays.map(stay => stay.setting)].map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
    <div className="hx-stays">{stays.filter(stay => filter === 'Все' || stay.setting === filter).map(stay => <m.article key={stay.id} initial={false} whileInView={reduced ? undefined : { y: [14, 0] }} viewport={{ once: true }} transition={{ duration: .5 }}>
      <Route to={'/app/hotel/' + stay.id} className="hx-stay">
        <img src={'/assets/' + stay.id + '.webp'} alt="" loading="lazy" decoding="async" width="720" height="530"/>
        <span className="hx-city"><Icon name="pin"/>{stay.city}</span>
        <div className="hx-stay-title"><span>{stay.type}</span><h3>{stay.name}</h3></div>
      </Route>
    </m.article>)}</div>
  </section>;
}

function Platform() {
  return <section className="hx-platform" id="how"><div className="hx-wrap hx-platform-inner">
    <div><div className="hx-kicker"><span/> ВОЗМОЖНОСТИ HOTELX</div><h2>По обе стороны<br/><em>путешествия.</em></h2></div>
    <div className="hx-role-list">
      <div><Icon name="key"/><div><h3>Я ищу отель</h3><p>Опишите поездку помощнику, сравните варианты и сохраните любимые места.</p><Route to="/app/ai" className="hx-text-link">Начать подбор</Route></div></div>
      <div><Icon name="grid"/><div><h3>Я управляю отелем</h3><p>Посмотрите загрузку номеров, прогноз спроса и рекомендации по ценам в кабинете отеля.</p><div className="flex flex-wrap gap-5"><Route to="/hotel/dashboard" className="hx-text-link">Открыть кабинет</Route><Route to="/register?intent=manager" className="hx-text-link">Подключить отель</Route></div></div></div>
    </div>
  </div></section>;
}

export function Editorial() {
  return <LazyMotion features={domAnimation}><Hero/><Collection/><Platform/></LazyMotion>;
}
