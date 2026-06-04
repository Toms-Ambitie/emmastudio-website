import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="lightpage nf">
      <div className="nf__in">
        <div className="nf__num">404</div>
        <h1>Pagina niet gevonden.</h1>
        <p>De pagina die je zoekt bestaat niet (meer). Misschien een typfout in de URL?</p>
        <div className="nf__links">
          <Link href="/" className="btn btn-coral">Naar de homepage <span className="arr">→</span></Link>
          <Link href="/kennisbank" className="btn btn-ghost">Kennisbank</Link>
        </div>
      </div>
    </main>
  );
}
