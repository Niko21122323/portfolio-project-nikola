import HeroSection from "@/components/HeroSection";
import LoopSection from "@/components/LoopSection";
import WhatIDoSection from "@/components/WhatIDoSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <LoopSection />
      <WhatIDoSection />
      <section className="h-[30vh] bg-dark"></section>
      <section className="test h-screen bg-primary">
        <p className="text-white text-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ipsam
          voluptate architecto consequatur impedit minus vel libero,
          reprehenderit, sequi ducimus vero soluta unde nisi cum incidunt
          obcaecati quod, tempora iure eaque nostrum debitis suscipit. Delectus
          dolorum eius repellat illo maxime dicta provident quod architecto
          officiis consequatur modi cumque consectetur iste natus blanditiis
          doloribus repudiandae sed nihil asperiores, inventore assumenda
          tempora tenetur, excepturi ducimus. Natus quos, ipsum vero architecto
          error quaerat magnam eius enim, fugit, impedit repudiandae aspernatur
          quibusdam! Assumenda eveniet commodi perspiciatis, suscipit ad dolorum
          nesciunt nostrum cupiditate accusantium repudiandae temporibus aut,
          voluptatem corporis modi rerum. Tenetur nulla, voluptates, ducimus,
          consequatur illum maxime omnis deleniti eius molestiae ratione dicta?
          Eligendi architecto libero numquam eaque repudiandae! Voluptates
          asperiores repellat corporis dolorum eos optio facere suscipit aperiam
          odit. Ipsum, atque vel corporis ullam eos vero! Quisquam minus
          distinctio aspernatur nostrum dolore sit, saepe deserunt, culpa
          ratione, dolor architecto? Minus repudiandae iure, ea optio quibusdam
          unde, facere fugiat quas doloremque corrupti animi praesentium
          voluptates? Officia aliquam nobis accusantium eveniet nam iusto soluta
          aperiam a impedit minus doloribus, sed hic quibusdam odit quidem. Sed
          odio laboriosam numquam itaque quia eum illo, alias est, laudantium
          iure natus quis dolor perspiciatis! Odit pariatur voluptatem quod
          consequatur!
        </p>
      </section>
    </>
  );
}
