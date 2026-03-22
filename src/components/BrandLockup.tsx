import Image from 'next/image'
import Link from 'next/link'

type Props = {
  locale?: string
  size?: 'sm' | 'md' | 'lg'
  linked?: boolean
}

// PNG has transparent glow: ~8% top, ~28% bottom, ~6% each side.
// clipH/clipW crop the glow so the visible knife sits flush against the text.
// marginTop/marginLeft shift the image to skip the top/left glow.
const config = {
  sm: { imgW: 44, imgH: 30, clipH: 17, clipW: 39, topOff: 2, sideOff: 3, label: 'text-[8px]',  title: 'text-sm'  },
  md: { imgW: 56, imgH: 37, clipH: 22, clipW: 50, topOff: 3, sideOff: 3, label: 'text-[9px]',  title: 'text-lg'  },
  lg: { imgW: 70, imgH: 47, clipH: 28, clipW: 62, topOff: 4, sideOff: 4, label: 'text-[10px]', title: 'text-2xl' },
}

export function BrandLockup({ locale = 'en', size = 'md', linked = true }: Props) {
  const { imgW, imgH, clipH, clipW, topOff, sideOff, label, title } = config[size]

  const inner = (
    <div className="flex items-center gap-2">
      {/* Crops all four sides of the transparent glow so knife sits tight against the text */}
      <div style={{ overflow: 'hidden', height: `${clipH}px`, width: `${clipW}px`, flexShrink: 0 }}>
        <Image
          src="/logo.png"
          alt="Romandy CTO"
          width={imgW}
          height={imgH}
          style={{ marginTop: `${-topOff}px`, marginLeft: `${-sideOff}px`, display: 'block' }}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${label} font-black text-white/60 tracking-[0.22em] uppercase`}>
          ROMANDY
        </span>
        <span className={`${title} font-black text-white tracking-tight leading-none`}>
          CTO
        </span>
      </div>
    </div>
  )

  return linked ? (
    <Link href={`/${locale}`}>{inner}</Link>
  ) : (
    inner
  )
}
