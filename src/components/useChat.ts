'use client';

import { useCallback, useRef, useState } from 'react';

/* ── useChat ────────────────────────────────────────────────────────────────
   Het gesprek en het versturen ervan, los van de weergave.

   WAAROM APART: de staat hoort thuis bij ChatKnop, niet bij ChatVenster. Zat
   hij in het venster, dan verdween het gesprek zodra je het paneel sloot --
   één misklik en je vraag is weg. ChatKnop hangt in layout.tsx, en een layout
   blijft in de app-router gemonteerd bij navigatie. Het gesprek overleeft dus
   zowel het sluiten van het paneel als het doorklikken naar een andere pagina.

   Alles blijft in het geheugen: niets in localStorage, niets in een cookie.
   Dan hoeft er ook geen toestemming voor gevraagd te worden, en is het weg
   zodra het tabblad dicht gaat. */

export type Beurt = { rol: 'gebruiker' | 'emma'; tekst: string };

export type Chat = {
  beurten: Beurt[];
  bezig: boolean;
  fout: string | null;
  doorgezet: boolean;
  verstuur: (tekst: string) => Promise<void>;
};

const MAX_TEKENS = 2_000;

export function useChat(): Chat {
  const [beurten, setBeurten] = useState<Beurt[]>([]);
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const [doorgezet, setDoorgezet] = useState(false);

  // Voorkomt dat twee verzendingen tegelijk lopen als React de state nog niet
  // heeft doorgezet; `bezig` alleen is daar een beurt te traag voor.
  const loopt = useRef(false);

  /* Het gesprek staat hier én in de state, en dat is met opzet.
     De state is voor het scherm, deze ref is voor het versturen.

     Waarom niet één van de twee: hier stond eerst

       let nieuw = [];
       setBeurten(huidig => { nieuw = [...huidig, beurt]; return nieuw; });
       fetch(..., JSON.stringify({ gesprek: nieuw }))

     en dat is stuk. React roept die updater niet meteen aan maar tijdens de
     volgende render, dus `nieuw` was nog gewoon [] op het moment dat fetch
     hem las. Elk verzoek vertrok als {"gesprek":[]} en de server gaf terecht
     "Ongeldig verzoek.". Gemeten in de browser, precies die body.

     Een ref wordt wel meteen bijgewerkt. `zet()` houdt de twee gelijk, zodat
     ze niet uit elkaar kunnen lopen. */
  const beurtenRef = useRef<Beurt[]>([]);
  const zet = useCallback((b: Beurt[]) => {
    beurtenRef.current = b;
    setBeurten(b);
  }, []);

  const verstuur = useCallback(async (tekst: string) => {
    const vraag = tekst.trim().slice(0, MAX_TEKENS);
    if (!vraag || loopt.current) return;

    loopt.current = true;
    setFout(null);
    setDoorgezet(false);
    setBezig(true);

    const nieuw: Beurt[] = [...beurtenRef.current, { rol: 'gebruiker', tekst: vraag }];
    zet(nieuw);

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

      /* De server stuurt één JSON-object per regel (ndjson). Een netwerkbrok
         kan midden in een regel eindigen, dus wat overblijft bewaren we tot
         het volgende brok. Getest met een splitsing middenin een regel. */
      const lezer = res.body.getReader();
      const decoder = new TextDecoder();
      let rest = '';
      let antwoord = '';
      zet([...nieuw, { rol: 'emma', tekst: '' }]);

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
            zet([...nieuw, { rol: 'emma', tekst: antwoord }]);
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
      /* Een leeg antwoordvak laten staan is de verwarrendste uitkomst: het
         lijkt alsof Emma iets zei en het niet aankwam. Weg ermee, de
         foutmelding eronder vertelt het verhaal al. De vraag van de bezoeker
         blijft wel staan, zodat hij hem niet opnieuw hoeft te typen.

         Dit staat in `finally` en niet in `catch`, want een fout komt langs
         twee wegen binnen: als worp (verbinding weg, 4xx voor het streamen
         begint) en als 'fout'-regel middenin een stroom die verder gewoon 200
         is. Alleen in `catch` opruimen dekt de eerste weg en laat de tweede
         een leeg vak achter. */
      const laatste = beurtenRef.current[beurtenRef.current.length - 1];
      if (laatste?.rol === 'emma' && !laatste.tekst) zet(beurtenRef.current.slice(0, -1));
      loopt.current = false;
      setBezig(false);
    }
  }, [zet]);

  return { beurten, bezig, fout, doorgezet, verstuur };
}
