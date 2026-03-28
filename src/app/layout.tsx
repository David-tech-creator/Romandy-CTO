import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Romandy CTO',
  description: 'The community for CTOs and technology leaders in Romandy, Switzerland.',
  metadataBase: new URL('https://www.ctoromandy.ch'),
  openGraph: {
    title: 'Romandy CTO',
    description: 'The community for CTOs and technology leaders in Romandy, Switzerland.',
    url: 'https://www.ctoromandy.ch',
    siteName: 'Romandy CTO',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Romandy CTO',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romandy CTO',
    description: 'The community for CTOs and technology leaders in Romandy, Switzerland.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
