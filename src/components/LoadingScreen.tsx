"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";

const MARQUEE_ITEMS = [
  "Full Stack Developer", "Data Scientist", "AI Engineer",
  "NLP Specialist", "Data Engineer", "Machine Learning",
];

interface Props { onComplete: () => void; }

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState<"loading" | "ready" | "exiting">("loading");
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    let raf: ReturnType<typeof setTimeout>;
    let current = 0;

    const tick = () => {
      const remaining = 100 - current;
      const step = Math.max(0.3, remaining * 0.04 + Math.random() * 1.5);
      current = Math.min(100, current + step);
      setProgress(Math.floor(current));

      if (current < 100) {
        raf = setTimeout(tick, 28 + Math.random() * 20);
      } else {
        setTimeout(() => setPhase("ready"), 300);
      }
    };

    const init = setTimeout(tick, 400);
    return () => { clearTimeout(init); clearTimeout(raf); };
  }, []);

  const handleEnter = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("exiting");
    setTimeout(() => setVisible(false), 800);
    setTimeout(onComplete, 900);
  }, [phase, onComplete]);

  useEffect(() => {
    if (phase === "ready") {
      const t = setTimeout(handleEnter, 1800);
      return () => clearTimeout(t);
    }
  }, [phase, handleEnter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden select-none"
          style={{ background: "var(--bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Main panel */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center"
            animate={phase === "exiting" ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Progress number */}
            <motion.div
              className="font-heading font-bold text-center leading-none mb-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className="block tabular-nums"
                style={{
                  fontSize: "clamp(5rem,18vw,12rem)",
                  color: "var(--text)",
                  opacity: 0.08 + (progress / 100) * 0.92,
                }}
              >
                {String(progress).padStart(2, "0")}
              </span>
            </motion.div>

            {/* Name */}
            <motion.p
              className="font-heading font-semibold text-base tracking-tight mb-1"
              style={{ color: "var(--text-2)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Danish Raimi
            </motion.p>

            <motion.p
              className="font-mono text-[10px] tracking-[0.15em] uppercase"
              style={{ color: "var(--text-3)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {phase === "ready" ? "Ready" : "Loading..."}
            </motion.p>

            {/* Enter button */}
            <AnimatePresence>
              {phase === "ready" && (
                <motion.button
                  onClick={handleEnter}
                  className="mt-9 font-body font-medium text-sm px-8 py-3 rounded-lg transition-all duration-200 cursor-pointer"
                  style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ background: "var(--accent)", color: "#fff" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Enter
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            className="relative overflow-hidden"
            style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
            animate={phase === "exiting" ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Progress bar */}
            <div className="relative h-px w-full" style={{ background: "var(--border)" }}>
              <motion.div
                className="absolute top-0 left-0 h-full"
                style={{ background: "var(--accent)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            <Marquee speed={45} gradient={false} className="py-3">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} className="flex items-center gap-5 mx-5">
                  <span className="font-mono text-[10px] tracking-[0.15em] whitespace-nowrap" style={{ color: "var(--text-3)" }}>
                    {item}
                  </span>
                  <span style={{ color: "var(--border-hover)", fontSize: "6px" }}>/</span>
                </span>
              ))}
            </Marquee>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
