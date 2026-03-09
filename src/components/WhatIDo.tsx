"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Domain {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  skills: string[];
  color: string;
}

const DOMAINS: Domain[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Building interfaces",
    icon: "⬡",
    color: "#0EA5E9",
    description:
      "Crafting responsive, performant web interfaces with modern frameworks. I focus on clean component architecture, smooth animations, and pixel-perfect design implementation.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"],
  },
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Powering the server",
    icon: "◈",
    color: "#0369A1",
    description:
      "Designing scalable server-side systems and REST APIs. I build reliable backends with Python and Node.js, focusing on clean architecture and efficient data handling.",
    skills: ["Python", "Node.js", "FastAPI", "Express.js", "REST APIs", ".NET / C#"],
  },
  {
    id: "datascience",
    title: "Data Science & ML",
    subtitle: "Extracting insight",
    icon: "◆",
    color: "#38BDF8",
    description:
      "Turning raw data into actionable knowledge. From exploratory analysis to building and deploying machine learning models, I work across the full data pipeline.",
    skills: ["Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "EDA", "Data Cleaning"],
  },
  {
    id: "nlp",
    title: "NLP & AI Engineering",
    subtitle: "Teaching machines language",
    icon: "◉",
    color: "#2DD4BF",
    description:
      "Working with transformer-based models and language understanding pipelines. Exploring how machines read, understand, and generate human language.",
    skills: ["HuggingFace", "BERT", "LLMs", "Feature Engineering", "Deep Learning", "NLP Pipelines"],
  },
];

// ─── Corner bracket (MoncyDev-inspired) ──────────────────────────────────────
function CornerBracket({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const path = {
    tl: "M0 16 L0 0 L16 0",
    tr: "M24 16 L24 0 L8 0",
    bl: "M0 8 L0 24 L16 24",
    br: "M24 8 L24 24 L8 24",
  }[corner];

  const pos = {
    tl: "top-0 left-0",
    tr: "top-0 right-0",
    bl: "bottom-0 left-0",
    br: "bottom-0 right-0",
  }[corner];

  return (
    <div className={`absolute ${pos} w-6 h-6`} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d={path} stroke="var(--accent)" strokeWidth="1.5" fill="none" opacity="0" className="corner-line" />
      </svg>
    </div>
  );
}

// ─── Single domain card ───────────────────────────────────────────────────────
function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          background: isOpen ? `${domain.color}08` : "rgba(15,24,40,0.6)",
          border: `1px solid ${isOpen ? domain.color + "55" : "var(--border)"}`,
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Animated top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${domain.color}, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isOpen ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Header — always visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 flex items-center gap-5 group/btn"
          aria-expanded={isOpen}
        >
          {/* Icon */}
          <span
            className="text-3xl flex-shrink-0 transition-all duration-300"
            style={{
              color: isOpen ? domain.color : "var(--text-muted)",
              filter: isOpen ? `drop-shadow(0 0 10px ${domain.color})` : "none",
            }}
          >
            {domain.icon}
          </span>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-cinzel font-bold tracking-widest text-base md:text-lg transition-colors duration-300"
              style={{ color: isOpen ? "#fff" : "var(--text-primary)" }}
            >
              {domain.title}
            </h3>
            <p className="font-rajdhani text-xs tracking-widest mt-0.5 transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}>
              {domain.subtitle}
            </p>
          </div>

          {/* Arrow */}
          <motion.div
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-sm"
            style={{ border: `1px solid ${domain.color}40`, color: domain.color }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1 L6 11 M1 6 L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pl-[72px]">
                {/* Divider */}
                <div className="h-px mb-5" style={{ background: `${domain.color}30` }} />

                {/* Description */}
                <p className="font-rajdhani text-sm leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}>
                  {domain.description}
                </p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map(skill => (
                    <span
                      key={skill}
                      className="font-orbitron text-[9px] tracking-wider px-3 py-1.5 rounded-sm"
                      style={{
                        background: `${domain.color}12`,
                        border: `1px solid ${domain.color}35`,
                        color: domain.color,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${domain.color}, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isOpen ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function WhatIDo() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="whatido" className="relative py-24 px-4">
      <div className="absolute inset-0" style={{ background: "var(--bg-card)" }} />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            className="font-orbitron text-xs tracking-[0.4em] mb-3 uppercase"
            style={{ color: "var(--accent)" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          >
            Domains
          </motion.p>
          <motion.h2
            className="font-cinzel text-4xl md:text-5xl font-bold text-white text-glow-silver mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            WHAT I DO
          </motion.h2>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, var(--accent))" }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: "var(--accent)" }} />
            <div className="h-px w-20" style={{ background: "linear-gradient(to left, transparent, var(--accent))" }} />
          </motion.div>
          <motion.p
            className="mt-4 font-rajdhani text-sm tracking-widest"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            CLICK TO EXPAND EACH DOMAIN
          </motion.p>
        </div>

        {/* Domain cards */}
        <div className="flex flex-col gap-3">
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
