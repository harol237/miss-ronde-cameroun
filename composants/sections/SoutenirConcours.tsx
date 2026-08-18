'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revele from '@/composants/ui/Revele'

const MOTIFS = ['partenaire', 'parrain', 'investir', 'donation', 'consultation'] as const

/** Les differentes facons de soutenir, sorties du hero pour l'alleger. */
export default function SoutenirConcours({ locale }: { locale: string }) {
  const t = useTranslations('soutenir')
  const ta = useTranslations('actions')

  return (
    <section className="section-soutenir">
      <div className="wrapper">
        <Revele>
          <p className="label-bloc">{t('label')}</p>
          <h2 className="titre-bloc">{t('titre')}</h2>
          <p className="texte-bloc soutenir-intro">{t('texte')}</p>
        </Revele>

        <div className="soutenir-liens">
          {MOTIFS.map((motif, i) => (
            <Revele key={motif} delai={i * 80}>
              <Link href={`/${locale}/contact?motif=${motif}`} className="soutenir-lien">
                <span>{ta(motif)}</span>
                <span className="soutenir-lien-fleche">→</span>
              </Link>
            </Revele>
          ))}
        </div>
      </div>
    </section>
  )
}
