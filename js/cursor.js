/* ============================================================
   cursor.js — Custom cursor logic
   ============================================================ */

(function () {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');
  if (!dot || !outline) return;

  let mx = 0, my = 0, ox = 0, oy = 0;
  let raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animate() {
    ox += (mx - ox) * 0.14;
    oy += (my - oy) * 0.14;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    outline.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
    raf = requestAnimationFrame(animate);
  }
  animate();

  // Hover effect
  const hoverEls = 'a, button, .skill-card, .project-card, .paper-card, .info-card, .edu-item, .contact-link-item, .proj-filter, .skill-tab, .chip';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) outline.classList.add('hovering');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) outline.classList.remove('hovering');
  });

  // Hide on leave / show on enter
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    outline.style.opacity = '1';
  });
})();
