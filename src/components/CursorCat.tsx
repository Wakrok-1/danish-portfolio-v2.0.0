"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// ─── Cat SVG ──────────────────────────────────────────────────────────────────
function CatSVG({
  isWalking,
  isClicking,
  blinkState,
}: {
  isWalking: boolean;
  isClicking: boolean;
  blinkState: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 100"
      width="56"
      height="70"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="catBodyGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </radialGradient>
        <radialGradient id="catEyeGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#33aa33" />
          <stop offset="100%" stopColor="#116611" />
        </radialGradient>
        <filter id="catGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow */}
      <ellipse
        cx="40" cy="97"
        rx="18" ry="4"
        fill="rgba(0,0,0,0.25)"
      />

      {/* Tail */}
      <motion.path
        d="M 52 72 Q 72 62 68 46 Q 66 38 58 40"
        stroke="#3a3a3a"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        animate={
          isWalking
            ? { d: ["M 52 72 Q 72 58 68 42 Q 66 34 58 36", "M 52 72 Q 72 68 66 52 Q 64 44 56 46", "M 52 72 Q 72 58 68 42 Q 66 34 58 36"] }
            : { d: ["M 52 72 Q 68 60 65 44", "M 52 72 Q 76 65 70 48", "M 52 72 Q 68 60 65 44"] }
        }
        transition={
          isWalking
            ? { duration: 0.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Body */}
      <motion.ellipse
        cx="38" cy="70"
        rx="20" ry="18"
        fill="url(#catBodyGrad)"
        animate={
          isClicking
            ? { ry: [18, 14, 18], cy: [70, 68, 70] }
            : {}
        }
        transition={{ duration: 0.2 }}
      />

      {/* Head */}
      <circle cx="40" cy="40" r="22" fill="url(#catBodyGrad)" />

      {/* Left ear outer */}
      <motion.polygon
        points="22,24 14,6 30,20"
        fill="#3a3a3a"
        animate={isWalking ? { rotate: [-5, 5, -5] } : {}}
        transition={{ duration: 0.4, repeat: Infinity }}
        style={{ transformOrigin: "22px 24px" }}
      />
      {/* Left ear inner */}
      <polygon points="21,22 16,10 27,19" fill="#CC4444" />

      {/* Right ear outer */}
      <motion.polygon
        points="58,24 66,6 50,20"
        fill="#3a3a3a"
        animate={isWalking ? { rotate: [5, -5, 5] } : {}}
        transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
        style={{ transformOrigin: "58px 24px" }}
      />
      {/* Right ear inner */}
      <polygon points="59,22 64,10 53,19" fill="#CC4444" />

      {/* Left eye white */}
      <ellipse cx="30" cy="37" rx="7" ry="8" fill="white" />
      {/* Left eye iris */}
      <ellipse
        cx="30" cy="38"
        rx={blinkState ? 4 : isClicking ? 2 : 4}
        ry={blinkState ? 0.8 : isClicking ? 3 : 6}
        fill="url(#catEyeGrad)"
        style={{ transition: "all 0.08s ease" }}
      />
      {/* Left pupil */}
      <ellipse
        cx="30" cy="38"
        rx={blinkState ? 2 : isClicking ? 1 : 2}
        ry={blinkState ? 0.4 : isClicking ? 2 : 4}
        fill="#111"
        style={{ transition: "all 0.08s ease" }}
      />
      {/* Left eye shine */}
      <circle cx="32" cy="35" r="1.5" fill="white" opacity={blinkState ? 0 : 0.9} />

      {/* Right eye white */}
      <ellipse cx="50" cy="37" rx="7" ry="8" fill="white" />
      {/* Right eye iris */}
      <ellipse
        cx="50" cy="38"
        rx={blinkState ? 4 : isClicking ? 2 : 4}
        ry={blinkState ? 0.8 : isClicking ? 3 : 6}
        fill="url(#catEyeGrad)"
        style={{ transition: "all 0.08s ease" }}
      />
      {/* Right pupil */}
      <ellipse
        cx="50" cy="38"
        rx={blinkState ? 2 : isClicking ? 1 : 2}
        ry={blinkState ? 0.4 : isClicking ? 2 : 4}
        fill="#111"
        style={{ transition: "all 0.08s ease" }}
      />
      {/* Right eye shine */}
      <circle cx="52" cy="35" r="1.5" fill="white" opacity={blinkState ? 0 : 0.9} />

      {/* Nose */}
      <polygon points="40,46 37,50 43,50" fill="#CC5555" />
      {/* Mouth */}
      <path d="M 37,50 Q 36,53 34,54" stroke="#888" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M 43,50 Q 44,53 46,54" stroke="#888" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Whiskers left */}
      <line x1="4" y1="43" x2="27" y2="46" stroke="#999" strokeWidth="0.8" opacity="0.7" />
      <line x1="4" y1="47" x2="27" y2="48" stroke="#999" strokeWidth="0.8" opacity="0.7" />
      <line x1="4" y1="51" x2="27" y2="50" stroke="#999" strokeWidth="0.8" opacity="0.7" />

      {/* Whiskers right */}
      <line x1="76" y1="43" x2="53" y2="46" stroke="#999" strokeWidth="0.8" opacity="0.7" />
      <line x1="76" y1="47" x2="53" y2="48" stroke="#999" strokeWidth="0.8" opacity="0.7" />
      <line x1="76" y1="51" x2="53" y2="50" stroke="#999" strokeWidth="0.8" opacity="0.7" />

      {/* Chest spot */}
      <ellipse cx="38" cy="65" rx="9" ry="7" fill="#555" opacity="0.6" />

      {/* Paws */}
      <motion.ellipse
        cx="24" cy="87"
        rx="11" ry="7"
        fill="#3a3a3a"
        animate={
          isWalking
            ? { cy: [87, 84, 87], rx: [11, 9, 11] }
            : {}
        }
        transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.ellipse
        cx="52" cy="87"
        rx="11" ry="7"
        fill="#3a3a3a"
        animate={
          isWalking
            ? { cy: [87, 84, 87], rx: [11, 9, 11] }
            : {}
        }
        transition={{ duration: 0.3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      />

      {/* Paw toe lines */}
      {[22, 25, 28].map((x) => (
        <line key={x} x1={x} y1="90" x2={x} y2="93" stroke="#222" strokeWidth="1" opacity="0.6" />
      ))}
      {[50, 53, 56].map((x) => (
        <line key={x} x1={x} y1="90" x2={x} y2="93" stroke="#222" strokeWidth="1" opacity="0.6" />
      ))}

      {/* Click sparkle effect */}
      {isClicking && (
        <>
          <motion.circle cx="20" cy="20" r="3" fill="#CC0000" opacity="0.8"
            initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 0], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 0.3 }}
          />
          <motion.circle cx="60" cy="20" r="3" fill="#CC0000" opacity="0.8"
            initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 0], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 0.3, delay: 0.05 }}
          />
          <motion.circle cx="40" cy="10" r="3" fill="#CC0000" opacity="0.8"
            initial={{ scale: 0 }} animate={{ scale: [0, 1.5, 0], opacity: [0.8, 0.4, 0] }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </>
      )}
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CursorCat() {
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const springConfig = { damping: 22, stiffness: 180, mass: 0.8 };
  const catX = useSpring(mouseX, springConfig);
  const catY = useSpring(mouseY, springConfig);

  const [isWalking, setIsWalking] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [blinkState, setBlinkState] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const blinkTimerRef = useRef<ReturnType<typeof setInterval>>();

  // Random blink
  const scheduleBlink = useCallback(() => {
    const delay = 2000 + Math.random() * 4000;
    blinkTimerRef.current = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 120);
    }, delay);
  }, []);

  useEffect(() => {
    scheduleBlink();
    return () => {
      clearInterval(blinkTimerRef.current);
    };
  }, [scheduleBlink]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 28);
      mouseY.set(e.clientY - 40);

      if (!isVisible) setIsVisible(true);
      setIsWalking(true);

      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsWalking(false);
      }, 200);
    };

    const handleDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 350);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      clearTimeout(idleTimerRef.current);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9998]"
          style={{ x: catX, y: catY }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: isClicking ? [1, 1.25, 0.95, 1] : 1,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            opacity: { duration: 0.3 },
            scale: isClicking
              ? { duration: 0.35, times: [0, 0.3, 0.7, 1] }
              : { duration: 0.3 },
          }}
        >
          {/* Idle float animation wrapper */}
          <motion.div
            animate={
              !isWalking
                ? { y: [0, -5, 0] }
                : { y: 0 }
            }
            transition={
              !isWalking
                ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
          >
            <CatSVG
              isWalking={isWalking}
              isClicking={isClicking}
              blinkState={blinkState}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
