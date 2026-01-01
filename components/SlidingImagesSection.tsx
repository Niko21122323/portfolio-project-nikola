"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import testImage from "../public/assets/images/project-test.webp";

gsap.registerPlugin(ScrollTrigger);

const slider1 = [
  { color: "#e3e5e7", id: 1 },
  { color: "#d6d7dc", id: 2 },
  { color: "#e3e3e3", id: 3 },
  { color: "#21242b", id: 4 },
];

const slider2 = [
  { color: "#d4e3ec", id: 5 },
  { color: "#e5e0e1", id: 6 },
  { color: "#d7d4cf", id: 7 },
  { color: "#e1dad6", id: 8 },
];

const SlidingImagesSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const slider1Ref = useRef<HTMLDivElement>(null);
  const slider2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current || !slider1Ref.current || !slider2Ref.current)
        return;

      gsap.to(slider1Ref.current, {
        x: 150,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(slider2Ref.current, {
        x: -150,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: container },
  );

  return (
    <div ref={container} className="flex flex-col gap-4 bg-body">
      {/* First Slider */}
      <div
        ref={slider1Ref}
        className="flex gap-4 w-[120vw] left-[-10vw] relative"
      >
        {slider1.map((project) => (
          <div
            key={project.id}
            className="w-[25%] h-[10vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-[80%] h-[80%]">
              <Image
                src={testImage}
                alt="project image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Second Slider */}
      <div
        ref={slider2Ref}
        className="flex gap-4 w-[120vw] left-[-10vw] relative"
      >
        {slider2.map((project) => (
          <div
            key={project.id}
            className="w-[25%] h-[10vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative w-[80%] h-[80%]">
              <Image
                src={testImage}
                alt="project image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidingImagesSection;
