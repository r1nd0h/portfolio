"use client";

import Image from "next/image";
import MotionDiv from "@/components/ui/MotionDiv";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";
import { projects } from "@/data/projects";
import { Sparkles, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const project = projects[0]; // ToDone

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <MotionDiv>
          <p className="text-accent font-[family-name:var(--font-display)] text-sm font-medium tracking-widest uppercase mb-3">
            Projects
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-16">
            プロジェクト
          </h2>
        </MotionDiv>

        {/* Featured project */}
        <div className="rounded-3xl bg-card/30 gradient-border p-6 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Info */}
            <MotionDiv className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden glow-accent">
                  <Image
                    src={project.icon}
                    alt={project.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                    {project.title}
                  </h3>
                  <p className="text-muted text-sm">{project.subtitle}</p>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Features */}
              <div className="space-y-2 mb-8">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Sparkles
                      size={14}
                      className="text-accent mt-1 shrink-0"
                    />
                    <span className="text-sm text-muted">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="mb-6">
                <p className="text-xs text-muted uppercase tracking-wider mb-3 font-[family-name:var(--font-display)]">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs text-accent/80 bg-accent/5 rounded-md border border-accent/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-accent text-white rounded-xl hover:bg-accent-light transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              )}
            </MotionDiv>

            {/* Right: Screenshots */}
            <MotionDiv delay={0.2} className="order-1 lg:order-2 flex justify-center">
              <ScreenshotCarousel screenshots={project.screenshots} />
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
