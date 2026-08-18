'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { CONTACT, RESEAUX } from '@/contenu/evenement'

export default function PiedDePage({ locale }: { locale: string }) {
  const t = useTranslations('footer')
  const tn = useTranslations('nav')
  const th = useTranslations('hero')

  const liens = [
    { href: '/', label: tn('accueil') },
    { href: '/a-propos', label: tn('aPropos') },
    { href: '/candidatures', label: tn('candidatures') },
    { href: '/galerie', label: tn('galerie') },
    { href: '/editions', label: tn('editions') },
    { href: '/actualites', label: tn('actualites') },
    { href: '/billetterie', label: tn('billetterie') },
    { href: '/contact', label: tn('contact') },
  ]

  const legal = [
    { href: '/legal/mentions-legales', label: t('mentions') },
    { href: '/legal/politique-confidentialite', label: t('confidentialite') },
    { href: '/legal/conditions-generales-vente', label: t('cgv') },
    { href: '/legal/conditions-generales-utilisation', label: t('cgu') },
    { href: '/legal/reglement-concours', label: t('reglement') },
    { href: '/legal/charte-inclusive', label: t('charte') },
  ]

  return (
    <footer className="pied">
      <div className="pied-filet" />
      <div className="pied-inner">
        <div className="pied-grille">

          <div className="pied-colonne pied-colonne-marque">
            <Link href={'/' + locale} className="pied-marque">
              <span className="pied-marque-nom">Miss Ronde Cameroun</span>
              <span className="pied-marque-devise">{t('slogan')}</span>
            </Link>
            <p className="pied-citation">{th('slogan')}</p>
            <div className="pied-reseaux">
              {RESEAUX.map((r) => (
                <a
                  key={r.nom}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.nom}
                  className="pied-reseau"
                >
                  {r.sigle}
                </a>
              ))}
            </div>
          </div>

          <div className="pied-colonne">
            <h2 className="pied-titre">{t('navigation')}</h2>
            <ul className="pied-liste">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <Link
                    href={'/' + locale + (lien.href === '/' ? '' : lien.href)}
                    className="pied-lien"
                  >
                    {lien.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pied-colonne">
            <h2 className="pied-titre">{t('legal')}</h2>
            <ul className="pied-liste">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={'/' + locale + l.href} className="pied-lien">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pied-colonne">
            <h2 className="pied-titre">{t('contact')}</h2>
            <ul className="pied-liste">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="pied-lien">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.telephoneLien} className="pied-lien">
                  {CONTACT.telephone}
                </a>
              </li>
              <li className="pied-texte">{t('ville')}</li>
            </ul>
            <Link href={'/' + locale + '/candidatures'} className="pied-cta">
              {t('candidater')}
            </Link>
          </div>
        </div>
      </div>

      <div className="pied-bas">
        <div className="pied-bas-inner">
          <p>{t('droits')}</p>
          <p>missrondecameroun.cm</p>
        </div>
      </div>
    </footer>
  )
}
