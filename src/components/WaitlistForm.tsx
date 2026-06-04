'use client';

import { useRef, useState } from 'react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm({ dark = false, note = '', noteLabel = '', className = '' }: {
  dark?: boolean;
  note?: string;
  noteLabel?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const shake = () => {
    rowRef.current?.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
      { duration: 300 }
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = (inputRef.current?.value ?? '').trim();
    if (!EMAIL_RE.test(val)) { inputRef.current?.focus(); shake(); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: val }) });
      if (res.ok || res.status === 409) { setDone(true); return; }
    } catch {}
    shake();
    setLoading(false);
  };

  return (
    <form className={`wait${done ? ' is-done' : ''}${dark ? ' on-dark' : ''}${className ? ' ' + className : ''}`} onSubmit={submit}>
      <div className="wait__row" ref={rowRef}>
        <input ref={inputRef} type="email" inputMode="email" placeholder="Je e-mailadres" aria-label="E-mailadres" required disabled={loading} />
        <button className="btn btn-coral" type="submit" disabled={loading}>
          {loading ? 'Even wachten…' : 'Zet me op de wachtlijst'} <span className="arr">→</span>
        </button>
      </div>
      <div className="wait__note">
        {noteLabel && <b>{noteLabel} </b>}
        {note || 'Geen verplichtingen. Geen creditcard. We laten je weten wanneer Emma live gaat.'}
      </div>
      <div className="wait__ok">
        <svg viewBox="0 0 24 24" fill="none"><path d="m20 6-11 11-5-5"/></svg>
        <div><b>Je staat op de lijst.</b><span>We laten van ons horen zodra Emma live gaat.</span></div>
      </div>
    </form>
  );
}
