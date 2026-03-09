"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import SocialBar from "@/components/SocialBar";
import TechStack from "@/components/TechStack";
import AudioPlayer from "@/components/AudioPlayer";
import WhatIDo from "@/components/WhatIDo";
import MarqueeBar from "@/components/MarqueeBar";

// SSR disabled for components that do floating-point SVG math or canvas — avoids hydration mismatch
const CursorCat    = dynamic(() => import("@/components/CursorCat"),    { ssr: false });
const ProjectWheel = dynamic(() => import("@/components/ProjectWheel"), { ssr: false });
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <main
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: "var(--bg-page)",
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
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, var(--bg-page) 0%, var(--bg-card) 50%, var(--bg-page) 100%)" }} />

          <div className="relative z-10 w-full max-w-7xl">
            <div className="text-center mb-16">
              <p className="font-orbitron text-xs tracking-[0.4em] mb-3 uppercase" style={{ color: "var(--accent)" }}>
                Portfolio
              </p>
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white text-glow-silver mb-4">
                SELECT YOUR DOMAIN
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-24" style={{ backgroundImage: `linear-gradient(to right, transparent, var(--accent))` }} />
                <div className="w-2 h-2 rotate-45" style={{ background: "var(--accent)" }} />
                <div className="h-px w-24" style={{ backgroundImage: `linear-gradient(to left, transparent, var(--accent))` }} />
              </div>
              <p className="mt-4 text-sm tracking-widest font-rajdhani" style={{ color: "var(--text-secondary)" }}>
                HOVER · CLICK · EXPLORE
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
          className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4"
        >
          <div className="absolute inset-0" style={{ background: "var(--bg-page)" }} />
          <div className="relative z-10 w-full max-w-6xl">
            <TechStack />
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="relative py-8 text-center" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-card)" }}>
          <p className="font-cinzel text-xs tracking-widest" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} DANISH RAIMI · DESIGNED WITH PASSION
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: "var(--border-hover)" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "var(--accent)" }} />
            <div className="h-px w-12" style={{ background: "var(--border-hover)" }} />
          </div>
        </footer>
      </main>
    </>
  );
}
