'use client';

import { useEffect, useRef, useState } from 'react';

/** Telt een getal op zodra het element in beeld komt. Respecteert prefers-reduced-motion. */
export default function CountUp({ to, prefix = '', suffix = '', duration = 1500 }:
  { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return; }
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{prefix}{val.toLocaleString('nl-NL')}{suffix}</span>;
}
