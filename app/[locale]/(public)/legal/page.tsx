import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import Revele from '@/composants/ui/Revele'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageLegal' })
  return { title: t('titre'), description: t('chapeau') }
}

export default async function PageLegal({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pageLegal')
  const tf = await getTranslations('footer')

  const documents = [
    { href: 'mentions-legales', titre: tf('mentions'), desc: t('mentionsDesc') },
    { href: 'politique-confidentialite', titre: tf('confidentialite'), desc: t('confidentialiteDesc') },
    { href: 'conditions-generales-vente', titre: tf('cgv'), desc: t('cgvDesc') },
    { href: 'conditions-generales-utilisation', titre: tf('cgu'), desc: t('cguDesc') },
    { href: 'reglement-concours', titre: tf('reglement'), desc: t('reglementDesc') },
    { href: 'charte-inclusive', titre: tf('charte'), desc: t('charteDesc') },
  ]

  return (
    <CoquillePage locale={locale} label={t('label')} titre={t('titre')} chapeau={t('chapeau')}>
      <section className="section-page">
        <div className="bloc">
          <div className="grille-legal">
            {documents.map((document, i) => (
              <Revele key={document.href} delai={i * 70}>
                <Link href={`/${locale}/legal/${document.href}`} className="carte-legal">
                  <h2 className="carte-legal-titre">{document.titre}</h2>
                  <p className="carte-legal-desc">{document.desc}</p>
                  <span className="carte-legal-lien">{t('consulter')} →</span>
                </Link>
              </Revele>
            ))}
          </div>
        </div>
      </section>
    </CoquillePage>
  )
}
