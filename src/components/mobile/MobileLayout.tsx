"use client";

import Header from "@/components/layout/Header";
import MobileHero from "./MobileHero";
import MobileProjects from "./MobileProjects";
import MobileAbout from "./MobileAbout";
import MobileSkills from "./MobileSkills";
import MobileExperience from "./MobileExperience";

export default function MobileLayout() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        <MobileHero />
        <MobileProjects />
        <MobileAbout />
        <MobileSkills />
        <MobileExperience />
      </main>
    </>
  );
}
