"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted,      setIsMuted]      = useState(false);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [hasInteracted,setHasInteracted]= useState(false);
  const [audioError,   setAudioError]   = useState(false);
  const [showTooltip,  setShowTooltip]  = useState(false);

  useEffect(() => {
    const tryPlay = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };
    window.addEventListener("click",   tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });
    window.addEventListener("scroll",  tryPlay, { once: true });
    return () => {
      window.removeEventListener("click",   tryPlay);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("scroll",  tryPlay);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isPlaying) {
      audio.volume = 0.2;
      audio.play().then(() => { setIsPlaying(true); setIsMuted(false); }).catch(() => setAudioError(true));
      return;
    }
    audio.muted = !isMuted;
    audio.volume = 0.2;
    setIsMuted(!isMuted);
  };

  const bars = [3, 5, 4, 6, 3, 5, 4];
  const active = isPlaying && !isMuted && !audioError;

  return (
    <>
      <audio ref={audioRef} src="/audio/relaxed.mp3" loop preload="auto"
        onError={() => setAudioError(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <motion.div className="audio-btn" initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.8, duration: 0.5 }}>
        <div className="relative">
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
              >
                <div className="font-mono text-[9px] tracking-wide bg-[var(--surface)] px-3 py-1.5 rounded-md"
                  style={{ color: "var(--text-2)", border: "1px solid var(--border)" }}>
                  {audioError ? "No audio file" : active ? "Mute" : "Play music"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleMute}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={active ? "Mute music" : "Play music"}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer"
            style={{
              border: `1px solid ${active ? "rgba(var(--accent-rgb),0.4)" : "var(--border)"}`,
              color: active ? "var(--accent)" : "var(--text-3)",
              background: "rgba(10,10,10,0.85)",
              backdropFilter: "blur(8px)",
            }}
            whileHover={{ scale: audioError ? 1 : 1.04 }}
            whileTap={{ scale: audioError ? 1 : 0.96 }}
          >
            {active ? (
              <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                    animate={{ height: [`${h * 2}px`, `${(h + 3) * 2}px`, `${h * 2}px`] }}
                    transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
                  />
                ))}
              </div>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {audioError ? (
                  <>
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M11.5 5.5L8 9H4v6h4l3.5 3.5" />
                  </>
                ) : (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </>
                )}
              </svg>
            )}
            <span className="font-mono text-[9px] tracking-wide">
              {audioError ? "No audio" : active ? "Playing" : "Music"}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
