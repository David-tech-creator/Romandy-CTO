import { unstable_setRequestLocale } from 'next-intl/server'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Users,
  Shield, Cpu, Network, Lock, Sparkles,
} from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { BrandLockup } from '@/components/BrandLockup'
import ScrollReveal from '@/components/ScrollReveal'

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
      style={{ width: '100%', maxWidth: 780, height: 'auto' }}
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
      <clipPath id="robot-clip">
        <circle cx="240" cy="190" r="70" />
      </clipPath>
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
      {/* outer glow pulse */}
      <circle cx="240" cy="190" r="92" fill="rgba(200,131,74,0.08)" className="ac-glow" />
      <circle cx="240" cy="190" r="92" fill="rgba(200,131,74,0.06)" className="ac-glow ac-ring-2" />
      {/* mid ring */}
      <circle cx="240" cy="190" r="76" fill={DARKER} stroke="rgba(200,131,74,0.55)" strokeWidth="2" />
      {/* robot image clipped to circle */}
      <image
        href="/agentic6.jpg"
        x="170" y="120" width="140" height="140"
        clipPath="url(#robot-clip)"
        preserveAspectRatio="xMidYMid slice"
      />
      {/* amber ring over image */}
      <circle cx="240" cy="190" r="70" fill="none" stroke={ORANGE} strokeWidth="2.5" opacity="0.8" />

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
  const isFr = locale === 'fr'

  const T = {
    // Navigation
    allEvents: isFr ? 'Tous les événements' : 'All Events',

    // Hero
    dateLabel: isFr ? '30 avril 2026' : 'April 30, 2026',
    eveningSession: isFr ? 'Romandy CTO — Soirée' : 'Romandy CTO — Evening Session',
    luxurySubtitle: isFr ? '& l\'industrie du luxe' : '& the Luxury Industry',
    heroPara1: isFr
      ? 'Les agents IA peuvent désormais rechercher des produits, négocier des prix et finaliser des achats de manière autonome — sans que le consommateur visite jamais votre site. Un basculement de 3 à 5 milliers de milliards de dollars est déjà en cours.'
      : 'AI agents can now research products, negotiate prices, and complete purchases autonomously — without a consumer ever visiting your site. A $3–5 trillion shift is already underway.',
    heroPara2: isFr
      ? 'Pour le luxe, les enjeux sont différents. Quand un agent devient le client, que devient l\'histoire, l\'émotion et la connexion humaine qui rendent une marque irremplaçable ?'
      : 'For luxury, the stakes are different. When an agent becomes the customer, what happens to the story, the emotion, and the human connection that make a brand irreplaceable?',
    heroDate: isFr ? 'Mercredi 30 avril 2026' : 'Wednesday, April 30, 2026',
    heroTime: isFr ? '19h00 CET — Portes ouvertes dès 19h' : '7:00 PM CET — Doors open at 19:00',
    heroLocation: 'Antaes, GBC – Avenue des Morgines 12, Petit-Lancy',
    heroSpots: (spotsLeft: number) => isFr ? `${spotsLeft} places restantes · Entrée gratuite` : `${spotsLeft} spots remaining · Free admission`,
    reserveSpot: isFr ? 'Réserver ma place' : 'Reserve Your Spot',
    freeAdmission: isFr ? 'Gratuit · Inscription requise' : 'Free · Registration required',

    // Speakers section
    theSpeakers: isFr ? 'Les Intervenants' : 'The Speakers',
    twoPerspectives: isFr ? 'Deux perspectives, une soirée' : 'Two perspectives, one evening',
    pedroLens: isFr ? 'Perspective CTO & Architecture' : 'CTO & Architecture Lens',
    pedroRole: isFr ? 'Stratège Technologique · Ancien Responsable Innovation, Groupe Richemont' : 'Technology Strategist · Former Innovation Lead, Richemont Group',
    pedroBio1: isFr
      ? 'Pendant plus de douze ans chez Richemont — maison de Cartier, Vacheron Constantin, IWC et d\'autres Maisons — Pedro a dirigé des initiatives d\'innovation technologique axées sur l\'identité numérique, la blockchain et la traçabilité des produits, contribuant à sécuriser des héritages centenaires tout en les préparant au paradigme numérique.'
      : 'For over twelve years at Richemont — home to Cartier, Vacheron Constantin, IWC, and other Maisons — Pedro led technology innovation initiatives focused on digital identity, blockchain, and product traceability, helping secure centuries-old legacies while preparing them for the digital paradigm.',
    pedroBio2: isFr
      ? 'Nommé parmi les Top Luxury Speakers of the World 2026 par la Chambre de Commerce du Luxe Mondial aux côtés de 59 pairs internationaux. Ses travaux sur le commerce agentique — y compris des expériences directes utilisant des agents IA dans le commerce de luxe — constituent le fil directeur de cette soirée.'
      : 'Named among the Top Luxury Speakers of the World 2026 by the World Luxury Chamber of Commerce alongside 59 global peers. His work on agentic commerce — including first-hand experiments using AI agents to navigate luxury retail — forms the backbone of this evening\'s discussion.',
    fredericLens: isFr ? 'Perspective Stratégie & Technologie' : 'Strategy & Technology Lens',
    fredericRole: isFr ? 'Directeur Technologique & Conseiller Senior' : 'Technology Director & Senior Advisor',
    fredericBio1: isFr
      ? 'Dirigeant digital passionné alliant vision stratégique et exécution de haute qualité, Frédéric place les personnes et la technologie au service des clients finaux. Il va au-delà de l\'architecture technique pour poser la question essentielle : est-ce le bon choix pour l\'entreprise et le client ?'
      : 'A passionate digital executive who combines strategic vision with high-quality execution, Frédéric brings people and technology to serve end customers. He looks beyond the technical architecture to ask the harder question: is this the right move for the business and the customer?',
    fredericBio2: isFr
      ? 'Sa perspective ancre la discussion dans la réalité opérationnelle — les défis de la transition, les attentes des consommateurs de luxe et le leadership nécessaire pour naviguer un changement de paradigme sans perdre ce qui rend une marque irremplaçable.'
      : 'His perspective grounds the discussion in operational reality — the challenges of transition, the expectations of luxury consumers, and the leadership required to navigate a paradigm shift without losing what makes a brand irreplaceable.',

    // Inflection Point
    inflectionPoint: isFr ? 'Le Point d\'Inflexion' : 'The Inflection Point',
    inflectionPara1: isFr
      ? 'Pedro a utilisé trois agents IA pour acheter un manteau de luxe. Ils ont excellé dans la découverte — puis se sont heurtés à un mur. Données produits incomplètes. Pas d\'intégrations commerce directes. Pas de confiance. Il a fini par faire ce qu\'il a toujours fait : se rendre en boutique.'
      : 'Pedro used three AI agents to buy a luxury coat. They excelled at discovery — then hit a wall. Incomplete product data. No direct commerce integrations. No trust. He ended up doing what he\'s always done: visiting the boutique.',
    inflectionPara2: isFr
      ? 'Cet écart entre promesse et réalité est précisément là où les leaders technologiques du luxe doivent agir. Le commerce agentique n\'arrive pas — il est déjà là, fragmenté, en attente d\'une architecture adaptée.'
      : 'That gap between promise and reality is exactly where technology leaders in luxury must act. Agentic commerce isn\'t coming — it\'s already here, fragmented, and waiting for the right architecture.',
    stat1Label: isFr
      ? 'Opportunité mondiale du commerce agentique d\'ici 2030 — 1 000 Mrd$ du seul e-commerce B2C américain'
      : 'Global agentic commerce opportunity by 2030 — $1T from US B2C retail alone',
    stat2Label: isFr
      ? 'des consommateurs utilisent désormais l\'IA pour leurs recherches sur internet — contre presque zéro en 2022'
      : 'of consumers now use AI when searching the internet — up from near zero in 2022',
    stat3Label: isFr
      ? 'Agent-vers-site · Agent-vers-agent · Agent courtier · Trois modèles qui émergent simultanément'
      : 'Agent-to-site · Agent-to-agent · Brokered agent · All emerging simultaneously',
    statSource1: isFr ? 'Recherche sectorielle, 2025' : 'Industry research, 2025',
    statSource2: isFr ? 'Recherche sectorielle, 2025' : 'Industry research, 2025',
    statSource3: isFr ? 'Comment le commerce circule aujourd\'hui' : 'How commerce flows today',

    // The Evening
    theEvening: isFr ? 'La Soirée' : 'The Evening',
    howNightUnfolds: isFr ? 'Comment se déroule la soirée' : 'How the night unfolds',
    timeline1Label: isFr ? 'Introduction au Commerce Agentique' : 'Introduction to Agentic Commerce',
    timeline1Sub: isFr
      ? 'Une courte présentation pour mettre en contexte l\'état actuel du commerce agentique'
      : 'A short framing presentation to level-set the room on where we are today',
    timeline2Label: isFr ? 'Discussion en panel & Questions ouvertes' : 'Panel Discussion & Open Q&A',
    timeline2Sub: isFr
      ? 'Architecture · Stratégie · Le paradoxe du luxe. Ouvert, conversationnel, animé par des praticiens — c\'est la salle qui guide la discussion.'
      : 'Architecture · Strategy · The luxury paradox. Open, conversational, practitioner-led — the room drives the conversation.',
    timeline3Label: isFr ? 'Cocktail & Networking' : 'Drinks & Networking',
    timeline3Sub: isFr ? 'Continuer la conversation de manière informelle' : 'Continue the conversation informally',
    twoPerspectivesPanel: isFr ? 'Deux perspectives, un panel' : 'Two perspectives, one panel',
    pedroLensText: isFr
      ? 'La réalité de l\'infrastructure : protocoles (MCP, A2A, ACP), patterns de conception, architecture de données prête pour les agents, gestion des identités et rôle de la blockchain & des passeports produits numériques.'
      : 'The infrastructure reality: protocols (MCP, A2A, ACP), system design patterns, agent-ready data architecture, identity management, and the role of blockchain & digital product passports.',
    fredericLensText: isFr
      ? 'L\'impératif stratégique : ce que le commerce agentique signifie pour le positionnement des marques, les relations clients et les défis réels auxquels font face les entreprises qui expérimentent dès aujourd\'hui.'
      : 'The strategic imperative: what agentic commerce means for brand positioning, customer relationships, and the real challenges faced by companies already experimenting today.',

    // Discussion Themes
    discussionThemes: isFr ? 'Thèmes de Discussion' : 'Discussion Themes',
    whatWeUnpack: isFr ? 'Ce que nous allons explorer' : 'What we\'ll unpack',
    sixQuestions: isFr
      ? 'Six questions auxquelles les leaders technologiques du luxe doivent répondre maintenant.'
      : 'Six questions technology leaders in luxury need to answer now.',
    card01Title: isFr ? 'De l\'Omnicanal aux Architectures Pilotées par les Agents' : 'From Omnichannel to Agent-Driven Architectures',
    card01Body: isFr
      ? 'Comment réarchitecturer une pile commerce conçue pour des humains naviguant sur des sites — et non pour des agents parcourant des API à grande échelle ?'
      : 'How do you re-architect a commerce stack built for humans browsing websites — not agents traversing APIs at scale?',
    card02Title: isFr ? 'Confiance, Risques & Goulots d\'Étranglement' : 'Trust, Risks & Bottlenecks',
    card02Body: isFr
      ? 'Qui est responsable quand un agent effectue un mauvais achat ? Comment les marques construisent-elles des garde-fous sûrs pour les agents sans tuer l\'expérience ?'
      : 'Who is responsible when an agent makes a wrong purchase? How do brands build agent-safe guardrails without killing the experience?',
    card03Title: isFr ? 'Protocoles : MCP, A2A, ACP' : 'Protocols: MCP, A2A, ACP',
    card03Body: isFr
      ? 'Les normes techniques émergentes permettant l\'interopérabilité des agents. Ce qu\'elles sont, ce qui leur manque encore et à quoi ressemble leur adoption en pratique.'
      : 'The emerging technical standards enabling agent interoperability. What they are, what they still lack, and what adoption looks like in practice.',
    card05Title: isFr ? 'Vos Données de Marque Sont-Elles Prêtes pour les Agents ?' : 'Is Your Brand Data Agent-Ready?',
    card05Body: isFr
      ? 'Les agents ont besoin de données structurées, fiables et en temps réel. La plupart des marques de luxe ne les ont pas. À quoi ressemble concrètement une infrastructure de données prête pour les agents ?'
      : 'Agents need structured, trusted, real-time data. Most luxury brands don\'t have it. What does "agent-ready" data infrastructure actually look like?',
    card06Title: isFr ? 'Le Paradoxe du Luxe' : 'The Luxury Paradox',
    card06Body: isFr
      ? 'Le luxe se vend par l\'émotion, le récit et la connexion humaine. Un agent IA peut-il jamais fermer cette boucle — ou la boutique reste-t-elle toujours la destination ?'
      : 'Luxury sells on emotion, story, and human connection. Can an AI agent ever close that loop — or does the boutique always remain the destination?',

    // Register CTA
    spotsRemaining: (spotsLeft: number) => isFr ? `${spotsLeft} places sur ${MAX_SPOTS} restantes` : `${spotsLeft} of ${MAX_SPOTS} spots remaining`,
    joinConversation: isFr ? 'Rejoignez la conversation' : 'Join the conversation',
    ctaDatetime: isFr ? 'Mercredi 30 avril · 19h00 CET' : 'Wednesday, April 30 · 7:00 PM CET',
    alwaysFree: isFr
      ? 'Toujours gratuit. Sans engagement. L\'inscription ferme quand les places sont épuisées.'
      : 'Always free. No catch. Registration closes when spots run out.',
  }

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
            <ArrowLeft size={14} /> {T.allEvents}
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
                  {T.dateLabel}
                </span>
              </div>

              <p className="text-xs font-bold tracking-widest uppercase mb-3 ac-h2" style={{ color: ORANGE }}>
                {T.eveningSession}
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
                {T.luxurySubtitle}
              </h2>

              <div className="mb-10 ac-h3" style={{ maxWidth: '38rem' }}>
                <p className="text-base leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {T.heroPara1}
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {T.heroPara2}
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-10 ac-h4">
                {[
                  { Icon: Calendar, text: T.heroDate },
                  { Icon: Clock,    text: T.heroTime },
                  { Icon: MapPin,   text: T.heroLocation },
                  { Icon: Users,    text: T.heroSpots(spotsLeft) },
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
                  {T.reserveSpot} <ArrowRight size={16} />
                </Link>
                <div
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-sm font-semibold"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}
                >
                  {T.freeAdmission}
                </div>
              </div>
            </div>

            {/* Right — Agent Network SVG */}
            <div className="hidden lg:flex items-center justify-center" style={{ position: 'relative', zIndex: 1 }}>
              <AgentNetworkSVG />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* SPEAKERS                                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: DARKER }}>
        <div className="max-w-6xl mx-auto relative" style={{ zIndex: 1 }}>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: ORANGE }}>
            {T.theSpeakers}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-14">
            {T.twoPerspectives}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">

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
                      {T.pedroLens}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {T.pedroRole}
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {T.pedroBio1}
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {isFr ? (
                      <>
                        Nommé parmi les{' '}
                        <strong className="text-white/90">Top Luxury Speakers of the World 2026</strong>
                        {' '}par la Chambre de Commerce du Luxe Mondial aux côtés de 59 pairs internationaux.
                        Ses travaux sur le commerce agentique — y compris des expériences directes utilisant des agents IA dans le commerce de luxe — constituent le fil directeur de cette soirée.
                      </>
                    ) : (
                      <>
                        Named among the{' '}
                        <strong className="text-white/90">Top Luxury Speakers of the World 2026</strong>
                        {' '}by the World Luxury Chamber of Commerce alongside 59 global peers.
                        His work on agentic commerce — including first-hand experiments using AI agents to navigate
                        luxury retail — forms the backbone of this evening&apos;s discussion.
                      </>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Luxury Tech', 'Agentic Commerce', 'Digital Identity', 'Richemont'].map((tag) => (
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
                      {T.fredericLens}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {T.fredericRole}
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {T.fredericBio1}
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.60)' }}>
                    {T.fredericBio2}
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
            {T.inflectionPoint}
          </p>

          <ScrollReveal delay={100}>
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
          </ScrollReveal>

          {/* Visual — AI & commerce */}
          <div className="mb-16 rounded-2xl overflow-hidden" style={{ maxWidth: '42rem' }}>
            <img
              src="/agentic4.jpeg"
              alt="AI transforming commerce"
              style={{ width: '100%', height: 280, objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
          </div>

          <p className="text-lg leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '42rem' }}>
            {T.inflectionPara1}
          </p>
          <p className="text-lg leading-relaxed mb-16" style={{ color: 'rgba(255,255,255,0.62)', maxWidth: '42rem' }}>
            {T.inflectionPara2}
          </p>

          <div className="gradient-rule mb-16" />

          {/* Stats band */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                value: '$3–5T',
                label: T.stat1Label,
                source: T.statSource1,
              },
              {
                value: '50%',
                label: T.stat2Label,
                source: T.statSource2,
              },
              {
                value: '3 models',
                label: T.stat3Label,
                source: T.statSource3,
              },
            ].map(({ value, label, source }, i) => (
              <ScrollReveal key={value} delay={i * 130}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{ backgroundColor: DARKER, border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="text-4xl sm:text-5xl font-black mb-3 text-gradient-orange">
                    {value}
                  </div>
                  <p className="text-sm text-white/70 leading-snug mb-2">{label}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>{source}</p>
                </div>
              </ScrollReveal>
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
            {T.theEvening}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase mb-14">
            {T.howNightUnfolds}
          </h2>

          {/* Timeline */}
          <div className="flex flex-col mb-16">
            {([
              { time: '19:00 – 19:20', label: T.timeline1Label, sub: T.timeline1Sub, highlight: false },
              { time: '19:20', label: T.timeline2Label, sub: T.timeline2Sub, highlight: true },
              { time: '20:30', label: T.timeline3Label, sub: T.timeline3Sub, highlight: false },
            ] as const).map(({ time, label, sub, highlight }, i, arr) => (
              <ScrollReveal key={time} delay={i * 120}>
              <div className="flex gap-5 items-start">
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
              </ScrollReveal>
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
            {T.twoPerspectivesPanel}
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
                {T.pedroLens}
              </span>
              <h3 className="text-lg font-black text-white mb-3">Pedro López-Belmonte</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                {T.pedroLensText}
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
                {T.fredericLens}
              </span>
              <h3 className="text-lg font-black text-white mb-3">Frédéric Desmaison</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
                {T.fredericLensText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* DISCUSSION THEMES                                             */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 relative" style={{ backgroundColor: DARK }}>
        <div className="max-w-6xl mx-auto">
          {/* Mobile: stacked. Desktop: 2-column sticky layout */}
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 items-start">

            {/* Left — sticky section label (desktop only) */}
            <div className="lg:sticky lg:top-24" style={{ alignSelf: 'start' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: ORANGE }}>
                {T.discussionThemes}
              </p>
              <h2 className="text-3xl font-black text-white uppercase leading-tight">
                {T.whatWeUnpack}
              </h2>
              <p className="text-sm mt-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {T.sixQuestions}
              </p>
            </div>

            {/* Right — cards (scroll past the sticky heading) */}
            <div className="grid sm:grid-cols-2 gap-4">
              {([
                {
                  Icon: Network,
                  num: '01',
                  title: T.card01Title,
                  body: T.card01Body,
                },
                {
                  Icon: Shield,
                  num: '02',
                  title: T.card02Title,
                  body: T.card02Body,
                },
                {
                  Icon: Cpu,
                  num: '03',
                  title: T.card03Title,
                  body: T.card03Body,
                },
                {
                  Icon: Lock,
                  num: '04',
                  title: T.card05Title,
                  body: T.card05Body,
                },
                {
                  Icon: Sparkles,
                  num: '05',
                  title: T.card06Title,
                  body: T.card06Body,
                },
              ] as const).map(({ Icon, num, title, body }, i) => (
                <ScrollReveal key={num} delay={i * 80}>
                  <div
                    className="ac-topic-card rounded-2xl p-6 h-full"
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
                </ScrollReveal>
              ))}
            </div>
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
            {T.spotsRemaining(spotsLeft)}
          </span>

          <h2
            className="font-black text-white uppercase leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            {T.joinConversation}
          </h2>

          <p className="text-lg mb-2" style={{ color: 'rgba(255,255,255,0.48)' }}>
            {T.ctaDatetime}
          </p>
          <p className="text-sm mb-12" style={{ color: 'rgba(255,255,255,0.32)' }}>
            Antaes, GBC – Avenue des Morgines 12, Petit-Lancy
          </p>

          <Link
            href={`/${locale}/register`}
            className="btn-glow inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105 hover:opacity-95"
            style={{ backgroundColor: ORANGE }}
          >
            {T.reserveSpot} <ArrowRight size={20} />
          </Link>

          <p className="text-sm mt-6" style={{ color: 'rgba(255,255,255,0.22)' }}>
            {T.alwaysFree}
          </p>
        </div>
      </section>

    </div>
  )
}
