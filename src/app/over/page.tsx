import type { Metadata } from 'next';
import WaitlistForm from '@/components/WaitlistForm';

export const metadata: Metadata = {
  title: 'Over Toms Ambitie · Emma',
  description: 'Wij bouwen Emma vanuit één overtuiging: ondernemers verdienen software die voor hen werkt, niet andersom.',
};

export default function Over() {
  return (
    <main className="lightpage" data-page="over">

      <header className="phero">
        <div className="wrap">
          <div className="phero__inner">
            <div className="phero__eyebrow eyebrow phero__kicker"><span className="tick"></span> Over ons</div>
            <h1>Gebouwd door ondernemers, voor ondernemers.</h1>
            <p className="phero__lead">Toms Ambitie maakt software die het dagelijkse werk van ondernemers eenvoudiger maakt. Geen hype, geen overbelofte. Gewoon eerlijk bouwen.</p>
          </div>
        </div>
      </header>

      {/* Story */}
      <section className="ostory">
        <div className="wrap">
          <div className="ostory__grid">
            <div className="ostory__body reveal">
              <div className="eyebrow"><span className="tick"></span> Het begin</div>
              <h2>Begonnen in een salon.</h2>
              <p>Emma begon niet als startup-idee op een whiteboard. Het begon bij salon Blondes Incognito in Heeten, waar Ilze Vanaga haar salon runde met een wirwar aan losse tools, spreadsheets en notities.</p>
              <p>We bouwden een eerste versie voor haar, puur om het werk rustiger te maken. Dat draaide 18 maanden in de praktijk voordat we ook maar één euro aan Emma verdienden.</p>
              <p>Wat we leerden: ondernemers willen geen dashboard om in te verdwalen. Ze willen weten wat er vandaag toe doet, en de rest gewoon geregeld hebben.</p>
              <div className="ostory__stats">
                <div className="ostory__stat">
                  <b>18 mnd</b>
                  <span>bewezen in de praktijk bij Blondes Incognito</span>
                </div>
                <div className="ostory__stat">
                  <b>8</b>
                  <span>modules in ontwikkeling voor het platform</span>
                </div>
              </div>
            </div>
            <div className="ostory__img reveal" data-d="1" style={{ background: 'var(--creme-2)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '32px', borderRadius: '22px', border: '1px solid var(--line)' }}>
              <blockquote style={{ margin: 0 }}>
                <p style={{ fontSize: 'clamp(18px,2.2vw,24px)', fontFamily: 'var(--display)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.3, color: 'var(--ink)', marginBottom: '24px' }}>
                  "Ik hoef niet meer na te denken over de administratie. Emma doet het gewoon."
                </p>
                <footer style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--coral)', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--display)', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>I</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px' }}>Ilze Vanaga</strong>
                    <span style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>Eigenaar · Blondes Incognito, Heeten</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values">
        <div className="wrap">
          <div className="values__head reveal">
            <div className="eyebrow"><span className="tick"></span> Waarom we dit doen</div>
            <h2>Onze overtuigingen.</h2>
            <p>Vier principes die bepalen hoe we Emma bouwen en wat we nooit zullen doen.</p>
          </div>
          <div className="values__grid">
            <div className="valcard reveal">
              <div className="valcard__num">01</div>
              <h3>Rust is een functie.</h3>
              <p>Software hoeft je niet te activeren, activeren, activeren. Een goed product doet zijn werk zonder dat jij er elke dag aan hoeft te denken.</p>
            </div>
            <div className="valcard reveal" data-d="1">
              <div className="valcard__num">02</div>
              <h3>Eerlijk bouwen.</h3>
              <p>We vertellen wat werkt en wat nog niet. EmmaPromoot is de enige module die nog niet 18 maanden in de praktijk heeft gedraaid. Dat zeggen we gewoon.</p>
            </div>
            <div className="valcard reveal" data-d="2">
              <div className="valcard__num">03</div>
              <h3>Jij houdt de regie.</h3>
              <p>Emma doet het werk, maar jij beslist. Geen verrassingen, geen automatische acties buiten jouw medeweten. Software die werkt voor jou, niet andersom.</p>
            </div>
            <div className="valcard reveal" data-d="1">
              <div className="valcard__num">04</div>
              <h3>Lokaal en echt.</h3>
              <p>Emma is gemaakt voor Nederlandse ondernemers: met Nederlandse BTW, CAO-wetgeving en AVG als uitgangspunt, niet als bijzaak.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="closer" id="closer-over">
        <div className="closer__in">
          <div className="eyebrow" style={{ justifyContent: 'center', display: 'flex', marginBottom: '24px' }}><span className="tick"></span> Meedoen</div>
          <h2 className="reveal">Wil je erbij zijn<span className="dot">.</span></h2>
          <p className="reveal">We lanceren binnenkort. Laat je e-mail achter en wij laten je als eerste weten wanneer je kunt beginnen.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WaitlistForm note="Je hoort het als eerste" />
          </div>
          <div className="closer__assure">
            <span><span className="d"></span>Gratis beginnen</span>
            <span><span className="d"></span>Geen spam</span>
            <span><span className="d"></span>Maandelijks opzegbaar</span>
          </div>
        </div>
      </section>

    </main>
  );
}
