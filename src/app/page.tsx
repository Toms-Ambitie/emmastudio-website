import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import FaqAccordion from '@/components/FaqAccordion';
import WaitlistForm from '@/components/WaitlistForm';
import JourneySection from '@/components/JourneySection';
import CountUp from '@/components/CountUp';
import { ICONS, MODULE_TAGS, MODULE_PRICE, MODULE_ORDER, MODULE_STATUS, APP_URL, LAUNCHED } from '@/data/modules';

export const metadata: Metadata = {
  title: 'Emma · Jij doet je werk. Emma de rest.',
  description: 'Emma is het platform dat de dagelijkse taken van ondernemers makkelijker maakt: boekhouding, personeel, marketing en inzicht. We beginnen bij je boekhouding, bovenop e-Boekhouden.nl. Vanaf €9 per maand.',
  alternates: { canonical: 'https://www.emmastudio.nl' },
};

/* Kleine lijniconen voor mockups en features (1.7px, rounded) */
const I: Record<string, string> = {
  home:  '<path d="M4 11l8-7 8 7v8.4a1.6 1.6 0 0 1-1.6 1.6H14v-6h-4v6H5.6A1.6 1.6 0 0 1 4 19.4Z"/>',
  inbox: '<path d="M22 13h-5.5l-2 3h-5l-2-3H2"/><path d="M5.2 5h13.6L22 13v5.4a1.6 1.6 0 0 1-1.6 1.6H3.6A1.6 1.6 0 0 1 2 18.4V13Z"/>',
  task:  '<rect x="4" y="4" width="16" height="16" rx="3.2"/><path d="m8.6 12.2 2.4 2.4 4.8-4.8"/>',
  file:  '<path d="M6.5 3h7.2L18.5 7.8V21h-12Z"/><path d="M13.5 3v5h5"/>',
  clock: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.4V12l3.1 2"/>',
  users: '<circle cx="9.2" cy="8.4" r="3.3"/><path d="M3.4 19.4a5.8 5.8 0 0 1 11.6 0"/><path d="M16 5.5a3.3 3.3 0 0 1 0 5.9M20.6 19.4a5.8 5.8 0 0 0-3.7-5.2"/>',
  euro:  '<path d="M17.2 5.6a7.4 7.4 0 1 0 0 12.8"/><path d="M4.8 10.4h8M4.8 13.6h8"/>',
  wave:  '<path d="M3 12.5h3.4l2.3-5.6 3.8 10.2 2.3-5.6H21"/>',
  chat:  '<path d="M21 11.6a8.2 8.2 0 0 1-11.9 7.3L3.6 20.4l1.5-5.3A8.2 8.2 0 1 1 21 11.6Z"/>',
  alert: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.8v5M12 16.1v.2"/>',
  trenddown: '<path d="M3 7.5l5.8 5.8 3.8-3.8L20 16.9"/><path d="M14.6 17h6v-6"/>',
  shield:'<path d="M12 3l7 2.8v5.2c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8V5.8Z"/>',
  scan:  '<path d="M4 8.2V5.6A1.6 1.6 0 0 1 5.6 4h2.6M15.8 4h2.6A1.6 1.6 0 0 1 20 5.6v2.6M20 15.8v2.6a1.6 1.6 0 0 1-1.6 1.6h-2.6M8.2 20H5.6A1.6 1.6 0 0 1 4 18.4v-2.6"/><path d="M7.2 12h9.6"/>',
  send:  '<path d="M21 3.5 10.4 14.1"/><path d="M21 3.5 14.2 21l-3.8-6.9L3.5 10.3Z"/>',
  link:  '<path d="M10 14.2a4.2 4.2 0 0 0 6.2.4l2.8-2.8a4.2 4.2 0 0 0-5.9-5.9l-1.3 1.3"/><path d="M14 9.8a4.2 4.2 0 0 0-6.2-.4L5 12.2a4.2 4.2 0 0 0 5.9 5.9l1.3-1.3"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  arrowfile: '<path d="M6.5 3h7.2L18.5 7.8V21h-12Z"/><path d="M13.5 3v5h5"/><path d="M9.5 14.5h5M12.5 12l2.5 2.5-2.5 2.5"/>',
};

function cap(t: string) { return t.charAt(0).toUpperCase() + t.slice(1); }

function Ic({ d, className }: { d: string; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: I[d] || d }} />;
}

const FAQ = [
  { q: 'Wat heb ik nodig om te starten?', a: 'Een account bij e-Boekhouden.nl en een account bij Emma. De koppeling maak je in een paar minuten; je sleutel wordt versleuteld opgeslagen en nooit getoond. Daarna werk je gewoon in Emma en staat alles netjes in je boekhouding.' },
  { q: 'Boekt Emma dingen automatisch in?', a: 'Nee. Emma leest je bonnen en facturen, herkent leverancier, bedrag en BTW en stelt de juiste grootboekrekening voor, met de reden erbij. Jij controleert en bevestigt. Niets verdwijnt vanzelf in je administratie.' },
  { q: 'Vervangt Emma e-Boekhouden.nl of mijn accountant?', a: 'Geen van beide. e-Boekhouden.nl blijft de motor van je boekhouding en je accountant houdt gewoon toegang. Emma is de schil eromheen die het dagelijkse werk sneller en prettiger maakt.' },
  { q: 'Wat kost Emma?', a: 'EmmaBoekt kost €9 per maand, exclusief btw. Je start met 14 dagen gratis en kunt maandelijks opzeggen. Betaal je per jaar, dan krijg je 15% korting. Modules die later komen zet je los aan voor €9 of €19 per maand.' },
  { q: 'Wanneer komen de andere modules?', a: 'Er komt elke maand een module bij, van EmmaWaakt tot EmmaPromoot. De volledige planning staat in de roadmap op deze pagina. Je betaalt alleen voor wat je aanzet, dus je abonnement groeit pas als jij dat wilt.' },
  { q: 'Hoe zit het met privacy en beveiliging?', a: 'Je gegevens staan in de Europese Unie en worden alleen verwerkt om Emma te laten werken. Geen verkoop aan derden, geen tracking. De koppeling met je boekhouding is versleuteld en voldoet aan de AVG.' },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <header className="lph" id="hero">
        <div className="wrap lph__inner">
          <div className="lph__text">
            <span className="lph__badge lph__fade"><span className="pulse"></span> {LAUNCHED ? 'Het platform voor ondernemers · de boekhoudmodule is live' : 'Het platform voor ondernemers · eerste module lanceert in juli'}</span>
            <h1>
              <span className="lw" style={{ animationDelay: '.15s' }}>Jij</span>{' '}
              <span className="lw" style={{ animationDelay: '.26s' }}>doet</span>{' '}
              <span className="lw" style={{ animationDelay: '.37s' }}>je</span>{' '}
              <span className="lw" style={{ animationDelay: '.48s' }}>werk.</span>
              <br />
              <span className="lw" style={{ animationDelay: '.72s' }}>Emma</span>{' '}
              <span className="lw" style={{ animationDelay: '.84s' }}>de</span>{' '}
              <span className="lw" style={{ animationDelay: '.96s' }}>rest</span>
              <span className="lw accent" style={{ animationDelay: '1.14s' }}>.</span>
            </h1>
            <p className="lph__lead lph__fade" style={{ animationDelay: '.55s' }}>
              Boekhouding, personeel, marketing: je doet het er allemaal bij, naast je echte werk.
              Emma is het platform dat die taken makkelijker maakt, met inzicht en concreet advies erbij.
              We beginnen bij je boekhouding, bovenop <b>e-Boekhouden.nl</b>. Daarna komt er elke maand meer.
            </p>
            <div className="lph__cta lph__fade" style={{ animationDelay: '.75s' }}>
              {LAUNCHED ? (
                <a className="btn btn-coral btn-lg" href={APP_URL}>Start 14 dagen gratis <span className="arr">→</span></a>
              ) : (
                <Link className="btn btn-coral btn-lg" href="/#closer">Houd me op de hoogte <span className="arr">→</span></Link>
              )}
              <Link className="btn btn-ghost btn-lg" href="/#inboeken">Bekijk hoe het werkt</Link>
            </div>
            <div className="lph__assure lph__fade" style={{ animationDelay: '.95s' }}>
              <span><span className="d"></span>{LAUNCHED ? 'Daarna €9 per maand' : '14 dagen gratis proberen, daarna €9 per maand'}</span>
              <span><span className="d"></span>Maandelijks opzegbaar</span>
              <span><span className="d"></span>Je accountant houdt toegang</span>
            </div>
          </div>

          {/* App-mockup: het Overzicht-scherm van de Emma-app */}
          <figure className="lph__visual" aria-label="Impressie van de Emma-app: het overzichtsscherm">
            <div className="mock" aria-hidden="true">
              <div className="mock__top">
                <span className="mock__search"><span>Vraag Emma of zoek iets…</span><span className="k">⌘K</span></span>
                <span className="mock__ava">SC</span>
              </div>
              <div className="mock__body">
                <div className="mock__side">
                  <div className="mock__logo"><Image src="/logo-light.svg" alt="" width={62} height={16} /></div>
                  <span className="mock__navi on"><Ic d="home" /> Overzicht</span>
                  <span className="mock__navi"><Ic d="inbox" /> Inbox <span className="b">2</span></span>
                  <span className="mock__navi"><Ic d="task" /> Taken</span>
                  <div className="mock__group">Financiën</div>
                  <span className="mock__navi"><Ic d="file" /> Facturen</span>
                  <span className="mock__navi"><Ic d="send" /> Offertes</span>
                  <span className="mock__navi"><Ic d="clock" /> Openstaand</span>
                  <div className="mock__group">Relaties</div>
                  <span className="mock__navi"><Ic d="users" /> Klanten</span>
                </div>
                <div className="mock__main">
                  <div className="mock__hello">Goedemiddag, Sandra</div>
                  <div className="mock__sub">Dit is je overzicht van vandaag.</div>
                  <div className="mock__kpis">
                    <div className="kpi">
                      <span className="kpi__l"><i style={{ background: 'var(--teal-soft)', color: 'var(--success)' }}><Ic d="euro" /></i> Omzet</span>
                      <div className="kpi__v"><CountUp to={24680} prefix="€ " /></div>
                      <div className="kpi__n up">+12% t.o.v. vorige maand</div>
                    </div>
                    <div className="kpi">
                      <span className="kpi__l"><i style={{ background: 'var(--teal-soft)', color: 'var(--success)' }}><Ic d="wave" /></i> Cashflow</span>
                      <div className="kpi__v"><CountUp to={8430} prefix="€ " /></div>
                      <div className="kpi__n up">Positief</div>
                    </div>
                    <div className="kpi">
                      <span className="kpi__l"><i style={{ background: 'var(--warning-soft)', color: 'var(--warning)' }}><Ic d="file" /></i> Openstaand</span>
                      <div className="kpi__v"><CountUp to={6240} prefix="€ " /></div>
                      <div className="kpi__n warn">3 facturen · 1 te laat</div>
                    </div>
                    <div className="kpi">
                      <span className="kpi__l"><i style={{ background: 'var(--coral-soft)', color: 'var(--coral-deep)' }}><Ic d="task" /></i> Taken</span>
                      <div className="kpi__v"><CountUp to={12} /></div>
                      <div className="kpi__n">6 openstaand vandaag</div>
                    </div>
                  </div>
                  <div className="mock__cols">
                    <div className="mock__card">
                      <div className="mock__card-h"><i><Ic d="chat" /></i> Wat Emma ziet</div>
                      <div className="sig">
                        <span className="sig__i err"><Ic d="alert" /></span>
                        <span className="sig__t"><span className="sev err">Let op</span><b>Eén factuur staat 43 dagen open.</b> Studio Vorm · € 3.450. Deze klant betaalde de vorige twee facturen ook te laat.</span>
                      </div>
                      <div className="sig">
                        <span className="sig__i warn"><Ic d="trenddown" /></span>
                        <span className="sig__t"><span className="sev warn">Aandacht</span><b>Je omzet loopt 8% achter op je maanddoel.</b> Nog 9 dagen te gaan deze maand.</span>
                      </div>
                      <div className="sig">
                        <span className="sig__i ok"><Ic d="check" /></span>
                        <span className="sig__t"><span className="sev ok">Klaar</span><b>Je BTW-overzicht is voorbereid.</b> Alles staat klaar om te controleren.</span>
                      </div>
                    </div>
                    <div className="ask">
                      <div className="ask__h"><i><Ic d="chat" /></i> Vraag Emma</div>
                      <div className="ask__p">Stel een vraag over je cijfers, klanten of facturen. Emma antwoordt met je eigen data.</div>
                      <span className="ask__chip">Wie heeft nog niet betaald? <span className="arr">→</span></span>
                      <span className="ask__chip">Hoe staat mijn cashflow ervoor? <span className="arr">→</span></span>
                      <span className="ask__chip">Maak een factuur voor De Creatieven <span className="arr">→</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </header>

      {/* ── MODULE-TICKER ── */}
      <div className="lpmq" aria-hidden="true">
        <div className="lpmq__track">
          {[0, 1].map(i => (
            <div className="lpmq__seq" key={i}>
              {MODULE_ORDER.map(id => (
                <span key={id}>
                  <i className="dot" style={{ background: `var(--m-${id})` }}></i>
                  <b>Emma{cap(id)}</b> {MODULE_TAGS[id]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── HET PROBLEEM ── */}
      <section className="lpfeat lpfeat--prob" id="probleem">
        <div className="wrap">
          <div className="lpfeat__head reveal">
            <div className="eyebrow"><span className="tick"></span> Het probleem</div>
            <h2>Ondernemen is geweldig.<br />De administratie eromheen niet.</h2>
          </div>
          <div className="lpfeat__grid lpfeat__grid--3">
            {[
              { n: '01', h: 'Boekhouding vreet tijd', p: 'Iedere avond cijfers invullen in plaats van bij je gezin zitten. Emma houdt het bij, bovenop e-Boekhouden.nl.' },
              { n: '02', h: 'Loonadministratie is een ramp', p: 'Contracten, verlof, salaris. Eén fout en de Belastingdienst staat voor je deur. EmmaLoont regelt het straks.' },
              { n: '03', h: 'Klanten vinden kost handen en voeten', p: 'Verspreid over zes losse tools, niemand die overzicht heeft. EmmaVindt en EmmaPromoot doen straks het werk.' },
            ].map((c, i) => (
              <div className="lpf reveal" data-d={String(i + 1)} key={c.n}>
                <span className="lpf__num">{c.n}</span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIM INBOEKEN SHOWCASE ── */}
      <section className="lpshow" id="inboeken">
        <div className="wrap">
          <div className="lpshow__head reveal">
            <div className="eyebrow"><span className="tick"></span> Slim inboeken</div>
            <h2>Emma stelt voor. Jij bevestigt.</h2>
            <p>
              Stuur een bon of inkomende factuur naar Emma. Ze herkent de leverancier, het bedrag en de BTW,
              kiest de grootboekrekening en vertelt je waarom. Twijfelt ze, dan zegt ze dat eerlijk.
            </p>
          </div>
          <div className="lpshow__stage">
            <div className="mockdoc reveal" aria-hidden="true">
              <div className="mockdoc__tag"><span>gamma-bon-3041.jpg</span><span>Foto</span></div>
              <div className="mockdoc__row">
                <div className="mockdoc__name">Gamma</div>
                <div className="mockdoc__meta">FACTUUR<br />INK-3041<br />30-04-2026</div>
              </div>
              <div className="mockdoc__lines">
                <i style={{ width: '82%' }}></i><i style={{ width: '64%' }}></i><i style={{ width: '74%' }}></i><i style={{ width: '52%' }}></i>
              </div>
              <div className="mockdoc__sum">
                <span className="t"><span>Subtotaal</span><span>€ 71,24</span></span>
                <span className="t"><span>BTW 21%</span><span>€ 14,96</span></span>
                <span className="t tot"><span>Totaal</span><span>€ 86,20</span></span>
              </div>
            </div>
            <div className="mockprop reveal" data-d="1" aria-hidden="true">
              <div className="mockprop__head">
                <span className="mockprop__mark">e</span>
                <span className="mockprop__title">Emma&rsquo;s voorstel</span>
                <span className="mockprop__chip">Controleer even</span>
              </div>
              <div className="mockprop__field"><span className="l">Leverancier</span><span className="v">Gamma</span></div>
              <div className="mockprop__field"><span className="l">Factuurdatum</span><span className="v">30-04-2026</span></div>
              <div className="mockprop__field"><span className="l">Bedrag</span><span className="v">€ 86,20<small>€ 71,24 excl. · € 14,96 BTW (21%)</small></span></div>
              <div className="mockprop__gl"><span className="code">4210</span> Kantoorinrichting</div>
              <div className="mockprop__why">Je boekte deze leverancier eerder op deze rekening. Emma onthoudt je keuzes.</div>
              <div className="mockprop__warn">
                <span aria-hidden="true">◆</span>
                <span><b>Emma ziet een mogelijke afwijking.</b> Je vorige twee bonnen van Gamma staan op &lsquo;Onkosten algemeen&rsquo;. <u>Houd &lsquo;Onkosten algemeen&rsquo; aan</u></span>
              </div>
              <div className="mockprop__foot">
                <span className="mockprop__note">Niets wordt automatisch geboekt. Jij bevestigt.</span>
                <span className="mockprop__book">✓ Boeken</span>
                <span className="mockprop__later">Later</span>
              </div>
            </div>
          </div>
          <div className="lpshow__claim reveal">
            <span className="ok"><Ic d="check" /></span>
            Elke boeking staat direct goed in e-Boekhouden.nl. Zonder overtypen.
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="lpfeat" id="functies">
        <div className="wrap">
          <div className="lpfeat__head reveal">
            <div className="eyebrow"><span className="tick"></span> De eerste module · boekhouding</div>
            <h2>We beginnen waar de pijn het grootst is.</h2>
            <p>De boekhoudmodule is de eerste van acht. Eén rustige werkplek voor het werk dat je nu in losse schermen doet.</p>
          </div>
          <div className="lpfeat__grid">
            {[
              { i: 'scan', h: 'Slim inboeken', p: 'Bonnen en inkomende facturen leest Emma zelf. Leverancier, bedrag, BTW en grootboekrekening staan klaar; jij bevestigt.' },
              { i: 'file', h: 'Facturen in jouw stijl', p: 'Maak en verstuur facturen vanuit één scherm. Emma onthoudt je klanten, je tarieven en je opmaak.' },
              { i: 'arrowfile', h: 'Offertes die factuur worden', p: 'Verstuur offertes en zet een geaccepteerde offerte met één klik om naar een factuur.' },
              { i: 'clock', h: 'Openstaand in beeld', p: 'Zie wie nog moet betalen en verstuur een herinnering. Emma weet welke klant vaker te laat is.' },
              { i: 'chat', h: 'Vraag Emma', p: 'Stel een vraag over je cijfers en krijg antwoord uit je eigen boekhouding. Altijd bereikbaar met ⌘K.' },
              { i: 'shield', h: 'Veilig gekoppeld', p: 'Je sleutel wordt versleuteld opgeslagen en nooit getoond. Je data staat in de EU, AVG-conform.' },
            ].map((f, n) => (
              <div className="lpf reveal" data-d={String((n % 3) + 1)} key={f.h}>
                <span className="lpf__i"><Ic d={f.i} /></span>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAPPEN ── */}
      <section className="lpsteps" id="hoe" data-nav-dark>
        <div className="wrap">
          <div className="reveal">
            <div className="eyebrow"><span className="tick"></span> Hoe het werkt</div>
            <h2>Vanavond al minder boekhouden.</h2>
          </div>
          <div className="lpsteps__grid">
            <div className="lpstep reveal" data-d="1">
              <div className="lpstep__n">STAP 01</div>
              <h3>Koppel e-Boekhouden.nl</h3>
              <p>Maak een account en verbind je boekhouding in een paar minuten. Je sleutel wordt versleuteld opgeslagen en nooit getoond.</p>
            </div>
            <div className="lpstep reveal" data-d="2">
              <div className="lpstep__n">STAP 02</div>
              <h3>Stuur je bonnen door</h3>
              <p>Mail of sleep bonnetjes en facturen naar je inbox. Emma leest ze en zet per stuk een voorstel klaar.</p>
            </div>
            <div className="lpstep reveal" data-d="3">
              <div className="lpstep__n">STAP 03</div>
              <h3>Bevestig en klaar</h3>
              <p>Controleer het voorstel en klik op Boeken. Alles staat direct goed in je boekhouding, BTW voorbereid.</p>
            </div>
          </div>
          <div className="lpsteps__cta reveal">
            {LAUNCHED ? (
              <a className="btn btn-creme btn-lg" href={APP_URL}>Start 14 dagen gratis <span className="arr">→</span></a>
            ) : (
              <Link className="btn btn-creme btn-lg" href="/#closer">Houd me op de hoogte <span className="arr">→</span></Link>
            )}
            <span className="note">{LAUNCHED ? 'Klaar in een paar minuten. Maandelijks opzegbaar.' : 'Lancering in juli. Je hoort het als eerste.'}</span>
          </div>
        </div>
      </section>

      {/* ── MODULES-SLIDER ── */}
      <JourneySection />

      {/* ── PROOF ── */}
      <section className="proof" id="proof" data-nav-dark>
        <div className="proof__grid">
          <div className="proof__media">
            <Image src="/ilze.jpg" alt="Ilze Spannenberg, eigenaar Blondes Incognito" fill style={{ objectFit: 'cover' }} />
            <div className="ph" style={{ color: 'rgba(251,244,234,.7)' }}>Ilze Spannenberg · Blondes Incognito, Heeten</div>
          </div>
          <div className="proof__body">
            <div className="eyebrow proof__eyebrow"><span className="tick"></span> Bewijs uit de praktijk</div>
            <blockquote className="proof__quote">
              &ldquo;Ik wil gewoon lekker kunnen knippen. Met Emma zie ik hoe het gaat met mijn salon en mijn team,
              zonder elke avond in een <span className="hl">spreadsheet</span>{' '}te duiken.&rdquo;
            </blockquote>
            <div className="proof__who">
              <div className="av">
                <Image src="/ilze.jpg" alt="Ilze" width={46} height={46} />
              </div>
              <div>
                <b>Ilze Spannenberg</b>
                <span>Eigenaar · Blondes Incognito, Heeten</span>
              </div>
            </div>
            <div className="proof__stats">
              <div className="proof__stat"><b>18 mnd</b><span>dagelijks in productie</span></div>
              <div className="proof__stat"><b>7 / 8</b><span>modules bewezen in de praktijk</span></div>
              <div className="proof__stat"><b>1 salon</b><span>ons startpunt, nu voor iedereen</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERGELIJK ── */}
      <section className="lpfeat" id="vergelijk" style={{ background: 'var(--creme-2)' }}>
        <div className="wrap">
          <div className="lpfeat__head reveal">
            <div className="eyebrow"><span className="tick"></span> Vergelijking</div>
            <h2>Emma vs. losse tools vs. bureau</h2>
          </div>
          <div className="cmp reveal" data-d="1">
            <table>
              <thead>
                <tr>
                  <th className="cmp__q">Wat heb je nodig?</th>
                  <th className="cmp__emma"><b>Emma</b><span>vanaf €9/mnd</span></th>
                  <th><b>Losse tools</b><span>€60–300+/mnd</span></th>
                  <th><b>Bureau</b><span>€200–2.000+/mnd</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Boekhouding', 'Losse app €9–15/mnd', 'Inbegrepen, maar traag'],
                  ['Loonadministratie', 'Loonbureau €100–300/mnd', 'Meerprijs'],
                  ['Marketing & ads', 'Marketingbureau €500–2.000/mnd', 'Niet inbegrepen'],
                  ['Klanten vinden', 'Extra tool nodig', 'Niet inbegrepen'],
                  ['Slimme assistent', '–', '–'],
                  ['Alles onder één dak', '–', '–'],
                ].map(([label, tools, bureau]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="cmp__emma"><span className="cmp__ok"><Ic d="check" /></span></td>
                    <td>{tools}</td>
                    <td>{bureau}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="cmp__foot reveal">Gebaseerd op marktprijzen 2026. Emma Compleet (€69/mnd) bevat straks alles. De boekhoudmodule is er vanaf juli; de rest volgt maandelijks.</p>
        </div>
      </section>

      {/* ── PRIJS ── */}
      <section className="lprice" id="prijs">
        <div className="wrap lprice__grid">
          <div className="lprice__copy reveal">
            <div className="eyebrow"><span className="tick"></span> Prijs</div>
            <h2>Eén module, één eerlijke prijs.</h2>
            <p>
              Je start met EmmaBoekt en betaalt alleen daarvoor. Komt er een module bij die je wilt gebruiken,
              dan zet je die los aan. Geen pakket verplicht, geen verrassingen achteraf.
            </p>
            <div className="lprice__facts">
              <span><span className="ok"><Ic d="check" /></span>Nieuwe modules zet je los aan: €9 of €19 per maand</span>
              <span><span className="ok"><Ic d="check" /></span>De instapprijs is de prijs. Geen verhogingen achteraf</span>
              <span><span className="ok"><Ic d="check" /></span>15% korting als je per jaar betaalt</span>
              <span><span className="ok"><Ic d="check" /></span>Zodra alle acht modules live zijn: Emma Compleet voor €69 per maand</span>
            </div>
          </div>
          <div className="pcard reveal" data-d="1">
            <span className="pcard__flag">{LAUNCHED ? 'Eerste module · nu live' : 'Eerste module · lanceert in juli'}</span>
            <div className="pcard__mod">
              <span className="pcard__ico"><svg viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }} dangerouslySetInnerHTML={{ __html: ICONS.boekt }} /></span>
              <div>
                <div className="pcard__name"><span className="e">Emma</span>Boekt</div>
                <div className="pcard__tag">Voor e-Boekhouden.nl</div>
              </div>
            </div>
            <div className="pcard__price"><b>€9</b><span>per maand · excl. btw</span></div>
            <div className="pcard__trial">Eerst 14 dagen gratis proberen</div>
            <ul className="pcard__list">
              <li><span className="ok"><Ic d="check" /></span>Slim inboeken van bonnen en facturen</li>
              <li><span className="ok"><Ic d="check" /></span>Facturen en offertes maken en versturen</li>
              <li><span className="ok"><Ic d="check" /></span>Openstaande posten en herinneringen</li>
              <li><span className="ok"><Ic d="check" /></span>Vraag Emma: antwoorden uit je eigen cijfers</li>
              <li><span className="ok"><Ic d="check" /></span>Koppeling met e-Boekhouden.nl inbegrepen</li>
            </ul>
            {LAUNCHED ? (
              <a className="btn btn-coral" href={APP_URL}>Start 14 dagen gratis <span className="arr">→</span></a>
            ) : (
              <Link className="btn btn-coral" href="/#closer">Houd me op de hoogte <span className="arr">→</span></Link>
            )}
            <div className="pcard__foot">Maandelijks opzegbaar · 15% korting bij jaarbetaling</div>
          </div>
        </div>
      </section>

      {/* ── PAKKETTEN ── */}
      <section className="lpfeat" id="pakketten">
        <div className="wrap">
          <div className="lpfeat__head reveal">
            <div className="eyebrow"><span className="tick"></span> Pakketten · voorjaar 2027</div>
            <h2>Straks kies je een pakket.</h2>
            <p>Zodra alle modules live zijn, bundelen we ze per branche met flinke korting. Wie eerder instapt, houdt de instapprijs.</p>
          </div>
          <div className="pk__grid">
            {[
              { name: 'Emma voor ZZP', sub: 'Voor de zelfstandige zonder personeel.', price: 29, mods: ['EmmaBoekt', 'EmmaWaakt', 'EmmaVindt', 'EmmaSchrijft'], n: 4, feat: false },
              { name: 'Emma voor Salons', sub: 'Voor kapsalons, schoonheidssalons en kappers.', price: 59, mods: ['Alles uit ZZP', 'EmmaLoont', 'EmmaCoacht', 'EmmaZiet'], n: 7, feat: true },
              { name: 'Emma voor Zorg', sub: 'Voor zorgondernemers en praktijken.', price: 39, mods: ['EmmaBoekt', 'EmmaWaakt', 'EmmaLoont', 'EmmaVindt', 'EmmaCoacht'], n: 5, feat: false },
              { name: 'Emma Compleet', sub: 'Alle acht modules. Het complete platform.', price: 69, mods: ['Alles uit Salons', 'EmmaPromoot'], n: 8, feat: false },
            ].map(pk => (
              <div key={pk.name} className={`pk${pk.feat ? ' pk--feat' : ''} reveal`}>
                {pk.feat && <span className="pk__flag">Aanrader</span>}
                <div className="pk__name">{pk.name}</div>
                <div className="pk__sub">{pk.sub}</div>
                <div className="pk__price"><b>€{pk.price}</b><span>/mnd</span></div>
                <div className="pk__n">{pk.n} modules</div>
                <ul className="pk__list">
                  {pk.mods.map(m => <li key={m}><span className="pk__ok"><Ic d="check" /></span>{m}</li>)}
                </ul>
                <Link className={`btn ${pk.feat ? 'btn-coral' : 'btn-ghost'}`} href="/#closer">Hoor het als eerste</Link>
              </div>
            ))}
          </div>
          <p className="cmp__foot reveal">Tot die tijd is elke module los te gebruiken: standaard €9/mnd, premium €19/mnd, excl. btw en maandelijks opzegbaar.</p>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section className="lproad" id="roadmap">
        <div className="wrap">
          <div className="lproad__head reveal">
            <div className="eyebrow"><span className="tick"></span> Roadmap</div>
            <h2>Elke maand wordt Emma groter.</h2>
            <p>
              EmmaBoekt is de eerste van acht modules. De rest volgt maand na maand, en jij bepaalt zelf
              wat je aanzet. Start je nu, dan groeit Emma vanzelf met je mee.
            </p>
          </div>
          <div className="lproad__list">
            {MODULE_ORDER.map((id, n) => {
              const st = MODULE_STATUS[id];
              const name = id.charAt(0).toUpperCase() + id.slice(1);
              return (
                <Link href={`/modules/${id}`} className={`rm reveal${st.live ? ' rm--live' : ''}`} data-d={String((n % 2) + 1)} key={id} style={{ ['--rc' as string]: `var(--m-${id})` }}>
                  <span className="rm__ico"><svg viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }} dangerouslySetInnerHTML={{ __html: ICONS[id] }} /></span>
                  <span>
                    <span className="rm__name"><span className="e">Emma</span>{name}</span>
                    <span className="rm__desc" style={{ display: 'block' }}>{MODULE_TAGS[id]} · €{MODULE_PRICE[id]}/mnd</span>
                  </span>
                  <span className="rm__when">{st.live ? 'Nu live' : st.when}</span>
                </Link>
              );
            })}
          </div>
          <p className="lproad__foot reveal">
            <b>Daarna volgen de pakketten</b>, zoals Emma voor Salons en Emma voor ZZP&rsquo;ers: meerdere modules
            in één bundel met korting, vanaf voorjaar 2027. Wie eerder instapt, houdt de instapprijs.
          </p>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="security" data-nav-dark>
        <div className="wrap security__grid">
          <div className="security__intro reveal">
            <div className="eyebrow"><span className="tick"></span> Veiligheid &amp; privacy</div>
            <h2>Je gegevens zijn van jou.</h2>
            <p>Emma verwerkt gevoelige bedrijfsdata. Dat doen we met respect: opgeslagen in de EU, minimale rechten, transparante aanpak.</p>
            <Link className="btn btn-creme" href="/contact">Stel een vraag <span className="arr">→</span></Link>
          </div>
          <div className="seclist reveal" data-d="1">
            {[
              { i: 'shield', h: 'Jouw data, jouw eigendom', t: 'Je gegevens worden alleen verwerkt om de modules te laten werken. Geen verkoop, geen tracking, AVG-conform.' },
              { i: 'link', h: 'Versleuteld gekoppeld', t: 'Koppel je Emma aan een externe dienst, dan wordt je sleutel versleuteld opgeslagen en nooit getoond.' },
              { i: 'check', h: 'Opgeslagen in de EU', t: 'Je bedrijfsdata staat binnen de Europese Unie, op servers in Frankfurt. Onze website en e-mailverzending lopen via Amerikaanse dienstverleners onder Europese standaardcontractbepalingen. Meer daarover lees je in ons privacybeleid.' },
            ].map(b => (
              <div key={b.h} className="secrow">
                <span className="secrow__i"><Ic d={b.i} /></span>
                <div><b>{b.h}</b><span>{b.t}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSER ── */}
      <section className="closer" id="closer">
        <div className="closer__in">
          <div className="eyebrow" style={{ justifyContent: 'center' }}><span className="tick"></span> {LAUNCHED ? 'Klaar om te beginnen' : 'Lancering in juli'}</div>
          <h2 className="reveal">Vanavond geen boekhouding<span className="dot">.</span></h2>
          {LAUNCHED ? (
            <>
              <p className="reveal" data-d="1">Koppel e-Boekhouden.nl, stuur je eerste bon door en merk het verschil. De eerste 14 dagen zijn gratis.</p>
              <div className="reveal" data-d="2" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <a className="btn btn-coral btn-lg" href={APP_URL}>Start 14 dagen gratis <span className="arr">→</span></a>
                <Link className="btn btn-ghost btn-lg" href="/#prijs">Bekijk de prijs</Link>
              </div>
            </>
          ) : (
            <>
              <p className="reveal" data-d="1">De boekhoudmodule lanceert in juli. Laat je e-mail achter en je hoort het op de dag dat je kunt starten, met 14 dagen gratis proberen.</p>
              <div className="reveal" data-d="2" style={{ display: 'flex', justifyContent: 'center' }}>
                <WaitlistForm note="Geen spam. Alleen het lanceerbericht." noteLabel="Jij doet je werk. Emma de rest." />
              </div>
            </>
          )}
          <div className="closer__assure reveal" data-d="3">
            <span><span className="d"></span>Maandelijks opzegbaar</span>
            <span><span className="d"></span>€9 per maand na je proefperiode</span>
            <span><span className="d"></span>Eerlijk over wat er is en wat nog komt</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq faq--wide" id="faq">
        <div className="wrap faq__grid">
          <div className="faq__head">
            <div className="eyebrow reveal"><span className="tick"></span> Veelgestelde vragen</div>
            <h2 className="reveal" data-d="1">Over Emma.</h2>
            <p className="reveal" data-d="2">Staat je vraag er niet bij?</p>
            <a className="mail reveal" data-d="3" href="mailto:hallo@emmastudio.nl">hallo@emmastudio.nl →</a>
          </div>
          <FaqAccordion items={FAQ} />
        </div>
      </section>
    </>
  );
}
