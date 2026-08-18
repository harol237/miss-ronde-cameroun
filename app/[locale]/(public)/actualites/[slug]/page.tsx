import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import { trouverArticle } from '@/contenu/actualites'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const article = trouverArticle(slug)
  const t = await getTranslations({ locale, namespace: 'pageActualites' })
  if (!article) return { title: t('introuvable') }
  const contenu = article.traductions[locale] ?? Object.values(article.traductions)[0]
  return { title: contenu.titre, description: contenu.chapeau }
}

export default async function PageArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pageActualites')
  const article = trouverArticle(slug)

  if (!article) {
    return (
      <CoquillePage locale={locale} label={t('label')} titre={t('introuvable')} chapeau={t('introuvableTexte')}>
        <section className="section-page">
          <div className="bloc-etroit" style={{ textAlign: 'center' }}>
            <Link href={`/${locale}/actualites`} className="btn-or">← {t('retour')}</Link>
          </div>
        </section>
      </CoquillePage>
    )
  }

  const contenu = article.traductions[locale] ?? Object.values(article.traductions)[0]
  const dateLisible = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(article.date))

  return (
    <CoquillePage
      locale={locale}
      label={`${t('publieLe')} ${dateLisible}`}
      titre={contenu.titre}
      chapeau={contenu.chapeau}
    >
      <section className="section-page">
        <article className="bloc-etroit">
          {contenu.paragraphes.map((paragraphe, i) => (
            <p key={i} className="texte-bloc">{paragraphe}</p>
          ))}
          <div className="appel-boutons" style={{ justifyContent: 'flex-start' }}>
            <Link href={`/${locale}/actualites`} className="btn-contour btn-contour-clair">
              ← {t('retour')}
            </Link>
          </div>
        </article>
      </section>
    </CoquillePage>
  )
}
