'use client';

import { useState } from 'react';
import VideoBackground from './VideoBackground';
import PayoffWords, { type PayoffWord } from './PayoffWords';
import { TIMING } from './timing';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4';

const PAYOFF: PayoffWord[] = [
  { text: 'Jij' },
  { text: 'doet' },
  { text: 'je' },
  { text: 'werk.' },
  { text: 'Emma',  pauseBefore: TIMING.breathPause },
  { text: 'de' },
  { text: 'rest.', accentDot: true },
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ComingSoon() {
  const [email,    setEmail]    = useState('');
  const [status,   setStatus]   = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    if (status === 'loading') return;
    setErrorMsg('');

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg('Vul een geldig e-mailadres in.');
      return;
    }

    setStatus('loading');
    try {
      const res  = await fetch('/api/subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
      } else {
        setErrorMsg(data.error ?? 'Er ging iets mis. Probeer het later nog eens.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Er ging iets mis. Controleer je verbinding.');
      setStatus('error');
    }
  };

  return (
    <div className="cs-wrap">
      <VideoBackground src={VIDEO_URL} overlayClassName="cs-overlay" />

      <div className="cs-layout">
        {/* Beeldmerk top-left — from real logo files, never redrawn */}
        <img
          src="/beeldmerk-coral.svg"
          alt="Emma Studio"
          className="cs-beeldmerk anim-fade-rise"
          width={38}
          height={38}
        />

        {/* Payoff — word by word, breathing rhythm */}
        <PayoffWords words={PAYOFF} className="cs-headline" />

        {/* Tagline */}
        <p className="cs-tagline anim-fade-rise-delay">
          Binnenkort live. Emma neemt het saaie werk van ondernemen over — jij focust op je vak.
        </p>

        {/* Email signup — no <form> tag, handled via onClick */}
        {status !== 'success' ? (
          <div className="cs-form-row anim-fade-rise-delay-2">
            <input
              type="email"
              className={`cs-input${errorMsg ? ' cs-input--error' : ''}`}
              placeholder="jouw@emailadres.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={status === 'loading'}
              autoComplete="email"
              aria-label="E-mailadres"
            />
            <button
              className="cs-btn"
              onClick={handleSubmit}
              disabled={status === 'loading'}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? 'Moment…' : 'Hou me op de hoogte'}
            </button>
            {errorMsg && (
              <p className="cs-error" role="alert">{errorMsg}</p>
            )}
          </div>
        ) : (
          <p className="cs-success anim-fade-rise" role="status">
            Goed. We laten het je weten als we live gaan.
          </p>
        )}
      </div>
    </div>
  );
}
