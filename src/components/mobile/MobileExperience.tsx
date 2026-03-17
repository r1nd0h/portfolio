"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export default function MobileExperience() {
  return (
    <section className="px-6 py-12 border-t border-border/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[3px] uppercase mb-4">
          Experience
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-card/40 border border-border rounded-2xl p-4"
          >
            <p className="text-accent text-[11px] font-[family-name:var(--font-display)] font-semibold tracking-[0.15em] uppercase mb-1.5">
              {exp.period}
            </p>
            <h4 className="font-bold text-foreground text-sm mb-0.5">
              {exp.title}
            </h4>
            {exp.organization && (
              <p className="text-xs text-foreground/50 mb-2">
                {exp.organization}
              </p>
            )}
            <p className="text-xs text-foreground/70 leading-relaxed">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
