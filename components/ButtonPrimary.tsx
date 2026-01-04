"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { IoArrowForward } from "react-icons/io5";
import gsap from "gsap";

const ButtonPrimary = ({
  title,
  link,
  hoverColor,
}: {
  title: string;
  link: string;
  hoverColor?: string;
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const arrowCircleRef = useRef<HTMLDivElement>(null);
  const titleCircleRef = useRef<HTMLDivElement>(null);
  const arrowTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const titleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const arrowTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const titleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (
      !buttonRef.current ||
      !arrowCircleRef.current ||
      !titleCircleRef.current
    )
      return;

    const button = buttonRef.current;
    const xTo = gsap.quickTo(button, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(button, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    arrowTimelineRef.current = gsap.timeline({ paused: true });
    arrowTimelineRef.current
      .to(
        arrowCircleRef.current,
        { top: "-25%", width: "150%", duration: 0.3, ease: "power3.in" },
        "enter",
      )
      .to(
        arrowCircleRef.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit",
      );

    titleTimelineRef.current = gsap.timeline({ paused: true });
    titleTimelineRef.current
      .to(
        titleCircleRef.current,
        { top: "-25%", width: "150%", duration: 0.3, ease: "power3.in" },
        "enter",
      )
      .to(
        titleCircleRef.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit",
      );

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left - centerX;
      const mouseY = e.clientY - rect.top - centerY;

      xTo(mouseX * 0.35);
      yTo(mouseY * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      if (arrowTimeoutRef.current) clearTimeout(arrowTimeoutRef.current);
      if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
    };
  }, []);

  const handleLinkMouseEnter = () => {
    if (arrowTimeoutRef.current) clearTimeout(arrowTimeoutRef.current);
    if (titleTimeoutRef.current) clearTimeout(titleTimeoutRef.current);
    arrowTimelineRef.current?.tweenFromTo("enter", "exit");
    titleTimelineRef.current?.tweenFromTo("enter", "exit");
  };

  const handleLinkMouseLeave = () => {
    arrowTimeoutRef.current = setTimeout(() => {
      arrowTimelineRef.current?.play();
    }, 300);
    titleTimeoutRef.current = setTimeout(() => {
      titleTimelineRef.current?.play();
    }, 300);
  };

  return (
    <Link
      ref={buttonRef}
      href={link}
      onMouseEnter={handleLinkMouseEnter}
      onMouseLeave={handleLinkMouseLeave}
      className="relative flex items-center group"
    >
      <span className="relative z-10 block rounded-full text-dark bg-primary outline outline-primary p-3 overflow-hidden -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out">
        <IoArrowForward
          className={`size-5 relative z-10 transition-colors duration-400 ${hoverColor === "light" ? "" : "group-hover:text-white"}`}
        />
        <div
          ref={arrowCircleRef}
          className={`absolute w-full h-[150%] top-full left-0 ${hoverColor === "light" ? "bg-body" : "bg-dark"}`}
        />
      </span>
      <span className="relative z-10 block text-dark bg-primary outline outline-primary rounded-full px-8 py-3 overflow-hidden">
        <span
          className={`relative z-10 transition-colors duration-400 ease-in-out ${hoverColor === "light" ? "" : "group-hover:text-white"}`}
        >
          {title}
        </span>
        <div
          ref={titleCircleRef}
          className={`absolute w-full h-[150%] top-full left-0 ${hoverColor === "light" ? "bg-body" : "bg-dark"}`}
        />
      </span>
    </Link>
  );
};

export default ButtonPrimary;
