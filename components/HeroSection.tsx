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
      <div className="min-h-screen bg-transparent absolute h-full w-full">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `
       radial-gradient(ellipse 140% 50% at 15% 40%, rgba(123, 97, 255, 0.11), transparent 48%),
       radial-gradient(ellipse 90% 80% at 85% 75%, rgba(123, 97, 255, 0.09), transparent 58%),
       radial-gradient(ellipse 120% 65% at 40% 10%, rgba(123, 97, 255, 0.13), transparent 52%),
       radial-gradient(ellipse 100% 45% at 70% 95%, rgba(123, 97, 255, 0.07), transparent 42%),
       radial-gradient(ellipse 80% 75% at 90% 20%, rgba(123, 97, 255, 0.10), transparent 55%),
       transparent
     `,
          }}
        />
      </div>
      <div className="relative container mx-auto px-4 z-10">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div ref={imageRef}>
            <Image
              src={heroImage}
              alt="hero image"
              width={500}
              height={500}
              className="size-20 object-cover rounded-full"
            />
          </div>
          <p className="text-white/80 text-lg border border-white/30 rounded-full px-4 py-2 mt-6 leading-none">
            Hi! I'm Nikola
          </p>
          <h1 className="text-white text-3xl sm:text-5xl font-medium text-center max-w-[800px] pt-4">
            Full-stack developer building thoughtful web experiences.
          </h1>
          <div className="flex items-center gap-2 pt-10">
            <div ref={button1Ref} className="w-fit">
              <ButtonPrimary title="About Me" link="/about" />
            </div>
            <div ref={button2Ref} className="w-fit">
              <ButtonPrimary
                title="Contact Me"
                link="/contact"
                direction="reverse"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
