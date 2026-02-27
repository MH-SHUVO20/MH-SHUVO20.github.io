/* ============================================================
   canvas.js — Animated neural network background
   ============================================================ */

(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], mouse = { x: -9999, y: -9999 };
  const isMobile = window.matchMedia('(max-width: 768px)').matches
    || window.matchMedia('(pointer: coarse)').matches;
  const NODE_COUNT = isMobile ? 25 : 70;
  const MAX_DIST = isMobile ? 100 : 160;
  const isDark = () => !document.documentElement.getAttribute('data-theme');

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // mouse repel
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 100) {
        this.vx += (dx / d) * 0.06;
        this.vy += (dy / d) * 0.06;
      }
      // speed limit
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 1.2) { this.vx *= 0.98; this.vy *= 0.98; }
      // bounce
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      const dark = isDark();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? `rgba(0, 212, 255, ${this.alpha})`
        : `rgba(0, 102, 204, ${this.alpha * 0.7})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const dark = isDark();
    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * (dark ? 0.18 : 0.1);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = dark
            ? `rgba(0, 212, 255, ${alpha})`
            : `rgba(0, 102, 204, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    // Mouse connections
    for (let n of nodes) {
      const dx = n.x - mouse.x;
      const dy = n.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST * 1.4) {
        const alpha = (1 - dist / (MAX_DIST * 1.4)) * (dark ? 0.35 : 0.2);
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = dark
          ? `rgba(0, 212, 255, ${alpha})`
          : `rgba(0, 102, 204, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    // Draw nodes
    nodes.forEach(n => { n.update(); n.draw(); });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); nodes.forEach(n => n.reset()); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  init();
  draw();
})();
