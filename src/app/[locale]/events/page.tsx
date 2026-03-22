import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Users, ArrowLeft } from 'lucide-react'
import { EVENTS } from '@/lib/events'
import { BrandLockup } from '@/components/BrandLockup'

const ORANGE = '#C8834A'
const DARK = '#2D2D2D'
const DARKER = '#252525'
const CARD = '#333333'

export default function EventsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  const upcoming = EVENTS.filter((e) => e.isUpcoming)
  const past = EVENTS.filter((e) => !e.isUpcoming)

  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK }}>
      {/* Page header */}
      <div className="py-14 px-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm mb-8 text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> {t('register.back')}
          </Link>
          <div className="flex items-center gap-6 mb-3">
            <BrandLockup locale={locale} size="lg" linked={false} />
            <div className="w-px h-10 bg-white/10" />
            <h1 className="text-3xl font-black text-white uppercase">{t('events.title')}</h1>
          </div>
          <p className="text-white/45 max-w-xl">{t('events.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: ORANGE }}>
              {t('nextEvent.badge')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {upcoming.map((event) => (
                <Link
                  key={event.slug}
                  href={`/${locale}/events/${event.slug}`}
                  className="group rounded-xl p-6 block card-hover"
                  style={{ backgroundColor: CARD, border: `1px solid ${ORANGE}40` }}
                >
                  <span
                    className="inline-block text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-4"
                    style={{ backgroundColor: `${ORANGE}20`, color: ORANGE }}
                  >
                    {t('nextEvent.badge')}
                  </span>
                  <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#C8834A] transition-colors mb-4">
                    {locale === 'fr' ? event.titleFr : event.title}
                  </h3>
                  <div className="flex flex-col gap-1.5 text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} style={{ color: ORANGE }} /> {event.date} · {event.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} style={{ color: ORANGE }} /> {event.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={12} style={{ color: ORANGE }} /> {event.maxSpots} spots
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: ORANGE }}>
                    {t('events.viewEvent')} <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Past */}
        <section>
          <h2 className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {t('events.past')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {past.map((event) => (
              <Link
                key={event.slug}
                href={`/${locale}/events/${event.slug}`}
                className="group rounded-xl p-6 block card-hover"
                style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-semibold text-white leading-snug group-hover:text-[#C8834A] transition-colors">
                    {locale === 'fr' ? event.titleFr : event.title}
                  </h3>
                  {event.attendees && (
                    <span
                      className="shrink-0 text-xs font-bold rounded-full px-2.5 py-1 whitespace-nowrap"
                      style={{ backgroundColor: `${ORANGE}20`, color: ORANGE }}
                    >
                      {event.attendees} {t('events.attendees')}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} style={{ color: ORANGE }} /> {event.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} style={{ color: ORANGE }} /> {event.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
