'use client';

import { useEffect, useRef, useState } from "react";

/**
 * AnimatedCounter — animates from 0 to target when scrolled into view.
 * Uses requestAnimationFrame with easeOutExpo. Transform-free, just text.
 */
export function AnimatedCounter({
  value,
  duration = 2000,
  className = "",
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Begint op de ECHTE waarde, niet op "0". Anders staat er in de server-HTML
  // een nul: dat is wat zoekmachines, bezoekers zonder JavaScript en iedereen
  // die niet tot dit blok scrollt te zien krijgt. "0+ maanden dagelijks in
  // gebruik" is precies het tegenovergestelde van wat die strip moet zeggen.
  // De animatie zet zelf terug naar nul op het moment dat hij begint.
  const [display, setDisplay] = useState(() => formatNumber(value));
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(formatNumber(value));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            setDisplay("0"); // pas hier naar nul, vlak voor de animatie
            const start = performance.now();
            function tick(now: number) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = easeOutExpo(progress);
              const current = Math.round(value * eased);
              setDisplay(formatNumber(current));
              if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatNumber(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString("nl-NL");
  }
  return String(n);
}
