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
      ? `<a href="${p.link}" target="_blank" class="paper-link"><i class="fas fa-external-link-alt"></i> IEEE Xplore</a>`
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
    const badgeClass = isUnderReview ? 'badge-upcoming badge-upcoming--inline' : 'badge-upcoming badge-upcoming--inline badge-upcoming--amber';
    const badgeLabel = isUnderReview ? 'Under Review' : 'Coming Soon';
    card.innerHTML = `
      <div class="paper-idx">${p.num}</div>
      <div class="paper-body">
        <h3>${p.title}</h3>
        <div class="paper-meta">
          <span class="paper-venue">${p.venue}</span>
          <span class="${badgeClass}">${badgeLabel}</span>
        </div>
      </div>
      <span class="coming-soon-btn" aria-disabled="true">Coming Soon</span>
    `;
    list.appendChild(card);
  });
}
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !PORTFOLIO_DATA) return;
  grid.innerHTML = '';

  PORTFOLIO_DATA.projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.cat = p.cat;
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', String(i % 3 * 80));

    // Media section
    // Availability badge (Part 3 — card hover indicator)
    let availBadge = '';
    if (p.video) {
      availBadge = '<div class="proj-avail-badge proj-avail-badge--demo"><span class="pab-dot"></span> Demo</div>';
    } else if (p.demo) {
      availBadge = '<div class="proj-avail-badge proj-avail-badge--live">🚀 Live</div>';
    } else if (p.github) {
      availBadge = '<div class="proj-avail-badge proj-avail-badge--github">⭐ Code</div>';
    }

    let mediaHTML;
    if (p.video) {
      if (p.video.includes('youtube') || p.video.includes('youtu.be')) {
        const videoId = p.video.split('v=')[1]?.split('&')[0] || p.video.split('/').pop();
        mediaHTML = `
          <div class="project-media">
            <div class="project-thumb" style="overflow:hidden">
              <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${p.title}" class="project-thumb" onerror="this.parentElement.innerHTML='<div class=project-media-placeholder>${p.emoji}</div>'">
            </div>
            <div class="project-play-btn">
              <div class="play-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="project-overlay"></div>
            <span class="project-cat-chip">${p.catLabel}</span>
            ${availBadge}
          </div>`;
      } else if (p.video.includes('drive.google.com')) {
        const thumbInner = p.image
          ? `<img src="${p.image}" alt="${p.title}" class="project-thumb" onerror="this.style.display='none'">`
          : `<div class="project-media-placeholder">${p.emoji}</div>`;
        mediaHTML = `
          <div class="project-media">
            <div class="project-thumb" style="overflow:hidden">${thumbInner}</div>
            <div class="project-play-btn">
              <div class="play-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="project-overlay"></div>
            <span class="project-cat-chip">${p.catLabel}</span>
            ${availBadge}
          </div>`;
      } else {
        mediaHTML = `
          <div class="project-media">
            <video class="project-thumb" muted loop preload="none" data-src="${p.video}">
              <source src="${p.video}" type="video/mp4">
            </video>
            <div class="project-play-btn">
              <div class="play-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="project-overlay"></div>
            <span class="project-cat-chip">${p.catLabel}</span>
            ${availBadge}
          </div>`;
      }
    } else if (p.image) {
      mediaHTML = `
        <div class="project-media">
          <img src="${p.image}" alt="${p.title}" class="project-thumb" onerror="this.parentElement.innerHTML='<div class=project-media-placeholder>${p.emoji}</div><div class=project-overlay></div><span class=project-cat-chip>${p.catLabel}</span>'">
          <div class="project-overlay"></div>
          <span class="project-cat-chip">${p.catLabel}</span>
          ${availBadge}
        </div>`;
    } else {
      mediaHTML = `
        <div class="project-media">
          <div class="project-media-placeholder">${p.emoji}</div>
          <div class="project-overlay"></div>
          <span class="project-cat-chip">${p.catLabel}</span>
          ${availBadge}
        </div>`;
    }

    const stackHTML = p.stack.map(s => `<span class="stack-tag">${s}</span>`).join('');
    const footerHTML = `
      <div class="project-footer">
        <a href="#" class="proj-btn primary open-project-modal" data-id="${p.id}">
          <i class="fas fa-expand-alt"></i> Details
        </a>
        ${p.github ? `<a href="${p.github}" target="_blank" class="proj-btn"><i class="fab fa-github"></i> Code</a>` : ''}
        ${p.demo ? `<a href="${p.demo}" target="_blank" class="proj-btn"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
      </div>`;

    card.innerHTML = `
      ${mediaHTML}
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-stack">${stackHTML}</div>
        ${footerHTML}
      </div>
    `;
    grid.appendChild(card);
  });

  // Project filters
  document.querySelectorAll('.proj-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.proj-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
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
      const a = document.createElement('a');
      a.href = c.href;
      a.className = 'contact-link-item';
      if (c.href.startsWith('http')) a.target = '_blank';
      a.setAttribute('data-aos', 'fade-right');
      a.innerHTML = `
        <div class="cli-icon"><i class="${c.icon}"></i></div>
        <div class="cli-body">
          <strong>${c.label}</strong>
          <span>${c.value}</span>
        </div>
        <button class="copy-btn" data-copy="${c.value}" title="Copy ${c.label}">
          <i class="fas fa-copy"></i>
        </button>
      `;
      linksContainer.appendChild(a);
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
        ${r.website ? `<br><a href="${r.website}" target="_blank" class="ref-email" style="margin-top:4px;display:inline-block">${r.website}</a>` : ''}
      `;
      refsContainer.appendChild(card);
    });
  }
}

// ── Video Facade ─────────────────────────────────────────────
function renderVideoFacade(videoUrl) {
  if (!videoUrl) return '';
  return `
    <div class="video-facade" data-src="${videoUrl}">
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
      mediaHTML = `<div class="pm-media"><img src="${project.image}" alt="${project.title}" class="pm-media-img" onerror="this.parentElement.innerHTML='<div class=pm-media-placeholder>${project.emoji}</div>'"></div>`;
    } else {
      mediaHTML = `<div class="pm-media"><div class="pm-media-placeholder">${project.emoji}</div></div>`;
    }

    const stackHTML = project.stack.map(s => `<span class="stack-tag">${s}</span>`).join('');
    const hlHTML = project.highlights.map(h => `<li>${h}</li>`).join('');

    // CTA links: primary = demo if exists, else github; secondary = the other
    let primaryLink = '', secondaryLink = '';
    if (project.demo) {
      primaryLink = `<a href="${project.demo}" target="_blank" class="pm-link primary"><i class="fas fa-external-link-alt"></i> Live Demo →</a>`;
      if (project.github) secondaryLink = `<a href="${project.github}" target="_blank" class="pm-link ghost"><i class="fab fa-github"></i> View Code</a>`;
    } else if (project.github) {
      primaryLink = `<a href="${project.github}" target="_blank" class="pm-link primary"><i class="fab fa-github"></i> View on GitHub →</a>`;
    }

    content.innerHTML = `
      ${mediaHTML}
      <div class="pm-title">${project.title}</div>
      <div class="pm-stack">${stackHTML}</div>
      <p class="pm-description">${project.fullDesc || project.description}</p>
      <div class="pm-highlights">
        <h4>Key Highlights</h4>
        <ul>${hlHTML}</ul>
      </div>
      <div class="pm-links">
        ${primaryLink}
        ${secondaryLink}
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Video facade: load iframe on click
  document.addEventListener('click', e => {
    const facade = e.target.closest('.video-facade');
    if (!facade) return;
    const src = facade.dataset.src;
    facade.outerHTML = `
      <div class="video-frame-wrap">
        <iframe src="${src}"
          width="100%" style="aspect-ratio:16/9; border:none; border-radius:8px;"
          allow="autoplay; encrypted-media" allowfullscreen loading="lazy">
        </iframe>
        <a href="${src.replace('/preview', '')}" target="_blank" class="video-drive-fallback">
          <i class="fas fa-external-link-alt"></i> Open in Google Drive
        </a>
      </div>
    `;
  });

  closeBtn?.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeProjectModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProjectModal(); });

  function closeProjectModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
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
  document.addEventListener('click', e => {
    const media = e.target.closest('.project-media');
    if (!media) return;
    // Don't double-fire if the details button itself was clicked
    if (e.target.closest('.open-project-modal')) return;
    const card = media.closest('.project-card');
    if (!card) return;
    const btn = card.querySelector('.open-project-modal');
    if (btn) btn.click();
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
