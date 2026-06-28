'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

export default function CommentParticiper({ locale }: { locale: string }) {
  const t = useTranslations('participer')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const etapes = [
    { numero: '01', titre: t('etape1Titre'), texte: t('etape1Texte') },
    { numero: '02', titre: t('etape2Titre'), texte: t('etape2Texte') },
    { numero: '03', titre: t('etape3Titre'), texte: t('etape3Texte') },
  ]

  return (
    <section ref={ref} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A84C]">
              {t('label')}
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-normal text-[#1A1714] leading-tight mb-16 max-w-xl">
            {t('titre')}
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {etapes.map((etape, index) => (
              <div
                key={etape.numero}
                className="group relative p-8 border border-[#C9A84C]/15 hover:border-[#C9A84C]/50 transition-all duration-500"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Numéro décoratif */}
                <div className="font-display text-7xl font-bold text-[#C9A84C]/10 group-hover:text-[#C9A84C]/20 transition-colors duration-500 leading-none mb-4 select-none">
                  {etape.numero}
                </div>

                {/* Ligne dorée top */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#C9A84C] group-hover:w-full transition-all duration-500" />

                <h3 className="font-display text-xl font-normal text-[#1A1714] mb-3">
                  {etape.titre}
                </h3>
                <p className="text-[14px] text-[#4A4438] leading-relaxed">
                  {etape.texte}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={`/${locale}/candidatures`}
              className="group relative inline-block bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">{t('btnCandidater')}</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
