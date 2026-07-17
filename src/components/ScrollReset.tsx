'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ScrollReset — zet de scroll bovenaan bij elke route-wissel.
 *
 * Waarom nodig: op de homepage bezit Lenis de native window-scroll. Bij
 * client-navigatie naar een andere route laat Lenis die scrollpositie staan
 * en reset Next pas ná een paar frames — waardoor de nieuwe pagina kort op
 * de oude scrolldiepte verschijnt (§7.5, bug 2). Deze reset dicht die race.
 *
 * Ankernavigatie (bijv. /#prijs) blijft met rust: bij een aanwezige hash
 * laat Next/de browser naar het anker scrollen.
 */
export default function ScrollReset() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) return;
    // Twee keer: direct na commit én op de volgende frame, zodat een
    // lingerende Lenis-raf de reset niet overschrijft.
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}
