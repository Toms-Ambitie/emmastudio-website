import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_URL, LAUNCHED } from '@/data/modules';
import { ILZE_QUOTE } from '@/data/proof';

const SITE = 'https://www.emmastudio.nl';

const META_TITLE = 'Over Emma · Ontstaan in een kapsalon, gebouwd voor ondernemers';
const META_DESC = 'Emma begon als werkend systeem in een echte kapsalon, niet op een whiteboard. Gebouwd door Toms Ambitie uit Zwolle, module voor module. Lees het verhaal.';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESC,
  alternates: { canonical: `${SITE}/over` },
  openGraph: {
    type: 'website',
    url: `${SITE}/over`,
    title: META_TITLE,
    description: META_DESC,
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

const VALUES = [
  { n: '01', h: 'Rust is een functie.', p: 'Software hoeft je niet te activeren, activeren, activeren. Een goed product doet zijn werk zonder dat jij er elke dag aan hoeft te denken.' },
  { n: '02', h: 'Eerlijk bouwen.', p: 'We vertellen wat werkt en wat nog niet. EmmaPromoot is de enige module die nog niet 18 maanden in de praktijk heeft gedraaid. Dat zeggen we gewoon.' },
  { n: '03', h: 'Jij houdt de regie.', p: 'Emma doet het werk, maar jij beslist. Geen verrassingen, geen automatische acties buiten jouw medeweten. Software die werkt voor jou, niet andersom.' },
  { n: '04', h: 'Lokaal en echt.', p: 'Emma is gemaakt voor Nederlandse ondernemers: met Nederlandse BTW, CAO-wetgeving en AVG als uitgangspunt, niet als bijzaak.' },
];

export default function Over() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="px-5 pb-4 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">Over ons</span>
          </div>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">Gebouwd door ondernemers, voor ondernemers.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emma-ink-2"><a href="https://www.toms-ambitie.nl/" target="_blank" rel="noopener noreferrer" className="font-semibold text-emma-coral hover:underline">Toms Ambitie</a> maakt software die het dagelijkse werk van ondernemers eenvoudiger maakt. Geen hype, geen overbelofte. Gewoon eerlijk bouwen.</p>
        </div>
      </section>

      {/* Verhaal */}
      <section className="px-5 py-16 md:px-8 md:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
              <span className="em-label text-emma-coral">Het begin</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">Begonnen in een salon.</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-emma-ink-2">
              <p>Emma begon niet als startup-idee op een whiteboard. Het begon bij salon Blondes Incognito in Heeten, waar Ilze Spannenberg haar salon runde met een wirwar aan losse tools, spreadsheets en notities.</p>
              <p>We bouwden een eerste versie voor haar, puur om het werk rustiger te maken. Dat draaide 18 maanden in de praktijk voordat we ook maar één euro aan Emma verdienden.</p>
              <p>Wat we leerden: ondernemers willen geen dashboard om in te verdwalen. Ze willen weten wat er vandaag toe doet, en de rest gewoon geregeld hebben.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-emma-card border border-emma-line bg-emma-paper p-5">
                <div className="font-display text-3xl font-bold text-emma-ink em-num">18 mnd</div>
                <div className="mt-1 text-sm text-emma-subtext">bewezen in de praktijk bij Blondes Incognito</div>
              </div>
              <div className="rounded-emma-card border border-emma-line bg-emma-paper p-5">
                <div className="font-display text-3xl font-bold text-emma-ink em-num">8</div>
                <div className="mt-1 text-sm text-emma-subtext">modules in ontwikkeling voor het platform</div>
              </div>
            </div>
          </div>

          <figure className="flex flex-col justify-end rounded-emma-card border border-emma-line bg-emma-creme p-8 md:p-10">
            <blockquote className="font-display text-xl font-bold leading-snug tracking-tight text-emma-ink md:text-2xl">
              &ldquo;{ILZE_QUOTE.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emma-coral font-display text-lg font-extrabold text-white" aria-hidden="true">I</span>
              <span className="text-sm">
                <strong className="block font-semibold text-emma-ink">Ilze Spannenberg</strong>
                <span className="text-emma-subtext">Eigenaar · Blondes Incognito, Heeten</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Overtuigingen */}
      <section className="border-y border-emma-line bg-emma-paper px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
              <span className="em-label text-emma-coral">Waarom we dit doen</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">Onze overtuigingen.</h2>
            <p className="mt-4 text-lg leading-relaxed text-emma-ink-2">Vier principes die bepalen hoe we Emma bouwen en wat we nooit zullen doen.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
            {VALUES.map((v) => (
              <div key={v.n} className="rounded-emma-card border border-emma-line bg-emma-creme p-6 md:p-7">
                <div className="font-display text-2xl font-bold text-emma-coral em-num">{v.n}</div>
                <h3 className="mt-3 font-display text-xl font-bold text-emma-ink">{v.h}</h3>
                <p className="mt-2 text-base leading-relaxed text-emma-ink-2">{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-emma-card border border-emma-line bg-emma-paper p-8 text-center shadow-emma-card md:p-12">
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">Meedoen</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-emma-ink md:text-4xl">Doe je mee<span className="text-emma-coral">?</span></h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-emma-ink-2">
            {LAUNCHED
              ? 'De boekhoudmodule, de eerste module van Emma, is live. Koppel e-Boekhouden.nl en probeer het 14 dagen gratis.'
              : 'De boekhoudmodule van Emma draait al, maar de aanmelding staat nog niet open. Laat je e-mail achter en je hoort het als eerste zodra je kunt starten.'}
          </p>
          <div className="mt-7 flex justify-center">
            {LAUNCHED ? (
              <a className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-emma-coral-deep active:translate-y-px" href={APP_URL}>
                Start 14 dagen gratis
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            ) : (
              <Link className="group inline-flex items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-7 py-3.5 text-base font-semibold text-white transition-all hover:bg-emma-coral-deep active:translate-y-px" href="/#wachtlijst">
                Houd me op de hoogte
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            )}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-emma-subtext">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emma-coral" aria-hidden="true" />Daarna €9 per maand</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emma-coral" aria-hidden="true" />Maandelijks opzegbaar</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emma-coral" aria-hidden="true" />Je accountant houdt toegang</span>
          </div>
        </div>
      </section>
    </main>
  );
}
