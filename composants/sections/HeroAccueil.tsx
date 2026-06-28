'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

function CompteARebours() {
  const [temps, setTemps] = useState({ jours: 0, heures: 0, minutes: 0, secondes: 0 })
  useEffect(() => {
    const finale = new Date('2026-12-29T20:00:00')
    const interval = setInterval(() => {
      const maintenant = new Date()
      const diff = finale.getTime() - maintenant.getTime()
      if (diff <= 0) { clearInterval(interval); return }
      setTemps({
        jours: Math.floor(diff / (1000 * 60 * 60 * 24)),
        heures: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secondes: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-5 md:gap-8">
      {[
        { v: temps.jours, l: 'Jours' },
        { v: temps.heures, l: 'Heures' },
        { v: temps.minutes, l: 'Min' },
        { v: temps.secondes, l: 'Sec' },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <span className="font-display text-3xl md:text-5xl font-bold text-white leading-none tabular-nums">
            {String(v).padStart(2, '0')}
          </span>
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mt-1 font-medium">
            {l}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function HeroAccueil({ locale }: { locale: string }) {
  const t = useTranslations('hero')
  const ta = useTranslations('actions')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex overflow-hidden bg-black">

      {/* COLONNE GAUCHE - Texte */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center px-8 lg:px-16 pt-28 pb-16 bg-black">

        {/* Ligne dorée décorative gauche */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#C9A84C]" />
          <div className="w-1 h-1 rounded-full bg-[#C9A84C]" />
          <div className="w-px h-16 bg-gradient-to-b from-[#C9A84C] to-transparent" />
        </div>

        <div className={`w-full transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-[#C9A84C]" />
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#C9A84C]">
              {t('edition')} · 11ème édition
            </span>
            <div className="w-6 h-px bg-[#C9A84C]" />
          </div>

          {/* Titre */}
          <h1 className="font-display font-normal text-white leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}>
            Miss Ronde
            <br />
            <span className="text-white">Cameroun</span>
          </h1>

          {/* Devise */}
          <p className="text-[#C9A84C] text-xs md:text-sm font-bold tracking-[0.35em] uppercase mb-4">
            {t('devise')}
          </p>

          {/* Thème */}
          <p className="text-white/70 text-sm md:text-base font-light italic mb-6 leading-relaxed max-w-md">
            {t('theme')}
          </p>

          {/* Prix */}
          <div className="inline-flex items-center gap-3 border-l-2 border-[#C9A84C] pl-4 mb-8">
            <div>
              <p className="text-[#C9A84C] font-display text-2xl font-bold leading-none">1 Million FCFA</p>
              <p className="text-white/50 text-xs mt-1">+ cadeaux, opportunités et formations</p>
            </div>
          </div>

          {/* Compte à rebours */}
          <div className="mb-8">
            <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-3">
              Finale · 29 Déc 2026 &nbsp;·&nbsp; Demi-finale · Nov 2026
            </p>
            <CompteARebours />
          </div>

          {/* Boutons principaux */}
          <div className="flex flex-wrap gap-3 mb-5">
            <Link href={'/' + locale + '/candidatures'} className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-300 shadow-lg shadow-[#C9A84C]/20">
              {t('btnCandidater')}
            </Link>
            <Link href={'/' + locale + '/billetterie'} className="border border-white/30 hover:border-white text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-300">
              {t('btnTickets')}
            </Link>
          </div>

          {/* Boutons secondaires */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Link href={'/' + locale + '/contact?motif=partenaire'} className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#C9A84C] border border-[#C9A84C]/40 hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 px-4 py-2 transition-all duration-300">
              {ta('partenaire')}
            </Link>
            {['parrain', 'investir', 'donation', 'consultation'].map((key) => (
              <Link key={key} href={'/' + locale + '/contact?motif=' + key} className="text-[10px] font-medium tracking-[0.1em] uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 transition-all duration-300">
                {ta(key)}
              </Link>
            ))}
          </div>

          {/* Eligibilité */}
          <p className="text-white/35 text-[11px] tracking-wide">
            Pour les femmes rondes, fières et ambitieuses · 18 à 35 ans
          </p>
        </div>
      </div>

      {/* COLONNE DROITE - Photo */}
      <div className="hidden lg:block lg:w-1/2 relative">
        {/* Dégradé de gauche pour fusionner avec le noir */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        {/* Dégradé du bas */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
        <Image
          src="/images/accueil.jpg"
          alt="Miss Ronde Cameroun 2026"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/4 -translate-x-1/2 lg:left-1/4 flex flex-col items-center gap-2 z-10">
        <span className="text-white/25 text-[9px] tracking-[0.3em] uppercase">Découvrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/50 to-transparent animate-bounce" />
      </div>

    </section>
  )
}
