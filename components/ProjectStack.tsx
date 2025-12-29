"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import testImage from "../public/assets/images/project-test.webp";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CardDetail {
  id: number;
  text: string;
}

interface CardData {
  index: number;
  title: string;
  description: string;
  image: StaticImageData;
  details: CardDetail[];
  background: string;
}

export default function ProjectStack() {
  const container = useRef<HTMLElement>(null);

  const cards: CardData[] = [
    {
      index: 1,
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quasi consectetur eius commodi delectus fugiat illum rem aut accusantium eos ducimus obcaecati distinctio natus reprehenderit, vel eum nemo veniam ab.",
      image: testImage,
      details: [
        { id: 1, text: "lorem ipsum dolor" },
        { id: 2, text: "lorem ipsum dolor" },
        { id: 3, text: "lorem ipsum dolor" },
        { id: 4, text: "lorem ipsum dolor" },
        { id: 5, text: "lorem ipsum dolor" },
      ],
      background: "bg-secondary",
    },
    {
      index: 2,
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quasi consectetur eius commodi delectus fugiat illum rem aut accusantium eos ducimus obcaecati distinctio natus reprehenderit, vel eum nemo veniam ab.",
      image: testImage,
      details: [
        { id: 1, text: "lorem ipsum dolor" },
        { id: 2, text: "lorem ipsum dolor" },
        { id: 3, text: "lorem ipsum dolor" },
        { id: 4, text: "lorem ipsum dolor" },
        { id: 5, text: "lorem ipsum dolor" },
      ],
      background: "bg-body",
    },
    {
      index: 3,
      title: "Lorem ipsum dolor",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quasi consectetur eius commodi delectus fugiat illum rem aut accusantium eos ducimus obcaecati distinctio natus reprehenderit, vel eum nemo veniam ab.",
      image: testImage,
      details: [
        { id: 1, text: "lorem ipsum dolor" },
        { id: 2, text: "lorem ipsum dolor" },
        { id: 3, text: "lorem ipsum dolor" },
        { id: 4, text: "lorem ipsum dolor" },
        { id: 5, text: "lorem ipsum dolor" },
      ],
      background: "bg-dark",
    },
  ];

  useGSAP(
    () => {
      const cardElements = gsap.utils.toArray<HTMLElement>(".card");
      const spacer = document.querySelector(".stack-spacer");
      const intro = document.querySelector(".intro");
      const introContent = document.querySelector(".intro-content");

      // Pin the intro container while cards are stacking
      ScrollTrigger.create({
        trigger: cardElements[0],
        start: "top 35%",
        endTrigger: spacer,
        end: "top 65%",
        pin: intro,
        pinSpacing: false,
      });

      // Move intro content up as cards stack (animate the inner content, not the pinned container)
      gsap.to(introContent, {
        y: `-${cardElements.length * 14}vh`,
        ease: "none",
        scrollTrigger: {
          trigger: cardElements[0],
          start: "top 35%",
          endTrigger: spacer,
          end: "top 65%",
          scrub: true,
        },
      });

      cardElements.forEach((card, index) => {
        const cardInner = card.querySelector(".card-inner");

        ScrollTrigger.create({
          trigger: card,
          start: "top 35%",
          endTrigger: spacer,
          end: "top 65%",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(cardInner, {
          y: `-${(cardElements.length - index) * 14}vh`,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 35%",
            endTrigger: spacer,
            end: "top 65%",
            scrub: true,
          },
        });
      });

      return () => {
        const triggers = ScrollTrigger.getAll();
        for (const trigger of triggers) {
          trigger.kill();
        }
      };
    },
    { scope: container },
  );

  return (
    <section ref={container} className="pb-44">
      <div className="intro container mx-auto px-6">
        <div className="intro-content flex flex-col items-center justify-center py-36">
          <h2 className="text-dark/90 text-6xl pb-4 pt-10 text-center">
            From Idea to Launch
          </h2>
          <p className="text-3xl text-dark/50 max-w-4xl text-center">
            A curated selection of projects built with care, clarity, and
            attention to detail.
          </p>
        </div>
      </div>

      <div className="cards">
        {cards.map((card, index) => (
          <div
            className="card relative"
            id={`card-${index + 1}`}
            key={card.index}
          >
            <div
              className={`card-inner relative will-change-transform w-full h-full py-10 ${card.background}`}
            >
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-12 gap-20">
                  <div className="col-span-7">
                    <h4
                      className={`text-5xl pb-16 ${card.background === "bg-dark" ? "text-body/90" : "text-dark/90"}`}
                    >
                      {card.title}
                    </h4>
                    <div className="grid grid-cols-2 gap-10">
                      <p
                        className={`text-base ${card.background === "bg-dark" ? "text-body/80" : "text-dark/80"}`}
                      >
                        {card.description}
                      </p>
                      <ul className="">
                        {card.details.map((detail) => (
                          <li
                            key={detail.id}
                            className={`text-base ${card.background === "bg-dark" ? "text-body/80" : "text-dark/80"}`}
                          >
                            {detail.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-5 rounded-2xl overflow-hidden h-full w-full max-h-[350px]">
                    <Image
                      src={card.image}
                      alt="project image"
                      width={500}
                      height={500}
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="stack-spacer"></div>
      </div>
    </section>
  );
}
