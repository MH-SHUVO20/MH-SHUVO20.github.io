/* ============================================================
   viewport.js — Dynamic responsive behaviour
   Watches viewport, orientation, theme, and drives layout
   ============================================================ */

(function () {

  const html = document.documentElement;

  // ── 1. Breakpoint classes on <html> ─────────────────────────
  // Lets CSS do nothing; JS drives class-based overrides cleanly
  const BREAKPOINTS = [
    { name: 'xs',  max: 400  },
    { name: 'sm',  max: 640  },
    { name: 'md',  max: 900  },
    { name: 'lg',  max: 1100 },
    { name: 'xl',  max: Infinity },
  ];

  function applyBreakpoint() {
    const w = window.innerWidth;
    BREAKPOINTS.forEach(bp => html.classList.remove('vp-' + bp.name));
    const current = BREAKPOINTS.find(bp => w <= bp.max);
    if (current) html.classList.add('vp-' + current.name);

    // Body attribute for CSS attribute selectors
    html.setAttribute('data-vp', current ? current.name : 'xl');

    // Toggle mobile flag for JS consumers
    html.classList.toggle('is-mobile', w <= 900);
    html.classList.toggle('is-touch',
      window.matchMedia('(pointer: coarse)').matches);
  }

  applyBreakpoint();
  window.addEventListener('resize', debounce(applyBreakpoint, 80));

  // ── 2. Orientation ───────────────────────────────────────────
  function applyOrientation() {
    const portrait = window.matchMedia('(orientation: portrait)').matches;
    html.classList.toggle('is-portrait', portrait);
    html.classList.toggle('is-landscape', !portrait);

    // On landscape phone: shrink mobile-avatar
    const mobileWrap = document.querySelector('.mobile-avatar-wrap');
    if (mobileWrap && html.classList.contains('is-mobile')) {
      const size = portrait ? null : '100px';
      mobileWrap.style.width  = size || '';
      mobileWrap.style.height = size || '';
    }
  }

  applyOrientation();
  window.matchMedia('(orientation: portrait)')
    .addEventListener('change', applyOrientation);
  window.addEventListener('orientationchange', () => {
    setTimeout(applyOrientation, 120); // wait for resize to settle
  });

  // ── 3. iOS visual viewport (notch / keyboard) ───────────────
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      // When keyboard opens on iOS, real height shrinks — update CSS var
      html.style.setProperty('--vvh', window.visualViewport.height + 'px');
    });
    // Init
    html.style.setProperty('--vvh', window.visualViewport.height + 'px');
  }

  // ── 4. Dynamic hero layout switch ───────────────────────────
  const mq = window.matchMedia('(max-width: 900px)');

  function handleHeroLayout(mobile) {
    const mobilePhoto = document.getElementById('heroMobilePhoto');
    const desktopRight = document.getElementById('heroRight');
    if (!mobilePhoto || !desktopRight) return;

    if (mobile) {
      mobilePhoto.style.display  = 'flex';
      desktopRight.style.display = 'none';
    } else {
      mobilePhoto.style.display  = '';   // let CSS decide
      desktopRight.style.display = '';
    }
  }

  // Run immediately, then on every viewport change
  handleHeroLayout(mq.matches);
  mq.addEventListener('change', e => handleHeroLayout(e.matches));

  // ── 5. Close nav on outside tap (mobile) ────────────────────
  document.addEventListener('click', e => {
    const nav   = document.getElementById('navMenu');
    const ham   = document.getElementById('hamburger');
    if (!nav || !ham) return;
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !ham.contains(e.target)) {
      nav.classList.remove('open');
      ham.classList.remove('open');
    }
  });

  // ── 6. Close nav on Escape ───────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const nav = document.getElementById('navMenu');
      const ham = document.getElementById('hamburger');
      if (nav) nav.classList.remove('open');
      if (ham) ham.classList.remove('open');
    }
  });

  // ── 7. Sticky navbar height → CSS var ───────────────────────
  function setNavHeight() {
    const nav = document.getElementById('navbar');
    if (nav) {
      var tb  = document.getElementById('topbar');
      var tbH  = tb ? tb.offsetHeight : 0;
      html.style.setProperty('--navbar-h', (nav.offsetHeight + tbH) + 'px');
    }
  }
  setNavHeight();
  window.addEventListener('resize', debounce(setNavHeight, 100));

  // ── 8. Scroll direction class ────────────────────────────────
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    html.classList.toggle('scrolling-down', y > lastScroll && y > 80);
    html.classList.toggle('scrolling-up',   y < lastScroll && y > 80);
    lastScroll = y;
  }, { passive: true });

  // ── Utility ──────────────────────────────────────────────────
  function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

})();
