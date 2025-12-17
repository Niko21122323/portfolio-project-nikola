"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface LoadTextAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function LoadTextAnimation({
  children,
  className = "",
  delay = 0.5,
}: LoadTextAnimationProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    // Function to wrap text nodes in spans while preserving structure
    const wrapTextNodes = (element: Node): void => {
      const childNodes = Array.from(element.childNodes);

      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          const text = node.textContent;
          const words = text.split(/(\s+)/); // Keep whitespace

          const fragment = document.createDocumentFragment();

          words.forEach((word) => {
            if (word.trim()) {
              // Create wrapper for non-whitespace words
              const wordSpan = document.createElement("span");
              wordSpan.className =
                "word-reveal relative inline-block px-[2px] rounded-full";
              wordSpan.style.opacity = "0";

              // Create inner span for text
              const textSpan = document.createElement("span");
              textSpan.style.opacity = "0";
              textSpan.textContent = word;

              wordSpan.appendChild(textSpan);
              fragment.appendChild(wordSpan);
            } else {
              // Preserve whitespace
              fragment.appendChild(document.createTextNode(word));
            }
          });

          node.parentNode?.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Recursively process child elements
          wrapTextNodes(node);
        }
      });
    };

    // Wrap all text nodes in the content
    wrapTextNodes(content);

    // Get all word spans
    const words = Array.from(
      content.querySelectorAll(".word-reveal"),
    ) as HTMLElement[];

    // Define colors that cycle through
    const colors = ["#87bbd7", "#f9b95c", "#d7897f"];

    // Animate each word on load
    words.forEach((word, index) => {
      const colorIndex = index % colors.length;
      const hex = colors[colorIndex].replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      word.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      const textSpan = word.querySelector("span");

      // Create timeline for each word
      const tl = gsap.timeline({
        delay: delay + index * 0.05, // Stagger each word by 0.05s
      });

      // Word fades in with background
      tl.to(word, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Background fades out and text fades in
      tl.to(
        word,
        {
          backgroundColor: `rgba(${r}, ${g}, ${b}, 0)`,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.1",
      );

      if (textSpan) {
        tl.to(
          textSpan,
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.4",
        );
      }
    });
  }, [children, delay]);

  return (
    <div ref={contentRef} className={`${className}`}>
      {children}
    </div>
  );
}
