import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { eventRegistrationEmail } from '@/lib/emails/event-registration'
import { UPCOMING_EVENT } from '@/lib/events'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { firstName, lastName, email, company, jobTitle, eventName, locale } = body

  if (!firstName || !lastName || !email || !eventName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await supabase.from('event_registrations').insert({
    event_name: eventName,
    first_name: firstName,
    last_name: lastName,
    email,
    company: company || null,
    job_title: jobTitle || null,
    locale: locale || 'en',
  })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'already_registered' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Send registration confirmation email (non-blocking)
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { subject, html } = eventRegistrationEmail({
      firstName,
      eventName: UPCOMING_EVENT.title,
      eventDate: UPCOMING_EVENT.date,
      eventTime: UPCOMING_EVENT.time,
      eventLocation: UPCOMING_EVENT.location,
      eventSlug: UPCOMING_EVENT.slug,
      locale: locale || 'en',
    })
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Romandy CTO <hello@ctoromandy.ch>',
      to: email,
      subject,
      html,
    })
  } catch (emailError) {
    console.error('Registration email failed:', emailError)
  }

  return NextResponse.json({ success: true })
}
