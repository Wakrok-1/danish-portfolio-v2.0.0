"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "coming-soon" | "live" | "wip";
}

interface WheelSegment {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
}

interface WheelConfig {
  id: string;
  title: string;
  subtitle: string;
  segments: WheelSegment[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const WHEELS: WheelConfig[] = [
  {
    id: "software",
    title: "SOFTWARE ENGINEERING",
    subtitle: "Full Stack Portfolio",
    segments: [
      { id: "frontend",  label: "Frontend",  sublabel: "UI · React · Next.js",       icon: "⬡", color: "#0EA5E9" },
      { id: "backend",   label: "Backend",   sublabel: "APIs · Python · Node.js",    icon: "◈", color: "#38BDF8" },
      { id: "fullstack", label: "Full Stack",sublabel: "End-to-End · SaaS · Apps",   icon: "◆", color: "#0369A1" },
    ],
  },
  {
    id: "datascience",
    title: "DATA SCIENCE",
    subtitle: "AI / ML Portfolio",
    segments: [
      { id: "analysis",       label: "Data Analysis",    sublabel: "EDA · Pandas · Viz",          icon: "◉", color: "#0EA5E9" },
      { id: "ml",             label: "Machine Learning", sublabel: "Scikit · TensorFlow · PyTorch",icon: "⬢", color: "#38BDF8" },
      { id: "nlp",            label: "NLP",              sublabel: "Transformers · BERT · Text",   icon: "◈", color: "#0369A1" },
      { id: "dataengineering",label: "Data Engineering", sublabel: "ETL · Pipelines · SQL",        icon: "◆", color: "#0EA5E9" },
    ],
  },
];

// Placeholder projects per segment
const PROJECTS: Record<string, Project[]> = {
  frontend:        [
    { title: "Project Alpha",   description: "High-performance React app with modern UI patterns.",    tags: ["React","Next.js","TypeScript"],   status: "coming-soon" },
    { title: "Project Beta",    description: "Responsive landing pages and design systems.",            tags: ["Tailwind","Framer Motion"],       status: "coming-soon" },
    { title: "Project Gamma",   description: "Reusable component library.",                            tags: ["React","Storybook"],              status: "coming-soon" },
  ],
  backend:         [
    { title: "Project Delta",   description: "REST API with auth and rate limiting.",                  tags: ["Node.js","Express","PostgreSQL"],  status: "coming-soon" },
    { title: "Project Epsilon", description: "Microservices with Docker.",                             tags: ["Python","FastAPI","Docker"],       status: "coming-soon" },
  ],
  fullstack:       [
    { title: "Project Eta",     description: "Full-stack SaaS with real-time features.",               tags: ["Next.js","Node.js","MongoDB"],    status: "coming-soon" },
    { title: "Project Theta",   description: "Social platform with live chat.",                        tags: ["React","Socket.io"],              status: "coming-soon" },
  ],
  analysis:        [
    { title: "EDA Project",     description: "Exploratory analysis on public datasets.",               tags: ["Pandas","Matplotlib","Jupyter"],  status: "coming-soon" },
  ],
  ml:              [
    { title: "ML Classifier",   description: "Ensemble classification model.",                         tags: ["Scikit-learn","XGBoost"],         status: "coming-soon" },
    { title: "Deep Vision",     description: "CNN image classification with TensorFlow.",              tags: ["TensorFlow","Keras"],             status: "coming-soon" },
  ],
  nlp:             [
    { title: "Sentiment Engine",description: "Sentiment analysis using BERT.",                         tags: ["HuggingFace","BERT"],             status: "coming-soon" },
  ],
  dataengineering: [
    { title: "ETL Pipeline",    description: "Automated data warehouse pipeline.",                     tags: ["Airflow","Python","PostgreSQL"],  status: "coming-soon" },
  ],
};

// ─── SVG Math Helpers ─────────────────────────────────────────────────────────
// Deterministic string output to avoid SSR/CSR float mismatch
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return {
    xs: (cx + r * Math.cos(rad)).toFixed(3),
    ys: (cy + r * Math.sin(rad)).toFixed(3),
  };
}

function segPath(cx: number, cy: number, iR: number, oR: number, a0: number, a1: number): string {
  const si = polar(cx, cy, iR, a0);
  const so = polar(cx, cy, oR, a0);
  const eo = polar(cx, cy, oR, a1);
  const ei = polar(cx, cy, iR, a1);
  const lg = a1 - a0 > 180 ? 1 : 0;
  return `M ${si.xs} ${si.ys} L ${so.xs} ${so.ys} A ${oR} ${oR} 0 ${lg} 1 ${eo.xs} ${eo.ys} L ${ei.xs} ${ei.ys} A ${iR} ${iR} 0 ${lg} 0 ${si.xs} ${si.ys} Z`;
}

// ─── Wheel SVG ────────────────────────────────────────────────────────────────
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
  const IR = 72;  const OR = 210;
  const GAP = segments.length <= 3 ? 6 : 5;
  const span = 360 / segments.length;

  return (
    <svg viewBox="0 0 480 480" className="w-full h-full" aria-label="Project category wheel">
      <defs>
        {/* Outer decorative ring */}
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0EA5E9" stopOpacity="0.6" />
          <stop offset="50%"  stopColor="#0369A1" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#0F1828" />
          <stop offset="100%" stopColor="#060B14" />
        </radialGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer decorative rings */}
      <circle cx={CX} cy={CY} r={OR + 18} fill="none" stroke="rgba(14,165,233,0.10)" strokeWidth="1" strokeDasharray="5 10" />
      <circle cx={CX} cy={CY} r={OR + 10} fill="none" stroke="rgba(14,165,233,0.20)" strokeWidth="0.6" />

      {/* Tick marks — rounded to avoid hydration mismatch */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = i * 10;
        const p1 = polar(CX, CY, OR + 5,  angle);
        const p2 = polar(CX, CY, OR + 13, angle);
        const big = i % 9 === 0;
        return (
          <line
            key={i}
            x1={p1.xs} y1={p1.ys}
            x2={p2.xs} y2={p2.ys}
            stroke={big ? "rgba(14,165,233,0.7)" : "rgba(14,165,233,0.18)"}
            strokeWidth={big ? "1.5" : "0.5"}
          />
        );
      })}

      {/* Segments */}
      {segments.map((seg, i) => {
        const a0  = i * span + GAP / 2;
        const a1  = (i + 1) * span - GAP / 2;
        const mid = (a0 + a1) / 2;
        const isHov = hoveredId === seg.id;
        const isSel = selectedId === seg.id;

        const labelPos  = polar(CX, CY, (IR + OR) / 2 + 28, mid);
        const iconPos   = polar(CX, CY, (IR + OR) / 2 - 28, mid);

        const push = isSel ? 8 : isHov ? 4 : 0;
        const dx   = push > 0 ? polar(0, 0, push, mid).xs : "0";
        const dy   = push > 0 ? polar(0, 0, push, mid).ys : "0";

        return (
          <g
            key={seg.id}
            transform={`translate(${dx},${dy})`}
            onClick={() => onSelect(seg.id)}
            onMouseEnter={() => onHover(seg.id)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label={`Select ${seg.label}`}
            onKeyDown={e => e.key === "Enter" && onSelect(seg.id)}
          >
            <path
              d={segPath(CX, CY, IR, OR, a0, a1)}
              fill={isSel ? `${seg.color}1A` : isHov ? `${seg.color}12` : "rgba(15,24,40,0.85)"}
              stroke={isSel ? seg.color : isHov ? `${seg.color}88` : "rgba(14,165,233,0.18)"}
              strokeWidth={isSel ? "1.5" : "0.8"}
              style={{
                filter: isSel || isHov ? `drop-shadow(0 0 10px ${seg.color}99)` : "none",
                transition: "all 0.3s ease",
              }}
            />

            {/* Segment icon */}
            <text
              x={iconPos.xs} y={iconPos.ys}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="22"
              fill={isSel || isHov ? seg.color : "#5A7A9A"}
              style={{
                filter: isSel || isHov ? `drop-shadow(0 0 8px ${seg.color})` : "none",
                transition: "all 0.3s ease",
                fontFamily: "monospace",
              }}
            >
              {seg.icon}
            </text>

            {/* Segment label */}
            <text
              x={labelPos.xs} y={labelPos.ys}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11"
              fontFamily="var(--font-orbitron), monospace"
              fontWeight="700"
              letterSpacing="1.2"
              fill={isSel || isHov ? "#FFFFFF" : "#6A8FAA"}
              style={{ transition: "all 0.3s ease" }}
            >
              {seg.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Inner circle */}
      <circle cx={CX} cy={CY} r={IR} fill="url(#centerGrad)" stroke="rgba(14,165,233,0.4)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={IR - 8} fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="0.5" strokeDasharray="3 6" />

      {/* Center text */}
      <text
        x={CX} y={CY - 10}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="26" fill="#0EA5E9"
        style={{ filter: "drop-shadow(0 0 10px rgba(14,165,233,0.9))", fontFamily: "monospace" }}
      >
        {selectedId ? segments.find(s => s.id === selectedId)?.icon ?? "◆" : "◆"}
      </text>
      <text
        x={CX} y={CY + 14}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="8"
        fontFamily="var(--font-orbitron), monospace"
        fontWeight="600"
        letterSpacing="2"
        fill="#4A6880"
      >
        {selectedId ? segments.find(s => s.id === selectedId)?.label?.toUpperCase() : "SELECT"}
      </text>
    </svg>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      className="relative rounded-sm p-5 overflow-hidden group"
      style={{
        background: "rgba(15,24,40,0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border)",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }} />

      <div className="absolute top-4 right-4">
        <span className="font-orbitron text-[8px] tracking-widest px-2 py-0.5 rounded-sm"
          style={{ background: "rgba(14,165,233,0.1)", color: "var(--accent)", border: "1px solid var(--border)" }}>
          COMING SOON
        </span>
      </div>

      <div className="font-orbitron text-[10px] mb-3" style={{ color: "var(--accent-dim)" }}>
        PROJECT_{String(index + 1).padStart(2, "0")}
      </div>

      <h4 className="font-cinzel text-sm font-bold mb-2 transition-colors duration-300"
        style={{ color: "var(--text-primary)" }}>
        {project.title}
      </h4>

      <p className="font-rajdhani text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className="font-orbitron text-[8px] tracking-wide px-2 py-0.5 rounded-sm"
            style={{ background: "rgba(14,165,233,0.08)", border: "1px solid var(--border)", color: "var(--accent)" }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Single Wheel Panel ────────────────────────────────────────────────────────
function WheelPanel({ wheel }: { wheel: WheelConfig }) {
  const [hovered,  setHovered]  = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelected(prev => (prev === id ? null : id));
  }, []);

  const selectedSeg = wheel.segments.find(s => s.id === selected);
  const projects    = selected ? (PROJECTS[selected] ?? []) : [];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Title */}
      <div className="text-center">
        <h3 className="font-cinzel text-lg font-bold tracking-widest text-white mb-1">{wheel.title}</h3>
        <p className="font-rajdhani text-sm tracking-widest" style={{ color: "var(--text-secondary)" }}>{wheel.subtitle}</p>
      </div>

      {/* Wheel */}
      <motion.div
        className="relative"
        style={{ width: "min(420px, 90vw)", height: "min(420px, 90vw)" }}
        initial={{ opacity: 0, scale: 0.7, rotate: -25 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer ambient glow */}
        <div className="absolute inset-[-12px] rounded-full pointer-events-none"
          style={{ boxShadow: selected ? "0 0 50px rgba(14,165,233,0.25)" : "0 0 20px rgba(14,165,233,0.08)" }} />

        <WheelSVG
          segments={wheel.segments}
          hoveredId={hovered}
          selectedId={selected}
          onHover={setHovered}
          onSelect={handleSelect}
        />
      </motion.div>

      {/* Segment info */}
      <AnimatePresence>
        {selectedSeg && (
          <motion.div
            className="w-full rounded-sm p-4"
            style={{ background: "rgba(15,24,40,0.7)", border: "1px solid var(--border)" }}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" style={{ filter: "drop-shadow(0 0 8px rgba(14,165,233,0.9))" }}>{selectedSeg.icon}</span>
              <div>
                <h4 className="font-cinzel text-sm font-bold tracking-wide text-white">{selectedSeg.label}</h4>
                <p className="font-rajdhani text-xs" style={{ color: "var(--text-secondary)" }}>{selectedSeg.sublabel}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover hint */}
      <AnimatePresence>
        {hovered && !selected && (
          <motion.p className="font-orbitron text-[10px] tracking-widest text-center"
            style={{ color: "var(--accent)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {wheel.segments.find(s => s.id === hovered)?.sublabel}
          </motion.p>
        )}
      </AnimatePresence>

      {!selected && (
        <motion.p className="font-orbitron text-[9px] tracking-[0.3em]" style={{ color: "var(--text-muted)" }}
          animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }}>
          CLICK A SEGMENT TO EXPLORE
        </motion.p>
      )}

      {/* Project cards */}
      <AnimatePresence>
        {selected && projects.length > 0 && (
          <motion.div className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px flex-1" style={{ background: "var(--border)" }} />
              <span className="font-orbitron text-[10px] tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                {selectedSeg?.label?.toUpperCase()} PROJECTS
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

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ProjectWheel() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 justify-items-center">
        {WHEELS.map(wheel => (
          <WheelPanel key={wheel.id} wheel={wheel} />
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.4 }}>
        <div className="inline-flex items-center gap-4 rounded-sm px-8 py-4"
          style={{ background: "rgba(15,24,40,0.6)", border: "1px solid var(--border)" }}>
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
          <p className="font-rajdhani text-sm tracking-widest" style={{ color: "var(--text-secondary)" }}>
            Projects will be added as they are completed — the wheels will fill up.
          </p>
          <div className="w-1 h-1 rounded-full animate-pulse" style={{ background: "var(--accent)" }} />
        </div>
      </motion.div>
    </div>
  );
}
