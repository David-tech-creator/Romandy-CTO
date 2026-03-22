import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowLeft, Users, Calendar, Zap } from 'lucide-react'
import { JoinForm } from '@/components/JoinForm'
import { BrandLockup } from '@/components/BrandLockup'

const ORANGE = '#C8834A'
const DARK = '#2D2D2D'
const DARKER = '#252525'

export default function JoinPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <div className="min-h-screen" style={{ backgroundColor: DARK }}>
      <div className="max-w-5xl mx-auto px-6 py-12">

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm mb-10 text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> {t('register.back')}
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left: info */}
          <div>
            <div className="mb-8">
              <BrandLockup locale={locale} size="lg" linked={false} />
            </div>

            <h1 className="text-4xl font-black text-white uppercase leading-tight mb-4">
              {t('join.title')}
            </h1>
            <p className="text-white/55 leading-relaxed mb-10 text-lg">
              {t('join.subtitle')}
            </p>

            <div className="flex flex-col gap-5">
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
                  <p className="text-sm text-white/60 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className="rounded-2xl p-8"
            style={{ backgroundColor: DARKER, border: `1px solid rgba(255,255,255,0.08)` }}
          >
            <JoinForm locale={locale} />
          </div>
        </div>
      </div>
    </div>
  )
}
