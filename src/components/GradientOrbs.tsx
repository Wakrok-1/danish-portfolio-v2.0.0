"use client";

import { motion } from "framer-motion";

export default function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Center glow — hero focal point */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "700px",
          height: "700px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(120,80,255,0.14) 0%, rgba(167,139,250,0.06) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 1 — top-left, vibrant violet */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "650px",
          height: "650px",
          top: "-180px",
          left: "-150px",
          background: "radial-gradient(circle, rgba(120,60,255,0.22) 0%, rgba(167,139,250,0.10) 50%, transparent 72%)",
          filter: "blur(65px)",
        }}
        animate={{ scale: [1, 1.07, 1], x: [0, 20, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 — bottom-right, lavender */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "550px",
          height: "550px",
          bottom: "-130px",
          right: "-120px",
          background: "radial-gradient(circle, rgba(167,139,250,0.18) 0%, rgba(100,70,220,0.08) 50%, transparent 72%)",
          filter: "blur(55px)",
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0], y: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Orb 3 — top-right accent spark */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          top: "10%",
          right: "5%",
          background: "radial-gradient(circle, rgba(196,181,253,0.12) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}
