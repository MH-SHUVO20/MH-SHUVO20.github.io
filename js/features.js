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
    el.textContent = '\u2026'; // show loading state immediately
    // threshold: 0.1 — fire as soon as any part of the footer is visible
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        animNum(el, count, 1200);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}

// ── 2. GitHub Live Stats ──────────────────────────────────────
// Fetches real public repo count, star count and followers from
// the GitHub REST API — no auth token required for public data.
var GH_SELECTORS = ['[data-gh-repos]', '[data-gh-stars]', '[data-gh-followers]'];

function initGitHubStats() {
  var GH_API = 'https://api.github.com';
  var GH_HEADERS = { 'Accept': 'application/vnd.github+json' };

  // Show a loading ellipsis while we wait
  GH_SELECTORS.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.textContent = '\u2026';
    });
  });

  function safeFetch(url) {
    return fetch(url, { headers: GH_HEADERS }).then(function(r) {
      if (!r.ok) throw new Error('GitHub API ' + r.status);
      return r.json();
    });
  }

  function showFallback() {
    GH_SELECTORS.forEach(function(sel) {
      document.querySelectorAll(sel).forEach(function(el) {
        el.textContent = '\u2014'; // em-dash
      });
    });
  }

  Promise.all([
    safeFetch(GH_API + '/users/MH-SHUVO20'),
    safeFetch(GH_API + '/users/MH-SHUVO20/repos?per_page=100&sort=updated')
  ]).then(function(results) {
    var user  = results[0];
    var repos = results[1];

    // Validate we got a real user object (not a rate-limit error body)
    if (!user || !user.login) { showFallback(); return; }

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
  }).catch(showFallback);
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
  setTimeout(function() { el.classList.add('wpm-visible'); }, 3000);
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

// ── 6. Time-Based Greeting ───────────────────────────────────
function initGreeting() {
  var toast   = document.getElementById('greetingToast');
  var textEl  = document.getElementById('greetingText');
  var iconEl  = document.getElementById('greetingIcon');
  var closeBtn = document.getElementById('greetingClose');
  if (!toast || !textEl) return;

  var h = new Date().getHours();
  var greeting, icon;
  if (h >= 5 && h < 12)  { greeting = 'Good Morning!';   icon = '☀️'; }
  else if (h >= 12 && h < 17) { greeting = 'Good Afternoon!'; icon = '🌤️'; }
  else if (h >= 17 && h < 21) { greeting = 'Good Evening!';   icon = '🌆'; }
  else                         { greeting = 'Good Night!';     icon = '🌙'; }

  textEl.textContent = greeting;
  iconEl.textContent = icon;

  // Show after preloader fades (~2.5s)
  setTimeout(function() {
    toast.classList.add('greeting-show');
    // Auto-dismiss after 5s
    setTimeout(function() { dismissGreeting(); }, 5000);
  }, 2500);

  function dismissGreeting() {
    toast.classList.remove('greeting-show');
    toast.classList.add('greeting-hide');
  }
  if (closeBtn) closeBtn.addEventListener('click', dismissGreeting);
}
// ── 7. Live Clock & Topbar Greeting ───────────────────────────────
function initLiveClock() {
  var timeEl  = document.getElementById('topbarTime');
  var dateEl  = document.getElementById('topbarDate');
  var greetEl = document.getElementById('topbarGreeting');

  function tick() {
    var now  = new Date();
    var h    = now.getHours();
    var m    = now.getMinutes();
    var s    = now.getSeconds();
    var pad  = function(n) { return String(n).padStart(2, '0'); };
    var ampm = h >= 12 ? 'PM' : 'AM';
    var h12  = h % 12 || 12;

    // Topbar clock (seconds on desktop, HH:MM on mobile)
    if (timeEl) {
      timeEl.textContent = (window.innerWidth <= 480)
        ? pad(h12) + ':' + pad(m) + ' ' + ampm
        : pad(h12) + ':' + pad(m) + ':' + pad(s) + ' ' + ampm;
    }

    // Hero local time badge
    var heroTimeEl = document.getElementById('heroLocalTime');
    if (heroTimeEl) {
      heroTimeEl.textContent = pad(h12) + ':' + pad(m) + ' ' + ampm;
    }

    // Date strip
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
      });
    }

    // Topbar greeting (re-evaluated on every tick so it updates at midnight)
    if (greetEl) {
      var greeting =
        (h >= 5  && h < 12) ? '\u2600\ufe0f Good Morning'    :
        (h >= 12 && h < 17) ? '\ud83c\udf24\ufe0f Good Afternoon' :
        (h >= 17 && h < 21) ? '\ud83c\udf06 Good Evening'    :
                               '\ud83c\udf19 Good Night';
      greetEl.textContent = greeting;
    }
  }

  tick();                       // run immediately — no visible flash
  setInterval(tick, 1000);
}
// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initLiveClock();      // first — no deps, updates clock immediately
  initVisitCounter();
  initGitHubStats();
  initLastUpdated();
  initTypingWpm();
  // Contact copy buttons run after components.js renders the DOM
  setTimeout(initCopyButtons, 800);
});
