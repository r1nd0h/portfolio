"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealText from "@/components/ui/RevealText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxCircles from "@/components/ui/ParallaxCircles";
import { experiences } from "@/data/experience";
const expCircles = [
  { x: "85%", y: "40%", size: 400, color: "rgba(124, 108, 240, 0.04)", speed: 0.2 },
  { x: "10%", y: "60%", size: 350, color: "rgba(167, 139, 250, 0.03)", speed: -0.15 },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const timelineProgress = useTransform(scrollYProgress, [0.15, 0.7], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="experience" className="snap-section relative py-28 sm:py-36 overflow-hidden">
      <ParallaxCircles circles={expCircles} />

      <div className="w-full px-8 sm:px-12 lg:px-16 relative">
        <ScrollReveal>
          <p className="text-accent font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Experience
          </p>
        </ScrollReveal>

        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16">
          <RevealText text="Background" delay={0.1} />
        </h2>

        <div className="relative">
          {/* Timeline line — animated fill on scroll */}
          <div className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-px bg-border/10">
            <motion.div
              className="w-full bg-gradient-to-b from-accent/50 via-accent/30 to-accent/0"
              style={{ height: timelineProgress }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <ScrollReveal key={exp.id} delay={idx * 0.15} direction="left">
                <div className="relative pl-10 sm:pl-14">
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: idx * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="absolute left-0 sm:left-1 top-2 w-[15px] h-[15px] rounded-full border-2 border-accent bg-background"
                  >
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-[-4px] rounded-full border border-accent/30"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                    />
                  </motion.div>

                  <motion.div
                    className="p-5 sm:p-6 rounded-2xl bg-card/30 border border-border hover:border-accent/20 transition-colors duration-300"
                    whileHover={{ x: 6, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-[11px] text-accent font-[family-name:var(--font-display)] font-semibold tracking-[0.15em] uppercase mb-2">
                      {exp.period}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] font-bold text-lg tracking-tight mb-1">
                      {exp.title}
                    </h3>
                    {exp.organization && (
                      <p className="text-sm text-foreground/80 mb-3">
                        {exp.organization}
                      </p>
                    )}
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {exp.description}
                    </p>
                  </motion.div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider mt-28 sm:mt-36 mx-8 sm:mx-12 lg:mx-16" />
    </section>
  );
}
