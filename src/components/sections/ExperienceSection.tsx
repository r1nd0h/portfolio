"use client";

import { motion } from "framer-motion";
import MotionDiv from "@/components/ui/MotionDiv";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <MotionDiv>
          <p className="text-accent font-[family-name:var(--font-display)] text-sm font-medium tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            経歴
          </h2>
        </MotionDiv>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <MotionDiv key={exp.id} delay={idx * 0.15}>
                <div className="relative pl-12 sm:pl-20">
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 + 0.2, duration: 0.3 }}
                    className="absolute left-2.5 sm:left-6.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background"
                  />

                  {/* Period */}
                  <p className="text-xs text-accent font-[family-name:var(--font-display)] font-medium tracking-wide mb-1">
                    {exp.period}
                  </p>

                  {/* Card */}
                  <div className="p-5 rounded-xl bg-card/50 gradient-border">
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-lg mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-accent/70 mb-3">
                      {exp.organization}
                    </p>
                    <p className="text-sm text-muted leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
