"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { createPortal } from "react-dom";
import { pageLinks, socialLinks } from "@/data/data";
import Link from "next/link";
import ButtonPrimary from "./ButtonPrimary";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [screenHeight, setScreenHeight] = useState(1000);
  const [linkPositions, setLinkPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setScreenHeight(window.innerHeight);
  }, []);

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
      <nav className="absolute top-0 left-0 w-full z-40">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mx-auto py-8">
            <div
              ref={navRef}
              className="flex items-center justify-between w-full"
            >
              <Link href="/" className="font-bold text-white">
                <h6>Nikola</h6>
              </Link>
              <ul className="flex items-center gap-6">
                <li>
                  <Link href="/about" className="text-white">
                    About Me
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-white">
                    My Projects
                  </Link>
                </li>
                <div className="w-fit">
                  <ButtonPrimary title="Let's Chat" link="/contact" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white"
                >
                  Menu
                </button>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {mounted &&
        createPortal(
          <AnimatePresence mode="wait">
            {isMenuOpen && (
              <motion.aside
                variants={menuSlide}
                initial="initial"
                animate="enter"
                exit="exit"
                className="fixed right-0 top-0 h-screen w-[95%] sm:w-[55%] md:w-[45%] lg:w-[35%] bg-accent z-50"
              >
                <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-accent stroke-none pointer-events-none">
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
                    <div className="bg-primary flex items-center justify-center size-16 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-dark"
                      >
                        X
                      </button>
                    </div>
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
                            onMouseMove={(e) =>
                              handleMouseMove(e, pageLink.link)
                            }
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
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default Navbar;
