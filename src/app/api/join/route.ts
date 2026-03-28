import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { welcomeEmail } from '@/lib/emails/welcome'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, company, role, locale } = await req.json()

  const { error } = await supabase.from('community_members').insert({
    first_name: firstName,
    last_name: lastName,
    email,
    company,
    role: role || null,
    locale: locale || 'en',
  })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'already_member' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send welcome email (non-blocking — don't fail the signup if email fails)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { subject, html } = welcomeEmail({ firstName, locale: locale || 'en' })
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Romandy CTO <hello@ctoromandy.ch>',
      to: email,
      subject,
      html,
    })
  } catch (emailError) {
    console.error('Welcome email failed:', emailError)
  }

  return NextResponse.json({ ok: true })
}
