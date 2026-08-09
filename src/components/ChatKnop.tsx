'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ChatVenster from './ChatVenster';
import { useChat } from './useChat';

/* ── CHATKNOP ───────────────────────────────────────────────────────────────
   De zwevende knop rechtsonder, op elke pagina. Gemonteerd in layout.tsx.

   WAT DEZE BEWUST NIET DOET: vanzelf opengaan. Geen tekstballon die na vijf
   seconden "Hoi! Kan ik je ergens mee helpen?" roept, geen pulserend bolletje,
   geen ongelezen-teller die nergens op slaat. Dat is precies de
   Salesforce-energie die het merkboek verbiedt (§1: niet schreeuwerig of
   pushy). Wie een vraag heeft, ziet de knop staan. Wie niets vraagt, wordt
   met rust gelaten.

   LABEL: "Stel een vraag", niet "Vraag Emma". Dat laatste is de naam van het
   paneel in de app dat nog op "Binnenkort" staat. Zou de knop hier zo heten,
   dan zoekt een nieuwe klant daar naar iets wat hij op de website zag en
   vindt hij een leeg vak. */

const VERBORGEN_OP = ['/chat-test'];

export default function ChatKnop() {
  const [open, setOpen] = useState(false);
  const paneelRef = useRef<HTMLDivElement>(null);
  const knopRef = useRef<HTMLButtonElement>(null);
  const pad = usePathname();

  /* Het gesprek leeft hier, niet in het venster. ChatKnop hangt in layout.tsx
     en blijft in de app-router gemonteerd bij navigatie, dus een bezoeker die
     het paneel sluit of doorklikt naar een andere pagina raakt zijn vraag niet
     kwijt. */
  const chat = useChat();

  /* Focus alleen terugzetten als de knop echt zichtbaar is. Op mobiel is hij
     verborgen zolang het paneel open staat, en focus() op een element met
     display:none doet niets — dan blijft de focus achter op een verdwenen
     paneel en is de bezoeker zijn plek op de pagina kwijt.

     NIET met offsetParent controleren. Dat is de voor de hand liggende keuze
     en hij is hier fout: offsetParent is per specificatie ALTIJD null bij
     `position: fixed`, en deze knop is fixed. De controle stond daardoor
     permanent op "onzichtbaar" en focus() werd nooit aangeroepen. Gemeten in
     de browser: de focus bleef op <body> staan.

     getClientRects() is wel betrouwbaar: leeg bij display:none, gevuld bij
     een zichtbaar fixed element. */
  const focusKnop = () => {
    const k = knopRef.current;
    if (k && k.getClientRects().length > 0) k.focus();
  };

  // Escape sluit, en de focus gaat terug naar de knop waar hij vandaan kwam.
  useEffect(() => {
    if (!open) return;
    const opToets = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        // Na de rerender pas focussen: op dat moment is de knop weer zichtbaar.
        requestAnimationFrame(focusKnop);
      }
    };
    document.addEventListener('keydown', opToets);
    return () => document.removeEventListener('keydown', opToets);
  }, [open]);

  // Bij openen de focus naar het invoerveld, zodat je meteen kunt typen.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      paneelRef.current?.querySelector<HTMLTextAreaElement>('#chat-invoer')?.focus();
    }, 60);
    return () => clearTimeout(t);
  }, [open]);

  if (VERBORGEN_OP.includes(pad)) return null;

  return (
    <>
      {/* Het paneel. Op mobiel bijna schermvullend, op desktop een kolom
          rechtsonder. z-50: boven de zwevende CTA-balk (z-40) van de
          homepage, zodat die er niet doorheen prikt. */}
      {open && (
        <div
          ref={paneelRef}
          role="dialog"
          aria-label="Chat met Emma"
          className="fixed inset-x-3 bottom-3 top-20 z-50 flex sm:inset-x-auto sm:right-6 sm:top-auto sm:bottom-24 sm:h-[min(620px,calc(100vh-10rem))] sm:w-[400px]"
        >
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                requestAnimationFrame(focusKnop);
              }}
              aria-label="Chat sluiten"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-emma-subtext transition-colors hover:bg-emma-creme hover:text-emma-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <ChatVenster chat={chat} />
          </div>
        </div>
      )}

      {/* De knop.

          MOBIEL: bottom-28 (112px). De zwevende CTA-balk van de homepage staat
          gecentreerd op bottom-4 en wordt op een smal scherm 84px hoog doordat
          hij afbreekt naar twee regels — hij loopt dus tot 100px vanaf de
          onderkant. Gemeten op 390px breed: met bottom-20 overlapten ze echt.

          OPEN OP DESKTOP: knop blijft staan als zichtbare sluitknop, naast
          het paneel. OPEN OP MOBIEL: knop verdwijnt, want daar is het paneel
          bijna schermvullend en zou de knop over het invoerveld zweven; het
          paneel heeft daar zijn eigen kruisje.

          Dat verbergen brak eerst Escape, stil: de focus kan niet terug naar
          een element met display:none, dus wie met het toetsenbord sloot
          raakte zijn plek op de pagina kwijt. Daarom controleert
          `focusKnop()` nu eerst of de knop echt zichtbaar is. */}
      <button
        ref={knopRef}
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? 'Chat sluiten' : 'Stel een vraag aan Emma'}
        className={`fixed bottom-28 right-4 z-50 flex items-center gap-2.5 rounded-emma-pill bg-emma-petrol px-4 py-3 shadow-emma-pop transition-colors hover:bg-emma-petrol-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-coral sm:bottom-6 sm:right-6 ${open ? 'max-sm:hidden' : ''}`}
      >
        <span className="flex h-2 w-2 shrink-0 rounded-full bg-emma-coral" aria-hidden="true" />
        <span className="text-sm font-medium text-emma-creme">
          {open ? 'Sluiten' : 'Stel een vraag'}
        </span>
      </button>
    </>
  );
}
