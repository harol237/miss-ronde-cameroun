import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import { Playfair_Display, Montserrat, Cormorant_Garamond } from 'next/font/google'
import { defaultLocale } from '@/i18n/config'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: 'Miss Ronde Cameroun',
    template: '%s · Miss Ronde Cameroun',
  },
  description:
    'Le premier concours national qui celebre la femme camerounaise dans toute sa diversite et sa magnificence.',
  keywords: 'Miss Ronde, Cameroun, concours beaute, femme ronde, diversite, body positive',
  openGraph: {
    title: 'Miss Ronde Cameroun',
    description: 'Je suis Rondement Belle et je m’assume.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Miss Ronde Cameroun',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // La langue est posee par le proxy ; elle alimente <html lang> pour
  // l'accessibilite, le referencement et la cesure des mots par le navigateur.
  const langue = (await headers()).get('x-locale') ?? defaultLocale

  return (
    <html lang={langue} suppressHydrationWarning>
      <head>
        {/* Sans JavaScript, les apparitions au defilement ne se declenchent
            jamais : le contenu resterait invisible. On le montre d'emblee. */}
        <noscript>
          <style>{`
            .revele, .hero-contenu, .section-apropos {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  )
}
