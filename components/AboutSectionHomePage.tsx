import ButtonPrimary from "./ButtonPrimary";

const AboutSectionHomePage = () => {
  return (
    <section className="relative bg-body overflow-hidden border-b border-dark/10 pt-10 pb-24 gradient-border-y">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex items-start gap-10 justify-between">
          <p className="text-dark/90 text-lg sm:text-xl md:text-4xl text-pretty">
            I’m Nikola, a full-stack developer crafting fast, scalable, and
            user-focused digital experiences from frontend polish to backend
            logic.
          </p>
          <div>
            <p className="text-dark/80 text-lg text-pretty">
              I develop end-to-end web applications using JavaScript,
              TypeScript, React, Next.js, Node.js, GraphQL, Prisma, and
              databases like MongoDB and SQL.
            </p>
            <div className="pt-24">
              <div className="w-fit">
                <ButtonPrimary title="More About Me" link="/about" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionHomePage;
