"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export default function MobileSkills() {
  return (
    <section className="px-6 py-12 border-t border-border/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[3px] uppercase mb-4">
          Skills
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-2.5">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-card/40 border border-border rounded-xl p-3.5"
          >
            <h4 className="text-xs font-semibold text-foreground font-[family-name:var(--font-display)] mb-2">
              {cat.category}
            </h4>
            <div className="flex flex-wrap gap-1">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-2 py-0.5 text-[10px] text-foreground/60 bg-foreground/5 border border-border/50 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
