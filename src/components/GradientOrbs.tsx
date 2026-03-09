"use client";

import { motion } from "framer-motion";

/**
 * Two large blurred rotating gradient circles inspired by MoncyDev's hero.
 * Blue/teal palette to match Danish's theme. Low opacity so they add depth
 * without overpowering the particle background.
 */
export default function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Orb 1 — top-left, blue */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "520px",
          height: "520px",
          top: "-120px",
          left: "-100px",
          background: "radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(3,105,161,0.08) 55%, transparent 75%)",
          filter: "blur(60px)",
        }}
        animate={{ rotate: 360, scale: [1, 1.06, 1] }}
        transition={{
          rotate: { duration: 22, repeat: Infinity, ease: "linear" },
          scale:  { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Orb 2 — bottom-right, teal */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "450px",
          height: "450px",
          bottom: "-80px",
          right: "-80px",
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(3,105,161,0.06) 55%, transparent 75%)",
          filter: "blur(55px)",
        }}
        animate={{ rotate: -360, scale: [1, 1.08, 1] }}
        transition={{
          rotate: { duration: 28, repeat: Infinity, ease: "linear" },
          scale:  { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
      />

      {/* Orb 3 — center, very subtle accent pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(122,191,237,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}
