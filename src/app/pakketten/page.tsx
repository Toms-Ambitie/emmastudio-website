import type { Metadata } from 'next';
import { MODULES, MODULE_PRICE } from '@/data/modules';
import { PACKAGES, formatPrice, packageListPrice, packageDiscount } from '@/data/packages';
import { PACKAGES_SECTION, MODULE_PRICES } from '@/data/home';
import { IconCheck } from '@/components/emma/icons';
import WaitlistForm from '@/components/WaitlistForm';

const SITE = 'https://www.emmastudio.nl';
const emmaName = (id: string) => `Emma${MODULES[id]?.name ?? id.charAt(0).toUpperCase() + id.slice(1)}`;

const META_TITLE = 'Emma-pakketten · Software per branche voor salons, horeca en installateurs';
const META_DESC = 'Emma bundelt modules per branche: voor salons, horeca of installateurs. 10% korting op de losse prijs. Stap nu los in en houd je prijs. Vanaf €41,40 per maand.';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESC,
  alternates: { canonical: `${SITE}/pakketten` },
  openGraph: {
    type: 'website',
    url: `${SITE}/pakketten`,
    title: META_TITLE,
    description: META_DESC,
    images: [{ url: '/og-card.png', width: 1200, height: 630 }],
  },
};

export default function Pakketten() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="px-5 pb-4 pt-28 md:px-8 md:pt-36 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">Pakketten</span>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-emma-ink md:text-5xl lg:text-6xl">{PACKAGES_SECTION.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-emma-ink-2">{PACKAGES_SECTION.intro}</p>
        </div>
      </section>

      {/* Pakketkaarten — alle vier "Binnenkort", geen coral/aanrader (§6.2) */}
      <section className="px-5 pt-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((pkg) => (
              <div key={pkg.name} className="flex flex-col overflow-hidden rounded-emma-card border border-emma-line bg-emma-paper p-6 transition-all hover:shadow-emma-hover">
                <h2 className="font-display text-lg font-bold text-emma-ink">{pkg.name}</h2>
                <p className="mt-1 text-xs text-emma-subtext">{pkg.desc}</p>
                {pkg.price === null ? (
                  <p className="mt-4 text-sm font-semibold text-emma-subtext">Prijs volgt</p>
                ) : (
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold em-num text-emma-ink">€ {formatPrice(pkg.price)}</span>
                    <span className="text-sm text-emma-subtext">/mnd</span>
                  </div>
                )}
                {/* Los-bedrag en korting worden afgeleid, nooit los onderhouden. */}
                {pkg.price !== null && (
                  <p className="mt-1 text-xs text-emma-subtext">
                    Los € {packageListPrice(pkg.modules)}/mnd · je bespaart {packageDiscount(pkg)}%
                  </p>
                )}
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
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-emma-subtext">{PACKAGES_SECTION.foot}</p>
        </div>
      </section>

      {/* Losse modules — hoe de prijs werkt tot de pakketten er zijn */}
      <section className="px-5 py-20 md:px-8 md:py-28 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-emma-card border border-emma-line bg-emma-paper p-8 md:p-10">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emma-coral" aria-hidden="true" />
            <span className="em-label text-emma-coral">{MODULE_PRICES.eyebrow}</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-emma-ink md:text-3xl">{MODULE_PRICES.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-emma-ink-2">{MODULE_PRICES.intro}</p>
          <ul className="mt-6 space-y-3">
            {MODULE_PRICES.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emma-teal-soft text-emma-boekt" aria-hidden="true">
                  <IconCheck size={14} />
                </div>
                <span className="text-sm leading-relaxed text-emma-ink-2">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-emma-subtext">
            Som van alle acht losse modules: € {['boekt','waakt','loont','vindt','coacht','ziet','schrijft','promoot'].reduce((s, k) => s + MODULE_PRICE[k], 0)}/mnd. Emma Compleet bundelt ze straks; die prijs volgt zodra alle acht modules er zijn.
          </p>
        </div>
      </section>

      {/* Wachtlijst (één formulier, /api/subscribe) */}
      <section className="px-5 pb-24 md:px-8 md:pb-32 lg:px-10">
        <div id="wachtlijst" className="mx-auto max-w-xl scroll-mt-28 rounded-emma-card border border-emma-line bg-emma-paper p-8 text-center shadow-emma-card">
          <h2 className="font-display text-2xl font-bold text-emma-ink">{PACKAGES_SECTION.waitlist.heading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-emma-ink-2">{PACKAGES_SECTION.waitlist.sub}</p>
          <div className="mt-6">
            <WaitlistForm submitLabel={PACKAGES_SECTION.waitlist.button} note="Geen spam. Je hoort het als de pakketten er zijn." />
          </div>
        </div>
      </section>
    </main>
  );
}
