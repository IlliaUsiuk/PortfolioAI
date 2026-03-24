import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })

  const { name, email, message } = body as Record<string, unknown>

  // Basic server-side validation
  if (
    typeof name !== 'string' || name.trim().length < 2 ||
    typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000
  ) {
    return NextResponse.json({ error: 'Invalid fields' }, { status: 422 })
  }

  const to = process.env.CONTACT_EMAIL
  if (!to || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'MyAIWay Contact <onboarding@resend.dev>',
    to,
    replyTo: email,
    subject: `New message from ${name.trim()} — MyAIWay`,
    text: `Name: ${name.trim()}\nEmail: ${email}\n\n${message.trim()}`,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return NextResponse.json({ error: 'Send failed' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
