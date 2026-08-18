'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Navbar from '@/composants/mise-en-page/Navbar'
import PiedDePage from '@/composants/mise-en-page/PiedDePage'

// TODO : formulaire d'inscription et reglement officiels de l'edition 2026-2027
// au format PDF. Le document precedemment lie datait de 2019 et a ete retire.

const CHAMPS_VIDES = {
  nom: '', prenom: '', age: '', nationalite: '',
  email: '', telephone: '', adresse: '', reseaux: '',
  mariee: '', enfants: '',
  profession: '', diplome: '', langues: '',
  reve: '', association: '', ambition: '',
  voyage: '', passeport: '', numeroPasport: '', expirationPasseport: '',
  taille: '', poids: '', buste: '', tourTaille: '', hanche: '', bassin: '',
  pointure: '', confection: '', yeux: '', cheveux: '',
}

type Formulaire = typeof CHAMPS_VIDES
type NomChamp = keyof Formulaire

type Champ = {
  nom: NomChamp
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'radio'
  requis?: boolean
  aide?: string
  pleineLargeur?: boolean
}

/** Champs par etape : sert a la fois au rendu et a la validation. */
const ETAPES: { cle: string; groupes: { titre?: string; champs: Champ[] }[] }[] = [
  {
    cle: '1',
    groupes: [
      {
        champs: [
          { nom: 'nom', requis: true },
          { nom: 'prenom', requis: true },
          { nom: 'age', type: 'number', requis: true, aide: 'age' },
          { nom: 'nationalite', requis: true },
          { nom: 'email', type: 'email', requis: true, aide: 'email' },
          { nom: 'telephone', aide: 'telephone' },
          { nom: 'adresse', requis: true },
          { nom: 'reseaux', requis: true, aide: 'reseaux' },
        ],
      },
      {
        titre: 'sousSectionSituation',
        champs: [
          { nom: 'mariee', type: 'radio', requis: true },
          { nom: 'enfants', type: 'radio', requis: true },
        ],
      },
    ],
  },
  {
    cle: '2',
    groupes: [
      {
        champs: [
          { nom: 'profession', requis: true, pleineLargeur: true },
          { nom: 'diplome', requis: true, pleineLargeur: true },
          { nom: 'langues', requis: true, pleineLargeur: true },
          { nom: 'reve', type: 'textarea', pleineLargeur: true, aide: 'reve' },
          { nom: 'association', type: 'textarea', pleineLargeur: true },
          { nom: 'ambition', type: 'textarea', pleineLargeur: true },
        ],
      },
    ],
  },
  {
    cle: '3',
    groupes: [
      {
        champs: [
          { nom: 'voyage', type: 'radio' },
          { nom: 'passeport', type: 'radio', requis: true },
        ],
      },
    ],
  },
  {
    cle: '4',
    groupes: [
      {
        champs: [
          { nom: 'taille', requis: true }, { nom: 'poids', requis: true },
          { nom: 'buste', requis: true }, { nom: 'tourTaille', requis: true },
          { nom: 'hanche', requis: true }, { nom: 'bassin', requis: true },
          { nom: 'pointure', requis: true }, { nom: 'confection', requis: true },
          { nom: 'yeux', requis: true }, { nom: 'cheveux', requis: true },
        ],
      },
    ],
  },
]

const TOTAL = ETAPES.length

const CRITERES = ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12'] as const

export default function PageCandidaturesClient({ locale }: { locale: string }) {
  const t = useTranslations('candidature')
  const tc = useTranslations('commun')
  const te = useTranslations('eligibilite')

  const [etape, setEtape] = useState(1)
  const [envoi, setEnvoi] = useState<'idle' | 'envoi' | 'succes' | 'erreur'>('idle')
  const [numero, setNumero] = useState('')
  const [form, setForm] = useState<Formulaire>(CHAMPS_VIDES)
  const [droitsImage, setDroitsImage] = useState(false)
  const [accepteReglement, setAccepteReglement] = useState(false)
  const [erreurs, setErreurs] = useState<Partial<Record<NomChamp, string>>>({})
  const [erreurGenerale, setErreurGenerale] = useState('')

  const hautFormulaire = useRef<HTMLDivElement>(null)

  // A chaque changement d'etape, on ramene la vue en haut du formulaire.
  useEffect(() => {
    hautFormulaire.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [etape])

  const maj = (nom: NomChamp, valeur: string) => {
    setForm((precedent) => ({ ...precedent, [nom]: valeur }))
    setErreurs((precedent) => {
      if (!precedent[nom]) return precedent
      const copie = { ...precedent }
      delete copie[nom]
      return copie
    })
  }

  /** Valide les champs de l'etape courante et renvoie true si tout est correct. */
  const validerEtape = (numeroEtape: number) => {
    const trouvees: Partial<Record<NomChamp, string>> = {}

    for (const groupe of ETAPES[numeroEtape - 1].groupes) {
      for (const champ of groupe.champs) {
        const valeur = form[champ.nom].trim()
        if (champ.requis && !valeur) {
          trouvees[champ.nom] = t('erreurRequis')
          continue
        }
        if (champ.nom === 'email' && valeur && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur)) {
          trouvees[champ.nom] = t('erreurEmail')
        }
        if (champ.nom === 'age' && valeur) {
          const age = Number(valeur)
          if (!Number.isFinite(age) || age < 18 || age > 40) trouvees[champ.nom] = t('erreurAge')
        }
      }
    }

    // Le passeport declare ouvre deux champs supplementaires obligatoires.
    if (numeroEtape === 3 && form.passeport === 'Oui') {
      if (!form.numeroPasport.trim()) trouvees.numeroPasport = t('erreurRequis')
      if (!form.expirationPasseport.trim()) trouvees.expirationPasseport = t('erreurRequis')
    }

    setErreurs(trouvees)
    const valide = Object.keys(trouvees).length === 0
    setErreurGenerale(valide ? '' : t('erreurEtape'))
    return valide
  }

  const etapeSuivante = () => {
    if (!validerEtape(etape)) return
    setEtape((e) => Math.min(e + 1, TOTAL))
  }

  const etapePrecedente = () => {
    setErreurGenerale('')
    setEtape((e) => Math.max(e - 1, 1))
  }

  const soumettre = async () => {
    if (!validerEtape(TOTAL)) return
    if (!droitsImage || !accepteReglement) {
      setErreurGenerale(t('erreurCases'))
      return
    }
    setErreurGenerale('')
    setEnvoi('envoi')
    try {
      const reponse = await fetch('/api/candidatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, droitsImage, accepteReglement, langue: locale }),
      })
      const donnees = await reponse.json()
      if (donnees.success) {
        setNumero(donnees.numero)
        setEnvoi('succes')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setEnvoi('erreur')
      }
    } catch {
      setEnvoi('erreur')
    }
  }

  /* ---------------------------------------------------------------- succes */

  if (envoi === 'succes') {
    return (
      <main>
        <Navbar locale={locale} />
        <div className="cand-page cand-page-succes">
          <div className="cand-succes">
            <div className="cand-succes-entete">
              <Image src="/images/logo.png" alt="Miss Ronde Cameroun" width={104} height={104} className="cand-logo" />
              <span className="ligne-or" style={{ margin: '0 auto 24px' }} />
              <h1 className="font-display cand-succes-titre">{t('succesTitre')}</h1>
              <p className="cand-succes-soustitre">{t('succesSousTitre')}</p>
            </div>

            <div className="cand-numero">
              <p className="cand-numero-label">{t('succesNumero')}</p>
              <p className="cand-numero-valeur">{numero}</p>
            </div>

            <div className="cand-suite">
              <p className="cand-suite-titre">{t('succesEtapesTitre')}</p>
              <ol className="cand-suite-liste">
                {['succesEtape1', 'succesEtape2', 'succesEtape3', 'succesEtape4'].map((cle, i) => (
                  <li key={cle}>
                    <span className="cand-suite-numero">{i + 1}</span>
                    <span>{t(cle)}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="cand-succes-email">
              {t('succesEmail')} <span>{form.email}</span>
            </p>

            <div style={{ textAlign: 'center' }}>
              <Link href={'/' + locale} className="btn-or">{tc('retourAccueil')}</Link>
            </div>
          </div>
        </div>
        <PiedDePage locale={locale} />
      </main>
    )
  }

  /* -------------------------------------------------------------- rendu champ */

  const rendreChamp = (champ: Champ) => {
    const libelle = t(`champs.${champ.nom}`)
    const erreur = erreurs[champ.nom]
    const idAide = champ.aide ? `${champ.nom}-aide` : undefined
    const idErreur = erreur ? `${champ.nom}-erreur` : undefined
    const decrit = [idAide, idErreur].filter(Boolean).join(' ') || undefined

    if (champ.type === 'radio') {
      return (
        <fieldset key={champ.nom} className="cand-champ cand-champ-large">
          <legend className="label-champ">
            {libelle} {champ.requis && <span className="cand-requis">*</span>}
          </legend>
          <div className="cand-radios">
            {[tc('oui'), tc('non')].map((option) => (
              <label key={option} className={`cand-radio ${form[champ.nom] === option ? 'cand-radio-actif' : ''}`}>
                <input
                  type="radio"
                  name={champ.nom}
                  value={option}
                  checked={form[champ.nom] === option}
                  onChange={(e) => maj(champ.nom, e.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {erreur && <p className="cand-erreur" id={idErreur}>{erreur}</p>}
        </fieldset>
      )
    }

    return (
      <div key={champ.nom} className={`cand-champ ${champ.pleineLargeur ? 'cand-champ-large' : ''}`}>
        <label className="label-champ" htmlFor={champ.nom}>
          {libelle} {champ.requis && <span className="cand-requis">*</span>}
        </label>
        {champ.type === 'textarea' ? (
          <textarea
            id={champ.nom}
            name={champ.nom}
            rows={4}
            value={form[champ.nom]}
            onChange={(e) => maj(champ.nom, e.target.value)}
            className={`champ-textarea ${erreur ? 'champ-erreur' : ''}`}
            aria-invalid={erreur ? true : undefined}
            aria-describedby={decrit}
          />
        ) : (
          <input
            id={champ.nom}
            name={champ.nom}
            type={champ.type || 'text'}
            inputMode={champ.type === 'number' ? 'numeric' : undefined}
            value={form[champ.nom]}
            onChange={(e) => maj(champ.nom, e.target.value)}
            className={`champ-input ${erreur ? 'champ-erreur' : ''}`}
            aria-invalid={erreur ? true : undefined}
            aria-describedby={decrit}
          />
        )}
        {champ.aide && !erreur && <p className="cand-aide" id={idAide}>{t(`aides.${champ.aide}`)}</p>}
        {erreur && <p className="cand-erreur" id={idErreur}>{erreur}</p>}
      </div>
    )
  }

  /* ------------------------------------------------------------------ rendu */

  const titresEtapes = [t('etape1'), t('etape2'), t('etape3'), t('etape4')]

  return (
    <main>
      <Navbar locale={locale} />
      <div className="cand-page">

        <header className="cand-entete">
          <Image src="/images/logo.png" alt="Miss Ronde Cameroun" width={92} height={92} className="cand-logo" />
          <div className="cand-entete-badge">
            <span className="ligne-or-sm" />
            <span className="section-label">{t('edition')}</span>
            <span className="ligne-or-sm" />
          </div>
          <h1 className="font-display titre-formulaire cand-titre">{t('titre')}</h1>
          <p className="cand-intro">{t('intro')}</p>
          <p className="cand-conditions">{t('conditions')}</p>
          <Link href={'/' + locale + '/legal/reglement-concours'} className="cand-lien-pdf">
            {t('btnReglement')} →
          </Link>
        </header>

        <div className="cand-corps">
          <section className="cand-eligibilite">
            <h2 className="cand-eligibilite-titre">{te('titre')}</h2>
            <p className="cand-eligibilite-intro">{te('intro')}</p>
            <ul className="cand-eligibilite-liste">
              {CRITERES.map((critere) => (
                <li key={critere}>{te(critere)}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cand-corps" ref={hautFormulaire}>

          <ol className="cand-etapes" aria-label={t('progression', { n: etape, total: TOTAL })}>
            {titresEtapes.map((titre, i) => {
              const numeroEtape = i + 1
              const etat = etape > numeroEtape ? 'faite' : etape === numeroEtape ? 'active' : 'avenir'
              return (
                <li key={titre} className={`cand-etape cand-etape-${etat}`}>
                  <span className="cand-etape-pastille">{etape > numeroEtape ? '✓' : numeroEtape}</span>
                  <span className="cand-etape-titre">{titre}</span>
                </li>
              )
            })}
          </ol>

          <div className="cand-progression-mobile">
            <div className="cand-progression-barre">
              <span style={{ width: `${(etape / TOTAL) * 100}%` }} />
            </div>
            <p>{t('progression', { n: etape, total: TOTAL })} · {titresEtapes[etape - 1]}</p>
          </div>

          <section className="cand-carte">
            <div className="cand-carte-entete">
              <h2 className="font-display cand-carte-titre">{titresEtapes[etape - 1]}</h2>
              <p className="cand-carte-intro">{t(`etape${etape}Intro`)}</p>
            </div>

            {ETAPES[etape - 1].groupes.map((groupe, index) => (
              <div key={groupe.titre ?? index} className="cand-groupe">
                {groupe.titre && <p className="cand-groupe-titre">{t(groupe.titre)}</p>}
                <div className="cand-grille">{groupe.champs.map(rendreChamp)}</div>
              </div>
            ))}

            {etape === 3 && form.passeport === 'Oui' && (
              <div className="cand-groupe cand-groupe-encadre">
                <p className="cand-groupe-titre">{t('sousSectionPasseport')}</p>
                <div className="cand-grille">
                  {rendreChamp({ nom: 'numeroPasport', requis: true })}
                  {rendreChamp({ nom: 'expirationPasseport', type: 'date', requis: true })}
                </div>
              </div>
            )}

            {etape === 4 && (
              <>
                <p className="cand-note-confidentialite">{t('aides.mensurations')}</p>

                <div className="cand-groupe">
                  <p className="cand-groupe-titre">{t('sousSectionAutorisations')}</p>

                  <label className={`cand-consentement ${droitsImage ? 'cand-consentement-actif' : ''}`}>
                    <input
                      type="checkbox"
                      checked={droitsImage}
                      onChange={(e) => { setDroitsImage(e.target.checked); setErreurGenerale('') }}
                    />
                    <span>
                      <strong>{t('droitsImageTitre')} <span className="cand-requis">*</span></strong>
                      {t('droitsImageTexte')}
                    </span>
                  </label>

                  <label className={`cand-consentement ${accepteReglement ? 'cand-consentement-actif' : ''}`}>
                    <input
                      type="checkbox"
                      checked={accepteReglement}
                      onChange={(e) => { setAccepteReglement(e.target.checked); setErreurGenerale('') }}
                    />
                    <span>
                      <strong>{t('reglementTitre')} <span className="cand-requis">*</span></strong>
                      {t('reglementTexte')}{' '}
                      <Link href={'/' + locale + '/legal/reglement-concours'} className="cand-lien">
                        {t('lireReglement')}
                      </Link>
                    </span>
                  </label>
                </div>
              </>
            )}

            {erreurGenerale && (
              <p className="cand-alerte" role="alert">⚠ {erreurGenerale}</p>
            )}

            <div className="cand-navigation">
              {etape > 1 ? (
                <button type="button" onClick={etapePrecedente} className="btn-contour">
                  ← {tc('precedent')}
                </button>
              ) : (
                <span />
              )}

              {etape < TOTAL ? (
                <button type="button" onClick={etapeSuivante} className="btn-or">
                  {tc('suivant')} →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={soumettre}
                  disabled={envoi === 'envoi'}
                  className="btn-or"
                >
                  {envoi === 'envoi' ? tc('envoi') : t('boutonSoumettre')}
                </button>
              )}
            </div>
          </section>

          {envoi === 'erreur' && (
            <p className="cand-alerte" role="alert">{t('erreurEnvoi')}</p>
          )}
        </div>
      </div>
      <PiedDePage locale={locale} />
    </main>
  )
}
