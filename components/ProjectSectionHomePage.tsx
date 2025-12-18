"use client";

import gsap from "gsap";
import Image from "next/image";
import testImg from "../public/assets/images/project-test.webp";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ProjectSectionHomePage = () => {
  const projects = [
    {
      index: 1,
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quasi consectetur eius commodi delectus fugiat illum rem aut accusantium eos ducimus obcaecati distinctio natus reprehenderit, vel eum nemo veniam ab.",
      image: testImg,
    },
    {
      index: 2,
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quasi consectetur eius commodi delectus fugiat illum rem aut accusantium eos ducimus obcaecati distinctio natus reprehenderit, vel eum nemo veniam ab.",
      image: testImg,
    },
    {
      index: 3,
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quasi consectetur eius commodi delectus fugiat illum rem aut accusantium eos ducimus obcaecati distinctio natus reprehenderit, vel eum nemo veniam ab.",
      image: testImg,
    },
  ];

  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");

      cards.forEach((card, index) => {
        const cardInner = card.querySelector(".card-inner");

        ScrollTrigger.create({
          trigger: card,
          start: "top 35%",
          endTrigger: ".outro",
          end: "top 65%",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(cardInner, {
          y: `-${(cards.length - index) * 14}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 35%",
            endTrigger: ".outro",
            end: "top 65%",
            scrub: true,
          },
        });
      });
    },
    { scope: container },
  );

  return (
    <section className="cards" ref={container}>
      <div className="container mx-auto max-w-5xl px-6">
        {projects.map((project, index) => (
          <div
            className="card rounded-3xl"
            id={`card-${index + 1}`}
            key={project.index}
          >
            <div className="card-inner relative grid grid-cols-5 md:grid-cols-12 gap-4 md:gap-10 will-change-transform w-full h-full p-6 md:p-10 rounded-3xl border-3 border-dark">
              <div className="card-content col-span-3 md:col-span-7">
                <h4 className="text-dark font-medium text-2xl md:text-4xl pb-4">
                  {project.title}
                </h4>
                <p className="text-dark/80 text-sm md:text-base">
                  {project.description}
                </p>
              </div>
              <div className="card-img aspect-square rounded-2xl overflow-hidden col-span-2 md:col-span-5">
                <Image
                  src={project.image}
                  alt={`${project.title} project`}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <section className="outro"></section>
    </section>
  );
};

export default ProjectSectionHomePage;
