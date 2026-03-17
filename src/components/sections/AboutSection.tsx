"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import ParallaxCircles from "@/components/ui/ParallaxCircles";
import { profile } from "@/data/profile";
import { Zap, Brain, Rocket } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const strengths = [
  {
    icon: Brain,
    title: "Vibe Coding",
    description: "AIを開発パートナーとして使いこなし、アイデアを最速でプロダクトに変換",
  },
  {
    icon: Rocket,
    title: "Ship Fast",
    description: "1ヶ月でアプリを企画・開発・ストア公開まで一人で完遂",
  },
  {
    icon: Zap,
    title: "Full Stack",
    description: "モバイル・Web・バックエンド・AI連携まで幅広く対応",
  },
];

const circles = [
  { x: "70%", y: "25%", size: 500, color: "rgba(124, 108, 240, 0.06)", speed: 0.2 },
  { x: "20%", y: "75%", size: 400, color: "rgba(167, 139, 250, 0.04)", speed: -0.25 },
  { x: "85%", y: "60%", size: 350, color: "rgba(124, 108, 240, 0.03)", speed: 0.15 },
];

const headingLine1 = "Building cool stuff";
const headingLine2 = "with AI.";

type Phase = "waiting" | "reveal" | "hold" | "settle" | "final";

function CharReveal({ text, isActive, baseDelay }: { text: string; isActive: boolean; baseDelay: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "120%", opacity: 0 }}
            animate={isActive ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              delay: baseDelay + i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export default function AboutSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-30%" });
  const [phase, setPhase] = useState<Phase>("waiting");

  const startSequence = useCallback(() => {
    setPhase("reveal");
    setTimeout(() => setPhase("hold"), 1400);
    setTimeout(() => setPhase("settle"), 2000);
    setTimeout(() => setPhase("final"), 3200);
  }, []);

  useEffect(() => {
    if (isInView && phase === "waiting") {
      startSequence();
    }
  }, [isInView, phase, startSequence]);

  const isActive = phase !== "waiting";
  const isGiant = phase === "reveal" || phase === "hold";
  const settled = phase === "settle" || phase === "final";
  const showContent = phase === "final";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="snap-section relative overflow-hidden"
    >
      <ParallaxCircles circles={circles} />

      {/* Background marquee */}
      {isActive && (
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-[0]">
          <motion.div
            className="whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="inline-flex"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {Array(4)
                .fill("BUILDING COOL STUFF WITH AI")
                .map((t, i) => (
                  <span
                    key={i}
                    className="inline-block px-8 font-[family-name:var(--font-display)] text-[10rem] sm:text-[14rem] font-bold text-foreground/[0.015] select-none leading-none tracking-tight"
                  >
                    {t}
                  </span>
                ))}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* ============================== */}
      {/* Giant heading — absolute centered on screen */}
      {/* ============================== */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6">
        <motion.div
          className="text-center will-change-transform"
          animate={
            settled
              ? { opacity: 0, scale: 0.9, filter: "blur(6px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.p
            className="text-accent font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isActive && !settled ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About
          </motion.p>

          <h2
            className="font-[family-name:var(--font-display)] font-bold tracking-tight leading-[1.1]"
            style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
          >
            <CharReveal text={headingLine1} isActive={isActive} baseDelay={0.15} />
            <br />
            <span className="gradient-text-accent">
              <CharReveal text={headingLine2} isActive={isActive} baseDelay={0.6} />
            </span>
          </h2>

          {/* Decorative line */}
          <motion.div
            className="mt-6 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto"
            initial={{ width: 0 }}
            animate={phase === "hold" ? { width: "40%" } : { width: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>
      </div>

      {/* ============================== */}
      {/* Settled heading + content      */}
      {/* ============================== */}
      <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16 flex flex-col min-h-screen">
        <div className="flex-1" />

        <div className="mb-8">
          {/* Small heading — fades in at final phase */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={showContent ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-accent font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              About
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-bold tracking-tight leading-[1.1]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              {headingLine1}
              <br />
              <span className="gradient-text-accent">{headingLine2}</span>
            </h2>
          </motion.div>
        </div>

        {/* Detail content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: intro text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                {profile.bio}
              </p>
              {!isMobile && (
                <p className="text-base text-foreground/80 leading-relaxed">
                  「これ面白そう」と思ったアイデアを、AIと一緒に形にするのが好きです。
                  AIに任せるところは任せ、自分はプロダクトの方向性や
                  ユーザー体験の設計に集中する。それが自分のスタイルです。
                </p>
              )}
            </motion.div>

            {/* Right: Strength cards */}
            <div className={isMobile ? "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2" : "space-y-4"}>
              {strengths.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className={isMobile ? "min-w-[240px] snap-center shrink-0" : ""}
                  initial={{ opacity: 0, x: 30 }}
                  animate={showContent ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                >
                  <motion.div
                    whileHover={{ x: 8, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="group p-5 sm:p-6 rounded-2xl bg-card/40 border border-border hover:border-accent/30 transition-all duration-300"
                  >
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-xl mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-base text-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex-1" />
      </div>
    </section>
  );
}
