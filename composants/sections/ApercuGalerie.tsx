'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

const editions = [
  { annee: '2025', couleur: 'from-[#C9A84C]/30 to-[#9A7A2E]/20' },
  { annee: '2024', couleur: 'from-[#9A7A2E]/30 to-[#C9A84C]/20' },
  { annee: '2023', couleur: 'from-[#E8C97A]/20 to-[#C9A84C]/30' },
]

export default function ApercuGalerie({ locale }: { locale: string }) {
  const t = useTranslations('galerie')
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

  return (
    <section ref={ref} className="py-28 bg-[#F2EFE8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

          <div className="flex items-center justify-between mb-16 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A84C]">
                  {t('label')}
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-normal text-[#1A1714] leading-tight">
                {t('titre')}
              </h2>
            </div>
            <Link
              href={`/${locale}/galerie`}
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1A1714] border-b border-[#C9A84C] pb-1 hover:text-[#C9A84C] transition-colors duration-300"
            >
              {t('btnVoir')} →
            </Link>
          </div>

          {/* Grille éditions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {editions.map((edition, index) => (
              <Link
                key={edition.annee}
                href={`/${locale}/editions/${edition.annee}`}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${edition.couleur} group-hover:scale-105 transition-transform duration-700`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-16 h-px bg-[#C9A84C]/50 mb-4" />
                  <span className="font-display text-5xl font-bold text-[#C9A84C]/40 group-hover:text-[#C9A84C]/70 transition-colors duration-500">
                    {edition.annee}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#4A4438] mt-2">
                    Édition
                  </span>
                  <div className="w-16 h-px bg-[#C9A84C]/50 mt-4" />
                </div>
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-end justify-center pb-8">
                  <span className="text-white text-[11px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    Voir l'édition →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Galerie photos placeholder 4 colonnes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-[#E8E2D5] to-[#D4CCB8] flex items-center justify-center group overflow-hidden"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#999080] group-hover:scale-110 transition-transform duration-300">
                  Photo {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
