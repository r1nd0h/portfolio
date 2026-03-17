"use client";

import { motion } from "framer-motion";
import { Mail, Github, Twitter } from "lucide-react";
import { profile } from "@/data/profile";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "r1nd0h",
    href: profile.links.github,
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    value: "@rindo",
    href: profile.links.twitter,
  },
];

export default function MobileContact() {
  return (
    <section className="px-6 py-12 border-t border-border/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[3px] uppercase mb-4">
          Contact
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight mb-6">
          Let&apos;s Talk
        </h3>
      </motion.div>

      <div className="flex flex-col gap-3">
        {contactItems.map((item, i) => (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-3.5 p-4 bg-card/40 border border-border rounded-xl"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <item.icon size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-foreground/50 mb-0.5">{item.label}</p>
              <p className="text-sm text-foreground font-medium">{item.value}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-border/30 text-center">
        <p className="text-[11px] text-foreground/30">
          &copy; 2026 Rindo Ohno
        </p>
      </div>
    </section>
  );
}
