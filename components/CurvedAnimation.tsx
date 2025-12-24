"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CurvedSectionProps {
  children: ReactNode;
}

export default function CurvedAnimation({ children }: CurvedSectionProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const bottomHeight = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const topHeight = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bottomHeightVh = useTransform(bottomHeight, (value) => `${value}vh`);
  const topHeightVh = useTransform(topHeight, (value) => `${value}vh`);

  useEffect(() => {
    let rafId: number;

    const unsubscribe = scrollYProgress.on("change", () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  return (
    <div ref={container} className="wrapper z-20">
      <div className="curved-section">
        <motion.div
          style={{ height: topHeightVh }}
          className="top-circle-container"
        >
          <div className="top-circle"></div>
        </motion.div>
        {children}
        <motion.div
          style={{ height: bottomHeightVh }}
          className="circle-container"
        >
          <div className="circle"></div>
        </motion.div>
      </div>
    </div>
  );
}
