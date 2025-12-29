"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonPrimary from "./ButtonPrimary";

gsap.registerPlugin(ScrollTrigger);

const AboutSectionHomePage = () => {
  const container = useRef(null);
  const curveContainerRef = useRef(null);

  useGSAP(
    () => {
      if (!curveContainerRef.current) return;

      gsap.fromTo(
        curveContainerRef.current,
        { height: "0vh" },
        {
          height: "30vh",
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section ref={container} className="relative bg-body pt-10 py-36 z-20">
      {/* Absolutely positioned curve - doesn't affect layout */}
      <div
        ref={curveContainerRef}
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{ height: 0 }}
      >
        <div
          className="absolute bottom-0 left-1/2 bg-body"
          style={{
            width: "120%",
            height: "350%",
            borderRadius: "50% 50% 0 0",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Content - unaffected by curve */}
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col items-center justify-center gap-16 max-w-5xl mx-auto">
          <h2 className="text-dark/90 md:text-5xl text-center text-pretty">
            I'm Nikola, a full-stack developer crafting fast, scalable, and
            user-focused digital experiences from frontend polish to backend
            logic.
          </h2>
          <p className="text-dark/50 text-2xl text-center text-pretty">
            I develop end-to-end web applications using JavaScript, TypeScript,
            React, Next.js, Node.js, GraphQL, Prisma, and databases like MongoDB
            and SQL.
          </p>
          <div className="w-fit">
            <ButtonPrimary title="More About Me" link="/about" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionHomePage;
