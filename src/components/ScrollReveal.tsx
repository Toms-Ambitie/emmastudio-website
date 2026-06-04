'use client';

import { useEffect, useRef, ReactNode } from 'react';

export default function ScrollReveal({ children, delay }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
        el.classList.add('in');
        window.removeEventListener('scroll', check);
      }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <div className="reveal" data-d={delay} ref={ref}>
      {children}
    </div>
  );
}
