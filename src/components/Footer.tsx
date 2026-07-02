import Image from 'next/image';
import Link from 'next/link';
import { MODULE_ORDER, MODULE_STATUS, APP_URL, LAUNCHED } from '@/data/modules';

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <Image src="/logo-light.svg" alt="emma." width={88} height={26} />
            <p>De vriendelijke schil om je boekhouding, en straks om de rest van je onderneming. Voor élke zelfstandige ondernemer in NL &amp; BE. In ontwikkeling bij Toms Ambitie in Zwolle.</p>
          </div>
          <div className="foot__col">
            <h4>Modules</h4>
            {MODULE_ORDER.map(id => (
              <Link key={id} href={`/modules/${id}`}>
                Emma{cap(id)}{MODULE_STATUS[id].live ? '' : ` · ${MODULE_STATUS[id].when}`}
              </Link>
            ))}
          </div>
          <div className="foot__col">
            <h4>Op de site</h4>
            <Link href="/#hoe">Hoe het werkt</Link>
            <Link href="/#prijs">Prijs</Link>
            <Link href="/#roadmap">Roadmap</Link>
            <Link href="/#proof">Het bewijs</Link>
            <Link href="/kennisbank">Kennisbank</Link>
          </div>
          <div className="foot__col">
            <h4>Emma</h4>
            <a href={APP_URL}>Inloggen</a>
            {LAUNCHED ? <a href={APP_URL}>Start 14 dagen gratis</a> : <Link href="/#closer">Houd me op de hoogte</Link>}
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
