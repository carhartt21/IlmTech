import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Honeypot check — if filled, it's a bot
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const { name, email, phone, projectType, message, callbackTime } = body;

    // Basic server-side validation
    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const htmlContent = `
      <h2>Neue Kontaktanfrage über ilmtech.de</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Name</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>E-Mail</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(email)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Telefon</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone || '–')}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Projekttyp</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(projectType)}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd"><strong>Rückrufzeit</strong></td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(callbackTime || '–')}</td></tr>
      </table>
      <h3>Nachricht</h3>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: 'IlmTech Website', email: 'noreply@ilmtech.de' },
        to: [{ email: 'info@ilmtech.de', name: 'IlmTech' }],
        replyTo: { email, name },
        subject: `Kontaktanfrage: ${projectType} – ${name}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Brevo API error:', response.status, errorBody);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact form error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
