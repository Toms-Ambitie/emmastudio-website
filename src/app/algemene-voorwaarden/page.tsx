import type { Metadata } from 'next';
import Link from 'next/link';
import { BEDRIJF, ADRES_KORT, NUMMERS_KORT } from '@/data/bedrijf';

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden · Emma',
  description: 'Algemene voorwaarden van Toms Ambitie voor het gebruik van het Emma-platform.',
  robots: { index: false },
};

export default function AlgemeneVoorwaarden() {
  return (
    <main id="main-content" className="lightpage" data-page="legal">
      <div className="wrap">
        <div className="legal">
          <div className="legal__content">

            <div className="legal__kicker">
              <Link href="/" className="legal__back">← Terug naar emmastudio.nl</Link>
            </div>

            <h1>Algemene Voorwaarden</h1>
            <p className="legal__meta">Toms Ambitie · Versie 1.1 · Ingangsdatum: 9 augustus 2026</p>

            <h2>Artikel 1 — Definities</h2>
            <p>In deze voorwaarden wordt verstaan onder:</p>
            <ul>
              <li><b>Emma:</b> het softwareplatform dat door Toms Ambitie wordt aangeboden via emmastudio.nl, inclusief alle bijbehorende modules en diensten.</li>
              <li><b>Toms Ambitie:</b> Toms Ambitie, gevestigd aan de {BEDRIJF.straat}, {BEDRIJF.postcode} {BEDRIJF.plaats}, ingeschreven in het handelsregister van de Kamer van Koophandel onder nummer {BEDRIJF.kvk}, btw-identificatienummer {BEDRIJF.btw}.</li>
              <li><b>Klant:</b> de natuurlijke persoon die handelt in de uitoefening van een beroep of bedrijf, of de rechtspersoon, die een abonnement afsluit op Emma.</li>
              <li><b>Module:</b> een afzonderlijk onderdeel van Emma, zoals EmmaBoekt, EmmaWaakt, EmmaLoont, EmmaVindt, EmmaCoacht, EmmaZiet, EmmaSchrijft of EmmaPromoot.</li>
              <li><b>Overeenkomst:</b> de abonnementsovereenkomst tussen Toms Ambitie en de Klant.</li>
              <li><b>Gebruiker:</b> een medewerker of andere persoon die namens de Klant gebruik maakt van Emma.</li>
            </ul>

            <h2>Artikel 2 — Toepasselijkheid</h2>
            <p>2.1 Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en leveringen van Toms Ambitie aan de Klant.</p>
            <p>2.2 Afwijkingen van deze voorwaarden zijn alleen geldig indien schriftelijk overeengekomen tussen Toms Ambitie en de Klant.</p>
            <p>2.3 De toepasselijkheid van eventuele inkoop- of andere voorwaarden van de Klant wordt uitdrukkelijk van de hand gewezen.</p>

            <h2>Artikel 3 — Account en toegang</h2>
            <p>3.1 Om gebruik te kunnen maken van Emma dient de Klant een account aan te maken via app.emmastudio.nl/signup.</p>
            <p>3.2 De Klant is verantwoordelijk voor het geheimhouden van zijn inloggegevens en is aansprakelijk voor alle handelingen die via zijn account worden verricht.</p>
            <p>3.3 De Klant stelt Toms Ambitie onverwijld op de hoogte indien hij een vermoeden heeft van ongeautoriseerd gebruik van zijn account.</p>
            <p>3.4 Toms Ambitie behoudt zich het recht voor een account tijdelijk of permanent op te schorten bij schending van deze voorwaarden.</p>

            <h2>Artikel 4 — Abonnement en betaling</h2>
            <p>4.1 Het abonnement bestaat uit de door de Klant geselecteerde modules. De actuele prijzen per module staan vermeld op emmastudio.nl/modules.</p>
            <p>4.2 Betaling vindt maandelijks of jaarlijks vooruit plaats, afhankelijk van de door de Klant gekozen betalingstermijn.</p>
            <p>4.3 Bij jaarlijkse betaling ontvangt de Klant een korting van 10% ten opzichte van de maandelijkse prijs.</p>
            <p>4.4 Alle prijzen zijn exclusief omzetbelasting (btw).</p>
            <p>4.5 Betaling geschiedt via de door Toms Ambitie aangeboden betaalmethoden. Bij niet-tijdige betaling is de Klant van rechtswege in verzuim en is Toms Ambitie gerechtigd de toegang tot Emma op te schorten totdat de volledige betaling is ontvangen.</p>
            <p>4.6 Toms Ambitie behoudt zich het recht voor de prijzen aan te passen. Prijswijzigingen worden minimaal 30 dagen van tevoren per e-mail aan de Klant medegedeeld.</p>

            <h2>Artikel 5 — Gratis proefperiode</h2>
            <p>5.1 Nieuwe Klanten hebben recht op een gratis proefperiode van 14 dagen. Voor het starten van de proefperiode wordt geen betaalmiddel gevraagd.</p>
            <p>5.2 De proefperiode gaat <b>niet</b> automatisch over in een betaald abonnement. Heeft de Klant aan het einde van de proefperiode geen betaalmiddel toegevoegd, dan wordt het abonnement gepauzeerd: er wordt niets in rekening gebracht en de toegang tot de modules vervalt. De Klant hoeft daarvoor niets te doen en niet op te zeggen.</p>
            <p>5.3 Voegt de Klant tijdens of na de proefperiode een betaalmiddel toe, dan wordt het abonnement op dat moment betaald voortgezet respectievelijk hervat, tegen de op dat moment geldende prijs.</p>
            <p>5.4 Tijdens de proefperiode zijn alle door de Klant geselecteerde modules volledig beschikbaar.</p>
            <p>5.5 Een gepauzeerd abonnement en de daarin opgeslagen gegevens blijven bewaard conform de bewaartermijnen in de <Link href="/privacy">Privacyverklaring</Link>, zodat de Klant later kan hervatten zonder gegevensverlies.</p>

            <h2>Artikel 6 — Duur en opzegging</h2>
            <p>6.1 Het abonnement wordt aangegaan voor de gekozen betalingstermijn (maandelijks of jaarlijks) en wordt na afloop automatisch verlengd.</p>
            <p>6.2 De Klant kan het abonnement op elk moment opzeggen via de accountinstellingen. De opzegging gaat in aan het einde van de lopende betaalperiode.</p>
            <p>6.3 Toms Ambitie kan het abonnement opzeggen met inachtneming van een opzegtermijn van 30 dagen, tenzij sprake is van een zwaarwegende reden zoals schending van deze voorwaarden of niet-betaling.</p>
            <p>6.4 Bij opzegging worden de gegevens van de Klant conform de Privacyverklaring bewaard en na de bewaartermijn verwijderd.</p>

            <h2>Artikel 7 — Gebruik van de dienst</h2>
            <p>7.1 De Klant gebruikt Emma uitsluitend voor wettige doeleinden en in overeenstemming met deze voorwaarden.</p>
            <p>7.2 Het is de Klant niet toegestaan Emma te gebruiken voor handelingen die in strijd zijn met de wet, de openbare orde of de goede zeden.</p>
            <p>7.3 Het is de Klant niet toegestaan Emma te reverse-engineeren, te kopiëren, aan te passen of de broncode te extraheren.</p>
            <p>7.4 De Klant mag Emma niet doorverkopen of ter beschikking stellen aan derden, tenzij Toms Ambitie hier schriftelijk toestemming voor heeft gegeven.</p>

            <h2>Artikel 8 — Intellectueel eigendom</h2>
            <p>8.1 Alle intellectuele eigendomsrechten op Emma, inclusief de software, het ontwerp, de documentatie en alle daarmee samenhangende materialen, berusten bij Toms Ambitie of diens licentiegevers.</p>
            <p>8.2 De Klant verkrijgt een beperkt, niet-exclusief en niet-overdraagbaar gebruiksrecht voor de duur van het abonnement.</p>
            <p>8.3 Gegevens die de Klant invoert in Emma blijven te allen tijde eigendom van de Klant. Toms Ambitie verwerkt deze gegevens uitsluitend op instructie van de Klant.</p>

            <h2>Artikel 9 — Beschikbaarheid en onderhoud</h2>
            <p>9.1 Toms Ambitie streeft naar een beschikbaarheid van Emma van minimaal 99,5% per maand, berekend op jaarbasis, exclusief gepland onderhoud.</p>
            <p>9.2 Gepland onderhoud wordt zoveel mogelijk buiten Nederlandse kantooruren uitgevoerd en minimaal 24 uur van tevoren via de website of per e-mail aangekondigd.</p>
            <p>9.3 Bij onvoorziene storingen doet Toms Ambitie zijn uiterste best om de dienst zo spoedig mogelijk te herstellen.</p>

            <h2>Artikel 10 — Gegevensverwerking</h2>
            <p>10.1 Toms Ambitie verwerkt persoonsgegevens van de Klant en diens medewerkers als verwerker in de zin van de Algemene Verordening Gegevensbescherming (AVG).</p>
            <p>10.2 De Klant is de verwerkingsverantwoordelijke voor de persoonsgegevens die hij invoert in Emma en is verantwoordelijk voor de rechtmatigheid van die verwerking.</p>
            <p>10.3 De <Link href="/verwerkersovereenkomst">verwerkersovereenkomst</Link> maakt integraal onderdeel uit van deze overeenkomst en is van toepassing zodra de Klant persoonsgegevens invoert in Emma. De Klant hoeft daar niet om te vragen.</p>
            <p>10.4 Voor meer informatie over de verwerking van persoonsgegevens verwijzen wij naar onze <Link href="/privacy">Privacyverklaring</Link> en het <Link href="/cookiebeleid">Cookiebeleid</Link>.</p>

            <h2>Artikel 11 — Aansprakelijkheid</h2>
            <p>11.1 De totale aansprakelijkheid van Toms Ambitie is beperkt tot directe schade en bedraagt maximaal het bedrag dat de Klant in de drie kalendermaanden voorafgaand aan de schadeveroorzakende gebeurtenis aan abonnementskosten heeft betaald.</p>
            <p>11.2 Toms Ambitie is in geen geval aansprakelijk voor indirecte schade, gevolgschade, gederfde winst, gemiste besparingen of schade door bedrijfsstagnatie.</p>
            <p>11.3 De aansprakelijkheidsbeperkingen in dit artikel gelden niet in geval van opzet of bewuste roekeloosheid van Toms Ambitie of diens leidinggevende medewerkers.</p>

            <h2>Artikel 12 — Overmacht</h2>
            <p>Toms Ambitie is niet gehouden tot nakoming van enige verplichting indien sprake is van overmacht, waaronder begrepen storingen bij hostingproviders, DDoS-aanvallen, internetstoringen en overheidsmaatregelen.</p>

            <h2>Artikel 13 — Wijzigingen</h2>
            <p>13.1 Toms Ambitie behoudt zich het recht voor deze algemene voorwaarden te wijzigen. De Klant wordt minimaal 30 dagen voor de inwerkingtreding per e-mail geïnformeerd.</p>
            <p>13.2 Indien de Klant niet akkoord gaat met de wijzigingen, heeft hij het recht het abonnement op te zeggen vóór de datum van inwerkingtreding van de gewijzigde voorwaarden.</p>

            <h2>Artikel 14 — Toepasselijk recht en geschillenbeslechting</h2>
            <p>14.1 Op deze overeenkomst is uitsluitend Nederlands recht van toepassing.</p>
            <p>14.2 Geschillen zullen bij voorkeur in goed overleg worden opgelost.</p>
            <p>14.3 Indien partijen er niet in slagen een geschil in onderling overleg op te lossen, is de bevoegde rechter in het arrondissement Overijssel (locatie Zwolle) exclusief bevoegd.</p>

            <h2>Artikel 15 — Contact</h2>
            <p>Vragen over deze algemene voorwaarden? Neem contact op via <Link href="/contact">emmastudio.nl/contact</Link> of mail naar <a href="mailto:info@emmastudio.nl">info@emmastudio.nl</a>.</p>
            <p>
              <b>{BEDRIJF.naam}</b><br />
              {BEDRIJF.straat}<br />
              {BEDRIJF.postcode} {BEDRIJF.plaats}, {BEDRIJF.land}<br />
              KvK: {BEDRIJF.kvk}<br />
              Btw-identificatienummer: {BEDRIJF.btw}<br />
              E-mail: <a href={`mailto:${BEDRIJF.email}`}>{BEDRIJF.email}</a>
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
