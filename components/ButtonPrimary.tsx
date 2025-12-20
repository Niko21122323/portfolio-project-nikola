"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";

const ButtonPrimary = ({
  title,
  link,
  direction = "normal",
}: {
  title: string;
  link: string;
  direction?: "normal" | "reverse";
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!buttonRef.current) return;
    const initialGradient =
      direction === "reverse"
        ? "linear-gradient(10deg, rgba(13, 14, 14, 1) 0%, rgba(123, 97, 255, 0.5) 90%)"
        : "linear-gradient(10deg, rgba(123, 97, 255, 0.5) 0%, rgba(13, 14, 14, 1) 70%)";

    buttonRef.current.style.background = initialGradient;
  }, [direction]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    const moveX = mouseX * 0.07;
    const moveY = mouseY * 0.07;
    setButtonPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setButtonPosition({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;
    const gradient =
      direction === "reverse"
        ? "linear-gradient(10deg, rgba(123, 97, 255, 0.5) 0%, rgba(13, 14, 14, 1) 70%)"
        : "linear-gradient(10deg, rgba(13, 14, 14, 1) 0%, rgba(123, 97, 255, 0.5) 70%)";

    gsap.to(buttonRef.current, {
      background: gradient,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeaveGradient = () => {
    if (!buttonRef.current) return;
    const gradient =
      direction === "reverse"
        ? "linear-gradient(10deg, rgba(13, 14, 14, 1) 0%, rgba(123, 97, 255, 0.5) 70%)"
        : "linear-gradient(10deg, rgba(123, 97, 255, 0.5) 0%, rgba(13, 14, 14, 1) 70%)";

    gsap.to(buttonRef.current, {
      background: gradient,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Link
      ref={buttonRef}
      href={link}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {
        handleMouseLeave();
        handleMouseLeaveGradient();
      }}
      className="relative flex items-center w-full text-white px-6 py-2.5 rounded-full overflow-hidden outline outline-white/10 transition-colors duration-300 ease-in-out group"
      style={{
        transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {title}
    </Link>
  );
};

export default ButtonPrimary;
