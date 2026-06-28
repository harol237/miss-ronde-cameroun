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
    <div className="flex gap-6 md:gap-10">
      {[
        { v: temps.jours, l: 'Jours' },
        { v: temps.heures, l: 'Heures' },
        { v: temps.minutes, l: 'Minutes' },
        { v: temps.secondes, l: 'Secondes' },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <span className="font-display text-4xl md:text-6xl font-bold text-white leading-none tabular-nums drop-shadow-lg">
            {String(v).padStart(2, '0')}
          </span>
          <span className="text-[9px] md:text-[11px] tracking-[0.25em] uppercase text-[#C9A84C] mt-1 font-medium">
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
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/accueil.jpg"
          alt="Miss Ronde Cameroun 2026"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay dégradé pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Ligne dorée gauche */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-[#C9A84C]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <div className="w-px h-20 bg-gradient-to-b from-[#C9A84C] to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 pt-28 pb-16 w-full">
        <div className={`max-w-2xl transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge édition */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[11px] font-semibold tracking-[0.4em] uppercase text-[#C9A84C]">
              {t('edition')} — 11ème édition
            </span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>

          {/* Titre */}
          <h1 className="font-display font-normal text-white leading-[0.95] tracking-tight mb-4" style={{ fontSize: 'clamp(52px, 8vw, 96px)' }}>
            Miss Ronde
            <br />
            <span className="text-white">Cameroun</span>
          </h1>

          {/* Devise */}
          <p className="text-[#C9A84C] text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-3">
            {t('devise')}
          </p>

          {/* Thème */}
          <p className="text-white/80 text-base md:text-lg font-light italic mb-2 leading-relaxed">
            {t('theme')}
          </p>

          {/* Prix */}
          <div className="inline-flex items-center gap-3 bg-[#C9A84C]/15 border border-[#C9A84C]/40 px-5 py-3 mb-8 mt-2">
            <span className="text-[#C9A84C] font-display text-2xl font-bold">1 Million FCFA</span>
            <span className="text-white/70 text-sm">+ cadeaux & opportunités</span>
          </div>

          {/* Compte à rebours */}
          <div className="mb-8">
            <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-4">
              Grande Finale · 29 Décembre 2026 &nbsp;|&nbsp; Demi-finale · Novembre 2026
            </p>
            <CompteARebours />
          </div>

          {/* Boutons principaux */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Link
              href={'/' + locale + '/candidatures'}
              className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[12px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 shadow-lg shadow-[#C9A84C]/20"
            >
              {t('btnCandidater')}
            </Link>
            <Link
              href={'/' + locale + '/billetterie'}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/40 hover:border-white text-white text-[12px] font-semibold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
            >
              {t('btnTickets')}
            </Link>
            <Link
              href={'/' + locale + '/contact?motif=partenaire'}
              className="bg-transparent border border-[#C9A84C] hover:bg-[#C9A84C]/10 text-[#C9A84C] text-[12px] font-semibold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
            >
              {t('btnPartenaire')}
            </Link>
          </div>

          {/* Boutons secondaires */}
          <div className="flex flex-wrap gap-2">
            {['parrain', 'investir', 'donation', 'consultation'].map((key) => (
              <Link
                key={key}
                href={'/' + locale + '/contact?motif=' + key}
                className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/70 hover:text-[#C9A84C] border border-white/20 hover:border-[#C9A84C]/50 px-4 py-2 transition-all duration-300 backdrop-blur-sm"
              >
                {ta(key)}
              </Link>
            ))}
          </div>

          {/* Eligibilité */}
          <p className="text-white/50 text-[12px] mt-6 tracking-wide">
            Pour les femmes rondes, fières et ambitieuses · 18 à 35 ans
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase">Découvrir</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent animate-bounce" />
      </div>

    </section>
  )
}
