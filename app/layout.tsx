import type { Metadata } from 'next'
import { Playfair_Display, Montserrat, Cormorant_Garamond } from 'next/font/google'
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
  title: 'Miss Ronde & Belle Cameroun',
  description: 'Le premier concours national qui célèbre la femme camerounaise dans toute sa diversité et sa magnificence.',
  keywords: 'Miss Ronde, Belle Cameroun, concours beauté, femme camerounaise, diversité',
  openGraph: {
    title: 'Miss Ronde & Belle Cameroun',
    description: 'Je suis Rondement Belle et je m\'assume…',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Miss Ronde & Belle Cameroun',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${playfair.variable} ${montserrat.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  )
}
