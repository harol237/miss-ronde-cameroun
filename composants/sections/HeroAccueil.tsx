'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

function CompteARebours() {
  const [temps, setTemps] = useState({ jours: 0, heures: 0, minutes: 0, secondes: 0 })

  useEffect(() => {
    const finale = new Date('2026-12-31T20:00:00')
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

  const unite = [
    { valeur: temps.jours, label: 'Jours' },
    { valeur: temps.heures, label: 'Heures' },
    { valeur: temps.minutes, label: 'Minutes' },
    { valeur: temps.secondes, label: 'Secondes' },
  ]

  return (
    <div className="flex gap-4 md:gap-8">
      {unite.map(({ valeur, label }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-4xl md:text-6xl font-bold text-white leading-none tabular-nums">
            {String(valeur).padStart(2, '0')}
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function HeroAccueil({ locale }: { locale: string }) {
  const t = useTranslations('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">

      {/* Fond animé doré */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1C1710] to-black" />
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-[#C9A84C]/8 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-gradient-to-tr from-[#C9A84C]/5 via-transparent to-transparent" />
        {/* Cercles lumineux animés */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-[#C9A84C]/3 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M30 0l2 8h8l-6 5 2 8-6-5-6 5 2-8-6-5h8z'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Ligne dorée verticale décorative */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C9A84C]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <div className="w-px h-24 bg-gradient-to-b from-[#C9A84C] to-transparent" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-24 pb-16 w-full">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge édition */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[11px] font-medium tracking-[0.4em] uppercase text-[#C9A84C]">
              {t('edition')}
            </span>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>

          {/* Titre principal */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-white leading-[0.95] tracking-tight mb-6">
            Miss Ronde
            <br />
            <em className="text-[#C9A84C] font-normal italic">&amp; Belle</em>
            <br />
            <span className="text-white/90">Cameroun</span>
          </h1>

          {/* Slogan */}
          <p className="font-accent text-xl md:text-2xl font-light text-white/50 tracking-wide mb-12 max-w-lg italic">
            {t('slogan')}
          </p>

          {/* Compte à rebours */}
          <div className="mb-12">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">
              Finale — Décembre 2026
            </p>
            <CompteARebours />
          </div>

          {/* Boutons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/candidatures`}
              className="group relative bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">{t('btnCandidater')}</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
            <Link
              href={`/${locale}/billetterie`}
              className="border border-white/30 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] text-[11px] font-medium tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300"
            >
              {t('btnTickets')}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/25">Découvrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C]/60 to-transparent animate-bounce" />
      </div>

    </section>
  )
}
