import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const err = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return err('Invalid request.', 400); }
  if (clean(b.website, 100)) return NextResponse.json({ ok: true }); // honeypot: silently drop bots
  const d = { name: clean(b.name, 100), email: clean(b.email, 150), project: clean(b.project, 150), service: clean(b.service, 80), budget: clean(b.budget, 80), details: clean(b.details, 4000) };
  if (!d.name || !/^\S+@\S+\.\S+$/.test(d.email) || !d.service || d.details.length < 10) return err('Please complete all required fields.', 400);
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO_EMAIL, from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return err('The contact form is not configured yet.', 503);
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from, to: [to], reply_to: d.email,
        subject: `New project enquiry${d.project ? ` – ${d.project}` : ''}`,
        text: `Name: ${d.name}\nEmail: ${d.email}\nProject: ${d.project || '-'}\nService: ${d.service}\nBudget: ${d.budget || '-'}\n\n${d.details}`,
      }),
    });
    if (!r.ok) return err('We could not send your message. Please try again shortly.', 502);
    return NextResponse.json({ ok: true });
  } catch { return err('We could not send your message. Please try again shortly.', 502); }
}
