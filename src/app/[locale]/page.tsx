import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import {
  Users, Calendar, Star, MapPin, ArrowRight,
  Layers, UserSearch, Cpu, UsersRound, BarChart3, ShieldCheck,
  MessageSquare, BookOpen, Zap,
} from 'lucide-react'
import { UPCOMING_EVENT, PAST_EVENTS } from '@/lib/events'

const MEETUP_URL = 'https://www.meetup.com/romandy-cto-meetup-group/'
// ← Replace with your actual Slack invite link
const SLACK_URL = 'https://join.slack.com/t/romandy-cto/shared_invite/placeholder'

const ORANGE = '#C8834A'
const DARK = '#2D2D2D'
const DARKER = '#252525'
const CARD = '#333333'


export default function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  const topics = [
    { key: 'leadership', icon: ShieldCheck },
    { key: 'architecture', icon: Layers },
    { key: 'recruiting', icon: UserSearch },
    { key: 'technology', icon: Cpu },
    { key: 'teams', icon: UsersRound },
    { key: 'strategy', icon: BarChart3 },
  ] as const

  const pillars: { icon: typeof Calendar; titleKey: string; bodyKey: string; highlight?: boolean }[] = [
    {
      icon: Calendar,
      titleKey: 'connect.events.title',
      bodyKey: 'connect.events.body',
    },
    {
      icon: MessageSquare,
      titleKey: 'connect.slack.title',
      bodyKey: 'connect.slack.body',
      highlight: true,
    },
    {
      icon: BookOpen,
      titleKey: 'connect.knowledge.title',
      bodyKey: 'connect.knowledge.body',
    },
  ]

  return (
    <div className="flex flex-col" style={{ backgroundColor: DARK }}>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 px-6 text-center" style={{ backgroundColor: DARKER }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 55% at 50% 0%, rgba(200,131,74,0.13) 0%, transparent 70%)` }}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Hero brand mark — negative marginBottom collapses the PNG's transparent bottom glow */}
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/logo.png"
              alt="Romandy CTO"
              width={480}
              height={320}
              priority
              style={{ marginBottom: '-88px' }}
            />
            <p className="text-base font-black tracking-[0.28em] uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>
              ROMANDY
            </p>
            <p className="text-6xl sm:text-7xl font-black text-white tracking-tight leading-none">
              CTO
            </p>
          </div>

          {/* Badge */}
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border"
            style={{ color: ORANGE, borderColor: `${ORANGE}40`, backgroundColor: `${ORANGE}12` }}
          >
            {t('hero.badge')}
          </span>

          {/* Headline — kept exactly */}
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase leading-none tracking-tight mb-4">
            {t('hero.title')}
          </h1>

          {/* Subtitle — kept exactly */}
          <p className="text-base text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Primary / secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href={`/${locale}/join`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: ORANGE }}
            >
              {t('nav.joinCommunity')} <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md font-semibold text-white border transition-colors hover:border-white/40"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              {t('hero.ctaEvent')}
            </Link>
          </div>

          {/* Upcoming event strip */}
          <div
            className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-3 rounded-xl text-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: ORANGE }}
            >
              {t('nextEvent.badge')}
            </span>
            <span className="text-white/70">
              {UPCOMING_EVENT.date} · {UPCOMING_EVENT.location}
            </span>
            <Link
              href={`/${locale}/events/${UPCOMING_EVENT.slug}`}
              className="font-semibold transition-colors hover:text-white"
              style={{ color: ORANGE }}
            >
              {t('hero.viewEvent')} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Who's in the room ─────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARK }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white uppercase mb-6">{t('who.title')}</h2>
          <p className="text-xl text-white/60 leading-relaxed">{t('who.body')}</p>
        </div>
      </section>

      {/* ── Three ways to connect ─────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white uppercase mb-4">{t('connect.title')}</h2>
            <p className="text-white/45 max-w-lg mx-auto">{t('connect.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map(({ icon: Icon, titleKey, bodyKey, highlight }) => (
              <div
                key={titleKey}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: highlight ? `${ORANGE}12` : CARD,
                  border: highlight ? `1px solid ${ORANGE}35` : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: highlight ? `${ORANGE}25` : `${ORANGE}18` }}
                >
                  <Icon size={22} style={{ color: ORANGE }} />
                </div>
                <h3 className="text-lg font-black text-white uppercase mb-3">{t(titleKey)}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{t(bodyKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming event ────────────────────────────────────────────── */}
      <section id="next-event" style={{ backgroundColor: DARK, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div
            className="rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-start sm:items-center justify-between"
            style={{ backgroundColor: DARKER, border: `1px solid ${ORANGE}30` }}
          >
            <div className="flex-1">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border"
                style={{ color: ORANGE, borderColor: `${ORANGE}40`, backgroundColor: `${ORANGE}12` }}
              >
                {t('nextEvent.badge')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase leading-tight mb-4">
                {locale === 'fr' ? UPCOMING_EVENT.titleFr : UPCOMING_EVENT.title}
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} style={{ color: ORANGE }} />
                  {UPCOMING_EVENT.date} · {UPCOMING_EVENT.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: ORANGE }} />
                  {UPCOMING_EVENT.location}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
              <span className="text-sm font-bold" style={{ color: ORANGE }}>
                {UPCOMING_EVENT.maxSpots} {t('nextEvent.spotsLeft')}
              </span>
              <Link
                href={`/${locale}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 whitespace-nowrap"
                style={{ backgroundColor: ORANGE }}
              >
                {t('nextEvent.cta')} <ArrowRight size={16} />
              </Link>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {t('nextEvent.free')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Topics ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6" style={{ backgroundColor: DARKER, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white uppercase mb-4">{t('topics.title')}</h2>
            {t('topics.subtitle') && <p className="text-white/45 max-w-lg mx-auto">{t('topics.subtitle')}</p>}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topics.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-xl p-6 card-hover"
                style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${ORANGE}20` }}
                >
                  <Icon size={20} style={{ color: ORANGE }} />
                </div>
                <h3 className="font-bold text-white mb-2">{t(`topics.${key}`)}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {t(`topics.${key}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Past events ───────────────────────────────────────────────── */}
      <section id="events" className="py-24 px-6" style={{ backgroundColor: DARK }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
            <div>
              <h2 className="text-4xl font-black text-white uppercase mb-2">{t('events.headline')}</h2>
              <p className="text-white/45">{t('events.headlineSub')}</p>
            </div>
            <Link
              href={`/${locale}/events`}
              className="shrink-0 text-sm font-semibold transition-colors hover:text-white"
              style={{ color: ORANGE }}
            >
              {t('events.viewArchive')} →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {PAST_EVENTS.slice(0, 4).map((event) => (
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

          <div className="text-center">
            <a
              href={MEETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-white border transition-colors hover:border-white/40"
              style={{ borderColor: 'rgba(255,255,255,0.2)' }}
            >
              {t('events.viewAll')} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Numbers ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: DARKER, borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '510+', label: t('stats.members') },
            { value: '23', label: t('stats.events') },
            { value: '4.8 ★', label: t('stats.rating') },
            { value: t('stats.freeValue'), label: t('stats.free') },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl sm:text-4xl font-black text-white mb-1">{value}</div>
              <div className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dual-path join CTA ────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6" style={{ backgroundColor: DARK }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white uppercase mb-4">{t('joinDual.title')}</h2>
            {t('joinDual.subtitle') && <p className="text-white/50 max-w-md mx-auto">{t('joinDual.subtitle')}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Slack card */}
            <div
              className="rounded-2xl p-8 flex flex-col"
              style={{ backgroundColor: DARKER, border: `1px solid ${ORANGE}30` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${ORANGE}20` }}
              >
                <MessageSquare size={22} style={{ color: ORANGE }} />
              </div>
              <h3 className="text-xl font-black text-white uppercase mb-3">{t('joinDual.slackTitle')}</h3>
              <p className="text-sm text-white/55 leading-relaxed mb-6 flex-1">{t('joinDual.slackBody')}</p>
              <a
                href={SLACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                {t('joinDual.slackCta')} <ArrowRight size={16} />
              </a>
              <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {t('joinDual.free')}
              </p>
            </div>

            {/* Event card */}
            <div
              className="rounded-2xl p-8 flex flex-col"
              style={{ backgroundColor: DARKER, border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${ORANGE}18` }}
              >
                <Zap size={22} style={{ color: ORANGE }} />
              </div>
              <h3 className="text-xl font-black text-white uppercase mb-3">{t('joinDual.eventTitle')}</h3>
              <p className="text-sm text-white/55 leading-relaxed mb-2 flex-1">{t('joinDual.eventBody')}</p>
              <p className="text-xs font-semibold mb-6" style={{ color: ORANGE }}>
                {UPCOMING_EVENT.date} · {UPCOMING_EVENT.location}
              </p>
              <Link
                href={`/${locale}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white border transition-colors hover:border-white/40"
                style={{ borderColor: 'rgba(255,255,255,0.18)' }}
              >
                {t('joinDual.eventCta')} <ArrowRight size={16} />
              </Link>
              <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {t('joinDual.free')}
              </p>
            </div>
          </div>

          {/* Meetup footnote */}
          <p className="text-center text-sm mt-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {t('joinDual.meetupNote')}{' '}
            <a
              href={MEETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/60 transition-colors"
            >
              {t('joinDual.meetupLink')}
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
