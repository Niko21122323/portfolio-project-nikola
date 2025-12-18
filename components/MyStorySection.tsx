import ButtonPrimary from "./ButtonPrimary";
import Image from "next/image";
import aboutImage from "../public/assets/images/about-image.webp";
import aboutImageMobile from "../public/assets/images/about-image-mobile.webp";
import ScrollAnimation from "./ScrollAnimation";

const MyStorySection = () => {
  return (
    <section className="py-24 md:py-44">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 items-start lg:items-center max-sm:gap-10 gap-0 md:gap-20">
          <div className="md:col-span-1 lg:col-span-4">
            <Image
              src={aboutImage}
              alt="about image"
              width={400}
              height={700}
              className="max-h-[500px] w-auto max-md:hidden"
            />
            <Image
              src={aboutImageMobile}
              alt="about image"
              width={800}
              height={600}
              className="sm:hidden w-full"
            />
          </div>
          <div className="md:col-span-2 lg:col-span-8">
            <ScrollAnimation>
              <h3 className="text-dark font-semibold text-4xl pb-6">
                The Story So Far
              </h3>
            </ScrollAnimation>
            <ScrollAnimation>
              <p className="text-dark/70 text-sm sm:text-base lg:text-lg">
                I started coding in 2023, teaching myself the basics and
                building small projects. Soon after, I joined Semos, a full
                stack academy, where I spent eight months learning HTML, CSS,
                JavaScript, TypeScript, Node.js, and React.
              </p>
            </ScrollAnimation>
            <ScrollAnimation>
              <p className="text-dark/70 text-sm sm:text-base lg:text-lg py-2">
                After the program, I joined Pabau as a frontend developer,
                working on production applications and learning to write
                maintainable code and collaborate effectively with a team.
              </p>
            </ScrollAnimation>
            <ScrollAnimation>
              <p className="text-dark/70 text-sm sm:text-base lg:text-lg">
                A year later, I moved to Thrasker, continuing to grow my skills
                and focus on building clean, modern interfaces backed by solid
                engineering.
              </p>
            </ScrollAnimation>
            <div className="flex items-center gap-2 pt-8">
              <div className="w-fit">
                <ButtonPrimary title="About Me" link="/about" />
              </div>
              <div className="w-fit">
                <ButtonPrimary title="Contact Me" link="/contact" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStorySection;
