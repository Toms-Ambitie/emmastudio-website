const modules = [
  {
    slug: "boekt",
    name: "EmmaBoekt",
    accent: "var(--m-boekt)",
    desc: "Boekhouden zonder boekhoudsoftware aan te raken. Facturen, bonnen en btw — Emma regelt het.",
    price: "€9",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    slug: "waakt",
    name: "EmmaWaakt",
    accent: "var(--m-waakt)",
    desc: "Continu zicht op hoe je bedrijf ervoor staat. Afwijkingen gesignaleerd voordat ze problemen worden.",
    price: "€9",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    slug: "loont",
    name: "EmmaLoont",
    accent: "var(--m-loont)",
    desc: "Salaris, contracten en verlof zonder gedoe. Van urenregistratie tot loonstrook, geregeld.",
    price: "€19",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9a2.5 2 0 0 0-5 0c0 1.5 2.5 2 2.5 2s2.5.5 2.5 2a2.5 2 0 0 1-5 0" />
        <path d="M12 7v1m0 8v1" />
      </svg>
    ),
  },
  {
    slug: "vindt",
    name: "EmmaVindt",
    accent: "var(--m-vindt)",
    desc: "Kandidaten en klanten ontdekken in je radius. Van vacature tot eerste werkdag, zonder zoekwerk.",
    price: "€9",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    ),
  },
  {
    slug: "coacht",
    name: "EmmaCoacht",
    accent: "var(--m-coacht)",
    desc: "Voortgang van je mensen op één plek. Inzicht in wie groeit, wie vastloopt en waar je kunt helpen.",
    price: "€9",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    slug: "ziet",
    name: "EmmaZiet",
    accent: "var(--m-ziet)",
    desc: "Markt en concurrenten in beeld zonder zoekwerk. Slimme signalen die jij anders zou missen.",
    price: "€9",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    slug: "schrijft",
    name: "EmmaSchrijft",
    accent: "var(--m-schrijft)",
    desc: "Content schrijven en plannen met jouw stem. Van social post tot nieuwsbrief — altijd on-brand.",
    price: "€19",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    slug: "promoot",
    name: "EmmaPromoot",
    accent: "var(--m-promoot)",
    desc: "Advertenties die echt iets opleveren. Emma optimaliseert je budget en rapporteert wat werkt.",
    price: "€19",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

const bundles = [
  {
    sector: "Kapsalons · beauty · nagels",
    name: "Emma voor Salons",
    price: "€59",
    was: "€83",
    save: "Bespaar 29%",
    mods: ["EmmaBoekt", "EmmaWaakt", "EmmaLoont", "EmmaVindt", "EmmaCoacht", "EmmaZiet", "EmmaSchrijft"],
    cta: "Begin met Salons",
    featured: true,
  },
  {
    sector: "Tandartsen · fysio · paramedisch",
    name: "Emma voor Zorg",
    price: "€39",
    was: "€55",
    save: "Bespaar 29%",
    mods: ["EmmaBoekt", "EmmaWaakt", "EmmaLoont", "EmmaVindt", "EmmaCoacht"],
    cta: "Begin met Zorg",
    featured: false,
  },
  {
    sector: "ZZP'ers · alle branches",
    name: "Emma voor ZZP'ers",
    price: "€29",
    was: "€46",
    save: "Bespaar 37%",
    mods: ["EmmaBoekt", "EmmaWaakt", "EmmaVindt", "EmmaSchrijft"],
    cta: "Begin met ZZP'ers",
    featured: false,
  },
];

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="nav-wrap">
        <div className="container">
          <nav className="nav">
            <a href="/">
              <img
                src="/logo-light.svg"
                alt="Emma Studio"
                className="nav-logo"
                width={97}
                height={26}
              />
            </a>
            <div className="nav-links">
              <a href="#modules">Modules</a>
              <a href="#bundles">Bundles</a>
              <a href="#prijzen">Prijzen</a>
              <a href="#case">Resultaten</a>
            </div>
            <div className="nav-right">
              <a href="#demo" className="btn btn-ghost-light">
                Inloggen
              </a>
              <a href="#demo" className="btn btn-cta">
                Demo aanvragen
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-eyebrow">AI-assistent voor horecaondernemers</span>
            <h1>
              Jij doet je werk.
              <br />
              <span className="em">Emma de rest.</span>
            </h1>
            <p className="hero-sub">
              Emma is het complete AI-ecosysteem voor jouw horecabedrijf. 8 slimme modules die reserveringen beheren, personeel regelen, content schrijven en nog veel meer — zodat jij je focust op je gasten.
            </p>
            <div className="hero-actions">
              <a href="#demo" className="btn btn-cta btn-lg">
                Start gratis proefperiode
              </a>
              <a href="#modules" className="btn btn-ghost-light btn-lg">
                Bekijk alle modules
              </a>
            </div>
            <div className="hero-proof">
              <span className="proof-dot" />
              Vertrouwd door 50+ horecaondernemers
              <span className="proof-dot" />
              Gemiddeld 18 uur bespaard per week
              <span className="proof-dot" />
              Geen technische kennis nodig
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats" id="resultaten">
        <div className="container">
          <div className="stats-head">
            <span className="eyebrow">Bewezen resultaat</span>
            <h2>Blondes Incognito spaart 18 uur per week</h2>
            <p>
              Kapperszaak Blondes Incognito in Amsterdam gebruikte Emma om hun volledige backoffice te automatiseren. Het resultaat spreekt voor zich.
            </p>
          </div>
          <div className="stat-grid">
            <div className="stat-cell">
              <div className="stat-num">
                18<span className="sfx"> uur</span>
              </div>
              <div className="stat-label">Bespaard per week op administratie en planning</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">
                34<span className="sfx">%</span>
              </div>
              <div className="stat-label">Omzetgroei in de eerste 6 maanden</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">
                €2.800
              </div>
              <div className="stat-label">Maandelijkse kostenbesparing door automatisering</div>
            </div>
            <div className="stat-cell">
              <div className="stat-num">
                4.8<span className="sfx">★</span>
              </div>
              <div className="stat-label">Gemiddelde beoordeling van medewerkerstevredenheid</div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="modules" id="modules">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Het Emma ecosysteem</span>
            <h2>8 modules. Elk een expert.</h2>
            <p>
              Kies precies wat jouw bedrijf nodig heeft. Modules werken naadloos samen en delen dezelfde data — geen losse tools meer die niet communiceren.
            </p>
          </div>
          <div className="module-grid">
            {modules.map((mod) => (
              <div
                key={mod.slug}
                className="module-card"
                style={{ ["--mod-accent" as string]: mod.accent }}
              >
                <div className="mod-icon">{mod.icon}</div>
                <div className="mod-name">{mod.name}</div>
                <p className="mod-desc">{mod.desc}</p>
                <div className="mod-price">
                  <strong>{mod.price}</strong>
                  &nbsp;/ maand
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="case" id="case">
        <div className="container">
          <div className="case-grid">
            <div>
              <span className="eyebrow">Klantverhaal</span>
              <h2>Hoe Blondes Incognito hun bedrijf transformeerde</h2>
              <p className="case-body">
                Eigenaar Sanne van der Berg runde haar Amsterdamse kapperszaak met drie medewerkers maar verloor wekelijks uren aan planning, facturen en social media. Na de implementatie van Emma kon ze zich eindelijk volledig focussen op haar klanten.
              </p>
              <blockquote className="case-quote">
                "Emma heeft mijn leven letterlijk veranderd. Ik besteed nu mijn tijd aan mijn klanten in plaats van aan spreadsheets. De reserveringen lopen soepel, mijn team is blij, en de omzet is omhoog gegaan zonder dat ik er extra moeite in heb gestoken."
                <cite>Sanne van der Berg — Eigenaar Blondes Incognito, Amsterdam</cite>
              </blockquote>
            </div>
            <div className="case-stats">
              <div className="case-stat">
                <div className="n">
                  18<span className="em">u</span>
                </div>
                <div className="l">Minder administratie per week</div>
              </div>
              <div className="case-stat">
                <div className="n">
                  <span className="em">+</span>34%
                </div>
                <div className="l">Omzetgroei in 6 maanden</div>
              </div>
              <div className="case-stat">
                <div className="n">3 mnd</div>
                <div className="l">Terugverdientijd investering</div>
              </div>
              <div className="case-stat">
                <div className="n">
                  4.8<span className="em">★</span>
                </div>
                <div className="l">Medewerkerstevredenheid</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUNDLES */}
      <section className="bundles" id="bundles">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Slimme combinaties</span>
            <h2>Bundel en bespaar tot 37%</h2>
            <p>
              Emma heeft drie branche-pakketten die modules bundelen met korting. Geen jaar-commitment — maandelijks opzegbaar, 15% extra korting bij jaarbetaling.
            </p>
          </div>
          <div className="bundle-grid">
            {bundles.map((b) => (
              <div key={b.name} className={`bundle-card${b.featured ? " featured" : ""}`}>
                <div className="bundle-head">
                  <div className="bundle-sector">{b.sector}</div>
                  <div className="bundle-name">{b.name}</div>
                  <div className="bundle-price-row">
                    <span className="amt">{b.price}</span>
                    <span className="per">/maand</span>
                    <span className="save-tag">{b.save}</span>
                  </div>
                  <div className="bundle-was">Losse modules: {b.was}/mnd</div>
                </div>
                <div className="bundle-mods">
                  <ul>
                    {b.mods.map((m) => (
                      <li key={m}>
                        <span className="dot" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bundle-foot">
                  <a href="#demo" className={`btn ${b.featured ? "btn-petrol" : "btn-ghost-dark"}`}>
                    {b.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="compleet-banner">
            <div>
              <h3>Emma Compleet — alle 8 modules</h3>
              <p>Het volledige ecosysteem. Elke module, volledig geïntegreerd, één maandelijks bedrag.</p>
            </div>
            <div className="compleet-price">
              <span className="amt">€69</span>
              <span className="per">/maand</span>
            </div>
            <a href="#demo" className="btn btn-cta">
              Alles activeren
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="prijzen">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Transparante prijzen</span>
            <h2>Geen verrassingen, nooit.</h2>
          </div>
          <div className="pricing-grid">
            <div>
              <div className="pricing-col-head">Losse modules</div>
              <div className="pricing-list">
                {modules.map((mod) => (
                  <div key={mod.slug} className="pricing-row">
                    <span className="pname">{mod.name}</span>
                    <span className="pprice">{mod.price}/mnd</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="pricing-col-head">Wat je altijd krijgt</div>
              <ul className="pricing-promises">
                {[
                  "Gratis onboarding en installatie",
                  "Nederlandse klantenservice, bereikbaar op werkdagen",
                  "Alle updates en nieuwe functies inbegrepen",
                  "AVG-compliant en data altijd in Nederland",
                  "Geen lange contracten — maandelijks opzegbaar",
                  "14 dagen gratis proberen, geen creditcard nodig",
                  "Integratie met je bestaande systemen",
                ].map((p) => (
                  <li key={p}>
                    <span className="ck">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-final" id="demo">
        <div className="container">
          <span className="eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>
            Klaar om te starten?
          </span>
          <h2>Laat Emma aan het werk</h2>
          <p>
            Plan een gratis demo en ontdek hoe Emma jouw bedrijf kan transformeren. Geen technische kennis nodig — binnen een dag live.
          </p>
          <form className="cta-form" action="#">
            <input
              type="email"
              placeholder="jouw@emailadres.nl"
              name="email"
              required
              autoComplete="email"
            />
            <button type="submit">Demo aanvragen →</button>
          </form>
          <div className="cta-trust">
            <span><span className="ck">✓</span>14 dagen gratis proberen</span>
            <span><span className="ck">✓</span>Geen creditcard nodig</span>
            <span><span className="ck">✓</span>Binnen 24 uur live</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <img
                src="/logo-light.svg"
                alt="Emma Studio"
                className="foot-logo"
                width={64}
                height={17}
              />
              <p className="foot-tagline">
                Jij doet je werk.<br />Emma de rest.
              </p>
            </div>
            <div className="foot-col">
              <h5>Modules</h5>
              <ul>
                {modules.map((mod) => (
                  <li key={mod.slug}>
                    <a href={`#modules`}>{mod.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="foot-col">
              <h5>Bedrijf</h5>
              <ul>
                <li><a href="#">Over Emma</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Pers</a></li>
                <li><a href="#">Vacatures</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h5>Support</h5>
              <ul>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Documentatie</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2025 Emma Studio B.V.</span>
            <span>Privacybeleid · Algemene voorwaarden · AVG</span>
          </div>
        </div>
      </footer>
    </>
  );
}
