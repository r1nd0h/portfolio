"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/ui/RevealText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxCircles from "@/components/ui/ParallaxCircles";
import { skillCategories } from "@/data/skills";
const skillCircles = [
  { x: "80%", y: "20%", size: 450, color: "rgba(124, 108, 240, 0.05)", speed: -0.2 },
  { x: "20%", y: "75%", size: 350, color: "rgba(167, 139, 250, 0.04)", speed: 0.3 },
];

function SkillBadge({
  name,
  delay,
}: {
  name: string;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.08,
        y: -3,
        boxShadow: "0 8px 30px rgba(124, 108, 240, 0.15)",
      }}
      className="px-4 py-2 text-sm text-foreground/70 bg-background/60 rounded-lg border border-border hover:border-accent/30 hover:text-foreground hover:bg-accent/5 transition-colors duration-200 cursor-default"
    >
      {name}
    </motion.span>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="snap-section relative py-28 sm:py-36 overflow-hidden">
      <ParallaxCircles circles={skillCircles} />

      <div className="w-full px-8 sm:px-12 lg:px-16 relative">
        <ScrollReveal>
          <p className="text-accent font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Skills
          </p>
        </ScrollReveal>

        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-16">
          <RevealText text="Tech Stack" delay={0.1} />
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIdx) => (
            <ScrollReveal
              key={cat.category}
              delay={catIdx * 0.1}
              direction={catIdx % 2 === 0 ? "left" : "right"}
            >
              <motion.div
                className="p-6 sm:p-7 rounded-2xl bg-card/30 border border-border hover:border-accent/20 transition-all duration-300 h-full"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="font-[family-name:var(--font-display)] text-[11px] font-bold text-accent tracking-[0.25em] uppercase mb-5">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, skillIdx) => (
                    <SkillBadge
                      key={skill.name}
                      name={skill.name}
                      delay={catIdx * 0.1 + skillIdx * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="section-divider mt-28 sm:mt-36 max-w-6xl mx-auto" />
    </section>
  );
}
