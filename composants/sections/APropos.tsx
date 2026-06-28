'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

function TexteDefilant() {
  const texte = 'MISS RONDE & BELLE CAMEROUN • JE SUIS RONDEMENT BELLE ET JE M\'ASSUME • '
  const repetitions = 4

  return (
    <div className="overflow-hidden py-6 bg-[#C9A84C] my-0">
      <div className="flex whitespace-nowrap animate-[defilement_20s_linear_infinite]">
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} className="text-black text-[11px] font-bold tracking-[0.3em] uppercase mx-0">
            {texte}
          </span>
        ))}
      </div>
    </div>
  )
}

function StatAnime({ nombre, label }: { nombre: string; label: string }) {
  const [compte, setCompte] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const cible = parseInt(nombre)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 2000
          const step = (cible / duration) * 16
          const timer = setInterval(() => {
            start += step
            if (start >= cible) {
              setCompte(cible)
              clearInterval(timer)
            } else {
              setCompte(Math.floor(start))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [cible])

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-6 border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all duration-500 group">
      <span className="font-display text-6xl font-bold text-[#C9A84C] leading-none group-hover:scale-110 transition-transform duration-300">
        {compte}
      </span>
      <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#4A4438] mt-2">
        {label}
      </span>
    </div>
  )
}

export default function APropos() {
  const t = useTranslations('apropos')
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
    <>
      <TexteDefilant />

      <section ref={ref} className="py-28 bg-[#FAF8F3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          <div className={`grid lg:grid-cols-2 gap-20 items-center transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>

            {/* Texte gauche */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#C9A84C]" />
                <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-[#C9A84C]">
                  {t('label')}
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-normal text-[#1A1714] leading-tight mb-8">
                {t('titre')}
              </h2>

              <div className="space-y-4">
                <p className="text-[#4A4438] leading-relaxed text-[15px]">
                  {t('texte1')}
                </p>
                <p className="text-[#4A4438] leading-relaxed text-[15px]">
                  {t('texte2')}
                </p>
              </div>

              {/* Ligne décorative */}
              <div className="flex items-center gap-4 mt-10">
                <div className="w-12 h-px bg-[#C9A84C]" />
                <span className="font-accent text-lg italic text-[#C9A84C]">
                  La beauté sans frontières
                </span>
              </div>
            </div>

            {/* Stats droite */}
            <div className="grid grid-cols-1 gap-4">
              <StatAnime nombre={t('stat1Nombre')} label={t('stat1Label')} />
              <StatAnime nombre={t('stat2Nombre')} label={t('stat2Label')} />
              <StatAnime nombre={t('stat3Nombre')} label={t('stat3Label')} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
