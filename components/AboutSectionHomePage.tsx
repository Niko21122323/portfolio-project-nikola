import ScrollAnimation from "./ScrollAnimation";

const AboutSectionHomePage = () => {
  return (
    <section className="">
      <div className="container mx-auto max-w-5xl px-6">
        <ScrollAnimation>
          <p className="text-dark/90  text-lg sm:text-xl md:text-2xl lg:text-[28px] leading-relaxed">
            <span className="sm:float-right">
              I like building things that feel good to use
            </span>
            <br className="max-sm:hidden" />
            and actually work. Three years deep into the web, based in Skopje, I
            focus on turning ideas into modern, reliable applications. From
            frontend polish and smooth interactions to solid backend logic, I
            care about the details that make products feel complete.
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default AboutSectionHomePage;
