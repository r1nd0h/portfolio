"use client";

import MotionDiv from "@/components/ui/MotionDiv";
import { profile } from "@/data/profile";
import { Mail, Github, Twitter, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <MotionDiv>
          <p className="text-accent font-[family-name:var(--font-display)] text-sm font-medium tracking-widest uppercase mb-3">
            Contact
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            お問い合わせ
          </h2>
          <p className="text-muted max-w-lg mb-12">
            お仕事のご依頼やご質問など、お気軽にご連絡ください。
          </p>
        </MotionDiv>

        <div className="grid sm:grid-cols-3 gap-4">
          <MotionDiv delay={0.1}>
            <a
              href={`mailto:${profile.email}`}
              className="group block p-6 rounded-2xl bg-card/50 gradient-border hover:bg-card-hover transition-colors"
            >
              <Mail size={24} className="text-accent mb-4" />
              <p className="font-[family-name:var(--font-display)] font-medium mb-1 flex items-center gap-1">
                Email
                <ArrowUpRight
                  size={14}
                  className="text-muted group-hover:text-accent transition-colors"
                />
              </p>
              <p className="text-sm text-muted">{profile.email}</p>
            </a>
          </MotionDiv>

          <MotionDiv delay={0.2}>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl bg-card/50 gradient-border hover:bg-card-hover transition-colors"
            >
              <Github size={24} className="text-accent mb-4" />
              <p className="font-[family-name:var(--font-display)] font-medium mb-1 flex items-center gap-1">
                GitHub
                <ArrowUpRight
                  size={14}
                  className="text-muted group-hover:text-accent transition-colors"
                />
              </p>
              <p className="text-sm text-muted">ソースコード・活動履歴</p>
            </a>
          </MotionDiv>

          <MotionDiv delay={0.3}>
            <a
              href={profile.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 rounded-2xl bg-card/50 gradient-border hover:bg-card-hover transition-colors"
            >
              <Twitter size={24} className="text-accent mb-4" />
              <p className="font-[family-name:var(--font-display)] font-medium mb-1 flex items-center gap-1">
                X (Twitter)
                <ArrowUpRight
                  size={14}
                  className="text-muted group-hover:text-accent transition-colors"
                />
              </p>
              <p className="text-sm text-muted">日々の発信</p>
            </a>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
