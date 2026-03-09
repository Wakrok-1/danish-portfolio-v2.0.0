"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

interface Props {
  /** Items to display in the scrolling bar */
  items?: string[];
  /** Direction: left (default) or right */
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
  speed = 45,
}: Props) {
  return (
    <motion.div
      className="relative w-full overflow-hidden py-0"
      style={{
        borderTop:    "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background:   "rgba(9,16,30,0.6)",
        backdropFilter: "blur(6px)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-page), transparent)" }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-page), transparent)" }}
        aria-hidden="true"
      />

      <Marquee speed={speed} direction={direction} gradient={false}>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-5 mx-5 py-4">
            <span
              className="font-orbitron text-[11px] tracking-[0.3em] uppercase whitespace-nowrap"
              style={{ color: "var(--text-secondary)" }}
            >
              {item}
            </span>
            <span
              className="text-[7px]"
              style={{ color: "var(--accent)", opacity: 0.5 }}
              aria-hidden="true"
            >
              ◆
            </span>
          </span>
        ))}
      </Marquee>
    </motion.div>
  );
}
