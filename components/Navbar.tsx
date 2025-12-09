"use client";

import { useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion"; // added cubicBezier
import ButtonPrimary from "./ButtonPrimary";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) }, // <-- fixed
    },
  };

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: cubicBezier(0.76, 0, 0.24, 1) }, // <-- fixed
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: cubicBezier(0.76, 0, 0.24, 1) }, // <-- fixed
    },
  };

  return (
    <>
      <nav className="">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-8">
            <div className="bg-primary rounded-full size-10"></div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-fit">
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
            className="fixed right-0 top-0 h-screen w-[30%] bg-dark z-50"
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
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-5xl"
            >
              X
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
