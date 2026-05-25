"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "coming-soon";
  url?: string;
}

interface WheelSegment {
  id: string;
  label: string;
  sublabel: string;
}

interface WheelConfig {
  id: string;
  title: string;
  subtitle: string;
  segments: WheelSegment[];
}

// ─── Data ───────────────────────────────────────────────────────────────────────
const WHEELS: WheelConfig[] = [
  {
    id: "web",
    title: "Web Development",
    subtitle: "Full-Stack & Frontend Projects",
    segments: [
      { id: "fullstack", label: "Full Stack",  sublabel: "Next.js · FastAPI · Supabase" },
      { id: "frontend",  label: "Frontend",    sublabel: "React · Vite · Tailwind" },
    ],
  },
  {
    id: "ai",
    title: "AI / Data",
    subtitle: "AI Engineering & Data Science",
    segments: [
      { id: "aieng",   label: "AI Engineering", sublabel: "Groq · Whisper · LLMs" },
      { id: "datasci", label: "Data Science",   sublabel: "Pandas · Scikit-learn · EDA" },
    ],
  },
];

const PROJECTS: Record<string, Project[]> = {
  fullstack: [
    {
      title: "InterviewIQ",
      description: "AI-powered mock interview platform with real-time feedback on speech, eye contact, posture, and answer quality using Groq LLMs and MediaPipe.",
      tags: ["Next.js", "TypeScript", "Groq Whisper", "MediaPipe", "Supabase"],
      status: "live",
      url: "https://interviewiq-omega.vercel.app",
    },
    {
      title: "HR Feedback System",
      description: "Factory complaint management system with a 5-stage closed-loop workflow, vendor management, AI auto-classification, and an analytics dashboard.",
      tags: ["FastAPI", "React", "Supabase", "Groq", "TanStack Query"],
      status: "live",
      url: "https://hrfeedbacksystem.vercel.app",
    },
  ],
  frontend: [
    {
      title: "SportAddict",
      description: "Sports gear service landing page with animated stat counters, sport-specific service panels, scroll reveal animations, and a dark neon aesthetic.",
      tags: ["React", "Vite", "Tailwind CSS", "Lucide React"],
      status: "live",
      url: "https://p1-seven-ruby.vercel.app/",
    },
    {
      title: "North Sumatra Travel",
      description: "Premium travel booking site for Lake Toba tours with curated 4-day itineraries, interactive booking form, journey map, and cultural highlights.",
      tags: ["HTML5", "CSS3"],
      status: "live",
      url: "https://north-sumatra-travel.vercel.app",
    },
  ],
  aieng: [
    {
      title: "InterviewIQ — AI Core",
      description: "Hybrid transcription engine (Web Speech live + Whisper accurate), Llama 3.3 70B answer scoring with STAR method detection, and stutter analysis.",
      tags: ["Groq Whisper", "Llama 3.3 70B", "MediaPipe", "Web Speech API"],
      status: "live",
      url: "https://interviewiq-omega.vercel.app",
    },
    {
      title: "HR AI Classifier",
      description: "Auto-classification, sentiment analysis, translation, and AI root-cause analysis built into the HR Feedback system using Groq Llama 3.3 70B.",
      tags: ["Groq", "Llama 3.3 70B", "FastAPI", "Python"],
      status: "live",
      url: "https://hrfeedbacksystem.vercel.app",
    },
  ],
  datasci: [
    {
      title: "Coming Soon",
      description: "Data science and machine learning projects are in progress and will be added as they are completed.",
      tags: ["Pandas", "Scikit-learn", "TensorFlow", "Jupyter"],
      status: "coming-soon",
    },
  ],
};

// ─── SVG Math ───────────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { xs: (cx + r * Math.cos(rad)).toFixed(3), ys: (cy + r * Math.sin(rad)).toFixed(3) };
}

function segPath(cx: number, cy: number, iR: number, oR: number, a0: number, a1: number): string {
  const si = polar(cx, cy, iR, a0);
  const so = polar(cx, cy, oR, a0);
  const eo = polar(cx, cy, oR, a1);
  const ei = polar(cx, cy, iR, a1);
  const lg = a1 - a0 > 180 ? 1 : 0;
  return `M ${si.xs} ${si.ys} L ${so.xs} ${so.ys} A ${oR} ${oR} 0 ${lg} 1 ${eo.xs} ${eo.ys} L ${ei.xs} ${ei.ys} A ${iR} ${iR} 0 ${lg} 0 ${si.xs} ${si.ys} Z`;
}

// ─── Wheel SVG ──────────────────────────────────────────────────────────────────
function WheelSVG({
  segments, hoveredId, selectedId, onHover, onSelect,
}: {
  segments: WheelSegment[];
  hoveredId: string | null;
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const CX = 240; const CY = 240;
  const IR = 68;  const OR = 208;
  const GAP  = 8;
  const span = 360 / segments.length;

  return (
    <svg viewBox="0 0 480 480" className="w-full h-full" aria-label="Project category wheel">
      <defs>
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </radialGradient>
      </defs>

      {/* Outer ring */}
      <circle cx={CX} cy={CY} r={OR + 14} fill="none" stroke="rgba(129,140,248,0.08)" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx={CX} cy={CY} r={OR + 7}  fill="none" stroke="rgba(129,140,248,0.12)" strokeWidth="0.5" />

      {/* Segments */}
      {segments.map((seg, i) => {
        const a0  = i * span + GAP / 2;
        const a1  = (i + 1) * span - GAP / 2;
        const mid = (a0 + a1) / 2;
        const isHov = hoveredId === seg.id;
        const isSel = selectedId === seg.id;
        const push  = isSel ? 7 : isHov ? 3 : 0;
        const dx = push > 0 ? polar(0, 0, push, mid).xs : "0";
        const dy = push > 0 ? polar(0, 0, push, mid).ys : "0";

        const labelPos = polar(CX, CY, (IR + OR) / 2 + 20, mid);
        const subPos   = polar(CX, CY, (IR + OR) / 2 - 22, mid);

        return (
          <g
            key={seg.id}
            transform={`translate(${dx},${dy})`}
            onClick={() => onSelect(seg.id)}
            onMouseEnter={() => onHover(seg.id)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: "pointer" }}
            role="button" tabIndex={0} aria-label={`Select ${seg.label}`}
            onKeyDown={e => e.key === "Enter" && onSelect(seg.id)}
          >
            <path
              d={segPath(CX, CY, IR, OR, a0, a1)}
              fill={isSel ? "rgba(129,140,248,0.14)" : isHov ? "rgba(129,140,248,0.08)" : "rgba(17,17,17,0.9)"}
              stroke={isSel ? "rgba(129,140,248,0.7)" : isHov ? "rgba(129,140,248,0.35)" : "rgba(255,255,255,0.07)"}
              strokeWidth={isSel ? "1.2" : "0.6"}
              style={{ transition: "all 0.25s ease" }}
            />
            <text
              x={labelPos.xs} y={labelPos.ys}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11"
              fontFamily="var(--font-heading), system-ui, sans-serif"
              fontWeight="600"
              fill={isSel || isHov ? "#F5F5F5" : "rgba(255,255,255,0.35)"}
              style={{ transition: "fill 0.25s ease" }}
            >
              {seg.label}
            </text>
            <text
              x={subPos.xs} y={subPos.ys}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7.5"
              fontFamily="var(--font-mono), monospace"
              fill={isSel || isHov ? "rgba(165,180,252,0.9)" : "rgba(255,255,255,0.2)"}
              style={{ transition: "fill 0.25s ease" }}
            >
              {seg.sublabel}
            </text>
          </g>
        );
      })}

      {/* Inner circle */}
      <circle cx={CX} cy={CY} r={IR} fill="url(#centerGrad)" stroke="rgba(129,140,248,0.2)" strokeWidth="0.8" />
      <circle cx={CX} cy={CY} r={IR - 10} fill="none" stroke="rgba(129,140,248,0.08)" strokeWidth="0.4" strokeDasharray="3 5" />
      <text
        x={CX} y={CY}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="9"
        fontFamily="var(--font-mono), monospace"
        fill="rgba(165,180,252,0.6)"
      >
        {selectedId ? "SELECTED" : "SELECT"}
      </text>
    </svg>
  );
}

// ─── Project Card ───────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="relative rounded-xl p-5 overflow-hidden group cursor-default"
      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, borderColor: "var(--border-hover)" }}
    >
      {/* Top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }} />

      {/* Status badge */}
      <div className="absolute top-4 right-4">
        {project.status === "live" ? (
          <span className="flex items-center gap-1.5 font-mono text-[8px] tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: "rgba(129,140,248,0.1)", color: "var(--accent)", border: "1px solid rgba(129,140,248,0.25)" }}>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)] animate-pulse inline-block" />
            Live
          </span>
        ) : project.status === "wip" ? (
          <span className="font-mono text-[8px] tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: "rgba(251,191,36,0.1)", color: "#FCD34D", border: "1px solid rgba(251,191,36,0.2)" }}>
            In Progress
          </span>
        ) : (
          <span className="font-mono text-[8px] tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: "var(--surface)", color: "var(--text-3)", border: "1px solid var(--border)" }}>
            Soon
          </span>
        )}
      </div>

      <h4 className="font-heading font-semibold text-sm mb-2 pr-16" style={{ color: "var(--text)" }}>
        {project.title}
      </h4>

      <p className="font-body text-xs leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tags.map(tag => (
          <span key={tag} className="badge">{tag}</span>
        ))}
      </div>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-wide transition-colors duration-200 cursor-pointer"
          style={{ color: "var(--text-3)" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--accent)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--text-3)"}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Live
        </a>
      )}
    </motion.div>
  );
}

// ─── Wheel Panel ────────────────────────────────────────────────────────────────
function WheelPanel({ wheel }: { wheel: WheelConfig }) {
  const [hovered,  setHovered]  = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelected(prev => (prev === id ? null : id));
  }, []);

  const projects = selected ? (PROJECTS[selected] ?? []) : [];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Title */}
      <div className="text-center">
        <h3 className="font-heading font-semibold text-lg text-[var(--text)] mb-0.5">{wheel.title}</h3>
        <p className="font-body text-sm" style={{ color: "var(--text-3)" }}>{wheel.subtitle}</p>
      </div>

      {/* Wheel */}
      <motion.div
        className="relative"
        style={{ width: "min(400px, 90vw)", height: "min(400px, 90vw)" }}
        initial={{ opacity: 0, scale: 0.75 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <WheelSVG
          segments={wheel.segments}
          hoveredId={hovered}
          selectedId={selected}
          onHover={setHovered}
          onSelect={handleSelect}
        />
      </motion.div>

      {/* Hint */}
      {!selected && (
        <motion.p
          className="font-mono text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "var(--text-3)" }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Click a segment to explore
        </motion.p>
      )}

      {/* Hover sublabel */}
      <AnimatePresence>
        {hovered && !selected && (
          <motion.p className="font-mono text-[9px] tracking-wide text-center" style={{ color: "var(--accent)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {wheel.segments.find(s => s.id === hovered)?.sublabel}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Project cards */}
      <AnimatePresence>
        {selected && projects.length > 0 && (
          <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1" style={{ background: "var(--border)" }} />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--text-3)" }}>
                {wheel.segments.find(s => s.id === selected)?.label}
              </span>
              <div className="h-px flex-1" style={{ background: "var(--border)" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────────
export default function ProjectWheel() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16 justify-items-center">
        {WHEELS.map(wheel => (
          <WheelPanel key={wheel.id} wheel={wheel} />
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-3 rounded-xl px-7 py-4"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
          <p className="font-body text-sm" style={{ color: "var(--text-2)" }}>
            More projects are in progress and will be added as they are completed.
          </p>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
        </div>
      </motion.div>
    </div>
  );
}
