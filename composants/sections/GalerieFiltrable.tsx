'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { photos, photosParEdition } from '@/contenu/galerie'
import { editions } from '@/contenu/editions'

export default function GalerieFiltrable() {
  const t = useTranslations('pageGalerie')
  const [filtre, setFiltre] = useState<string | null>(null)

  // Seules les editions qui possedent au moins une photo sont proposees au filtre.
  const anneesDisponibles = editions
    .map((edition) => edition.annee)
    .filter((annee) => photos.some((photo) => photo.edition === annee))

  const visibles = photosParEdition(filtre)

  return (
    <div>
      {anneesDisponibles.length > 0 && (
        <div className="galerie-filtres" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={filtre === null}
            className={`galerie-filtre ${filtre === null ? 'galerie-filtre-actif' : ''}`}
            onClick={() => setFiltre(null)}
          >
            {t('filtreToutes')}
          </button>
          {anneesDisponibles.map((annee) => (
            <button
              key={annee}
              type="button"
              role="tab"
              aria-selected={filtre === annee}
              className={`galerie-filtre ${filtre === annee ? 'galerie-filtre-actif' : ''}`}
              onClick={() => setFiltre(annee)}
            >
              {annee}
            </button>
          ))}
        </div>
      )}

      {visibles.length === 0 ? (
        <div className="etat-vide">
          <span className="etat-vide-marque" aria-hidden="true">✦</span>
          <p className="texte-bloc">{t('vide')}</p>
        </div>
      ) : (
        <div className="galerie-photos">
          {visibles.map((photo) => (
            <figure key={photo.fichier} className="galerie-photo">
              <Image
                src={photo.fichier}
                alt={photo.legende}
                width={640}
                height={800}
                sizes="(max-width: 700px) 50vw, 25vw"
              />
              <figcaption>{photo.legende}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
