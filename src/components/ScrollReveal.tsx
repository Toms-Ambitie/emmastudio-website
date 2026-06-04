'use client';

import { useEffect } from 'react';

// Globale effect: observeert alle .reveal elementen op de pagina.
// Gemount in layout.tsx zodat het op elke pagina werkt.
export default function ScrollReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>('.reveal:not(.in)')];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
    );

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
