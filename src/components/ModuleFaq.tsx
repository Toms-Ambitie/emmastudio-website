'use client';

import { useState } from 'react';

type FaqItem = { q: string; a: string };

/** Tailwind-FAQ-accordeon in de Higgsfield-stijl (zelfde vorm als de
 *  homepage-FAQ). Vervangt het oude, op component-CSS gebouwde FaqAccordion
 *  op de modulepagina's. */
export default function ModuleFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-emma-line border-y border-emma-line">
      {items.map((item, i) => (
        <div key={i}>
          <h3>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`mfaq-content-${i}`}
              id={`mfaq-button-${i}`}
              className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt"
            >
              <span className="font-display text-lg font-bold text-emma-ink">{item.q}</span>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform ${open === i ? 'rotate-45 border-emma-coral bg-emma-coral text-white' : 'border-emma-line text-emma-subtext'}`} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </span>
            </button>
          </h3>
          <div id={`mfaq-content-${i}`} role="region" aria-labelledby={`mfaq-button-${i}`} className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 pb-5' : 'max-h-0'}`}>
            <p className="text-base leading-relaxed text-emma-ink-2">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
