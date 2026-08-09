'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Chat } from './useChat';

/* ── CHATVENSTER ────────────────────────────────────────────────────────────
   Alleen weergave. Het gesprek zelf zit in useChat() en wordt van buiten
   meegegeven, zodat het blijft bestaan als dit venster wordt weggehaald --
   zie de toelichting in useChat.ts.

   Huisstijl: rustig. Geen sparkles, geen robot-icoon, geen typende puntjes
   die op een mens moeten lijken. Emma is een assistent, geen personage. */

const OPENING =
  'Hoi. Ik ben Emma. Vraag me wat je wilt weten over EmmaStudio — wat de ' +
  'modules doen, wat het kost, hoe je begint. Weet ik het niet, dan zet ik ' +
  'je vraag door naar Tom.';

const VOORBEELDEN = [
  'Wat kost het?',
  'Werkt het met mijn boekhouding?',
  'Wat kan EmmaLoont precies?',
];

export default function ChatVenster({ chat }: { chat: Chat }) {
  const { beurten, bezig, fout, doorgezet, verstuur } = chat;
  const [invoer, setInvoer] = useState('');

  const bodemRef = useRef<HTMLDivElement>(null);
  const invoerRef = useRef<HTMLTextAreaElement>(null);

  // Meescrollen terwijl het antwoord binnenkomt.
  useEffect(() => {
    bodemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [beurten, bezig]);

  const stuur = (tekst: string) => {
    if (!tekst.trim() || bezig) return;
    setInvoer('');
    void verstuur(tekst).finally(() => invoerRef.current?.focus());
  };

  const leeg = beurten.length === 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper shadow-emma-card">
      {/* Kop */}
      <div className="flex items-center gap-2.5 border-b border-emma-line px-5 py-3.5">
        <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-emma-ink">Emma</span>
        <span className="text-xs text-emma-subtext">assistent op deze site</span>
      </div>

      {/* Gesprek */}
      <div
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
        role="log"
        aria-live="polite"
        aria-label="Gesprek met Emma"
      >
        <p className="max-w-[46ch] text-sm leading-relaxed text-emma-ink-2">{OPENING}</p>

        {leeg && (
          <div className="flex flex-wrap gap-2 pt-1">
            {VOORBEELDEN.map(v => (
              <button
                key={v}
                type="button"
                onClick={() => stuur(v)}
                className="rounded-emma-pill border border-emma-line px-3 py-1.5 text-xs text-emma-ink-2 transition-colors hover:border-emma-coral hover:text-emma-ink"
              >
                {v}
              </button>
            ))}
          </div>
        )}

        {beurten.map((b, i) =>
          b.rol === 'gebruiker' ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[80%] rounded-emma-card bg-emma-creme px-4 py-2.5 text-sm leading-relaxed text-emma-ink">
                {b.tekst}
              </p>
            </div>
          ) : (
            <p key={i} className="max-w-[52ch] whitespace-pre-wrap text-sm leading-relaxed text-emma-ink-2">
              {b.tekst}
              {bezig && i === beurten.length - 1 && (
                <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-emma-coral align-text-bottom" />
              )}
            </p>
          ),
        )}

        {bezig && beurten[beurten.length - 1]?.rol === 'gebruiker' && (
          <p className="text-sm text-emma-subtext">Emma leest je vraag…</p>
        )}

        {doorgezet && (
          <p className="rounded-emma-card border border-emma-line bg-emma-creme/60 px-4 py-3 text-xs leading-relaxed text-emma-ink-2">
            Je vraag is doorgezet naar Tom. Hij leest hem zelf en antwoordt meestal binnen een
            paar werkdagen.
          </p>
        )}

        {fout && (
          <p className="text-sm text-emma-error" role="alert">
            {fout}
          </p>
        )}

        <div ref={bodemRef} />
      </div>

      {/* Invoer */}
      <form
        onSubmit={e => {
          e.preventDefault();
          stuur(invoer);
        }}
        className="border-t border-emma-line px-4 py-3"
      >
        <div className="flex items-end gap-2">
          <label htmlFor="chat-invoer" className="sr-only">
            Je vraag aan Emma
          </label>
          <textarea
            id="chat-invoer"
            ref={invoerRef}
            value={invoer}
            onChange={e => setInvoer(e.target.value.slice(0, 2000))}
            onKeyDown={e => {
              // Enter verstuurt, shift+enter maakt een nieuwe regel.
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                stuur(invoer);
              }
            }}
            rows={1}
            placeholder="Stel je vraag…"
            disabled={bezig}
            className="max-h-32 min-h-[42px] flex-1 resize-none rounded-emma-btn border border-emma-line bg-white px-3.5 py-2.5 text-sm text-emma-ink outline-none transition-colors placeholder:text-emma-subtext focus:border-emma-coral disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={bezig || !invoer.trim()}
            className="shrink-0 rounded-emma-btn bg-emma-coral-strong px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emma-coral-deep disabled:opacity-40"
          >
            Stuur
          </button>
        </div>
        {/* Informatieplicht: wat je hier typt verlaat de browser. Kort houden,
            maar het moet er staan — de privacyverklaring noemt dit ook. */}
        <p className="mt-2 text-[11px] leading-relaxed text-emma-subtext">
          Emma is een assistent, geen mens. Wat je typt gaat naar onze AI-dienstverlener en, als je
          vraag wordt doorgezet, naar Tom. Zet er geen gevoelige gegevens in. Zie de{' '}
          <Link href="/privacy" className="underline hover:text-emma-ink">
            privacyverklaring
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
