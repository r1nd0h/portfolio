"use client";

import Header from "@/components/layout/Header";
import MobileHero from "./MobileHero";
import MobileAbout from "./MobileAbout";

export default function MobileLayout() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        <MobileHero />
        <MobileAbout />
      </main>
    </>
  );
}
