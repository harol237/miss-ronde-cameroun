'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

// Soiree de l'election, Palais des Congres de Yaounde
const DATE_FINALE = '2027-01-30T20:00:00'

/** L'horloge est une source externe : on s'y abonne plutot que de la copier dans un etat. */
function souscrireHorloge(rafraichir: () => void) {
  const identifiant = setInterval(rafraichir, 1000)
  return () => clearInterval(identifiant)
}

function secondeCourante() {
  return Math.floor(Date.now() / 1000)
}

function calculerTemps(secondes: number) {
  const diff = new Date(DATE_FINALE).getTime() - secondes * 1000
  if (diff <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 }
  return {
    jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
    heures: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secondes: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

function CompteARebours() {
  const t = useTranslations('hero')

  // Le rendu serveur affiche 00 : la valeur reelle arrive des l'hydratation.
  const seconde = useSyncExternalStore(souscrireHorloge, secondeCourante, () => 0)
  const temps = seconde === 0
    ? { jours: 0, heures: 0, minutes: 0, secondes: 0 }
    : calculerTemps(seconde)

  const unites = [
    { valeur: temps.jours, libelle: t('jours') },
    { valeur: temps.heures, libelle: t('heures') },
    { valeur: temps.minutes, libelle: t('minutes') },
    { valeur: temps.secondes, libelle: t('secondes') },
  ]

  return (
    <div className="hero-rebours">
      {unites.map(({ valeur, libelle }) => (
        <div key={libelle} className="hero-rebours-bloc">
          <span className="hero-rebours-valeur">{String(valeur).padStart(2, '0')}</span>
          <span className="hero-rebours-unite">{libelle}</span>
        </div>
      ))}
    </div>
  )
}

export default function HeroAccueil({ locale }: { locale: string }) {
  const t = useTranslations('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const minuterie = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(minuterie)
  }, [])

  return (
    <section className="hero">

      {/* Image plein cadre, elle porte toute la page */}
      <div className="hero-image">
        <Image
          src="/images/accueil.jpg"
          alt={t('titreComplet')}
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 22%' }}
        />
      </div>
      <div className="hero-voile" />
      <div className="hero-voile-haut" />

      <div className={`hero-contenu ${visible ? 'hero-contenu-visible' : ''}`}>

        <div className="hero-badge">
          <span className="ligne-or-sm" />
          <span className="hero-edition">{t('edition')}</span>
          <span className="ligne-or-sm" />
        </div>

        <h1 className="hero-titre">{t('titreComplet')}</h1>

        <p className="hero-devise">{t('devise')}</p>

        <p className="hero-theme">{t('theme')}</p>

        <div className="hero-date">
          <span className="hero-date-label">{t('reboursLabel')}</span>
          <CompteARebours />
        </div>

        <div className="hero-boutons">
          <Link href={'/' + locale + '/candidatures'} className="hero-btn-or">
            {t('btnCandidater')}
          </Link>
          <Link href={'/' + locale + '/billetterie'} className="hero-btn-contour">
            {t('btnTickets')}
          </Link>
        </div>
      </div>

      <a href="#suite" className="hero-defiler" aria-label={t('defiler')}>
        <span>{t('defiler')}</span>
        <span className="hero-defiler-trait" />
      </a>
    </section>
  )
}
