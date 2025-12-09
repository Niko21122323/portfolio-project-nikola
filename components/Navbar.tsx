"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import ButtonPrimary from "./ButtonPrimary";
import HamburgerMenu from "./HamburgerMenu";
import { pageLinks, socialLinks } from "@/data/data";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [linkPositions, setLinkPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const screenHeight =
    typeof window !== "undefined" ? window.innerHeight : 1000;
  const initialPath = `M100 0 L100 ${screenHeight} Q-100 ${screenHeight / 2} 100 0`;
  const targetPath = `M100 0 L100 ${screenHeight} Q100 ${screenHeight / 2} 100 0`;

  const menuSlide = {
    initial: { x: "calc(100% + 100px)" },
    enter: {
      x: "0",
      transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) },
    },
    exit: {
      x: "calc(100% + 100px)",
      transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) },
    },
  };

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: cubicBezier(0.76, 0, 0.24, 1) },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) },
    },
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    key: string,
  ) => {
    const linkEl = linkRefs.current[key];
    if (!linkEl) return;
    const rect = linkEl.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    const moveX = mouseX * 0.07;
    const moveY = mouseY * 0.07;
    setLinkPositions((prev) => ({ ...prev, [key]: { x: moveX, y: moveY } }));
  };

  const handleMouseLeave = (key: string) => {
    setLinkPositions((prev) => ({ ...prev, [key]: { x: 0, y: 0 } }));
  };

  return (
    <>
      <nav className="">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-8">
            <div className="bg-primary rounded-full size-10"></div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-fit max-md:hidden">
                <ButtonPrimary
                  title="stojanovski21n@gmail.com"
                  link="mailto:stojanovski21n@gmail.com"
                />
              </div>
              <div className="w-fit">
                <ButtonPrimary title="Linkedin" link="https://linkedin.com" />
              </div>
              <div className="w-fit">
                <ButtonPrimary title="Github" link="https://github.com" />
              </div>
              <div className="ml-2">
                <HamburgerMenu
                  isActive={isMenuOpen}
                  clickEvent={() => setIsMenuOpen(!isMenuOpen)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.aside
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 h-screen w-[95%] sm:w-[55%] md:w-[45%] lg:w-[35%] bg-dark z-50"
          >
            <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-dark stroke-none pointer-events-none">
              <title>Menu curve background</title>
              <motion.path
                variants={curve}
                initial="initial"
                animate="enter"
                exit="exit"
              />
            </svg>
            <div className="py-8 h-full">
              <div className="flex items-center justify-end px-6">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white text-5xl"
                >
                  X
                </button>
              </div>

              <div className="flex flex-col justify-end h-full w-full pb-6">
                <div className="border-b border-body/30 pb-6 px-6">
                  <h6 className="text-body/70 text-xl">Hop Around</h6>
                </div>
                <ul className="flex flex-col pb-6">
                  {pageLinks.map((pageLink) => (
                    <li
                      key={pageLink.link}
                      className="relative overflow-hidden border-b border-body/10 last:border-body/30 group"
                    >
                      <Link
                        ref={(el) => {
                          linkRefs.current[pageLink.link] = el;
                        }}
                        href={pageLink.link}
                        onMouseMove={(e) => handleMouseMove(e, pageLink.link)}
                        onMouseLeave={() => handleMouseLeave(pageLink.link)}
                        className="relative block w-full h-full py-6 z-10 text-body text-3xl sm:text-4xl lg:text-5xl font-bold uppercase px-6 group-hover:text-dark"
                      >
                        <span
                          style={{
                            display: "inline-block",
                            transform: `translate(${linkPositions[pageLink.link]?.x || 0}px, ${linkPositions[pageLink.link]?.y || 0}px)`,
                            transition: "transform 0.1s ease-out",
                          }}
                        >
                          {pageLink.page}
                        </span>
                      </Link>
                      <div className="absolute bottom-0 left-0 w-full h-0 bg-primary group-hover:h-full transition-all duration-300 ease-in-out"></div>
                    </li>
                  ))}
                </ul>
                <div className="pb-6 px-6">
                  <h6 className="text-body/70 text-xl pb-4">On the Web</h6>
                  <ul className="flex items-center gap-4">
                    {socialLinks.map((socialLink) => (
                      <li key={socialLink.key}>
                        <Link
                          href={socialLink.link}
                          className="text-body text-base hover:text-primary transition-colors duration-300 ease-in-out"
                        >
                          {socialLink.social}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
