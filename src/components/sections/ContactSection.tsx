"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import ParallaxCircles from "@/components/ui/ParallaxCircles";
import MagneticCard from "@/components/ui/MagneticCard";
import { profile } from "@/data/profile";
import { Mail, Github, Twitter, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    description: "お仕事のご相談はこちら",
    href: `mailto:${profile.email}`,
  },
  {
    icon: Github,
    label: "GitHub",
    description: "ソースコード・活動履歴",
    href: profile.links.github,
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    description: "日々の発信",
    href: profile.links.twitter,
  },
];

const contactCircles = [
  { x: "50%", y: "30%", size: 600, color: "rgba(124, 108, 240, 0.06)", speed: 0.15 },
  { x: "20%", y: "70%", size: 400, color: "rgba(167, 139, 250, 0.04)", speed: -0.2 },
  { x: "80%", y: "80%", size: 350, color: "rgba(124, 108, 240, 0.03)", speed: 0.25 },
];

const headingLine1 = "Let's build";
const headingLine2 = "something cool.";

type Phase = "waiting" | "reveal" | "hold" | "settle" | "final";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-30%" });
  const [phase, setPhase] = useState<Phase>("waiting");

  const startSequence = useCallback(() => {
    setPhase("reveal");
    setTimeout(() => setPhase("hold"), 1400);
    setTimeout(() => setPhase("settle"), 2000);
    setTimeout(() => setPhase("final"), 2800);
  }, []);

  useEffect(() => {
    if (isInView && phase === "waiting") {
      startSequence();
    }
  }, [isInView, phase, startSequence]);

  const isActive = phase !== "waiting";
  const settled = phase === "settle" || phase === "final";
  const showContent = phase === "final";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="snap-section relative overflow-hidden"
    >
      <ParallaxCircles circles={contactCircles} />

      {/* Full-page layout container */}
      <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16 flex flex-col min-h-screen">
        {/* Spacer */}
        <div className="flex-1" />

        {/* ============================== */}
        {/* Single heading — giant center → small left */}
        {/* ============================== */}
        <div className="mb-4">
          <motion.p
            className="text-accent font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] uppercase mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contact
          </motion.p>

          <motion.h2
            className="font-[family-name:var(--font-display)] font-bold tracking-tight leading-[1.1] origin-top-left will-change-transform"
            animate={
              settled
                ? { scale: 1, x: 0, y: 0, filter: "blur(0px)" }
                : isActive
                  ? { scale: 1.8, x: "12vw", y: "25vh", filter: "blur(0px)" }
                  : { scale: 1.8, x: "12vw", y: "25vh", filter: "blur(0px)" }
            }
            transition={{
              duration: settled ? 0.9 : 0,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {headingLine1.split("").map((char, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "120%", opacity: 0 }}
                  animate={isActive ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            ))}
            <br className="hidden sm:block" />
            <span className="gradient-text-accent">
              {" "}
              {headingLine2.split("").map((char, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "120%", opacity: 0 }}
                    animate={isActive ? { y: "0%", opacity: 1 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.4 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                </span>
              ))}
            </span>
          </motion.h2>

          {/* Decorative line — shows during hold phase */}
          <motion.div
            className="mt-4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
            style={{ transformOrigin: "left center" }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={
              phase === "hold"
                ? { scaleX: 1, opacity: 1 }
                : settled
                  ? { scaleX: 0.3, opacity: 0 }
                  : { scaleX: 0, opacity: 0 }
            }
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />

          <motion.p
            className="text-foreground/60 text-base sm:text-lg max-w-xl mt-6"
            initial={{ opacity: 0, y: 15 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            お仕事のご依頼・ご質問など、お気軽にどうぞ。
          </motion.p>
        </div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {links.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={
                showContent
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{ duration: 0.6, delay: 0.25 + idx * 0.1 }}
            >
              <MagneticCard>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="group block p-6 sm:p-8 rounded-2xl bg-card/30 border border-border hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-all duration-300"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                    >
                      <item.icon size={22} className="text-accent" />
                    </motion.div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                    />
                  </div>
                  <p className="font-[family-name:var(--font-display)] font-semibold text-lg mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </a>
              </MagneticCard>
            </motion.div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Footer */}
        <motion.div
          className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 pb-8"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-foreground/70 font-[family-name:var(--font-display)]">
            &copy; {new Date().getFullYear()} {profile.name}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted/30 hover:text-accent transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={profile.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted/30 hover:text-accent transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-muted/30 hover:text-accent transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
