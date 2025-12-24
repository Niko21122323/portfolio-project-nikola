import ButtonPrimary from "./ButtonPrimary";
import Image from "next/image";
import aboutImage from "../public/assets/images/about-image.webp";

const MyStorySection = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 items-start max-sm:gap-10 gap-0 md:gap-20">
          <div className="md:col-span-2 lg:col-span-7">
            <h3 className="text-white font-semibold text-4xl pb-6">
              The Story So Far
            </h3>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg">
              I started coding in 2023, teaching myself the basics and building
              small projects. Soon after, I joined Semos, a full stack academy,
              where I spent eight months learning HTML, CSS, JavaScript,
              TypeScript, Node.js, and React.
            </p>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg py-2">
              After the program, I joined Pabau as a frontend developer, working
              on production applications and learning to write maintainable code
              and collaborate effectively with a team.
            </p>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg">
              A year later, I moved to Thrasker, continuing to grow my skills
              and focus on building clean, modern interfaces backed by solid
              engineering.
            </p>
            <div className="flex items-center gap-2 pt-8">
              <div className="w-fit">
                <ButtonPrimary title="About Me" link="/about" />
              </div>
              <div className="w-fit">
                <ButtonPrimary title="Contact Me" link="/contact" />
              </div>
            </div>
          </div>
          <div className="md:col-span-1 lg:col-span-5 gradient-border-diagonal p-[1px] rounded-3xl">
            <div className="relative overflow-hidden flex items-center justify-center rounded-3xl py-10">
              <Image
                src={aboutImage}
                alt="about image"
                width={400}
                height={700}
                className="relative z-10 max-h-[500px] w-auto"
              />
              <div className="min-h-screen w-full h-full bg-dark absolute top-0 left-0 overflow-hidden">
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `
                   radial-gradient(ellipse 50% 100% at 10% 0%, rgba(123, 97, 255, 0.35), transparent 65%),
                   radial-gradient(ellipse 50% 100% at 90% 100%, rgba(123, 97, 255, 0.35), transparent 65%)
                   `,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStorySection;
