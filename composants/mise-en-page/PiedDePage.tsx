'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

const reseaux = [
  { nom: 'Instagram', href: 'https://www.instagram.com/missrondecamerounofficiel', sigle: 'IG' },
  { nom: 'Facebook', href: 'https://www.facebook.com/share/18koDeNzwe/', sigle: 'FB' },
  { nom: 'YouTube', href: 'https://youtube.com/@missrondecamerounofficiel', sigle: 'YT' },
]

const legal = [
  { href: '/legal/mentions-legales', label: 'Mentions legales' },
  { href: '/legal/politique-confidentialite', label: 'Politique de confidentialite' },
  { href: '/legal/conditions-generales-vente', label: 'CGV' },
  { href: '/legal/conditions-generales-utilisation', label: 'CGU' },
  { href: '/legal/reglement-concours', label: 'Reglement du concours' },
  { href: '/legal/charte-inclusive', label: 'Charte inclusive' },
]

export default function PiedDePage({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')

  const liens = [
    { href: '/', label: tn('accueil') },
    { href: '/candidatures', label: tn('candidatures') },
    { href: '/galerie', label: tn('galerie') },
    { href: '/editions', label: tn('editions') },
    { href: '/actualites', label: tn('actualites') },
    { href: '/billetterie', label: tn('billetterie') },
    { href: '/contact', label: tn('contact') },
    { href: '/a-propos', label: tn('aPropos') },
  ]

  return (
    <footer className="bg-[#090909] border-t border-[#C9A84C]/10">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href={'/' + locale} className="flex flex-col leading-none mb-6">
              <span className="font-display text-lg font-bold text-white tracking-wide">
                Miss Ronde <span className="text-[#C9A84C]">&amp;</span> Belle
              </span>
              <span className="text-[10px] font-light tracking-[0.3em] text-[#C9A84C] uppercase mt-0.5">
                Cameroun
              </span>
            </Link>
            <p className="text-[13px] text-white/60 leading-relaxed mb-6 max-w-[220px]">
              {t('slogan')}
            </p>
            <p className="font-accent text-base italic text-[#C9A84C]/60">
              Je suis Rondement Belle et je m&apos;assume
            </p>
            <div className="flex gap-3 mt-6">
              {reseaux.map((r) => (
                <a key={r.nom} href={r.href} target="_blank" rel="noopener noreferrer" aria-label={r.nom}
                  className="w-9 h-9 border border-[#C9A84C]/25 flex items-center justify-center text-[11px] font-medium text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-all duration-300">
                  {r.sigle}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C9A84C] mb-6">
              {t('navigation')}
            </h4>
            <ul className="space-y-3">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link href={'/' + locale + lien.href}
                    className="text-[13px] text-white/70 hover:text-[#E8C97A] transition-colors duration-200">
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C9A84C] mb-6">Legal</h4>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={'/' + locale + l.href}
                    className="text-[13px] text-white/70 hover:text-[#E8C97A] transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#C9A84C] mb-6">
              {t('contact')}
            </h4>
            <ul className="space-y-4">
              <li><a href="mailto:missrondecameroun@gmail.com" className="text-[13px] text-white/70 hover:text-[#E8C97A] transition-colors duration-200 block">missrondecameroun@gmail.com</a></li>
              <li><a href="tel:+237675238097" className="text-[13px] text-white/70 hover:text-[#E8C97A] transition-colors duration-200 block">+237 6 75 23 80 97</a></li>
              <li className="text-[13px] text-white/50">Yaounde, Cameroun</li>
            </ul>
            <Link href={'/' + locale + '/candidatures'}
              className="inline-block mt-8 bg-[#C9A84C]/10 hover:bg-[#C9A84C] border border-[#C9A84C]/30 hover:border-[#C9A84C] text-[#C9A84C] hover:text-black text-[10px] font-bold tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300">
              Candidater 2026
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/70 tracking-wide">{t('droits')}</p>
          <p className="text-[11px] text-white/30 tracking-wide">missrondecameroun.cm</p>
        </div>
      </div>
    </footer>
  )
}