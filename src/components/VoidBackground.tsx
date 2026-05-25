"use client";

import { useEffect, useRef } from "react";

export default function VoidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const frameRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || 600;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Drifting star particles
    const stars = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 0.9 + 0.2,
      opacity: Math.random() * 0.22 + 0.04,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.013 + 0.004,
    }));

    const RING_COUNT  = 8;
    const RING_PERIOD = 300; // frames for a ring to travel from center to edge
    const LINE_COUNT  = 72;

    const draw = () => {
      const w  = canvas.width;
      const h  = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy) * 1.15;
      const f  = frameRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Radial spokes from center (static)
      for (let i = 0; i < LINE_COUNT; i++) {
        const angle = (i / LINE_COUNT) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.strokeStyle = "rgba(100,55,230,0.026)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Expanding concentric rings (8 staggered phases)
      for (let i = 0; i < RING_COUNT; i++) {
        const t        = (f + i * (RING_PERIOD / RING_COUNT)) % RING_PERIOD;
        const progress = t / RING_PERIOD;
        const r        = progress * maxR;

        // Fade: ease-in first 15%, sustain, ease-out last 35%
        let alpha: number;
        if (progress < 0.15) {
          alpha = (progress / 0.15) * 0.22;
        } else if (progress > 0.65) {
          alpha = ((1 - progress) / 0.35) * 0.22;
        } else {
          alpha = 0.22;
        }

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(120,70,255,${(alpha * 0.85).toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ── Center glow focal point
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
      grad.addColorStop(0, "rgba(110,55,255,0.14)");
      grad.addColorStop(0.45, "rgba(110,55,255,0.04)");
      grad.addColorStop(1, "rgba(110,55,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // ── Breathing center dot
      const breathe = 0.7 + 0.3 * Math.sin((f * 0.018));
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 * breathe, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,150,255,${(0.55 * breathe).toFixed(3)})`;
      ctx.fill();

      // ── Star particles
      stars.forEach(p => {
        p.pulse += p.pulseSpeed;
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (!isFinite(p.x) || !isFinite(p.y)) return;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196,181,253,${alpha.toFixed(3)})`;
        ctx.fill();
      });

      frameRef.current++;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
