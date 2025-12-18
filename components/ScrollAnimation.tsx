"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollAnimation({
  children,
  className = "",
}: ScrollAnimationProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;

    const content = contentRef.current;

    const wrapTextNodes = (element: Node): void => {
      const childNodes = Array.from(element.childNodes);

      childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          const text = node.textContent;
          const words = text.split(/(\s+)/); // Keep whitespace

          const fragment = document.createDocumentFragment();

          words.forEach((word) => {
            if (word.trim()) {
              const wordSpan = document.createElement("span");
              wordSpan.className =
                "word-reveal relative inline-block rounded-full";
              wordSpan.style.opacity = "0";
              const textSpan = document.createElement("span");
              textSpan.style.opacity = "0";
              textSpan.textContent = word;

              wordSpan.appendChild(textSpan);
              fragment.appendChild(wordSpan);
            } else {
              fragment.appendChild(document.createTextNode(word));
            }
          });

          node.parentNode?.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          wrapTextNodes(node);
        }
      });
    };

    wrapTextNodes(content);

    const words = Array.from(
      content.querySelectorAll(".word-reveal"),
    ) as HTMLElement[];
    const totalWords = words.length;
    const colors = ["#7b61ff", "#ffe459", "#ff5e54"];

    words.forEach((word, index) => {
      const colorIndex = index % colors.length;
      word.style.backgroundColor = colors[colorIndex];
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: content,
      start: "top 90%", // Start when top of content is 80% from top (20% from bottom)
      end: "bottom 80%", // End when bottom is 20% from top
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        words.forEach((word, index) => {
          const overlapWords = 15;
          const wordStart = index / totalWords;
          const wordEnd = wordStart + overlapWords / totalWords;

          const totalAnimationLength = 1 + overlapWords / totalWords;
          const timelineScale =
            1 /
            Math.min(
              totalAnimationLength,
              1 + (totalWords - 1) / totalWords + overlapWords / totalWords,
            );

          const adjustedStart = wordStart * timelineScale;
          const adjustedEnd = wordEnd * timelineScale;
          const duration = adjustedEnd - adjustedStart;

          const wordProgress =
            progress <= adjustedStart
              ? 0
              : progress >= adjustedEnd
                ? 1
                : (progress - adjustedStart) / duration;

          word.style.opacity = String(wordProgress);

          const backgroundFadeStart =
            wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
          const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
          const colorIndex = index % colors.length;
          const hex = colors[colorIndex].replace("#", "");
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);

          word.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${backgroundOpacity})`;

          const textRevealThreshold = 0.9;
          const textRevealProgress =
            wordProgress >= textRevealThreshold
              ? (wordProgress - textRevealThreshold) / (1 - textRevealThreshold)
              : 0;

          const textSpan = word.querySelector("span");
          if (textSpan) {
            (textSpan as HTMLElement).style.opacity = String(
              Math.pow(textRevealProgress, 0.5),
            );
          }
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [children]);

  return (
    <div ref={contentRef} className={`${className}`}>
      {children}
    </div>
  );
}
