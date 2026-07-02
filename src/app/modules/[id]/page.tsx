import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MODULES, ICONS, MODULE_TAGS, MODULE_PRICE, MODULE_ORDER, MODULE_STATUS, APP_URL, LAUNCHED, VIGNETTES } from '@/data/modules';
import WaitlistForm from '@/components/WaitlistForm';
import FaqAccordion from '@/components/FaqAccordion';

export async function generateStaticParams() {
  return MODULE_ORDER.map(id => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const mod = MODULES[id];
  if (!mod) return {};
  return {
    title: `Emma${mod.name} · ${mod.head}`,
    description: mod.intro,
  };
}

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mod = MODULES[id];
  if (!mod) notFound();

  const others = MODULE_ORDER.filter(k => k !== id);
  const mcStyle = { ['--mc' as string]: `var(--m-${id})` };
  const status = MODULE_STATUS[id];

  return (
    <main className="mpage lightpage" style={mcStyle}>

      {/* Hero */}
      <section className="mhero">
        <div className="mhero__bg"></div>
        <div className="wrap">
          <div className="mhero__inner">
            <div className="mhero__copy">
              <div className="mhero__badge">
                <span className="mhero__icon">
                  <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[id] || '' }}></svg>
                </span>
                <span className="mhero__modname">Emma{mod.name} · {status.live ? 'nu live' : `komt in ${status.when}`}</span>
              </div>
              <h1>{mod.head.replace(/\.$/, '')}<span className="dot">.</span></h1>
              <p className="mhero__lead">{mod.intro}</p>
              <div className="mhero__cta">
                {status.live ? (
                  <>
                    <a href={APP_URL} className="btn btn-mod">Start 14 dagen gratis <span className="arr">→</span></a>
                    <Link href="/#hoe" className="btn btn-ghost">Bekijk hoe het werkt</Link>
                  </>
                ) : (
                  <>
                    <Link href="#melden" className="btn btn-mod">Houd me op de hoogte <span className="arr">→</span></Link>
                    <Link href="/modules/boekt" className="btn btn-ghost">{LAUNCHED ? 'Start alvast met EmmaBoekt' : 'Bekijk de boekhoudmodule'}</Link>
                  </>
                )}
              </div>
              <div className="mhero__price">
                <b>€{mod.price}/mnd</b>
                <span>excl. btw · maandelijks opzegbaar</span>
              </div>
              <div className="mhero__assure">
                <span><span className="d"></span>{status.live ? '14 dagen gratis proberen' : `beschikbaar vanaf ${status.when}`}</span>
                <span><span className="d"></span>{mod.chip}</span>
              </div>
            </div>

            <div className="mhero__visual">
              <div className="mhero__glow"></div>
              <div className="mhero__card">
                <div className="mhero__card-top">
                  <span className="mhero__card-ico">
                    <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[id] || '' }}></svg>
                  </span>
                  <span className="mhero__card-title">Emma{mod.name}</span>
                  <span className="mhero__card-live">impressie</span>
                </div>
                <div
                  className="vig__body"
                  dangerouslySetInnerHTML={{ __html: VIGNETTES[mod.heroVig] || '' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="does">
        <div className="wrap">
          <div className="does__head reveal">
            <div className="eyebrow"><span className="tick"></span> Wat het doet</div>
            <h2>{mod.does.title}</h2>
            <p>{mod.does.sub}</p>
          </div>
          <div className="feats">
            {mod.does.feats.map((feat, i) => (
              <div key={i} className="feat reveal" data-d={String(i + 1)}>
                <span className="feat__tag">{feat.tag}</span>
                <div className="feat__ico">
                  <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[id] || '' }}></svg>
                </div>
                <h3>{feat.h}</h3>
                <p>{feat.p}</p>
                <ul style={{ marginTop: '16px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {feat.list.map((item, j) => (
                    <li key={j} style={{ fontSize: '13.5px', color: 'var(--ink-soft)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: 'var(--mc)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="msteps">
        <div className="wrap">
          <div className="msteps__head reveal">
            <div className="eyebrow"><span className="tick"></span> Hoe het werkt</div>
            <h2>{mod.steps.title}</h2>
          </div>
          <div className="msteps__list">
            {mod.steps.items.map((step, i) => (
              <div key={i} className="mstep">
                <div className="mstep__num">{i + 1}</div>
                <div className="mstep__body">
                  <div className="mstep__tag">{step.n}</div>
                  <div className="mstep__title">{step.h}</div>
                  <p className="mstep__desc">{step.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" style={{ background: 'var(--creme)' }}>
        <div className="wrap">
          <div className="faq__grid">
            <div className="faq__head reveal">
              <div className="eyebrow"><span className="tick"></span> FAQ</div>
              <h2>Veelgestelde vragen</h2>
              <p>Staat je vraag er niet bij? Stuur ons een bericht.</p>
              <a className="mail" href="mailto:hallo@emmastudio.nl">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>
                </svg>
                hallo@emmastudio.nl
              </a>
            </div>
            <FaqAccordion items={mod.faq.map(f => ({ q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mcta" id="melden">
        <div className="mcta__in">
          <div className="mcta__badge reveal">
            <span className="mcta__icon">
              <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[id] || '' }}></svg>
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'color-mix(in oklab, var(--mc) 55%, var(--ink))' }}>
              Emma{mod.name}
            </span>
          </div>
          {status.live ? (
            <>
              <h2 className="reveal">Begin zonder gedoe<span className="dot">.</span></h2>
              <p className="reveal">Maak een account, koppel e-Boekhouden.nl en stuur je eerste bon door. De eerste 14 dagen zijn gratis.</p>
              <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <a className="btn btn-coral btn-lg" href={APP_URL}>Start 14 dagen gratis <span className="arr">→</span></a>
              </div>
            </>
          ) : (
            <>
              <h2 className="reveal">Komt in {status.when}<span className="dot">.</span></h2>
              <p className="reveal">Laat je e-mail achter en je hoort het als eerste zodra Emma{mod.name} live gaat. Tot die tijd kun je alvast starten met EmmaBoekt.</p>
              <WaitlistForm dark={false} note={`Emma${mod.name} · €${mod.price}/mnd · vanaf ${status.when}`} className="mcta__form" />
            </>
          )}
          <div className="mcta__assure">
            <span><span className="d"></span>14 dagen gratis proberen</span>
            <span><span className="d"></span>Maandelijks opzegbaar</span>
            <span><span className="d"></span>Excl. btw</span>
          </div>
        </div>
      </section>

      {/* Cross-module grid */}
      <section className="mcross">
        <div className="wrap">
          <div className="mcross__head reveal">
            <div className="eyebrow"><span className="tick"></span> Meer van Emma</div>
            <h2>Emma doet meer.</h2>
            <p>Combineer modules in een pakket of voeg ze stuk voor stuk toe.</p>
          </div>
          <div className="mcross__grid">
            {others.map(k => (
              <Link
                key={k}
                href={`/modules/${k}`}
                className="xmod"
                style={{ ['--xc' as string]: `var(--m-${k})` }}
              >
                <span className="xmod__ico">
                  <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[k] || '' }}></svg>
                </span>
                <span className="xmod__name">Emma{MODULES[k].name}</span>
                <span className="xmod__desc">{MODULE_TAGS[k]}</span>
                <span className="xmod__price">{MODULE_STATUS[k].live ? 'Nu live · ' : `${MODULE_STATUS[k].when} · `}<b>€{MODULE_PRICE[k]}/mnd</b></span>
                <span className="xmod__link">Bekijk module <span className="arr">→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
