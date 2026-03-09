/* ============================================================
   canvas.js -- Deep Space Neural Network background
   ============================================================ */

(function () {
  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H, nodes = [];
  var mouse = { x: -9999, y: -9999, on: false };
  var t = 0;

  var isMobile = window.matchMedia('(max-width: 768px)').matches
    || window.matchMedia('(pointer: coarse)').matches;

  var HUB   = isMobile ? 4  : 7;
  var MID   = isMobile ? 14 : 38;
  var SMALL = isMobile ? 18 : 50;
  var LINK  = isMobile ? 130 : 210;
  var MDIST = isMobile ? 160 : 260;

  function isDark() { return document.documentElement.getAttribute('data-theme') !== 'light'; }

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
    this.baseR = this.tier === 0 ? 3.2 + Math.random() * 2.8
               : this.tier === 1 ? 1.2 + Math.random() * 1.4
               :                   0.4 + Math.random() * 0.7;
    this.r     = this.baseR;
    this.alpha = this.tier === 0 ? 0.75 + Math.random() * 0.25
               : this.tier === 1 ? 0.30 + Math.random() * 0.35
               :                   0.12 + Math.random() * 0.22;
    this.phase = Math.random() * Math.PI * 2;
    this.ci    = Math.random() < 0.5 ? 0 : (Math.random() < 0.65 ? 1 : 2);
  };
  Node.prototype.update = function () {
    if (this.tier === 0) {
      this.r = this.baseR + Math.sin(t * 0.018 + this.phase) * 1.4;
    }
    var dx = mouse.x - this.x, dy = mouse.y - this.y;
    var d  = Math.sqrt(dx * dx + dy * dy);
    if (mouse.on && d < MDIST && d > 1) {
      var f = (1 - d / MDIST) * 0.045;
      this.vx += (dx / d) * f;
      this.vy += (dy / d) * f;
    }
    this.x += this.vx;
    this.y += this.vy;
    var cap = [0.55, 0.95, 1.5][this.tier];
    var spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > cap) { this.vx *= 0.96; this.vy *= 0.96; }
    if (this.x < -30)     this.x = W + 30;
    else if (this.x > W + 30) this.x = -30;
    if (this.y < -30)     this.y = H + 30;
    else if (this.y > H + 30) this.y = -30;
  };
  Node.prototype.draw = function () {
    var dark = isDark();
    var rgb = dark
      ? [[96,165,250],[167,139,250],[34,211,238]][this.ci]
      : [[79,70,229],[109,40,217],[6,182,212]][this.ci];
    var r = rgb[0], g = rgb[1], b = rgb[2];
    if (this.tier === 0 && dark) {
      ctx.save();
      ctx.shadowBlur  = 22;
      ctx.shadowColor = 'rgba(' + r + ',' + g + ',' + b + ',0.9)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + this.alpha + ')';
      ctx.fill();
      ctx.restore();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 0.38, 0, 6.2832);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 6.2832);
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + this.alpha + ')';
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
    ctx.clearRect(0, 0, W, H);
    var dark = isDark();

    /* --- Connections --- */
    for (var i = 0; i < nodes.length - 1; i++) {
      var ni = nodes[i];
      if (ni.tier === 2) continue; /* small nodes skip inter-connections */
      for (var j = i + 1; j < nodes.length; j++) {
        var nj = nodes[j];
        if (nj.tier === 2) continue;
        var dx = ni.x - nj.x, dy = ni.y - nj.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var maxD = LINK * (ni.tier === 0 || nj.tier === 0 ? 1.5 : 1.0);
        if (dist > maxD) continue;
        var a = (1 - dist / maxD);
        var boost = (ni.tier === 0 || nj.tier === 0) ? 2.2 : 1.0;
        var alpha  = a * (dark ? 0.28 : 0.14) * boost;
        var lw     = (ni.tier === 0 || nj.tier === 0) ? 1.1 : 0.55;
        var grad = ctx.createLinearGradient(ni.x, ni.y, nj.x, nj.y);
        if (dark) {
          grad.addColorStop(0, 'rgba(96,165,250,'  + alpha + ')');
          grad.addColorStop(1, 'rgba(167,139,250,' + alpha + ')');
        } else {
          grad.addColorStop(0, 'rgba(79,70,229,'  + alpha + ')');
          grad.addColorStop(1, 'rgba(109,40,217,' + alpha + ')');
        }
        ctx.beginPath();
        ctx.moveTo(ni.x, ni.y);
        ctx.lineTo(nj.x, nj.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = lw;
        ctx.stroke();
      }
    }

    /* --- Mouse glow lines --- */
    if (mouse.on) {
      for (var k = 0; k < nodes.length; k++) {
        var n = nodes[k];
        var dx = n.x - mouse.x, dy = n.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > MDIST) continue;
        var alpha = (1 - dist / MDIST) * (dark ? 0.55 : 0.3);
        var grad = ctx.createLinearGradient(mouse.x, mouse.y, n.x, n.y);
        if (dark) {
          grad.addColorStop(0, 'rgba(34,211,238,' + alpha + ')');
          grad.addColorStop(1, 'rgba(96,165,250,0)');
        } else {
          grad.addColorStop(0, 'rgba(79,70,229,' + alpha + ')');
          grad.addColorStop(1, 'rgba(109,40,217,0)');
        }
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(n.x, n.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.9;
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