'use client'

import { useTranslations } from 'next-intl'
import Revele from '@/composants/ui/Revele'

/**
 * Bande institutionnelle : qui organise le concours et sous quel patronage.
 * Le titre est masque quand la bande est posee sous un titre de section
 * (page A propos).
 */
export default function Patronage({ avecLabel = true }: { avecLabel?: boolean }) {
  const t = useTranslations('patronage')

  const blocs = [
    { role: t('organisateur'), noms: [t('asso')] },
    { role: t('hautPatronage'), noms: [t('minCulture')] },
    { role: t('soutien'), noms: [t('minTourisme'), t('minCommunication')] },
  ]

  return (
    <section className="bandeau-patronage">
      <div className="wrapper">
        {avecLabel && (
          <Revele>
            <p className="patronage-label">{t('label')}</p>
          </Revele>
        )}
        <div className="patronage-grille">
          {blocs.map((bloc, i) => (
            <Revele key={bloc.role} delai={i * 100} className="patronage-bloc">
              <span className="patronage-role">{bloc.role}</span>
              {bloc.noms.map((nom) => (
                <span key={nom} className="patronage-nom">{nom}</span>
              ))}
            </Revele>
          ))}
        </div>
      </div>
    </section>
  )
}
