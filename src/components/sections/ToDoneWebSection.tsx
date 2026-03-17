"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxCircles from "@/components/ui/ParallaxCircles";
import { projects } from "@/data/projects";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const circles = [
  { x: "85%", y: "20%", size: 420, color: "rgba(124, 108, 240, 0.05)", speed: 0.18 },
  { x: "10%", y: "70%", size: 360, color: "rgba(167, 139, 250, 0.04)", speed: -0.22 },
];

function WebScreenshotCarousel({ screenshots }: { screenshots: typeof projects[0]["screenshots"] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [screenshots.length]);

  return (
    <div className="relative">
      {/* Browser chrome */}
      <div className="rounded-xl overflow-hidden border border-border bg-card/30 shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-card/60 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-background/40 rounded-md px-3 py-1 text-xs text-foreground/40 text-center truncate">
              todoweb-two.vercel.app
            </div>
          </div>
        </div>

        {/* Screenshot area */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {screenshots.map((ss, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: i === current ? 1 : 0,
                scale: i === current ? 1 : 1.05,
              }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={ss.src}
                alt={ss.alt}
                fill
                className="object-cover object-top"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Controls + caption */}
      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + screenshots.length) % screenshots.length)}
          className="p-1.5 rounded-lg bg-card/40 border border-border hover:bg-card/60 transition-colors"
        >
          <ChevronLeft size={16} className="text-foreground/60" />
        </button>

        <p className="text-sm text-foreground/60">
          {screenshots[current].caption}
        </p>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % screenshots.length)}
          className="p-1.5 rounded-lg bg-card/40 border border-border hover:bg-card/60 transition-colors"
        >
          <ChevronRight size={16} className="text-foreground/60" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-accent w-4" : "bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ToDoneWebSection() {
  const isMobile = useIsMobile();
  const project = projects.find((p) => p.id === "todone-web");
  if (!project) return null;

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
                Web App
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h3 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                {project.title}
              </h3>
              <p className="text-base text-accent/60 font-[family-name:var(--font-display)] mb-6">
                {project.subtitle}
              </p>
            </ScrollReveal>

            {!isMobile && (
              <ScrollReveal delay={0.2}>
                <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                  {project.description}
                </p>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-2 mb-8" style={isMobile ? { marginBottom: '1rem' } : {}}>
                {project.techStack.map((tech, i) => (
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

            {project.links.length > 0 && (
              <ScrollReveal delay={0.4}>
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
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

          {/* Right: Browser mockup carousel */}
          <ScrollReveal delay={0.2} direction="right">
            <WebScreenshotCarousel screenshots={project.screenshots} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
