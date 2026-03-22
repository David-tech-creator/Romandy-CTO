'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const MEETUP_URL = 'https://www.meetup.com/romandy-cto-meetup-group/'

export function TopNav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en'
    router.push(pathname.replace(`/${locale}`, `/${newLocale}`))
  }

  return (
    <header className="sticky top-0 z-50 nav-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Romandy CTO" width={32} height={26} />
          <span className="font-bold text-white tracking-wide">
            ROMANDY <span style={{ color: '#C8834A' }}>CTO</span>
          </span>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-white/60 hover:text-white transition-colors">
            {t('about')}
          </a>
          <a href="#events" className="text-sm text-white/60 hover:text-white transition-colors">
            {t('events')}
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="text-sm text-white/60 hover:text-white transition-colors px-2"
          >
            {t('language')}
          </button>
          <a
            href={MEETUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold px-4 py-2 rounded-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C8834A', color: 'white' }}
          >
            {t('join')}
          </a>
        </div>
      </div>
    </header>
  )
}
