import ScrollAnimation from "./ScrollAnimation";

const AboutSectionHomePage = () => {
  return (
    <section className="">
      <div className="container mx-auto max-w-5xl px-6">
        <ScrollAnimation>
          <p className="text-dark/90 text-[28px] leading-relaxed">
            <span className="float-right">
              I like building things that feel good to use
            </span>
            <br />
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
