"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Level = 1 | 2 | 3;

interface Tech   { name: string; level: Level; }
interface Cat    { id: string; title: string; subtitle: string; techs: Tech[]; }

const LEVEL_LABEL: Record<Level, string> = { 1: "Learning", 2: "Proficient", 3: "Expert" };

const CATEGORIES: Cat[] = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core & Systems",
    techs: [
      { name: "Python",     level: 3 },
      { name: "JavaScript", level: 2 },
      { name: "TypeScript", level: 2 },
      { name: "C",          level: 2 },
      { name: "C++",        level: 2 },
      { name: "Java",       level: 2 },
      { name: "C#",         level: 1 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "UI / UX Engineering",
    techs: [
      { name: "HTML5",         level: 3 },
      { name: "CSS3",          level: 3 },
      { name: "React",         level: 2 },
      { name: "Next.js",       level: 2 },
      { name: "Tailwind CSS",  level: 2 },
      { name: "Framer Motion", level: 1 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Server & API Development",
    techs: [
      { name: "Node.js",    level: 2 },
      { name: "Express.js", level: 1 },
      { name: "FastAPI",    level: 2 },
      { name: "REST API",   level: 2 },
      { name: ".NET",       level: 1 },
    ],
  },
  {
    id: "database",
    title: "Database",
    subtitle: "Data Storage & Querying",
    techs: [
      { name: "SQL",      level: 3 },
      { name: "Supabase", level: 2 },
      { name: "MySQL",    level: 2 },
      { name: "MongoDB",  level: 1 },
    ],
  },
  {
    id: "aiml",
    title: "AI / Data Science",
    subtitle: "ML · Analytics · NLP",
    techs: [
      { name: "Pandas",              level: 3 },
      { name: "NumPy",               level: 3 },
      { name: "Matplotlib",          level: 3 },
      { name: "Seaborn",             level: 3 },
      { name: "Scikit-learn",        level: 3 },
      { name: "EDA",                 level: 3 },
      { name: "TensorFlow",          level: 2 },
      { name: "PyTorch",             level: 2 },
      { name: "Data Cleaning",       level: 2 },
      { name: "Feature Engineering", level: 2 },
      { name: "Deep Learning",       level: 2 },
      { name: "HuggingFace",         level: 1 },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    subtitle: "Development Workflow",
    techs: [
      { name: "VS Code", level: 3 },
      { name: "Jupyter", level: 3 },
      { name: "Git",     level: 2 },
      { name: "GitHub",  level: 2 },
      { name: "Power BI",level: 2 },
      { name: "Docker",  level: 1 },
    ],
  },
];

function LevelDots({ level }: { level: Level }) {
  return (
    <div className="dot-level" title={LEVEL_LABEL[level]} aria-label={LEVEL_LABEL[level]}>
      {[1, 2, 3].map(n => (
        <span key={n} className={n <= level ? "dot-filled" : "dot-empty"} />
      ))}
    </div>
  );
}

function TechBadge({ tech, delay }: { tech: Tech; delay: number }) {
  return (
    <motion.div
      className="group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg cursor-default"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ borderColor: "var(--border-hover)", y: -2 }}
    >
      <span className="font-body text-xs font-medium whitespace-nowrap" style={{ color: "var(--text-2)" }}>
        {tech.name}
      </span>
      <LevelDots level={tech.level} />
    </motion.div>
  );
}

function CategoryCard({ cat }: { cat: Cat }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className="rounded-xl overflow-hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top accent */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)", opacity: 0.5 }} />

      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-heading font-semibold text-sm text-[var(--text)]">{cat.title}</h3>
            <p className="font-body text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{cat.subtitle}</p>
          </div>
          <span className="font-mono text-[9px] tracking-wide px-2 py-1 rounded"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-3)" }}>
            {cat.techs.length} skills
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {cat.techs.map((tech, i) => (
            <TechBadge key={tech.name} tech={tech} delay={inView ? i * 0.035 : 0} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const hRef  = useRef<HTMLDivElement>(null);
  const hView = useInView(hRef, { once: true });

  return (
    <div className="w-full">
      {/* Header */}
      <div ref={hRef} className="text-center mb-12">
        <motion.span
          className="section-label"
          initial={{ opacity: 0 }} animate={hView ? { opacity: 1 } : {}}
        >
          Arsenal
        </motion.span>
        <motion.h2
          className="font-heading font-bold text-4xl md:text-5xl text-[var(--text)] mb-3"
          initial={{ opacity: 0, y: 20 }} animate={hView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>
        <motion.p
          className="font-body text-sm"
          style={{ color: "var(--text-3)" }}
          initial={{ opacity: 0 }} animate={hView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Technologies I build with
        </motion.p>
      </div>

      {/* Legend */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-6 rounded-xl px-7 py-4 mb-10 mx-auto max-w-md"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: "var(--text-3)" }}>
          Skill Level
        </span>
        {([1, 2, 3] as Level[]).map(lvl => (
          <div key={lvl} className="flex items-center gap-2">
            <LevelDots level={lvl} />
            <span className="font-body text-xs" style={{ color: "var(--text-2)" }}>{LEVEL_LABEL[lvl]}</span>
          </div>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className={i === CATEGORIES.length - 1 && CATEGORIES.length % 2 !== 0 ? "md:col-span-2" : ""}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
          >
            <CategoryCard cat={cat} />
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.2 }}
      >
        {[
          { num: "20+", label: "Technologies" },
          { num: "6",   label: "Domains" },
          { num: "∞",   label: "Learning" },
          { num: "1",   label: "Goal: Excellence" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl p-5 text-center"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="font-heading font-bold text-3xl mb-1" style={{ color: "var(--accent)" }}>
              {s.num}
            </div>
            <div className="font-mono text-[9px] tracking-wide uppercase" style={{ color: "var(--text-3)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
