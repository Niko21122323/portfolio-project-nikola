"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { PiStarFourFill } from "react-icons/pi";

const Marquee = () => {
  const movingContainer = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline | null>(null);
  const timelineTimeScaleTween = useRef<GSAPTween | null>(null);

  useEffect(() => {
    if (!movingContainer.current) return;

    gsap.set(movingContainer.current, { xPercent: 0 });

    timeline.current = gsap
      .timeline({
        defaults: { ease: "none", repeat: -1 },
      })
      .to(movingContainer.current, {
        xPercent: -50,
        duration: 80,
      })
      .set(movingContainer.current, { xPercent: 0 });

    return () => {
      timeline.current?.kill();
      timelineTimeScaleTween.current?.kill();
    };
  }, []);

  const onPointerEnter = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 0.25,
      duration: 0.4,
    });
  };

  const onPointerLeave = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 1,
      duration: 0.2,
    });
  };

  const list = useMemo(
    () => (
      <div className="flex w-fit items-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div className="relative flex shrink-0 items-center justify-center py-8">
              <span className="text-5xl uppercase font-medium text-white whitespace-nowrap">
                What I Bring to the Table
              </span>
            </div>
            <div className="relative flex shrink-0 items-center justify-center px-8 py-8">
              <PiStarFourFill className="text-4xl text-white" />
            </div>
          </div>
        ))}
      </div>
    ),
    [],
  );

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={movingContainer}
        className="flex w-fit"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {list}
        {list}
      </div>
    </div>
  );
};

export default Marquee;
