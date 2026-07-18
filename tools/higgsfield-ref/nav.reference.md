# Higgsfield-referentie — Nav + megamenu

Dit is het **originele Higgsfield-navontwerp** uit de export (`emmastudio-website-export.zip`,
`src/components/emma/Nav.tsx`, v3). Bewaard als referentie zodat elke sessie/container
faithful kan porten zonder de export opnieuw nodig te hebben. **Niet importeren in de app**
(TanStack + niet-geïnstalleerde packages) — puur referentie.

## Wat het ontwerp bevat
- Vaste header, `bg-emma-creme/90 backdrop-blur-md`, `border-b border-emma-line/60`, hoogte `h-16`, `max-w-7xl`.
- Logo (Wordmark) links.
- Desktop (`lg`): **"Modules"-knop met megamenu** — 640px brede dropdown, 2-koloms grid van de 8 modules
  (icoon in module-kleur + naam + korte omschrijving), met "Bekijk alle modules"-link. Daarna: Pakketten, Vergelijk, Over Emma, Veiligheid, Blog.
- Rechts: "Inloggen" + coral pill-CTA.
- Mobiel: hamburger → paneel met modules-grid + links.
- Klik-weg-overlay onder het open megamenu.

## Verplichte aanpassingen bij het porten (project-specifiek)
1. **Framework:** TanStack `Link to="/x"` / `to="/modules/$slug" params={{slug}}` → `next/link` `href="/x"` / `href={\`/modules/${id}\`}`.
2. **Module-ids:** de export hardcodeert `MODULES_NAV` met slugs als `emma-boekt`. Het project gebruikt `/modules/{id}` met id uit `MODULE_ORDER` (`boekt`, `waakt`, …). **Gebruik de datalaag** (`MODULE_ORDER`, `MODULE_TAGS`, `ICONS`, kleur `var(--m-{id})`) — niet de hardcoded lijst. Omschrijvingen uit `MODULE_TAGS`.
3. **Routes:** `/over-ons` → **`/over`**; `/blog` → **`/kennisbank`** (label "Kennisbank" — v4 §5.5: kennisbank hoort in het hoofdmenu). `/pakketten`, `/vergelijk`, `/veiligheid`, `/modules` bestaan al.
4. **CTA "Aan de slag" → `/register` is een dode funnel** (`LAUNCHED=false`). Gebruik het wachtlijst-patroon met de `LAUNCHED`-ternary (wachtlijst nu, signup zodra `true`). "Inloggen" → `APP_URL` mag.
5. **Logo-klik:** NIET zelf `window.scrollTo(...)` in de onClick zetten (de export doet dat wel). De scroll-fix in `ScrollEffects.tsx` handelt "logo → naar boven" al via Lenis af; een eigen `window.scrollTo` her-introduceert bug 1. Laat de logo gewoon een `<Link href="/">` zijn.
6. De dode ankers `#closer`/`#roadmap` verdwijnen vanzelf: de oude Nav wordt vervangen, deze nieuwe heeft ze niet.

## Het originele export-ontwerp (referentie, verbatim)
```tsx
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";
import { IconArrow, IconBook, IconChart, IconUsers, IconSearch, IconUserCircle, IconEye, IconPen, IconMegaphone } from "./icons";

const MODULES_NAV = [
  { name: "EmmaBoekt", slug: "emma-boekt", desc: "Boekhouden zonder de boekhoudsoftware", hex: "#16B79C", icon: IconBook },
  { name: "EmmaWaakt", slug: "emma-waakt", desc: "Je bedrijf in één dashboard", hex: "#FFB23E", icon: IconChart },
  { name: "EmmaLoont", slug: "emma-loont", desc: "Loon en personeelsadmin", hex: "#4D6BF5", icon: IconUsers },
  { name: "EmmaVindt", slug: "emma-vindt", desc: "Klanten en personeel vinden", hex: "#EB5C43", icon: IconSearch },
  { name: "EmmaCoacht", slug: "emma-coacht", desc: "Medewerker coaching", hex: "#FF7FA3", icon: IconUserCircle },
  { name: "EmmaZiet", slug: "emma-ziet", desc: "Markt en concurrenten", hex: "#9B6BE0", icon: IconEye },
  { name: "EmmaSchrijft", slug: "emma-schrijft", desc: "Blogs, e-mail, LinkedIn", hex: "#1FA4E0", icon: IconPen },
  { name: "EmmaPromoot", slug: "emma-promoot", desc: "Google en Meta Ads", hex: "#FF4D2E", icon: IconMegaphone },
];

const APP_URL = "https://app.emmastudio.nl";

export function Nav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [openMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emma-line/60 bg-emma-creme/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8 lg:px-10">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emma-boekt rounded"
          onClick={() => {
            setOpenMenu(null);
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          aria-label="emma. - naar boven"
        >
          <Wordmark />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Modules mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu("modules")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
              onClick={() => setOpenMenu(openMenu === "modules" ? null : "modules")}
            >
              Modules
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${openMenu === "modules" ? "rotate-180" : ""}`}>
                <path d="m6 9.5 6 6 6-6" />
              </svg>
            </button>

            {openMenu === "modules" && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-[640px] rounded-2xl border border-emma-line bg-emma-paper p-5 shadow-emma-pop">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="em-label text-emma-subtext">Acht modules, een platform</span>
                    <Link
                      to="/modules"
                      onClick={() => setOpenMenu(null)}
                      className="text-xs font-medium text-emma-coral hover:underline"
                    >
                      Bekijk alle modules
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {MODULES_NAV.map((m) => (
                      <Link
                        key={m.slug}
                        to="/modules/$slug"
                        params={{ slug: m.slug }}
                        onClick={() => setOpenMenu(null)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-emma-creme"
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-emma-squircle"
                          style={{ backgroundColor: `${m.hex}15`, color: m.hex }}
                        >
                          <m.icon size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-emma-ink">{m.name}</div>
                          <div className="text-xs text-emma-subtext">{m.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/pakketten"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Pakketten
          </Link>

          <Link
            to="/vergelijk"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Vergelijk
          </Link>

          <Link
            to="/over-ons"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Over Emma
          </Link>

          <Link
            to="/veiligheid"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Veiligheid
          </Link>

          <Link
            to="/blog"
            className="rounded-lg px-3 py-2 text-sm font-medium text-emma-ink-2 transition-colors hover:bg-emma-line/40 hover:text-emma-ink"
            onMouseEnter={() => setOpenMenu(null)}
          >
            Blog
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a href={APP_URL} className="hidden text-sm font-medium text-emma-ink-2 transition-colors hover:text-emma-ink sm:inline">
            Inloggen
          </a>
          <a
            href={`${APP_URL}/register`}
            className="group hidden items-center gap-1.5 rounded-emma-pill bg-emma-coral-strong px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emma-coral-deep active:scale-[0.98] sm:inline-flex"
          >
            Aan de slag
            <IconArrow size={15} className="transition-transform group-hover:translate-x-0.5" />
          </a>

          {/* Mobile menu button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-emma-ink lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
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
                {MODULES_NAV.map((m) => (
                  <Link
                    key={m.slug}
                    to="/modules/$slug"
                    params={{ slug: m.slug }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-emma-creme"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: `${m.hex}15`, color: m.hex }}>
                      <m.icon size={16} />
                    </div>
                    <span className="text-sm font-medium text-emma-ink">{m.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 border-t border-emma-line pt-4">
              <Link to="/pakketten" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Pakketten</Link>
              <Link to="/vergelijk" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Vergelijk</Link>
              <Link to="/over-ons" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Over Emma</Link>
              <Link to="/veiligheid" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Veiligheid</Link>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink hover:bg-emma-creme">Blog</Link>
              <a href={APP_URL} className="rounded-lg px-3 py-2.5 text-sm font-medium text-emma-ink-2 hover:bg-emma-creme">Inloggen</a>
              <a href={`${APP_URL}/register`} className="mt-2 rounded-emma-btn bg-emma-coral-strong px-4 py-2.5 text-center text-sm font-semibold text-white">Aan de slag</a>
            </div>
          </div>
        </div>
      )}

      {/* Click-away overlay for mega menu */}
      {openMenu && (
        <div
          className="fixed inset-0 top-16 z-[-1]"
          onClick={() => setOpenMenu(null)}
        />
      )}
    </header>
  );
}
```
