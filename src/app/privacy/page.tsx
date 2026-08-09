import type { Metadata } from 'next';
import Link from 'next/link';
import { BEDRIJF, ADRES_KORT, NUMMERS_KORT } from '@/data/bedrijf';

export const metadata: Metadata = {
  title: 'Privacyverklaring · Emma',
  description: 'Privacyverklaring van Toms Ambitie voor het Emma-platform. Lees hoe wij omgaan met jouw persoonsgegevens.',
  robots: { index: false },
};

export default function Privacy() {
  return (
    <main id="main-content" className="lightpage" data-page="legal">
      <div className="wrap">
        <div className="legal">
          <div className="legal__content">

            <div className="legal__kicker">
              <Link href="/" className="legal__back">← Terug naar emmastudio.nl</Link>
            </div>

            <h1>Privacyverklaring</h1>
            <p className="legal__meta">Toms Ambitie · Versie 1.1 · Ingangsdatum: 9 augustus 2026</p>

            <h2>1. Wie zijn wij?</h2>
            <p>
              Toms Ambitie is de verwerkingsverantwoordelijke voor de persoonsgegevens die worden verwerkt via emmastudio.nl en het Emma-platform.
            </p>
            <p>
              <b>{BEDRIJF.naam}</b><br />
              {BEDRIJF.straat}<br />
              {BEDRIJF.postcode} {BEDRIJF.plaats}, {BEDRIJF.land}<br />
              KvK: {BEDRIJF.kvk}<br />
              Btw-identificatienummer: {BEDRIJF.btw}<br />
              Website: <Link href="/">{BEDRIJF.website}</Link><br />
              E-mail: <a href={`mailto:${BEDRIJF.email}`}>{BEDRIJF.email}</a>
            </p>

            <h2>2. Welke persoonsgegevens verwerken wij?</h2>
            <p>Wij verwerken de volgende categorieën persoonsgegevens:</p>
            <ul>
              <li><b>Contactgegevens:</b> naam en e-mailadres bij aanmelding voor de wachtlijst of via het contactformulier.</li>
              <li><b>Accountgegevens:</b> e-mailadres, bedrijfsnaam en inloggegevens bij registratie voor Emma.</li>
              <li><b>Gebruiksgegevens:</b> welke modules worden gebruikt, tijdstippen van gebruik en technische loggegevens.</li>
              <li><b>Betalingsgegevens:</b> betalingen worden verwerkt via Stripe. Toms Ambitie slaat zelf geen betaalkaartgegevens op.</li>
              <li><b>Bedrijfsgegevens:</b> gegevens die de Klant invoert in Emma, zoals factuurinformatie, loongegevens en personeelsdossiers. Toms Ambitie verwerkt deze gegevens als verwerker (zie artikel 7).</li>
            </ul>

            <h2>3. Doeleinden en grondslagen</h2>
            <p>Wij verwerken persoonsgegevens voor de volgende doeleinden:</p>
            <table>
              <thead>
                <tr><th>Doel</th><th>Grondslag</th></tr>
              </thead>
              <tbody>
                <tr><td>Uitvoeren van de abonnementsovereenkomst</td><td>Uitvoering overeenkomst</td></tr>
                <tr><td>Facturering en betalingsverwerking</td><td>Uitvoering overeenkomst</td></tr>
                <tr><td>Klantenservice en communicatie</td><td>Gerechtvaardigd belang</td></tr>
                <tr><td>Verbetering en doorontwikkeling van Emma</td><td>Gerechtvaardigd belang</td></tr>
                <tr><td>Verzending van de wachtlijst-nieuwsbrief</td><td>Toestemming</td></tr>
                <tr><td>Voldoen aan wettelijke verplichtingen (o.a. fiscale bewaarplicht)</td><td>Wettelijke verplichting</td></tr>
              </tbody>
            </table>

            <h2>4. Bewaartermijnen</h2>
            <p>Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld:</p>
            <ul>
              <li><b>Accountgegevens:</b> zolang het account actief is, plus 2 jaar na opzegging.</li>
              <li><b>Factuurgegevens:</b> 7 jaar op grond van de fiscale bewaarplicht.</li>
              <li><b>Wachtlijst-e-mailadressen:</b> totdat je je uitschrijft via de afmeldlink in de e-mail.</li>
              <li><b>Contactformulierberichten:</b> maximaal 1 jaar.</li>
            </ul>

            <h2>5. Ontvangers en doorgifte aan derden</h2>
            <p>Wij delen persoonsgegevens met de volgende categorieën verwerkers of ontvangers:</p>
            <ul>
              <li><b>Stripe:</b> voor betalingsverwerking. Stripe is gevestigd in de Verenigde Staten; de doorgifte vindt plaats op basis van Standard Contractual Clauses.</li>
              <li><b>Resend:</b> voor het verzenden van e-mail (wachtlijst-bevestigingen en berichten via het contactformulier). Resend is gevestigd in de Verenigde Staten; de doorgifte vindt plaats op basis van Standard Contractual Clauses.</li>
              <li><b>Vercel:</b> voor de hosting van de website. Vercel is gevestigd in de Verenigde Staten; de doorgifte vindt plaats op basis van Standard Contractual Clauses.</li>
              <li><b>Supabase:</b> voor de database en opslag van het Emma-platform. De gegevens staan op servers binnen de Europese Unie (Frankfurt).</li>
              <li><b>Consently:</b> voor de cookiebanner waarmee je je toestemming beheert. Consently verwerkt je toestemmingskeuze en het bijbehorende IP-adres als bewijs van die keuze.</li>
              <li><b>Google Ireland Limited:</b> voor Google Tag Manager, waarmee wij meetinstrumenten op de website plaatsen. Google Tag Manager laadt alleen ná jouw toestemming via de cookiebanner. Welke meetinstrumenten daarmee worden geplaatst, staat in het <Link href="/cookiebeleid">Cookiebeleid</Link>. Google kan gegevens doorgeven aan de Verenigde Staten; die doorgifte vindt plaats op basis van het EU-VS Data Privacy Framework en Standard Contractual Clauses.</li>
              <li><b>Google Fonts:</b> de lettertypen van deze website worden geladen via Google Fonts. Daarbij wordt jouw IP-adres aan Google doorgegeven. Zie het <Link href="/cookiebeleid">Cookiebeleid</Link> voor de stand van zaken.</li>
            </ul>
            <p>Een volledig en actueel overzicht van wat er precies laadt, wanneer en waarom, staat in ons <Link href="/cookiebeleid">Cookiebeleid</Link>.</p>
            <p>Persoonsgegevens die je invoert <em>in</em> het Emma-platform worden opgeslagen op servers binnen de Europese Unie (Frankfurt). Wij verkopen jouw gegevens nooit aan derden.</p>

            <h2>6. Beveiliging</h2>
            <p>Toms Ambitie treft passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, ongeautoriseerde toegang of openbaarmaking. Dit omvat onder meer versleutelde verbindingen (TLS/HTTPS), strikte toegangscontrole en regelmatige beveiligingscontroles.</p>

            <h2>7. Emma als verwerker</h2>
            <p>Wanneer je als Klant bedrijfsgegevens invoert in Emma (zoals facturen, loongegevens of personeelsdossiers), treedt Toms Ambitie op als verwerker in de zin van de AVG en ben jij de verwerkingsverantwoordelijke. Je bent zelf verantwoordelijk voor de rechtmatigheid van de verwerking van die gegevens.</p>
            <p>Onze <Link href="/verwerkersovereenkomst">verwerkersovereenkomst</Link> staat gewoon online en geldt zodra je persoonsgegevens invoert in Emma. Je hoeft er niet om te vragen en er niets voor te tekenen.</p>

            <h2>8. Jouw rechten</h2>
            <p>Op grond van de AVG heb je de volgende rechten ten aanzien van jouw persoonsgegevens:</p>
            <ul>
              <li><b>Recht op inzage:</b> je kunt opvragen welke persoonsgegevens wij van je verwerken.</li>
              <li><b>Recht op rectificatie:</b> je kunt onjuiste of onvolledige gegevens laten corrigeren.</li>
              <li><b>Recht op verwijdering:</b> je kunt verzoeken jouw gegevens te verwijderen, voor zover wij daar niet wettelijk toe verplicht zijn ze te bewaren.</li>
              <li><b>Recht op beperking van de verwerking:</b> je kunt in bepaalde gevallen verzoeken de verwerking van jouw gegevens te beperken.</li>
              <li><b>Recht van bezwaar:</b> je kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang.</li>
              <li><b>Recht op dataportabiliteit:</b> je kunt jouw gegevens in een gangbaar, machineleesbaar formaat opvragen.</li>
              <li><b>Recht om toestemming in te trekken:</b> indien de verwerking is gebaseerd op toestemming, kun je die toestemming te allen tijde intrekken.</li>
            </ul>
            <p>Om een verzoek in te dienen, stuur een e-mail naar <a href="mailto:info@emmastudio.nl">info@emmastudio.nl</a>. Wij reageren binnen 30 dagen. Wij kunnen je vragen jouw identiteit te verifiëren alvorens je verzoek te behandelen.</p>
            <p>Je hebt ook het recht een klacht in te dienen bij de toezichthoudende autoriteit: de <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.</p>

            <h2>9. Cookies en vergelijkbare technieken</h2>
            <p>Op emmastudio.nl staat een cookiebanner (Consently). Die vraagt jouw toestemming vóórdat er meetinstrumenten laden, en bewaart jouw keuze. Zonder toestemming plaatsen wij geen analytische of advertentiecookies.</p>
            <p>De website zelf kent geen inlogfunctie en plaatst daarvoor dus ook geen sessiecookies. Inloggen gebeurt in het Emma-platform op app.emmastudio.nl; daar zijn de sessiecookies strikt noodzakelijk om je ingelogd te houden.</p>
            <p>Welke cookies en scripts er precies laden, met welk doel en hoe lang ze blijven staan, staat in het <Link href="/cookiebeleid">Cookiebeleid</Link>. Je kunt je keuze daar ook op elk moment weer wijzigen.</p>

            <h2>10. Wijzigingen</h2>
            <p>Wij kunnen deze privacyverklaring periodiek aanpassen. De datum bovenaan dit document geeft de meest recente versie aan. Bij ingrijpende wijzigingen informeren wij je per e-mail.</p>

            <h2>11. Contact</h2>
            <p>Heb je vragen over deze privacyverklaring of over de verwerking van jouw persoonsgegevens? Neem dan contact op via <Link href="/contact">emmastudio.nl/contact</Link> of mail naar <a href="mailto:info@emmastudio.nl">info@emmastudio.nl</a>.</p>

            <p style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--line)', fontSize: '13px', color: 'var(--ink-soft)' }}>
              {BEDRIJF.naam} · {ADRES_KORT} · {NUMMERS_KORT} · <Link href="/algemene-voorwaarden">Algemene Voorwaarden</Link> · <Link href="/cookiebeleid">Cookiebeleid</Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}
