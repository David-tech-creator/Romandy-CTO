import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, MapPin, Users, ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { EVENTS } from '@/lib/events'
import { createClient } from '@supabase/supabase-js'
import { EventTabs } from '@/components/EventTabs'
import { BrandLockup } from '@/components/BrandLockup'

const ORANGE = '#C8834A'
const DARK = '#2D2D2D'
const DARKER = '#252525'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }))
}

export default async function EventPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  unstable_setRequestLocale(locale)

  const event = EVENTS.find((e) => e.slug === slug)
  if (!event) notFound()

  const [registrationsRes, photosRes] = await Promise.all([
    supabase
      .from('event_registrations')
      .select('id, first_name, last_name, company', { count: 'exact' })
      .eq('event_name', event.title),
    supabase
      .from('event_photos')
      .select('id, cloudinary_url, caption')
      .eq('event_slug', slug)
      .order('uploaded_at', { ascending: true }),
  ])

  const registrations = registrationsRes.data ?? []
  const registrationCount = registrationsRes.count ?? 0
  const photos = photosRes.data ?? []

  const { sessionClaims } = await auth()
  const isAdmin = (sessionClaims?.metadata as { role?: string })?.role === 'admin'

  const title = locale === 'fr' ? event.titleFr : event.title
  const description = locale === 'fr' ? event.descriptionFr : event.description

  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK }}>
      {/* Event header */}
      <div className="py-14 px-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 text-sm mb-8 text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> All Events
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <BrandLockup locale={locale} size="md" linked={false} />
            {event.isUpcoming && (
              <>
                <div className="w-px h-8 bg-white/10" />
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{ color: ORANGE, borderColor: `${ORANGE}40`, backgroundColor: `${ORANGE}12` }}
                >
                  Upcoming Event
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase leading-tight mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} style={{ color: ORANGE }} /> {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} style={{ color: ORANGE }} /> {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} style={{ color: ORANGE }} /> {event.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={13} style={{ color: ORANGE }} /> {registrationCount} registered
            </span>
          </div>

          {event.isUpcoming && (
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              Register Now <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      <EventTabs
        locale={locale}
        event={event}
        description={description}
        registrations={registrations}
        registrationCount={registrationCount}
        photos={photos}
        isAdmin={isAdmin}
        slug={slug}
      />
    </div>
  )
}
