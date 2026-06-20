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
    <div className="flex gap-4 md:gap-8">
      {[{v:temps.jours,l:'Jours'},{v:temps.heures,l:'Heures'},{v:temps.minutes,l:'Minutes'},{v:temps.secondes,l:'Secondes'}].map(({v,l}) => (
        <div key={l} className="flex flex-col items-center">
          <span className="font-display text-4xl md:text-6xl font-bold text-white leading-none tabular-nums">{String(v).padStart(2,'0')}</span>
          <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#C9A84C] mt-1">{l}</span>
        </div>
      ))}
    </div>
  )
}

export default function HeroAccueil({ locale }: { locale: string }) {
  const t = useTranslations('hero')
  const ta = useTranslations('actions')
  const [visible, setVisible] = useState(false)
  useEffect(() => { const timer = setTimeout(() => setVisible(true), 100); return () => clearTimeout(timer) }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1C1710] to-black" />
        <div className="absolute top-0 right-0 w-[70%] h-full bg-gradient-to-l from-[#C9A84C]/8 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-[#C9A84C]/3 blur-3xl animate-pulse" />
      </div>
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-[#C9A84C]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <div className="w-px h-24 bg-gradient-to-b from-[#C9A84C] to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-16 w-full">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-8">
            <Image src="/images/logo.jpg" alt="Miss Ronde Cameroun" width={70} height={70} className="rounded-full border-2 border-[#C9A84C]/50 object-cover" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[11px] font-medium tracking-[0.4em] uppercase text-[#C9A84C]">{t('edition')}</span>
              <div className="w-8 h-px bg-[#C9A84C]" />
            </div>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-white leading-[0.95] tracking-tight mb-4">
            Miss Ronde<br /><span className="text-white/90">Cameroun</span>
          </h1>
          <p className="font-accent text-lg md:text-xl font-light text-[#C9A84C] tracking-widest mb-2 uppercase">{t('devise')}</p>
          <p className="font-accent text-lg md:text-xl font-light text-white/50 tracking-wide mb-4 italic max-w-2xl">{t('theme')}</p>
          <p className="font-accent text-base italic text-white/30 mb-10">{t('slogan')}</p>
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">{t('dateFinale')} | {t('dateDemiFinale')}</p>
            <CompteARebours />
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            <Link href={'/' + locale + '/candidatures'} className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300">{t('btnCandidater')}</Link>
            <Link href={'/' + locale + '/billetterie'} className="border border-white/30 hover:border-[#C9A84C] text-white hover:text-[#C9A84C] text-[11px] font-medium tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300">{t('btnTickets')}</Link>
            <Link href={'/' + locale + '/contact?motif=partenaire'} className="border border-[#C9A84C]/40 hover:border-[#C9A84C] text-[#C9A84C]/70 hover:text-[#C9A84C] text-[11px] font-medium tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300">{t('btnPartenaire')}</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {['partenaire','parrain','investir','donation','consultation'].map((key) => (
              <Link key={key} href={'/' + locale + '/contact?motif=' + key} className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/40 hover:text-[#C9A84C] border border-white/10 hover:border-[#C9A84C]/40 px-4 py-2 transition-all duration-300">
                {ta(key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/25">Decouvrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C]/60 to-transparent animate-bounce" />
      </div>
    </section>
  )
}
