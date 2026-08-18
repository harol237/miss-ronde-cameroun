import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import Revele from '@/composants/ui/Revele'
import { articlesTries } from '@/contenu/actualites'
import { RESEAUX } from '@/contenu/evenement'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageActualites' })
  return { title: t('titre'), description: t('chapeau') }
}

export default async function PageActualites({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pageActualites')

  const articles = articlesTries()

  return (
    <CoquillePage locale={locale} label={t('label')} titre={t('titre')} chapeau={t('chapeau')}>
      <section className="section-page">
        <div className="bloc">
          {articles.length === 0 ? (
            <Revele className="etat-vide">
              <span className="etat-vide-marque" aria-hidden="true">✦</span>
              <h2 className="titre-bloc">{t('vide')}</h2>
              <p className="texte-bloc">{t('videTexte')}</p>
              <div className="contact-reseaux-liens etat-vide-liens">
                {RESEAUX.map((reseau) => (
                  <a key={reseau.nom} href={reseau.href} target="_blank" rel="noopener noreferrer" className="contact-reseau">
                    {reseau.nom}
                  </a>
                ))}
              </div>
            </Revele>
          ) : (
            <div className="grille-articles">
              {articles.map((article, i) => {
                const contenu = article.traductions[locale] ?? Object.values(article.traductions)[0]
                return (
                  <Revele key={article.slug} delai={i * 90}>
                    <Link href={`/${locale}/actualites/${article.slug}`} className="carte-article">
                      <time className="carte-article-date" dateTime={article.date}>
                        {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(article.date))}
                      </time>
                      <h2 className="carte-article-titre">{contenu.titre}</h2>
                      <p className="carte-article-chapeau">{contenu.chapeau}</p>
                      <span className="carte-article-lien">{t('lire')} →</span>
                    </Link>
                  </Revele>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </CoquillePage>
  )
}
