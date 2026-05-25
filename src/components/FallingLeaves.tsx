"use client";

import { useEffect, useRef } from "react";

interface Leaf {
  x: number; y: number;
  size: number;
  speed: number;
  rotation: number;
  rotSpeed: number;
  swayPhase: number;
  swaySpeed: number;
  opacity: number;
  colorIdx: number;
}

// Violet-tinted leaf palette matching the accent system
const COLORS: [number, number, number][] = [
  [167, 139, 250],  // violet-400
  [196, 181, 253],  // violet-300
  [139,  92, 246],  // violet-500
  [124, 109, 216],  // accent-dim tint
];

function drawLeaf(ctx: CanvasRenderingContext2D, leaf: Leaf) {
  const [r, g, b] = COLORS[leaf.colorIdx];
  const s = leaf.size;

  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.rotation);
  ctx.globalAlpha = leaf.opacity;

  // Leaf body — elongated teardrop
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo( s * 0.6, -s * 0.55,  s * 0.6,  s * 0.55, 0,  s);
  ctx.bezierCurveTo(-s * 0.6,  s * 0.55, -s * 0.6, -s * 0.55, 0, -s);
  ctx.closePath();
  ctx.fillStyle   = `rgba(${r},${g},${b},0.18)`;
  ctx.fill();
  ctx.strokeStyle = `rgba(${r},${g},${b},0.38)`;
  ctx.lineWidth   = 0.6;
  ctx.stroke();

  // Central midrib
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.8);
  ctx.lineTo(0,  s * 0.8);
  ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
  ctx.lineWidth   = 0.45;
  ctx.stroke();

  // Two side veins
  for (const dir of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.1);
    ctx.quadraticCurveTo(dir * s * 0.35, s * 0.05, dir * s * 0.48, s * 0.35);
    ctx.strokeStyle = `rgba(${r},${g},${b},0.28)`;
    ctx.lineWidth   = 0.3;
    ctx.stroke();
  }

  ctx.restore();
}

function spawn(w: number, h: number, scatter = false): Leaf {
  return {
    x:         Math.random() * w,
    y:         scatter ? Math.random() * h : -(Math.random() * 40 + 10),
    size:      Math.random() * 7 + 5,      // 5–12 px
    speed:     Math.random() * 0.6 + 0.35,
    rotation:  Math.random() * Math.PI * 2,
    rotSpeed:  (Math.random() - 0.5) * 0.011,
    swayPhase: Math.random() * Math.PI * 2,
    swaySpeed: Math.random() * 0.014 + 0.006,
    opacity:   Math.random() * 0.45 + 0.18,
    colorIdx:  Math.floor(Math.random() * COLORS.length),
  };
}

export default function FallingLeaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || window.innerWidth;
      canvas.height = canvas.offsetHeight || 800;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COUNT = 32;
    // Scatter initial leaves throughout canvas so effect is immediate
    const leaves: Leaf[] = Array.from({ length: COUNT }, () =>
      spawn(canvas.width, canvas.height, true)
    );

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      leaves.forEach((leaf, i) => {
        leaf.swayPhase += leaf.swaySpeed;
        leaf.x         += Math.sin(leaf.swayPhase) * 0.45;
        leaf.y         += leaf.speed;
        leaf.rotation  += leaf.rotSpeed;

        if (leaf.y > h + leaf.size + 5) {
          leaves[i] = spawn(w, h, false);
        }

        drawLeaf(ctx, leaf);
      });

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
