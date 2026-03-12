"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import RevealText from "@/components/ui/RevealText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ParallaxCircles from "@/components/ui/ParallaxCircles";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";
import { projects } from "@/data/projects";
import { Code2, ArrowRight, AlertCircle, Lightbulb, Trophy, ChevronDown } from "lucide-react";

const introCircles = [
  { x: "80%", y: "30%", size: 500, color: "rgba(124, 108, 240, 0.06)", speed: 0.2 },
  { x: "15%", y: "70%", size: 400, color: "rgba(167, 139, 250, 0.04)", speed: -0.25 },
];

const detailCircles = [
  { x: "90%", y: "15%", size: 450, color: "rgba(124, 108, 240, 0.05)", speed: 0.15 },
  { x: "5%", y: "55%", size: 380, color: "rgba(167, 139, 250, 0.04)", speed: -0.2 },
  { x: "60%", y: "90%", size: 300, color: "rgba(124, 108, 240, 0.03)", speed: 0.25 },
];

export default function ProjectsSection() {
  const featured = projects[0];
  const detailRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: detailRef,
    offset: ["start end", "end start"],
  });

  const cardRotate = useTransform(scrollYProgress, [0.1, 0.4], [2, 0]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.95, 1]);

  return (
    <>
      {/* Page 1: Projects intro */}
      <section
        id="projects"
        className="snap-section relative overflow-hidden flex flex-col items-center justify-center px-6"
      >
        <ParallaxCircles circles={introCircles} />

        <div className="relative text-center">
          <ScrollReveal>
            <p className="text-accent font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
              Projects
            </p>
          </ScrollReveal>

          <h2 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
            <RevealText text="What I Built" delay={0.1} />
          </h2>

          <ScrollReveal delay={0.3}>
            <p className="text-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-14">
              面白いと思ったアイデアを、AIと一緒にプロダクトとして形にしています。
            </p>
          </ScrollReveal>

          {/* Project preview cards */}
          <div className="flex flex-wrap justify-center gap-5 mb-16">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} delay={0.4 + i * 0.1} scale>
                <motion.div
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card/40 border border-border"
                  whileHover={{ scale: 1.05, borderColor: "rgba(124, 108, 240, 0.3)" }}
                >
                  {project.icon ? (
                    <Image
                      src={project.icon}
                      alt={project.title}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Code2 size={20} className="text-accent" />
                    </div>
                  )}
                  <div className="text-left">
                    <p className="font-[family-name:var(--font-display)] text-base font-semibold">
                      {project.title}
                    </p>
                    <p className="text-sm text-foreground/60">{project.subtitle}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Scroll hint */}
          <ScrollReveal delay={0.6}>
            <motion.div
              className="text-muted/30"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="mx-auto" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Page 2: ToDone featured detail */}
      <section
        ref={detailRef}
        id="project-todone"
        className="snap-section relative overflow-hidden flex items-center py-16 sm:py-20"
      >
        <ParallaxCircles circles={detailCircles} />

        <div className="relative w-full px-8 sm:px-12 lg:px-16">
          <motion.div
            style={{ rotateX: cardRotate, scale: cardScale, transformPerspective: 1200 }}
            className="relative rounded-3xl bg-gradient-to-br from-card/80 to-card/30 border border-border overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/[0.03] blur-[80px] pointer-events-none" />

            <div className="relative p-8 sm:p-10 lg:p-14">
              <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-14 items-start">
                {/* Left: All text content */}
                <div className="order-2 lg:order-1">
                  <ScrollReveal>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-accent border border-accent/20 rounded-full bg-accent/5 font-[family-name:var(--font-display)] tracking-wider uppercase">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-accent"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Featured Project
                      </span>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal>
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        className="w-14 h-14 rounded-2xl overflow-hidden glow-accent"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Image
                          src={featured.icon}
                          alt={featured.title}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight">
                          {featured.title}
                        </h3>
                        <p className="text-foreground/70 text-base">{featured.subtitle}</p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {featured.story && (
                    <div className="space-y-3 mb-5">
                      <ScrollReveal delay={0.1} direction="left">
                        <div className="flex gap-3">
                          <motion.div
                            className="shrink-0 w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                          >
                            <AlertCircle size={16} className="text-red-400" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-semibold text-red-400/80 uppercase tracking-[0.15em] font-[family-name:var(--font-display)] mb-0.5">
                              Problem
                            </p>
                            <p className="text-base text-foreground/70 leading-relaxed">
                              {featured.story.problem}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal delay={0.2} direction="left">
                        <div className="flex gap-3">
                          <motion.div
                            className="shrink-0 w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mt-0.5"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                          >
                            <Lightbulb size={16} className="text-blue-400" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-semibold text-blue-400/80 uppercase tracking-[0.15em] font-[family-name:var(--font-display)] mb-0.5">
                              Solution
                            </p>
                            <p className="text-base text-foreground/70 leading-relaxed">
                              {featured.story.solution}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>

                      <ScrollReveal delay={0.3} direction="left">
                        <div className="flex gap-3">
                          <motion.div
                            className="shrink-0 w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mt-0.5"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                          >
                            <Trophy size={16} className="text-green-400" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-semibold text-green-400/80 uppercase tracking-[0.15em] font-[family-name:var(--font-display)] mb-0.5">
                              Result
                            </p>
                            <p className="text-base text-foreground/70 leading-relaxed">
                              {featured.story.result}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    </div>
                  )}

                  <ScrollReveal delay={0.35}>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {featured.techStack.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1.5 text-sm text-foreground/70 bg-background/40 rounded-md border border-border"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.03 }}
                          whileHover={{ scale: 1.05, borderColor: "rgba(124, 108, 240, 0.3)" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </ScrollReveal>

                  {featured.links.length > 0 && (
                    <ScrollReveal delay={0.45}>
                      <div className="flex flex-wrap gap-3">
                        {featured.links.map((link) => (
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
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </motion.a>
                        ))}
                      </div>
                    </ScrollReveal>
                  )}
                </div>

                {/* Right: Screenshots — spans full height from top */}
                <ScrollReveal delay={0.2} direction="right" className="order-1 lg:order-2 flex justify-center lg:items-start">
                  <ScreenshotCarousel screenshots={featured.screenshots} />
                </ScrollReveal>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
