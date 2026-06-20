'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

export default function BanniereTickets({ locale }: { locale: string }) {
  const t = useTranslations('tickets')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden">

      {/* Fond animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1C1710] to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C]/6 blur-3xl animate-pulse" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 40px, #C9A84C 40px, #C9A84C 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #C9A84C 40px, #C9A84C 41px)`
        }} />
      </div>

      <div className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-[#C9A84C]/50" />
          <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A84C]">
            {t('label')}
          </span>
          <div className="w-12 h-px bg-[#C9A84C]/50" />
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-normal text-white leading-tight mb-6">
          {t('titre')}
        </h2>

        <p className="text-[14px] text-white/40 leading-relaxed mb-12 max-w-lg mx-auto">
          {t('desc')}
        </p>

        {/* Icônes moyens de paiement */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {['Carte bancaire', 'PayPal', 'Orange Money', 'MTN Mobile Money'].map((moyen) => (
            <div key={moyen} className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <span className="text-[11px] tracking-[0.1em] text-white/40">{moyen}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/${locale}/billetterie`}
          className="group relative inline-block bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.25em] uppercase px-12 py-5 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">{t('btnVoir')}</span>
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  )
}
