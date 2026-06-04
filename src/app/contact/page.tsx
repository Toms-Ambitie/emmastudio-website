import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact · Emma',
  description: 'Neem contact op met het team achter Emma. We horen graag van je.',
};

export default function Contact() {
  return (
    <main className="lightpage" data-page="contact">
      <header className="phero">
        <div className="phero__in">
          <div className="phero__eyebrow eyebrow"><span className="tick"></span> Contact</div>
          <h1>We horen graag van je.</h1>
          <p>Een vraag, een idee, of gewoon benieuwd waar we mee bezig zijn? Stuur ons een bericht. We lezen alles zelf.</p>
        </div>
      </header>

      <section className="contact">
        <div className="contact__grid">
          <div className="contact__intro">
            <h2>Stuur een bericht</h2>
            <p>Vul het formulier in en we komen zo snel mogelijk bij je terug. Liever direct mailen? Dat kan ook.</p>
            <div className="contact__pts">
              <div className="contact__pt">
                <span className="ic">
                  <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>
                </span>
                <div><b>E-mail</b><a href="mailto:hallo@emmastudio.nl">hallo@emmastudio.nl</a></div>
              </div>
              <div className="contact__pt">
                <span className="ic">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                </span>
                <div><b>Reactietijd</b><span>Meestal binnen twee werkdagen</span></div>
              </div>
              <div className="contact__pt">
                <span className="ic">
                  <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                </span>
                <div><b>Op de hoogte blijven</b><a href="/#closer">Zet je op de wachtlijst →</a></div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
