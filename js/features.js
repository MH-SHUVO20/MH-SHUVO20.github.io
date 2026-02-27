/* ============================================================
   features.js — Visit counter · GitHub stats · Copy buttons
                  Typing WPM · Last updated badge
   ============================================================ */

// ── Animated number counting utility ─────────────────────────
function animNum(el, to, duration) {
  duration = duration || 1200;
  const start = performance.now();
  (function step(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(to * eased).toLocaleString();
    if (t < 1) requestAnimationFrame(step);
  })(start);
}

// ── 1. Visit Counter ─────────────────────────────────────────
// Session-aware: counts once per browser tab session, persists
// across sessions in localStorage. Not a server-side global but
// gives the user a satisfying "your visits" counter.
function initVisitCounter() {
  if (!sessionStorage.getItem('_vs')) {
    var v = parseInt(localStorage.getItem('_vc') || '0') + 1;
    localStorage.setItem('_vc', v);
    sessionStorage.setItem('_vs', '1');
  }
  var count = parseInt(localStorage.getItem('_vc') || '1');
  document.querySelectorAll('[data-visit-count]').forEach(function(el) {
    // Animate when element enters the viewport
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        animNum(el, count, 1200);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

// ── 2. GitHub Live Stats ──────────────────────────────────────
// Fetches real public repo count, star count and followers from
// the GitHub REST API — no auth token required for public data.
function initGitHubStats() {
  Promise.all([
    fetch('https://api.github.com/users/MH-SHUVO20').then(function(r) { return r.json(); }),
    fetch('https://api.github.com/users/MH-SHUVO20/repos?per_page=100').then(function(r) { return r.json(); })
  ]).then(function(results) {
    var user  = results[0];
    var repos = results[1];
    if (!user || !user.login) return;

    var stars = Array.isArray(repos)
      ? repos.reduce(function(s, r) { return s + (r.stargazers_count || 0); }, 0)
      : 0;

    var map = {
      '[data-gh-repos]':     user.public_repos || 0,
      '[data-gh-stars]':     stars,
      '[data-gh-followers]': user.followers    || 0
    };

    Object.keys(map).forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        animNum(el, map[sel], 1000);
      });
    });
  }).catch(function() { /* fail silently if API rate-limited */ });
}

// ── 3. Copy to Clipboard ──────────────────────────────────────
// Attach to any element with [data-copy="value"].
// Shows a ✓ check icon for 2 seconds after copying.
function initCopyButtons() {
  document.querySelectorAll('[data-copy]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var text = btn.getAttribute('data-copy');
      var icon = btn.querySelector('i');

      var showSuccess = function() {
        if (icon) {
          var prev = icon.className;
          icon.className = 'fas fa-check';
          btn.classList.add('copy-success');
          setTimeout(function() {
            icon.className = prev;
            btn.classList.remove('copy-success');
          }, 2000);
        }
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showSuccess);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showSuccess();
      }
    });
  });
}

// ── 4. Typing WPM Indicator ───────────────────────────────────
// The typewriter in animations.js uses 80ms per character.
// Standard WPM = chars per minute ÷ 5.
// 1000ms ÷ 80ms = 12.5 chars/sec × 60 = 750 chars/min ÷ 5 = 150 WPM
function initTypingWpm() {
  var el = document.getElementById('typingWpm');
  if (!el) return;
  var CHAR_DELAY = 80; // ms per character (matches animations.js)
  var wpm = Math.round(60000 / (CHAR_DELAY * 5));
  var valEl = el.querySelector('.wpm-value');
  if (valEl) valEl.textContent = wpm;
  // Fade in after the first typed word appears (~2.4s after page load)
  setTimeout(function() { el.classList.add('wpm-visible'); }, 2400);
}

// ── 5. Last Updated Badge ─────────────────────────────────────
// document.lastModified reflects the server's Last-Modified header
// which GitHub Pages sets to the deployment date.
function initLastUpdated() {
  var el = document.getElementById('lastUpdated');
  if (!el) return;
  var d = new Date(document.lastModified);
  var valid = d && d.getFullYear() > 2020;
  var display = (valid ? d : new Date()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  el.textContent = display;
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initVisitCounter();
  initGitHubStats();
  initLastUpdated();
  initTypingWpm();
  // Contact copy buttons run after components.js renders the DOM
  setTimeout(initCopyButtons, 800);
});
