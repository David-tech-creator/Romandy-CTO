import { unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users,
  Shield, Cpu, Database, Network, Lock, Sparkles,
} from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { BrandLockup } from '@/components/BrandLockup'

const ORANGE = '#C8834A'
const DARK = '#2D2D2D'
const DARKER = '#252525'
const CARD = '#333333'

const EVENT_NAME = 'Agentic Commerce & the Luxury Industry'
const SLUG = 'innovation-luxury-april-2026'
const MAX_SPOTS = 50

// ─── Agent Mascot SVG ─────────────────────────────────────────────────────────
function AgentMascotSVG() {
  return (
    <svg
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 420, height: 'auto' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="m-glow-lg" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="m-glow-sm" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="m-head-grad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1c1c1c" />
        </radialGradient>
        <radialGradient id="m-body-grad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#303030" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </radialGradient>
        <radialGradient id="m-base-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(200,131,74,0.40)" />
          <stop offset="100%" stopColor="rgba(200,131,74,0)" />
        </radialGradient>
      </defs>

      {/* Background rings — same language as network SVG */}
      <circle cx="200" cy="230" r="145" stroke="rgba(200,131,74,0.05)" strokeWidth="1" />
      <circle cx="200" cy="230" r="108" stroke="rgba(200,131,74,0.08)" strokeWidth="1" />
      <circle cx="200" cy="230" r="72"  stroke="rgba(200,131,74,0.12)" strokeWidth="1" />
      <circle cx="200" cy="230" r="120" stroke="rgba(200,131,74,0.22)" strokeWidth="1" className="ac-ring" />
      <circle cx="200" cy="230" r="120" stroke="rgba(200,131,74,0.22)" strokeWidth="1" className="ac-ring ac-ring-2" />

      {/* Base glow shadow */}
      <ellipse cx="200" cy="398" rx="88" ry="16" fill="url(#m-base-grad)" className="mascot-base" />

      {/* ── Mascot — whole group floats ── */}
      <g className="mascot-float">

        {/* Body */}
        <rect x="148" y="296" width="104" height="82" rx="20"
          fill="url(#m-body-grad)" stroke="rgba(200,131,74,0.18)" strokeWidth="1.5" />
        <line x1="168" y1="320" x2="232" y2="320" stroke="rgba(200,131,74,0.10)" strokeWidth="1" />
        <line x1="168" y1="334" x2="232" y2="334" stroke="rgba(200,131,74,0.07)" strokeWidth="1" />
        {/* Chest indicator */}
        <circle cx="200" cy="352" r="5.5" fill={ORANGE} filter="url(#m-glow-sm)" className="mascot-chest" />
        <circle cx="200" cy="352" r="2.5"  fill="rgba(255,240,210,0.95)" />

        {/* Neck */}
        <rect x="181" y="278" width="38" height="24" rx="8" fill="#222"
          stroke="rgba(200,131,74,0.12)" strokeWidth="1" />
        <line x1="191" y1="284" x2="209" y2="284" stroke="rgba(200,131,74,0.18)" strokeWidth="1" />
        <line x1="191" y1="291" x2="209" y2="291" stroke="rgba(200,131,74,0.11)" strokeWidth="1" />

        {/* Head */}
        <rect x="86" y="125" width="228" height="160" rx="38"
          fill="url(#m-head-grad)" stroke="rgba(200,131,74,0.28)" strokeWidth="1.5" />
        {/* Head top highlight */}
        <rect x="98" y="133" width="105" height="42" rx="22" fill="rgba(255,255,255,0.025)" />

        {/* Ear nubs */}
        <rect x="67"  y="178" width="21" height="38" rx="10.5"
          fill="#252525" stroke="rgba(200,131,74,0.18)" strokeWidth="1" />
        <circle cx="77.5" cy="197" r="4.5" fill="rgba(200,131,74,0.22)" />
        <rect x="312" y="178" width="21" height="38" rx="10.5"
          fill="#252525" stroke="rgba(200,131,74,0.18)" strokeWidth="1" />
        <circle cx="322.5" cy="197" r="4.5" fill="rgba(200,131,74,0.22)" />

        {/* Antenna stem */}
        <rect x="197" y="86" width="6" height="43" rx="3" fill="rgba(200,131,74,0.38)" />
        {/* Antenna ring glow */}
        <circle cx="200" cy="78" r="15" fill="rgba(200,131,74,0.10)" className="mascot-antenna-ring" />
        {/* Antenna orb */}
        <circle cx="200" cy="78" r="9" fill="#252525"
          stroke={ORANGE} strokeWidth="1.5" filter="url(#m-glow-sm)" className="mascot-antenna" />
        <circle cx="200" cy="78" r="4.5" fill={ORANGE} />

        {/* Left eye — diamond */}
        <g filter="url(#m-glow-sm)" className="mascot-eyes">
          <polygon points="146,192 165,211 146,230 127,211" fill={ORANGE} />
          <polygon points="146,201 155,211 146,221 137,211" fill="rgba(255,242,215,0.95)" />
        </g>
        {/* Right eye — diamond */}
        <g filter="url(#m-glow-sm)" className="mascot-eyes">
          <polygon points="254,192 273,211 254,230 235,211" fill={ORANGE} />
          <polygon points="254,201 263,211 254,221 245,211" fill="rgba(255,242,215,0.95)" />
        </g>

        {/* Chin detail */}
        <rect x="178" y="254" width="44" height="5" rx="2.5" fill="rgba(200,131,74,0.10)" />
      </g>

      {/* Rising data particles */}
      <circle r="2.5" fill={ORANGE}>
        <animateMotion dur="3s" repeatCount="indefinite" begin="0s"
          path="M340,210 Q355,165 340,110" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
        <animate attributeName="opacity" values="0;0.65;0" dur="3s" repeatCount="indefinite" begin="0s" />
      </circle>
      <circle r="2" fill={ORANGE}>
        <animateMotion dur="2.6s" repeatCount="indefinite" begin="1.1s"
          path="M62,210 Q48,168 62,115" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
        <animate attributeName="opacity" values="0;0.50;0" dur="2.6s" repeatCount="indefinite" begin="1.1s" />
      </circle>
      <circle r="1.8" fill={ORANGE}>
        <animateMotion dur="3.6s" repeatCount="indefinite" begin="1.9s"
          path="M322,245 Q345,198 328,150" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
        <animate attributeName="opacity" values="0;0.40;0" dur="3.6s" repeatCount="indefinite" begin="1.9s" />
      </circle>
    </svg>
  )
}

// ─── Agent Network SVG ────────────────────────────────────────────────────────
function AgentNetworkSVG() {
  return (
    <svg
      viewBox="0 0 480 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 480, height: 'auto' }}
      aria-hidden="true"
    >
      {/* Background rings */}
      <circle cx="240" cy="190" r="130" stroke="rgba(200,131,74,0.06)" strokeWidth="1" />
      <circle cx="240" cy="190" r="95" stroke="rgba(200,131,74,0.09)" strokeWidth="1" />
      <circle cx="240" cy="190" r="58" stroke="rgba(200,131,74,0.13)" strokeWidth="1" />

      {/* Expanding pulse rings */}
      <circle cx="240" cy="190" r="105" stroke="rgba(200,131,74,0.28)" strokeWidth="1" className="ac-ring" />
      <circle cx="240" cy="190" r="105" stroke="rgba(200,131,74,0.28)" strokeWidth="1" className="ac-ring ac-ring-2" />
      <circle cx="240" cy="190" r="105" stroke="rgba(200,131,74,0.28)" strokeWidth="1" className="ac-ring ac-ring-3" />

      {/* Dot grid subtle overlay */}
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.04)" />
      </pattern>
      <rect width="480" height="380" fill="url(#dots)" />

      {/* ── Lines: User → Agent ── */}
      <line x1="72" y1="190" x2="192" y2="190"
        stroke="rgba(200,131,74,0.55)" strokeWidth="1.5"
        strokeDasharray="6 4" className="ac-flow" />

      {/* ── Lines: Agent → endpoints ── */}
      {/* → Brand Agent top */}
      <line x1="290" y1="165" x2="400" y2="80"
        stroke="rgba(200,131,74,0.40)" strokeWidth="1.5"
        strokeDasharray="6 4" className="ac-flow-slow" />
      {/* → Commerce API mid */}
      <line x1="292" y1="188" x2="405" y2="188"
        stroke="rgba(200,131,74,0.40)" strokeWidth="1.5"
        strokeDasharray="6 4" className="ac-flow" />
      {/* → Retail Agent bottom */}
      <line x1="290" y1="215" x2="400" y2="295"
        stroke="rgba(200,131,74,0.40)" strokeWidth="1.5"
        strokeDasharray="6 4" className="ac-flow-slow" />
      {/* → Digital Passport (down) */}
      <line x1="250" y1="238" x2="260" y2="325"
        stroke="rgba(200,131,74,0.28)" strokeWidth="1.5"
        strokeDasharray="5 5" className="ac-flow" />

      {/* ── Data-packet moving dots ── */}
      {/* These are purely decorative — animated via CSS motion path workaround: 
          we use a circle + animateMotion (SVG SMIL, supported in all modern browsers) */}
      <circle r="3" fill={ORANGE} opacity="0.8">
        <animateMotion dur="2s" repeatCount="indefinite"
          path="M72,190 L192,190" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      </circle>
      <circle r="2.5" fill={ORANGE} opacity="0.6">
        <animateMotion dur="2.2s" repeatCount="indefinite" begin="0.8s"
          path="M290,165 L400,80" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      </circle>
      <circle r="2.5" fill={ORANGE} opacity="0.6">
        <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.4s"
          path="M292,188 L405,188" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      </circle>
      <circle r="2.5" fill={ORANGE} opacity="0.6">
        <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.2s"
          path="M290,215 L400,295" keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      </circle>

      {/* ── User node ── */}
      <circle cx="52" cy="190" r="30" fill={CARD} stroke="rgba(200,131,74,0.30)" strokeWidth="1.5" />
      <text x="52" y="186" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="8" fontFamily="system-ui,sans-serif" fontWeight="600">You</text>
      <text x="52" y="197" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="6.5" fontFamily="system-ui,sans-serif">(intent)</text>

      {/* ── Agent node (center, glowing) ── */}
      {/* outer glow */}
      <circle cx="240" cy="190" r="56" fill="rgba(200,131,74,0.08)" className="ac-glow" />
      {/* mid ring */}
      <circle cx="240" cy="190" r="44" fill={DARKER} stroke="rgba(200,131,74,0.50)" strokeWidth="1.5" />
      {/* inner fill */}
      <circle cx="240" cy="190" r="38" fill={DARKER} />
      {/* label */}
      <text x="240" y="184" textAnchor="middle" fill={ORANGE} fontSize="9.5" fontWeight="900" fontFamily="system-ui,sans-serif" letterSpacing="2">AI</text>
      <text x="240" y="197" textAnchor="middle" fill={ORANGE} fontSize="8.5" fontWeight="700" fontFamily="system-ui,sans-serif" letterSpacing="1">AGENT</text>

      {/* ── Endpoint nodes ── */}
      {/* Brand Agent */}
      <circle cx="418" cy="72" r="28" fill={CARD} stroke="rgba(200,131,74,0.22)" strokeWidth="1.5" />
      <text x="418" y="68" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="system-ui,sans-serif" fontWeight="600">Brand</text>
      <text x="418" y="78" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="system-ui,sans-serif" fontWeight="600">Agent</text>

      {/* Commerce API */}
      <circle cx="428" cy="188" r="28" fill={CARD} stroke="rgba(200,131,74,0.22)" strokeWidth="1.5" />
      <text x="428" y="184" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5" fontFamily="system-ui,sans-serif" fontWeight="600">Commerce</text>
      <text x="428" y="195" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="6.5" fontFamily="system-ui,sans-serif" fontWeight="600">API</text>

      {/* Retail Agent */}
      <circle cx="418" cy="305" r="28" fill={CARD} stroke="rgba(200,131,74,0.22)" strokeWidth="1.5" />
      <text x="418" y="301" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="system-ui,sans-serif" fontWeight="600">Retail</text>
      <text x="418" y="311" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="system-ui,sans-serif" fontWeight="600">Agent</text>

      {/* Digital Product Passport */}
      <circle cx="262" cy="342" r="24" fill={CARD} stroke="rgba(200,131,74,0.18)" strokeWidth="1.5" />
      <text x="262" y="338" textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="6" fontFamily="system-ui,sans-serif">Digital</text>
      <text x="262" y="348" textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="6" fontFamily="system-ui,sans-serif">Passport</text>

      {/* ── Flow labels ── */}
      <text x="130" y="180" textAnchor="middle" fill="rgba(200,131,74,0.45)" fontSize="7" fontFamily="system-ui,sans-serif">intent</text>
      <text x="358" y="120" textAnchor="middle" fill="rgba(200,131,74,0.35)" fontSize="7" fontFamily="system-ui,sans-serif">query</text>
      <text x="368" y="183" textAnchor="middle" fill="rgba(200,131,74,0.35)" fontSize="7" fontFamily="system-ui,sans-serif">negotiate</text>
      <text x="360" y="268" textAnchor="middle" fill="rgba(200,131,74,0.35)" fontSize="7" fontFamily="system-ui,sans-serif">verify</text>
    </svg>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function AgenticCommercePage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  let registrationCount = 0
  let isAdmin = false

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { count } = await supabase
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_name', EVENT_NAME)
      registrationCount = count ?? 0
    } catch {
      // Supabase unavailable
    }
  }

  try {
    const { sessionClaims } = await auth()
    isAdmin = (sessionClaims?.metadata as { role?: string })?.role === 'admin'
  } catch {
    // Auth unavailable
  }

  const spotsLeft = Math.max(0, MAX_SPOTS - registrationCount)

  return (
    <div style={{ backgroundColor: DARK, minHeight: '100vh' }}>

      {/* ── Keyframes ──────────────────────────────────────────────── */}
      <style>{`
        @keyframes ac-ring-expand {
          0%   { transform: scale(0.75); opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        @keyframes ac-dash-flow {
          to { stroke-dashoffset: -10; }
        }
        @keyframes ac-dash-flow-slow {
          to { stroke-dashoffset: -10; }
        }
        @keyframes ac-glow-pulse {
          0%, 100% { opacity: 0.08; }
          50%       { opacity: 0.22; }
        }
        @keyframes ac-hero-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ac-ring {
          animation: ac-ring-expand 3s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .ac-ring-2 { animation-delay: 1s; }
        .ac-ring-3 { animation-delay: 2s; }

        .ac-flow      { stroke-dasharray: 6 4; animation: ac-dash-flow      1.6s linear infinite; }
        .ac-flow-slow { stroke-dasharray: 6 4; animation: ac-dash-flow-slow  2.4s linear infinite; }

        .ac-glow { animation: ac-glow-pulse 2.5s ease-in-out infinite; }

        .ac-h1 { animation: ac-hero-up 0.65s ease-out 0.10s both; }
        .ac-h2 { animation: ac-hero-up 0.65s ease-out 0.22s both; }
        .ac-h3 { animation: ac-hero-up 0.65s ease-out 0.34s both; }
        .ac-h4 { animation: ac-hero-up 0.65s ease-out 0.46s both; }
        .ac-h5 { animation: ac-hero-up 0.65s ease-out 0.58s both; }

        .ac-topic-card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .ac-topic-card:hover {
          transform: translateY(-5px);
          border-color: rgba(200,131,74,0.45) !important;
          box-shadow: 0 16px 48px -8px rgba(200,131,74,0.18);
        }
        .ac-speaker-card {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .ac-speaker-card:hover {
          border-color: rgba(200,131,74,0.50) !important;
          box-shadow: 0 24px 64px -12px rgba(200,131,74,0.20);
        }

        @keyframes mascot-float-anim {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes mascot-eyes-pulse {
          0%, 100% { opacity: 1; }
          45%, 55% { opacity: 0.60; }
        }
        @keyframes mascot-antenna-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.70; }
        }
        @keyframes mascot-antenna-ring-pulse {
          0%, 100% { opacity: 0.10; transform: scale(1);   }
          50%       { opacity: 0.28; transform: scale(1.25); }
        }
        @keyframes mascot-base-pulse {
          0%, 100% { opacity: 0.80; transform: scaleX(1);    }
          50%       { opacity: 1;    transform: scaleX(1.10); }
        }
        @keyframes mascot-chest-pulse {
          0%, 100% { opacity: 0.75; }
          50%       { opacity: 1; }
        }

        .mascot-float         { animation: mascot-float-anim       4s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
        .mascot-eyes          { animation: mascot-eyes-pulse        2.8s ease-in-out infinite; }
        .mascot-antenna       { animation: mascot-antenna-pulse     2s ease-in-out infinite; }
        .mascot-antenna-ring  { animation: mascot-antenna-ring-pulse 2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .mascot-base          { animation: mascot-base-pulse        4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        .mascot-chest         { animation: mascot-chest-pulse       2s ease-in-out infinite; }
      `}</style>

      {/* ── Back nav ────────────────────────────────────────────────── */}
      <div className="px-6 pt-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-6xl mx-auto">
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> All Events
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: DARKER,
          paddingTop: '3rem',
          paddingBottom: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Hero background image */}
        <img
          src="/agentic.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.18, pointerEvents: 'none',
          }}
        />
        {/* Gradient scrim — ensures left text stays legible */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(37,37,37,0.97) 45%, rgba(37,37,37,0.75) 70%, rgba(37,37,37,0.4) 100%)',
        }} />
        {/* Dot grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(200,131,74,0.07) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />

        <div className="max-w-6xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — text */}
            <div>
              <div className="flex items-center gap-4 mb-8 ac-h1">
                <BrandLockup locale={locale} size="md" linked={false} />
                <div style={{ width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.10)' }} />
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
                  style={{ color: ORANGE, borderColor: `${ORANGE}45`, backgroundColor: `${ORANGE}12` }}
                >
                  April 30, 2026
                </span>
              </div>

              <p className="text-xs font-bold tracking-widest uppercase mb-3 ac-h2" style={{ color: ORANGE }}>
                Romandy CTO — Evening Session
              </p>

              <h1
                className="font-black text-white uppercase leading-none mb-2 ac-h3"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', lineHeight: 1.02 }}
              >
                Agentic
              </h1>
              <h1
                className="text-gradient-orange font-black uppercase leading-none mb-4 ac-h3"
                style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5rem)', lineHeight: 1.02 }}
              >
                Commerce
              </h1>
              <h2
                className="font-black uppercase mb-8 ac-h3"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: 'rgba(255,255,255,0.50)', lineHeight: 1.2 }}
              >
                & the Luxury Industry
              </h2>

              <div className="mb-10 ac-h3" style={{ maxWidth: '38rem' }}>
                <p className="text-base leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  AI agents can now research products, negotiate prices, and complete purchases autonomously — without a consumer ever visiting your site. A $3–5 trillion shift is already underway.
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  For luxury, the stakes are different. When an agent becomes the customer, what happens to the story, the emotion, and the human connection that make a brand irreplaceable?
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-10 ac-h4">
                {[
                  { Icon: Calendar, text: 'Wednesday, April 30, 2026' },
                  { Icon: Clock,    text: '7:00 PM CET — Doors open at 19:00' },
                  { Icon: MapPin,   text: 'Antaes, GBC – Avenue des Morgines 12, Petit-Lancy' },
                  { Icon: Users,    text: `${spotsLeft} spots remaining · Free admission` },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    <Icon size={14} style={{ color: ORANGE, flexShrink: 0, marginTop: 2 }} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 ac-h5">
                <Link
                  href={`/${locale}/register`}
                  className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 hover:opacity-95"
                  style={{ backgroundColor: ORANGE }}
                >
                  Reserve Your Spot <ArrowRight size={16} />
                </Link>
                <div
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}
                >
                  Free · Registration required
                </div>
              </div>
            </div>

            {/* Right — AI agent mascot */}
            <div className="hidden lg:flex items-center justify-center" style={{ position: 'relative', zIndex: 1 }}>
              <img
                src="/agentic6.jpg"
                alt="AI agent"
                style={{
                  width: '100%',
                  maxWidth: 420,
                  height: 'auto',
                  borderRadius: '1.5rem',
                  objectFit: 'cover',
                  filter: 'drop-shadow(0 0 48px rgba(200,131,74,0.35))',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SPEAKERS                                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: DARKER }}>
        <div className="sonar-ring" style={{ opacity: 0.30 }} />
        <div className="sonar-ring sonar-ring-2" style={{ opacity: 0.30 }} />
        <div className="sonar-ring sonar-ring-3" style={{ opacity: 0.30 }} />

        <div className="max-w-4xl mx-auto relative">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: ORANGE }}>
            The Speakers
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-14">
            Two perspectives, one evening
          </h2>

          <div className="flex flex-col gap-6">

            {/* ── Pedro ─────────────────────────────────────────────── */}
            <div
              className="ac-speaker-card rounded-2xl p-8"
              style={{ backgroundColor: DARK, border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden" style={{ border: `1px solid ${ORANGE}40` }}>
                    <img
                      src="/pedro.png"
                      alt="Pedro López-Belmonte"
                      width={64}
                      height={64}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05)' }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-white">Pedro López-Belmonte</h3>
                    <span
                      className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${ORANGE}22`, color: ORANGE }}
                    >
                      CTO &amp; Architecture Lens
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Technology Strategist · Former Innovation Lead, Richemont Group
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    For over twelve years at Richemont — home to Cartier, Vacheron Constantin, IWC, and other Maisons —
                    Pedro led technology innovation initiatives focused on digital identity, blockchain, and product
                    traceability, helping secure centuries-old legacies while preparing them for the digital paradigm.
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    Named among the{' '}
                    <strong className="text-white/90">Top Luxury Speakers of the World 2026</strong>
                    {' '}by the World Luxury Chamber of Commerce alongside 59 global peers.
                    His work on agentic commerce — including first-hand experiments using AI agents to navigate
                    luxury retail — forms the backbone of this evening&apos;s discussion.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Blockchain', 'Digital Product Passports', 'Luxury Tech', 'Agentic Commerce', 'Digital Identity', 'Richemont'].map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.09)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Frédéric ──────────────────────────────────────────── */}
            <div
              className="ac-speaker-card rounded-2xl p-8"
              style={{ backgroundColor: DARK, border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
                    <img
                      src="/frederic.png"
                      alt="Frédéric Desmaison"
                      width={64}
                      height={64}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.05)' }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-black text-white">Frédéric Desmaison</h3>
                    <span
                      className="text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.50)' }}
                    >
                      Strategy &amp; Technology Lens
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Technology Director &amp; Senior Advisor
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    A passionate digital executive who combines strategic vision with high-quality execution,
                    Frédéric brings people and technology to serve end customers. He looks beyond the technical
                    architecture to ask the harder question: is this the right move for the business and the customer?
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    His perspective grounds the discussion in operational reality — the challenges of transition,
                    the expectations of luxury consumers, and the leadership required to navigate a paradigm shift
                    without losing what makes a brand irreplaceable.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Digital Strategy', 'Technology Leadership', 'Commerce Architecture', 'Customer Experience', 'Executive Advisory'].map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.09)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* THE INFLECTION POINT                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="orb orb-orange orb-sm" style={{ position: 'absolute', top: 0, right: '10%', opacity: 0.12 }} />
        <div className="max-w-4xl mx-auto">

          <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: ORANGE }}>
            The Inflection Point
          </p>

          <blockquote
            className="text-2xl sm:text-3xl lg:text-[2.4rem] font-black text-white leading-tight mb-6"
            style={{ borderLeft: `3px solid ${ORANGE}`, paddingLeft: '1.5rem' }}
          >
            &ldquo;AI becomes the compass,<br />
            but the boutique<br />
            remains the destination.&rdquo;
          </blockquote>
          <p className="text-sm mb-16" style={{ color: 'rgba(255,255,255,0.32)', paddingLeft: '1.5rem' }}>
            — Pedro López-Belmonte, Technology Strategist · Top Luxury Speaker of the World 2026
          </p>

          {/* Visual — AI & commerce */}
          <div className="mb-16 rounded-2xl overflow-hidden" style={{ maxWidth: '42rem' }}>
            <img
              src="/agentic4.jpeg"
              alt="AI transforming commerce"
              style={{ width: '100%', height: 280, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>

          <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '42rem' }}>
            Pedro used three AI agents to buy a luxury coat. They excelled at discovery — then hit a wall. Incomplete 
            product data. No direct commerce integrations. No trust. He ended up doing what he&apos;s always done: visiting
            the boutique.
          </p>
          <p className="text-lg leading-relaxed mb-16" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '42rem' }}>
            That gap between promise and reality is exactly where technology leaders in luxury must act. Agentic commerce
            isn&apos;t coming — it&apos;s already here, fragmented, and waiting for the right architecture.
          </p>

          <div className="gradient-rule mb-16" />

          {/* Stats band */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                value: '$3–5T',
                label: 'Global agentic commerce opportunity by 2030 — $1T from US B2C retail alone',
                source: 'Industry research, 2025',
              },
              {
                value: '50%',
                label: 'of consumers now use AI when searching the internet — up from near zero in 2022',
                source: 'Industry research, 2025',
              },
              {
                value: '3 models',
                label: 'Agent-to-site · Agent-to-agent · Brokered agent · All emerging simultaneously',
                source: 'How commerce flows today',
              },
            ].map(({ value, label, source }) => (
              <div
                key={value}
                className="rounded-2xl p-7"
                style={{ backgroundColor: DARKER, border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="text-4xl sm:text-5xl font-black mb-3 text-gradient-orange"
                >
                  {value}
                </div>
                <p className="text-sm text-white/70 leading-snug mb-2">{label}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>{source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* THE EVENING                                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6" style={{ backgroundColor: DARKER }}>
        <div className="max-w-4xl mx-auto">

          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: ORANGE }}>
            The Evening
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-14">
            How the night unfolds
          </h2>

          {/* Timeline */}
          <div className="flex flex-col mb-16">
            {([
              { time: '19:00 – 19:20', label: 'Introduction to Agentic Commerce', sub: 'A short framing presentation to level-set the room on where we are today', highlight: false },
              { time: '19:20', label: 'Panel Discussion & Open Q&A', sub: 'Architecture · Strategy · The luxury paradox. Open, conversational, practitioner-led — the room drives the conversation.', highlight: true },
              { time: '20:30', label: 'Drinks & Networking', sub: 'Continue the conversation informally', highlight: false },
            ] as const).map(({ time, label, sub, highlight }, i, arr) => (
              <div key={time} className="flex gap-5 items-start">
                {/* Dot + vertical line */}
                <div className="flex flex-col items-center" style={{ width: 44, flexShrink: 0 }}>
                  <div
                    className="w-3 h-3 rounded-full mt-1 shrink-0"
                    style={{
                      backgroundColor: highlight ? ORANGE : 'transparent',
                      border: `2px solid ${highlight ? ORANGE : 'rgba(200,131,74,0.35)'}`,
                    }}
                  />
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 36, marginTop: 4, backgroundColor: 'rgba(200,131,74,0.18)' }} />
                  )}
                </div>

                <div className="pb-7">
                  <span className="inline-block text-xs font-mono font-bold mb-1" style={{ color: ORANGE }}>
                    {time}
                  </span>
                  <p
                    className="font-bold text-sm mb-0.5"
                    style={{ color: highlight ? 'white' : 'rgba(255,255,255,0.80)' }}
                  >
                    {label}
                  </p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual break */}
          <div className="mb-14 rounded-2xl overflow-hidden">
            <img
              src="/agentic2.jpg"
              alt="The evening ahead"
              style={{ width: '100%', height: 260, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>

          {/* Two lenses */}
          <h3 className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Two perspectives, one panel
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-7"
              style={{ backgroundColor: `${ORANGE}0D`, border: `1px solid ${ORANGE}35` }}
            >
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: `${ORANGE}22`, color: ORANGE }}
              >
                CTO &amp; Architecture Lens
              </span>
              <h3 className="text-lg font-black text-white mb-3">Pedro López-Belmonte</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                The infrastructure reality: protocols (MCP, A2A, ACP), system design patterns, agent-ready data architecture, 
                identity management, and the role of blockchain &amp; digital product passports.
              </p>
            </div>
            <div
              className="rounded-2xl p-7"
              style={{ backgroundColor: CARD, border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}
              >
                Strategy &amp; Technology Lens
              </span>
              <h3 className="text-lg font-black text-white mb-3">Frédéric Desmaison</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                The strategic imperative: what agentic commerce means for brand positioning, customer relationships, and 
                the real challenges faced by companies already experimenting today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* DISCUSSION THEMES                                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        <div className="orb orb-orange orb-md" style={{ position: 'absolute', bottom: -80, right: -80, opacity: 0.11 }} />
        <div className="orb orb-orange orb-sm" style={{ position: 'absolute', top: 40, left: '5%', opacity: 0.08 }} />

        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: ORANGE }}>
            Discussion Themes
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-14">
            What we&apos;ll unpack
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {([
              {
                Icon: Network,
                num: '01',
                title: 'From Omnichannel to Agent-Driven Architectures',
                body: 'How do you re-architect a commerce stack built for humans browsing websites — not agents traversing APIs at scale?',
              },
              {
                Icon: Shield,
                num: '02',
                title: 'Trust, Risks & Bottlenecks',
                body: 'Who is responsible when an agent makes a wrong purchase? How do brands build agent-safe guardrails without killing the experience?',
              },
              {
                Icon: Cpu,
                num: '03',
                title: 'Protocols: MCP, A2A, ACP',
                body: 'The emerging technical standards enabling agent interoperability. What they are, what they still lack, and what adoption looks like in practice.',
              },
              {
                Icon: Database,
                num: '04',
                title: 'Blockchain & Digital Product Passports',
                body: 'Verified product data at the protocol level — not just marketing copy. On-chain provenance and traceability as the foundation for agent-ready luxury.',
              },
              {
                Icon: Lock,
                num: '05',
                title: 'Is Your Brand Data Agent-Ready?',
                body: 'Agents need structured, trusted, real-time data. Most luxury brands don\'t have it. What does "agent-ready" data infrastructure actually look like?',
              },
              {
                Icon: Sparkles,
                num: '06',
                title: 'The Luxury Paradox',
                body: 'Luxury sells on emotion, story, and human connection. Can an AI agent ever close that loop — or does the boutique always remain the destination?',
              },
            ] as const).map(({ Icon, num, title, body }) => (
              <div
                key={num}
                className="ac-topic-card rounded-2xl p-6"
                style={{ backgroundColor: DARKER, border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${ORANGE}18` }}
                  >
                    <Icon size={19} style={{ color: ORANGE }} />
                  </div>
                  <span className="text-xs font-black text-white/20">{num}</span>
                </div>
                <h3 className="font-black text-white text-sm leading-snug mb-3">{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{body}</p>
              </div>
            ))}
          </div>

          {/* Visual — AI winding the human (automation paradox) */}
          <div className="mt-12 rounded-2xl overflow-hidden">
            <img
              src="/agentic3.jpg"
              alt="AI agents taking control of commerce"
              style={{ width: '100%', height: 300, objectFit: 'cover', objectPosition: 'center 30%', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* REGISTER CTA                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: DARK }}>
        {/* Lightbulb background image */}
        <img
          src="/agentic5.jpeg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: 0.12, pointerEvents: 'none',
          }}
        />
        <div className="orb orb-orange orb-lg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.20 }} />

        <div className="relative max-w-2xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8 border"
            style={{ color: ORANGE, borderColor: `${ORANGE}45`, backgroundColor: `${ORANGE}12` }}
          >
            {spotsLeft} of {MAX_SPOTS} spots remaining
          </span>

          <h2
            className="font-black text-white uppercase leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Join the<br />conversation
          </h2>

          <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.48)' }}>
            Wednesday, April 30 · 7:00 PM CET
          </p>
          <p className="text-sm mb-12" style={{ color: 'rgba(255,255,255,0.32)' }}>
            Antaes, GBC – Avenue des Morgines 12, Petit-Lancy
          </p>

          <Link
            href={`/${locale}/register`}
            className="btn-glow inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105 hover:opacity-95"
            style={{ backgroundColor: ORANGE }}
          >
            Reserve Your Spot <ArrowRight size={20} />
          </Link>

          <p className="text-sm mt-6" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Always free. No catch. Registration closes when spots run out.
          </p>
        </div>
      </section>

    </div>
  )
}
