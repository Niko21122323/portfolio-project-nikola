"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const ButtonPrimary = ({ title, link }: { title: string; link: string }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

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

  return (
    <Link
      ref={buttonRef}
      href={link}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center w-full bg-primary text-white px-6 py-2.5 rounded-full overflow-hidden outline-2 outline-dark transition-colors duration-300 ease-in-out group"
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
