'use client';

import { useEffect, useRef } from 'react';

const FADE_SECS = 0.5;

export type VideoBackgroundProps = {
  src: string;
  overlayClassName?: string;
};

/**
 * Reusable full-cover video background with smooth fade loop.
 * Drop into any full-screen section; pass overlayClassName for custom tint.
 * Respects prefers-reduced-motion: shows a still frame, no loop.
 */
export default function VideoBackground({ src, overlayClassName = 'vbg-overlay' }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.style.opacity = '1';
      return;
    }

    let rafId: number;

    const tick = () => {
      const t   = video.currentTime;
      const dur = video.duration;
      if (dur && !isNaN(dur)) {
        if (t < FADE_SECS) {
          video.style.opacity = String(t / FADE_SECS);
        } else if (t > dur - FADE_SECS) {
          video.style.opacity = String(Math.max(0, (dur - t) / FADE_SECS));
        } else {
          video.style.opacity = '1';
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); }, 100);
    };

    video.play().catch(() => {});
    rafId = requestAnimationFrame(tick);
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src]);

  return (
    <>
      <div className="vbg">
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
        />
      </div>
      <div className={overlayClassName} aria-hidden />
    </>
  );
}
