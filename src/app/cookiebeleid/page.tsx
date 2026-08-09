import type { Metadata } from 'next';
import Link from 'next/link';
import { BEDRIJF, ADRES_KORT, NUMMERS_KORT } from '@/data/bedrijf';

/* Cookiebeleid. Beschrijft wat er FEITELIJK laadt op deze site:
   Consently (CMP), Google Tag Manager (pas ná toestemming, zie Analytics.tsx),
   Google Fonts (via @import in globals.css) en Vercel als host.

   Bewust NIET opgenomen: een tabel met exacte cookienamen en -duren per tag.
   Die lijst wordt door Consently live gegenereerd uit de daadwerkelijke scan en
   staat in de banner zelf. Een handgeschreven kopie daarvan veroudert stil bij
   de eerste containerwijziging, en een cookiebeleid dat niet klopt is erger dan
   een cookiebeleid dat doorverwijst naar de bron die wél klopt. */

export const metadata: Metadata = {
  title: 'Cookiebeleid · Emma',
  description: 'Welke cookies en scripts emmastudio.nl gebruikt, met welk doel, en hoe je je keuze aanpast.',
  robots: { index: false },
};

export default function Cookiebeleid() {
  return (
    <main id="main-content" className="lightpage" data-page="legal">
      <div className="wrap">
        <div className="legal">
          <div className="legal__content">

            <div className="legal__kicker">
              <Link href="/" className="legal__back">← Terug naar emmastudio.nl</Link>
            </div>

            <h1>Cookiebeleid</h1>
            <p className="legal__meta">Toms Ambitie · Versie 1.0 · Ingangsdatum: 9 augustus 2026</p>

            <p>
              Dit cookiebeleid legt uit welke cookies en vergelijkbare technieken wij gebruiken op
              www.emmastudio.nl, waarom we dat doen en hoe je je keuze aanpast. Voor de bredere
              verwerking van persoonsgegevens verwijzen we naar onze{' '}
              <Link href="/privacy">Privacyverklaring</Link>.
            </p>

            <h2>1. Wat is een cookie?</h2>
            <p>
              Een cookie is een klein tekstbestand dat een website op je apparaat plaatst. Daarnaast
              bestaan er vergelijkbare technieken, zoals local storage en scripts die gegevens
              opvragen bij een andere partij. Waar hieronder &quot;cookies&quot; staat, bedoelen we
              die technieken er ook mee.
            </p>

            <h2>2. Welke categorieën gebruiken wij?</h2>
            <table>
              <thead>
                <tr><th>Categorie</th><th>Waarvoor</th><th>Toestemming nodig?</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Noodzakelijk</b></td>
                  <td>Onthouden van jouw cookiekeuze en het beveiligen en uitleveren van de website.</td>
                  <td>Nee — zonder deze werkt de site niet.</td>
                </tr>
                <tr>
                  <td><b>Statistieken</b></td>
                  <td>Meten hoe de website gebruikt wordt, zodat we hem kunnen verbeteren.</td>
                  <td>Ja.</td>
                </tr>
                <tr>
                  <td><b>Marketing</b></td>
                  <td>Meten welke advertenties of campagnes tot een bezoek leiden.</td>
                  <td>Ja.</td>
                </tr>
              </tbody>
            </table>

            <h2>3. Welke partijen laden er op deze website?</h2>
            <table>
              <thead>
                <tr><th>Partij</th><th>Wat het doet</th><th>Wanneer</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Consently</b></td>
                  <td>De cookiebanner. Vraagt je toestemming en bewaart je keuze, zodat we het niet elk bezoek opnieuw vragen en kunnen aantonen wat je hebt gekozen.</td>
                  <td>Altijd — noodzakelijk.</td>
                </tr>
                <tr>
                  <td><b>Google Tag Manager</b></td>
                  <td>Het systeem waarmee wij meetinstrumenten op de site plaatsen. Welke instrumenten dat zijn, zie je in de cookiebanner onder &quot;Statistieken&quot; en &quot;Marketing&quot;.</td>
                  <td>Alleen ná jouw toestemming. Geef je die niet, dan wordt Google Tag Manager niet geladen.</td>
                </tr>
                <tr>
                  <td><b>Google Fonts</b></td>
                  <td>De lettertypen waarmee de site wordt weergegeven. Hierbij wordt jouw IP-adres doorgegeven aan Google.</td>
                  <td>Bij het laden van de pagina. Zie de opmerking hieronder.</td>
                </tr>
                <tr>
                  <td><b>Vercel</b></td>
                  <td>De host van de website. Verwerkt technische gegevens die nodig zijn om de pagina uit te leveren en misbruik te weren.</td>
                  <td>Altijd — noodzakelijk.</td>
                </tr>
              </tbody>
            </table>

            <p>
              <b>Over Google Fonts.</b> De lettertypen worden op dit moment bij Google opgehaald,
              wat betekent dat je IP-adres daarbij naar Google gaat, ook als je geen toestemming
              geeft. Dat is geen cookie en geen tracking, maar wel een gegevensuitwisseling die we
              liever niet hebben. We zijn bezig de lettertypen zelf te hosten, zodat die uitwisseling
              helemaal verdwijnt. Zodra dat gebeurd is, halen we deze alinea weg.
            </p>

            <h2>4. Welke cookies precies, en hoe lang?</h2>
            <p>
              De exacte cookienamen, hun doel en hun bewaartermijn staan in de cookiebanner zelf.
              Die lijst wordt automatisch bijgehouden op basis van wat er daadwerkelijk op de site
              laadt, dus hij is altijd actueel — ook als wij een meetinstrument toevoegen of
              weghalen. Open de banner via de link in stap 5 hieronder en klap de categorieën open.
            </p>

            <h2>5. Je keuze aanpassen of intrekken</h2>
            <p>
              Je kunt je toestemming op elk moment wijzigen of intrekken. Dat kan op drie manieren:
            </p>
            <ul>
              <li>Via de cookie-instellingen in de banner onderaan de site.</li>
              <li>Door de cookies van deze site te verwijderen in je browser. Bij je volgende bezoek verschijnt de banner opnieuw.</li>
              <li>Door je browser zo in te stellen dat cookies worden geweigerd of verwijderd. Let op: dan kunnen ook noodzakelijke functies stuk gaan.</li>
            </ul>
            <p>
              Intrekken werkt vooruit, niet achteruit: gegevens die vóór het intrekken zijn verzameld,
              blijven verzameld. Wil je die ook laten verwijderen, mail dan naar{' '}
              <a href={`mailto:${BEDRIJF.email}`}>{BEDRIJF.email}</a>.
            </p>

            <h2>6. Doorgifte buiten de Europese Unie</h2>
            <p>
              Google is gevestigd in Ierland en kan gegevens doorgeven aan de Verenigde Staten. Die
              doorgifte vindt plaats op basis van het EU-VS Data Privacy Framework en Standard
              Contractual Clauses. Ook Vercel is een Amerikaanse partij; ook daar geldt de doorgifte
              op basis van Standard Contractual Clauses. Gegevens die je invoert <em>in</em> het
              Emma-platform staan op servers binnen de Europese Unie (Frankfurt).
            </p>

            <h2>7. Het Emma-platform is iets anders dan deze website</h2>
            <p>
              Deze website is de etalage; app.emmastudio.nl is het platform waar je inlogt en werkt.
              Op het platform staan geen statistiek- of marketingcookies. Wel staan er strikt
              noodzakelijke cookies om je ingelogd te houden — zonder die cookies kun je niet
              inloggen, en daarvoor is geen toestemming vereist.
            </p>

            <h2>8. Wijzigingen</h2>
            <p>
              Wij passen dit cookiebeleid aan als er iets verandert aan wat er op de site laadt. De
              datum bovenaan geeft de meest recente versie aan.
            </p>

            <h2>9. Vragen</h2>
            <p>
              Vragen over dit cookiebeleid? Mail naar{' '}
              <a href={`mailto:${BEDRIJF.email}`}>{BEDRIJF.email}</a> of gebruik het{' '}
              <Link href="/contact">contactformulier</Link>. Je kunt ook een klacht indienen bij de{' '}
              <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">
                Autoriteit Persoonsgegevens
              </a>.
            </p>

            <p style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line)', fontSize: '13px', color: 'var(--ink-soft)' }}>
              {BEDRIJF.naam} · {ADRES_KORT} · {NUMMERS_KORT} · <Link href="/privacy">Privacyverklaring</Link> · <Link href="/algemene-voorwaarden">Algemene Voorwaarden</Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
