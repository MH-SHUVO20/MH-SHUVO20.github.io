/* ============================================================
   canvas.js -- Deep Space Neural Network background (optimised)
   ============================================================ */

(function () {
  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H, nodes = [];
  var mouse = { x: -9999, y: -9999, on: false };
  var t = 0;
  var darkCache = true; /* cached once per frame — never read DOM per-node */

  var isMobile = window.matchMedia('(max-width: 768px)').matches
    || window.matchMedia('(pointer: coarse)').matches;

  /* Reduced counts: fewer nodes = fewer O(n²) pairs */
  var HUB   = isMobile ? 4  : 6;
  var MID   = isMobile ? 12 : 24;
  var SMALL = isMobile ? 16 : 32;
  var LINK  = isMobile ? 130 : 210;
  var MDIST = isMobile ? 150 : 240;

  /* Pre-built rgba string caches — avoids string concat in inner loop  */
  var COLORS_DARK  = ['96,165,250', '167,139,250', '34,211,238'];
  var COLORS_LIGHT = ['79,70,229',  '109,40,217',  '6,182,212'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Node(tier) {
    this.tier = tier;
    this.init(true);
  }
  Node.prototype.init = function (fresh) {
    this.x  = fresh ? Math.random() * W : (Math.random() < 0.5 ? -20 : W + 20);
    this.y  = Math.random() * H;
    var s   = [0.12, 0.28, 0.55][this.tier] * (0.5 + Math.random());
    this.vx = (Math.random() - 0.5) * s * 2;
    this.vy = (Math.random() - 0.5) * s * 2;
    this.baseR = this.tier === 0 ? 3.0 + Math.random() * 2.5
               : this.tier === 1 ? 1.2 + Math.random() * 1.4
               :                   0.4 + Math.random() * 0.7;
    this.r     = this.baseR;
    this.alpha = this.tier === 0 ? 0.80 + Math.random() * 0.20
               : this.tier === 1 ? 0.30 + Math.random() * 0.35
               :                   0.12 + Math.random() * 0.22;
    this.phase = Math.random() * Math.PI * 2;
    this.ci    = Math.random() < 0.5 ? 0 : (Math.random() < 0.65 ? 1 : 2);
  };
  Node.prototype.update = function () {
    if (this.tier === 0) {
      this.r = this.baseR + Math.sin(t * 0.018 + this.phase) * 1.2;
    }
    var dx = mouse.x - this.x, dy = mouse.y - this.y;
    var d  = Math.sqrt(dx * dx + dy * dy);
    if (mouse.on && d < MDIST && d > 1) {
      var f = (1 - d / MDIST) * 0.042;
      this.vx += (dx / d) * f;
      this.vy += (dy / d) * f;
    }
    this.x += this.vx;
    this.y += this.vy;
    var cap = [0.55, 0.95, 1.5][this.tier];
    var spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > cap) { this.vx *= 0.96; this.vy *= 0.96; }
    if (this.x < -30)      this.x = W + 30;
    else if (this.x > W + 30) this.x = -30;
    if (this.y < -30)      this.y = H + 30;
    else if (this.y > H + 30) this.y = -30;
  };
  Node.prototype.draw = function () {
    /* Uses darkCache set once per frame — zero DOM reads here */
    var col = darkCache ? COLORS_DARK[this.ci] : COLORS_LIGHT[this.ci];
    if (this.tier === 0 && darkCache) {
      /* Manual glow rings — avoids expensive ctx.shadowBlur filter */
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 3.5, 0, 6.2832);
      ctx.fillStyle = 'rgba(' + col + ',0.04)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 2.0, 0, 6.2832);
      ctx.fillStyle = 'rgba(' + col + ',0.10)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(' + col + ',' + this.alpha + ')';
      ctx.fill();
      /* bright white core */
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 0.35, 0, 6.2832);
      ctx.fillStyle = 'rgba(255,255,255,0.90)';
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(' + col + ',' + this.alpha + ')';
      ctx.fill();
    }
  };

  function initNodes() {
    nodes = [];
    for (var i = 0; i < HUB;   i++) nodes.push(new Node(0));
    for (var i = 0; i < MID;   i++) nodes.push(new Node(1));
    for (var i = 0; i < SMALL; i++) nodes.push(new Node(2));
  }

  function draw() {
    t++;
    /* Cache theme check once per frame instead of per-node */
    darkCache = document.documentElement.getAttribute('data-theme') !== 'light';

    ctx.clearRect(0, 0, W, H);

    /* --- Connections (flat rgba stroke — no per-line gradient objects) --- */
    var baseAlpha = darkCache ? 0.28 : 0.14;
    for (var i = 0; i < nodes.length - 1; i++) {
      var ni = nodes[i];
      if (ni.tier === 2) continue;
      for (var j = i + 1; j < nodes.length; j++) {
        var nj = nodes[j];
        if (nj.tier === 2) continue;
        var dx = ni.x - nj.x, dy = ni.y - nj.y;
        var dist = dx * dx + dy * dy; /* squared — skip sqrt until needed */
        var isHub = (ni.tier === 0 || nj.tier === 0);
        var maxD = LINK * (isHub ? 1.5 : 1.0);
        if (dist > maxD * maxD) continue;
        dist = Math.sqrt(dist);
        var a   = (1 - dist / maxD) * baseAlpha * (isHub ? 2.0 : 1.0);
        /* Use mid-point color between the two node colors */
        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.strokeStyle = darkCache
          ? 'rgba(130,152,250,' + a + ')'
          : 'rgba(94,55,223,'  + a + ')';
        ctx.lineWidth = isHub ? 1.1 : 0.55;
        ctx.stroke();
      }
    }

    /* --- Mouse glow lines (flat stroke, no gradient objects) --- */
    if (mouse.on) {
      var maxA = darkCache ? 0.50 : 0.28;
      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        var dx = n.x - mouse.x, dy = n.y - mouse.y;
        var dist = dx * dx + dy * dy;
        if (dist > MDIST * MDIST) continue;
        dist = Math.sqrt(dist);
        var alpha = (1 - dist / MDIST) * maxA;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = darkCache
          ? 'rgba(34,211,238,' + alpha + ')'
          : 'rgba(79,70,229,'  + alpha + ')';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }

    /* --- Nodes --- */
    for (var k = 0; k < nodes.length; k++) {
      nodes[k].update();
      nodes[k].draw();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function () { resize(); initNodes(); });
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true;
  });
  window.addEventListener('mouseleave', function () { mouse.on = false; });

  resize();
  initNodes();
  draw();
})();