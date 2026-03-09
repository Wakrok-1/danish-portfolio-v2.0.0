"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  opacity: number;
  colorR: number; colorG: number; colorB: number;
  pulse: number; pulseSpeed: number;
}

export default function ParticleBackground() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const animRef     = useRef<number>(0);
  const mouseRef    = useRef({ x: -999, y: -999 });
  const particleRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sky / cyan particle palette
    const PALETTE = [
      [14, 165, 233],   // sky blue (main accent)
      [56, 189, 248],   // bright sky
      [3, 105, 161],    // deep sky
      [186, 230, 253],  // very light sky
      [6, 182, 212],    // cyan
    ];

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COUNT = 90;
    particleRef.current = Array.from({ length: COUNT }, () => {
      const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 0.6,
        opacity: Math.random() * 0.5 + 0.08,
        colorR: r, colorG: g, colorB: b,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.018 + 0.004,
      };
    });

    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const ps = particleRef.current;

      // Connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            const a = (1 - d / 110) * 0.07;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(14,165,233,${a})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      // Particles
      ps.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const alpha = p.opacity * (0.65 + 0.35 * Math.sin(p.pulse));

        // Mouse gentle attraction
        const mdx  = mouseRef.current.x - p.x;
        const mdy  = mouseRef.current.y - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 130 && mdist > 0) {
          p.vx += (mdx / mdist) * 0.015;
          p.vy += (mdy / mdist) * 0.015;
        }

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.2) { p.vx = (p.vx / speed) * 1.2; p.vy = (p.vy / speed) * 1.2; }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) { p.vx *= -1; p.x = Math.max(0, Math.min(w, p.x)); }
        if (p.y < 0 || p.y > h) { p.vy *= -1; p.y = Math.max(0, Math.min(h, p.y)); }

        // Guard against non-finite values before canvas calls
        if (!isFinite(p.x) || !isFinite(p.y) || !isFinite(p.radius) || p.radius <= 0) return;

        const { colorR: r, colorG: g, colorB: b } = p;

        // Glow halo
        const glowR = p.radius * 5;
        if (glowR > 0 && isFinite(glowR)) {
          try {
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
            grad.addColorStop(0, `rgba(${r},${g},${b},${(alpha * 0.6).toFixed(3)})`);
            grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          } catch {
            // skip if gradient fails
          }
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
