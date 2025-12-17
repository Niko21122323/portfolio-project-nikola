import ButtonPrimary from "./ButtonPrimary";
import Image from "next/image";
import aboutImage from "../public/assets/images/about-image.webp";
import ScrollAnimation from "./ScrollAnimation";

const MyStorySection = () => {
  return (
    <section className="py-44">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-12 items-center gap-20">
          <div className="col-span-4">
            <Image
              src={aboutImage}
              alt="about image"
              width={400}
              height={700}
              className="max-h-[500px] w-auto"
            />
          </div>
          <div className="col-span-8">
            <ScrollAnimation>
              <h3 className="text-dark font-semibold text-4xl pb-6">
                The Story So Far
              </h3>
            </ScrollAnimation>

            <ScrollAnimation>
              <p className="text-dark/70 text-lg">
                I started coding in 2023, teaching myself the basics and
                building small projects. Soon after, I joined Semos, a full
                stack academy, where I spent eight months learning HTML, CSS,
                JavaScript, TypeScript, Node.js, and React.
              </p>
            </ScrollAnimation>

            <ScrollAnimation>
              <p className="text-dark/70 text-lg py-2">
                After the program, I joined Pabau as a frontend developer,
                working on production applications and learning to write
                maintainable code and collaborate effectively with a team.
              </p>
            </ScrollAnimation>

            <ScrollAnimation>
              <p className="text-dark/70 text-lg">
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
