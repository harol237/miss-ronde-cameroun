import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import CoquillePage from '@/composants/mise-en-page/CoquillePage'
import Patronage from '@/composants/sections/Patronage'
import Revele from '@/composants/ui/Revele'
import { PHOTO_FONDATRICE } from '@/contenu/evenement'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pageApropos' })
  return { title: t('titre'), description: t('chapeau') }
}

export default async function PageAPropos({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('pageApropos')
  const ta = await getTranslations('apropos')
  const tcal = await getTranslations('calendrier')
  const tc = await getTranslations('commun')

  const objectifs = [1, 2, 3, 4, 5, 6, 7].map((n) => t(`obj${n}`))
  const etapes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
    date: tcal(`e${n}Date`),
    titre: tcal(`e${n}Titre`),
  }))
  const poles = [1, 2, 3, 4].map((n) => tcal(`pole${n}`))
  const dotations = [1, 2, 3, 4].map((n) => ({
    titre: t(`gain${n}Titre`),
    texte: t(`gain${n}Texte`),
  }))
  const parades = [1, 2, 3, 4, 5].map((n) => t(`parade${n}`))
  const notes = [1, 2, 3].map((n) => ({
    titre: t(`vote${n}Titre`),
    valeur: t(`vote${n}Valeur`),
  }))

  const chiffres = [
    { nombre: ta('stat1Nombre'), label: ta('stat1Label') },
    { nombre: ta('stat2Nombre'), label: ta('stat2Label') },
    { nombre: ta('stat3Nombre'), label: ta('stat3Label') },
  ]

  return (
    <CoquillePage locale={locale} label={t('label')} titre={t('titre')} chapeau={t('chapeau')}>

      {/* --- Mission et concept Manga Manga --- */}
      <section className="section-page">
        <div className="bloc">
          <div className="duo">
            <Revele className="duo-texte">
              <p className="label-bloc">{t('missionLabel')}</p>
              <h2 className="titre-bloc">{t('missionTitre')}</h2>
              <p className="texte-bloc">{t('missionTexte1')}</p>
              <p className="texte-bloc">{t('missionTexte2')}</p>
              <p className="signature-or">{ta('signature')}</p>
            </Revele>

            <Revele delai={120} className="encart-manga">
              <p className="label-bloc">{t('mangaLabel')}</p>
              <h3 className="encart-manga-titre">{t('mangaTitre')}</h3>
              <p className="texte-bloc">{t('mangaTexte1')}</p>
              <p className="texte-bloc">{t('mangaTexte2')}</p>
            </Revele>
          </div>
        </div>
      </section>

      {/* --- La fondatrice --- */}
      <section className="section-page section-page-alt">
        <div className="bloc">
          <div className="fondatrice">
            <Revele className="fondatrice-portrait">
              {/* Le portrait s'affiche des que PHOTO_FONDATRICE est renseignee ;
                  sinon un medaillon sobre tient la place. */}
              {PHOTO_FONDATRICE ? (
                <Image
                  src={PHOTO_FONDATRICE}
                  alt={t('fondatriceTitre')}
                  width={520}
                  height={650}
                  sizes="(max-width: 860px) 100vw, 420px"
                />
              ) : (
                <span className="fondatrice-medaillon" aria-hidden="true">✦</span>
              )}
            </Revele>

            <Revele delai={120} className="fondatrice-texte">
              <p className="label-bloc">{t('fondatriceLabel')}</p>
              <h2 className="titre-bloc">{t('fondatriceTitre')}</h2>
              <p className="texte-bloc">{t('fondatriceTexte')}</p>
              {/* TODO : biographie complete de la fondatrice (a fournir). */}
            </Revele>
          </div>
        </div>
      </section>

      {/* --- Les sept objectifs officiels --- */}
      <section className="section-page">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('objectifsLabel')}</p>
            <h2 className="titre-bloc">{t('objectifsTitre')}</h2>
          </Revele>
          <ol className="liste-objectifs">
            {objectifs.map((objectif, i) => (
              <Revele key={objectif} delai={i * 70} as="li" className="objectif">
                <span className="objectif-numero">{String(i + 1).padStart(2, '0')}</span>
                <span className="objectif-texte">{objectif}</span>
              </Revele>
            ))}
          </ol>
        </div>
      </section>

      {/* --- Calendrier 2026-2027 --- */}
      <section className="section-page section-page-sombre">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('calendrierLabel')}</p>
            <h2 className="titre-bloc">{t('calendrierTitre')}</h2>
          </Revele>

          <ol className="frise">
            {etapes.map((etape, i) => (
              <Revele key={etape.titre} delai={i * 60} as="li" className="frise-etape">
                <span className="frise-point" />
                <span className="frise-date">{etape.date}</span>
                <span className="frise-titre">{etape.titre}</span>
              </Revele>
            ))}
          </ol>

          <Revele className="poles">
            <p className="poles-titre">{tcal('polesTitre')}</p>
            <div className="poles-grille">
              {poles.map((pole) => (
                <span key={pole} className="pole">{pole}</span>
              ))}
            </div>
          </Revele>
        </div>
      </section>

      {/* --- Dotations --- */}
      <section className="section-page">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('gainsLabel')}</p>
            <h2 className="titre-bloc">{t('gainsTitre')}</h2>
          </Revele>
          <div className="grille-gains">
            {dotations.map((dotation, i) => (
              <Revele key={dotation.titre} delai={i * 100} className="carte-gain">
                <h3 className="carte-gain-titre">{dotation.titre}</h3>
                <p className="carte-gain-texte">{dotation.texte}</p>
              </Revele>
            ))}
          </div>
        </div>
      </section>

      {/* --- Le classement : effort, jury, public --- */}
      <section className="section-page section-page-alt">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('voteLabel')}</p>
            <h2 className="titre-bloc">{t('voteTitre')}</h2>
            <p className="texte-bloc soutenir-intro">{t('voteTexte')}</p>
          </Revele>

          <div className="grille-notes">
            {notes.map((note, i) => (
              <Revele key={note.titre} delai={i * 100} className="carte-note">
                <span className="carte-note-valeur">{note.valeur}</span>
                <span className="carte-note-titre">{note.titre}</span>
              </Revele>
            ))}
          </div>

          {/* TODO : la plateforme de vote multi-canal et la collecte de dons
              ne sont pas encore developpees. Cette section decrit le systeme,
              elle ne le met pas en oeuvre. */}
          <Revele>
            <p className="note-discrete">{t('voteCanaux')}</p>
          </Revele>
        </div>
      </section>

      {/* --- La soiree de gala --- */}
      <section className="section-page section-page-sombre">
        <div className="bloc">
          <Revele>
            <p className="label-bloc">{t('galaLabel')}</p>
            <h2 className="titre-bloc">{t('galaTitre')}</h2>
            <p className="texte-bloc soutenir-intro">{t('galaTexte')}</p>
          </Revele>

          <div className="grille-gala">
            <Revele className="carte-gala">
              <h3 className="carte-gala-titre">{t('paradesTitre')}</h3>
              <ol className="carte-gala-liste">
                {parades.map((parade) => (
                  <li key={parade}>{parade}</li>
                ))}
              </ol>
            </Revele>

            <Revele delai={100} className="carte-gala">
              <h3 className="carte-gala-titre">{t('prestationsTitre')}</h3>
              <p className="texte-bloc">{t('prestationsTexte')}</p>
            </Revele>

            <Revele delai={200} className="carte-gala">
              <h3 className="carte-gala-titre">{t('distinctionsTitre')}</h3>
              <p className="texte-bloc">{t('distinctionsTexte')}</p>
            </Revele>
          </div>

          <div className="chiffres">
            {chiffres.map((chiffre, i) => (
              <Revele key={chiffre.label} delai={i * 100} className="chiffre">
                <span className="chiffre-nombre">{chiffre.nombre}</span>
                <span className="chiffre-label">{chiffre.label}</span>
              </Revele>
            ))}
          </div>
        </div>
      </section>

      {/* --- L'organisation : le detail des soutiens institutionnels tient
           dans la bande Patronage, deja utilisee sur la page d'accueil. --- */}
      <section className="section-page section-page-serree">
        <div className="bloc-etroit" style={{ textAlign: 'center' }}>
          <Revele>
            <p className="label-bloc" style={{ justifyContent: 'center' }}>{t('assoLabel')}</p>
            <h2 className="titre-bloc">{t('assoTitre')}</h2>
          </Revele>
          {/* TODO : identite legale de l'association (adresse du siege, numero
              d'enregistrement) et composition du jury. */}
        </div>
      </section>
      <Patronage avecLabel={false} />

      {/* --- Appel a candidature --- */}
      <section className="section-page section-page-sombre">
        <div className="bloc-etroit appel">
          <Revele>
            <h2 className="titre-bloc">{t('ctaTitre')}</h2>
            <p className="texte-bloc">{t('ctaTexte')}</p>
            <div className="appel-boutons">
              <Link href={`/${locale}/candidatures`} className="btn-or">{tc('candidater')}</Link>
              <Link href={`/${locale}/contact`} className="btn-contour">{tc('nousContacter')}</Link>
            </div>
          </Revele>
        </div>
      </section>

    </CoquillePage>
  )
}
