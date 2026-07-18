'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  APP_URL,
  LAUNCHED,
  MODULE_ORDER,
  MODULE_TAGS,
  MODULES,
  ICONS,
} from '@/data/modules';
import { IconArrow } from '@/components/emma/icons';

/**
 * Nav — Higgsfield-port (zie tools/higgsfield-ref/nav.reference.md).
 *
 * Verplichte, gedocumenteerde afwijkingen t.o.v. de export-referentie:
 * - TanStack `Link to` → next/link `href`.
 * - Modules uit de datalaag (MODULE_ORDER / MODULE_TAGS / MODULES / ICONS,
 *   kleur var(--m-{id})), niet de hardcoded MODULES_NAV-lijst.
 * - Routes: /over-ons → /over, /blog "Blog" → /kennisbank "Kennisbank".
 * - CTA: /register is een dode funnel zolang LAUNCHED=false → wachtlijst-
 *   patroon met de LAUNCHED-ternary. "Inloggen" → APP_URL.
 * - Logo: NIET de <Wordmark> (natypen van het merk schendt CLAUDE.md §4/§12),
 *   maar de meegeleverde SVG-vector. Geen eigen window.scrollTo op de logo-
 *   klik: ScrollEffects/Lenis handelt "logo → naar boven" al af.
 */

// Wachtlijst-sectie op de homepage (id="wachtlijst"); werkt cross-route.
const WAITLIST_ANCHOR = '/#wachtlijst';

function ModuleIcon({ id, size = 18 }: { id: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICONS[id] }}
    />
  );
}

export default function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emma-line/60 bg-emma-creme/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
        {/* Logo — SVG-vector, geen eigen scroll (Lenis doet dat) */}
        <Link
          href="/"
          className="-my-2 flex items-center rounded py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emma-boekt"
          aria-label="emma. home"
          onClick={() => setOpenMenu(null)}
        >
          <Image src="/logo-dark.svg" alt="emma." width={90} height={23} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Modules mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('modules')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
              onClick={() => setOpenMenu(openMenu === 'modules' ? null : 'modules')}
              aria-expanded={openMenu === 'modules'}
            >
              Modules
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className={`transition-transform ${openMenu === 'modules' ? 'rotate-180' : ''}`}
              >
                <path d="m6 9.5 6 6 6-6" />
              </svg>
            </button>

            {openMenu === 'modules' && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-[640px] rounded-2xl border border-emma-line bg-emma-paper p-5 shadow-emma-pop">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="em-label text-emma-subtext">Acht modules, een platform</span>
                    <Link
                      href="/modules"
                      onClick={() => setOpenMenu(null)}
                      className="text-xs font-medium text-emma-coral hover:underline"
                    >
                      Bekijk alle modules
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {MODULE_ORDER.map((id) => (
                      <Link
                        key={id}
                        href={`/modules/${id}`}
                        onClick={() => setOpenMenu(null)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-emma-creme"
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-emma-squircle"
                          style={{ backgroundColor: `color-mix(in srgb, var(--m-${id}) 8%, transparent)`, color: `var(--m-${id})` }}
                        >
                          <ModuleIcon id={id} size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-emma-ink">Emma{MODULES[id].name}</div>
                          <div className="text-xs text-emma-subtext">{MODULE_TAGS[id]}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/pakketten"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Pakketten
          </Link>

          <Link
            href="/vergelijk"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Vergelijk
          </Link>

          <Link
            href="/over"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Over Emma
          </Link>

          <Link
            href="/veiligheid"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Veiligheid
          </Link>

          <Link
            href="/kennisbank"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Kennisbank
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href={APP_URL}
            className="hidden rounded text-sm font-medium text-emma-ink-2 transition-colors hover:text-emma-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emma-boekt sm:inline"
          >
            Inloggen
          </a>
          {LAUNCHED ? (
            <a
              href={`${APP_URL}/register`}
              className="group hidden items-center gap-1.5 rounded-emma-pill bg-emma-coral-strong px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emma-coral-deep active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-ink sm:inline-flex"
            >
              Aan de slag
              <IconArrow size={15} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          ) : (
            <Link
              href={WAITLIST_ANCHOR}
              className="group hidden items-center gap-1.5 rounded-emma-pill bg-emma-coral-strong px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emma-coral-deep active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-ink sm:inline-flex"
            >
              Houd me op de hoogte
              <IconArrow size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-emma-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emma-boekt lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-emma-line bg-emma-paper lg:hidden">
          <div className="max-h-[80vh] overflow-y-auto px-5 py-4">
            <div className="mb-4">
              <span className="em-label text-emma-subtext">Modules</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {MODULE_ORDER.map((id) => (
                  <Link
                    key={id}
                    href={`/modules/${id}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-emma-creme"
                  >
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `color-mix(in srgb, var(--m-${id}) 8%, transparent)`, color: `var(--m-${id})` }}
                    >
                      <ModuleIcon id={id} size={16} />
                    </div>
                    <span className="text-sm font-medium text-emma-ink">Emma{MODULES[id].name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 border-t border-emma-line pt-4">
              <Link href="/pakketten" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Pakketten</Link>
              <Link href="/vergelijk" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Vergelijk</Link>
              <Link href="/over" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Over Emma</Link>
              <Link href="/veiligheid" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Veiligheid</Link>
              <Link href="/kennisbank" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Kennisbank</Link>
              <a href={APP_URL} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink-2 hover:bg-emma-creme">Inloggen</a>
              {LAUNCHED ? (
                <a href={`${APP_URL}/register`} onClick={() => setMobileOpen(false)} className="mt-2 rounded-emma-btn bg-emma-coral-strong px-4 py-2.5 text-center text-sm font-semibold text-white">Aan de slag</a>
              ) : (
                <Link href={WAITLIST_ANCHOR} onClick={() => setMobileOpen(false)} className="mt-2 rounded-emma-btn bg-emma-coral-strong px-4 py-2.5 text-center text-sm font-semibold text-white">Houd me op de hoogte</Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click-away overlay for mega menu */}
      {openMenu && (
        <div className="fixed inset-0 top-16 z-[-1]" onClick={() => setOpenMenu(null)} />
      )}
    </header>
  );
}
