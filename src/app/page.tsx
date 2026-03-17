import Header from "@/components/layout/Header";
import MouseGlow from "@/components/ui/MouseGlow";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollToTop from "@/components/ui/ScrollToTop";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ToDoneWebSection from "@/components/sections/ToDoneWebSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <ScrollToTop />
      <LoadingScreen />
      <MouseGlow />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ToDoneWebSection />
        <PortfolioSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
