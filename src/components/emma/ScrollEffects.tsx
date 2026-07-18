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
    // References captured for a complete teardown. The old cleanup only called
    // lenis.destroy(), leaving the gsap.ticker callback firing on a dead Lenis,
    // lagSmoothing disabled and every ScrollTrigger alive across navigations.
    let gsapRef: any = null;
    let ScrollTriggerRef: any = null;
    let tickerCb: ((time: number) => void) | null = null;
    let onLinkClick: ((e: MouseEvent) => void) | null = null;

    async function setup() {
      const Lenis = (await import("lenis")).default;
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsapRef = gsap;
      ScrollTriggerRef = ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Lenis smooth scroll
      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);
      tickerCb = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCb);
      gsap.ticker.lagSmoothing(0);

      // Scroll ownership: Next owns navigation scroll (route changes scroll
      // instantly to the top — see globals.css, no smooth-scroll), Lenis owns
      // wheel/touch. But a click on a link to the *current* page (the logo →
      // "/") is not a route change, so Next's scrollTo(0,0) gets overwritten by
      // Lenis on the next frame. Route those same-page clicks through Lenis so
      // the logo actually returns to the top, and keep in-page anchor links
      // (the nav's /#hoe, /#modules, …) smooth now that CSS smooth-scroll is
      // gone.
      onLinkClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const target = e.target as HTMLElement | null;
        const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
        if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
        let url: URL;
        try {
          url = new URL(a.href, window.location.href);
        } catch {
          return;
        }
        if (url.origin !== window.location.origin) return;
        // Different route → Lenis wijkt. Stop de raf-loop meteen, anders blijft
        // Lenis tijdens de client-transitie (homepage nog gemount) de oude
        // scrollpositie terugzetten en verschijnt de nieuwe pagina kort op die
        // diepte (§7.5, bug 2). Next scrollt daarna naar top; ScrollReset borgt.
        if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
          lenis.stop();
          return;
        }
        // Same page, no hash → return to the top through Lenis.
        if (!url.hash || url.hash === "#") {
          e.preventDefault();
          lenis.scrollTo(0);
          return;
        }
        // Same page with a hash → smooth-scroll to the target if it exists.
        const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (el) {
          e.preventDefault();
          // Numeriek doel uit de LIVE positie (getBoundingClientRect +
          // scrollY): dat verrekent de GSAP-pin-inflatie die lenis.scrollTo(el)
          // via offsetTop mist. Offset -80 voor de vaste nav (64px).
          const target = el.getBoundingClientRect().top + window.scrollY - 80;
          lenis.scrollTo(target, { duration: 1, force: true });
        }
      };
      document.addEventListener("click", onLinkClick, { capture: true });

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
      if (onLinkClick) document.removeEventListener("click", onLinkClick, { capture: true });
      if (tickerCb && gsapRef) gsapRef.ticker.remove(tickerCb);
      if (gsapRef) gsapRef.ticker.lagSmoothing(500, 33); // restore GSAP's default
      if (ScrollTriggerRef) ScrollTriggerRef.getAll().forEach((t: any) => t.kill());
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}
