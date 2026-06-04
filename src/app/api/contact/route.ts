import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.RESEND_API_KEY ?? '';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? '').trim().slice(0, 200);
  const email = String(body.email ?? '').trim().toLowerCase();
  const message = String(body.message ?? '').trim().slice(0, 4000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ error: 'Vul alle velden in.' }, { status: 400 });
  }

  if (!API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Er ging iets mis.' }, { status: 500 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Emma Contact <hallo@emmastudio.nl>',
      to: ['hallo@emmastudio.nl'],
      reply_to: email,
      subject: `Contactformulier: ${name}`,
      text: `Van: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (res.ok) return NextResponse.json({ ok: true });

  const detail = await res.json().catch(() => ({}));
  console.error('[contact] Resend error', res.status, detail);
  return NextResponse.json({ error: 'Er ging iets mis. Probeer het later nog eens.' }, { status: 502 });
}
