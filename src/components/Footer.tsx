import Image from 'next/image';
import Link from 'next/link';
import { MODULE_ORDER, MODULE_STATUS, APP_URL, SIGNUP_URL, LAUNCHED } from '@/data/modules';

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <Image src="/logo-light.svg" alt="emma." width={88} height={26} />
            <p>De vriendelijke schil om je boekhouding, en straks om de rest van je onderneming. Voor zelfstandige ondernemers en kleine bedrijven in Nederland. Gebouwd door Toms Ambitie in Zwolle.</p>
          </div>
          <div className="foot__col">
            <h2>Modules</h2>
            {MODULE_ORDER.map(id => (
              <Link key={id} href={`/modules/${id}`}>
                Emma{cap(id)}{MODULE_STATUS[id].live ? '' : ` · ${MODULE_STATUS[id].when}`}
              </Link>
            ))}
          </div>
          <div className="foot__col">
            <h2>Op de site</h2>
            <Link href="/#hoe">Hoe het werkt</Link>
            <Link href="/#prijs">Prijs</Link>
            <Link href="/pakketten">Pakketten</Link>
            <Link href="/vergelijk">Vergelijk</Link>
            <Link href="/veiligheid">Veiligheid</Link>
            <Link href="/kennisbank">Kennisbank</Link>
          </div>
          <div className="foot__col">
            <h2>Emma</h2>
            <a href={APP_URL}>Inloggen</a>
            {LAUNCHED ? <a href={SIGNUP_URL}>Start 14 dagen gratis</a> : <Link href="/#wachtlijst">Houd me op de hoogte</Link>}
            <Link href="/contact">Contact</Link>
            <Link href="/over">Over Toms Ambitie</Link>
            <Link href="/algemene-voorwaarden">Algemene voorwaarden</Link>
            <Link href="/privacy">Privacyverklaring</Link>
          </div>
        </div>
        <div className="foot__bot">
          <span className="mono">WWW.EMMASTUDIO.NL · TOMS AMBITIE · ZWOLLE</span>
          <span className="mono">© 2026 · Jij doet je werk. Emma de rest.</span>
        </div>
      </div>
    </footer>
  );
}
