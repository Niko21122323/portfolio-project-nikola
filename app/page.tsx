import HeroSection from "@/components/HeroSection";
import AboutSectionHomePage from "@/components/AboutSectionHomePage";
import MyStorySection from "@/components/MyStorySection";
import ProjectSectionHomePage from "@/components/ProjectSectionHomePage";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSectionHomePage />
      <MyStorySection />
      <ProjectSectionHomePage />
      <section className="test h-screen"></section>
    </>
  );
}
