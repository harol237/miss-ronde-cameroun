'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/composants/mise-en-page/Navbar'
import PiedDePage from '@/composants/mise-en-page/PiedDePage'

export default function PageCandidaturesClient({ locale }: { locale: string }) {
  const [etape, setEtape] = useState(1)
  const [envoi, setEnvoi] = useState<'idle' | 'envoi' | 'succes' | 'erreur'>('idle')
  const [numero, setNumero] = useState('')
  const [droitsImage, setDroitsImage] = useState(false)
  const [accepteReglement, setAccepteReglement] = useState(false)
  const [erreurCase, setErreurCase] = useState('')
  const [form, setForm] = useState({
    nom: '', prenom: '', age: '', nationalite: '',
    email: '', telephone: '', adresse: '', reseaux: '',
    mariee: '', enfants: '',
    profession: '', diplome: '', langues: '',
    reve: '', association: '', ambition: '',
    voyage: '', passeport: '', numeroPasport: '', expirationPasseport: '',
    taille: '', poids: '', buste: '', tourTaille: '', hanche: '', bassin: '',
    pointure: '', confection: '', yeux: '', cheveux: ''
  })

  const maj = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const etapeSuivante = () => {
    if (etape === 4) {
      if (!droitsImage || !accepteReglement) {
        setErreurCase('Vous devez accepter les deux conditions pour finaliser votre inscription.')
        return
      }
      setErreurCase('')
    }
    setEtape(etape + 1)
  }

  const soumettre = async () => {
    if (!droitsImage || !accepteReglement) {
      setErreurCase('Vous devez accepter les deux conditions pour finaliser votre inscription.')
      return
    }
    setEnvoi('envoi')
    try {
      const res = await fetch('/api/candidatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success) {
        setNumero(data.numero)
        setEnvoi('succes')
      } else {
        setEnvoi('erreur')
      }
    } catch {
      setEnvoi('erreur')
    }
  }

  const titresEtapes = ['Identité & Contact', 'Parcours & Ambitions', 'Voyages & Passeport', 'Mensurations']

  if (envoi === 'succes') {
    return (
      <main>
        <Navbar locale={locale} />
        <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-24 pb-16">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-10">
              <Image src="/images/logo.jpg" alt="Logo" width={100} height={100} className="rounded-full border-2 border-[#C9A84C] mx-auto mb-6 object-cover" />
              <div className="w-16 h-px bg-[#C9A84C] mx-auto mb-6" />
              <h1 className="font-display text-4xl md:text-5xl text-white mb-3">Félicitations !</h1>
              <p className="text-gray-300 text-lg">Votre candidature a bien été reçue</p>
            </div>

            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/50 px-8 py-8 mb-8 text-center">
              <p className="text-[#C9A84C] text-xs tracking-[0.4em] uppercase mb-3">Votre numéro de candidature</p>
              <p className="font-display text-5xl text-white font-bold tracking-widest">{numero}</p>
            </div>

            <div className="bg-[#111] border border-white/10 p-8 mb-8">
              <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-5">Prochaines étapes</p>
              <div className="space-y-4">
                {[
                  'Imprimez et signez le formulaire officiel sur chaque page',
                  'Joignez une photocopie de votre pièce d\'identité',
                  'Joignez un justificatif de domicile',
                  'Envoyez le dossier complet à missrondecameroun@gmail.com'
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C] text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-400 text-sm text-center mb-8">
              Un email de confirmation a été envoyé à <span className="text-[#C9A84C]">{form.email}</span>
            </p>

            <div className="text-center">
              <Link href={'/' + locale} className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
        <PiedDePage locale={locale} />
      </main>
    )
  }

  return (
    <main>
      <Navbar locale={locale} />
      <div className="min-h-screen bg-black pt-28 pb-20 px-4 md:px-8">

        {/* En-tête */}
        <div className="conteneur text-center mb-12">
          <Image src="/images/logo.jpg" alt="Logo" width={90} height={90} className="rounded-full border-2 border-[#C9A84C] mx-auto mb-6 object-cover" />
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-12 h-px bg-[#C9A84C]" />
            <span className="text-[11px] font-semibold tracking-[0.4em] uppercase text-[#C9A84C]">11ème Édition 2026</span>
            <div className="w-12 h-px bg-[#C9A84C]" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">Formulaire de Candidature</h1>
          <p className="text-gray-300 text-base leading-relaxed conteneur mb-3">
            La prise en compte effective de l'inscription implique que le présent formulaire et le règlement de l'élection soient signés sur chaque page, accompagnés de la photocopie de la pièce d'identité et d'un justificatif de domicile.
          </p>
          <a href="https://missrondecameroun.com/wp-content/uploads/2025/06/formulaire-dinscription_mrbc2019.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#C9A84C]/50 hover:border-[#C9A84C] text-[#C9A84C] text-[11px] font-semibold tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300 mt-2">
            ↓ Télécharger le formulaire officiel PDF
          </a>
        </div>

        {/* Indicateur d'étapes */}
        <div className="conteneur mb-10">
          <div className="flex items-center justify-between">
            {titresEtapes.map((titre, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${etape > i + 1 ? 'bg-[#C9A84C] text-black' : etape === i + 1 ? 'bg-[#C9A84C] text-black ring-4 ring-[#C9A84C]/20' : 'border-2 border-white/20 text-gray-500'}`}>
                    {etape > i + 1 ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] mt-2 tracking-[0.1em] uppercase hidden md:block ${etape === i + 1 ? 'text-[#C9A84C]' : 'text-gray-600'}`}>{titre}</span>
                </div>
                {i < 3 && <div className={`flex-1 h-px mx-3 transition-all duration-300 ${etape > i + 1 ? 'bg-[#C9A84C]' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire */}
        <div className="conteneur">
          <div className="bg-[#0D0D0D] border border-white/10 p-8 md:p-12">

            {/* Titre étape */}
            <div className="mb-10">
              <h2 className="font-display text-3xl text-white mb-2">{titresEtapes[etape - 1]}</h2>
              <div className="w-12 h-px bg-[#C9A84C]" />
            </div>

            {/* ÉTAPE 1 */}
            {etape === 1 && (
              <div className="space-y-8">
                <div className="grille-2">
                  {[
                    { label: 'Nom', name: 'nom', required: true },
                    { label: 'Prénoms', name: 'prenom', required: true },
                    { label: 'Âge', name: 'age', required: true, type: 'number' },
                    { label: 'Nationalité', name: 'nationalite', required: true },
                    { label: 'Adresse email', name: 'email', required: true, type: 'email' },
                    { label: 'Téléphone', name: 'telephone' },
                    { label: 'Adresse & Ville', name: 'adresse', required: true },
                    { label: 'Facebook / Instagram / TikTok', name: 'reseaux', required: true },
                  ].map((champ) => (
                    <div key={champ.name}>
                      <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-3">
                        {champ.label} {champ.required && <span className="text-[#C9A84C]">*</span>}
                      </label>
                      <input
                        type={champ.type || 'text'}
                        name={champ.name}
                        value={(form as any)[champ.name]}
                        onChange={maj}
                        className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-base px-5 py-4 outline-none transition-colors duration-200 placeholder-gray-700"
                      />
                    </div>
                  ))}
                </div>
                <div className="grille-2 pt-4 border-t border-white/5">
                  {[
                    { label: 'Êtes-vous mariée ?', name: 'mariee', required: true },
                    { label: 'Avez-vous des enfants ?', name: 'enfants', required: true },
                  ].map((champ) => (
                    <div key={champ.name}>
                      <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-4">
                        {champ.label} <span className="text-[#C9A84C]">*</span>
                      </label>
                      <div className="flex gap-8">
                        {['Oui', 'Non'].map((v) => (
                          <label key={v} className="flex items-center gap-3 cursor-pointer group">
                            <input type="radio" name={champ.name} value={v} checked={(form as any)[champ.name] === v} onChange={maj} className="accent-[#C9A84C] w-4 h-4" />
                            <span className="text-gray-200 text-base group-hover:text-white transition-colors">{v}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ÉTAPE 2 */}
            {etape === 2 && (
              <div className="space-y-8">
                {[
                  { label: 'Profession ou études en cours', name: 'profession', required: true },
                  { label: 'Dernier diplôme obtenu', name: 'diplome', required: true },
                  { label: 'Langues étrangères parlées et niveau', name: 'langues', required: true },
                ].map((champ) => (
                  <div key={champ.name}>
                    <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-3">
                      {champ.label} <span className="text-[#C9A84C]">*</span>
                    </label>
                    <input type="text" name={champ.name} value={(form as any)[champ.name]} onChange={maj} className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-base px-5 py-4 outline-none transition-colors duration-200" />
                  </div>
                ))}
                {[
                  { label: 'Si vous étiez élue Miss Ronde, quel serait votre rêve ?', name: 'reve' },
                  { label: "Intervenez-vous auprès d'une association caritative ? Si oui, laquelle ?", name: 'association' },
                  { label: 'Votre ambition dans la vie', name: 'ambition' },
                ].map((champ) => (
                  <div key={champ.name}>
                    <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-3">{champ.label}</label>
                    <textarea name={champ.name} value={(form as any)[champ.name]} onChange={maj} rows={4} className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-base px-5 py-4 outline-none transition-colors duration-200 resize-none" />
                  </div>
                ))}
              </div>
            )}

            {/* ÉTAPE 3 */}
            {etape === 3 && (
              <div className="space-y-8">
                {[
                  { label: 'Avez-vous déjà voyagé ?', name: 'voyage' },
                  { label: "Disposez-vous d'un passeport ?", name: 'passeport', required: true },
                ].map((champ) => (
                  <div key={champ.name}>
                    <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-4">
                      {champ.label} {champ.required && <span className="text-[#C9A84C]">*</span>}
                    </label>
                    <div className="flex gap-8">
                      {['Oui', 'Non'].map((v) => (
                        <label key={v} className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name={champ.name} value={v} checked={(form as any)[champ.name] === v} onChange={maj} className="accent-[#C9A84C] w-4 h-4" />
                          <span className="text-gray-200 text-base group-hover:text-white transition-colors">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                {form.passeport === 'Oui' && (
                  <div className="grille-2 p-6 border border-[#C9A84C]/20 bg-[#C9A84C]/5">
                    <div>
                      <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-3">Numéro de passeport <span className="text-[#C9A84C]">*</span></label>
                      <input type="text" name="numeroPasport" value={form.numeroPasport} onChange={maj} className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-base px-5 py-4 outline-none transition-colors duration-200" />
                    </div>
                    <div>
                      <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-3">Date d'expiration <span className="text-[#C9A84C]">*</span></label>
                      <input type="date" name="expirationPasseport" value={form.expirationPasseport} onChange={maj} className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-base px-5 py-4 outline-none transition-colors duration-200" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ÉTAPE 4 */}
            {etape === 4 && (
              <div className="space-y-8">
                <div className="grille-2">
                  {[
                    { label: 'Taille sans talons (cm)', name: 'taille', required: true },
                    { label: 'Poids (kg)', name: 'poids', required: true },
                    { label: 'Tour de buste (m)', name: 'buste', required: true },
                    { label: 'Tour de taille (m)', name: 'tourTaille', required: true },
                    { label: 'Tour de hanche (m)', name: 'hanche', required: true },
                    { label: 'Tour de bassin (m)', name: 'bassin', required: true },
                    { label: 'Pointure', name: 'pointure', required: true },
                    { label: 'Taille confection', name: 'confection', required: true },
                    { label: 'Couleur des yeux', name: 'yeux', required: true },
                    { label: 'Couleur des cheveux', name: 'cheveux', required: true },
                  ].map((champ) => (
                    <div key={champ.name}>
                      <label className="block text-gray-200 text-[11px] tracking-[0.25em] uppercase mb-3">
                        {champ.label} {champ.required && <span className="text-[#C9A84C]">*</span>}
                      </label>
                      <input type="text" name={champ.name} value={(form as any)[champ.name]} onChange={maj} className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-base px-5 py-4 outline-none transition-colors duration-200" />
                    </div>
                  ))}
                </div>

                {/* Cases à cocher obligatoires */}
                <div className="space-y-5 pt-6 border-t border-white/10">
                  <p className="text-[#C9A84C] text-[11px] tracking-[0.3em] uppercase mb-4">Autorisations obligatoires</p>

                  <label className={`flex items-start gap-4 cursor-pointer p-5 border transition-all duration-200 ${droitsImage ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5' : 'border-white/10 hover:border-white/20'}`}>
                    <input
                      type="checkbox"
                      checked={droitsImage}
                      onChange={(e) => { setDroitsImage(e.target.checked); setErreurCase('') }}
                      className="accent-[#C9A84C] w-5 h-5 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-white font-medium">Autorisation de droits à l'image *</span>
                      <br />
                      Je soussignée, candidate à Miss Ronde Cameroun 11ème édition 2026, autorise expressément l'Association Femme Ronde Cameroun à utiliser mon image, ma voix, mes photos et vidéos réalisées dans le cadre du concours, à des fins de communication, promotion et diffusion sur tous supports (réseaux sociaux, presse, télévision, site internet, affiches), sans limitation de durée ni de territoire, et ce sans contrepartie financière.
                    </span>
                  </label>

                  <label className={`flex items-start gap-4 cursor-pointer p-5 border transition-all duration-200 ${accepteReglement ? 'border-[#C9A84C]/50 bg-[#C9A84C]/5' : 'border-white/10 hover:border-white/20'}`}>
                    <input
                      type="checkbox"
                      checked={accepteReglement}
                      onChange={(e) => { setAccepteReglement(e.target.checked); setErreurCase('') }}
                      className="accent-[#C9A84C] w-5 h-5 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-white font-medium">Acceptation du règlement *</span>
                      <br />
                      J'ai lu et j'accepte le règlement officiel du concours Miss Ronde Cameroun 2026. Je certifie que les informations fournies sont exactes et m'engage à respecter toutes les conditions de participation.{' '}
                      <a href="https://missrondecameroun.com/wp-content/uploads/2025/06/formulaire-dinscription_mrbc2019.pdf" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] underline hover:text-[#E8C97A]">
                        Lire le règlement
                      </a>
                    </span>
                  </label>

                  {erreurCase && (
                    <div className="bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-5 py-4">
                      ⚠ {erreurCase}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
              {etape > 1 ? (
                <button onClick={() => setEtape(etape - 1)} className="border border-white/30 hover:border-white text-white text-[11px] font-medium tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300">
                  ← Précédent
                </button>
              ) : <div />}

              {etape < 4 ? (
                <button onClick={etapeSuivante} className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300">
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={soumettre}
                  disabled={envoi === 'envoi' || !droitsImage || !accepteReglement}
                  className={`text-[11px] font-bold tracking-[0.2em] uppercase px-10 py-4 transition-all duration-300 ${droitsImage && accepteReglement ? 'bg-[#C9A84C] hover:bg-[#E8C97A] text-black' : 'bg-white/10 text-gray-600 cursor-not-allowed'}`}
                >
                  {envoi === 'envoi' ? 'Envoi en cours...' : 'Soumettre ma candidature'}
                </button>
              )}
            </div>
          </div>

          {envoi === 'erreur' && (
            <div className="mt-4 bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-6 py-4 text-center">
              Une erreur s'est produite. Veuillez réessayer ou contacter missrondecameroun@gmail.com
            </div>
          )}
        </div>
      </div>
      <PiedDePage locale={locale} />
    </main>
  )
}
