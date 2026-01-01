"use client";

import { projects } from "@/data/data";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ButtonPrimary from "../ButtonPrimary";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const services: HTMLElement[] = gsap.utils.toArray(".img-container");

      services.forEach((service: HTMLElement) => {
        const imgContainer = service.querySelector(
          ".img",
        ) as HTMLElement | null;
        if (imgContainer) {
          gsap.set(imgContainer, { width: "70%" });
          gsap.set(service, { height: "70%" });
        }
      });

      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      const observerCallback: IntersectionObserverCallback = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const service = entry.target as HTMLElement;
            const imgContainer = service.querySelector(
              ".img",
            ) as HTMLElement | null;

            if (imgContainer) {
              ScrollTrigger.create({
                trigger: service,
                start: "top 80%",
                end: "top 5%",
                scrub: true,
                onUpdate: (self: ScrollTrigger) => {
                  let progress: number = self.progress;
                  let newWidth: number = 70 + 30 * progress;
                  gsap.to(imgContainer, {
                    width: newWidth + "%",
                    duration: 0.1,
                    ease: "none",
                  });
                },
              });

              ScrollTrigger.create({
                trigger: service,
                start: "top 80%",
                end: "top 5%",
                scrub: true,
                onUpdate: (self: ScrollTrigger) => {
                  let progress: number = self.progress;
                  let newHeight: number = 70 + 30 * progress;
                  gsap.to(service, {
                    height: newHeight + "%",
                    duration: 0.1,
                    ease: "none",
                  });
                },
              });
            }

            observer.unobserve(service);
          }
        });
      };

      const observer: IntersectionObserver = new IntersectionObserver(
        observerCallback,
        observerOptions,
      );

      services.forEach((service: HTMLElement) => {
        observer.observe(service);
      });

      return () => {
        observer.disconnect();
      };
    },
    { scope: containerRef },
  );

  return (
    <section className="bg-white pt-16" ref={containerRef}>
      <div>
        {projects.map((project) => (
          <div
            key={project.id}
            className="border-b border-dark/10 first:pt-0 py-16"
          >
            <div className="container max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-12 gap-16">
                <div className="flex flex-col justify-between col-span-5">
                  <h4 className="text-dark/85 text-[32px]">{project.title}</h4>
                  <p className="text-base text-dark/70">
                    {project.description}
                  </p>
                  <div className="w-fit">
                    <Link
                      href={project.pageLink}
                      className="block rounded-full bg-dark/10 text-dark/85 px-6 py-2.5"
                    >
                      Project Details
                    </Link>
                  </div>
                </div>
                <div className="col-span-7 img-container rounded-lg overflow-hidden">
                  <div className="img w-full h-full">
                    <Image
                      src={project.image}
                      alt={`project ${project.title} image`}
                      width={1000}
                      height={700}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-20 pb-10">
        <div className="w-fit mx-auto">
          <ButtonPrimary title="More Projects" link="/projects" />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
