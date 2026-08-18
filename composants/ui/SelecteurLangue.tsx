'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { locales } from '@/i18n/config'

/**
 * Selecteur de langue qui conserve la page courante.
 * /fr/candidatures -> /es/candidatures (et non plus /es).
 */
export default function SelecteurLangue({
  locale,
  variante = 'barre',
}: {
  locale: string
  variante?: 'barre' | 'mobile'
}) {
  const t = useTranslations('nav')
  const chemin = usePathname() ?? '/'

  // On remplace uniquement le premier segment (la langue) du chemin.
  const cheminSansLangue = (() => {
    const segments = chemin.split('/')
    if (locales.includes(segments[1] as (typeof locales)[number])) {
      segments.splice(1, 1)
    }
    const reste = segments.join('/')
    return reste === '/' ? '' : reste
  })()

  return (
    <div className="selecteur-langue" role="group" aria-label={t('changerLangue')}>
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${cheminSansLangue}`}
          hrefLang={l}
          aria-current={locale === l ? 'true' : undefined}
          className={`langue-lien ${variante === 'mobile' ? 'langue-lien-mobile' : ''} ${
            locale === l ? 'langue-lien-active' : ''
          }`}
        >
          {l}
        </Link>
      ))}
    </div>
  )
}
