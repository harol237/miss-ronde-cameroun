'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Revele from '@/composants/ui/Revele'
import { editions } from '@/contenu/editions'

export default function ApercuGalerie({ locale }: { locale: string }) {
  const t = useTranslations('galerie')
  const te = useTranslations('pageEditions')

  // On met en avant les trois dernieres editions passees.
  const aAfficher = editions.filter((edition) => edition.statut === 'passee').slice(0, 3)

  return (
    <section className="section-galerie">
      <div className="wrapper">
        <Revele className="galerie-entete">
          <div>
            <p className="label-bloc">{t('label')}</p>
            <h2 className="titre-bloc">{t('titre')}</h2>
          </div>
          <Link href={`/${locale}/galerie`} className="lien-souligne">
            {t('btnVoir')} →
          </Link>
        </Revele>

        <div className="galerie-grille-editions">
          {aAfficher.map((edition, i) => (
            <Revele key={edition.annee} delai={i * 110}>
              <Link href={`/${locale}/editions/${edition.annee}`} className="vignette-edition">
                <span className="vignette-edition-filet" />
                <span className="vignette-edition-annee">{edition.annee}</span>
                <span className="vignette-edition-label">{t('editionLabel')}</span>
                <span className="vignette-edition-filet" />
                <span className="vignette-edition-survol">{te('voir')} →</span>
              </Link>
            </Revele>
          ))}
        </div>
      </div>
    </section>
  )
}
