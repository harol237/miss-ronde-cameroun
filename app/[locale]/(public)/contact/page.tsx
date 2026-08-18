import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import FormulaireContact from '@/composants/formulaires/FormulaireContact'
import Revele from '@/composants/ui/Revele'
import { CONTACT, RESEAUX } from '@/contenu/evenement'


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageContact' })
  return { title: t('titre'), description: t('chapeau') }
}

export default async function PageContact({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ motif?: string }>
}) {
  const { locale } = await params
  const { motif } = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('pageContact')

  const coordonnees = [
    { label: t('emailLabel'), valeur: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: t('telephoneLabel'), valeur: CONTACT.telephone, href: CONTACT.telephoneLien },
    { label: t('adresseLabel'), valeur: t('adresseValeur') },
    { label: t('horairesLabel'), valeur: t('horairesValeur') },
  ]

  return (
    <CoquillePage locale={locale} label={t('label')} titre={t('titre')} chapeau={t('chapeau')}>

      <section className="section-page">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('coordonneesTitre')}</p>
          </Revele>

          <div className="grille-coordonnees">
            {coordonnees.map((item, i) => (
              <Revele key={item.label} delai={i * 90} className="carte-coordonnee">
                <p className="carte-coordonnee-label">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="carte-coordonnee-valeur carte-coordonnee-lien">
                    {item.valeur}
                  </a>
                ) : (
                  <p className="carte-coordonnee-valeur">{item.valeur}</p>
                )}
              </Revele>
            ))}
          </div>

          <Revele className="contact-reseaux">
            <p className="carte-coordonnee-label">{t('reseauxLabel')}</p>
            <div className="contact-reseaux-liens">
              {RESEAUX.map((reseau) => (
                <a
                  key={reseau.nom}
                  href={reseau.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-reseau"
                >
                  {reseau.nom}
                </a>
              ))}
            </div>
          </Revele>
        </div>
      </section>

      <section className="section-page section-page-sombre">
        <div className="bloc-etroit">
          <FormulaireContact motifInitial={motif} />
        </div>
      </section>

    </CoquillePage>
  )
}
