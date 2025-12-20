import ScrollAnimation from "./ScrollAnimation";

const AboutSectionHomePage = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/10 py-24 gradient-border-y">
      <div className="min-h-screen bg-transparent absolute h-full w-full">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        radial-gradient(circle at 50% 100%, rgba(123, 97, 255, 0.5) 0%, transparent 50%),
        radial-gradient(circle at 50% 100%, rgba(123, 97, 255, 0.4) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(123, 97, 255, 0.3) 0%, transparent 70%)
      `,
          }}
        />
      </div>

      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-center w-fit rounded-full mx-auto mb-6 px-4 py-2 border border-white/30">
          <span className="text-base text-white/90">About Me</span>
        </div>
        <p className="text-white/90 text-lg sm:text-xl md:text-2xl text-center text-pretty">
          I like building things that feel good to use and actually work. Three
          years deep into the web, based in Skopje, I focus on turning ideas
          into modern, reliable applications. From frontend polish and smooth
          interactions to solid backend logic, I care about the details that
          make products feel complete.
        </p>
      </div>
    </section>
  );
};

export default AboutSectionHomePage;
