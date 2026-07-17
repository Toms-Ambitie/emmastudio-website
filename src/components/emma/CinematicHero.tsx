'use client';

import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 101;
const FRAME_PATH = "/frames/hero/frame_";
const STATIC_SRC = "/assets/hero-cinematic.jpg";
const MOBILE_BREAKPOINT = 768;
const CONCURRENCY = 6;

/** Sample ~51 frames uit de 101 (elke 2e, plus altijd de laatste). Halveert
 *  de payload; over één viewport-hoogte scrub blijft dat vloeiend. */
function buildFrameList(): number[] {
  const list: number[] = [];
  for (let i = 1; i <= TOTAL_FRAMES; i += 2) list.push(i);
  if (list[list.length - 1] !== TOTAL_FRAMES) list.push(TOTAL_FRAMES);
  return list;
}

/**
 * CinematicHero — full-bleed scroll-scrub image-sequence header.
 *
 * Performance (briefing §7.2):
 * - Mobiel (<768px) of prefers-reduced-motion → géén frame-sequence:
 *   één statisch beeld, nul frame-requests. De 4 MB aan frames laadt daar
 *   dus nooit.
 * - Desktop → frame 1 direct (screenshot-safe), de rest progressief in
 *   batches van CONCURRENCY i.p.v. 100 gelijktijdige requests.
 * - 101 → ~51 frames gesampeld.
 */
export function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Beslis client-side (ClientOnly mount al gegarandeerd): statisch of canvas.
  const [isStatic] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < MOBILE_BREAKPOINT;
    return reduced || mobile;
  });

  useEffect(() => {
    if (isStatic) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames = buildFrameList();
    const images: (HTMLImageElement | undefined)[] = new Array(frames.length);
    let disposed = false;

    function drawFrame(idx: number) {
      if (!canvas || !ctx) return;
      const img = images[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const imgAspect = img.width / img.height;
      const canvasAspect = w / h;
      let dw = w, dh = h, dx = 0, dy = 0;
      if (imgAspect > canvasAspect) {
        dh = h; dw = h * imgAspect; dx = (w - dw) / 2;
      } else {
        dw = w; dh = w / imgAspect; dy = (h - dh) / 2;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function drawNearest(targetIdx: number) {
      let nearest = targetIdx;
      while (nearest > 0 && (!images[nearest] || !images[nearest]!.complete)) nearest--;
      if (images[nearest] && images[nearest]!.complete) drawFrame(nearest);
    }

    // Progressieve batch-loader: frame 0 eerst (direct tekenen), rest in
    // batches van CONCURRENCY.
    let nextToLoad = 1;
    let active = 0;
    function pump() {
      while (!disposed && active < CONCURRENCY && nextToLoad < frames.length) {
        const idx = nextToLoad++;
        active++;
        const img = new Image();
        images[idx] = img;
        const done = () => { active--; if (!disposed) pump(); };
        img.onload = done;
        img.onerror = done;
        img.src = `${FRAME_PATH}${String(frames[idx]).padStart(3, "0")}.jpg`;
      }
    }

    const first = new Image();
    images[0] = first;
    first.onload = () => { if (!disposed) { drawFrame(0); currentFrameRef.current = 0; pump(); } };
    first.onerror = () => { if (!disposed) pump(); };
    first.src = `${FRAME_PATH}001.jpg`;

    function onScroll() {
      const progress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      const targetIdx = Math.min(Math.round(progress * (frames.length - 1)), frames.length - 1);
      if (targetIdx !== currentFrameRef.current) {
        currentFrameRef.current = targetIdx;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          const img = images[targetIdx];
          if (img && img.complete && img.naturalWidth > 0) drawFrame(targetIdx);
          else drawNearest(targetIdx);
        });
      }
    }

    let tick = false;
    function onScrollTick() {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => { tick = false; onScroll(); });
    }
    const onResize = () => drawFrame(currentFrameRef.current);

    window.addEventListener("scroll", onScrollTick, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      window.removeEventListener("scroll", onScrollTick);
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isStatic]);

  if (isStatic) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={STATIC_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
