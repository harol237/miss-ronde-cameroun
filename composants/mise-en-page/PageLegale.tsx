import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import { trouverDocument } from '@/contenu/legal'

/** Metadonnees communes a tous les documents legaux. */
export async function metadonneesLegales(cle: string, locale: string): Promise<Metadata> {
  const document = trouverDocument(cle)
  if (!document) return {}
  const version = document.traductions[locale] ?? document.traductions.fr
  return { title: version.titre, description: version.chapeau }
}

export default async function PageLegale({
  locale,
  cle,
}: {
  locale: string
  cle: string
}) {
  setRequestLocale(locale)

  const document = trouverDocument(cle)
  if (!document) notFound()

  const version = document.traductions[locale] ?? document.traductions.fr
  const t = await getTranslations('pageLegal')

  const dateLisible = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
    new Date(document.maj)
  )

  return (
    <CoquillePage
      locale={locale}
      label={t('label')}
      titre={version.titre}
      chapeau={version.chapeau}
    >
      <section className="section-page">
        <div className="bloc-etroit">
          <p className="legal-maj">
            {t('majLe')} {dateLisible}
          </p>

          {version.sections.map((section, index) => (
            <section key={section.titre} className="legal-section">
              <h2 className="legal-titre">
                <span className="legal-numero">{String(index + 1).padStart(2, '0')}</span>
                {section.titre}
              </h2>
              {section.paragraphes?.map((paragraphe, i) => (
                <p key={i} className="texte-bloc">{paragraphe}</p>
              ))}
              {section.liste && (
                <ul className="legal-liste">
                  {section.liste.map((element, i) => (
                    <li key={i}>{element}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="appel-boutons" style={{ justifyContent: 'flex-start' }}>
            <Link href={`/${locale}/legal`} className="btn-contour btn-contour-clair">
              ← {t('titre')}
            </Link>
          </div>
        </div>
      </section>
    </CoquillePage>
  )
}
