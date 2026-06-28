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
    <div className="flex gap-5 md:gap-7">
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
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C] mt-1 font-medium">{l}</span>
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
    <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-black">

      {/* COLONNE GAUCHE - Photo */}
      <div className="relative w-full lg:w-[45%] h-[50vh] lg:h-screen">
        <Image
          src="/images/accueil.jpg"
          alt="Miss Ronde Cameroun 2026"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dégradés de fusion avec le noir */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent hidden lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent lg:hidden" />
        {/* Cadre doré décoratif */}
        <div className="absolute inset-6 border border-[#C9A84C]/20 pointer-events-none hidden lg:block" />
      </div>

      {/* COLONNE DROITE - Texte */}
      <div className="relative z-10 w-full lg:w-[55%] flex items-center px-8 lg:px-16 py-16 lg:py-0 bg-black">
        <div className={`w-full transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#C9A84C]">
              Édition 2026 · 11ème édition
            </span>
          </div>

          {/* Titre */}
          <h1 className="font-display font-normal text-white leading-none tracking-tight mb-4" style={{ fontSize: 'clamp(48px, 6vw, 84px)' }}>
            Miss Ronde
            <br />
            Cameroun
          </h1>

          {/* Devise */}
          <p className="text-[#C9A84C] text-xs md:text-sm font-bold tracking-[0.35em] uppercase mb-4">
            Élégance · Confiance · Inspiration
          </p>

          {/* Thème */}
          <p className="text-white/85 text-sm md:text-base font-light italic mb-6 leading-relaxed max-w-lg">
            Beauté, Dignité et Autonomie : La Femme Ronde au cœur du Développement
          </p>

          {/* Prix */}
          <div className="inline-flex items-center gap-3 border-l-2 border-[#C9A84C] pl-4 mb-8">
            <div>
              <p className="text-[#C9A84C] font-display text-2xl md:text-3xl font-bold leading-none">1 Million FCFA</p>
              <p className="text-white/85 text-xs mt-1">+ cadeaux, opportunités et formations</p>
            </div>
          </div>

          {/* Compte à rebours */}
          <div className="mb-8">
            <p className="text-white/85 text-[10px] tracking-[0.25em] uppercase mb-3">
              Grande Finale · 29 Décembre 2026
            </p>
            <CompteARebours />
          </div>

          {/* Boutons principaux */}
          <div className="flex flex-wrap gap-3 mb-5">
            <Link href={'/' + locale + '/candidatures'} className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-300">
              Candidature 2026
            </Link>
            <Link href={'/' + locale + '/billetterie'} className="border border-white/40 hover:border-white text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-300">
              Acheter un ticket
            </Link>
          </div>

          {/* Boutons secondaires */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Link href={'/' + locale + '/contact?motif=partenaire'} className="text-[10px] font-medium tracking-[0.1em] uppercase text-[#C9A84C] border border-[#C9A84C]/40 hover:bg-[#C9A84C]/10 px-4 py-2 transition-all duration-300">
              {ta('partenaire')}
            </Link>
            {['parrain', 'investir', 'donation', 'consultation'].map((key) => (
              <Link key={key} href={'/' + locale + '/contact?motif=' + key} className="text-[10px] font-medium tracking-[0.1em] uppercase text-white/85 border border-white/15 hover:border-white/40 hover:text-white px-4 py-2 transition-all duration-300">
                {ta(key)}
              </Link>
            ))}
          </div>

          <p className="text-white/80 text-[11px] tracking-wide">
            Pour les femmes rondes, fières et ambitieuses · 18 à 35 ans
          </p>
        </div>
      </div>
    </section>
  )
}
