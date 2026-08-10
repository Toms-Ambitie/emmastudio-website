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

/* Kort houden. Wat de modules doen en wat het kost, staat al in de knoppen
   eronder; dat opnoemen leest als een menu dat de bezoeker nog moet doorlopen
   voordat hij iets mag vragen. Dat Emma doorzet naar Tom hoort hij vanzelf op
   het moment dat het gebeurt, niet vooraf als voorbehoud. */
const OPENING = 'Hoi. Ik ben Emma. Vraag me wat je wilt weten over EmmaStudio.';

const VOORBEELDEN = [
  'Wat kost het?',
  'Werkt het met mijn boekhouding?',
  'Wat kan EmmaLoont precies?',
];

export default function ChatVenster({ chat }: { chat: Chat }) {
  const {
    beurten, bezig, fout, verstuur,
    voorstel, doorzetBezig, doorzetFout, doorgezet, zetDoor, laatVoorstelVallen,
  } = chat;
  const [invoer, setInvoer] = useState('');
  const [email, setEmail] = useState('');

  const lijstRef = useRef<HTMLDivElement>(null);
  const invoerRef = useRef<HTMLTextAreaElement>(null);

  /* Meescrollen terwijl het antwoord binnenkomt, maar alleen als je toch al
     onderaan zat.

     Twee dingen die hier eerder misgingen. Het was `scrollIntoView`, en dat
     zoekt zelf een scrollbare voorouder; zolang het gespreksvak niet scrolde
     was dat de pagina, dus sprong de hele site omlaag bij elk woord. En het
     scrolde onvoorwaardelijk: lees je een eerder antwoord terug terwijl Emma
     nog typt, dan werd je bij elke token teruggetrokken naar beneden.

     Nu zetten we scrollTop op het vak zelf, en alleen als je binnen 80 pixels
     van de bodem bent. Scrol je omhoog, dan laat hij je met rust. */
  useEffect(() => {
    const l = lijstRef.current;
    if (!l) return;
    const bijDeBodem = l.scrollHeight - l.scrollTop - l.clientHeight < 80;
    if (bijDeBodem) l.scrollTop = l.scrollHeight;
  }, [beurten, bezig, voorstel, doorgezet]);

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

      {/* Gesprek.

          `min-h-0` is hier niet cosmetisch maar het hele punt. Een flex-kind
          krijgt standaard `min-height: auto`, en dat betekent: krimp nooit
          onder je eigen inhoud. Dit vak groeide dus gewoon door bij een lang
          gesprek, `overflow-y-auto` sloeg nooit aan, en wie in het paneel
          scrolde zag de pagina eronder bewegen in plaats van het gesprek.
          Terugscrollen naar een eerder antwoord kon daardoor niet.

          `overscroll-contain` houdt de tweede helft tegen: als je binnen het
          vak bij de bodem komt, neemt de pagina het niet over. */}
      <div
        className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5"
        role="log"
        aria-live="polite"
        aria-label="Gesprek met Emma"
        ref={lijstRef}
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

        {/* Het voorstel. Emma heeft hier alleen gezegd dat ze het niet weet;
            er is nog niets verstuurd en er gaat pas iets weg als de bezoeker
            zelf op Versturen drukt. Het adresveld hoort daarom hier en niet in
            het gesprek: vroeg Emma er zelf om, dan voelde elk antwoord als een
            poging om een e-mailadres los te krijgen. */}
        {voorstel && !doorgezet && (
          <div className="rounded-emma-card border border-emma-line bg-emma-creme/60 p-4">
            <p className="text-sm font-medium text-emma-ink">Zal ik dit aan Tom vragen?</p>
            <p className="mt-1 text-xs leading-relaxed text-emma-subtext">
              Hij leest je vraag zelf en antwoordt meestal binnen een paar werkdagen. Je gesprek
              gaat mee, zodat je niets opnieuw hoeft uit te leggen.
            </p>
            <form
              onSubmit={e => {
                e.preventDefault();
                void zetDoor(email);
              }}
              className="mt-3 flex flex-wrap items-center gap-2"
            >
              <label htmlFor="chat-email" className="sr-only">
                Je e-mailadres
              </label>
              <input
                id="chat-email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                disabled={doorzetBezig}
                className="min-w-0 flex-1 rounded-emma-btn border border-emma-line bg-white px-3 py-2 text-sm text-emma-ink outline-none transition-colors placeholder:text-emma-subtext focus:border-emma-coral disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={doorzetBezig || !email.trim()}
                className="shrink-0 rounded-emma-btn bg-emma-coral-strong px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emma-coral-deep disabled:opacity-40"
              >
                {doorzetBezig ? 'Bezig…' : 'Versturen'}
              </button>
              <button
                type="button"
                onClick={laatVoorstelVallen}
                disabled={doorzetBezig}
                className="shrink-0 rounded-emma-btn px-2.5 py-2 text-sm text-emma-subtext transition-colors hover:text-emma-ink disabled:opacity-40"
              >
                Nee, laat maar
              </button>
            </form>
            {doorzetFout && (
              <p className="mt-2 text-xs text-emma-error" role="alert">
                {doorzetFout}
              </p>
            )}
          </div>
        )}

        {doorgezet && (
          <p className="rounded-emma-card border border-emma-line bg-emma-creme/60 px-4 py-3 text-xs leading-relaxed text-emma-ink-2">
            Verstuurd. Tom leest je vraag zelf en antwoordt meestal binnen een paar werkdagen.
          </p>
        )}

        {fout && (
          <p className="text-sm text-emma-error" role="alert">
            {fout}
          </p>
        )}

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
        {/* Eén regel: dat je met software praat, en waar het volledige verhaal
            staat. De twee zinnen die hier eerst stonden (waar je tekst heen
            gaat, en de waarschuwing om er niets gevoeligs in te zetten) waren
            de AVG-informatieplicht in het klein. Die is niet vervallen, hij is
            verhuisd naar de privacyverklaring, §2 en §5, waar de link naartoe
            wijst. Onder een invoerveld hoort de korte versie. */}
        <p className="mt-2 text-[11px] leading-relaxed text-emma-subtext">
          Emma is een assistent, geen mens. Zie de{' '}
          <Link href="/privacy" className="underline hover:text-emma-ink">
            privacyverklaring
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
