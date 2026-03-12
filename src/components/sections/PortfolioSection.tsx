"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxCircles from "@/components/ui/ParallaxCircles";
import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";

const circles = [
  { x: "75%", y: "25%", size: 450, color: "rgba(124, 108, 240, 0.05)", speed: 0.2 },
  { x: "15%", y: "65%", size: 350, color: "rgba(167, 139, 250, 0.04)", speed: -0.2 },
];

export default function PortfolioSection() {
  const portfolio = projects.find((p) => p.id === "portfolio");
  if (!portfolio) return null;

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="snap-section relative overflow-hidden flex items-center"
    >
      <ParallaxCircles circles={circles} />

      <div className="relative w-full px-8 sm:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center">
          {/* Left: Info */}
          <div>
            <ScrollReveal>
              <p className="text-accent font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Other Project
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h3 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                {portfolio.title}
              </h3>
              <p className="text-base text-accent/60 font-[family-name:var(--font-display)] mb-6">
                {portfolio.subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                {portfolio.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-2 mb-8">
                {portfolio.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 text-sm text-foreground/70 bg-background/40 rounded-md border border-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(124, 108, 240, 0.3)" }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </ScrollReveal>

            {portfolio.links.length > 0 && (
              <ScrollReveal delay={0.4}>
                <div className="flex flex-wrap gap-3">
                  {portfolio.links.map((link) => (
                    <motion.a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 text-base font-medium bg-accent text-white rounded-xl hover:bg-accent-light transition-all duration-300"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {link.label}
                      <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          {/* Right: Demo video — large */}
          <ScrollReveal delay={0.2} direction="right">
            <motion.div
              className="rounded-2xl overflow-hidden border border-border bg-card/20 shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <video
                src="/videos/portfolio-demo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
