"use client";

import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import testImg from "../../public/assets/images/project-test.webp";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Card = ({ title, copy, image, index }) => {
  return (
    <div className="card relative" id={`card-${index + 1}`}>
      <div className="card-inner bg-primary border border-dark relative will-change-transform w-full h-full p-4 flex gap-4">
        <div className="card-content flex-3">
          <h1>{title}</h1>
          <p>{copy}</p>
        </div>
        <div className="card-img flex-1 aspect-video rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt="project image"
            width={500}
            height={500}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default function page() {
  const cards = [
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

  const container = useRef();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");

      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 35%",
        endTrigger: cards[cards.length - 1],
        end: "top 30%",
        pin: ".intro",
        pinSpacing: false,
      });

      cards.forEach((card, index) => {
        const isLasCard = index === cards.length - 1;
        const cardInner = card.querySelector(".card-inner");

        if (!isLasCard) {
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
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill);
      };
    },
    { scope: container },
  );

  return (
    <div className="app" ref={container}>
      <section className="hero bg-primary h-screen"></section>
      <section className="intro bg-secondary h-screen border-8 border-red-500">
        <h1 className="text-red-500 text-7xl font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quidem
          quisquam laudantium, modi odio soluta?
        </h1>
      </section>
      <section className="cards">
        {cards.map((card, index) => (
          <Card
            index={index}
            key={card.index}
            title={card.title}
            copy={card.description}
            image={card.image}
          />
        ))}
      </section>
      <section className="outro bg-accent h-screen">
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque,
          minima!
        </h1>
      </section>
    </div>
  );
}
