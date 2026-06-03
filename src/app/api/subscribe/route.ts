import { NextRequest, NextResponse } from 'next/server';

// RESEND_API_KEY is set in Vercel → Settings → Environment Variables.
// It is never sent to the browser — this file only runs server-side.
const API_KEY = process.env.RESEND_API_KEY ?? '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body  = await req.json().catch(() => ({}));
  const email = String(body.email ?? '').trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Vul een geldig e-mailadres in.' }, { status: 400 });
  }

  if (!API_KEY) {
    console.error('[subscribe] RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Er ging iets mis. Probeer het later nog eens.' },
      { status: 500 },
    );
  }

  // Adds the contact to Resend's global Contacts (non-deprecated API).
  // To send a broadcast to this waitlist: in the Resend dashboard, use the
  // Segment "aangemeld na 3 juni 2026" — it filters by creation date automatically.
  // 409 = contact already exists → treated as success (no error shown to user).
  const res = await fetch('https://api.resend.com/contacts', {
    method:  'POST',
    headers: {
      Authorization:  `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent':   'emmastudio-website/1.0',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  if (res.ok || res.status === 409) {
    return NextResponse.json({ ok: true });
  }

  const detail = await res.json().catch(() => ({}));
  console.error('[subscribe] Resend error', res.status, detail);
  return NextResponse.json(
    { error: 'Er ging iets mis. Probeer het later nog eens.' },
    { status: 502 },
  );
}
