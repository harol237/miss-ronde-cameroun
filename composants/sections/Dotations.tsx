'use client'

import { useTranslations } from 'next-intl'
import Revele from '@/composants/ui/Revele'

/**
 * Les dotations de l'edition, sur la page d'accueil.
 * Les intitules viennent de la page A propos : une seule source pour les montants.
 */
export default function Dotations() {
  const t = useTranslations('dotations')
  const tg = useTranslations('pageApropos')

  const rangs = [1, 2, 3].map((n) => ({
    rang: String(n).padStart(2, '0'),
    titre: tg(`gain${n}Titre`),
    texte: tg(`gain${n}Texte`),
  }))

  return (
    <section className="section-dotations">
      <div className="wrapper">
        <Revele>
          <p className="label-bloc">{t('label')}</p>
          <h2 className="titre-bloc">{t('titre')}</h2>
          <p className="texte-bloc dotations-intro">{t('texte')}</p>
        </Revele>

        <div className="dotations-grille">
          {rangs.map((dotation, i) => (
            <Revele key={dotation.titre} delai={i * 110} className="dotation">
              <span className="dotation-rang">{dotation.rang}</span>
              <h3 className="dotation-titre">{dotation.titre}</h3>
              <p className="dotation-texte">{dotation.texte}</p>
            </Revele>
          ))}
        </div>

        <Revele delai={330} className="dotations-note">
          <span className="dotations-note-titre">{tg('gain4Titre')}</span>
          <p>{tg('gain4Texte')}</p>
        </Revele>
      </div>
    </section>
  )
}
