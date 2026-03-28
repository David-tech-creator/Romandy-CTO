import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft, Users, Calendar, Zap } from 'lucide-react'
import { JoinForm } from '@/components/JoinForm'
import { BrandLockup } from '@/components/BrandLockup'

const ORANGE = '#C8834A'
const DARKER = '#252525'

export default function JoinPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <div
      className="min-h-screen"
      style={{ position: 'relative', backgroundColor: '#111' }}
    >
      {/* Background image */}
      <img
        src="/og-image.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.18,
        }}
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.6) 60%, rgba(17,17,17,0.85) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-12 sm:pb-16">

          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm mb-6 sm:mb-10 text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} /> {t('register.back')}
          </Link>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">

            {/* Left: info */}
            <div>
              <div className="mb-4 sm:mb-8">
                <BrandLockup locale={locale} size="lg" linked={false} />
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight mb-3 sm:mb-4">
                {t('join.title')}
              </h1>
              <p className="text-white/70 leading-relaxed mb-6 sm:mb-10 text-base sm:text-lg">
                {t('join.subtitle')}
              </p>

              {/* Benefits — hidden on mobile to keep it clean */}
              <div className="hidden sm:flex flex-col gap-5 mb-8">
                {[
                  { icon: Calendar, text: t('join.benefit1') },
                  { icon: Zap, text: t('join.benefit2') },
                  { icon: Users, text: t('join.benefit3') },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: `${ORANGE}20` }}
                    >
                      <Icon size={15} style={{ color: ORANGE }} />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div
              className="rounded-2xl p-5 sm:p-8"
              style={{
                backgroundColor: `${DARKER}e6`,
                border: `1px solid rgba(255,255,255,0.08)`,
                backdropFilter: 'blur(12px)',
              }}
            >
              <JoinForm locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
