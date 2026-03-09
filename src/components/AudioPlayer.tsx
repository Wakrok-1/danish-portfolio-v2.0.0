"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Try to start audio after first user interaction
  useEffect(() => {
    const tryPlay = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked — user will click the button
          });
      }
    };

    window.addEventListener("click", tryPlay, { once: true });
    window.addEventListener("keydown", tryPlay, { once: true });
    window.addEventListener("scroll", tryPlay, { once: true });

    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("keydown", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  }, [hasInteracted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying) {
      audio.volume = 0.25;
    audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => setAudioError(true));
      return;
    }

    audio.muted = !isMuted;
    audio.volume = 0.25;
    setIsMuted(!isMuted);
  };

  const handleError = () => {
    setAudioError(true);
  };

  // Bars animation data
  const bars = [3, 5, 4, 6, 3, 5, 4];

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src="/audio/relaxed.mp3"
        loop
        preload="auto"
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Player button */}
      <motion.div
        className="audio-btn"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <div className="relative">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
              >
                <div className="font-orbitron text-[9px] tracking-widest bg-black/90 px-3 py-1.5 rounded-sm" style={{ color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                  {audioError
                    ? "NO AUDIO FILE"
                    : isPlaying && !isMuted
                    ? "MUTE MUSIC"
                    : "PLAY MUSIC"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleMute}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={isMuted || !isPlaying ? "Play music" : "Mute music"}
            className="relative flex items-center gap-2 px-3 py-2 rounded-sm transition-all duration-300 overflow-hidden"
            style={{
              border: audioError ? "1px solid var(--border)" :
                isPlaying && !isMuted ? "1px solid rgba(14,165,233,0.55)" : "1px solid var(--border)",
              color: audioError ? "var(--text-muted)" :
                isPlaying && !isMuted ? "var(--accent)" : "var(--text-secondary)",
              background: "rgba(9,16,30,0.85)",
            }}
            whileHover={{ scale: audioError ? 1 : 1.05 }}
            whileTap={{ scale: audioError ? 1 : 0.95 }}
          >
            {/* Pulsing background when playing */}
            {isPlaying && !isMuted && !audioError && (
              <motion.div
                className="absolute inset-0" style={{ background: "rgba(14,165,233,0.05)" }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            )}

            {/* Music bars visualization OR mute icon */}
            {isPlaying && !isMuted && !audioError ? (
              <div className="flex items-end gap-0.5 h-4 relative z-10" aria-hidden="true">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full" style={{ background: "var(--accent)" }}
                    animate={{
                      height: [`${h * 2}px`, `${(h + 3) * 2}px`, `${h * 2}px`],
                    }}
                    transition={{
                      duration: 0.5 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.08,
                    }}
                  />
                ))}
              </div>
            ) : (
              <svg
                className="w-4 h-4 relative z-10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {audioError ? (
                  <>
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M11.5 5.5L8 9H4v6h4l3.5 3.5" />
                    <path d="M15.1 5.4A5 5 0 0 1 19 10" />
                  </>
                ) : isMuted ? (
                  <>
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
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

            <span className="font-orbitron text-[9px] tracking-widest relative z-10">
              {audioError ? "NO AUDIO" : isPlaying && !isMuted ? "PLAYING" : "MUSIC"}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
