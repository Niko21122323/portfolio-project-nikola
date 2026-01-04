"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.5,
      ignoreMobileResize: true,
      normalizeScroll: true,
    });

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper" style={{ overflow: "hidden" }}>
      <div id="smooth-content" style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
