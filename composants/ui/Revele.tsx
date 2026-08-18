'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Fait apparaitre son contenu en douceur lorsqu'il entre dans l'ecran.
 * Remplace les IntersectionObserver recopies dans chaque section.
 */
export default function Revele({
  children,
  delai = 0,
  seuil = 0.15,
  className = '',
  as: Balise = 'div',
}: {
  children: React.ReactNode
  delai?: number
  seuil?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Si l'element est deja a l'ecran au chargement, on l'affiche sans attendre.
    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true)
          observateur.disconnect()
        }
      },
      { threshold: seuil, rootMargin: '0px 0px -60px 0px' }
    )
    observateur.observe(element)
    return () => observateur.disconnect()
  }, [seuil])

  return (
    <Balise
      ref={ref as React.Ref<never>}
      className={`revele ${visible ? 'revele-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delai}ms` }}
    >
      {children}
    </Balise>
  )
}
