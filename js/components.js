/* ============================================================
   components.js — Dynamic component rendering from data.js
   ============================================================ */

// ── Skills Grid ──────────────────────────────────────────────
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid || !PORTFOLIO_DATA) return;
  grid.innerHTML = '';

  PORTFOLIO_DATA.skills.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.dataset.cat = s.cat;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(i % 3 * 100));
    card.innerHTML = `
      <div class="sc-icon">${s.icon}</div>
      <div class="sc-cat">${s.category}</div>
      <div class="sc-title">${s.title}</div>
      <div class="sc-tags">
        ${s.tags.map(t => `<span class="sc-tag">${t}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });

  // Filter tabs
  document.querySelectorAll('.skill-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.skill-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('.skill-card').forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

// ── Research List ─────────────────────────────────────────────
function renderResearch() {
  const list = document.getElementById('researchList');
  if (!list || !PORTFOLIO_DATA) return;
  list.innerHTML = '';

  PORTFOLIO_DATA.research.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'paper-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(i * 80));
    const badgesHTML = p.badges.map(b => {
      const cls = ['Published','CORE RANKED','First Author'].includes(b) ? 'paper-badge' : 'paper-badge review';
      return `<span class="${cls}">${b}</span>`;
    }).join('');
    const linkHTML = p.link
      ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="paper-link"><i class="fas fa-external-link-alt"></i> IEEE Xplore</a>`
      : `<span class="paper-link disabled"><i class="fas fa-clock"></i> Processing</span>`;

    card.innerHTML = `
      <div class="paper-idx">${p.num}</div>
      <div class="paper-body">
        <h3>${p.title}</h3>
        <div class="paper-meta">
          <span class="paper-venue">${p.venue}</span>
          ${badgesHTML}
          ${p.doi ? `<span class="paper-badge review">DOI: ${p.doi}</span>` : ''}
        </div>
      </div>
      ${linkHTML}
    `;
    list.appendChild(card);
  });
}

// ── Upcoming Research ─────────────────────────────────────────
function renderUpcomingResearch() {
  const list = document.getElementById('upcomingResearchList');
  if (!list || !PORTFOLIO_DATA || !PORTFOLIO_DATA.upcomingResearch) return;
  list.innerHTML = '';

  PORTFOLIO_DATA.upcomingResearch.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'paper-card paper-card--upcoming';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(i * 80));
    const isUnderReview = p.status === 'under-review';
    const isAccepted = p.status === 'accepted';
    const badgeClass = isAccepted
      ? 'badge-upcoming badge-upcoming--inline'
      : isUnderReview
        ? 'badge-upcoming badge-upcoming--inline'
        : 'badge-upcoming badge-upcoming--inline badge-upcoming--amber';
    const badgeLabel = isAccepted ? 'Accepted' : isUnderReview ? 'Under Review' : 'Coming Soon';
    const extraBadgesHTML = (p.badges || []).map(b => `<span class="paper-badge">${b}</span>`).join('');
    const actionLabel = p.ctaLabel || (isAccepted ? 'Accepted Paper' : 'Coming Soon');
    card.innerHTML = `
      <div class="paper-idx">${p.num}</div>
      <div class="paper-body">
        <h3>${p.title}</h3>
        <div class="paper-meta">
          <span class="paper-venue">${p.venue}</span>
          <span class="${badgeClass}">${badgeLabel}</span>
          ${extraBadgesHTML}
        </div>
      </div>
      <span class="coming-soon-btn" aria-disabled="true">${actionLabel}</span>
    `;
    list.appendChild(card);
  });
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));
}

function getYouTubeId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) return parsed.pathname.split('/').filter(Boolean)[0] || '';
    if (parsed.searchParams.get('v')) return parsed.searchParams.get('v');
    const parts = parsed.pathname.split('/').filter(Boolean);
    const marker = parts.findIndex(part => ['embed', 'shorts', 'live'].includes(part));
    return marker >= 0 ? parts[marker + 1] || '' : '';
  } catch {
    return '';
  }
}

function getProjectBadge(project) {
  if (project.featured && project.featuredLabel) {
    return { label: project.featuredLabel, cls: 'proj-avail-badge--featured', icon: 'fas fa-star' };
  }
  if (project.video) return { label: 'Demo', cls: 'proj-avail-badge--demo', icon: 'fas fa-play' };
  if (project.demo) return { label: 'Live', cls: 'proj-avail-badge--live', icon: 'fas fa-rocket' };
  if (project.github) return { label: 'Code', cls: 'proj-avail-badge--github', icon: 'fab fa-github' };
  return { label: 'Case Study', cls: 'proj-avail-badge--case', icon: 'fas fa-file-lines' };
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !PORTFOLIO_DATA) return;
  grid.innerHTML = '';

  const projects = [...PORTFOLIO_DATA.projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `project-card${p.featured ? ' project-card--featured' : ''}`;
    card.dataset.cat = p.cat;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(i % 3 * 80));

    const title = escapeHTML(p.title);
    const catLabel = escapeHTML(p.catLabel);
    const emoji = escapeHTML(p.emoji || 'AI');
    const badge = getProjectBadge(p);
    const availBadge = `
      <div class="proj-avail-badge ${badge.cls}">
        <i class="${badge.icon}"></i>
        <span>${escapeHTML(badge.label)}</span>
      </div>`;

    let mediaHTML;
    if (p.video) {
      const youtubeId = getYouTubeId(p.video);
      if (youtubeId) {
        mediaHTML = `
          <div class="project-media" role="button" tabindex="0" aria-label="Open ${title} project details">
            <img src="https://img.youtube.com/vi/${escapeHTML(youtubeId)}/hqdefault.jpg" alt="${title}" class="project-thumb" loading="lazy" decoding="async">
            <div class="project-media-placeholder" hidden>${emoji}</div>
            <div class="project-play-btn">
              <div class="play-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="project-overlay"></div>
            <span class="project-cat-chip">${catLabel}</span>
            ${availBadge}
          </div>`;
      } else if (p.video.includes('drive.google.com')) {
        const thumbInner = p.image
          ? `<img src="${escapeHTML(p.image)}" alt="${title}" class="project-thumb" loading="lazy" decoding="async"><div class="project-media-placeholder" hidden>${emoji}</div>`
          : `<div class="project-media-placeholder">${emoji}</div>`;
        mediaHTML = `
          <div class="project-media" role="button" tabindex="0" aria-label="Open ${title} project details">
            ${thumbInner}
            <div class="project-play-btn">
              <div class="play-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="project-overlay"></div>
            <span class="project-cat-chip">${catLabel}</span>
            ${availBadge}
          </div>`;
      } else {
        mediaHTML = `
          <div class="project-media" role="button" tabindex="0" aria-label="Open ${title} project details">
            <video class="project-thumb" muted loop playsinline preload="none" data-src="${escapeHTML(p.video)}"></video>
            <div class="project-play-btn">
              <div class="play-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="project-overlay"></div>
            <span class="project-cat-chip">${catLabel}</span>
            ${availBadge}
          </div>`;
      }
    } else if (p.image) {
      mediaHTML = `
        <div class="project-media" role="button" tabindex="0" aria-label="Open ${title} project details">
          <img src="${escapeHTML(p.image)}" alt="${title}" class="project-thumb" loading="lazy" decoding="async">
          <div class="project-media-placeholder" hidden>${emoji}</div>
          <div class="project-overlay"></div>
          <span class="project-cat-chip">${catLabel}</span>
          ${availBadge}
        </div>`;
    } else {
      mediaHTML = `
        <div class="project-media" role="button" tabindex="0" aria-label="Open ${title} project details">
          <div class="project-media-placeholder">${emoji}</div>
          <div class="project-overlay"></div>
          <span class="project-cat-chip">${catLabel}</span>
          ${availBadge}
        </div>`;
    }

    const stackHTML = p.stack.map(s => `<span class="stack-tag">${escapeHTML(s)}</span>`).join('');
    const kickerHTML = p.kicker ? `<div class="project-kicker">${escapeHTML(p.kicker)}</div>` : '';
    const impactHTML = p.impact ? `<div class="project-impact">${escapeHTML(p.impact)}</div>` : '';
    const docsHTML = p.docs && p.docs !== p.github
      ? `<a href="${escapeHTML(p.docs)}" target="_blank" rel="noopener noreferrer" class="proj-btn"><i class="fas fa-book-open"></i> Docs</a>`
      : '';
    const footerHTML = `
      <div class="project-footer">
        <button type="button" class="proj-btn primary open-project-modal" data-id="${escapeHTML(p.id)}">
          <i class="fas fa-expand-alt"></i> Details
        </button>
        ${p.github ? `<a href="${escapeHTML(p.github)}" target="_blank" rel="noopener noreferrer" class="proj-btn"><i class="fab fa-github"></i> Code</a>` : ''}
        ${p.demo ? `<a href="${escapeHTML(p.demo)}" target="_blank" rel="noopener noreferrer" class="proj-btn"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
        ${docsHTML}
      </div>`;

    card.innerHTML = `
      ${mediaHTML}
      <div class="project-body">
        ${kickerHTML}
        <h3>${title}</h3>
        <p>${escapeHTML(p.description)}</p>
        ${impactHTML}
        <div class="project-stack">${stackHTML}</div>
        ${footerHTML}
      </div>
    `;
    grid.appendChild(card);

    card.querySelectorAll('img.project-thumb').forEach(img => {
      img.addEventListener('error', () => {
        img.hidden = true;
        const fallback = img.parentElement.querySelector('.project-media-placeholder');
        if (fallback) fallback.hidden = false;
      }, { once: true });
    });
  });

  // Project filters
  document.querySelectorAll('.proj-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.proj-filter').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.project-card').forEach(c => {
        c.classList.toggle('hidden', cat !== 'all' && c.dataset.cat !== cat);
      });
    });
  });
}

// ── Education Timeline ────────────────────────────────────────
function renderEducation() {
  const timeline = document.getElementById('eduTimeline');
  if (!timeline || !PORTFOLIO_DATA) return;
  timeline.innerHTML = '';

  PORTFOLIO_DATA.education.forEach((e, i) => {
    const item = document.createElement('div');
    item.className = 'edu-item';
    item.setAttribute('data-aos', 'fade-right');
    item.setAttribute('data-aos-delay', String(i * 100));
    const coursesHTML = (e.courses && e.courses.length) ? `
      <div class="edu-courses">
        ${e.courses.map(c => `<span class="course-tag">${c}</span>`).join('')}
      </div>` : '';
    const descHTML = e.desc ? `<p class="edu-desc">${e.desc}</p>` : '';
    const majorHTML = (e.major && e.major.trim()) ? `<div class="edu-institution" style="color:var(--accent);font-size:12px;margin-bottom:4px">${e.major}</div>` : '';

    item.innerHTML = `
      <div class="edu-dot"></div>
      <div class="edu-year">${e.year}</div>
      <h3>${e.degree}</h3>
      ${majorHTML}
      <div class="edu-institution">${e.institution}</div>
      ${e.gpa ? `<div class="edu-gpa">${e.gpa}</div>` : ''}
      ${descHTML}
      ${coursesHTML}
    `;
    timeline.appendChild(item);
  });
}

// ── Experience Grid ───────────────────────────────────────────
function renderExperience() {
  const grid = document.getElementById('expGrid');
  if (!grid || !PORTFOLIO_DATA || !PORTFOLIO_DATA.experience) return;
  grid.innerHTML = '';

  PORTFOLIO_DATA.experience.forEach((exp, i) => {
    const card = document.createElement('div');
    card.className = 'exp-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(i * 100));

    const hlHTML = exp.highlights.map(h => `<li>${h}</li>`).join('');
    card.innerHTML = `
      <div class="exp-icon ${exp.colorClass}">
        <i class="${exp.icon}"></i>
      </div>
      <div class="exp-header">
        <h3 class="exp-role">${exp.role}</h3>
        <span class="exp-type">${exp.type}</span>
      </div>
      <div class="exp-org">${exp.org}</div>
      <div class="exp-period"><i class="fas fa-calendar-alt"></i> ${exp.period}</div>
      <p class="exp-desc">${exp.desc}</p>
      <ul class="exp-highlights">${hlHTML}</ul>
    `;
    grid.appendChild(card);
  });
}

// ── Contact Links ─────────────────────────────────────────────
function renderContact() {
  const linksContainer = document.getElementById('contactLinks');
  if (linksContainer && PORTFOLIO_DATA) {
    PORTFOLIO_DATA.contactLinks.forEach(c => {
      const item = document.createElement('div');
      item.className = 'contact-link-item';
      item.setAttribute('data-aos', 'fade-right');
      const externalAttrs = c.href.startsWith('http')
        ? ' target="_blank" rel="noopener noreferrer"'
        : '';
      const copyValue = String(c.value).replace(/"/g, '&quot;');
      item.innerHTML = `
        <a href="${c.href}" class="contact-link-main"${externalAttrs}>
          <div class="cli-icon"><i class="${c.icon}"></i></div>
          <div class="cli-body">
            <strong>${c.label}</strong>
            <span>${c.value}</span>
          </div>
        </a>
        <button type="button" class="copy-btn" data-copy="${copyValue}" title="Copy ${c.label}" aria-label="Copy ${c.label}">
          <i class="fas fa-copy"></i>
        </button>
      `;
      linksContainer.appendChild(item);
    });
  }

  const refsContainer = document.getElementById('refCards');
  if (refsContainer && PORTFOLIO_DATA) {
    PORTFOLIO_DATA.references.forEach(r => {
      const card = document.createElement('div');
      card.className = 'ref-card';
      card.innerHTML = `
        <div class="ref-name">${r.name}</div>
        <div class="ref-title">${r.title}</div>
        <div class="ref-org">${r.org}</div>
        <a href="mailto:${r.email}" class="ref-email">${r.email}</a>
        ${r.website ? `<br><a href="${r.website}" target="_blank" rel="noopener noreferrer" class="ref-email" style="margin-top:4px;display:inline-block">${r.website}</a>` : ''}
      `;
      refsContainer.appendChild(card);
    });
  }
}

// ── Video Facade ─────────────────────────────────────────────
function renderVideoFacade(videoUrl) {
  if (!videoUrl) return '';
  return `
    <div class="video-facade" data-src="${escapeHTML(videoUrl)}">
      <div class="video-facade-inner">
        <div class="video-play-btn">
          <i class="fas fa-play"></i>
        </div>
        <p class="video-facade-label">Click to load demo video</p>
      </div>
    </div>
  `;
}

// ── Project Modal ─────────────────────────────────────────────
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const content = document.getElementById('projectModalContent');
  const closeBtn = document.getElementById('closeProjectModal');
  if (!modal) return;

  document.addEventListener('click', e => {
    const trigger = e.target.closest('.open-project-modal');
    if (!trigger) return;
    e.preventDefault();
    const id = trigger.dataset.id;
    const project = PORTFOLIO_DATA.projects.find(p => p.id === id);
    if (!project) return;

    // Build media
    let mediaHTML = '';
    if (project.video) {
      mediaHTML = `<div class="pm-media">${renderVideoFacade(project.video)}</div>`;
    } else if (project.image) {
      mediaHTML = `
        <div class="pm-media">
          <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" class="pm-media-img">
          <div class="pm-media-placeholder" hidden>${escapeHTML(project.emoji || 'AI')}</div>
        </div>`;
    } else {
      mediaHTML = `<div class="pm-media"><div class="pm-media-placeholder">${escapeHTML(project.emoji || 'AI')}</div></div>`;
    }

    const stackHTML = project.stack.map(s => `<span class="stack-tag">${escapeHTML(s)}</span>`).join('');
    const hlHTML = project.highlights.map(h => `<li>${escapeHTML(h)}</li>`).join('');

    const modalLinks = [];
    if (project.demo) {
      modalLinks.push(`<a href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer" class="pm-link primary"><i class="fas fa-external-link-alt"></i> Live Demo →</a>`);
    } else if (project.github) {
      modalLinks.push(`<a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer" class="pm-link primary"><i class="fab fa-github"></i> View on GitHub →</a>`);
    }
    if (project.github && project.demo) {
      modalLinks.push(`<a href="${escapeHTML(project.github)}" target="_blank" rel="noopener noreferrer" class="pm-link ghost"><i class="fab fa-github"></i> View Code</a>`);
    }
    if (project.docs && project.docs !== project.github) {
      modalLinks.push(`<a href="${escapeHTML(project.docs)}" target="_blank" rel="noopener noreferrer" class="pm-link ghost"><i class="fas fa-book-open"></i> Documentation</a>`);
    }

    content.innerHTML = `
      ${mediaHTML}
      <div class="pm-title">${escapeHTML(project.title)}</div>
      <div class="pm-stack">${stackHTML}</div>
      <p class="pm-description">${escapeHTML(project.fullDesc || project.description)}</p>
      <div class="pm-highlights">
        <h4>Key Highlights</h4>
        <ul>${hlHTML}</ul>
      </div>
      <div class="pm-links">
        ${modalLinks.join('')}
      </div>
    `;

    content.querySelectorAll('img.pm-media-img').forEach(img => {
      img.addEventListener('error', () => {
        img.hidden = true;
        const fallback = img.parentElement.querySelector('.pm-media-placeholder');
        if (fallback) fallback.hidden = false;
      }, { once: true });
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Video facade: load iframe on click
  document.addEventListener('click', e => {
    const facade = e.target.closest('.video-facade');
    if (!facade) return;
    const src = facade.dataset.src;
    const youtubeId = getYouTubeId(src);
    const isDriveVideo = src.includes('drive.google.com');
    const iframeSrc = youtubeId
      ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`
      : src;
    const fallbackUrl = isDriveVideo ? src.replace('/preview', '/view') : src;

    if (!youtubeId && !isDriveVideo) {
      facade.outerHTML = `
        <video class="video-local-player" src="${escapeHTML(src)}" controls autoplay playsinline></video>
      `;
      return;
    }

    const fallbackLink = isDriveVideo
      ? `<a href="${escapeHTML(fallbackUrl)}" target="_blank" rel="noopener noreferrer" class="video-drive-fallback">
          <i class="fas fa-external-link-alt"></i> Open in Google Drive
        </a>`
      : `<a href="${escapeHTML(fallbackUrl)}" target="_blank" rel="noopener noreferrer" class="video-drive-fallback">
          <i class="fas fa-external-link-alt"></i> Open video
        </a>`;

    facade.outerHTML = `
      <div class="video-frame-wrap">
        <iframe src="${escapeHTML(iframeSrc)}"
          title="Project demo video"
          allow="autoplay; encrypted-media; fullscreen"
          allowfullscreen>
        </iframe>
        ${fallbackLink}
      </div>
    `;
  });

  closeBtn?.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeProjectModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProjectModal(); });

  function closeProjectModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!modal.classList.contains('open') && content) content.innerHTML = '';
    }, 250);
  }
}

// ── Toast ─────────────────────────────────────────────────────
window.showToast = function(msg, type = 'info') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="toast-icon ${icons[type] || icons.info}"></i><span class="toast-msg">${msg}</span>`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
};

// ── Certificate Modal ────────────────────────────────────────
function initCertModal() {
  const modal = document.getElementById('certModal');
  const frame = document.getElementById('certModalFrame');
  const header = document.getElementById('certModalHeader');
  const closeBtn = document.getElementById('closeCertModal');
  if (!modal) return;

  document.addEventListener('click', e => {
    const trigger = e.target.closest('.open-cert-modal');
    if (!trigger) return;
    const file = trigger.dataset.file;
    const title = trigger.dataset.title;
    const issuer = trigger.dataset.issuer;
    const year = trigger.dataset.year;
    const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file);
    header.innerHTML = `
      <div class="cert-modal-title">${title}</div>
      <div class="cert-modal-meta"><i class="fas fa-building"></i> ${issuer} &nbsp;·&nbsp; <i class="fas fa-calendar-alt"></i> ${year}</div>
    `;
    if (isImage) {
      frame.style.display = 'none';
      let img = modal.querySelector('#certModalImg');
      if (!img) {
        img = document.createElement('img');
        img.id = 'certModalImg';
        img.className = 'cert-modal-img';
        frame.parentNode.insertBefore(img, frame);
      }
      img.src = file;
      img.style.display = 'block';
    } else {
      frame.style.display = 'block';
      const img = modal.querySelector('#certModalImg');
      if (img) img.style.display = 'none';
      frame.src = file;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', closeCertModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeCertModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCertModal(); });

  function closeCertModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      frame.src = '';
      const img = modal.querySelector('#certModalImg');
      if (img) { img.src = ''; img.style.display = 'none'; }
      frame.style.display = 'block';
    }, 300);
  }
}

// ── Certifications Grid ───────────────────────────────────────
function renderCerts() {
  const grid = document.getElementById('certsGrid');
  if (!grid || !PORTFOLIO_DATA || !PORTFOLIO_DATA.certs) return;
  grid.innerHTML = '';

  PORTFOLIO_DATA.certs.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(i % 3 * 100));
    card.innerHTML = `
      <div class="cert-icon-wrap ${c.color}">
        <i class="${c.icon}"></i>
      </div>
      <div class="cert-body">
        <span class="cert-category">${c.category}</span>
        <h3 class="cert-title">${c.title}</h3>
        <p class="cert-issuer"><i class="fas fa-building"></i> ${c.issuer}</p>
        <p class="cert-year"><i class="fas fa-calendar-alt"></i> ${c.year}</p>
      </div>
      <button class="cert-view-btn open-cert-modal" data-file="${c.file}" data-title="${c.title}" data-issuer="${c.issuer}" data-year="${c.year}">
        <i class="fas fa-expand-alt"></i> View
      </button>
    `;
    grid.appendChild(card);
  });
}

// ── Project card media click → open modal ────────────────────
function initProjectMediaClick() {
  function openProject(media) {
    const card = media.closest('.project-card');
    if (!card) return;
    const btn = card.querySelector('.open-project-modal');
    if (btn) btn.click();
  }

  document.addEventListener('click', e => {
    const media = e.target.closest('.project-media');
    if (!media) return;
    // Don't double-fire if the details button itself was clicked
    if (e.target.closest('.open-project-modal')) return;
    openProject(media);
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const media = e.target.closest('.project-media');
    if (!media) return;
    e.preventDefault();
    openProject(media);
  });
}

// Init all
document.addEventListener('DOMContentLoaded', () => {
  renderSkills();
  renderResearch();
  renderUpcomingResearch();
  renderProjects();
  renderEducation();
  renderExperience();
  renderCerts();
  renderContact();
  initProjectModal();
  initCertModal();
  initProjectMediaClick();
});
