import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Mobile",
    skills: [
      { name: "Flutter" },
      { name: "Dart" },
      { name: "SwiftUI" },
      { name: "Kotlin" },
      { name: "Riverpod" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend / Cloud",
    skills: [
      { name: "Firebase" },
      { name: "Firestore" },
      { name: "Cloud Functions" },
      { name: "SQLite / Drift" },
    ],
  },
  {
    category: "Tools / AI",
    skills: [
      { name: "Git" },
      { name: "GitHub Actions" },
      { name: "Gemini AI" },
      { name: "RevenueCat" },
      { name: "Figma" },
    ],
  },
];
