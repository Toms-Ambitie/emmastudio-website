import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroOrbit from '@/components/HeroOrbit';
import WaitlistForm from '@/components/WaitlistForm';
import JourneySection from '@/components/JourneySection';
import FaqAccordion from '@/components/FaqAccordion';
import Quiz from '@/components/Quiz';
import HeroAnimTrigger from '@/components/HeroAnimTrigger';
import HeroVideo from '@/components/HeroVideo';
import { MODULE_ORDER } from '@/data/modules';

export const metadata: Metadata = {
  title: 'Emma · Jij doet je werk. Emma de rest.',
  alternates: { canonical: 'https://www.emmastudio.nl' },
};

const FAQ = [
  { q:'Kan ik Emma nu al gebruiken?', a:'Nog niet. We bouwen Emma op dit moment als platform. De functies zijn 18 maanden bewezen in de praktijk bij salon Blondes Incognito. Laat je e-mail achter op de wachtlijst en je bent als eerste aan de beurt.' },
  { q:'Wat is het verschil tussen de modules?', a:'Elke module pakt één taak over: EmmaBoekt de boekhouding, EmmaWaakt de financiële sturing, EmmaLoont de salarisadministratie, enzovoort. Je start met wat je nu nodig hebt en zet de rest aan wanneer het past.' },
  { q:'Vervangt Emma mijn accountant?', a:'Nee. Emma neemt het voorbereidende werk over zodat je minder accountantsuren nodig hebt. Je accountant blijft eindverantwoordelijk en houdt gewoon toegang tot je cijfers.' },
  { q:'Hoe zit het met privacy en beveiliging?', a:'Emma verwerkt je gegevens alleen om de modules te laten werken. We verkopen niets aan derden, bewaren gegevens in de EU en voldoen aan de AVG. De volledige aanpak staat beschreven in het beveiligingsdocument.' },
  { q:'Wat kost Emma?', a:'Modules zijn los verkrijgbaar vanaf €9/mnd. De branchepakketten geven een korting van 29–37% ten opzichte van losse aanschaf. De prijzen op de site zijn de beoogde lanceringsprijzen, exclusief btw.' },
  { q:'Wanneer is Emma beschikbaar?', a:'We communiceren de lanceringsdatum via de wachtlijst. Schrijf je in en je hoort het als eerste, plus af en toe een eerlijk bericht over hoe het bouwen vordert.' },
];

const MODULE_DOTS: Record<string, string> = {
  boekt:'--m-boekt', waakt:'--m-waakt', loont:'--m-loont', vindt:'--m-vindt',
  coacht:'--m-coacht', ziet:'--m-ziet', schrijft:'--m-schrijft', promoot:'--m-promoot',
};

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <header className="hero" id="hero">
        <HeroVideo />
        <div className="hero__scrim"></div>
        <div className="wrap hero__inner">
          <div className="hero__text">
            <div className="hero__eyebrow eyebrow fade-soft" style={{ animationDelay: '.1s' }}>
              <span className="tick"></span> Al 18 maanden bewezen in de praktijk
            </div>
            <h1 className="payoff">
              <span className="ln l1">
                <span className="w" style={{ animationDelay: '.30s' }}>Jij</span>{' '}
                <span className="w" style={{ animationDelay: '.48s' }}>doet</span>{' '}
                <span className="w" style={{ animationDelay: '.64s' }}>je</span>{' '}
                <span className="w" style={{ animationDelay: '.80s' }}>werk.</span>
              </span>
              <span className="ln l2">
                <span className="w" style={{ animationDelay: '1.25s' }}>Emma</span>{' '}
                <span className="w" style={{ animationDelay: '1.45s' }}>de</span>{' '}
                <span className="w" style={{ animationDelay: '1.63s' }}>rest</span>
                <span className="dot" style={{ animationDelay: '1.92s' }}>.</span>
              </span>
            </h1>
            <WaitlistForm
              note="Geen verplichtingen. Geen creditcard."
              noteLabel="Emma komt eraan."
            />
            <div className="hero__assure fade-soft" style={{ animationDelay: '2.6s' }}>
              <span><span className="d"></span>Al 18 maanden bewezen in de praktijk</span>
              <span><span className="d"></span>Geen losse software</span>
              <span><span className="d"></span>Maandelijks opzegbaar</span>
            </div>
          </div>
          <div className="hero__visual">
            <HeroOrbit />
          </div>
        </div>
        <div className="scrollcue">
          Ontdek Emma<div className="bar"></div>
        </div>
        <HeroAnimTrigger />
      </header>

      {/* ── STATEMENT ── */}
      <section className="statement">
        <div className="wrap statement__grid reveal">
          <p className="lead">
            Ondernemen is <span className="em">geweldig</span>.<br />
            De administratie eromheen niet.
          </p>
          <div className="statement__side">
            <div className="statement__pt">
              <b>Eén rustig ecosysteem</b>
              <span>Emma bundelt boekhouding, HR, content en marktinzicht in één overzicht. Geen losse tools meer.</span>
            </div>
            <div className="statement__pt">
              <b>Bewezen in de praktijk</b>
              <span>Achttien maanden dagelijks gebruikt bij salon Blondes Incognito. Nu beschikbaar voor iedereen.</span>
            </div>
            <div className="statement__pt">
              <b>Jij blijft aan het roer</b>
              <span>Emma neemt het routinewerk over. Jij houdt overzicht en beslist zelf wat je ermee doet.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <JourneySection />

      {/* ── BRIDGE ── */}
      <section className="bridge">
        <div className="wrap reveal">
          <p>
            Alles wat je dagelijks kost, maar je<br />
            <span className="big">niets oplevert</span>, doet Emma voortaan.
          </p>
          <p className="sub">Administratie, personeelsbeheer, content, marktonderzoek. Overgenomen, geautomatiseerd, of slim samengevat. Zodat jij je tijd stopt in het werk dat ertoe doet.</p>
        </div>
      </section>

      {/* ── PROOF ── */}
      <section className="proof" id="proof" data-nav-dark>
        <div className="proof__grid">
          <div className="proof__media">
            <Image src="/ilze.jpg" alt="Ilze Spannenberg, eigenaar Blondes Incognito" fill style={{ objectFit:'cover' }} />
            <div className="ph" style={{ color: 'rgba(251,244,234,.7)' }}>Ilze Spannenberg · Blondes Incognito, Amsterdam</div>
          </div>
          <div className="proof__body">
            <div className="eyebrow proof__eyebrow"><span className="tick"></span> Bewijs uit de praktijk</div>
            <blockquote className="proof__quote">
              &ldquo;Ik wil gewoon lekker kunnen knippen. Met Emma zie ik hoe het gaat met mijn salon en mijn team,
              zonder elke avond in een <span className="hl">spreadsheet</span> te duiken.&rdquo;
            </blockquote>
            <div className="proof__who">
              <div className="av">
                <Image src="/ilze.jpg" alt="Ilze" width={46} height={46} />
              </div>
              <div>
                <b>Ilze Spannenberg</b>
                <span>Eigenaar · Blondes Incognito, Amsterdam</span>
              </div>
            </div>
            <div className="proof__stats">
              <div className="proof__stat"><b>18 mnd</b><span>dagelijks in productie</span></div>
              <div className="proof__stat"><b>7 / 8</b><span>modules bewezen in de praktijk</span></div>
              <div className="proof__stat"><b>1 salon</b><span>ons startpunt, nu breder</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARE ── */}
      <section className="compare" id="compare">
        <div className="wrap">
          <div className="compare__head reveal">
            <div className="eyebrow"><span className="tick"></span> Vergelijk</div>
            <h2>Emma vs. losse tools vs. bureau</h2>
            <p>Waarom één ecosysteem rustiger en goedkoper is dan een stapel losse abonnementen.</p>
          </div>
        </div>
        <div className="compare__wrap" style={{ maxWidth: 'var(--maxw)', marginInline: 'auto' }}>
          <table className="ctable">
            <thead>
              <tr>
                <th>Wat je nodig hebt</th>
                <th className="c-emma">Emma<small>alles in één</small></th>
                <th>Losse tools</th>
                <th>Bureau / boekhouder</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Boekhouding & BTW', 'EmmaBoekt · €9/mnd', '€25–60/mnd', '€100–250/mnd'],
                ['Financieel inzicht', 'EmmaWaakt · €9/mnd', '€30–80/mnd', 'Meegenomen in uurtarief'],
                ['Salarisadministratie', 'EmmaLoont · €19/mnd', '€20–50/mnd', '€50–100/mnd'],
                ['Content plannen', 'EmmaSchrijft · €19/mnd', '€15–40/mnd', '€200–600/mnd'],
                ['Één login', '✓', '✗ Vijf logins', '✗ Losse portalen'],
                ['Alles samenwerkt', '✓', '✗ Handmatig koppelen', '✗ Wachten op export'],
              ].map(([label, emma, tools, bureau], i) => (
                <tr key={i}>
                  <th scope="row">{label}</th>
                  <td className="c-emma">{emma.startsWith('✓') ? <span className="cyes"><svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"/></svg>{emma.slice(1).trim()}</span> : emma}</td>
                  <td className={tools.startsWith('✗') ? 'cno' : ''}>{tools}</td>
                  <td className={bureau.startsWith('✗') ? 'cno' : ''}>{bureau}</td>
                </tr>
              ))}
              <tr className="row-total">
                <th scope="row">Totaal per maand</th>
                <td className="c-emma">vanaf €29/mnd</td>
                <td>€90–230/mnd</td>
                <td>€350–950/mnd</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="compare__foot wrap">* Prijzen zijn indicatief en gebaseerd op gangbare abonnementen en uurtarieven in 2025.</div>
      </section>

      {/* ── QUIZ ── */}
      <Quiz />

      {/* ── PACKAGES ── */}
      <section className="packs" id="packs">
        <div className="wrap">
          <div className="packs__head reveal">
            <div className="eyebrow"><span className="tick"></span> Prijzen</div>
            <h2>Kies het pakket dat past.</h2>
            <p>Begin met wat je nu nodig hebt. Zet modules bij wanneer je eraan toe bent. Geen lock-in.</p>
          </div>
          <div className="packs__grid">
            {[
              { name:"ZZP'ers", badge:'Solowerk', price:29, sub:'Boekhouding, inzicht, leads en content voor de eenpitter.', mods:['boekt','waakt','vindt','schrijft'], feat:false },
              { name:'Salons', badge:'Aanrader', price:59, sub:'Zeven modules voor het salon of de studio met een team.', mods:['boekt','waakt','loont','vindt','coacht','ziet','schrijft'], feat:true },
              { name:'Zorg', badge:'Compliance', price:39, sub:'Vijf modules voor de zorgpraktijk, CAO-engine ingebouwd.', mods:['boekt','waakt','loont','vindt','coacht'], feat:false },
              { name:'Compleet', badge:'Alles', price:69, sub:'Alle acht modules in één pakket, maximale korting.', mods:MODULE_ORDER, feat:false },
            ].map(pack => (
              <div key={pack.name} className={`pack${pack.feat ? ' feat' : ''}`}>
                <div className="pack__top">
                  <div className="pack__name">Emma voor {pack.name}</div>
                  <div className="pack__badge">{pack.badge}</div>
                </div>
                <div className="pack__dots">
                  {pack.mods.map(m => <i key={m} style={{ ['--d' as string]: `var(${MODULE_DOTS[m]})` }}></i>)}
                </div>
                <div className="pack__price"><b>€{pack.price}</b><span>/mnd</span></div>
                <div className="pack__sub">{pack.sub}</div>
                <Link className={`btn ${pack.feat ? 'btn-creme' : 'btn-coral'}`} href="/#closer">
                  Zet me op de wachtlijst <span className="arr">→</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="packs__foot">
            <b>Los verkrijgbaar:</b> elke module ook individueel te activeren. <b>boekt, waakt, vindt, coacht, ziet</b> €9/mnd · <b>loont, schrijft, promoot</b> €19/mnd · exclusief btw · maandelijks opzegbaar
          </div>
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section className="security" data-nav-dark>
        <div className="wrap security__grid">
          <div className="security__intro reveal">
            <div className="eyebrow"><span className="tick"></span> Veiligheid &amp; privacy</div>
            <h2>Je gegevens zijn van jou.</h2>
            <p>Emma verwerkt gevoelige bedrijfsdata. Dat doen we met respect: opgeslagen in de EU, minimale rechten, transparante aanpak.</p>
            <Link className="btn btn-creme" href="/over#security">Lees het beveiligingsdocument <span className="arr">→</span></Link>
          </div>
          <div className="security__badges reveal" data-d="1">
            {[
              { tag:'Opslag', h:'Data in de EU', t:'Je gegevens verlaten nooit de Europese Unie. We werken met servers in Amsterdam en Frankfurt.' },
              { tag:'Toegang', h:'Minimale rechten', t:'Emma vraagt alleen de rechten die nodig zijn. Geen toegang tot wat we niet gebruiken.' },
              { tag:'Privacy', h:'AVG-conform', t:'Je gegevens worden alleen verwerkt om de modules te laten werken. Geen verkoop, geen tracking.' },
              { tag:'Transparantie', h:'Open over hoe we bouwen', t:'We communiceren eerlijk over wat er in productie is en wat nog in ontwikkeling. Geen marketingbeloftes.' },
            ].map(b => (
              <div key={b.h} className="secbadge">
                <div className="secbadge__tag">{b.tag}</div>
                <b>{b.h}</b>
                <span>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSER / WAITLIST ── */}
      <section className="closer" id="closer">
        <div className="closer__in">
          <div className="eyebrow" style={{ justifyContent:'center' }}><span className="tick"></span> Wachtlijst</div>
          <h2 className="reveal">Wees erbij als Emma live gaat<span className="dot">.</span></h2>
          <p className="reveal" data-d="1">We bouwen nu het platform. Laat je e-mail achter en je bent als eerste aan de beurt. Geen verplichtingen, geen creditcard.</p>
          <div className="reveal" data-d="2" style={{ display:'flex', justifyContent:'center' }}>
            <WaitlistForm note="Geen verplichtingen. Geen creditcard." noteLabel="Jij doet je werk. Emma de rest." />
          </div>
          <div className="closer__assure reveal" data-d="3">
            <span><span className="d"></span>Maandelijks opzegbaar</span>
            <span><span className="d"></span>14 dagen gratis proberen</span>
            <span><span className="d"></span>Eerlijk over wat er is en wat nog komt</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq" id="faq">
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
