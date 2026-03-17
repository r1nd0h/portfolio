"use client";

import Header from "@/components/layout/Header";
import MobileHero from "./MobileHero";

export default function MobileLayout() {
  return (
    <>
      <Header />
      <main className="bg-background text-foreground">
        <MobileHero />
      </main>
    </>
  );
}
