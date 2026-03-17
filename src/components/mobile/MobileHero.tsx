"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

export default function MobileHero() {
  return (
    <section className="px-6 pt-20 pb-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-accent border border-accent/20 rounded-full bg-accent/5 font-[family-name:var(--font-display)] tracking-wide mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Open to Work
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-[family-name:var(--font-serif)] font-medium text-[3rem] leading-[0.95] tracking-[-0.01em] mb-4"
      >
        <span className="gradient-text">{profile.name}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base text-foreground/60 font-[family-name:var(--font-display)]"
      >
        {profile.title}
      </motion.p>
    </section>
  );
}
