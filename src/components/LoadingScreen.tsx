"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";

const MARQUEE_ITEMS = [
  "FULL STACK DEVELOPER",
  "DATA SCIENTIST",
  "AI ENGINEER",
  "NLP SPECIALIST",
  "DATA ENGINEER",
  "MACHINE LEARNING",
  "FRONTEND ARCHITECT",
  "BACKEND DEVELOPER",
];

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress]   = useState(0);
  const [phase, setPhase]         = useState<"loading" | "ready" | "exiting">("loading");
  const [visible, setVisible]     = useState(true);
  const [mousePos, setMousePos]   = useState({ x: 50, y: 50 }); // percent

  // ── Simulate loading progress ──────────────────────────────────────────────
  useEffect(() => {
    let raf: ReturnType<typeof setTimeout>;
    let current = 0;

    const tick = () => {
      // Eased increments — slows near 100 for dramatic effect
      const remaining = 100 - current;
      const step = Math.max(0.3, remaining * 0.04 + Math.random() * 1.5);
      current = Math.min(100, current + step);
      setProgress(Math.floor(current));

      if (current < 100) {
        raf = setTimeout(tick, 28 + Math.random() * 20);
      } else {
        setTimeout(() => setPhase("ready"), 400);
      }
    };

    // Small initial delay before bar starts
    const init = setTimeout(tick, 600);
    return () => { clearTimeout(init); clearTimeout(raf); };
  }, []);

  // ── Auto-enter after brief pause when ready ────────────────────────────────
  const handleEnter = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("exiting");
    setTimeout(() => setVisible(false), 900);
    setTimeout(onComplete, 1000);
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase === "ready") {
      const t = setTimeout(handleEnter, 2200);
      return () => clearTimeout(t);
    }
  }, [phase, handleEnter]);

  // ── Mouse spotlight tracking ───────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden select-none"
          style={{ background: "var(--bg-deep)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ── Top panel (slides up on exit) ─────────────────────────────── */}
          <motion.div
            className="flex-1 relative flex flex-col items-center justify-center overflow-hidden"
            animate={phase === "exiting" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Mouse-tracking spotlight */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "600px",
                height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)",
                left: `${mousePos.x}%`,
                top:  `${mousePos.y}%`,
                transform: "translate(-50%, -50%)",
                transition: "left 0.3s ease, top 0.3s ease",
              }}
              aria-hidden="true"
            />

            {/* Corner brackets */}
            {["top-8 left-8", "top-8 right-8", "bottom-28 left-8", "bottom-28 right-8"].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  {i === 0 && <path d="M0 10 L0 0 L10 0" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.4" />}
                  {i === 1 && <path d="M24 10 L24 0 L14 0" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.4" />}
                  {i === 2 && <path d="M0 14 L0 24 L10 24" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.4" />}
                  {i === 3 && <path d="M24 14 L24 24 L14 24" stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0.4" />}
                </svg>
              </div>
            ))}

            {/* Progress number */}
            <motion.div
              className="font-cinzel font-black text-center leading-none mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span
                className="block text-[clamp(5rem,18vw,14rem)] tabular-nums"
                style={{
                  background: "linear-gradient(180deg, #fff 0%, var(--accent) 60%, var(--accent-dim) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "none",
                  filter: `drop-shadow(0 0 40px rgba(14,165,233,${(progress / 100) * 0.6}))`,
                }}
              >
                {String(progress).padStart(2, "0")}
              </span>
            </motion.div>

            {/* Name */}
            <motion.p
              className="font-orbitron text-xs tracking-[0.5em] uppercase mb-2"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              Danish Raimi
            </motion.p>

            {/* Status text */}
            <motion.p
              className="font-rajdhani text-sm tracking-widest"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              {phase === "ready" ? "— Ready —" : "Loading portfolio..."}
            </motion.p>

            {/* Enter button (appears when ready) */}
            <AnimatePresence>
              {phase === "ready" && (
                <motion.button
                  onClick={handleEnter}
                  className="mt-10 font-orbitron text-xs tracking-[0.4em] uppercase px-10 py-3 relative overflow-hidden group"
                  style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "var(--accent)" }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    ENTER
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Bottom panel with marquee (slides down on exit) ────────────── */}
          <motion.div
            className="relative overflow-hidden"
            style={{
              borderTop: "1px solid var(--border)",
              background: "rgba(9,16,30,0.8)",
              backdropFilter: "blur(8px)",
            }}
            animate={phase === "exiting" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Progress bar */}
            <div className="relative h-0.5 w-full overflow-hidden" style={{ background: "rgba(14,165,233,0.12)" }}>
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{ background: "linear-gradient(to right, var(--accent-dim), var(--accent), var(--accent-bright))" }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
              {/* Glow tip */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 12px var(--accent), 0 0 24px rgba(14,165,233,0.5)",
                  left: `${progress}%`,
                  transform: "translateX(-50%) translateY(-50%)",
                }}
                animate={{ left: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Marquee */}
            <Marquee
              speed={55}
              gradient={false}
              className="py-3"
            >
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center gap-6 mx-6">
                  <span className="font-orbitron text-[11px] tracking-[0.35em] whitespace-nowrap"
                    style={{ color: "var(--text-secondary)" }}>
                    {item}
                  </span>
                  <span style={{ color: "var(--accent)", fontSize: "8px" }}>◆</span>
                </span>
              ))}
            </Marquee>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
