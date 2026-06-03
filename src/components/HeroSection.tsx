'use client';

import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4';

const FADE = 0.5; // seconds to fade in / fade out

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="hero-cinematic">
      {/* Video layer — positioned below nav + headline */}
      <div className="hero-video-layer">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Gradient: top and bottom fade to crème */}
      <div className="hero-gradient" aria-hidden />

      {/* NAV */}
      <header className="nav-wrap hero-nav-layer">
        <div className="container">
          <nav className="nav">
            <a href="/" className="nav-logo-group">
              <img src="/beeldmerk.svg" alt="" className="nav-beeldmerk" width={28} height={28} />
              <img src="/logo-dark.svg" alt="Emma Studio" className="nav-wordmark" width={80} height={17} />
            </a>
            <div className="nav-links">
              <a href="#modules">Modules</a>
              <a href="#bundles">Oplossingen</a>
              <a href="#prijzen">Prijzen</a>
              <a href="#case">Resultaten</a>
            </div>
            <div className="nav-right">
              <a href="#demo" className="btn btn-ghost-dark">Inloggen</a>
              <a href="#demo" className="btn btn-cta">Plan demo</a>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO BODY */}
      <div className="hero-body">
        <h1 className="hero-headline anim-fade-rise">
          Jij doet je werk.
          <br />
          <span className="hero-headline-muted">Emma de rest.</span>
        </h1>
        <p className="hero-tagline anim-fade-rise-delay">
          Een rustige copiloot voor wie het zelf doet.
          <br />
          Acht modules. Één platform. Altijd naast je.
        </p>
        <a href="#demo" className="hero-cta-pill anim-fade-rise-delay-2">
          Ontdek emma
        </a>
      </div>
    </div>
  );
}
