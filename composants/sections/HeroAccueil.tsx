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
    <div style={{display:'flex', gap:'32px', alignItems:'flex-end'}}>
      {[
        { v: temps.jours, l: 'Jours' },
        { v: temps.heures, l: 'Heures' },
        { v: temps.minutes, l: 'Min' },
        { v: temps.secondes, l: 'Sec' },
      ].map(({ v, l }) => (
        <div key={l} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <span style={{fontFamily:'var(--font-display),Georgia,serif', fontSize:'64px', fontWeight:'700', color:'#fff', lineHeight:'1', fontVariantNumeric:'tabular-nums'}}>
            {String(v).padStart(2, '0')}
          </span>
          <span style={{fontSize:'10px', letterSpacing:'0.25em', textTransform:'uppercase', color:'#C9A84C', marginTop:'6px', fontWeight:'500'}}>
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
    <section style={{
      position:'relative',
      minHeight:'100vh',
      display:'flex',
      flexDirection:'row',
      overflow:'hidden',
      background:'#000',
    }}>

      {/* PHOTO GAUCHE */}
      <div style={{
        position:'relative',
        width:'45%',
        minHeight:'100vh',
        flexShrink: 0,
      }}>
        <Image
          src="/images/accueil.jpg"
          alt="Miss Ronde Cameroun 2026"
          fill
          style={{objectFit:'cover', objectPosition:'center top'}}
          priority
        />
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to right, transparent 60%, #000 100%)'
        }} />
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to top, #000 0%, transparent 30%)'
        }} />
      </div>

      {/* TEXTE DROITE */}
      <div style={{
        flex:1,
        display:'flex',
        alignItems:'center',
        padding:'120px 80px 80px 60px',
        background:'#000',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s ease',
      }}>
        <div style={{width:'100%', maxWidth:'600px'}}>

          {/* Badge */}
          <div style={{display:'flex', alignItems:'center', gap:'16px', marginBottom:'28px'}}>
            <div style={{width:'32px', height:'1px', background:'#C9A84C'}} />
            <span style={{fontSize:'11px', fontWeight:'600', letterSpacing:'0.4em', textTransform:'uppercase', color:'#C9A84C'}}>
              Édition 2026 · 11ème édition
            </span>
          </div>

          {/* Titre */}
          <h1 style={{
            fontFamily:'var(--font-display),Georgia,serif',
            fontSize:'clamp(64px, 8vw, 110px)',
            fontWeight:'400',
            color:'#fff',
            lineHeight:'0.95',
            letterSpacing:'-0.02em',
            marginBottom:'20px',
          }}>
            Miss Ronde<br />Cameroun
          </h1>

          {/* Devise */}
          <p style={{
            fontSize:'16px',
            fontWeight:'700',
            letterSpacing:'0.35em',
            textTransform:'uppercase',
            color:'#C9A84C',
            marginBottom:'16px',
          }}>
            Élégance · Confiance · Inspiration
          </p>

          {/* Thème */}
          <p style={{
            fontFamily:'var(--font-accent),Georgia,serif',
            fontSize:'20px',
            fontStyle:'italic',
            color:'rgba(255,255,255,0.65)',
            marginBottom:'24px',
            lineHeight:'1.6',
            maxWidth:'500px',
          }}>
            Beauté, Dignité et Autonomie : La Femme Ronde au cœur du Développement
          </p>

          {/* Prix */}
          <div style={{
            display:'inline-flex',
            alignItems:'center',
            gap:'16px',
            borderLeft:'3px solid #C9A84C',
            paddingLeft:'20px',
            marginBottom:'32px',
          }}>
            <div>
              <p style={{fontFamily:'var(--font-display),Georgia,serif', fontSize:'38px', fontWeight:'700', color:'#C9A84C', lineHeight:'1'}}>
                1 Million FCFA
              </p>
              <p style={{fontSize:'13px', color:'rgba(255,255,255,0.5)', marginTop:'4px'}}>
                + cadeaux, opportunités et formations
              </p>
            </div>
          </div>

          {/* Compte à rebours */}
          <div style={{marginBottom:'36px'}}>
            <p style={{fontSize:'10px', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:'16px'}}>
              Grande Finale · 29 Décembre 2026
            </p>
            <CompteARebours />
          </div>

          {/* Boutons principaux */}
          <div style={{display:'flex', flexWrap:'wrap', gap:'16px', marginBottom:'20px'}}>
            <Link href={'/' + locale + '/candidatures'} style={{
              background:'#C9A84C',
              color:'#000',
              fontSize:'12px',
              fontWeight:'700',
              letterSpacing:'0.2em',
              textTransform:'uppercase',
              padding:'18px 44px',
              display:'inline-block',
              transition:'background 0.3s',
              textDecoration:'none',
            }}
              onMouseEnter={e => (e.currentTarget.style.background='#E8C97A')}
              onMouseLeave={e => (e.currentTarget.style.background='#C9A84C')}
            >
              Candidature 2026
            </Link>
            <Link href={'/' + locale + '/billetterie'} style={{
              background:'transparent',
              color:'#fff',
              fontSize:'12px',
              fontWeight:'600',
              letterSpacing:'0.2em',
              textTransform:'uppercase',
              padding:'18px 44px',
              display:'inline-block',
              border:'1.5px solid rgba(255,255,255,0.4)',
              transition:'all 0.3s',
              textDecoration:'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#fff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.4)' }}
            >
              Acheter un ticket
            </Link>
          </div>

          {/* Boutons secondaires */}
          <div style={{display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'24px'}}>
            {['partenaire','parrain','investir','donation','consultation'].map((key) => (
              <Link key={key} href={'/' + locale + '/contact?motif=' + key} style={{
                fontSize:'12px',
                fontWeight:'500',
                letterSpacing:'0.15em',
                textTransform:'uppercase',
                color:'rgba(255,255,255,0.6)',
                border:'1px solid rgba(255,255,255,0.15)',
                padding:'12px 22px',
                display:'inline-block',
                transition:'all 0.3s',
                textDecoration:'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.color='#C9A84C'; e.currentTarget.style.borderColor='rgba(201,168,76,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)' }}
              >
                {ta(key)}
              </Link>
            ))}
          </div>

          <p style={{fontSize:'12px', color:'rgba(255,255,255,0.35)', letterSpacing:'0.05em'}}>
            Pour les femmes rondes, fières et ambitieuses · 18 à 35 ans
          </p>
        </div>
      </div>
    </section>
  )
}
