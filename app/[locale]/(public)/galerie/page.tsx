import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import GalerieFiltrable from '@/composants/sections/GalerieFiltrable'
import Revele from '@/composants/ui/Revele'
import { RESEAUX } from '@/contenu/evenement'

const INSTAGRAM = RESEAUX.find((r) => r.nom === 'Instagram')!.href

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageGalerie' })
  return { title: t('titre'), description: t('chapeau') }
}

export default async function PageGalerie({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pageGalerie')

  return (
    <CoquillePage locale={locale} label={t('label')} titre={t('titre')} chapeau={t('chapeau')}>
      <section className="section-page">
        <div className="bloc">
          <GalerieFiltrable />
        </div>
      </section>

      <section className="section-page section-page-sombre">
        <div className="bloc-etroit" style={{ textAlign: 'center' }}>
          <Revele>
            <h2 className="titre-bloc">{t('instaTitre')}</h2>
            <p className="texte-bloc">{t('instaTexte')}</p>
            <div className="appel-boutons">
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn-or">
                {t('instaBouton')}
              </a>
            </div>
          </Revele>
        </div>
      </section>
    </CoquillePage>
  )
}
