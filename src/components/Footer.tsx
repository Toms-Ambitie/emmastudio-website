import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__brand">
            <Image src="/logo-light.svg" alt="emma." width={88} height={26} />
            <p>Het ecosysteem dat de saaie kant van ondernemen overneemt, zodat jij grip, gemak en snelheid houdt. Voor élke zelfstandige ondernemer in NL &amp; BE. In ontwikkeling bij Toms Ambitie.</p>
          </div>
          <div className="foot__col">
            <h4>Modules</h4>
            <Link href="/modules/boekt">EmmaBoekt</Link>
            <Link href="/modules/waakt">EmmaWaakt</Link>
            <Link href="/modules/loont">EmmaLoont</Link>
            <Link href="/modules/vindt">EmmaVindt</Link>
            <Link href="/modules/coacht">EmmaCoacht</Link>
            <Link href="/modules/ziet">EmmaZiet</Link>
            <Link href="/modules/schrijft">EmmaSchrijft</Link>
            <Link href="/modules/promoot">EmmaPromoot</Link>
          </div>
          <div className="foot__col">
            <h4>Op de site</h4>
            <Link href="/#proof">Het bewijs</Link>
            <Link href="/#compare">Vergelijk</Link>
            <Link href="/#packs">Prijzen</Link>
            <Link href="/kennisbank">Kennisbank</Link>
          </div>
          <div className="foot__col">
            <h4>Emma</h4>
            <Link href="/contact">Contact</Link>
            <Link href="/#closer">Op de hoogte blijven</Link>
            <Link href="/over">Over Toms Ambitie</Link>
          </div>
        </div>
        <div className="foot__bot">
          <span className="mono">WWW.EMMASTUDIO.NL · TOMS AMBITIE</span>
          <span className="mono">© 2026 · Jij doet je werk. Emma de rest.</span>
        </div>
      </div>
    </footer>
  );
}
