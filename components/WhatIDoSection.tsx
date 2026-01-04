"use client";

import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Marquee from "./LoopSection";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string | StaticImageData;
}

const WhatIDoSection = () => {
  const services: Service[] = [
    {
      id: 1,
      title: "Development",
      subtitle: "Lorem",
      description:
        "I build fast, scalable web applications from the ground up. From clean component architecture to reliable backend logic, I focus on writing code that's easy to maintain and ready to grow.",
      image: "/assets/images/projects/project-4.png",
    },
    {
      id: 2,
      title: "Usability",
      subtitle: "Lorem",
      description:
        "I care deeply about how things feel to use. I turn complex ideas into clear, intuitive interfaces with attention to interaction, accessibility, and performance across devices.",
      image: "/assets/images/projects/project-4.png",
    },
    {
      id: 3,
      title: "Optimization",
      subtitle: "Lorem",
      description:
        "I don't just ship features I make sure they last. Through testing, optimization, and thoughtful architecture, I deliver stable, performant products that hold up in real-world use.",
      image: "/assets/images/projects/project-4.png",
    },
  ];

  const [activeService, setActiveService] = useState<Service>(services[0]);
  const [isDark, setIsDark] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const serviceTitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const handleServiceHover = (service: Service) => {
    if (service.id === activeService.id) return;

    const serviceIndex = services.findIndex((s) => s.id === service.id);
    const translateY = serviceIndex * 70;

    gsap.to(contentRef.current, {
      opacity: 0,
      y: translateY,
      duration: 0.25,
      onComplete: () => {
        setActiveService(service);
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.25,
        });
      },
    });
  };

  useGSAP(
    () => {
      gsap.set(sectionRef.current, {
        backgroundColor: "white",
      });

      // Animate background color
      gsap.to(sectionRef.current, {
        backgroundColor: "#0d0e0e",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => setIsDark(true),
          onLeaveBack: () => setIsDark(false),
        },
      });

      // Animate main title color
      gsap.to(titleRef.current, {
        color: "#ffffff",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate service title color
      gsap.to(serviceTitleRef.current, {
        color: "#ffffff",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate description color
      gsap.to(descriptionRef.current, {
        color: "rgba(255, 255, 255, 0.9)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Don't animate service items with GSAP - let React handle it with isDark state
    },
    { scope: sectionRef },
  );

  return (
    <section className="pb-36 bg-white" ref={sectionRef} id="what-i-do-section">
      <Marquee />

      <div className="container mx-auto max-w-7xl px-6">
        <div className="mt-36">
          <div className="flex gap-24">
            <div className="flex-1 relative">
              <div ref={contentRef}>
                <h5 ref={serviceTitleRef} className="text-xl text-text pb-4">
                  {activeService.title}
                </h5>
                <p ref={descriptionRef} className="text-text/90 text-lg pb-4">
                  {activeService.description}
                </p>
                <Image
                  src={activeService.image}
                  alt="service image"
                  width={300}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="flex-2 flex flex-col gap-10">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-b border-white/20 pb-10 cursor-pointer"
                  onMouseEnter={() => handleServiceHover(service)}
                >
                  <h3
                    className={`text-8xl pl-6 transition-colors duration-150 ${
                      isDark
                        ? activeService.id === service.id
                          ? "text-white"
                          : "text-white/50 hover:text-white/70"
                        : activeService.id === service.id
                          ? "text-dark"
                          : "text-dark/50 hover:text-dark/70"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
