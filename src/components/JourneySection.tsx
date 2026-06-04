'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ICONS } from '@/data/modules';

const SCENES = [
  { id:'boekt', n:'01', name:'Boekt', price:9, tag:'al 18 mnd in productie',
    head:'Boekhouding die zichzelf bijhoudt.',
    desc:'Een rustige schil rond je boekhouding. Emma leest binnenkomende facturen vanzelf in, jij hoeft niet meer in losse systemen te werken.',
    bullets:['Facturen & offertes in een paar klikken','Inkomende facturen automatisch ingelezen','BTW-aangifte voorbereid, klaar om te sturen'] },
  { id:'waakt', n:'02', name:'Waakt', price:9, tag:'stuur op je cijfers',
    head:'Het financiële brein van je zaak.',
    desc:'Doelen, prognoses en een wekelijks advies op je échte cijfers. Emma kijkt mee en zegt het op tijd als iets afwijkt.',
    bullets:['Doelen op bedrijfs- en teamniveau','Prognoses op werkelijke data','Elke week drie concrete acties'] },
  { id:'loont', n:'03', name:'Loont', price:19, tag:'met CAO-engine',
    head:'Loon en contracten, zonder gedoe.',
    desc:'De volledige HR-administratie. Loonstroken, contracten met digitale ondertekening, verlof en verzuim, met de CAO van jouw branche ingebouwd.',
    bullets:['Salaris met CAO-engine','Contracten digitaal getekend','Verlof & verzuim automatisch bijgehouden'] },
  { id:'ziet', n:'04', name:'Ziet', price:9, tag:'markt & concurrenten',
    head:'Zie waar je staat in de markt.',
    desc:'Markt-intelligentie die meedenkt. Prijsvergelijking in de buurt, concurrenten in beeld en reviews samengevat tot wat ertoe doet.',
    bullets:['Prijsvergelijking per dienst in de buurt','Concurrenten automatisch in kaart','Reviews samengevat tot thema\'s'] },
  { id:'schrijft', n:'05', name:'Schrijft', price:19, tag:'in jouw stem',
    head:'Teksten die klinken als jij.',
    desc:'Blogs, social, e-mail en SEO vanuit één planner. Emma leert de stem van je bedrijf en jij houdt de eindredactie.',
    bullets:['Eén planner voor alle kanalen','Leert jouw schrijfstijl','Van concept tot gepland in minuten'] },
  { id:'promoot', n:'06', name:'Promoot', price:19, tag:'advertenties met inzicht',
    head:'Zie welke euro écht omzet oplevert.',
    desc:'Google en Meta Ads in één overzicht, gekoppeld aan je cijfers. Geen blind budget meer, je ziet wat werkt.',
    bullets:['Google & Meta in één overzicht','Attributie tot op de dienst','Advies voor je budget'] },
];

const PAIR = [
  { id:'vindt', name:'Vindt', price:9, line:'Ontdek klanten en kandidaten in de buurt, met automatische scoring en een nette pipeline.' },
  { id:'coacht', name:'Coacht', price:9, line:'Scorecards, check-ins en slimme coachvragen, zodat je team blijft groeien.' },
];

const VIGNETTES: Record<string, string> = {
  boekt:`<div class="vig__row vig__row--head"><span class="vig__dot"></span> Facturen</div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Factuur · concept</span><b class="vig__pill">klaar</b></div>
    <div class="vig__li"><span class="vig__tick">✓</span><span>Offerte verstuurd</span><b class="vig__pill">verzonden</b></div>
    <div class="vig__li vig__li--soft"><span class="vig__scan"></span><span>Inkomende factuur</span><b class="vig__pill vig__pill--w">inlezen…</b></div>
    <div class="vig__bar"><span>BTW-aangifte · voorbereid</span><i></i></div>`,
  waakt:`<div class="vig__row vig__row--head"><span class="vig__dot"></span> Omzet vs. doel</div>
    <div class="vig__chart"><i style="height:42%"></i><i style="height:58%"></i><i style="height:49%"></i><i style="height:70%"></i><i style="height:63%"></i><i style="height:82%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Productverkoop loopt iets achter. <b>3 acties</b> voor deze week</div>`,
  loont:`<div class="vig__row vig__row--head"><span class="vig__dot"></span> Loonstrook</div>
    <div class="vig__pay"><span>Brutoloon</span><i></i></div>
    <div class="vig__pay"><span>Werkgeverslasten</span><i style="width:54%"></i></div>
    <div class="vig__pay"><span>Vakantiegeld · pro rata</span><i style="width:30%"></i></div>
    <div class="vig__li" style="margin-top:14px"><span class="vig__tick">✓</span><span>Contract</span><b class="vig__pill">getekend</b></div>`,
  ziet:`<div class="vig__row vig__row--head"><span class="vig__dot"></span> Jouw positie</div>
    <div class="vig__scale"><span class="vig__band"></span><span class="vig__me" style="left:72%">jij</span><span class="vig__avg" style="left:50%"></span></div>
    <div class="vig__legend"><span><i class="vig__lg vig__lg--me"></i> jouw reviewscore</span><span><i class="vig__lg"></i> marktgemiddelde</span></div>
    <div class="vig__li" style="margin-top:6px"><span class="vig__tick">✓</span><span>2 concurrenten in de buurt</span></div>`,
  schrijft:`<div class="vig__kan">
    <div class="vig__col"><span class="vig__colh">Idee</span><i></i><i style="width:70%"></i></div>
    <div class="vig__col"><span class="vig__colh">Concept</span><i style="background:var(--sc);opacity:.9"></i><i style="width:60%"></i></div>
    <div class="vig__col"><span class="vig__colh">Gepland</span><i style="width:80%"></i></div></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Geschreven in <b>jouw stem</b></div>`,
  promoot:`<div class="vig__row vig__row--head"><span class="vig__dot"></span> Campagnes</div>
    <div class="vig__pay"><span>Google Ads</span><i style="width:74%"></i></div>
    <div class="vig__pay"><span>Meta Ads</span><i style="width:48%"></i></div>
    <div class="vig__insight"><span class="vig__spark">◆</span> Toegerekend aan omzet · <b>per dienst</b></div>`,
};

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
const TK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>`;

export default function JourneySection() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const journey = journeyRef.current;
    const track = trackRef.current;
    const dots = dotsRef.current;
    if (!journey || !track || !dots) return;

    const scenes = [...track.children] as HTMLElement[];
    scenes.forEach(() => { const i = document.createElement('i'); dots.appendChild(i); });

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isVertical = () => reduce || matchMedia('(pointer: coarse)').matches || window.innerWidth < 900;
    const DWELL = 0.82;
    let mode = '';

    const updateJourney = () => {
      if (mode !== 'h') return;
      const rect = journey.getBoundingClientRect();
      const total = journey.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const vw = window.innerWidth;
      const maxX = track.scrollWidth - vw;
      track.style.transform = `translate3d(${-p * maxX}px,0,0)`;
      const center = p * maxX + vw / 2;
      let active = 0, best = 1e9;
      scenes.forEach((s, i) => {
        const sc = i * vw + vw / 2;
        const inv = Math.max(0, 1 - Math.abs(center - sc) / vw);
        s.style.setProperty('--in', inv.toFixed(3));
        const dd = Math.abs(center - sc);
        if (dd < best) { best = dd; active = i; }
      });
      journey.classList.toggle('live', p > 0.002 && p < 0.998);
      [...dots.children].forEach((d, i) => d.classList.toggle('on', i === active));
    };

    const layout = () => {
      const vertical = isVertical();
      mode = vertical ? 'v' : 'h';
      journey.classList.toggle('vertical', vertical);
      if (vertical) {
        journey.style.height = '';
        track.style.transform = '';
        scenes.forEach(s => s.style.setProperty('--in', '1'));
      } else {
        journey.style.height = (window.innerHeight + (scenes.length - 1) * window.innerHeight * DWELL) + 'px';
        updateJourney();
      }
    };

    const reveals = [...document.querySelectorAll<HTMLElement>('.reveal')];
    const showReveals = () => {
      const h = window.innerHeight;
      for (let i = reveals.length - 1; i >= 0; i--) {
        if (reveals[i].getBoundingClientRect().top < h * 0.88) {
          reveals[i].classList.add('in');
          reveals.splice(i, 1);
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const sc = window.scrollY > 24;
          document.getElementById('nav')?.classList.toggle('scrolled', sc);
          document.getElementById('topbar')?.classList.toggle('hide', sc);
          updateJourney();
          showReveals();
          ticking = false;
        });
      }
    };

    layout();
    showReveals();
    window.addEventListener('scroll', onScroll, { passive: true });
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(layout, 160); };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      dots.innerHTML = '';
    };
  }, []);

  return (
    <section className="journey" id="journey" ref={journeyRef}>
      <div className="journey__sticky">
        <div className="journey__head">
          <div className="wrap">
            <div className="eyebrow"><span className="tick"></span> De modules van Emma</div>
          </div>
        </div>
        <div className="journey__track" id="track" ref={trackRef}>
          {SCENES.map(s => (
            <article className="scene" key={s.id} style={{ ['--sc' as string]: `var(--m-${s.id})` }}>
              <div className="scene__inner">
                <div className="scene__text">
                  <div className="scene__num"><span className="ln"></span>Emma{s.name} · vanaf €{s.price}/mnd</div>
                  <div className="scene__name"><span className="e">Emma</span>{s.name}</div>
                  <h3 className="scene__head">{s.head}</h3>
                  <p className="scene__desc">{s.desc}</p>
                  <ul className="scene__list">
                    {s.bullets.map((b, i) => (
                      <li key={i}><span className="scene__tk" dangerouslySetInnerHTML={{ __html: TK_SVG }}></span>{b}</li>
                    ))}
                  </ul>
                  <Link className="scene__cta" href={`/modules/${s.id}`}>Bekijk Emma{s.name} <span className="arr">→</span></Link>
                </div>
                <div className="scene__visual">
                  <span className="scene__ghosti"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[s.id] }}></svg></span>
                  <div className="vig" aria-hidden="true">
                    <div className="vig__top">
                      <span className="vig__ico"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[s.id] }}></svg></span>
                      <span className="vig__name"><span className="e">Emma</span>{s.name}</span>
                      <span className="vig__live">impressie</span>
                    </div>
                    <div className="vig__body" dangerouslySetInnerHTML={{ __html: VIGNETTES[s.id] || '' }}></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
          <article className="scene pair">
            <div className="pair__wrap">
              <div className="pair__head">
                <div className="eyebrow"><span className="tick"></span> En nog twee die meegroeien</div>
                <h3>Compleet maken wanneer je eraan toe bent.</h3>
                <p>Twee lichtere modules die je later aanzet, zonder iets opnieuw in te richten.</p>
              </div>
              <div className="pair__grid">
                {PAIR.map(s => (
                  <Link className="pair__card" key={s.id} href={`/modules/${s.id}`} style={{ ['--sc' as string]: `var(--m-${s.id})` }}>
                    <div className="pair__ico"><svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: ICONS[s.id] }}></svg></div>
                    <div className="pair__name"><span style={{ opacity: 0.5 }}>Emma</span>{s.name}</div>
                    <p className="pair__line">{s.line}</p>
                    <div className="pair__foot">
                      <span className="pair__price">vanaf €{s.price}<span> /mnd</span></span>
                      <span className="pair__go">Bekijk <span className="arr">→</span></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
        <div className="journey__dots" id="jdots" ref={dotsRef}></div>
      </div>
    </section>
  );
}
