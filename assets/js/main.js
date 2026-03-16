/**
 * Main JavaScript (minimal)
 */
// Language redirect (once per session, only on English homepage)
if (document.documentElement.lang === 'en' && window.location.pathname === '/' &&
    !sessionStorage.getItem('lang_redirected') && navigator.language.startsWith('de')) {
  sessionStorage.setItem('lang_redirected', '1');
  window.location.replace('/de/');
}

document.addEventListener('DOMContentLoaded', () => {

  // Protected email
  document.querySelectorAll('[data-user][data-domain]').forEach(el => {
    const addr = el.dataset.user + '@' + el.dataset.domain;
    if (el.tagName === 'A') {
      el.href = 'mailto:' + addr;
    } else {
      el.textContent = addr;
    }
  });

  // Navbar scroll effect
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
  }, { passive: true });

  // Close mobile nav on link click
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('navbarNav');
      if (nav.classList.contains('show')) bootstrap.Collapse.getInstance(nav)?.hide();
    });
  });

  // Active nav highlight
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(l =>
        l.classList.toggle('active', l.getAttribute('href').endsWith(`#${e.target.id}`))
      );
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));

  // Counter animation
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, target = +el.dataset.target, t0 = performance.now();
      (function step(now) {
        const p = Math.min((now - t0) / 2000, 1);
        el.textContent = Math.round(target * (1 - (1 - p) ** 3));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
      cObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(c => cObs.observe(c));

  // Portfolio filter (event delegation)
  const items = document.querySelectorAll('.portfolio-item');
  document.querySelector('.portfolio-filter')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    items.forEach(item => {
      const show = f === 'all' || item.dataset.category === f;
      item.classList.toggle('hidden', !show);
      setTimeout(() => { item.style.display = show ? '' : 'none'; }, show ? 0 : 300);
    });
  });

  // Typewriter headline
  const headlineEl = document.querySelector('.animated-headline');
  if (headlineEl) {
    const all = JSON.parse(headlineEl.dataset.headlines);
    const first = all[0];
    const rest = all.slice(1);
    for (let i = rest.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
    const words = [first, ...rest];
    let wordIdx = 0, charIdx = words[0].length, deleting = true;
    const speed = { type: 100, delete: 50, pause: 2000 };

    function typeStep() {
      const word = words[wordIdx];
      if (deleting) {
        charIdx--;
        headlineEl.textContent = word.substring(0, charIdx);
        if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; }
        setTimeout(typeStep, speed.delete);
      } else {
        charIdx++;
        headlineEl.textContent = words[wordIdx].substring(0, charIdx);
        if (charIdx === words[wordIdx].length) { deleting = true; setTimeout(typeStep, speed.pause); }
        else setTimeout(typeStep, speed.type);
      }
    }
    setTimeout(typeStep, speed.pause);
  }

  // Carousel dots
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const dotsEl = carousel.querySelector('.carousel-dots');
    if (!slides.length) return;

    dotsEl.innerHTML = slides.map((_, i) =>
      `<button class="carousel-dot${i === 0 ? ' active' : ''}" aria-label="Slide ${i + 1}"></button>`
    ).join('');

    dotsEl.addEventListener('click', e => {
      const dot = e.target.closest('.carousel-dot');
      if (dot) slides[[...dotsEl.children].indexOf(dot)]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });

    const dotObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const idx = slides.indexOf(entry.target);
        [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === idx));
      });
    }, { root: track, threshold: 0.5 });
    slides.forEach(s => dotObs.observe(s));
  });

});
