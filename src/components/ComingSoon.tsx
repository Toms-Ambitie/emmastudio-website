'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4';

const FADE = 0.5;

export default function ComingSoon() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let rafId: number;

    const tick = () => {
      const t = video.currentTime;
      const dur = video.duration;
      if (dur && !isNaN(dur)) {
        if (t < FADE) {
          video.style.opacity = String(t / FADE);
        } else if (t > dur - FADE) {
          video.style.opacity = String(Math.max(0, (dur - t) / FADE));
        } else {
          video.style.opacity = '1';
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.play().catch(() => {});
    rafId = requestAnimationFrame(tick);
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="cs-wrap">
      {/* Video background */}
      <div className="cs-video">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Dark overlay */}
      <div className="cs-overlay" aria-hidden />

      {/* Content */}
      <main className="cs-content">
        <img
          src="/logo-light.svg"
          alt="Emma Studio"
          className="cs-logo anim-fade-rise"
          width={120}
          height={32}
        />

        <h1 className="cs-headline anim-fade-rise-delay">
          Binnenkort<span className="cs-dot">.</span>
        </h1>

        <p className="cs-tagline anim-fade-rise-delay">
          Jij doet je werk. Emma de rest.
        </p>

        <div className="anim-fade-rise-delay-2">
          {!sent ? (
            <form
              className="cs-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                className="cs-input"
                placeholder="jouw@emailadres.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button type="submit" className="cs-btn">
                Stuur me een seintje
              </button>
            </form>
          ) : (
            <p className="cs-thanks">Mooi, je hoort van ons.</p>
          )}
        </div>

        <p className="cs-url anim-fade-rise-delay-2">emmastudio.nl</p>
      </main>
    </div>
  );
}
