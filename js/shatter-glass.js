/* ═══════════════════════════════════════════════════════════════════
   BREAKABLE GLASS CARDS — Badges & Milestones section
   افکت شیشه‌ی شکننده برای کارت‌های بخش نشان‌ها و دستاوردها
   Pure vanilla JS + Canvas 2D + Web Audio — no external libraries,
   no build step. Triggered by click / Enter-Space / touch-tap /
   quick drag on each `.ach-card`.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Tunable physics config ── */
  const CONFIG = {
    gridCols: 6,              // fragment grid columns
    gridRows: 4,              // fragment grid rows (cols*rows*2 triangular shards)
    shatterDuration: 650,     // ms — explosion phase
    holdDuration: 850,        // ms — fragments drift apart, mid-air
    reconstructDuration: 750, // ms — pieces fly back into place
    explosionStrength: 34,    // px/frame-ish initial outward velocity scale
    gravity: 0.05,
    damping: 0.965
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rand(min, max) { return min + Math.random() * (max - min); }

  function hexToRgba(hex, a) {
    const h = hex.replace('#', '').trim();
    const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    const int = parseInt(full || '35C7C2', 16);
    const r = (int >> 16) & 255, g = (int >> 8) & 255, b = int & 255;
    return `rgba(${r},${g},${b},${a})`;
  }

  /* ── Tiny synthesized sound effects (no audio files needed) ── */
  let audioCtx = null;
  function getAudioCtx() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    return audioCtx;
  }

  function playCrackSound() {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      const duration = 0.16;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2.5);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1600;
      const gain = ctx.createGain();
      gain.gain.value = 0.2;
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start();
    } catch (e) { /* audio not critical — fail silently */ }
  }

  function playRebuildSound() {
    const ctx = getAudioCtx();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, t);
      osc.frequency.exponentialRampToValueAtTime(1080, t + 0.22);
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.1, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.32);
    } catch (e) { /* audio not critical — fail silently */ }
  }

  /* ── One instance per badge card ── */
  class ShatterCard {
    constructor(card) {
      this.card = card;
      this.busy = false;
      this.accent = (getComputedStyle(card).getPropertyValue('--ach-c') || '#35C7C2').trim() || '#35C7C2';
      this._wrapContent();
      this._bindEvents();
    }

    _wrapContent() {
      // Move existing card children into a wrapper so we can fade it
      // out while the canvas fragments render on top.
      const content = document.createElement('div');
      content.className = 'ach-card-content';
      while (this.card.firstChild) content.appendChild(this.card.firstChild);
      this.card.appendChild(content);
      this.content = content;

      const canvas = document.createElement('canvas');
      canvas.className = 'ach-shatter-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      this.card.appendChild(canvas);
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }

    _bindEvents() {
      this.card.setAttribute('tabindex', '0');
      this.card.setAttribute('role', 'button');
      const label = this.content.querySelector('.ach-name');
      this.card.setAttribute('aria-label',
        (label ? label.textContent.trim() : 'Badge') + ' — press to preview shatter effect');

      this.card.addEventListener('click', () => this.trigger());
      this.card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.trigger();
        }
      });

      // Quick drag / swipe also triggers it (mouse + touch)
      let startX = 0, startY = 0, dragging = false;
      const THRESH = 24;
      const onStart = (x, y) => { startX = x; startY = y; dragging = true; };
      const onMove = (x, y) => {
        if (!dragging) return;
        if (Math.hypot(x - startX, y - startY) > THRESH) {
          dragging = false;
          this.trigger();
        }
      };
      const onEnd = () => { dragging = false; };

      this.card.addEventListener('mousedown', (e) => onStart(e.clientX, e.clientY));
      this.card.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
      window.addEventListener('mouseup', onEnd);

      this.card.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        onStart(t.clientX, t.clientY);
      }, { passive: true });
      this.card.addEventListener('touchmove', (e) => {
        const t = e.touches[0];
        onMove(t.clientX, t.clientY);
      }, { passive: true });
      this.card.addEventListener('touchend', onEnd);
    }

    /* Build a grid of jittered triangular shards across the card rect */
    _buildShards(rect) {
      const { gridCols: cols, gridRows: rows } = CONFIG;
      const cw = rect.width / cols;
      const ch = rect.height / rows;
      const cx = rect.width / 2, cy = rect.height / 2;
      const shards = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = c * cw, y0 = r * ch, x1 = x0 + cw, y1 = y0 + ch;
          const jx = () => rand(-cw * 0.14, cw * 0.14);
          const jy = () => rand(-ch * 0.14, ch * 0.14);
          const p00 = [x0 + jx(), y0 + jy()];
          const p10 = [x1 + jx(), y0 + jy()];
          const p01 = [x0 + jx(), y1 + jy()];
          const p11 = [x1 + jx(), y1 + jy()];

          [[p00, p10, p01], [p10, p11, p01]].forEach((tri) => {
            const centroid = [
              (tri[0][0] + tri[1][0] + tri[2][0]) / 3,
              (tri[0][1] + tri[1][1] + tri[2][1]) / 3
            ];
            const dx = centroid[0] - cx, dy = centroid[1] - cy;
            const dist = Math.max(1, Math.hypot(dx, dy));
            const dirX = dx / dist, dirY = dy / dist;
            const speed = rand(0.5, 1) * (CONFIG.explosionStrength / 20);

            shards.push({
              points: tri.map(p => [p[0] - centroid[0], p[1] - centroid[1]]),
              cx: centroid[0], cy: centroid[1],
              vx: dirX * speed + rand(-0.5, 0.5),
              vy: dirY * speed - rand(0.3, 1.1),
              vrot: rand(-0.14, 0.14),
              ox: 0, oy: 0, rot: 0,
              holdOx: 0, holdOy: 0, holdRot: 0,
              opacity: 1
            });
          });
        }
      }
      return shards;
    }

    _drawShard(ctx, shard) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, shard.opacity));
      ctx.translate(shard.cx + shard.ox, shard.cy + shard.oy);
      ctx.rotate(shard.rot);
      ctx.beginPath();
      shard.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1])));
      ctx.closePath();
      const grad = ctx.createLinearGradient(-18, -18, 18, 18);
      grad.addColorStop(0, 'rgba(255,255,255,0.18)');
      grad.addColorStop(0.5, hexToRgba(this.accent, 0.16));
      grad.addColorStop(1, 'rgba(255,255,255,0.04)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = hexToRgba(this.accent, 0.6);
      ctx.stroke();
      // thin glossy reflection line for a glass feel
      ctx.beginPath();
      ctx.moveTo(shard.points[0][0] * 0.4, shard.points[0][1] * 0.4);
      ctx.lineTo(shard.points[1][0] * 0.4, shard.points[1][1] * 0.4);
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();
    }

    /* Simple ambient dust/glow particles that puff outward on shatter */
    _buildParticles(rect) {
      const n = 22;
      const cx = rect.width / 2, cy = rect.height / 2;
      const particles = [];
      for (let i = 0; i < n; i++) {
        const angle = rand(0, Math.PI * 2);
        const speed = rand(0.6, 2.2);
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          r: rand(1, 2.6),
          life: 1
        });
      }
      return particles;
    }

    _drawParticle(ctx, p) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(this.accent, 0.9);
      ctx.shadowColor = hexToRgba(this.accent, 0.8);
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    }

    trigger() {
      if (this.busy) return;
      this.busy = true;

      const rect = this.card.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.canvas.style.width = rect.width + 'px';
      this.canvas.style.height = rect.height + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      this.card.classList.add('is-shattering');
      playCrackSound();

      /* Reduced-motion users get a quick, calm crossfade instead of physics */
      if (prefersReducedMotion) {
        this.content.style.transition = 'opacity .4s ease';
        this.content.style.opacity = '0';
        setTimeout(() => {
          this.content.style.opacity = '1';
          this.card.classList.remove('is-shattering');
          this.busy = false;
        }, 850);
        return;
      }

      const shards = this._buildShards(rect);
      const particles = this._buildParticles(rect);
      const { shatterDuration, holdDuration, reconstructDuration, gravity, damping } = CONFIG;
      const explodeEnd = shatterDuration;
      const holdEnd = shatterDuration + holdDuration;
      const allEnd = holdEnd + reconstructDuration;
      const start = performance.now();
      let capturedHold = false;

      const animate = (now) => {
        const t = now - start;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (t <= holdEnd) {
          // explode + drift phase — real outward physics
          const inExplode = t <= explodeEnd;
          shards.forEach((s) => {
            s.vy += gravity;
            s.vx *= damping;
            s.vy *= damping;
            s.ox += s.vx * (inExplode ? 1 : 0.2);
            s.oy += s.vy * (inExplode ? 1 : 0.2);
            s.rot += s.vrot * (inExplode ? 1 : 0.25);
            s.opacity = inExplode ? 1 : Math.max(0.35, 1 - ((t - explodeEnd) / holdDuration) * 0.5);
            this._drawShard(this.ctx, s);
          });
          particles.forEach((p) => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= 0.012;
            if (p.life > 0) this._drawParticle(this.ctx, p);
          });
          requestAnimationFrame(animate);
        } else if (t <= allEnd) {
          // reconstruct phase — interpolate back from the hold snapshot
          if (!capturedHold) {
            shards.forEach((s) => { s.holdOx = s.ox; s.holdOy = s.oy; s.holdRot = s.rot; });
            capturedHold = true;
          }
          const rp = Math.min(1, (t - holdEnd) / reconstructDuration);
          const ease = 1 - Math.pow(1 - rp, 3); // easeOutCubic
          shards.forEach((s) => {
            s.ox = s.holdOx * (1 - ease);
            s.oy = s.holdOy * (1 - ease);
            s.rot = s.holdRot * (1 - ease);
            s.opacity = 0.5 + ease * 0.5;
            this._drawShard(this.ctx, s);
          });
          requestAnimationFrame(animate);
        } else {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.card.classList.remove('is-shattering');
          this.card.classList.add('is-rebuilt-flash');
          playRebuildSound();
          setTimeout(() => this.card.classList.remove('is-rebuilt-flash'), 500);
          this.busy = false;
        }
      };
      requestAnimationFrame(animate);
    }
  }

  function init() {
    document.querySelectorAll('#ach-grid .ach-card').forEach((card) => {
      if (!card.dataset.shatterBound) {
        card.dataset.shatterBound = 'true';
        new ShatterCard(card);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
