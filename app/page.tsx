import HeroSection from "@/components/HeroSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <WhatIDoSection />
    </>
  );
}
