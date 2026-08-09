'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = Object.fromEntries(new FormData(form));
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setDone(true); return; }
      const body = await res.json().catch(() => ({}));
      setError(body.error || 'Er ging iets mis. Probeer het later nog eens.');
    } catch {
      setError('Er ging iets mis. Controleer je verbinding en probeer opnieuw.');
    }
    setLoading(false);
  };

  const inputCls = 'w-full rounded-emma-btn border border-emma-line bg-emma-creme/50 px-4 py-3 text-base text-emma-ink placeholder:text-emma-subtext transition-colors focus:border-emma-coral focus:bg-emma-paper focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emma-boekt';

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-emma-card border border-emma-line bg-emma-paper p-8 text-center shadow-emma-card md:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emma-success text-white" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5" /></svg>
        </span>
        <b className="mt-5 font-display text-xl font-bold text-emma-ink">Bedankt voor je bericht.</b>
        <span className="mt-2 text-sm leading-relaxed text-emma-ink-2">We hebben het ontvangen en komen zo snel mogelijk bij je terug.</span>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} className="rounded-emma-card border border-emma-line bg-emma-paper p-6 shadow-emma-card md:p-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="cName" className="mb-1.5 block text-sm font-medium text-emma-ink">Naam</label>
          <input id="cName" name="name" type="text" placeholder="Hoe heet je?" autoComplete="name" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="cEmail" className="mb-1.5 block text-sm font-medium text-emma-ink">E-mailadres</label>
          <input id="cEmail" name="email" type="email" inputMode="email" placeholder="je@voorbeeld.nl" autoComplete="email" required className={inputCls} />
        </div>
        <div>
          <label htmlFor="cMsg" className="mb-1.5 block text-sm font-medium text-emma-ink">Bericht</label>
          <textarea id="cMsg" name="message" placeholder="Waar kunnen we je mee helpen?" required rows={5} className={`${inputCls} resize-y`} />
        </div>
        <button type="submit" disabled={loading} className="group inline-flex w-full items-center justify-center gap-2 rounded-emma-btn bg-emma-coral-strong px-6 py-3 text-base font-semibold text-white transition-all hover:bg-emma-coral-deep active:translate-y-px disabled:opacity-60">
          {loading ? 'Versturen…' : 'Verstuur bericht'}
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </button>
        {error && <p className="text-sm font-medium text-emma-error" role="alert">{error}</p>}
        {/* Informatieplicht (art. 13 AVG): wie persoonsgegevens vraagt, zegt erbij
            waar ze heen gaan. Eén zin plus een link naar de verklaring. */}
        <p className="text-xs leading-relaxed text-emma-subtext">
          We gebruiken je gegevens alleen om te reageren. Niets meer, niets minder. Hoe we ermee
          omgaan staat in onze{' '}
          <Link href="/privacy" className="underline hover:text-emma-ink">privacyverklaring</Link>.
        </p>
      </div>
    </form>
  );
}
