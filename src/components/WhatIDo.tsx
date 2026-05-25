"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import VoidBackground from "./VoidBackground";

interface Domain {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  color: string;
  icon: React.ReactNode;
}

function FrontendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function BackendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function DataIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function NLPIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const DOMAINS: Domain[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    subtitle: "Building interfaces people love",
    color: "#A78BFA",
    icon: <FrontendIcon />,
    description:
      "Crafting responsive, performant web interfaces with modern frameworks. I focus on clean component architecture, smooth animations, and pixel-perfect design implementation.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 / CSS3"],
  },
  {
    id: "backend",
    title: "Backend Development",
    subtitle: "Powering reliable server systems",
    color: "#A78BFA",
    icon: <BackendIcon />,
    description:
      "Designing scalable server-side systems and REST APIs. I build reliable backends with Python and Node.js, focusing on clean architecture and efficient data handling.",
    skills: ["Python", "Node.js", "FastAPI", "Express.js", "REST APIs", ".NET / C#"],
  },
  {
    id: "datascience",
    title: "Data Science & ML",
    subtitle: "Turning raw data into insight",
    color: "#A78BFA",
    icon: <DataIcon />,
    description:
      "Turning raw data into actionable knowledge. From exploratory analysis to building and deploying machine learning models, I work across the full data pipeline.",
    skills: ["Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "EDA", "Data Cleaning"],
  },
  {
    id: "nlp",
    title: "NLP & AI Engineering",
    subtitle: "Teaching machines language",
    color: "#A78BFA",
    icon: <NLPIcon />,
    description:
      "Working with transformer-based models and language understanding pipelines. Exploring how machines read, understand, and generate human language.",
    skills: ["HuggingFace", "BERT", "LLMs", "Feature Engineering", "Deep Learning", "NLP Pipelines"],
  },
];

function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="rounded-xl overflow-hidden transition-all duration-300"
        style={{
          background: isOpen ? "var(--surface-2)" : "var(--surface)",
          border: `1px solid ${isOpen ? "rgba(var(--accent-rgb), 0.25)" : "var(--border)"}`,
        }}
      >
        {/* Top accent when open */}
        {isOpen && (
          <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, var(--accent), transparent)` }} />
        )}

        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-6 py-5 flex items-center gap-4 cursor-pointer"
          aria-expanded={isOpen}
        >
          <span
            className="flex-shrink-0 p-2.5 rounded-lg transition-all duration-300"
            style={{
              background: isOpen ? "rgba(var(--accent-rgb), 0.12)" : "var(--surface-2)",
              color: isOpen ? "var(--accent)" : "var(--text-3)",
            }}
          >
            {domain.icon}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-base transition-colors duration-200"
              style={{ color: isOpen ? "var(--text)" : "var(--text-2)" }}>
              {domain.title}
            </h3>
            <p className="font-body text-sm mt-0.5" style={{ color: "var(--text-3)" }}>
              {domain.subtitle}
            </p>
          </div>

          <motion.div
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-md"
            style={{ color: isOpen ? "var(--accent)" : "var(--text-3)", border: "1px solid var(--border)" }}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1 L6 11 M1 6 L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        </button>

        {/* Expanded */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pl-[72px]">
                <div className="h-px mb-4" style={{ background: "var(--border)" }} />
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
                  {domain.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {domain.skills.map(skill => (
                    <span key={skill} className="badge">{skill}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function WhatIDo() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="whatido" className="relative py-28 px-4 overflow-hidden" style={{ background: "var(--surface)" }}>
      {/* Infinite Void ambient background */}
      <VoidBackground />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative max-w-3xl mx-auto" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          >
            Domains
          </motion.span>
          <motion.h2
            className="font-heading font-bold text-4xl md:text-5xl text-[var(--text)] mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            What I Do
          </motion.h2>
          <motion.p
            className="font-body text-sm" style={{ color: "var(--text-3)" }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Click to expand each domain
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {DOMAINS.map((domain, i) => (
            <DomainCard key={domain.id} domain={domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
