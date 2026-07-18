'use client';

import { useEffect, useRef } from "react";

/**
 * KineticText — splits text into words and reveals them on scroll
 * with a stagger. Transform-only animation (y + scale), never opacity-to-zero.
 * Uses split-type + GSAP ScrollTrigger.
 */
export function KineticText({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: string;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup: (() => void) | null = null;

    (async () => {
      const SplitType = (await import("split-type")).default;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const split = new SplitType(el, { types: "words" });
      const words = split.words;
      if (!words || words.length === 0) return;

      gsap.set(words, { yPercent: 120, rotate: 3 });

      const anim = gsap.to(words, {
        yPercent: 0,
        rotate: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      cleanup = () => {
        anim.kill();
        split.revert();
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, [children]);

  return (
    <Tag ref={ref as any} className={className} style={{ overflow: "hidden" }}>
      {children}
    </Tag>
  );
}
