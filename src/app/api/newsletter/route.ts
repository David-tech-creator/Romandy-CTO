import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { newsletterWelcomeEmail } from '@/lib/emails/newsletter-welcome'
import crypto from 'crypto'

function supabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )
}

// POST /api/newsletter — subscribe
export async function POST(req: NextRequest) {
  const { firstName, email, locale } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const token = crypto.randomUUID()
  const supabase = supabaseClient()

  const { error } = await supabase.from('newsletter_subscribers').insert({
    email,
    first_name: firstName || null,
    locale: locale || 'en',
    token,
  })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'already_subscribed' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { subject, html } = newsletterWelcomeEmail({
      firstName: firstName || 'there',
      locale: locale || 'en',
    })
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Romandy CTO <hello@ctoromandy.ch>',
      to: email,
      subject,
      html,
    })
  } catch (e) {
    console.error('Newsletter welcome email failed:', e)
  }

  return NextResponse.json({ ok: true })
}

// GET /api/newsletter?token=xxx — unsubscribe
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'missing_token' }, { status: 400 })

  const supabase = supabaseClient()
  const { error } = await supabase
    .from('newsletter_subscribers')
    .update({ is_active: false, unsubscribed_at: new Date().toISOString() })
    .eq('token', token)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Redirect to a friendly page
  return NextResponse.redirect(new URL('/en?unsubscribed=newsletter', req.url))
}
