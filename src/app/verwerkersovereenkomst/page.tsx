import type { Metadata } from 'next';
import Link from 'next/link';
import { BEDRIJF, ADRES_KORT, NUMMERS_KORT } from '@/data/bedrijf';

/* Verwerkersovereenkomst (AVG art. 28). Staat online in plaats van "op verzoek":
   elke zakelijke klant vraagt erom, en "op verzoek" betekent in de praktijk een
   e-mailwisseling middenin het salesproces.

   De subverwerkerslijst is NIET verzonnen maar afgelezen uit de code van het
   platform: Supabase (database + opslag), Vercel (hosting), Stripe (betalingen),
   Resend (e-mail), en de AI-laag in supabase/functions/ai/ die op twee providers
   uitkomt — Anthropic (api.anthropic.com, providers.ts) en Google (Gemini, zie
   models.json). Die laatste twee zijn geen detail: bonnen, facturen en financiele
   overzichten gaan er doorheen. Ze horen dus in de lijst, niet erbuiten. */

export const metadata: Metadata = {
  title: 'Verwerkersovereenkomst · Emma',
  description: 'De verwerkersovereenkomst van Toms Ambitie voor het Emma-platform, conform artikel 28 AVG.',
  robots: { index: false },
};

export default function Verwerkersovereenkomst() {
  return (
    <main id="main-content" className="lightpage" data-page="legal">
      <div className="wrap">
        <div className="legal">
          <div className="legal__content">

            <div className="legal__kicker">
              <Link href="/" className="legal__back">← Terug naar emmastudio.nl</Link>
            </div>

            <h1>Verwerkersovereenkomst</h1>
            <p className="legal__meta">Toms Ambitie · Versie 1.0 · Ingangsdatum: 9 augustus 2026</p>

            <p>
              Werk je met Emma, dan voer je gegevens in over je klanten en je medewerkers. Dat maakt
              jou de verwerkingsverantwoordelijke en ons de verwerker. De AVG schrijft voor dat we
              daar afspraken over vastleggen. Dat doen we hier, zodat je er niet om hoeft te vragen
              en er niets voor hoeft te tekenen: deze overeenkomst geldt automatisch zodra je
              persoonsgegevens invoert in Emma, en maakt onderdeel uit van de{' '}
              <Link href="/algemene-voorwaarden">Algemene Voorwaarden</Link>.
            </p>

            <h2>Artikel 1 — Partijen en rollen</h2>
            <p>
              1.1 <b>Verwerker:</b> de {BEDRIJF.rechtsvorm} {BEDRIJF.naam}, {ADRES_KORT}, KvK{' '}
              {BEDRIJF.kvk}, handelend onder de naam EmmaStudio.
            </p>
            <p>
              1.2 <b>Verwerkingsverantwoordelijke:</b> de Klant, zijnde de onderneming die een
              abonnement op Emma heeft en persoonsgegevens invoert in het platform.
            </p>
            <p>
              1.3 Voor gegevens die wij voor onszelf verwerken — jouw accountgegevens, facturatie en
              het gebruik van de website — zijn wij zélf verwerkingsverantwoordelijke. Daarvoor geldt
              onze <Link href="/privacy">Privacyverklaring</Link>, niet deze overeenkomst.
            </p>

            <h2>Artikel 2 — Onderwerp, aard en duur</h2>
            <p>
              2.1 Wij verwerken persoonsgegevens uitsluitend om het Emma-platform aan jou te kunnen
              leveren: het bijhouden van je administratie, je personeelszaken, je klantcontact en de
              analyses en adviezen die daaruit volgen, afhankelijk van de modules die je afneemt.
            </p>
            <p>
              2.2 Deze overeenkomst geldt zolang je een account bij Emma hebt en eindigt zodra de
              abonnementsovereenkomst eindigt, met inachtneming van artikel 9.
            </p>

            <h2>Artikel 3 — Categorieën gegevens en betrokkenen</h2>
            <table>
              <thead>
                <tr><th>Betrokkenen</th><th>Gegevens</th><th>Bij welke module</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jouw medewerkers</td>
                  <td>Naam, adres, contactgegevens, geboortedatum, BSN, bankrekeningnummer, contractgegevens, salaris, verlof, verzuim en declaraties.</td>
                  <td>EmmaLoont</td>
                </tr>
                <tr>
                  <td>Jouw klanten en relaties</td>
                  <td>Naam, adres, contactgegevens, factuur- en betaalgegevens.</td>
                  <td>EmmaBoekt</td>
                </tr>
                <tr>
                  <td>Zakelijke contacten en kandidaten</td>
                  <td>Bedrijfsnaam, openbaar beschikbare contactgegevens, locatie en de door Emma berekende score.</td>
                  <td>EmmaVindt</td>
                </tr>
                <tr>
                  <td>Jouw gebruikers</td>
                  <td>E-mailadres, rol en handelingen in het systeem (auditlog).</td>
                  <td>Platform</td>
                </tr>
              </tbody>
            </table>
            <p>
              3.1 Verwerk je via Emma bijzondere persoonsgegevens — bij verzuimregistratie kan dat
              gebeuren — dan blijf jij verantwoordelijk voor de rechtmatigheid daarvan. Emma vraagt
              bewust niet naar de aard of oorzaak van verzuim.
            </p>

            <h2>Artikel 4 — Instructies</h2>
            <p>
              4.1 Wij verwerken persoonsgegevens uitsluitend op jouw instructie. Het gebruik van het
              platform door jou en je gebruikers geldt als die instructie.
            </p>
            <p>
              4.2 Wij verwerken jouw gegevens niet voor eigen doeleinden. Wij verkopen ze niet, delen
              ze niet met andere klanten, en gebruiken ze niet om AI-modellen te trainen.
            </p>
            <p>
              4.3 Zijn wij van mening dat een instructie in strijd is met de AVG, dan melden wij dat
              bij jou voordat wij die instructie uitvoeren.
            </p>

            <h2>Artikel 5 — Geheimhouding</h2>
            <p>
              5.1 Iedereen die bij ons toegang heeft tot jouw gegevens is tot geheimhouding
              verplicht. Toegang wordt alleen gegeven voor zover die nodig is voor onderhoud,
              ondersteuning of het oplossen van een storing.
            </p>

            <h2>Artikel 6 — Beveiliging</h2>
            <p>6.1 Wij treffen passende technische en organisatorische maatregelen, waaronder:</p>
            <ul>
              <li>versleutelde verbindingen (TLS) en versleutelde opslag;</li>
              <li>scheiding van klantgegevens op databaseniveau, afgedwongen door de database zelf en niet alleen door de applicatie (row level security per tenant);</li>
              <li>toegang op basis van rollen, waarbij een medewerker van jouw bedrijf alleen zijn eigen gegevens ziet;</li>
              <li>een auditlog van handelingen in het systeem;</li>
              <li>dagelijkse back-ups van de database.</li>
            </ul>
            <p>
              6.2 Wij beoordelen deze maatregelen periodiek en passen ze aan wanneer de stand van de
              techniek of het risico daarom vraagt.
            </p>

            <h2>Artikel 7 — Subverwerkers</h2>
            <p>
              7.1 Je geeft ons toestemming om de hieronder genoemde subverwerkers in te schakelen.
              Met elk van hen hebben wij afspraken die niet minder streng zijn dan deze overeenkomst.
            </p>
            <table>
              <thead>
                <tr><th>Subverwerker</th><th>Waarvoor</th><th>Locatie</th></tr>
              </thead>
              <tbody>
                <tr><td>Supabase</td><td>Database en bestandsopslag van het platform</td><td>Europese Unie (Frankfurt)</td></tr>
                <tr><td>Vercel</td><td>Hosting van de applicatie en de website</td><td>Verenigde Staten (SCC&apos;s)</td></tr>
                <tr><td>Stripe</td><td>Verwerking van abonnementsbetalingen</td><td>Verenigde Staten (SCC&apos;s)</td></tr>
                <tr><td>Resend</td><td>Verzending van e-mail, waaronder loonstroken en facturen</td><td>Verenigde Staten (SCC&apos;s)</td></tr>
                <tr><td>Anthropic</td><td>Analyse van tekst: grootboeksuggesties, wekelijkse adviezen, scoren van leads en het opstellen van conceptberichten</td><td>Verenigde Staten (SCC&apos;s)</td></tr>
                <tr><td>Google</td><td>Uitlezen van bonnen, facturen en financiële overzichten (OCR en tekstherkenning)</td><td>Verenigde Staten (SCC&apos;s)</td></tr>
              </tbody>
            </table>
            <p>
              7.2 <b>Over de AI-partijen.</b> Bonnen, facturen en financiële overzichten die je
              uploadt, gaan langs Anthropic of Google om uitgelezen te worden. Wij nemen die diensten
              uitsluitend af onder zakelijke voorwaarden die het gebruik van jouw gegevens voor het
              trainen van modellen uitsluiten. Emma stuurt per taak alleen wat daarvoor nodig is, en
              niets gebeurt automatisch: Emma stelt voor, jij bevestigt. Wij gebruiken jouw gegevens
              zelf nooit om modellen te trainen of te verbeteren.
            </p>
            <p>
              7.3 Willen wij een subverwerker toevoegen of vervangen, dan melden wij dat minimaal 30
              dagen van tevoren per e-mail. Maak je bezwaar en komen we er niet uit, dan mag je het
              abonnement kosteloos opzeggen tegen de datum van de wijziging.
            </p>
            <p>
              7.4 Koppel je Emma aan een boekhoudpakket, zoals e-Boekhouden.nl, dan is die partij
              geen subverwerker van ons. Je hebt daar een eigen relatie mee; wij wisselen alleen
              gegevens uit op jouw instructie.
            </p>

            <h2>Artikel 8 — Rechten van betrokkenen en datalekken</h2>
            <p>
              8.1 Krijg je een verzoek van een betrokkene — inzage, correctie, verwijdering,
              overdracht — dan helpen wij je dat af te handelen. Veel daarvan kun je zelf in het
              platform: gegevens zijn in te zien, aan te passen en te exporteren.
            </p>
            <p>
              8.2 Richt een betrokkene zich rechtstreeks tot ons, dan verwijzen wij hem naar jou en
              stellen wij je daarvan op de hoogte.
            </p>
            <p>
              8.3 Ontdekken wij een inbreuk in verband met persoonsgegevens die jouw gegevens raakt,
              dan melden wij dat <b>zonder onredelijke vertraging en uiterlijk binnen 24 uur</b> na
              ontdekking bij jou, met wat we op dat moment weten: wat er is gebeurd, welke gegevens
              en betrokkenen het raakt, wat de vermoedelijke gevolgen zijn en wat wij doen. De
              melding bij de Autoriteit Persoonsgegevens doe jij, als verwerkingsverantwoordelijke.
            </p>
            <p>
              8.4 Wij helpen je desgevraagd bij een gegevensbeschermingseffectbeoordeling (DPIA) en
              bij een voorafgaande raadpleging van de toezichthouder.
            </p>

            <h2>Artikel 9 — Teruggave en verwijdering</h2>
            <p>
              9.1 Bij het einde van de overeenkomst kun je je gegevens exporteren. Wij bewaren ze
              daarna conform de bewaartermijnen in de <Link href="/privacy">Privacyverklaring</Link>
              {' '}en verwijderen ze na afloop daarvan, tenzij wij ze wettelijk moeten bewaren.
            </p>
            <p>
              9.2 Wil je dat we eerder verwijderen, dan doen we dat op jouw schriftelijke verzoek,
              behalve waar een wettelijke bewaarplicht dat verhindert.
            </p>

            <h2>Artikel 10 — Controle</h2>
            <p>
              10.1 Je mag één keer per jaar controleren of wij ons aan deze overeenkomst houden. Wij
              beantwoorden je vragen en leveren de informatie die we hebben.
            </p>
            <p>
              10.2 Wil je een audit door een onafhankelijke derde, dan werken wij daaraan mee. De
              kosten daarvan zijn voor jou, tenzij uit de audit blijkt dat wij in gebreke zijn.
            </p>

            <h2>Artikel 11 — Aansprakelijkheid en toepasselijk recht</h2>
            <p>
              11.1 Op deze overeenkomst is Nederlands recht van toepassing. De
              aansprakelijkheidsbepalingen uit de{' '}
              <Link href="/algemene-voorwaarden">Algemene Voorwaarden</Link> zijn van
              overeenkomstige toepassing.
            </p>
            <p>
              11.2 Wijkt deze overeenkomst af van de Algemene Voorwaarden waar het de verwerking van
              persoonsgegevens betreft, dan gaat deze overeenkomst voor.
            </p>

            <h2>Artikel 12 — Vragen</h2>
            <p>
              Heb je een eigen verwerkersovereenkomst die je liever gebruikt, of vragen over deze?
              Mail naar <a href={`mailto:${BEDRIJF.email}`}>{BEDRIJF.email}</a>. We kijken er serieus
              naar.
            </p>

            <p style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line)', fontSize: '13px', color: 'var(--ink-soft)' }}>
              {BEDRIJF.naam} · {ADRES_KORT} · {NUMMERS_KORT} · <Link href="/privacy">Privacyverklaring</Link> · <Link href="/cookiebeleid">Cookiebeleid</Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
