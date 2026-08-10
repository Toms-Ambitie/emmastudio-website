'use client';

/* ============================================================
   HOMEPAGE — Higgsfield-design, geport naar Next.js.
   Ronde 2 (briefing v3 stap 3a). Structuur en Tailwind-opmaak komen
   uit de export (src/routes/index.tsx). Inhoud komt uit de datalaag:
   modules.ts, packages.ts, proof.ts, articles.ts en home.ts. Waar de
   export en de datalaag botsten, wint de datalaag (stap 2 is leidend).

   Nav en Footer worden door layout.tsx gerenderd; deze component levert
   alleen de secties + ScrollEffects.

   Dwingende correcties (zie ook home.ts):
   - Drie assen (live / koopbaar / gelanceerd): elke CTA schakelt op
     LAUNCHED. Nu false → wachtlijst, geen knop naar een dichte funnel.
   - Pakketten: vier kaarten "Binnenkort", geen coral/aanrader, één
     wachtlijstformulier onder de kaarten op /api/subscribe.
   - Geen eerlijkheid-als-USP; onware serverclaim gecorrigeerd (in data).
   ============================================================ */

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { ClientOnly } from './ClientOnly';
import { ScrollEffects } from './ScrollEffects';
import { CinematicHero } from './CinematicHero';
import { KineticText } from './KineticText';
import { AnimatedCounter } from './AnimatedCounter';
import { IconArrow, IconCheck, IconShield, IconLink, IconSparkChat } from './icons';
import WaitlistForm from '@/components/WaitlistForm';
import StatusBadge from '@/components/StatusBadge';

import {
  MODULE_ORDER, MODULE_TAGS, MODULE_PRICE, MODULES, ICONS, MODULE_STATUS, SIGNUP_URL, LAUNCHED,
} from '@/data/modules';
import { PACKAGES } from '@/data/packages';
import { ILZE_QUOTE, STATS, HERO_BADGE, PROOF_INTRO } from '@/data/proof';
import type { Article } from '@/data/articles';
import {
  HERO, THREE_PROBLEMS, PROBLEM_PULL, MANIFESTO, SHOWCASE, SOLUTION,
  MODULES_SECTION, HOW_IT_WORKS, PRICE_COMPARISON, MODULE_PRICES,
  PACKAGES_SECTION, PROOF_SECTION, SECURITY, FAQ, KB_PREVIEW,
} from '@/data/home';

/* Waar de niet-gelanceerde CTA's naartoe wijzen: het ene wachtlijst-
   formulier onder de pakketten. Zodra LAUNCHED true wordt, gaan de
   primaire CTA's naar de signup — geen herbouw nodig. */
const WAITLIST_ANCHOR = '#wachtlijst';

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Communicatietitel van een module: "EmmaBoekt" uit id "boekt". */
const emmaName = (id: string) => `Emma${cap(MODULES[id].name)}`;

/** Module-icoon uit ICONS[id] (rauwe SVG-paden), zelfde render als de
    bestaande pagina's. Kleur erft van currentColor. */
function ModuleGlyph({ id, size = 24 }: { id: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[id] }}
    />
  );
}

function Section({ id, children, className = '' }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-5 md:px-8 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/* ==================== HERO ==================== */

function Hero() {
  const assurances = [HERO_BADGE, ...HERO.assurances];
  return (
    <section className="relative h-dvh w-full overflow-hidden bg-emma-petrol" aria-label="emma introductie">
      <ClientOnly
        fallback={<img src="/assets/hero-cinematic.jpg" alt="Warm en kalm werkblad met zacht gouden licht" className="absolute inset-0 h-full w-full object-cover" aria-hidden="true" />}
      >
        <CinematicHero />
      </ClientOnly>
      <div className="absolute inset-0 bg-gradient-to-b from-emma-petrol/50 via-emma-petrol/20 to-emma-creme" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-emma-petrol/60 via-transparent to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 flex items-center pt-16">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
              <span className="em-label text-emma-coral">{HERO.eyebrow}</span>
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
              {HERO.titleLine1}
              <br />
              <span className="text-emma-coral">{HERO.titleLine2}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
              {HERO.intro}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              {LAUNCHED ? (
                <a href={SIGNUP_URL} className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-7 py-3.5 text-base font-semibold text-white shadow-emma-card transition-all hover:bg-emma-coral-deep hover:shadow-emma-hover active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt">
                  Begin vandaag
                  <IconArrow size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <a href={WAITLIST_ANCHOR} className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-7 py-3.5 text-base font-semibold text-white shadow-emma-card transition-all hover:bg-emma-coral-deep hover:shadow-emma-hover active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt">
                  Houd me op de hoogte
                  <IconArrow size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              )}
              <a href="#product" className="group inline-flex w-fit items-center gap-2 whitespace-nowrap text-base font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emma-boekt">
                <span className="border-b-2 border-white/30 pb-0.5 transition-colors group-hover:border-emma-coral">Bekijk Emma</span>
                <IconArrow size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
              {assurances.map((a) => (
                <div key={a} className="flex items-center gap-2.5">
                  <span className="flex h-2 w-2 rounded-full bg-emma-success" aria-hidden="true" />
                  <span className="text-sm text-white/70">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <div className="flex flex-col items-center gap-2">
          <span className="em-label text-white/50">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ==================== HET PROBLEEM ==================== */

function TheProblem() {
  return (
    <Section id="probleem" className="py-20 md:py-32">
      <div data-reveal className="max-w-2xl">
        <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">Het probleem</span></div>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">
          Ondernemen is geweldig.
          <br />
          De administratie eromheen niet.
        </h2>
      </div>

      <div data-stagger-group className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
        {THREE_PROBLEMS.map((p) => (
          <div key={p.num} data-stagger-item className="group relative overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper p-6 transition-all hover:shadow-emma-hover">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-emma-coral/30" aria-hidden="true">{p.num}</span>
              <h3 className="font-display text-lg font-bold text-emma-ink">{p.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-emma-ink-2">{p.desc}</p>
            <div className="mt-5 flex items-center gap-2 border-t border-emma-line pt-4">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emma-coral" aria-hidden="true" />
              <span className="text-xs font-medium text-emma-coral">{p.solution}</span>
            </div>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-12 overflow-hidden rounded-emma-card bg-emma-petrol px-8 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-2xl font-semibold leading-snug text-emma-creme md:text-3xl">
            {PROBLEM_PULL.stat}
          </p>
          <p className="mt-4 text-sm text-emma-creme/70">{PROBLEM_PULL.sub}</p>
        </div>
      </div>
    </Section>
  );
}

/* ==================== MANIFESTO ==================== */

function Manifesto() {
  return (
    <section id="manifest" className="relative overflow-hidden bg-emma-petrol py-24 md:py-40">
      <div className="absolute inset-0">
        <img src="/assets/manifesto-dawn.jpg" alt="" className="h-full w-full object-cover opacity-40" aria-hidden="true" data-parallax="0.15" />
        <div className="absolute inset-0 bg-gradient-to-b from-emma-petrol via-emma-petrol/80 to-emma-petrol" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 md:px-8 lg:px-10">
        <KineticText as="h2" className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-emma-creme md:text-5xl lg:text-6xl">
          {MANIFESTO}
        </KineticText>
      </div>
    </section>
  );
}

/* ==================== PRODUCT SHOWCASE (overzicht + 8 modules) ==================== */

function ProductShowcase() {
  const [activeShot, setActiveShot] = useState(0);

  const shots = SHOWCASE.shots;

  return (
    <section id="product" className="relative overflow-hidden bg-emma-creme py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div data-reveal className="max-w-2xl">
          <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{SHOWCASE.eyebrow}</span></div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">
            {SHOWCASE.title1}<br />{SHOWCASE.title2}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-emma-ink-2">
            {SHOWCASE.intro}
          </p>
        </div>

        <div data-reveal className="mt-12">
          <div className="mx-auto max-w-md lg:max-w-none lg:grid lg:grid-cols-[1fr_280px] lg:gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-emma-line bg-emma-paper shadow-emma-pop">
              <div className="aspect-[3/2] w-full overflow-hidden bg-emma-petrol">
                <img
                  key={activeShot}
                  src={shots[activeShot].src}
                  alt={`Screenshot van ${shots[activeShot].label}: ${shots[activeShot].desc}`}
                  className="h-full w-full object-cover"
                  style={{ animation: 'em-fade 0.4s ease-out' }}
                  loading="lazy"
                />
              </div>
              <div className="border-t border-emma-line p-5">
                <h3 className="font-display text-lg font-bold text-emma-ink">{shots[activeShot].label}</h3>
                <p className="mt-1 text-sm text-emma-ink-2">{shots[activeShot].desc}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:mt-0 lg:flex-col lg:overflow-visible lg:pb-0 em-scroll" role="tablist" aria-label="Module screenshots">
              {shots.map((shot, i) => (
                <button
                  key={i}
                  onClick={() => setActiveShot(i)}
                  role="tab"
                  aria-selected={activeShot === i}
                  aria-label={`Bekijk screenshot van ${shot.label}`}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all lg:shrink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt ${
                    activeShot === i
                      ? 'border-emma-coral bg-emma-coral-soft'
                      : 'border-emma-line bg-emma-paper hover:border-emma-coral/40'
                  }`}
                >
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${activeShot === i ? 'bg-emma-coral text-white' : 'bg-emma-creme text-emma-subtext'}`}>
                    {i === 0 ? 'O' : String(i).padStart(2, '0')}
                  </div>
                  <span className={`whitespace-nowrap text-sm font-medium lg:whitespace-normal ${activeShot === i ? 'text-emma-ink' : 'text-emma-ink-2'}`}>
                    {shot.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== SOLUTION ==================== */

const SOLUTION_ICONS: Record<string, typeof IconShield> = {
  shield: IconShield,
  link: IconLink,
  chat: IconSparkChat,
};

function Solution() {
  return (
    <section className="relative overflow-hidden bg-emma-creme py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="order-2 lg:order-1">
            <h2 className="font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{SOLUTION.title1}<br />{SOLUTION.title2}</h2>
            <p className="mt-6 text-lg leading-relaxed text-emma-ink-2">{SOLUTION.intro}</p>
            <div className="mt-10 space-y-6">
              {SOLUTION.points.map((item, i) => {
                const Icon = SOLUTION_ICONS[item.icon] ?? IconShield;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-emma-squircle" style={{ backgroundColor: 'rgba(22,183,156,0.12)', color: '#16B79C' }}><Icon size={22} /></div>
                    <div><h3 className="font-display text-lg font-bold text-emma-ink">{item.title}</h3><p className="mt-1 text-base leading-relaxed text-emma-ink-2">{item.text}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-emma-card shadow-emma-pop">
              <img src="/assets/organized-desk.jpg" alt="Georganiseerd werkblad met notitieboek, pen en plant in warm ochtendlicht" className="h-full w-full object-cover" loading="lazy" data-parallax="0.08" />
              <div className="absolute inset-0 bg-gradient-to-br from-emma-coral/5 to-emma-petrol/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== MODULES ==================== */

function ModulesSection() {
  return (
    <section id="modules" className="bg-emma-creme py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div data-reveal className="max-w-2xl">
          <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{MODULES_SECTION.eyebrow}</span></div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{MODULES_SECTION.title1}<br />{MODULES_SECTION.title2}</h2>
          <p className="mt-5 text-lg leading-relaxed text-emma-ink-2">{MODULES_SECTION.intro}</p>
        </div>
        <div data-stagger-group className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {MODULE_ORDER.map((id) => (
            <Link key={id} href={`/modules/${id}`} data-stagger-item className="group relative flex flex-col overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper p-6 transition-all hover:shadow-emma-hover hover:-translate-y-1">
              <div data-module-bar className="absolute left-0 top-0 h-full w-1 origin-top" style={{ backgroundColor: `var(--m-${id})` }} />
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-emma-squircle transition-colors" style={{ backgroundColor: `color-mix(in srgb, var(--m-${id}) 10%, transparent)`, color: `var(--m-${id})` }}><ModuleGlyph id={id} size={24} /></div>
                <StatusBadge id={id} />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-emma-ink">{emmaName(id)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-emma-ink-2">{MODULE_TAGS[id]}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <span className="em-label text-emma-subtext">EUR {MODULE_PRICE[id]} / mnd</span>
                <IconArrow size={16} className="text-emma-subtext transition-all group-hover:text-emma-coral group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== HOE HET WERKT ==================== */

function HowItWorks() {
  return (
    <Section id="hoe" className="py-20 md:py-32">
      <div data-reveal className="max-w-2xl"><h2 className="font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{HOW_IT_WORKS.title}</h2></div>
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS.steps.map((s) => (
          <div key={s.num} data-reveal className="relative border-l-2 border-emma-line pl-6">
            <span className="font-display text-5xl font-bold text-emma-coral/30" aria-hidden="true">{s.num}</span>
            <h3 className="mt-3 font-display text-xl font-bold text-emma-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-emma-ink-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ==================== ILZE QUOTE ==================== */

function IlzeQuote() {
  return (
    <section className="bg-emma-petrol py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8 lg:px-10">
        <div data-reveal>
          <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">Bewijs uit de praktijk</span></div>
          <blockquote className="mt-6">
            <p className="font-display text-2xl font-medium leading-relaxed text-emma-creme md:text-3xl lg:text-4xl">
              {ILZE_QUOTE.quote}
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emma-coral/20 text-emma-coral font-display text-lg font-bold" aria-hidden="true">I</div>
              <div>
                <p className="font-semibold text-emma-creme">{ILZE_QUOTE.name}</p>
                <p className="text-sm text-emma-creme/70">{ILZE_QUOTE.role}</p>
              </div>
            </footer>
          </blockquote>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
            {ILZE_QUOTE.stats.map((stat, i) => (
              <div key={i} className="border-l-2 border-emma-creme/20 pl-4">
                <div className="font-display text-2xl font-bold text-emma-creme">{stat.value}</div>
                <div className="text-xs text-emma-creme/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== PRIJSVERGELIJKING ==================== */

function PriceComparison() {
  const { rows, foot } = PRICE_COMPARISON;
  return (
    <Section id="vergelijking" className="py-20 md:py-32">
      <div data-reveal className="max-w-2xl">
        <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{PRICE_COMPARISON.eyebrow}</span></div>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{PRICE_COMPARISON.title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-emma-ink-2">{PRICE_COMPARISON.intro}</p>
      </div>

      <div data-reveal className="mt-10 overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper">
        <div className="hidden md:block">
          <div className="grid grid-cols-4 border-b border-emma-line">
            <div className="px-6 py-5">
              <span className="em-label text-emma-subtext">Wat heb je nodig?</span>
            </div>
            <div className="relative px-6 py-5 bg-emma-coral-soft/40">
              <div className="absolute left-0 right-0 top-0 h-1 bg-emma-coral" aria-hidden="true" />
              <div className="font-display text-lg font-bold text-emma-ink">Emma</div>
              <div className="text-xs text-emma-subtext">vanaf EUR 9/mnd</div>
            </div>
            <div className="px-6 py-5">
              <div className="font-display text-lg font-bold text-emma-ink">Losse tools</div>
              <div className="text-xs text-emma-subtext">EUR 60-300+/mnd</div>
            </div>
            <div className="px-6 py-5">
              <div className="font-display text-lg font-bold text-emma-ink">Bureau</div>
              <div className="text-xs text-emma-subtext">EUR 200-2.000+/mnd</div>
            </div>
          </div>

          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-4 border-b border-emma-line last:border-b-0 ${i % 2 === 0 ? '' : 'bg-emma-creme/30'}`}>
              <div className="px-6 py-4">
                <span className="text-sm font-semibold text-emma-ink">{row.need}</span>
              </div>
              <div className="px-6 py-4 bg-emma-coral-soft/40">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emma-coral" aria-label="Inbegrepen bij Emma">
                  <IconCheck size={16} className="text-white" />
                </div>
              </div>
              <div className="px-6 py-4">
                {row.loose ? (
                  <span className="text-sm text-emma-ink-2">{row.loose}</span>
                ) : (
                  <span className="text-emma-line text-2xl" aria-label="Niet beschikbaar">&mdash;</span>
                )}
              </div>
              <div className="px-6 py-4">
                {row.bureau ? (
                  <span className="text-sm text-emma-ink-2">{row.bureau}</span>
                ) : (
                  <span className="text-emma-line text-2xl" aria-label="Niet beschikbaar">&mdash;</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-emma-line md:hidden">
          {rows.map((row, i) => (
            <div key={i} className="p-5">
              <h3 className="font-display text-base font-bold text-emma-ink">{row.need}</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-emma-coral-soft/40 px-3 py-2">
                  <span className="text-xs font-semibold text-emma-coral">Emma</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emma-coral" aria-label="Inbegrepen bij Emma">
                    <IconCheck size={14} className="text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-emma-subtext">Losse tools</span>
                  {row.loose ? <span className="text-sm text-emma-ink-2">{row.loose}</span> : <span className="text-emma-line text-xl">&mdash;</span>}
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-emma-subtext">Bureau</span>
                  {row.bureau ? <span className="text-sm text-emma-ink-2">{row.bureau}</span> : <span className="text-emma-line text-xl">&mdash;</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-emma-line bg-emma-creme/50 px-6 py-4 text-center">
          <p className="text-xs text-emma-subtext">{foot}</p>
        </div>
      </div>
    </Section>
  );
}

/* ==================== MODULE-PRIJZEN (slider) ==================== */

/* Aantal USP-rijen dat elke sliderkaart reserveert = het maximum over alle
 * modules (sommige hebben er 4, sommige 3). Kortere lijsten vullen we aan met
 * onzichtbare spacer-rijen, zodat alle kaarten even hoog zijn en de vorige/
 * volgende-pijltjes niet verspringen bij het doorklikken. */
const SLIDER_FEAT_ROWS = Math.min(5, Math.max(...MODULE_ORDER.map((mid) => MODULES[mid].does.feats.length)));

function ModulePrices() {
  const [activeModule, setActiveModule] = useState(0);

  const id = MODULE_ORDER[activeModule];
  const m = MODULES[id];
  const hex = `var(--m-${id})`;

  const goNext = () => setActiveModule((activeModule + 1) % MODULE_ORDER.length);
  const goPrev = () => setActiveModule((activeModule - 1 + MODULE_ORDER.length) % MODULE_ORDER.length);

  return (
    <Section id="prijs" className="py-20 md:py-32">
      <div data-reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{MODULE_PRICES.eyebrow}</span></div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{MODULE_PRICES.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-emma-ink-2">
            {MODULE_PRICES.intro}
          </p>
          <ul className="mt-8 space-y-3">
            {MODULE_PRICES.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emma-teal-soft text-emma-boekt" aria-hidden="true">
                  <IconCheck size={14} />
                </div>
                <span className="text-sm leading-relaxed text-emma-ink-2">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <div className="relative overflow-hidden rounded-emma-card border-2 bg-emma-paper shadow-emma-pop" style={{ borderColor: hex }}>
            <div className="h-1.5 w-full" style={{ backgroundColor: hex }} aria-hidden="true" />

            <div className="flex items-center gap-4 p-6 pb-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-emma-squircle"
                style={{ backgroundColor: `color-mix(in srgb, ${hex} 10%, transparent)`, color: hex }}
                aria-hidden="true"
              >
                <ModuleGlyph id={id} size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold text-emma-ink">{emmaName(id)}</h3>
                <p className="min-h-[2.5rem] text-sm text-emma-subtext">{MODULE_TAGS[id]}</p>
              </div>
              <StatusBadge id={id} className="self-start" />
            </div>

            <div className="px-6 pb-4">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-emma-ink em-num">EUR {MODULE_PRICE[id]}</span>
                <span className="text-sm text-emma-subtext">per maand, excl. BTW</span>
              </div>
              {MODULE_STATUS[id].live && LAUNCHED ? (
                <p className="mt-2 text-sm font-medium text-emma-success">14 dagen gratis proberen, geen creditcard nodig</p>
              ) : (
                <p className="mt-2 text-sm font-medium text-emma-subtext">Binnenkort beschikbaar</p>
              )}
            </div>

            <div className="px-6 pb-4">
              <ul className="space-y-2">
                {Array.from({ length: SLIDER_FEAT_ROWS }).map((_, i) => {
                  const f = m.does.feats[i];
                  return (
                    <li key={i} className={`flex items-start gap-2.5 ${f ? '' : 'invisible'}`} aria-hidden={f ? undefined : true}>
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `color-mix(in srgb, ${hex} 12%, transparent)` }} aria-hidden="true">
                        <IconCheck size={12} style={{ color: hex }} />
                      </div>
                      <span className="text-sm text-emma-ink-2">{f ? f.h : ' '}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="px-6 pb-4">
              <Link
                href={`/modules/${id}`}
                className="group flex w-full items-center justify-center gap-2 rounded-emma-btn px-5 py-3 text-sm font-semibold text-white transition-all active:translate-y-px"
                style={{ backgroundColor: hex }}
              >
                Bekijk {emmaName(id)}
                <IconArrow size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <p className="mt-2 text-center text-xs text-emma-subtext">Maandelijks opzegbaar, 10% korting bij jaarbetaling</p>
            </div>

            <div className="flex items-center justify-between border-t border-emma-line px-6 py-4">
              <button
                onClick={goPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emma-line text-emma-subtext transition-all hover:border-emma-coral hover:text-emma-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt"
                aria-label="Vorige module"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>

              <div className="flex items-center gap-1.5">
                {MODULE_ORDER.map((modId, i) => (
                  <button
                    key={modId}
                    onClick={() => setActiveModule(i)}
                    className="flex h-9 items-center rounded-full px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt"
                    aria-label={`Ga naar ${emmaName(modId)}`}
                    aria-selected={activeModule === i}
                    role="tab"
                  >
                    <span
                      className="block h-2 rounded-full transition-all"
                      style={{
                        width: activeModule === i ? '24px' : '8px',
                        backgroundColor: activeModule === i ? hex : 'var(--color-emma-line)',
                      }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={goNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emma-line text-emma-subtext transition-all hover:border-emma-coral hover:text-emma-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt"
                aria-label="Volgende module"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="em-label text-emma-subtext">{String(activeModule + 1).padStart(2, '0')} / {String(MODULE_ORDER.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ==================== PAKKETTEN ==================== */

function PackagesSection() {
  return (
    <Section id="pakketten" className="py-20 md:py-32">
      <div data-reveal className="max-w-2xl">
        <h2 className="font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{PACKAGES_SECTION.title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-emma-ink-2">{PACKAGES_SECTION.intro}</p>
      </div>

      <div data-stagger-group className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 md:gap-5">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            data-stagger-item
            className="relative flex flex-col overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper p-6 transition-all hover:shadow-emma-hover"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-emma-ink">{pkg.name}</h3>
              <p className="mt-1 text-xs text-emma-subtext">{pkg.desc}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold em-num text-emma-ink">EUR {pkg.price}</span>
                <span className="text-sm text-emma-subtext">/mnd</span>
              </div>
              <p className="mt-1 text-xs font-medium text-emma-subtext">{pkg.modules.length} MODULES</p>

              <ul className="mt-5 space-y-2">
                {pkg.modules.map((modId) => (
                  <li key={modId} className="flex items-start gap-2 text-sm text-emma-ink-2">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emma-teal-soft" aria-hidden="true">
                      <IconCheck size={12} className="text-emma-boekt" />
                    </div>
                    <span>{emmaName(modId)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-2 rounded-emma-btn border border-emma-line bg-emma-creme/50 px-4 py-2.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emma-subtext" aria-hidden="true" />
                <span className="text-sm font-semibold text-emma-subtext">{pkg.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-emma-subtext">
        {PACKAGES_SECTION.foot}
      </p>

      {/* Eén wachtlijstformulier onder de kaarten (briefing v3 §6.3),
          op het bestaande /api/subscribe-endpoint. */}
      <div id="wachtlijst" data-reveal className="mx-auto mt-12 max-w-xl scroll-mt-28 rounded-emma-card border border-emma-line bg-emma-paper p-8 text-center shadow-emma-card">
        <h3 className="font-display text-2xl font-bold text-emma-ink">{PACKAGES_SECTION.waitlist.heading}</h3>
        <p className="mt-2 text-sm leading-relaxed text-emma-ink-2">{PACKAGES_SECTION.waitlist.sub}</p>
        <div className="mt-6">
          <WaitlistForm submitLabel={PACKAGES_SECTION.waitlist.button} note="Geen spam. Je hoort het als de pakketten er zijn." />
        </div>
      </div>
    </Section>
  );
}

/* ==================== HET BEWIJS (stats) ==================== */

function Proof() {
  return (
    <Section id="bewijs" className="py-20 md:py-32">
      <div data-reveal className="max-w-2xl">
        <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{PROOF_SECTION.eyebrow}</span></div>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{PROOF_SECTION.title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-emma-ink-2">{PROOF_INTRO}</p>
      </div>
      <div data-stagger-group className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {STATS.map((s, i) => (
          <div key={i} data-stagger-item className="rounded-emma-card border border-emma-line bg-emma-paper p-6 text-center">
            <div className="font-display text-4xl font-bold text-emma-coral em-num md:text-5xl">{s.display ? <span>{s.display}</span> : <AnimatedCounter value={s.value} suffix={s.suffix || ''} />}</div>
            <div className="mt-2 text-xs text-emma-subtext">{s.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ==================== VEILIGHEID ==================== */

function Security() {
  return (
    <section id="veiligheid" className="bg-emma-petrol py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 lg:px-10">
        <div data-reveal className="max-w-2xl">
          <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{SECURITY.eyebrow}</span></div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-creme md:text-5xl lg:text-6xl">{SECURITY.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-emma-creme/70">{SECURITY.intro}</p>
        </div>
        <div data-stagger-group className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {SECURITY.cards.map((item, i) => (
            <div key={i} data-stagger-item className="rounded-emma-card bg-emma-petrol-light p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-emma-squircle bg-emma-creme/10 text-emma-creme" aria-hidden="true"><IconShield size={20} /></div>
              <h3 className="mt-4 font-display text-lg font-bold text-emma-creme">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-emma-creme/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== FAQ ==================== */

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" className="py-20 md:py-32">
      <div data-reveal className="max-w-2xl">
        <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{FAQ.eyebrow}</span></div>
        <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{FAQ.title}</h2>
      </div>
      <div data-reveal className="mt-10 max-w-3xl">
        <div className="divide-y divide-emma-line border-y border-emma-line">
          {FAQ.items.map((faq, i) => (
            <div key={i}>
              <h3>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-content-${i}`}
                  id={`faq-button-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt"
                >
                  <span className="font-display text-lg font-bold text-emma-ink">{faq.q}</span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-transform ${open === i ? 'rotate-45 bg-emma-coral text-white border-emma-coral' : 'border-emma-line text-emma-subtext'}`} aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
              </h3>
              <div id={`faq-content-${i}`} role="region" aria-labelledby={`faq-button-${i}`} className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-96 pb-5' : 'max-h-0'}`}><p className="text-base leading-relaxed text-emma-ink-2">{faq.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ==================== KENNISBANK-PREVIEW ==================== */

// De artikelen komen als prop binnen, niet uit ARTICLES.slice(0, 3). Twee redenen:
// die slice pakte de eerste drie uit de array, en die volgorde zegt niets over hoe
// recent iets is. En het coverbeeld vraagt een bestandscontrole, en die kan alleen
// server-side. Beide gebeuren nu in app/page.tsx, waar dat wel mag.
function KbPreview({ posts }: { posts: Article[] }) {
  return (
    <Section className="py-20 md:py-32">
      <div data-reveal className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2"><span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" /><span className="em-label text-emma-coral">{KB_PREVIEW.eyebrow}</span></div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl">{KB_PREVIEW.title}</h2>
        </div>
        <Link href="/kennisbank" className="hidden group items-center gap-1.5 text-sm font-semibold text-emma-coral hover:underline sm:flex">{KB_PREVIEW.link}<IconArrow size={14} className="transition-transform group-hover:translate-x-1" /></Link>
      </div>
      <div data-stagger-group className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/kennisbank/${post.slug}`} data-stagger-item className="group flex flex-col overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper transition-all hover:shadow-emma-hover hover:-translate-y-1">
            <div className="relative aspect-[16/10] overflow-hidden" style={{ backgroundColor: post.accent }}>
              {post.image ? (
                <>
                  <Image src={post.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/20" aria-hidden="true" />
                </>
              ) : (
                <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 30% 30%, #fff 0%, transparent 60%)` }} aria-hidden="true" />
              )}
              <div className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-emma-squircle text-white ${post.image ? 'bg-black/30 backdrop-blur-sm' : 'bg-white/15'}`} aria-hidden="true">
                <ModuleGlyph id={post.glyph} size={22} />
              </div>
              <div className="absolute left-4 bottom-4"><span className="rounded-emma-pill bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">{post.cat}</span></div>
            </div>
            <div className="flex flex-1 flex-col p-5"><div className="flex items-center gap-2 text-xs text-emma-subtext"><span>{post.date}</span><span className="h-1 w-1 rounded-full bg-emma-line" /><span>{post.read} lezen</span></div><h3 className="mt-2 font-display text-lg font-bold leading-snug text-emma-ink">{post.title}</h3><p className="mt-2 text-sm leading-relaxed text-emma-ink-2">{post.dek}</p></div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ==================== ZWEVENDE CTA: WEGGEHAALD ====================

   Hier stond een zwevende balk "Klaar om Emma te ontmoeten? / Begin vandaag".
   Weg, op verzoek van Tom, en om twee redenen die elkaar versterken.

   Ten eerste stonden er twee zwevende dingen tegelijk in beeld: deze balk en
   de chatknop. Dat is er een te veel op een merk waarvan de eerste regel
   "rustig" is en de negende "ruimte boven volheid".

   Ten tweede was de keuze tussen die twee niet gelijk. Aanmelden staat op de
   homepage al in de hero, in de nav op desktop, in het mobiele menu en in de
   footer: vier ingangen. De chat had er precies één, deze knop. Deze balk
   weghalen kost dus geen ingang, de chatknop weghalen zou de chat onbereikbaar
   maken.

   Meegenomen: de balk had op mobiel een zichtbaar mankement. Er zat geen
   verberg-bij-omlaag-scrollen in (alleen `scrollY > 800`), maar iOS klapt zijn
   werkbalk in tijdens het scrollen en verschuift daarmee het layout-viewport,
   waardoor een `position: fixed`-element aan de onderrand half wegzakt. Je zag
   dan een groen streepje onderin. Dat probleem is met de balk mee verdwenen.

   Komt hij ooit terug: geef hem `padding-bottom: env(safe-area-inset-bottom)`
   en test op een echte telefoon, niet in een verkleind browservenster. */

/* ==================== PAGINA ==================== */

export default function HomePage({ kbPosts }: { kbPosts: Article[] }) {
  return (
    <>
      <main id="main-content">
        <Hero />
        <TheProblem />
        <Manifesto />
        <ProductShowcase />
        <Solution />
        <ModulesSection />
        <HowItWorks />
        <IlzeQuote />
        <PriceComparison />
        <ModulePrices />
        <PackagesSection />
        <Proof />
        <Security />
        <Faq />
        <KbPreview posts={kbPosts} />
      </main>
      <ClientOnly><ScrollEffects /></ClientOnly>
    </>
  );
}
