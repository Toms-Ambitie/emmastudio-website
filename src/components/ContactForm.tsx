'use client';

import { useRef, useState } from 'react';

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const data = Object.fromEntries(new FormData(form));
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setDone(true); return; }
    } catch {}
    setLoading(false);
  };

  return (
    <form className={`cform${done ? ' is-done' : ''}`} id="cform" ref={formRef} onSubmit={submit}>
      <div className="cform__fields">
        <div className="cform__row">
          <label htmlFor="cName">Naam</label>
          <input id="cName" name="name" type="text" placeholder="Hoe heet je?" autoComplete="name" required />
        </div>
        <div className="cform__row">
          <label htmlFor="cEmail">E-mailadres</label>
          <input id="cEmail" name="email" type="email" inputMode="email" placeholder="je@voorbeeld.nl" autoComplete="email" required />
        </div>
        <div className="cform__row">
          <label htmlFor="cMsg">Bericht</label>
          <textarea id="cMsg" name="message" placeholder="Waar kunnen we je mee helpen?" required></textarea>
        </div>
        <button className="btn btn-coral" type="submit" disabled={loading}>
          {loading ? 'Versturen…' : 'Verstuur bericht'} <span className="arr">→</span>
        </button>
        <div className="cform__note">We gebruiken je gegevens alleen om te reageren. Niets meer, niets minder.</div>
      </div>
      <div className="cform__ok">
        <span className="ring">
          <svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"/></svg>
        </span>
        <b>Bedankt voor je bericht.</b>
        <span>We hebben het ontvangen en komen zo snel mogelijk bij je terug.</span>
      </div>
    </form>
  );
}
