"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

interface Props {
  items?: string[];
  direction?: "left" | "right";
  speed?: number;
}

const DEFAULT_ITEMS = [
  "React", "Next.js", "Python", "TensorFlow", "Node.js",
  "PostgreSQL", "Docker", "Pandas", "Scikit-learn", "TypeScript",
  "Tailwind CSS", "PyTorch", "HuggingFace", "FastAPI", "MongoDB",
  "Jupyter", "Power BI", "Git", "REST API", "Supabase",
];

export default function MarqueeBar({
  items = DEFAULT_ITEMS,
  direction = "left",
  speed = 40,
}: Props) {
  return (
    <motion.div
      className="relative w-full overflow-hidden"
      style={{
        borderTop:    "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background:   "var(--surface)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--surface), transparent)" }} aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--surface), transparent)" }} aria-hidden="true" />

      <Marquee speed={speed} direction={direction} gradient={false}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-5 mx-5 py-3.5">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase whitespace-nowrap" style={{ color: "var(--text-3)" }}>
              {item}
            </span>
            <span className="text-[6px]" style={{ color: "var(--border-hover)" }} aria-hidden="true">
              /
            </span>
          </span>
        ))}
      </Marquee>
    </motion.div>
  );
}
