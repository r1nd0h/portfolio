"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const circles = [
  { x: -320, y: -180, size: 8, delay: 0 },
  { x: 280, y: -220, size: 6, delay: 0.03 },
  { x: -200, y: 260, size: 10, delay: 0.06 },
  { x: 350, y: 150, size: 7, delay: 0.09 },
  { x: -400, y: 50, size: 5, delay: 0.12 },
  { x: 100, y: -300, size: 9, delay: 0.15 },
  { x: -150, y: -280, size: 6, delay: 0.18 },
  { x: 250, y: 280, size: 8, delay: 0.21 },
  { x: -380, y: -100, size: 5, delay: 0.24 },
  { x: 420, y: -50, size: 7, delay: 0.27 },
  { x: -50, y: 350, size: 6, delay: 0.3 },
  { x: 180, y: -350, size: 10, delay: 0.33 },
  { x: -280, y: 180, size: 5, delay: 0.36 },
  { x: 320, y: -280, size: 8, delay: 0.39 },
  { x: -420, y: -250, size: 6, delay: 0.42 },
  { x: 50, y: 300, size: 7, delay: 0.05 },
  { x: -300, y: -50, size: 9, delay: 0.1 },
  { x: 380, y: 220, size: 5, delay: 0.2 },
  { x: -180, y: 120, size: 8, delay: 0.25 },
  { x: 150, y: -150, size: 6, delay: 0.35 },
  { x: -100, y: -380, size: 7, delay: 0.04 },
  { x: 300, y: 50, size: 5, delay: 0.08 },
  { x: -350, y: 300, size: 9, delay: 0.16 },
  { x: 200, y: 350, size: 6, delay: 0.22 },
  { x: -250, y: -320, size: 8, delay: 0.28 },
  { x: 400, y: -180, size: 5, delay: 0.34 },
  { x: -80, y: 200, size: 7, delay: 0.4 },
  { x: 280, y: -100, size: 10, delay: 0.14 },
  { x: -380, y: 220, size: 6, delay: 0.26 },
  { x: 120, y: 250, size: 8, delay: 0.38 },
];

type Phase =
  | "counting"
  | "hundred"
  | "gathering"
  | "gathered"
  | "flash"
  | "exploding"
  | "dissolving"
  | "done";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");

  const startSequence = useCallback(() => {
    setPhase("hundred");
    setTimeout(() => setPhase("gathering"), 600);
    setTimeout(() => setPhase("gathered"), 1400);
    setTimeout(() => setPhase("flash"), 1800);
    setTimeout(() => setPhase("exploding"), 2000);
    // Circles expand into big blurry orbs that match hero bg
    setTimeout(() => setPhase("dissolving"), 2800);
    setTimeout(() => setPhase("done"), 4200);
  }, []);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(100);
        setTimeout(startSequence, 400);
      }
    };

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [startSequence]);

  if (phase === "done") return null;

  const showCounter = phase === "counting" || phase === "hundred";
  const circlesVisible = phase !== "counting";
  const isDissolvingOrLater = phase === "dissolving";

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      // Background fades to transparent during dissolve to reveal page beneath
      animate={{
        backgroundColor:
          isDissolvingOrLater
            ? "rgba(5, 5, 8, 0)"
            : "rgba(5, 5, 8, 1)",
      }}
      transition={{ duration: isDissolvingOrLater ? 1.4 : 0 }}
    >
      {/* Circles */}
      {circlesVisible &&
        circles.map((circle, i) => {
          // Pick 4 circles to become hero background orbs
          const isOrbCandidate = i < 4;
          const isGathering = phase === "gathering";
          const isGathered = phase === "gathered" || phase === "flash";
          const isExploding = phase === "exploding";

          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: circle.size,
                height: circle.size,
              }}
              initial={{
                x: circle.x,
                y: circle.y,
                opacity: 0,
                scale: 0,
                background: "rgba(124, 108, 240, 0.4)",
              }}
              animate={
                isDissolvingOrLater
                  ? isOrbCandidate
                    ? {
                        // These circles grow into large blurry orbs
                        x: circle.x * 0.5,
                        y: circle.y * 0.5,
                        opacity: 0.15,
                        scale: 30,
                        background: "rgba(124, 108, 240, 0.3)",
                        filter: "blur(80px)",
                      }
                    : {
                        // Others fade out gently
                        x: circle.x * 1.5,
                        y: circle.y * 1.5,
                        opacity: 0,
                        scale: 0.5,
                        background: "rgba(124, 108, 240, 0.2)",
                      }
                  : isExploding
                    ? {
                        x: circle.x * 2.5,
                        y: circle.y * 2.5,
                        opacity: 0.6,
                        scale: 1,
                        background: "rgba(167, 139, 250, 0.5)",
                      }
                    : isGathered
                      ? {
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 2,
                          background: "rgba(124, 108, 240, 0.9)",
                        }
                      : isGathering
                        ? {
                            x: circle.x * 0.3,
                            y: circle.y * 0.3,
                            opacity: 0.7,
                            scale: 1.2,
                            background: "rgba(124, 108, 240, 0.6)",
                          }
                        : {
                            x: circle.x,
                            y: circle.y,
                            opacity: 0.5,
                            scale: 1,
                            background: "rgba(124, 108, 240, 0.4)",
                          }
              }
              transition={
                isDissolvingOrLater
                  ? {
                      duration: 1.4,
                      delay: isOrbCandidate ? i * 0.05 : circle.delay * 0.3,
                      ease: [0.25, 0.1, 0.25, 1],
                    }
                  : isExploding
                    ? {
                        duration: 0.8,
                        delay: circle.delay * 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }
                    : isGathered
                      ? {
                          duration: 0.4,
                          delay: circle.delay * 0.2,
                          ease: [0.76, 0, 0.24, 1],
                        }
                      : isGathering
                        ? {
                            duration: 0.8,
                            delay: circle.delay * 0.5,
                            ease: "easeInOut",
                          }
                        : {
                            duration: 0.6,
                            delay: circle.delay,
                            ease: "easeOut",
                          }
              }
            />
          );
        })}

      {/* Central flash */}
      {(phase === "flash" || phase === "exploding") && (
        <motion.div
          className="absolute rounded-full"
          style={{
            background: "rgba(124, 108, 240, 0.3)",
            filter: "blur(60px)",
          }}
          initial={{ width: 30, height: 30, opacity: 1 }}
          animate={
            phase === "flash"
              ? { width: 80, height: 80, opacity: 1 }
              : { width: 800, height: 800, opacity: 0 }
          }
          transition={
            phase === "flash"
              ? { duration: 0.2 }
              : { duration: 1.0, ease: [0.22, 1, 0.36, 1] }
          }
        />
      )}

      {/* Counter */}
      <motion.div
        className="relative z-10"
        animate={
          showCounter
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.8, filter: "blur(20px)" }
        }
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="flex items-baseline gap-0.5">
          <motion.span
            className="font-[family-name:var(--font-display)] text-7xl sm:text-9xl font-extralight tracking-[-0.05em] text-foreground/90"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {count}
          </motion.span>
        </div>

        <div className="mt-6 w-48 sm:w-64 h-px bg-border/20 mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-accent/50"
            style={{ width: `${count}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
