/* ============================================================
   main.js — App initialization, preloader, form, theme, misc
   ============================================================ */

// ── Preloader ─────────────────────────────────────────────────
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const text = document.getElementById('preloaderText');
  if (!preloader) return;

  const steps = ['LOADING NEURAL NETWORK...', 'INITIALIZING AI ENGINE...', 'RENDERING PORTFOLIO...', 'READY.'];
  let pct = 0;
  const interval = setInterval(() => {
    pct = Math.min(pct + Math.random() * 18 + 5, 100);
    if (fill) fill.style.width = pct + '%';
    if (text) text.textContent = steps[Math.floor((pct / 100) * (steps.length - 1))];
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
        // Init AOS after preloader
        if (typeof AOS !== 'undefined') {
          AOS.init({ once: true, duration: 700, offset: 80 });
        }
      }, 400);
    }
  }, 80);
})();

// ── Hamburger / Mobile Nav ────────────────────────────────────
(function initMobileNav() {
  const ham = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  if (!ham || !menu) return;

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

// ── Theme Toggle ──────────────────────────────────────────────
(function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const saved = localStorage.getItem('mhshuvo-theme') || 'dark';
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    btn.innerHTML = '<i class="fas fa-sun"></i>';
  }
  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      btn.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('mhshuvo-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      btn.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('mhshuvo-theme', 'light');
    }
  });
})();

// ── Contact Form ──────────────────────────────────────────────
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('formSubmit');
  const successEl = document.getElementById('formSuccess');
  const msgEl = document.getElementById('cMsg');
  const charCount = document.getElementById('charCount');

  if (!form) return;

  // Char counter
  msgEl?.addEventListener('input', () => {
    const len = msgEl.value.length;
    if (charCount) charCount.textContent = `${len} / 500`;
    if (len > 500) msgEl.classList.add('error');
    else msgEl.classList.remove('error');
  });

  function validate() {
    let valid = true;
    const name = document.getElementById('cName');
    const email = document.getElementById('cEmail');
    const msg = document.getElementById('cMsg');

    function setErr(field, errId, msg) {
      const errEl = document.getElementById(errId);
      if (field.value.trim() === '') {
        field.classList.add('error');
        if (errEl) errEl.textContent = msg;
        valid = false;
      } else {
        field.classList.remove('error');
        if (errEl) errEl.textContent = '';
      }
    }

    setErr(name, 'errName', 'Name is required.');
    if (email.value.trim() === '') {
      email.classList.add('error');
      document.getElementById('errEmail').textContent = 'Email is required.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email.classList.add('error');
      document.getElementById('errEmail').textContent = 'Enter a valid email.';
      valid = false;
    } else {
      email.classList.remove('error');
      document.getElementById('errEmail').textContent = '';
    }
    setErr(msg, 'errMsg', 'Message is required.');
    return valid;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate send (replace with real API call e.g. formspree, emailjs)
    await new Promise(r => setTimeout(r, 1500));

    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    if (successEl) successEl.classList.add('show');
    form.reset();
    if (charCount) charCount.textContent = '0 / 500';

    // Use mailto as fallback
    const name = document.getElementById('cName').value;
    const email = document.getElementById('cEmail').value;
    const subject = document.getElementById('cSubject').value;
    const msg = document.getElementById('cMsg').value;
    // Uncomment below to open mail client:
    // window.location.href = `mailto:mdmehedihasanshuvo994@gmail.com?subject=${encodeURIComponent(subject||'Portfolio Contact')}&body=${encodeURIComponent('From: '+name+' <'+email+'>\n\n'+msg)}`;

    if (window.showToast) showToast('Message sent! I will get back to you soon.', 'success');
    setTimeout(() => successEl?.classList.remove('show'), 5000);
  });
})();

// ── Back to top button ────────────────────────────────────────
(function initBackTop() {
  const btn = document.createElement('a');
  btn.href = '#hero';
  btn.className = 'back-top';
  btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btn.title = 'Back to top';
  document.body.appendChild(btn);
})();

// ── Video lazy load on hover / touch ─────────────────────────
(function initVideoLazy() {
  function loadVideo(card) {
    const video = card.querySelector('video[data-src]');
    if (!video) return;
    const src = video.dataset.src;
    if (src && !video.src) {
      video.src = src;
      video.load();
      video.play().catch(() => {});
      video.removeAttribute('data-src');
    }
  }
  document.addEventListener('mouseover', e => {
    const card = e.target.closest('.project-card');
    if (card) loadVideo(card);
  });
  document.addEventListener('touchstart', e => {
    const card = e.target.closest('.project-card');
    if (card) loadVideo(card);
  }, { passive: true });
})();

// ── Smooth anchor scroll ──────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Active section highlight in skills/filters on scroll ─────
(function initActiveSection() {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  });
})();
