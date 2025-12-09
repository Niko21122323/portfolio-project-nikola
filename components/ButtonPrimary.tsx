"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const ButtonPrimary = ({ title, link }: { title: string; link: string }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.width / 5;
    const centerY = rect.height / 5;
    const mouseX = e.clientX - rect.left - centerX;
    const mouseY = e.clientY - rect.top - centerY;
    const moveX = -mouseX * 0.1;
    const moveY = -mouseY * 0.1;

    setTextPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setTextPosition({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={buttonRef}
      href={link}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center w-full px-7 py-2.5 rounded-full overflow-hidden outline outline-dark hover:outline-primary transition-colors duration-300 ease-in-out group"
    >
      <span
        className="relative z-10 text-dark group-hover:text-body transition-colors duration-300 ease-in-out"
        style={{
          transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {title}
      </span>
      <div className="absolute bottom-1/2 translate-y-1/2 left-1/2 -translate-x-1/2 size-0 bg-transparent rounded-full group-hover:h-full group-hover:size-full group-hover:bg-primary transition-all duration-300 ease-in-out"></div>
    </Link>
  );
};

export default ButtonPrimary;
