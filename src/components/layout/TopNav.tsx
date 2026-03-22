'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { UserButton, SignInButton, Show } from '@clerk/nextjs'
import { ExternalLink } from 'lucide-react'

const MEETUP_URL = 'https://www.meetup.com/romandy-cto-meetup-group/'
const ORANGE = '#C8834A'

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
        <Link href={`/${locale}`} className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Romandy CTO" width={36} height={24} />
          <div className="flex flex-col leading-none">
            <span className="text-[9px] font-black text-white/70 tracking-[0.2em] uppercase">ROMANDY</span>
            <span className="text-base font-black text-white tracking-wide leading-none">CTO</span>
          </div>
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-white/60 hover:text-white transition-colors">
            {t('about')}
          </a>
          <a href="#events" className="text-sm text-white/60 hover:text-white transition-colors">
            {t('events')}
          </a>
          <a
            href={MEETUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-1"
          >
            Meetup <ExternalLink size={11} className="opacity-60" />
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

          <Show when="signed-in">
            <UserButton />
          </Show>

          <Show when="signed-out">
            <Link
              href={`/${locale}/join`}
              className="text-sm font-semibold px-4 py-2 rounded-md transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: ORANGE, color: 'white' }}
            >
              {t('joinCommunity')}
            </Link>
          </Show>
        </div>
      </div>
    </header>
  )
}
