'use client';

import { useEffect, useRef } from 'react';
import { TIMING } from './timing';

export type PayoffWord = {
  text: string;
  accentDot?: boolean;  // render trailing "." in coral
  pauseBefore?: number; // extra seconds before this word (e.g. breath pause)
};

type Props = {
  words: PayoffWord[];
  className?: string;
};

/**
 * Reusable word-by-word payoff reveal.
 *
 * No-JS fallback: words are visible by default via CSS.
 * Once JS runs, the useEffect sets data-animate on the container,
 * which triggers the staggered CSS animation.
 *
 * Reuse in the real hero: same component, same TIMING config.
 */
export default function PayoffWords({ words, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.dataset.animate = 'true';
  }, []);

  // Cumulative delay per word
  let acc = TIMING.firstWordDelay;
  const delays = words.map((w) => {
    const d = acc + (w.pauseBefore ?? 0);
    acc = d + TIMING.wordStep;
    return d;
  });

  return (
    <div
      ref={ref}
      className={`payoff-words ${className}`}
      style={{ '--word-duration': `${TIMING.wordDuration}s` } as React.CSSProperties}
      aria-label={words.map((w) => w.text).join(' ')}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="word"
          style={{ '--delay': `${delays[i]}s` } as React.CSSProperties}
          aria-hidden
        >
          {w.accentDot
            ? <>{w.text.replace(/\.$/, '')}<span className="coral">.</span></>
            : w.text}
        </span>
      ))}
    </div>
  );
}
