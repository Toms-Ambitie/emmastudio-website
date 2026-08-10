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
    kanVoorstelTerughalen, haalVoorstelTerug,
  } = chat;
  const [invoer, setInvoer] = useState('');
  const [email, setEmail] = useState('');

  const lijstRef = useRef<HTMLDivElement>(null);
  const invoerRef = useRef<HTMLTextAreaElement>(null);

  /* Meescrollen terwijl het antwoord binnenkomt, maar niet als de bezoeker
     zelf omhoog is gegaan om iets terug te lezen.

     Het was `scrollIntoView`, en dat zoekt zelf een scrollbare voorouder;
     zolang het gespreksvak niet scrolde was dat de pagina, dus sprong de hele
     site omlaag bij elk woord.

     `volgen` onthoudt of we onderaan mogen plakken, en die vlag wordt gezet
     door de scroll-gebeurtenis, niet door de afstand op het moment van
     tekenen. Dat verschil is niet theoretisch: eerst stond hier "scroll mee
     als je binnen 80 pixels van de bodem bent", gemeten in de effect-hook.
     Komt er tussen twee tekenbeurten meer dan 80 pixels tekst bij, en dat
     gebeurt zodra een brok tekst in één keer aankomt, dan is die test één
     keer onwaar en daarna voorgoed onwaar: het vak bleef bovenaan hangen.
     Gemeten in de browser: scrollTop 62 van de 1512 na drie antwoorden.

     Een programmatische sprong naar de bodem zet `volgen` weer op true, want
     dan zijn we per definitie onderaan. Alleen een mens die omhoog scrolt
     zet hem uit. */
  const volgen = useRef(true);

  const onthoudScrolpositie = () => {
    const l = lijstRef.current;
    if (!l) return;
    volgen.current = l.scrollHeight - l.scrollTop - l.clientHeight < 80;
  };

  useEffect(() => {
    const l = lijstRef.current;
    if (l && volgen.current) l.scrollTop = l.scrollHeight;
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
        onScroll={onthoudScrolpositie}
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
              className="mt-3 space-y-2"
            >
              {/* Het veld op zijn eigen regel, de knoppen eronder.

                  Dit stond eerst op één rij met `flex-wrap`, en dat is fout
                  gemeten: het paneel is 400px breed en de twee knoppen nemen
                  daar samen 230px van, dus hield het adresveld er 44 over.
                  Wrappen deed het niet, want de rij paste technisch nog. Een
                  invoerveld van 44 pixels voor een e-mailadres is onbruikbaar,
                  op mobiel én op desktop. */}
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
                /* Ook hier text-base op mobiel, zelfde reden als bij het
                   vraagveld: onder de 16px zoomt iOS in bij aanraken. */
                className="w-full rounded-emma-btn border border-emma-line bg-white px-3 py-2 text-base text-emma-ink outline-none transition-colors placeholder:text-emma-subtext focus:border-emma-coral disabled:opacity-60 sm:text-sm"
              />
              <div className="flex items-center gap-2">
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
              </div>
            </form>
            {doorzetFout && (
              <p className="mt-2 text-xs text-emma-error" role="alert">
                {doorzetFout}
              </p>
            )}
          </div>
        )}

        {/* Weggeklikt maar nog niet verstuurd. Emma weet niet dat je op "Nee,
            laat maar" hebt gedrukt, dus in haar tekst staat nog steeds dat je
            de knop hieronder kunt gebruiken. Dit linkje zorgt dat die zin naar
            iets blijft wijzen, zonder dat er weer een heel kaartje staat. */}
        {kanVoorstelTerughalen && (
          <button
            type="button"
            onClick={haalVoorstelTerug}
            className="text-xs text-emma-subtext underline transition-colors hover:text-emma-ink"
          >
            Toch je vraag naar Tom sturen
          </button>
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
            /* text-base op mobiel, en dat is geen smaakkwestie. Safari op iOS
               zoomt automatisch in zodra je een invoerveld aanraakt waarvan de
               letter kleiner is dan 16px. Dit veld stond op text-sm (14px),
               dus bij elke tik zoomde de telefoon in. Het zichtbare gebied
               wordt daardoor smaller dan de pagina, en een `position: fixed`
               paneel hangt aan de pagina, niet aan wat je ziet. Gevolg: het
               chatvenster leek breder dan het scherm en de knop Stuur viel er
               rechts buiten. Vanaf sm mag hij weer 14px zijn, want daar bestaat
               dat gedrag niet. */
            className="max-h-32 min-h-[42px] flex-1 resize-none rounded-emma-btn border border-emma-line bg-white px-3.5 py-2.5 text-base text-emma-ink outline-none transition-colors placeholder:text-emma-subtext focus:border-emma-coral disabled:opacity-60 sm:text-sm"
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
