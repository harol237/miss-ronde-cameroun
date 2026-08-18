'use client'

import { useTranslations } from 'next-intl'
import Revele from '@/composants/ui/Revele'

/** Bande de reperes juste sous le hero : l'essentiel en un coup d'oeil. */
export default function BandeauFaits() {
  const t = useTranslations('faits')

  const faits = ['date', 'lieu', 'dotation', 'age'].map((cle) => ({
    label: t(`${cle}Label`),
    valeur: t(`${cle}Valeur`),
  }))

  return (
    <section id="suite" className="bandeau-faits">
      <div className="bandeau-faits-inner">
        {faits.map((fait, i) => (
          <Revele key={fait.label} delai={i * 90} className="fait">
            <span className="fait-label">{fait.label}</span>
            <span className="fait-valeur">{fait.valeur}</span>
          </Revele>
        ))}
      </div>
    </section>
  )
}
