"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
type FireLevel = 1 | 2 | 3;

interface Tech {
  name: string;
  level: FireLevel; // 1=Learning  2=Good  3=Excellent
}

interface TechCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  techs: Tech[];
}

// ─── Skill Data ───────────────────────────────────────────────────────────────
const CATEGORIES: TechCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    subtitle: "Core & Systems",
    icon: "⌨",
    color: "#38BDF8",
    techs: [
      { name: "Python",      level: 3 },
      { name: "JavaScript",  level: 2 },
      { name: "TypeScript",  level: 2 },
      { name: "C",           level: 2 },
      { name: "C++",         level: 2 },
      { name: "Java",        level: 2 },
      { name: "C#",          level: 1 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "UI / UX Engineering",
    icon: "⬡",
    color: "#0EA5E9",
    techs: [
      { name: "HTML5",        level: 3 },
      { name: "CSS3",         level: 3 },
      { name: "React",        level: 2 },
      { name: "Next.js",      level: 1 },
      { name: "Tailwind CSS", level: 1 },
      { name: "Framer Motion",level: 1 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Server & API Development",
    icon: "◈",
    color: "#0369A1",
    techs: [
      { name: "Node.js",   level: 1 },
      { name: "Express.js",level: 1 },
      { name: "FastAPI",   level: 1 },
      { name: "REST API",  level: 1 },
      { name: ".NET",      level: 1 },
    ],
  },
  {
    id: "database",
    title: "Database",
    subtitle: "Data Storage & Querying",
    icon: "◉",
    color: "#0EA5E9",
    techs: [
      { name: "SQL",      level: 3 },
      { name: "Supabase", level: 2 },
      { name: "MySQL",    level: 1 },
      { name: "MongoDB",  level: 1 },
    ],
  },
  {
    id: "aiml",
    title: "AI / Data Science",
    subtitle: "ML · Analytics · NLP",
    icon: "◆",
    color: "#38BDF8",
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
    icon: "⬢",
    color: "#0EA5E9",
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

// ─── Spark Icon (Level 1 — Learning) ─────────────────────────────────────────
/**
 * A starburst spark: bright warm-white core, gold/orange radiating lines,
 * tiny ember dots at tips. Fast erratic animation — unstable, not yet a flame.
 */
function SparkIcon() {
  return (
    <svg
      width="24" height="24"
      viewBox="0 0 28 28"
      fill="none"
      className="flame-spark"
      style={{
        filter:
          "drop-shadow(0 0 5px rgba(255,224,130,0.90)) drop-shadow(0 0 10px rgba(255,140,66,0.45))",
        display: "block",
      }}
      aria-hidden="true"
    >
      {/* ── Bright warm-white core ── */}
      <circle cx="14" cy="14" r="2.8" fill="#FFF3E0" opacity="0.95" />
      <circle cx="14" cy="14" r="1.4" fill="#FFFFFF" />

      {/* ── Main long sparks (gold) ── */}
      {/* Straight up */}
      <line x1="14" y1="11" x2="14" y2="2.5"  stroke="#FFE082" strokeWidth="1.5" strokeLinecap="round" />
      {/* Up-right */}
      <line x1="16" y1="12" x2="22" y2="6.5"  stroke="#FFE082" strokeWidth="1.3" strokeLinecap="round" />
      {/* Up-left */}
      <line x1="12" y1="12" x2="6"  y2="6.5"  stroke="#FFE082" strokeWidth="1.3" strokeLinecap="round" />
      {/* Right */}
      <line x1="17" y1="14" x2="25" y2="14"   stroke="#FFB74D" strokeWidth="1.2" strokeLinecap="round" />
      {/* Left */}
      <line x1="11" y1="14" x2="3"  y2="14"   stroke="#FFB74D" strokeWidth="1.2" strokeLinecap="round" />

      {/* ── Secondary shorter sparks (orange) ── */}
      {/* Down-right */}
      <line x1="16" y1="16" x2="20" y2="20"   stroke="#FF8C42" strokeWidth="1.0" strokeLinecap="round" />
      {/* Down-left */}
      <line x1="12" y1="16" x2="8"  y2="20"   stroke="#FF8C42" strokeWidth="1.0" strokeLinecap="round" />
      {/* Straight down (shortest — sparks die downward) */}
      <line x1="14" y1="17" x2="14" y2="22"   stroke="#FF8C42" strokeWidth="0.8" strokeLinecap="round" />

      {/* ── Tiny glowing ember dots at main tips ── */}
      <circle cx="14"  cy="2.5"  r="1.1" fill="#FFD54F" opacity="0.85" />
      <circle cx="22"  cy="6.5"  r="0.9" fill="#FFD54F" opacity="0.75" />
      <circle cx="6"   cy="6.5"  r="0.9" fill="#FFD54F" opacity="0.75" />
      <circle cx="25"  cy="14"   r="0.8" fill="#FFB74D" opacity="0.65" />
      <circle cx="3"   cy="14"   r="0.8" fill="#FFB74D" opacity="0.65" />
    </svg>
  );
}

// ─── Flame Config (levels 2 & 3 only) ────────────────────────────────────────
const FLAME = {
  2: {
    w: 20, h: 28,
    cls: "flame-md",
    outerColor: "#D84315",
    midColor:   "#FF5500",
    coreColor:  "#FFCCBC",
    coreOpacity: 0.75,
    dropShadow: "drop-shadow(0 0 5px rgba(255,85,0,0.75))",
    label: "Good",
  },
  3: {
    w: 28, h: 40,
    cls: "flame-lg",
    outerColor: "#F57F17",
    midColor:   "#FFD600",
    coreColor:  "#FFFFFF",
    coreOpacity: 0.95,
    dropShadow: "drop-shadow(0 0 9px rgba(255,214,0,0.90)) drop-shadow(0 0 18px rgba(255,140,0,0.45))",
    label: "Excellent",
  },
} as const;

/**
 * Flame for levels 2 (Good) and 3 (Excellent).
 * Level 1 (Learning) is handled by SparkIcon above.
 */
function FlameIcon({ level, uid }: { level: 2 | 3; uid: string }) {
  const f   = FLAME[level];
  const gId = `fg-${uid}`;   // gradient ID  – unique per tech badge
  const iId = `fi-${uid}`;   // inner glow gradient

  return (
    <svg
      width={f.w}
      height={f.h}
      viewBox="0 0 28 40"
      fill="none"
      className={f.cls}
      style={{ filter: f.dropShadow, display: "block" }}
      aria-hidden="true"
    >
      <defs>
        {/* Main body gradient: hot bright core → rich orange → dark ember base */}
        <radialGradient id={gId} cx="50%" cy="72%" r="62%">
          <stop offset="0%"   stopColor={f.coreColor}  stopOpacity="0.9" />
          <stop offset="38%"  stopColor={f.midColor} />
          <stop offset="100%" stopColor={f.outerColor}  stopOpacity="0.65" />
        </radialGradient>

        {/* Inner hot-core overlay: white/bright centre that fades outward */}
        <radialGradient id={iId} cx="50%" cy="58%" r="42%">
          <stop offset="0%"   stopColor={f.coreColor}  stopOpacity={f.coreOpacity} />
          <stop offset="100%" stopColor={f.midColor}   stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Outer flame body ── organic teardrop with side cusps */}
      <path
        d="
          M 14 38
          C  7 38  2 32  2 25
          C  2 18  6 14  9 10
          C  8.5 15 11 17.5 11.5 18
          C 10.5 13.5 12.5  8 14  2
          C 15.5  8 17.5 13.5 16.5 18
          C 17 17.5 19.5 15 19 10
          C 22 14 26 18 26 25
          C 26 32 21 38 14 38 Z
        "
        fill={`url(#${gId})`}
      />

      {/* ── Inner hot-core blob ── */}
      <path
        d="
          M 14 32
          C 10.5 32  8 29.5  8 26.5
          C  8 23.5  9.5 21.5 12 20
          C 11.5 22.5 13 24 13 24
          C 13 21 13.5 17.5 14 15
          C 14.5 17.5 15 21 15 24
          C 15 24 16.5 22.5 16 20
          C 18.5 21.5 20 23.5 20 26.5
          C 20 29.5 17.5 32 14 32 Z
        "
        fill={`url(#${iId})`}
      />

      {/* ── Plasma tip (Excellent only) – white-hot point at the very tip ── */}
      {level === 3 && (
        <ellipse
          cx="14" cy="6"
          rx="2.5" ry="4"
          fill="rgba(255,255,255,0.85)"
          style={{ filter: "blur(1.2px)" }}
        />
      )}
    </svg>
  );
}

// ─── Unified skill icon router ────────────────────────────────────────────────
function SkillIcon({ level, uid }: { level: FireLevel; uid: string }) {
  if (level === 1) return <SparkIcon />;
  return <FlameIcon level={level} uid={uid} />;
}

// ─── Legend ───────────────────────────────────────────────────────────────────
const LEVEL_LABELS: Record<FireLevel, string> = {
  1: "Learning",
  2: "Good",
  3: "Excellent",
};

function FireLegend() {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-8 rounded-sm px-8 py-4 mb-10 mx-auto"
      style={{
        background: "rgba(15,24,40,0.75)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(10px)",
        maxWidth: "520px",
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-orbitron text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--text-muted)" }}>
        Skill Level
      </span>

      {([1, 2, 3] as FireLevel[]).map(lvl => (
        <div key={lvl} className="flex items-center gap-2.5">
          {/* Show real animated icon in legend — spark for 1, flame for 2/3 */}
          <SkillIcon level={lvl} uid={`legend-${lvl}`} />
          <span className="font-rajdhani text-sm font-semibold tracking-wide" style={{ color: "var(--text-secondary)" }}>
            {LEVEL_LABELS[lvl]}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// ─── Tech Badge ───────────────────────────────────────────────────────────────
function TechBadge({
  tech, color, delay,
}: {
  tech: Tech; color: string; delay: number;
}) {
  // Sanitise name into a CSS-safe ID fragment (remove spaces / special chars)
  const uid = tech.name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  return (
    <motion.div
      className="group relative flex flex-col items-center gap-2 px-4 pt-3 pb-2.5 rounded-sm overflow-hidden"
      style={{
        background: "rgba(9,16,30,0.7)",
        border: "1px solid var(--border)",
        minWidth: "92px",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      title={LEVEL_LABELS[tech.level]}
    >
      {/* Top micro-accent on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        aria-hidden="true"
      />

      {/* Tech name */}
      <span
        className="font-orbitron text-[10px] tracking-wide whitespace-nowrap"
        style={{ color: "var(--text-secondary)" }}
      >
        {tech.name}
      </span>

      {/* Spark (Learning) or Flame (Good / Excellent) */}
      <SkillIcon level={tech.level} uid={uid} />
    </motion.div>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ cat }: { cat: TechCategory }) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className="rounded-sm overflow-hidden"
      style={{ background: "rgba(15,24,40,0.6)", border: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${cat.color}, transparent)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl" style={{ color: cat.color, filter: `drop-shadow(0 0 8px ${cat.color}99)` }}>
            {cat.icon}
          </span>
          <div className="flex-1">
            <h3 className="font-cinzel text-white text-sm font-bold tracking-widest">{cat.title}</h3>
            <p className="font-rajdhani text-xs tracking-widest mt-0.5" style={{ color: "var(--text-secondary)" }}>
              {cat.subtitle}
            </p>
          </div>
          <span
            className="font-orbitron text-[9px] tracking-widest px-2 py-1 rounded-sm"
            style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}38`, color: cat.color }}
          >
            {cat.techs.length} SKILLS
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {cat.techs.map((tech, i) => (
            <TechBadge
              key={tech.name}
              tech={tech}
              color={cat.color}
              delay={inView ? i * 0.04 : 0}
            />
          ))}
        </div>
      </div>

      <div className="h-px w-full opacity-25" style={{ background: `linear-gradient(to right, transparent, ${cat.color}, transparent)` }} />
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function TechStack() {
  const hRef  = useRef<HTMLDivElement>(null);
  const hView = useInView(hRef, { once: true });

  return (
    <div className="w-full">
      {/* Section header */}
      <div ref={hRef} className="text-center mb-12">
        <motion.p
          className="font-orbitron text-xs tracking-[0.4em] mb-3 uppercase"
          style={{ color: "var(--accent)" }}
          initial={{ opacity: 0 }} animate={hView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
        >
          Arsenal
        </motion.p>
        <motion.h2
          className="font-cinzel text-4xl md:text-5xl font-bold text-white text-glow-silver mb-4"
          initial={{ opacity: 0, y: 24 }} animate={hView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          TECH STACK
        </motion.h2>
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }} animate={hView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
        >
          <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, var(--accent))" }} />
          <div className="w-2 h-2 rotate-45" style={{ background: "var(--accent)" }} />
          <div className="h-px w-24" style={{ background: "linear-gradient(to left, transparent, var(--accent))" }} />
        </motion.div>
        <motion.p
          className="mt-4 text-sm tracking-widest font-rajdhani"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }} animate={hView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
        >
          TECHNOLOGIES I WORK WITH
        </motion.p>
      </div>

      {/* 🔥 Legend */}
      <FireLegend />

      {/* Language placement note */}
      <motion.div
        className="mb-8 rounded-sm px-5 py-3 mx-auto max-w-xl text-center"
        style={{ background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.18)" }}
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-rajdhani text-xs" style={{ color: "var(--text-secondary)" }}>
          <span style={{ color: "var(--accent)" }}>ℹ</span>&nbsp; C, C++, and Java are listed under{" "}
          <strong className="text-white">Programming Languages</strong> — the foundational category where
          general-purpose languages live, separate from framework-specific skills.
        </p>
      </motion.div>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className={i === CATEGORIES.length - 1 && CATEGORIES.length % 2 !== 0 ? "md:col-span-2" : ""}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
          >
            <CategoryCard cat={cat} />
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <motion.div
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.3 }}
      >
        {[
          { num: "20+", label: "Technologies" },
          { num: "6",   label: "Domains" },
          { num: "∞",   label: "Learning" },
          { num: "1",   label: "Goal: Excellence" },
        ].map((s, i) => (
          <div key={i} className="rounded-sm p-4 text-center"
            style={{ background: "rgba(15,24,40,0.6)", border: "1px solid var(--border)" }}>
            <div className="font-cinzel text-3xl font-black mb-1" style={{ color: "var(--accent)", textShadow: "0 0 20px rgba(14,165,233,0.6)" }}>
              {s.num}
            </div>
            <div className="font-orbitron text-[9px]" style={{ color: "var(--text-muted)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
