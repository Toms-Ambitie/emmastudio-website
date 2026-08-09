'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/* ── CHATVENSTER ────────────────────────────────────────────────────────────
   Het gesprek staat alleen in de state van deze component. Niets in
   localStorage, niets in een cookie: dan hoeft er ook geen toestemming voor
   gevraagd te worden en verdwijnt het bij het sluiten van het tabblad.

   Huisstijl: rustig. Geen sparkles, geen robot-icoon, geen typende puntjes
   die op een mens moeten lijken. Emma is een assistent, geen personage. */

type Beurt = { rol: 'gebruiker' | 'emma'; tekst: string };

const OPENING =
  'Hoi. Ik ben Emma. Vraag me wat je wilt weten over EmmaStudio — wat de ' +
  'modules doen, wat het kost, hoe je begint. Weet ik het niet, dan zet ik ' +
  'je vraag door naar Tom.';

const VOORBEELDEN = [
  'Wat kost het?',
  'Werkt het met mijn boekhouding?',
  'Wat kan EmmaLoont precies?',
];

export default function ChatVenster() {
  const [beurten, setBeurten] = useState<Beurt[]>([]);
  const [invoer, setInvoer] = useState('');
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [doorgezet, setDoorgezet] = useState(false);

  const bodemRef = useRef<HTMLDivElement>(null);
  const invoerRef = useRef<HTMLTextAreaElement>(null);

  // Meescrollen terwijl het antwoord binnenkomt.
  useEffect(() => {
    bodemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [beurten, bezig]);

  async function verstuur(tekst: string) {
    const vraag = tekst.trim();
    if (!vraag || bezig) return;

    setFout(null);
    setDoorgezet(false);
    setInvoer('');
    const nieuw: Beurt[] = [...beurten, { rol: 'gebruiker', tekst: vraag }];
    setBeurten(nieuw);
    setBezig(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gesprek: nieuw }),
      });

      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error ?? 'Er ging iets mis.');
      }

      // De server stuurt één JSON-object per regel (ndjson). Een chunk kan
      // midden in een regel eindigen, dus wat overblijft bewaren we.
      const lezer = res.body.getReader();
      const decoder = new TextDecoder();
      let rest = '';
      let antwoord = '';
      setBeurten([...nieuw, { rol: 'emma', tekst: '' }]);

      for (;;) {
        const { done, value } = await lezer.read();
        if (done) break;
        rest += decoder.decode(value, { stream: true });
        const regels = rest.split('\n');
        rest = regels.pop() ?? '';

        for (const regel of regels) {
          if (!regel.trim()) continue;
          let bericht: { soort: string; waarde: unknown };
          try {
            bericht = JSON.parse(regel);
          } catch {
            continue;
          }
          if (bericht.soort === 'tekst') {
            antwoord += String(bericht.waarde);
            setBeurten([...nieuw, { rol: 'emma', tekst: antwoord }]);
          } else if (bericht.soort === 'doorgezet') {
            setDoorgezet(true);
          } else if (bericht.soort === 'fout') {
            setFout(String(bericht.waarde));
          }
        }
      }
    } catch (e) {
      setFout(e instanceof Error ? e.message : 'Er ging iets mis.');
    } finally {
      setBezig(false);
      invoerRef.current?.focus();
    }
  }

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
                onClick={() => verstuur(v)}
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
          void verstuur(invoer);
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
                void verstuur(invoer);
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
