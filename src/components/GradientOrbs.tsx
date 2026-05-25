"use client";

import { motion } from "framer-motion";

export default function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 — top-left, indigo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "600px",
          height: "600px",
          top: "-150px",
          left: "-120px",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(129,140,248,0.05) 55%, transparent 75%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — bottom-right, softer indigo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-100px",
          right: "-100px",
          background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, rgba(99,102,241,0.03) 55%, transparent 75%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.09, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
