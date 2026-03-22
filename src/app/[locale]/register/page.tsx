import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { Calendar, MapPin, ArrowLeft } from 'lucide-react'
import { RegisterForm } from '@/components/RegisterForm'
import { UPCOMING_EVENT } from '@/lib/events'
import { BrandLockup } from '@/components/BrandLockup'

const DARKER = '#252525'
const CARD = '#333333'
const ORANGE = '#C8834A'

export default function RegisterPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  const formTranslations = {
    firstName: t('register.firstName'),
    lastName: t('register.lastName'),
    email: t('register.email'),
    company: t('register.company'),
    jobTitle: t('register.jobTitle'),
    submit: t('register.submit'),
    success: t('register.success'),
    successSub: t('register.successSub'),
    alreadyRegistered: t('register.alreadyRegistered'),
    error: t('register.error'),
    optional: t('register.optional'),
  }

  return (
    <div style={{ backgroundColor: DARKER, minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Back link */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} /> {t('register.back')}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: event info */}
          <div>
            <div className="mb-8">
              <BrandLockup locale={locale} size="lg" linked={false} />
            </div>

            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border"
              style={{ color: ORANGE, borderColor: `${ORANGE}40`, backgroundColor: `${ORANGE}12` }}
            >
              {t('nextEvent.badge')}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight mb-6">
              {t('nextEvent.title')}
            </h1>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Calendar size={15} style={{ color: ORANGE }} />
                <span>{t('nextEvent.date')} · {t('nextEvent.time')}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin size={15} style={{ color: ORANGE }} />
                <span>{t('nextEvent.location')}</span>
              </div>
            </div>

            <p className="text-white/50 leading-relaxed mb-8">{t('nextEvent.description')}</p>

            <div
              className="rounded-xl p-5 text-sm"
              style={{ backgroundColor: `${ORANGE}15`, border: `1px solid ${ORANGE}30` }}
            >
              <span style={{ color: ORANGE }} className="font-bold">
                {UPCOMING_EVENT.maxSpots} {t('nextEvent.spotsLeft')}
              </span>
              <span className="text-white/40 ml-2">{t('nextEvent.spotsNote')}</span>
            </div>
          </div>

          {/* Right: form */}
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <h2 className="text-xl font-black text-white uppercase mb-1">{t('register.title')}</h2>
            <p className="text-sm text-white/40 mb-8">{t('register.subtitle')}</p>

            <RegisterForm
              eventName={UPCOMING_EVENT.title}
              locale={locale}
              translations={formTranslations}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
