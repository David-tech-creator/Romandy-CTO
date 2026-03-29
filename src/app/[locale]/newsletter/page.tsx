import { unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import { ArrowLeft, Zap, Brain, Wrench, CalendarDays } from 'lucide-react'
import { BrandLockup } from '@/components/BrandLockup'
import { NewsletterForm } from '@/components/NewsletterForm'

const ORANGE = '#C8834A'
const DARKER = '#252525'
const DARK = '#2D2D2D'
const CARD = '#333333'

const SAMPLE_ISSUE = {
  date: 'March 24, 2026',
  headline: 'Claude gets remote control powers',
  stories: [
    {
      tag: 'ANTHROPIC',
      title: 'Claude can now control your computer',
      body: 'Anthropic shipped Computer Use GA — Claude can now browse, click, and operate any desktop app autonomously. CTOs are already testing it for internal automation workflows.',
    },
    {
      tag: 'OPENAI',
      title: 'GPT-5 enters limited preview',
      body: 'OpenAI began a staged rollout of GPT-5 to enterprise customers. Early benchmarks show a 40% improvement on complex reasoning tasks vs. GPT-4o.',
    },
    {
      tag: 'REGULATION',
      title: 'EU AI Act enforcement begins Q3 2026',
      body: 'The first wave of compliance deadlines under the EU AI Act is now confirmed. High-risk AI systems in HR, credit scoring, and critical infrastructure must be registered by September.',
    },
  ],
  tool: {
    name: 'Cursor',
    description: 'The AI-first code editor. Understands your entire codebase, writes multi-file changes, and explains unfamiliar code on demand. Most engineering teams are already using it.',
  },
  insight: 'The question isn\'t whether to adopt AI coding tools — it\'s how fast your team can unlearn the habits that slow them down. The bottleneck is no longer writing code. It\'s reviewing it.',
}

export default function NewsletterPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)
  const isFr = locale === 'fr'

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111' }}>

      {/* Hero */}
      <section style={{ backgroundColor: DARKER, position: 'relative', overflow: 'hidden', paddingBottom: '5rem' }}>
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,131,74,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

        <div className="max-w-4xl mx-auto px-6 pt-10 pb-0" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm mb-10 text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> {isFr ? 'Retour' : 'Back'}
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <BrandLockup locale={locale} size="md" linked={false} />
            <div style={{ width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.10)' }} />
            <span
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ color: ORANGE, borderColor: `${ORANGE}45`, backgroundColor: `${ORANGE}12` }}
            >
              {isFr ? 'Newsletter hebdo' : 'Weekly newsletter'}
            </span>
          </div>

          <h1
            className="font-black text-white uppercase leading-none mb-4"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', lineHeight: 1.0 }}
          >
            {isFr ? 'L\'IA pour' : 'AI for'}
          </h1>
          <h1
            className="font-black uppercase leading-none mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5rem)', lineHeight: 1.0,
              background: `linear-gradient(135deg, ${ORANGE}, #E0A070)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}
          >
            {isFr ? 'Les CTOs.' : 'CTOs.'}
          </h1>

          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '36rem', lineHeight: 1.7 }}>
            {isFr
              ? 'Les actualités IA les plus importantes pour les leaders technologiques. Les outils à connaître. Les décisions stratégiques. En 3 minutes, chaque lundi.'
              : 'The most important AI news for technology leaders. The tools to know. The strategic moves. In 3 minutes, every Monday.'}
          </p>

          {/* Signup card */}
          <div
            className="p-8 rounded-2xl mb-12"
            style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div style={{ height: 3, background: `linear-gradient(to right, ${ORANGE}, #E0A070)`, borderRadius: '2px 2px 0 0', margin: '-32px -32px 32px' }} />
            <p className="text-sm font-bold tracking-widest uppercase mb-5" style={{ color: ORANGE }}>
              {isFr ? 'Inscription gratuite' : 'Free subscription'}
            </p>
            <NewsletterForm locale={locale} />
          </div>

          {/* What you get */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                Icon: Zap,
                title: isFr ? 'Top 3 de la semaine' : 'Top 3 of the week',
                body: isFr ? 'Les 3 actualités IA les plus importantes pour les décideurs tech.' : 'The 3 most important AI moves for tech decision-makers.',
              },
              {
                Icon: Brain,
                title: isFr ? 'Analyse stratégique' : 'Strategic deep dive',
                body: isFr ? 'Ce que ça signifie concrètement pour votre organisation.' : "What it actually means for your organization.",
              },
              {
                Icon: Wrench,
                title: isFr ? 'Outil de la semaine' : 'Tool of the week',
                body: isFr ? 'Un outil IA que votre équipe devrait évaluer maintenant.' : 'One AI tool your team should evaluate now.',
              },
              {
                Icon: CalendarDays,
                title: isFr ? 'Événements Romandy CTO' : 'Romandy CTO events',
                body: isFr ? 'Restez informé des prochaines soirées et inscriptions.' : 'Stay up to date on upcoming evenings and registrations.',
              },
            ].map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex gap-4 p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${ORANGE}18` }}
                >
                  <Icon size={16} style={{ color: ORANGE }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">{title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample issue */}
      <section className="py-20 px-6" style={{ backgroundColor: DARK }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: ORANGE }}>
            {isFr ? 'Exemple de numéro' : 'Sample issue'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-12">
            {isFr ? 'Voici à quoi ça ressemble' : 'Here\'s what it looks like'}
          </h2>

          {/* Mock email */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#1A1A1A' }}>
            {/* Email header */}
            <div style={{ height: 4, background: `linear-gradient(to right, ${ORANGE}, #E0A070)` }} />
            <div className="px-8 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-1">
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>ROMANDY</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>{SAMPLE_ISSUE.date}</span>
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', textTransform: 'uppercase' }}>CTO</span>
            </div>

            <div className="px-8 py-8">
              {/* Headline */}
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ORANGE }}>
                {isFr ? 'Cette semaine en IA' : 'This week in AI'}
              </p>
              <h3 className="text-xl font-black text-white uppercase mb-6">{SAMPLE_ISSUE.headline}</h3>

              {/* Stories */}
              <div className="flex flex-col gap-4 mb-8">
                {SAMPLE_ISSUE.stories.map((s) => (
                  <div key={s.title} className="flex gap-4 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded shrink-0 h-fit mt-0.5"
                      style={{ background: `${ORANGE}22`, color: ORANGE, letterSpacing: '0.06em' }}
                    >
                      {s.tag}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{s.title}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tool */}
              <div className="p-5 rounded-xl mb-6" style={{ background: `${ORANGE}0D`, border: `1px solid ${ORANGE}30` }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: ORANGE }}>
                  {isFr ? 'Outil de la semaine' : 'Tool of the week'}
                </p>
                <p className="text-sm font-bold text-white mb-1">{SAMPLE_ISSUE.tool.name}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{SAMPLE_ISSUE.tool.description}</p>
              </div>

              {/* CTO insight */}
              <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {isFr ? 'Perspective CTO' : 'CTO perspective'}
                </p>
                <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  &ldquo;{SAMPLE_ISSUE.insight}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: ORANGE }}>
            {isFr ? 'Rejoignez les lecteurs' : 'Join the readers'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-6">
            {isFr ? '3 minutes. Chaque lundi.' : '3 minutes. Every Monday.'}
          </h2>
          <NewsletterForm locale={locale} />
        </div>
      </section>

    </div>
  )
}
