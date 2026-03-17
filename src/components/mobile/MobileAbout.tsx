"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function MobileAbout() {
  return (
    <section className="px-6 py-12 border-t border-border/30">
      <motion.div {...fadeInUp}>
        <p className="text-accent font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[3px] uppercase mb-4">
          About
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-[1.2] text-foreground mb-4">
          Building cool stuff<br />
          <span className="gradient-text-accent">with AI.</span>
        </h2>
        <p className="text-sm text-foreground/60 leading-[1.8]">
          {profile.bio}
        </p>
      </motion.div>
    </section>
  );
}
