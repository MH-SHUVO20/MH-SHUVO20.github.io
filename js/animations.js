/* ============================================================
   animations.js — GSAP + scroll animations + typing effect
   ============================================================ */

// ── Typing effect ────────────────────────────────────────────
(function initTyping() {
  const el = document.getElementById('typedText');
  if (!el || !PORTFOLIO_DATA) return;
  const strings = PORTFOLIO_DATA.personal.typedStrings;
  let si = 0, ci = 0, deleting = false;

  function type() {
    const current = strings[si];
    el.textContent = deleting
      ? current.substring(0, ci--)
      : current.substring(0, ci++);

    let delay = deleting ? 40 : 80;
    if (!deleting && ci > current.length) { deleting = true; delay = 1800; }
    else if (deleting && ci < 0) {
      deleting = false; ci = 0;
      si = (si + 1) % strings.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 1200);
})();

// ── Navbar scroll effects ────────────────────────────────────
(function initNavbar() {
  const nav = document.getElementById('navbar');
  const progress = document.getElementById('navProgress');
  const links = document.querySelectorAll('.nav-link[data-section]');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;

    // Scrolled class
    nav.classList.toggle('scrolled', scrolled > 60);

    // Progress bar
    if (progress) progress.style.width = (scrolled / total * 100) + '%';

    // Active link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (scrolled >= s.offsetTop - 120) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.dataset.section === current);
    });

    // Back to top
    const btn = document.querySelector('.back-top');
    if (btn) btn.classList.toggle('visible', scrolled > 400);
  });
})();

// ── Counter animation ────────────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Skill proficiency bars ────────────────────────────────────
function initSkillBars() {
  const container = document.getElementById('skillBars');
  if (!container || !PORTFOLIO_DATA) return;

  PORTFOLIO_DATA.proficiency.forEach(({ name, pct }) => {
    const item = document.createElement('div');
    item.className = 'bar-item';
    item.innerHTML = `
      <div class="bar-header">
        <span class="bar-name">${name}</span>
        <span class="bar-pct">${pct}%</span>
      </div>
      <div class="bar-track"><div class="bar-fill" data-pct="${pct}"></div></div>
    `;
    container.appendChild(item);
  });

  // Observe and animate
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach(fill => {
          fill.style.width = fill.dataset.pct + '%';
        });
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
}

// ── Counter chips ────────────────────────────────────────────
function initCounterChips() {
  const chips = document.querySelectorAll('.chip-num[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.count));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  chips.forEach(c => observer.observe(c));
}

// ── GSAP scroll animations ────────────────────────────────────
function initGSAP() {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Stagger fade in for grids
  const staggerTargets = ['.skills-grid .skill-card', '.projects-grid .project-card'];
  staggerTargets.forEach(selector => {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    gsap.from(els, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: els[0].closest('section') || els[0],
        start: 'top 80%',
      }
    });
  });

  // Paper cards slide in
  gsap.from('.paper-card', {
    opacity: 0, x: -30, stagger: 0.12, duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#research', start: 'top 75%' }
  });

  // Section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: title, start: 'top 85%' }
    });
  });
}

// ── Tilt effect on project cards ────────────────────────────
function initTilt() {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;
      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Init all when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSkillBars();
  initCounterChips();
  initGSAP();
  setTimeout(initTilt, 1500); // wait for cards to render
});
