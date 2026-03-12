"use client";

import { motion } from "framer-motion";
import MotionDiv from "@/components/ui/MotionDiv";
import { skillCategories } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <MotionDiv>
          <p className="text-accent font-[family-name:var(--font-display)] text-sm font-medium tracking-widest uppercase mb-3">
            Skills
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            スキルセット
          </h2>
        </MotionDiv>

        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <MotionDiv key={cat.category} delay={catIdx * 0.1}>
              <div className="p-6 rounded-2xl bg-card/50 gradient-border h-full">
                <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-accent tracking-wide uppercase mb-4">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: catIdx * 0.1 + skillIdx * 0.05,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 text-sm text-foreground/80 bg-background rounded-lg border border-border hover:border-accent/40 hover:bg-accent/5 transition-colors cursor-default"
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
