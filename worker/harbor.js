const HARBOR_MEDIA = {
  "doors": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063048_97fd9a70-adbe-46bd-bfce-ec1004f6c7d8.png&w=2000&q=85",
  "aerial": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063055_ee1debcd-d200-484f-b94f-fad6dcffd4eb.png&w=2000&q=85",
  "back": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063251_24fbd7cc-00df-49ec-8fbf-d8a0349b1e98.png&w=2000&q=85",
  "city": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063252_b9f2fecf-9be0-485f-842f-3aa6bbc251f2.png&w=2000&q=85",
  "front": "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261117_063151_7804d758-a2eb-4499-9b56-8f493edbb206.png&w=2000&q=85",
  "tilt": "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261117_063355_a600befc-45d6-4a32-9db6-9d6565a89609.mp4",
  "rain": "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261117_063703_04e54df7-2236-4dff-b95b-a9a34c1f78ec.mp4"
};

const HOME_WORDMARK = 'HotelX';

class HotelXHarbor extends HTMLElement {
  connectedCallback() {
    this.events = new AbortController();
    this.frames = [];
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = navigator.connection?.saveData;
    const still = this.reduced.matches || saveData;
    const stageWidth = Math.max(innerWidth, Math.max(520, innerHeight) * 16 / 9);
    const resolution = Math.min(2000, Math.ceil(stageWidth * Math.min(devicePixelRatio, 2) / 100) * 100);
    const asset = key => HARBOR_MEDIA[key].replace('w=2000', 'w=' + resolution);
    const sceneImage = key => '<img alt="" draggable="false" src="' + asset(key) + '">';
    const video = cls => '<video class="' + cls + '" muted playsinline preload="none" disablepictureinpicture></video>';
    this.className = still ? 'harbor' : 'harbor intro';
    this.innerHTML = `
      <div class="hb-stage">
        <div class="hb-layer hb-back">${sceneImage('back')}${video('hb-rain')}${video('hb-rain')}<div class="hb-shade"></div></div>
        <div class="hb-headline"><div class="hb-type"><span class="hb-kicker">Отели Казахстана</span><h1 aria-label="${HOME_WORDMARK}">${[...HOME_WORDMARK].map(letter => '<span aria-hidden="true">'+letter+'</span>').join('')}</h1></div></div>
        <div class="hb-layer hb-city">${sceneImage('city')}</div>
        <div class="hb-layer hb-front"><div class="hb-tint"></div>${sceneImage('front')}</div>
      </div>
      <div class="hb-opening" aria-hidden="true"></div><div class="hb-doors" aria-hidden="true"><i><b>H</b></i><i><b>X</b></i></div>
      <nav class="hb-nav" aria-label="Навигация HotelX">
        <a class="hb-logo" href="/" data-route="/">Hotel<span>X</span></a>
        <div class="hb-links"><a href="/" data-route="/" aria-current="page">Главная</a><a href="#how">О платформе</a><a href="/hotel/dashboard" data-route="/hotel/dashboard">Отельерам</a><a href="#plans">Тарифы</a></div>
        <div class="hb-actions"><a class="hb-login" href="/login" data-route="/login"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4.4" ry="9"/><path d="M3 12h18"/></svg>Войти</a><a class="hb-cta" href="/app/explore" data-route="/app/explore">Каталог отелей</a></div>
      </nav>
      <form class="hb-search" id="ai-search-form" role="search" aria-label="Подбор отеля">
        <label for="ai-search-input">Какой отель вам подойдёт?</label>
        <div class="hb-search-field"><input id="ai-search-input" required maxlength="2000" placeholder="Алматы до 60 000 ₸ с завтраком" autocomplete="off"><button type="submit">Подобрать</button></div>
        <span class="hb-search-status" role="status"></span>
      </form>
      <button class="hb-skip" type="button">Пропустить заставку</button>
      <div class="hb-tools"><a href="/app/hotel/aspan-city" data-route="/app/hotel/aspan-city">Aspan City Hotel · демо</a><button type="button" class="hb-pause" aria-label="Приостановить дождь" title="Приостановить дождь" aria-pressed="false">Ⅱ</button></div>`;
    const el = selector => this.querySelector(selector);
    el('.hb-nav').inert = !still;
    el('.hb-search').inert = !still;
    this.rain = [...this.querySelectorAll('.hb-rain')];
    this.wet = false;
    this.userPaused = false;
    this.activeRain = 0;
    this.inView = true;
    this.finished = false;
    const signal = this.events.signal;
    this.listen = (target, event, handler) => target.addEventListener(event, handler, { signal });
    this.listen(el('.hb-skip'),'click', () => { this.finish(); el('.hb-cta').focus({preventScroll:true}); });
    this.listen(el('.hb-pause'), 'click', () => {
      this.userPaused = !this.userPaused;
      const label = this.userPaused ? 'Продолжить дождь' : 'Приостановить дождь';
      el('.hb-pause').setAttribute('aria-label',label);
      el('.hb-pause').title = label;
      el('.hb-pause').setAttribute('aria-pressed',String(this.userPaused));
      el('.hb-pause').textContent = this.userPaused ? '▷' : 'Ⅱ';
      this.syncRain();
    });
    this.listen(this.reduced,'change', () => {
      if (this.reduced.matches) this.finish();
      this.syncRain();
    });
    this.listen(document,'visibilitychange', () => this.syncRain());
    this.visibility = new IntersectionObserver(([entry]) => {this.inView = entry.isIntersecting; this.syncRain();});
    this.visibility.observe(this);
    this.listen(this.rain[0], 'timeupdate', () => this.crossfade(0));
    this.listen(this.rain[1], 'timeupdate', () => this.crossfade(1));
    for (const rain of this.rain) {
      this.listen(rain,'playing',() => { if (this.wet && rain === this.rain[this.activeRain]) rain.classList.add('on'); });
      this.listen(rain,'error',() => {rain.classList.remove('on');});
    }

    const measure = () => {
      const { width, height } = this.getBoundingClientRect();
      const stage = el('.hb-stage').getBoundingClientRect();
      const nav = el('.hb-nav').getBoundingClientRect();
      const baseline = (height > width * 1.2 ? .362 : .43) * stage.height;
      const available = baseline + stage.top - nav.bottom - .035 * height;
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = '700 100px HarborInter, Inter, sans-serif';
      const ratio = ctx.measureText(HOME_WORDMARK).width / 100 - .045 * HOME_WORDMARK.length;
      const size = Math.max(24, Math.min(stage.width * .625 / ratio, width * .92 / ratio, available / .88));
      this.style.setProperty('--word',size+'px');
      this.style.setProperty('--baseline',baseline+'px');
    };
    this.resize = new ResizeObserver(measure);
    this.resize.observe(this);
    measure();
    document.fonts.load('700 100px HarborInter').then(() => { if (!signal.aborted) measure(); }).catch(()=>{});
    if (still) { this.finish(); return; }

    el('.hb-opening').innerHTML = sceneImage('aerial') + video('hb-tilt');
    this.tilt = el('.hb-tilt');
    this.tilt.preload = 'auto';
    this.tilt.src = HARBOR_MEDIA.tilt;
    const door = new Image();
    door.src = asset('doors');
    this.style.setProperty('--door', 'url("' + door.src + '")');
    const tiltReady = new Promise(resolve => {
      if (this.tilt.readyState >= 4) resolve();
      else {this.listen(this.tilt,'canplaythrough',resolve); this.listen(this.tilt,'error',resolve);}
    });
    const images = [door,...this.querySelectorAll('img')];
    const ready = Promise.allSettled([...images.map(img => img.decode()), tiltReady]);
    this.failsafe = setTimeout(() => this.start(),5000);
    ready.then(() => { if (!signal.aborted && !this.started && !this.finished) this.delay = setTimeout(() => this.start(),120); });
  }

  start() {
    if (this.started || this.finished || !this.isConnected) return;
    this.started = true;
    clearTimeout(this.failsafe);
    const ease = 'cubic-bezier(.45,0,.55,1)';
    const track = (element, frames) => {
      const keyframes = frames.map(([ms, properties, easing]) => ({...properties, offset:ms/7400,easing:easing || 'linear'}));
      keyframes.unshift({...keyframes[0],offset:0,easing:'linear'});
      keyframes.push({...keyframes.at(-1),offset:1});
      const animation = element.animate(keyframes,{duration:7400,fill:'both'});
      animation.pause(); this.frames.push(animation);
    };
    const item = sel => this.querySelector(sel);
    const y = pct => ({transform:'translateY('+pct+'%)'});
    const x = pct => ({transform:'translateX('+pct+'%)'});
    const opacity = opacity => ({opacity});
    const rise = (opacity,offset) => ({opacity,transform:'translateY('+offset+')'});
    const reveal = 'cubic-bezier(.2,.65,.3,1)';
    track(item('.hb-doors i:first-child'),[[20,x(0),'cubic-bezier(.1,.2,.8,1)'],[1130,x(-101)]]);
    track(item('.hb-doors i:last-child'),[[20,x(0),'cubic-bezier(.4,.6,.9,1)'],[1240,x(101)]]);
    track(this.tilt,[[1190,opacity(0),ease],[1470,opacity(1)]]);
    track(item('.hb-opening'),[[2450,opacity(1),ease],[2950,opacity(0)]]);
    track(item('.hb-nav'),[[2450,rise(0,'-6px'),'ease-out'],[2750,rise(1,'0px')]]);
    track(item('.hb-kicker'),[[2450,rise(0,'.5em'),reveal],[3100,rise(1,'0em')]]);
    const letters = this.querySelectorAll('h1 span');
    letters.forEach((letter, i) => {
      const from = 2450 + i * 54;
      if (i === letters.length - 1) {
        track(letter, [
          [from, {opacity: 0, transform: 'translateY(.2em) rotate(-12deg) scale(.88)'}, reveal],
          [from + 490, {opacity: 1, transform: 'translateY(0) rotate(2deg) scale(1.025)'}, 'ease-out'],
          [from + 850, {opacity: 1, transform: 'none'}]
        ]);
      } else {
        track(letter, [[from,rise(0,'.14em'),reveal],[from+700,rise(1,'0em')]]);
      }
    });
    track(item('.hb-search'),[[3200,rise(0,'12px'),reveal],[3950,rise(1,'0px')]]);
    track(item('.hb-shade'),[[2900,opacity(0),ease],[3700,opacity(1)]]);
    track(item('.hb-back'),[[2900,y(0),'cubic-bezier(.45,0,.35,1)'],[4300,y(-1.5)]]);
    track(item('.hb-city'),[[2900,y(0),'cubic-bezier(.45,0,.3,1)'],[4300,y(-4)],[4600,y(-4),ease],[6900,y(0)]]);
    track(item('.hb-headline'),[[3000,y(6),'cubic-bezier(.3,0,.4,1)'],[4800,y(0)]]);
    track(item('.hb-front'),[[3350,y(66),'cubic-bezier(.2,.5,.2,1)'],[6000,y(-2.5),ease],[7300,y(0)]]);
    const start = performance.now();
    const tick = now => {
      const elapsed = Math.min(now-start,7400);
      for (const animation of this.frames) animation.currentTime = elapsed;
      if (elapsed >= 1250 && elapsed < 2850 && this.tilt.readyState >= 2) {
        const duration = this.tilt.duration;
        if (Number.isFinite(duration)) {
          const base = duration / 1.6;
          const target = (elapsed-1250)/1600 * duration;
          this.tilt.playbackRate = Math.min(base*1.2,Math.max(base*.85,base+(target-this.tilt.currentTime)*2));
          if (!this.tiltStarted) { this.tiltStarted = true; this.tilt.play().catch(()=>{}); }
        }
      }
      if (elapsed >= 2850 && !this.tiltEnded) {
        this.tiltEnded = true;
        this.tilt.pause();
        if (Number.isFinite(this.tilt.duration)) this.tilt.currentTime = Math.max(0,this.tilt.duration-.042);
      }
      if (elapsed >= 2450 && this.querySelector('.hb-nav').inert) this.querySelector('.hb-nav').inert = false;
      if (elapsed >= 3200 && this.querySelector('.hb-search').inert) this.querySelector('.hb-search').inert = false;
      if (elapsed >= 2400 && !this.wet) {this.wet = true; this.syncRain();}
      if (elapsed >= 7400) this.finish();
      else this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  syncRain() {
    if (!this.wet) return;
    const motion = !this.reduced.matches && !navigator.connection?.saveData;
    this.querySelector('.hb-pause').hidden = !motion;
    if (!motion || !this.inView || document.hidden || this.userPaused) {
      this.rain.forEach(video => {video.pause(); if (!motion) video.classList.remove('on');});
      return;
    }
    for (const video of this.rain) if (!video.src) { video.preload = 'auto'; video.src = HARBOR_MEDIA.rain; }
    const active = this.rain[this.activeRain];
    active.play().catch(()=>{});
  }

  crossfade(index) {
    const current = this.rain[index];
    if (this.activeRain !== index || current.paused || current.currentTime < 2.85 || this.swapping) return;
    const next = this.rain[1-index];
    if (next.readyState < 2) {if (current.currentTime >= 3.6) current.currentTime = 0; return;}
    this.swapping = true;
    next.currentTime = 0;
    next.play().then(() => {
      if (!this.isConnected || next.paused) return;
      this.activeRain = 1-index;
      next.classList.add('on'); current.classList.remove('on');
      clearTimeout(this.fadeTimer);
      this.fadeTimer = setTimeout(() => current.pause(),800);
    }).catch(()=>{}).finally(()=>{this.swapping = false;});
  }

  finish() {
    this.finished = true;
    this.classList.remove('intro');
    this.querySelector('.hb-nav').inert = false;
    this.querySelector('.hb-search').inert = false;
    clearTimeout(this.failsafe); clearTimeout(this.delay); cancelAnimationFrame(this.frame);
    this.frames.forEach(animation => animation.cancel()); this.frames = [];
    this.tilt?.pause();
    this.querySelector('.hb-opening').replaceChildren();
    this.wet = true; this.syncRain();
  }

  disconnectedCallback() {
    this.events.abort(); this.resize.disconnect(); this.visibility.disconnect();
    cancelAnimationFrame(this.frame);
    [this.failsafe,this.delay,this.fadeTimer].forEach(clearTimeout);
    this.frames.forEach(animation => animation.cancel());
    for (const video of [...this.rain,this.tilt].filter(Boolean)) {
      video.pause(); video.removeAttribute('src'); video.load();
    }
  }
}
customElements.define('hotelx-harbor', HotelXHarbor);
