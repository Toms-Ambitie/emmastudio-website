'use client';

import { useEffect, useRef } from 'react';

export default function CookieBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chosen: string | null = null;
    try { chosen = localStorage.getItem('emma_cookie'); } catch {}
    if (chosen) return;

    const bar = bannerRef.current;
    if (!bar) return;
    const t = setTimeout(() => bar.classList.add('show'), 1200);

    const dismiss = (val: string) => {
      try { localStorage.setItem('emma_cookie', val); } catch {}
      bar.classList.remove('show');
      setTimeout(() => bar.remove(), 650);
    };

    bar.querySelectorAll<HTMLButtonElement>('[data-cookie]').forEach(btn => {
      btn.addEventListener('click', () => dismiss(btn.dataset.cookie!));
    });

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="cookie" id="cookie" role="dialog" aria-label="Cookievoorkeuren" ref={bannerRef}>
      <div className="cookie__eyebrow"><span className="tick"></span> Cookies</div>
      <p className="cookie__txt">We gebruiken alleen functionele cookies om de site te laten werken en anonieme statistieken om te zien wat we beter kunnen maken. Geen tracking, geen verkoop aan derden.</p>
      <div className="cookie__row">
        <button className="btn btn-coral" data-cookie="all">Oké, prima</button>
        <button className="btn cookie__ghost" data-cookie="min">Alleen noodzakelijk</button>
        <a className="cookie__more" href="/#faq">Meer info</a>
      </div>
    </div>
  );
}
