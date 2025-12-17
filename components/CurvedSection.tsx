"use client";
import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSectionHomePage from "./AboutSectionHomePage";

export default function CurvedSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const bottomHeight = useTransform(scrollYProgress, [0, 0.9], [50, 0]);
  const topHeight = useTransform(scrollYProgress, [0, 0.9], [0, 50]);
  const bottomHeightVh = useTransform(bottomHeight, (value) => `${value}vh`);
  const topHeightVh = useTransform(topHeight, (value) => `${value}vh`);

  useEffect(() => {
    // Refresh ScrollTrigger after Framer Motion animations
    ScrollTrigger.refresh();
  }, [scrollYProgress]);

  return (
    <>
      <div ref={container} className="wrapper z-20">
        <div className="curved-section">
          <motion.div
            style={{ height: topHeightVh }}
            className="top-circle-container"
          >
            <div className="top-circle"></div>
          </motion.div>
          <AboutSectionHomePage />
          <motion.div
            style={{ height: bottomHeightVh }}
            className="circle-container"
          >
            <div className="circle"></div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
