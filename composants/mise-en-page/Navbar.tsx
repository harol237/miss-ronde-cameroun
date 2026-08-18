'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import SelecteurLangue from '@/composants/ui/SelecteurLangue'

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const th = useTranslations('hero')
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [defile, setDefile] = useState(false)
  const chemin = usePathname() ?? ''

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermeture du menu mobile a la touche Echap + blocage du defilement de fond.
  useEffect(() => {
    if (!menuOuvert) return
    const onTouche = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOuvert(false)
    }
    document.addEventListener('keydown', onTouche)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onTouche)
      document.body.style.overflow = ''
    }
  }, [menuOuvert])

  const liens = [
    { href: '/', label: t('accueil') },
    { href: '/a-propos', label: t('aPropos') },
    { href: '/candidatures', label: t('candidatures') },
    { href: '/galerie', label: t('galerie') },
    { href: '/editions', label: t('editions') },
    { href: '/actualites', label: t('actualites') },
    { href: '/contact', label: t('contact') },
  ]

  const estActif = (href: string) => {
    const complet = `/${locale}${href === '/' ? '' : href}`
    return href === '/' ? chemin === `/${locale}` || chemin === complet : chemin.startsWith(complet)
  }

  return (
    <nav className={`nav ${defile ? 'nav-defile' : ''}`}>
      <div className="nav-inner">

        <Link href={'/' + locale} className="nav-logo">
          <Image
            src="/images/logo.png"
            alt="Miss Ronde Cameroun"
            width={48}
            height={48}
            className="nav-logo-image"
            priority
          />
          <span className="nav-logo-texte">
            <span className="nav-logo-nom">Miss Ronde Cameroun</span>
            <span className="nav-logo-devise">{th('devise')}</span>
          </span>
        </Link>

        <ul className="nav-liens">
          {liens.map((lien) => (
            <li key={lien.href}>
              <Link
                href={'/' + locale + (lien.href === '/' ? '' : lien.href)}
                className={`nav-lien ${estActif(lien.href) ? 'nav-lien-actif' : ''}`}
                aria-current={estActif(lien.href) ? 'page' : undefined}
              >
                {lien.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <SelecteurLangue locale={locale} />
          <Link href={'/' + locale + '/billetterie'} className="nav-cta">
            {t('billetterie')}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="nav-burger"
          aria-label={menuOuvert ? t('fermer') : t('menu')}
          aria-expanded={menuOuvert}
          aria-controls="menu-mobile"
        >
          <span className={`nav-burger-trait ${menuOuvert ? 'nav-burger-trait-1' : ''}`} />
          <span className={`nav-burger-trait ${menuOuvert ? 'nav-burger-trait-2' : ''}`} />
          <span className={`nav-burger-trait ${menuOuvert ? 'nav-burger-trait-3' : ''}`} />
        </button>
      </div>

      <div id="menu-mobile" className={`menu-mobile ${menuOuvert ? 'menu-mobile-ouvert' : ''}`} hidden={!menuOuvert}>
        <div className="menu-mobile-inner">
          {liens.map((lien, i) => (
            <Link
              key={lien.href}
              href={'/' + locale + (lien.href === '/' ? '' : lien.href)}
              onClick={() => setMenuOuvert(false)}
              className={`menu-mobile-lien ${estActif(lien.href) ? 'menu-mobile-lien-actif' : ''}`}
              style={{ transitionDelay: menuOuvert ? `${80 + i * 45}ms` : '0ms' }}
            >
              {lien.label}
            </Link>
          ))}
          <SelecteurLangue locale={locale} variante="mobile" />
          <Link
            href={'/' + locale + '/billetterie'}
            onClick={() => setMenuOuvert(false)}
            className="menu-mobile-cta"
          >
            {t('billetterie')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
