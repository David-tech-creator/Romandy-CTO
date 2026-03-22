import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import '../globals.css'
import { TopNav } from '@/components/layout/TopNav'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.className}>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#2D2D2D' }}>
        <NextIntlClientProvider messages={messages}>
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }]
}
