import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import Revele from '@/composants/ui/Revele'
import { editions } from '@/contenu/editions'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageEditions' })
  return { title: t('titre'), description: t('chapeau') }
}

export default async function PageEditions({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pageEditions')

  return (
    <CoquillePage locale={locale} label={t('label')} titre={t('titre')} chapeau={t('chapeau')}>
      <section className="section-page">
        <div className="bloc">
          <div className="grille-editions">
            {editions.map((edition, i) => (
              <Revele key={edition.annee} delai={i * 90}>
                <Link
                  href={`/${locale}/editions/${edition.annee}`}
                  className={[
                    'carte-edition',
                    edition.photo ? 'carte-edition-illustree' : '',
                    edition.statut === 'avenir' ? 'carte-edition-avenir' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {/* La photo, quand elle a ete fournie, prend toute la carte. */}
                  {edition.photo && (
                    <Image
                      src={edition.photo}
                      alt={t('detailTitre', { annee: edition.annee })}
                      fill
                      sizes="(max-width: 700px) 50vw, 25vw"
                      className="carte-edition-image"
                    />
                  )}
                  <span className="carte-edition-contenu">
                    <span className="carte-edition-statut">
                      {edition.statut === 'avenir' ? t('aVenir') : t('passee')}
                    </span>
                    <span className="carte-edition-annee">{edition.annee}</span>
                    <span className="carte-edition-lien">{t('voir')} →</span>
                  </span>
                </Link>
              </Revele>
            ))}
          </div>
        </div>
      </section>
    </CoquillePage>
  )
}
