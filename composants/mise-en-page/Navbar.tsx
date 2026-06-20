'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [defileé, setDefileé] = useState(false)

  useEffect(() => {
    const onScroll = () => setDefileé(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const liens = [
    { href: '/', label: t('accueil') },
    { href: '/candidatures', label: t('candidatures') },
    { href: '/galerie', label: t('galerie') },
    { href: '/editions', label: t('editions') },
    { href: '/actualites', label: t('actualites') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      defileé ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-display text-lg font-bold text-white tracking-wide group-hover:text-[#E8C97A] transition-colors duration-300">
            Miss Ronde <span className="text-[#C9A84C]">&</span> Belle
          </span>
          <span className="text-[10px] font-light tracking-[0.3em] text-[#C9A84C] uppercase">
            Cameroun
          </span>
        </Link>

        {/* Liens desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {liens.map((lien) => (
            <li key={lien.href}>
              <Link
                href={`/${locale}${lien.href}`}
                className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/70 hover:text-[#E8C97A] transition-colors duration-300 relative group"
              >
                {lien.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Sélecteur langue + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex gap-1">
            {['fr', 'en', 'es'].map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`text-[10px] font-medium tracking-[0.1em] uppercase px-2 py-1 rounded transition-all duration-200 ${
                  locale === l
                    ? 'text-[#C9A84C] border border-[#C9A84C]/50'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/billetterie`}
            className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-semibold tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300"
          >
            {t('billetterie')}
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          onClick={() => setMenuOuvert(!menuOuvert)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOuvert ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOuvert ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOuvert ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menu mobile */}
      <div className={`lg:hidden bg-black/98 transition-all duration-500 overflow-hidden ${
        menuOuvert ? 'max-h-screen py-6' : 'max-h-0'
      }`}>
        <div className="px-6 flex flex-col gap-4">
          {liens.map((lien) => (
            <Link
              key={lien.href}
              href={`/${locale}${lien.href}`}
              onClick={() => setMenuOuvert(false)}
              className="text-[12px] font-medium tracking-[0.2em] uppercase text-white/70 hover:text-[#E8C97A] transition-colors py-2 border-b border-white/5"
            >
              {lien.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            {['fr', 'en', 'es'].map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={`text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-1.5 rounded transition-all duration-200 ${
                  locale === l
                    ? 'text-[#C9A84C] border border-[#C9A84C]/50'
                    : 'text-white/40 border border-white/10'
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/billetterie`}
            onClick={() => setMenuOuvert(false)}
            className="bg-[#C9A84C] text-black text-[11px] font-semibold tracking-[0.15em] uppercase px-5 py-3 rounded-sm text-center mt-2"
          >
            {t('billetterie')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
