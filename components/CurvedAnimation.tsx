"use client";

import { useRef, useEffect, ReactNode } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CurvedSectionProps {
  children: ReactNode;
}

export default function CurvedAnimation({ children }: CurvedSectionProps) {
  const container = useRef(null);
  const lastRefreshValue = useRef(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const bottomHeight = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const topHeight = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const bottomHeightVh = useTransform(bottomHeight, (value) => `${value}vh`);
  const topHeightVh = useTransform(topHeight, (value) => `${value}vh`);

  useEffect(() => {
    // Only refresh when scroll progress crosses certain thresholds
    // This reduces refresh calls dramatically
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const threshold = 0.1; // Refresh every 10% of scroll progress
      const currentBucket = Math.floor(latest / threshold);
      const lastBucket = Math.floor(lastRefreshValue.current / threshold);

      if (currentBucket !== lastBucket) {
        lastRefreshValue.current = latest;
        ScrollTrigger.refresh();
      }
    });

    return () => {
      unsubscribe();
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
