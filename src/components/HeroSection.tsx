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

const NAME_FIRST = "DANISH".split("");
const NAME_LAST  = "RAIMI".split("");

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <ParticleBackground />
      <GradientOrbs />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,10,10,0.85) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 select-none max-w-5xl mx-auto">

        {/* Eyebrow label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="h-px w-10" style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(167,139,250,0.6)" }} />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase glow-sm" style={{ color: "var(--accent)" }}>
            Portfolio
          </span>
          <div className="h-px w-10" style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(167,139,250,0.6)" }} />
        </motion.div>

        {/* Name — DANISH */}
        <div className="font-heading font-bold leading-[0.9] tracking-tight">
          <div className="flex items-center justify-center gap-[2px] sm:gap-1">
            {NAME_FIRST.map((letter, i) => (
              <motion.span
                key={i}
                className="text-[clamp(3.5rem,12vw,9rem)] inline-block text-[var(--text)]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* RAIMI — accent color with glow */}
          <div className="flex items-center justify-center gap-[2px] sm:gap-1">
            {NAME_LAST.map((letter, i) => (
              <motion.span
                key={i}
                className="text-[clamp(3.5rem,12vw,9rem)] inline-block glow-text"
                style={{ color: "var(--accent)" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="my-9 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <div className="h-px w-20 sm:w-32" style={{ background: "var(--border-hover)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(167,139,250,0.9), 0 0 16px rgba(167,139,250,0.5)" }} />
          <div className="h-px w-20 sm:w-32" style={{ background: "var(--border-hover)" }} />
        </motion.div>

        {/* Cycling role */}
        <motion.div
          className="h-8 overflow-hidden mb-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIndex}
              className="font-body text-base sm:text-lg font-medium"
              style={{ color: "var(--text-2)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              Aspiring {ROLES[roleIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="group relative font-body font-medium text-sm px-7 py-3 overflow-hidden transition-all duration-300 cursor-pointer"
            style={{
              border: "1px solid rgba(167,139,250,0.6)",
              color: "var(--accent)",
              borderRadius: "6px",
              boxShadow: "0 0 18px rgba(167,139,250,0.18), inset 0 0 18px rgba(167,139,250,0.04)",
            }}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "var(--accent)" }} aria-hidden="true" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
          </a>
          <a
            href="#tech"
            className="font-body font-medium text-sm px-7 py-3 transition-all duration-300 cursor-pointer"
            style={{
              border: "1px solid var(--border-hover)",
              color: "var(--text-2)",
              borderRadius: "6px",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
              (e.currentTarget as HTMLElement).style.color = "var(--text)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
            }}
          >
            Tech Stack
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--text-3)" }}>
          Scroll
        </span>
        <motion.div
          className="w-px h-10"
          style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
