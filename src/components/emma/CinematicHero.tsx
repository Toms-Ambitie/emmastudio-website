'use client';

import { useEffect, useRef } from "react";

const FRAME_COUNT = 101;
const FRAME_PATH = "/frames/hero/frame_";

/**
 * CinematicHero — full-bleed scroll-scrub video header.
 * Draws a canvas image-sequence bound to scroll progress.
 * Frame 1 renders immediately (screenshot-safe).
 * Reduced-motion: static final frame, no scrub.
 */
export function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const loadedCountRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Preload all frames
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    function drawFrame(idx: number) {
      if (!canvas || !ctx) return;
      const img = images[idx];
      if (!img || !img.complete) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Cover fit
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let dw = w, dh = h, dx = 0, dy = 0;
      if (imgAspect > canvasAspect) {
        dh = h;
        dw = h * imgAspect;
        dx = (w - dw) / 2;
      } else {
        dw = w;
        dh = w / imgAspect;
        dy = (h - dh) / 2;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    // Load frame 1 first for instant first paint
    const img1 = new Image();
    img1.onload = () => {
      drawFrame(0);
      currentFrameRef.current = 0;
    };
    img1.src = `${FRAME_PATH}001.jpg`;
    images.push(img1);

    // Load remaining frames
    for (let i = 2; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const idx = i - 1;
      img.onload = () => {
        loadedCountRef.current++;
        // Draw frame 1 immediately when first load completes
        if (loadedCountRef.current === 1) {
          drawFrame(0);
        }
      };
      img.src = `${FRAME_PATH}${String(i).padStart(3, "0")}.jpg`;
      images.push(img);
    }

    if (prefersReduced) {
      // Static: just show last frame
      const lastImg = new Image();
      lastImg.onload = () => drawFrame(FRAME_COUNT - 1);
      lastImg.src = `${FRAME_PATH}${String(FRAME_COUNT).padStart(3, "0")}.jpg`;
      return;
    }

    // Scroll-scrub: map scroll position to frame index
    function onScroll() {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      scrollProgressRef.current = progress;

      const targetFrame = Math.min(
        Math.floor(progress * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1
      );

      if (targetFrame !== currentFrameRef.current) {
        currentFrameRef.current = targetFrame;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const img = images[targetFrame];
          if (img && img.complete) {
            drawFrame(targetFrame);
          } else {
            // Find nearest loaded frame
            let nearest = targetFrame;
            while (nearest > 0 && (!images[nearest] || !images[nearest].complete)) {
              nearest--;
            }
            if (images[nearest] && images[nearest].complete) {
              drawFrame(nearest);
            }
          }
        });
      }
    }

    // Also support GSAP-driven scroll (Lenis updates window.scrollY)
    let scrollTickScheduled = false;
    function onScrollTick() {
      if (scrollTickScheduled) return;
      scrollTickScheduled = true;
      requestAnimationFrame(() => {
        scrollTickScheduled = false;
        onScroll();
      });
    }

    window.addEventListener("scroll", onScrollTick, { passive: true });
    window.addEventListener("resize", () => drawFrame(currentFrameRef.current));

    return () => {
      window.removeEventListener("scroll", onScrollTick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
