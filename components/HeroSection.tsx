"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import heroImage from "../public/assets/images/my-image.jpg";
import { useGSAP } from "@gsap/react";
import ButtonPrimary from "./ButtonPrimary";
import LoadTextAnimation from "./LoadTextAnimation";

const HeroSection = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const button1Ref = useRef<HTMLDivElement>(null);
  const button2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!imageRef.current || !button1Ref.current || !button2Ref.current) return;

    gsap.fromTo(
      imageRef.current,
      {
        y: "300px",
        opacity: 0,
        scale: 0.2,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1,0.5)",
        delay: 0.2,
      },
    );

    gsap.fromTo(
      button1Ref.current,
      {
        y: "300px",
        opacity: 0,
        scale: 0.2,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1,0.8)",
        delay: 1,
      },
    );

    gsap.fromTo(
      button2Ref.current,
      {
        y: "300px",
        opacity: 0,
        scale: 0.2,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1,0.8)",
        delay: 1.2,
      },
    );
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative container mx-auto px-4 z-10">
        <div className="min-h-screen flex flex-col items-center justify-center mt-12">
          <div ref={imageRef}>
            <Image
              src={heroImage}
              alt="hero image"
              width={500}
              height={500}
              className="size-20 object-cover rounded-full"
            />
          </div>
          <LoadTextAnimation>
            <p className="text-dark/80 text-lg pt-6">Hi! I'm Nikola</p>
          </LoadTextAnimation>
          <LoadTextAnimation delay={0.8}>
            <h1 className="text-dark text-3xl sm:text-4xl font-medium text-center max-w-[700px] pt-4">
              Full-stack developer focused on building thoughtful web
              experiences from start to finish.
            </h1>
          </LoadTextAnimation>
          <div className="flex items-center gap-2 pt-8">
            <div ref={button1Ref} className="w-fit">
              <ButtonPrimary title="About Me" link="/about" />
            </div>
            <div ref={button2Ref} className="w-fit">
              <ButtonPrimary title="Contact Me" link="/contact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
