import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import Revele from '@/composants/ui/Revele'
import { editions } from '@/contenu/editions'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; annee: string }>
}): Promise<Metadata> {
  const { locale, annee } = await params
  const t = await getTranslations({ locale, namespace: 'pageEditions' })
  return { title: t('detailTitre', { annee }) }
}

export default async function PageEdition({
  params,
}: {
  params: Promise<{ locale: string; annee: string }>
}) {
  const { locale, annee } = await params
  setRequestLocale(locale)

  const edition = editions.find((e) => e.annee === annee)
  if (!edition) notFound()

  const t = await getTranslations('pageEditions')
  const tc = await getTranslations('commun')
  const aVenir = edition.statut === 'avenir'

  return (
    <CoquillePage
      locale={locale}
      label={aVenir ? t('aVenir') : t('passee')}
      titre={t('detailTitre', { annee })}
      chapeau={aVenir ? t('detailVenirTexte') : t('detailChapeau')}
    >
      {/* Photo de l'edition, affichee des qu'elle est renseignee dans contenu/editions.ts. */}
      {edition.photo && (
        <section className="section-page">
          <div className="bloc">
            <Revele className="edition-photo">
              <Image
                src={edition.photo}
                alt={t('detailTitre', { annee })}
                width={1600}
                height={1000}
                sizes="(max-width: 900px) 100vw, 1100px"
                priority
              />
            </Revele>
          </div>
        </section>
      )}

      <section className="section-page">
        <div className="bloc-etroit" style={{ textAlign: 'center' }}>
          <Revele>
            <h2 className="titre-bloc">{aVenir ? t('detailVenirTitre') : t('detailVide')}</h2>
            <div className="appel-boutons">
              {aVenir && (
                <Link href={`/${locale}/candidatures`} className="btn-or">
                  {tc('candidater')}
                </Link>
              )}
              <Link href={`/${locale}/editions`} className="btn-contour btn-contour-clair">
                ← {t('retour')}
              </Link>
            </div>
          </Revele>
        </div>
      </section>
    </CoquillePage>
  )
}
