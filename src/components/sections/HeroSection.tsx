"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { profile } from "@/data/profile";
import FloatingOrbs from "@/components/ui/FloatingOrbs";

// Loading total ≈ 6.2s. Hero starts during dissolve phase (at ~5.4s) for smooth overlap
const BASE_DELAY = 5.4;

// Phase timing (seconds after BASE_DELAY)
const PHASE = {
  NAME_START: 0,        // Name chars start appearing
  NAME_HOLD: 1.8,       // Hold the giant name
  NAME_SHRINK: 2.6,     // Name shrinks & becomes marquee
  CONTENT_IN: 3.2,      // Tag, title, bio, stats fade in
};

const stats = [
  { value: "1", unit: "ヶ月", label: "でアプリ開発・公開" },
  { value: "2", unit: "Platform", label: "iOS / Android対応" },
  { value: "AI", unit: "Driven", label: "バイブコーディング" },
];

// Split name into characters for staggered reveal
const nameChars = profile.name.split("");

type HeroPhase = "waiting" | "name-reveal" | "name-hold" | "transition" | "final";

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<HeroPhase>("waiting");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const startSequence = useCallback(() => {
    setPhase("name-reveal");
    setTimeout(() => setPhase("name-hold"), (PHASE.NAME_HOLD) * 1000);
    setTimeout(() => setPhase("transition"), (PHASE.NAME_SHRINK) * 1000);
    setTimeout(() => setPhase("final"), (PHASE.CONTENT_IN) * 1000);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(startSequence, BASE_DELAY * 1000);
    return () => clearTimeout(timeout);
  }, [startSequence]);

  const showGiantName = phase === "name-reveal" || phase === "name-hold";
  const isTransitioning = phase === "transition";
  const isFinal = phase === "final";
  const showContent = isFinal;
  const showMarquee = isTransitioning || isFinal;

  return (
    <section
      ref={ref}
      id="hero"
      className="snap-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise"
    >
      {/* Background layers with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <FloatingOrbs />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent/[0.07] blur-[150px] pointer-events-none" />
      </motion.div>

      {/* ============================================ */}
      {/* Phase 1: Giant name, centered, fills viewport */}
      {/* ============================================ */}
      <AnimatePresence>
        {(showGiantName || isTransitioning) && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h1
              className="font-[family-name:var(--font-serif)] font-medium whitespace-nowrap will-change-transform"
              animate={
                isTransitioning
                  ? { scale: 0.3, y: -100, opacity: 0 }
                  : { scale: 1, y: 0, opacity: 1 }
              }
              transition={
                isTransitioning
                  ? { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                  : { duration: 0.3 }
              }
              style={{ fontSize: "clamp(3rem, 15vw, 12rem)" }}
            >
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <motion.span
                    className="inline-block gradient-text"
                    initial={{ y: "120%", rotateZ: 8, opacity: 0 }}
                    animate={{ y: "0%", rotateZ: 0, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: (char === " " ? 0 : i * 0.07),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Decorative line expanding under the name */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
              style={{ bottom: "38%" }}
              initial={{ width: 0 }}
              animate={{ width: phase === "name-hold" ? "60%" : "0%" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================ */}
      {/* Background marquee — name scrolls infinitely */}
      {/* ============================================ */}
      {showMarquee && (
        <div className="absolute inset-0 z-[1] flex flex-col justify-center overflow-hidden pointer-events-none">
          {/* Top marquee — right to left */}
          <motion.div
            className="whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: isFinal ? 0 : 0.4 }}
          >
            <motion.div
              className="inline-flex"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {Array(4)
                .fill(profile.name.toUpperCase())
                .map((t, i) => (
                  <span
                    key={i}
                    className="inline-block px-8 font-[family-name:var(--font-serif)] text-[8rem] sm:text-[10rem] md:text-[13rem] font-medium text-foreground/[0.025] select-none leading-none tracking-tight"
                  >
                    {t}
                  </span>
                ))}
            </motion.div>
          </motion.div>

          {/* Bottom marquee — left to right */}
          <motion.div
            className="whitespace-nowrap -mt-12 sm:-mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: isFinal ? 0.2 : 0.6 }}
          >
            <motion.div
              className="inline-flex"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              {Array(4)
                .fill(profile.name.toUpperCase())
                .map((t, i) => (
                  <span
                    key={i}
                    className="inline-block px-8 font-[family-name:var(--font-serif)] text-[8rem] sm:text-[10rem] md:text-[13rem] font-medium text-foreground/[0.02] select-none leading-none tracking-tight"
                  >
                    {t}
                  </span>
                ))}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ============================================ */}
      {/* Phase 3: Final hero content                  */}
      {/* ============================================ */}
      <motion.div
        style={{ y: textY, opacity: showContent ? opacity : 0 }}
        className="relative z-10 text-center px-8 sm:px-12 lg:px-16"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-accent border border-accent/20 rounded-full bg-accent/5 font-[family-name:var(--font-display)] tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Open to Work
          </span>
        </motion.div>

        {/* Name — compact version */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
          animate={showContent ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-serif)] font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[-0.01em] leading-[0.95] mb-6"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={showContent ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xl sm:text-2xl md:text-3xl text-muted font-light tracking-wide mb-4"
        >
          <span className="font-[family-name:var(--font-display)]">{profile.title}</span>
        </motion.p>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={showContent ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12"
        >
          {profile.bio}
        </motion.p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={
                showContent
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{ duration: 0.7, delay: 0.55 + i * 0.1 }}
              className="stat-card px-8 py-5 rounded-2xl bg-card/60 border border-border backdrop-blur-sm"
            >
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold gradient-text-accent">
                  {stat.value}
                </span>
                <span className="text-sm text-muted font-[family-name:var(--font-display)]">
                  {stat.unit}
                </span>
              </div>
              <p className="text-sm text-foreground/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/70 hover:text-accent transition-colors z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.a>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
