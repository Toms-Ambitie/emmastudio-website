'use client';

import { useEffect } from "react";

/**
 * ScrollEffects — sets up Lenis smooth scroll and GSAP ScrollTrigger
 * for parallax, section reveals, and staggered animations.
 * All effects are prefers-reduced-motion safe.
 */
export function ScrollEffects() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let lenis: any = null;

    async function setup() {
      const Lenis = (await import("lenis")).default;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Lenis smooth scroll
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // Parallax on images with data-parallax attribute
      const parallaxEls = document.querySelectorAll("[data-parallax]");
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0.3");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      // Section reveals (transform only, never opacity-to-zero for screenshot safety)
      const revealEls = document.querySelectorAll("[data-reveal]");
      revealEls.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, scale: 0.97 },
          {
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Staggered children reveals
      const staggerEls = document.querySelectorAll("[data-stagger-group]");
      staggerEls.forEach((group) => {
        const items = group.querySelectorAll("[data-stagger-item]");
        gsap.fromTo(
          items,
          { y: 40, scale: 0.95 },
          {
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Module accent bars grow on scroll
      const moduleBars = document.querySelectorAll("[data-module-bar]");
      moduleBars.forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            ease: "power2.out",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: bar,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Horizontal scroll for module showcase
      const horizontalTrack = document.querySelector("[data-horizontal-track]");
      if (horizontalTrack) {
        const trackWidth = horizontalTrack.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = Math.max(0, trackWidth - viewportWidth);

        gsap.to(horizontalTrack, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-horizontal-section]",
            start: "top top",
            end: `+=${scrollDistance + 200}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        });
      }
    }

    setup();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
