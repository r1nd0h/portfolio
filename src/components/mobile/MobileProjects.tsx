"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { projects } from "@/data/projects";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="bg-card/40 border border-border rounded-2xl overflow-hidden"
      {...fadeInUp}
    >
      <button
        className="w-full flex items-center gap-3.5 p-4 text-left"
        onClick={() => setExpanded(!expanded)}
      >
        {project.icon ? (
          <Image
            src={project.icon}
            alt={project.title}
            width={44}
            height={44}
            className="rounded-xl shrink-0"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-lg shrink-0">
            💻
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-sm text-foreground">
            {project.title}
          </h3>
          <p className="text-xs text-foreground/50 truncate">{project.subtitle}</p>
        </div>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto text-foreground/40 text-sm shrink-0"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Description */}
              <p className="text-xs text-foreground/60 leading-[1.8]">
                {project.story?.solution || project.description}
              </p>

              {/* Screenshots carousel */}
              {project.screenshots.length > 0 && (
                <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide">
                  {project.screenshots.map((ss, i) => (
                    <div key={i} className="w-[200px] shrink-0 snap-start">
                      <Image
                        src={ss.src}
                        alt={ss.alt}
                        width={200}
                        height={433}
                        className="rounded-lg w-[200px] h-auto object-cover"
                      />
                      {ss.caption && (
                        <p className="text-[10px] text-foreground/40 mt-1.5 text-center">
                          {ss.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-medium text-accent bg-accent/10 border border-accent/20 rounded-full font-[family-name:var(--font-display)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              {project.links.length > 0 && (
                <div className="flex gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-accent bg-accent/10 border border-accent/20 rounded-xl font-[family-name:var(--font-display)] hover:bg-accent/20 transition-colors"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MobileProjects() {
  return (
    <section className="px-6 py-12 border-t border-border/30">
      <motion.div {...fadeInUp}>
        <p className="text-accent font-[family-name:var(--font-display)] text-[11px] font-semibold tracking-[3px] uppercase mb-4">
          Projects
        </p>
      </motion.div>

      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
