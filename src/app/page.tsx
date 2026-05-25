"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import SocialBar from "@/components/SocialBar";
import TechStack from "@/components/TechStack";
import AudioPlayer from "@/components/AudioPlayer";
import WhatIDo from "@/components/WhatIDo";
import MarqueeBar from "@/components/MarqueeBar";
import FallingLeaves from "@/components/FallingLeaves";

// SSR disabled for components that do floating-point SVG math or canvas
const CursorCat     = dynamic(() => import("@/components/CursorCat"),     { ssr: false });
const ProjectWheel  = dynamic(() => import("@/components/ProjectWheel"),  { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <main
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: "var(--bg)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <CursorCat />
        <AudioPlayer />
        <SocialBar />

        {/* ── Hero ── */}
        <HeroSection />

        {/* ── Marquee separator ── */}
        <MarqueeBar />

        {/* ── What I Do ── */}
        <WhatIDo />

        {/* ── Marquee separator (reverse) ── */}
        <MarqueeBar direction="right" speed={40} />

        {/* ── Project Wheels ── */}
        <section
          id="projects"
          className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4"
          style={{ background: "var(--bg)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(120,70,255,0.06) 0%, transparent 65%)" }}
          />

          <div className="relative z-10 w-full max-w-7xl">
            <div className="text-center mb-16">
              <span className="section-label">Portfolio</span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4" style={{ color: "var(--text)" }}>
                Select Your Domain
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-24" style={{ background: "linear-gradient(to right, transparent, var(--accent))" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(167,139,250,0.8)" }} />
                <div className="h-px w-24" style={{ background: "linear-gradient(to left, transparent, var(--accent))" }} />
              </div>
              <p className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--text-3)" }}>
                Hover · Click · Explore
              </p>
            </div>
            <ProjectWheel />
          </div>
        </section>

        {/* ── Marquee separator ── */}
        <MarqueeBar speed={35} />

        {/* ── Tech Stack ── */}
        <section
          id="tech"
          className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
          style={{ background: "var(--bg)" }}
        >
          {/* Falling leaves ambient effect */}
          <FallingLeaves />

          {/* Subtle vignette so leaves don't compete with text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,5,5,0.55) 100%)", zIndex: 1 }}
          />

          <div className="relative w-full max-w-6xl" style={{ zIndex: 2 }}>
            <TechStack />
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="relative py-8 text-center"
          style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "var(--text-3)" }}>
            © {new Date().getFullYear()} Danish Raimi · Built with passion
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: "var(--border-hover)" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 6px rgba(167,139,250,0.7)" }} />
            <div className="h-px w-12" style={{ background: "var(--border-hover)" }} />
          </div>
        </footer>
      </main>
    </>
  );
}
