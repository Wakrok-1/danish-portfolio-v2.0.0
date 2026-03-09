"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import GradientOrbs from "./GradientOrbs";

const ROLES = [
  "Full Stack Developer",
  "AI / ML Engineer",
  "Data Scientist",
  "Data Engineer",
  "NLP Specialist",
  "Frontend Architect",
];

const D = "DANISH".split("");
const R = "RAIMI".split("");

export default function HeroSection() {
  const [roleIndex, setRoleIndex]           = useState(0);
  const [letterboxVisible, setLetterboxVisible] = useState(true);
  const [glitching, setGlitching]           = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLetterboxVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 3200);
    return () => clearInterval(id);
  }, []);

  // Rare glitch flash
  useEffect(() => {
    const schedule = (): ReturnType<typeof setTimeout> => {
      const delay = 5000 + Math.random() * 10000;
      return setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 280);
        schedule();
      }, delay);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-deep)" }}
    >
      <ParticleBackground />
      <GradientOrbs />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(6,11,20,0.88) 100%)" }}
      />

      {/* Letterbox */}
      <AnimatePresence>
        {letterboxVisible && (
          <>
            <motion.div className="absolute top-0 left-0 right-0 z-40" style={{ background: "var(--bg-deep)" }}
              initial={{ height: "12vh" }} exit={{ height: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true" />
            <motion.div className="absolute bottom-0 left-0 right-0 z-40" style={{ background: "var(--bg-deep)" }}
              initial={{ height: "12vh" }} exit={{ height: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true" />
          </>
        )}
      </AnimatePresence>

      {/* Corner brackets */}
      {(["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"] as const).map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none z-20`} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            {i === 0 && <path d="M0 12 L0 0 L12 0" stroke="var(--accent)" strokeWidth="1.8" fill="none" opacity="0.5" />}
            {i === 1 && <path d="M24 12 L24 0 L12 0" stroke="var(--accent)" strokeWidth="1.8" fill="none" opacity="0.5" />}
            {i === 2 && <path d="M0 12 L0 24 L12 24" stroke="var(--accent)" strokeWidth="1.8" fill="none" opacity="0.5" />}
            {i === 3 && <path d="M24 12 L24 24 L12 24" stroke="var(--accent)" strokeWidth="1.8" fill="none" opacity="0.5" />}
          </svg>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 select-none">
        {/* Label */}
        <motion.div className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, var(--accent))" }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: "var(--accent)" }} />
          <span className="font-orbitron text-[10px] tracking-[0.5em] uppercase" style={{ color: "var(--accent)" }}>
            Portfolio
          </span>
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: "var(--accent)" }} />
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, var(--accent))" }} />
        </motion.div>

        {/* DANISH */}
        <div className="font-cinzel font-black leading-none">
          <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3">
            {D.map((letter, i) => (
              <motion.span
                key={i}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl inline-block text-chrome"
                style={{
                  textShadow: glitching && i % 2 === 0
                    ? "0 0 20px rgba(14,165,233,1), 2px 0 0 rgba(255,50,50,0.4), -2px 0 0 rgba(50,255,200,0.4)"
                    : "0 0 30px rgba(186,230,253,0.4), 0 0 60px rgba(186,230,253,0.15)",
                }}
                initial={{ opacity: 0, y: -60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* RAIMI */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mt-1">
            {R.map((letter, i) => (
              <motion.span
                key={i}
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl inline-block"
                style={{
                  color: glitching ? "var(--accent-bright)" : "var(--accent)",
                  textShadow: glitching
                    ? "0 0 30px rgba(56,189,248,1), -2px 0 0 rgba(255,50,50,0.4)"
                    : "0 0 20px rgba(14,165,233,0.7), 0 0 50px rgba(14,165,233,0.35)",
                }}
                initial={{ opacity: 0, y: 60, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div className="my-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}>
          <div className="h-px w-32 md:w-48" style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }} />
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 0 L18 9 L9 18 L0 9 Z" fill="var(--accent)" opacity="0.9" />
            <path d="M9 4 L14 9 L9 14 L4 9 Z" fill="var(--bg-deep)" />
          </svg>
          <div className="h-px w-32 md:w-48" style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }} />
        </motion.div>

        {/* Cycling role */}
        <motion.div className="h-10 overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.5 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="font-orbitron text-sm md:text-base tracking-widest"
              style={{ color: "var(--accent)", textShadow: "0 0 12px rgba(14,165,233,0.8)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              ▶ Aspiring {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTA buttons */}
        <motion.div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.7 }}>
          <a
            href="#projects"
            className="group relative font-orbitron text-xs tracking-[0.2em] uppercase px-8 py-3 overflow-hidden transition-all duration-300"
            style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "var(--accent)" }} aria-hidden="true" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
          </a>
          <a
            href="#tech"
            className="font-orbitron text-xs tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
              (e.currentTarget as HTMLElement).style.color = "var(--accent)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            }}
          >
            Tech Stack
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8, duration: 0.6 }}>
        <span className="font-orbitron text-[9px] tracking-[0.4em] uppercase" style={{ color: "var(--text-muted)" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
