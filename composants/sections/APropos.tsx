'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

function TexteDefilant() {
  const texte = "MISS RONDE CAMEROUN \u2022 JE SUIS RONDEMENT BELLE ET JE M'ASSUME \u2022 "
  return (
    <div style={{overflow:'hidden',padding:'18px 0',background:'#C9A84C'}}>
      <div style={{display:'flex',whiteSpace:'nowrap',animation:'defilement 20s linear infinite'}}>
        {Array.from({length:6}).map((_,i) => (
          <span key={i} style={{fontSize:'12px',fontWeight:'700',letterSpacing:'0.3em',textTransform:'uppercase',color:'#000',marginRight:'0'}}>
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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = (cible / 2000) * 16
        const timer = setInterval(() => {
          start += step
          if (start >= cible) { setCompte(cible); clearInterval(timer) }
          else setCompte(Math.floor(start))
        }, 16)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [cible])

  return (
    <div ref={ref} className="stat-carte" style={{textAlign:'center',padding:'32px 24px',border:'1px solid rgba(201,168,76,0.2)',transition:'border-color 0.5s'}}
      onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(201,168,76,0.6)') }
      onMouseLeave={e => (e.currentTarget.style.borderColor='rgba(201,168,76,0.2)') }
    >
      <span className="stat-numero">{compte}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function APropos() {
  const t = useTranslations('apropos')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <TexteDefilant />
      <section ref={ref} className="section-apropos" style={{opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition:'all 1s ease'}}>
        <div className="wrapper">
          <div className="apropos-grille">
            <div className="apropos-texte">
              <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'24px'}}>
                <span className="ligne-or-sm" />
                <span className="section-label">{t('label')}</span>
              </div>
              <h2 className="section-titre section-titre-noir">{t('titre')}</h2>
              <p>{t('texte1')}</p>
              <p>{t('texte2')}</p>
              <div style={{display:'flex',alignItems:'center',gap:'16px',marginTop:'40px'}}>
                <span className="ligne-or-sm" />
                <span style={{fontFamily:'var(--font-accent),Georgia,serif',fontSize:'20px',fontStyle:'italic',color:'#C9A84C'}}>
                  La beauté sans frontières
                </span>
              </div>
            </div>
            <div className="apropos-stats">
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
