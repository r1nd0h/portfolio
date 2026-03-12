"use client";

import MotionDiv from "@/components/ui/MotionDiv";
import { profile } from "@/data/profile";
import { User } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <MotionDiv>
          <p className="text-accent font-[family-name:var(--font-display)] text-sm font-medium tracking-widest uppercase mb-3">
            About
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            自己紹介
          </h2>
        </MotionDiv>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Avatar */}
          <MotionDiv delay={0.1} className="md:col-span-2 flex justify-center">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl gradient-border bg-card flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
              <User size={80} className="text-muted/30" />
              {/* プロフィール画像がある場合は以下をアンコメント */}
              {/* <Image src="/images/profile/avatar.webp" alt={profile.name} fill className="object-cover" /> */}
            </div>
          </MotionDiv>

          {/* Bio */}
          <MotionDiv delay={0.2} className="md:col-span-3 space-y-5">
            <p className="text-foreground/90 leading-relaxed text-base sm:text-lg">
              {profile.bio}
            </p>
            <p className="text-muted leading-relaxed">
              ユーザーの課題を技術で解決することに情熱を持っています。
              特にAIとモバイルの融合領域に興味があり、日常のタスク管理を
              AIで進化させるアプリ「ToDone」を個人開発・ストア公開しました。
            </p>
            <p className="text-muted leading-relaxed">
              チーム開発においてはコードレビュー・設計議論を大切にし、
              保守性の高いアーキテクチャを追求しています。
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {["Flutter", "Next.js", "Firebase", "AI"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
