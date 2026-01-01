"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../public/assets/images/my-image.jpg";
import { useGSAP } from "@gsap/react";
import ButtonPrimary from "./ButtonPrimary";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Pin the hero section
    if (heroRef.current) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden h-screen bg-dark"
    >
      <div className="relative container mx-auto px-4 z-10">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div>
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
            <div className="w-fit">
              <ButtonPrimary
                title="About Me"
                link="/about"
                hoverColor="light"
              />
            </div>
            <div className="w-fit">
              <ButtonPrimary
                title="Contact Me"
                link="/contact"
                hoverColor="light"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
