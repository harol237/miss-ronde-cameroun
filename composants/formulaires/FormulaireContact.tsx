'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

const MOTIFS = [
  'general', 'candidature', 'partenaire', 'parrain', 'investir',
  'donation', 'partenariat', 'consultation', 'presse', 'billet',
] as const

type Motif = (typeof MOTIFS)[number]

export default function FormulaireContact({ motifInitial }: { motifInitial?: string }) {
  const t = useTranslations('pageContact')

  const motifValide = MOTIFS.includes(motifInitial as Motif) ? (motifInitial as Motif) : ''

  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    motif: motifValide,
    message: '',
  })
  const [erreurs, setErreurs] = useState<Record<string, string>>({})
  const [etat, setEtat] = useState<'idle' | 'envoi' | 'succes' | 'erreur'>('idle')

  const maj = (nom: string, valeur: string) => {
    setForm((p) => ({ ...p, [nom]: valeur }))
    setErreurs((p) => {
      if (!p[nom]) return p
      const copie = { ...p }
      delete copie[nom]
      return copie
    })
  }

  const soumettre = async (evenement: React.FormEvent) => {
    evenement.preventDefault()

    const trouvees: Record<string, string> = {}
    if (!form.nom.trim()) trouvees.nom = t('erreurRequis')
    if (!form.email.trim()) trouvees.email = t('erreurRequis')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) trouvees.email = t('erreurEmail')
    if (!form.message.trim()) trouvees.message = t('erreurRequis')

    setErreurs(trouvees)
    if (Object.keys(trouvees).length > 0) return

    setEtat('envoi')
    try {
      const reponse = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          motif: form.motif ? t(`motif${form.motif.charAt(0).toUpperCase()}${form.motif.slice(1)}`) : '',
        }),
      })
      const donnees = await reponse.json()
      setEtat(donnees.success ? 'succes' : 'erreur')
    } catch {
      setEtat('erreur')
    }
  }

  if (etat === 'succes') {
    return (
      <div className="contact-succes" role="status">
        <span className="contact-succes-marque">✓</span>
        <h3 className="contact-succes-titre">{t('succesTitre')}</h3>
        <p className="contact-succes-texte">{t('succesTexte')}</p>
      </div>
    )
  }

  return (
    <form className="contact-formulaire" onSubmit={soumettre} noValidate>
      <h2 className="titre-bloc contact-formulaire-titre">{t('formulaireTitre')}</h2>

      <div className="contact-grille">
        <div className="cand-champ">
          <label className="label-champ" htmlFor="contact-nom">
            {t('champNom')} <span className="cand-requis">*</span>
          </label>
          <input
            id="contact-nom"
            className={`champ-input ${erreurs.nom ? 'champ-erreur' : ''}`}
            value={form.nom}
            onChange={(e) => maj('nom', e.target.value)}
            aria-invalid={erreurs.nom ? true : undefined}
          />
          {erreurs.nom && <p className="cand-erreur">{erreurs.nom}</p>}
        </div>

        <div className="cand-champ">
          <label className="label-champ" htmlFor="contact-email">
            {t('champEmail')} <span className="cand-requis">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            className={`champ-input ${erreurs.email ? 'champ-erreur' : ''}`}
            value={form.email}
            onChange={(e) => maj('email', e.target.value)}
            aria-invalid={erreurs.email ? true : undefined}
          />
          {erreurs.email && <p className="cand-erreur">{erreurs.email}</p>}
        </div>

        <div className="cand-champ">
          <label className="label-champ" htmlFor="contact-telephone">{t('champTelephone')}</label>
          <input
            id="contact-telephone"
            type="tel"
            className="champ-input"
            value={form.telephone}
            onChange={(e) => maj('telephone', e.target.value)}
          />
        </div>

        <div className="cand-champ">
          <label className="label-champ" htmlFor="contact-motif">{t('champMotif')}</label>
          <select
            id="contact-motif"
            className="champ-input champ-select"
            value={form.motif}
            onChange={(e) => maj('motif', e.target.value)}
          >
            <option value="">{t('motifDefaut')}</option>
            {MOTIFS.map((motif) => (
              <option key={motif} value={motif}>
                {t(`motif${motif.charAt(0).toUpperCase()}${motif.slice(1)}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="cand-champ cand-champ-large">
          <label className="label-champ" htmlFor="contact-message">
            {t('champMessage')} <span className="cand-requis">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={6}
            className={`champ-textarea ${erreurs.message ? 'champ-erreur' : ''}`}
            value={form.message}
            onChange={(e) => maj('message', e.target.value)}
            aria-invalid={erreurs.message ? true : undefined}
          />
          {erreurs.message && <p className="cand-erreur">{erreurs.message}</p>}
        </div>
      </div>

      {etat === 'erreur' && <p className="cand-alerte" role="alert">{t('erreurEnvoi')}</p>}

      <button type="submit" className="btn-or contact-envoyer" disabled={etat === 'envoi'}>
        {etat === 'envoi' ? '…' : t('envoyer')}
      </button>
    </form>
  )
}
