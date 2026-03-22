'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserButton, Show } from '@clerk/nextjs'
import { ExternalLink } from 'lucide-react'
import { BrandLockup } from '@/components/BrandLockup'

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

        {/* Brand lockup */}
        <BrandLockup locale={locale} size="md" />

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          <a href={`/${locale}#about`} className="text-sm text-white/60 hover:text-white transition-colors">
            {t('about')}
          </a>
          <a href={`/${locale}#events`} className="text-sm text-white/60 hover:text-white transition-colors">
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
