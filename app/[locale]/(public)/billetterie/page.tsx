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
  const t = await getTranslations({ locale, namespace: 'pageBilletterie' })
  return { title: t('titre'), description: t('chapeau') }
}

export default async function PageBilletterie({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pageBilletterie')
  const tt = await getTranslations('tickets')

  const categories = [1, 2, 3].map((n) => ({
    titre: t(`cat${n}Titre`),
    texte: t(`cat${n}Texte`),
  }))

  const moyens = ['moyen1', 'moyen2', 'moyen3', 'moyen4'].map((cle) => tt(cle))

  const infos = [
    { titre: t('dateTitre'), texte: t('dateTexte') },
    { titre: t('lieuTitre'), texte: t('lieuTexte') },
    { titre: t('contactTitre'), texte: t('contactTexte') },
  ]

  return (
    <CoquillePage locale={locale} label={t('label')} titre={t('titre')} chapeau={t('chapeau')}>

      <section className="section-page">
        <div className="bloc-etroit">
          <Revele className="bandeau-statut">
            <h2 className="bandeau-statut-titre">{t('statutTitre')}</h2>
            <p className="bandeau-statut-texte">{t('statutTexte')}</p>
            <Link href={`/${locale}/contact?motif=billet`} className="btn-or">
              {t('statutBouton')}
            </Link>
          </Revele>
        </div>
      </section>

      <section className="section-page section-page-alt">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('categoriesLabel')}</p>
            <h2 className="titre-bloc">{t('categoriesTitre')}</h2>
          </Revele>

          <div className="grille-categories">
            {categories.map((categorie, i) => (
              <Revele key={categorie.titre} delai={i * 100} className="carte-categorie">
                <h3 className="carte-categorie-titre">{categorie.titre}</h3>
                <p className="carte-categorie-texte">{categorie.texte}</p>
              </Revele>
            ))}
          </div>

          {/* TODO : tarifs de chaque categorie en FCFA, date d'ouverture de la
              vente et eventuels tarifs de groupe (a fournir). */}
          <Revele>
            <p className="note-discrete">{t('categoriesNote')}</p>
          </Revele>
        </div>
      </section>

      <section className="section-page section-page-sombre">
        <div className="bloc-etroit" style={{ textAlign: 'center' }}>
          <Revele>
            <p className="label-bloc" style={{ justifyContent: 'center' }}>{t('paiementLabel')}</p>
            <h2 className="titre-bloc">{t('paiementTitre')}</h2>
            <p className="texte-bloc">{t('paiementTexte')}</p>
            <div className="pastilles-paiement">
              {moyens.map((moyen) => (
                <span key={moyen} className="pastille-paiement">{moyen}</span>
              ))}
            </div>
          </Revele>
        </div>
      </section>

      <section className="section-page section-page-alt">
        <div className="bloc-etroit" style={{ textAlign: 'center' }}>
          <Revele>
            <h2 className="titre-bloc">{t('galaTitre')}</h2>
            <p className="texte-bloc">{t('galaTexte')}</p>
          </Revele>
        </div>
      </section>

      <section className="section-page">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('infosLabel')}</p>
          </Revele>
          <div className="grille-infos">
            {infos.map((info, i) => (
              <Revele key={info.titre} delai={i * 90} className="carte-info">
                <h3 className="carte-info-titre">{info.titre}</h3>
                <p className="carte-info-texte">{info.texte}</p>
              </Revele>
            ))}
          </div>
        </div>
      </section>

    </CoquillePage>
  )
}
