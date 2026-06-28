'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/composants/mise-en-page/Navbar'
import PiedDePage from '@/composants/mise-en-page/PiedDePage'

const champTexte = (label: string, name: string, required = true, type = 'text', placeholder = '') => ({
  label, name, required, type, placeholder
})

export default function PageCandidatures({ params }: { params: Promise<{ locale: string }> }) {
  const [locale, setLocale] = useState('fr')
  const [etape, setEtape] = useState(1)
  const [envoi, setEnvoi] = useState<'idle' | 'envoi' | 'succes' | 'erreur'>('idle')
  const [numero, setNumero] = useState('')
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

  const maj = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const soumettre = async () => {
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

  if (envoi === 'succes') {
    return (
      <main>
        <Navbar locale={locale} />
        <div className="min-h-screen bg-black flex items-center justify-center px-6 pt-24">
          <div className="max-w-lg w-full text-center">
            <Image src="/images/logo.jpg" alt="Miss Ronde Cameroun" width={80} height={80} className="rounded-full border-2 border-[#C9A84C] mx-auto mb-8 object-cover" />
            <div className="w-16 h-px bg-[#C9A84C] mx-auto mb-6" />
            <h1 className="font-display text-3xl text-white mb-4">Candidature reçue !</h1>
            <div className="bg-[#C9A84C]/10 border border-[#C9A84C]/40 px-6 py-4 mb-6">
              <p className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase mb-2">Votre numéro de candidature</p>
              <p className="font-display text-3xl text-white font-bold tracking-widest">{numero}</p>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Un email de confirmation a été envoyé à <strong className="text-[#C9A84C]">{form.email}</strong>.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Conservez votre numéro de candidature. Il vous sera demandé lors de toutes vos communications avec l'organisation.
            </p>
            <div className="bg-[#111] border border-white/10 p-5 text-left mb-8">
              <p className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase mb-3">Prochaines étapes</p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>1. Imprimez et signez le formulaire officiel sur chaque page</li>
                <li>2. Joignez une photocopie de votre pièce d'identité</li>
                <li>3. Joignez un justificatif de domicile</li>
                <li>4. Envoyez le dossier complet à missrondecameroun@gmail.com</li>
              </ul>
            </div>
            <Link href={'/' + locale} className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300">
              Retour à l'accueil
            </Link>
          </div>
        </div>
        <PiedDePage locale={locale} />
      </main>
    )
  }

  return (
    <main>
      <Navbar locale={locale} />
      <div className="min-h-screen bg-black pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* En-tête */}
          <div className="text-center mb-12">
            <Image src="/images/logo.jpg" alt="Miss Ronde Cameroun" width={80} height={80} className="rounded-full border-2 border-[#C9A84C] mx-auto mb-6 object-cover" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#C9A84C]" />
              <span className="text-[10px] font-semibold tracking-[0.4em] uppercase text-[#C9A84C]">11ème Édition 2026</span>
              <div className="w-8 h-px bg-[#C9A84C]" />
            </div>
            <h1 className="font-display text-4xl text-white mb-4">Formulaire de Candidature</h1>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              La prise en compte effective de l'inscription implique que le présent formulaire et le règlement de l'élection soient signés sur chaque page, accompagnés de la photocopie de la pièce d'identité et d'un justificatif de domicile.
            </p>
            
              href="https://missrondecameroun.com/wp-content/uploads/2025/06/formulaire-dinscription_mrbc2019.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#C9A84C]/50 hover:border-[#C9A84C] text-[#C9A84C] text-[11px] font-medium tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300"
            >
              Télécharger le formulaire officiel PDF
            </a>
          </div>

          {/* Indicateur d'étapes */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map((e) => (
              <div key={e} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${etape >= e ? 'bg-[#C9A84C] text-black' : 'border border-white/20 text-gray-500'}`}>
                  {e}
                </div>
                {e < 4 && <div className={`w-12 h-px transition-all duration-300 ${etape > e ? 'bg-[#C9A84C]' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-[#0D0D0D] border border-white/10 p-8">

            {/* ÉTAPE 1 — Identité & Contact */}
            {etape === 1 && (
              <div>
                <h2 className="font-display text-xl text-white mb-2">Identité & Contact</h2>
                <div className="w-8 h-px bg-[#C9A84C] mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Nom *', name: 'nom' },
                    { label: 'Prénoms *', name: 'prenom' },
                    { label: 'Âge *', name: 'age', type: 'number' },
                    { label: 'Nationalité *', name: 'nationalite' },
                    { label: 'Adresse email *', name: 'email', type: 'email' },
                    { label: 'Téléphone', name: 'telephone' },
                    { label: 'Adresse & Ville *', name: 'adresse' },
                    { label: 'Facebook / Instagram / TikTok *', name: 'reseaux' },
                  ].map((champ) => (
                    <div key={champ.name}>
                      <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-2">{champ.label}</label>
                      <input
                        type={champ.type || 'text'}
                        name={champ.name}
                        value={(form as any)[champ.name]}
                        onChange={maj}
                        className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-3">Êtes-vous mariée ? *</label>
                    <div className="flex gap-4">
                      {['Oui', 'Non'].map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="mariee" value={v} checked={form.mariee === v} onChange={maj} className="accent-[#C9A84C]" />
                          <span className="text-gray-300 text-sm">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-3">Avez-vous des enfants ? *</label>
                    <div className="flex gap-4">
                      {['Oui', 'Non'].map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="enfants" value={v} checked={form.enfants === v} onChange={maj} className="accent-[#C9A84C]" />
                          <span className="text-gray-300 text-sm">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ÉTAPE 2 — Parcours & Questions */}
            {etape === 2 && (
              <div>
                <h2 className="font-display text-xl text-white mb-2">Parcours & Ambitions</h2>
                <div className="w-8 h-px bg-[#C9A84C] mb-8" />
                <div className="space-y-6">
                  {[
                    { label: 'Profession ou études en cours *', name: 'profession' },
                    { label: 'Dernier diplôme obtenu *', name: 'diplome' },
                    { label: 'Langues étrangères parlées et niveau *', name: 'langues' },
                  ].map((champ) => (
                    <div key={champ.name}>
                      <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-2">{champ.label}</label>
                      <input
                        type="text"
                        name={champ.name}
                        value={(form as any)[champ.name]}
                        onChange={maj}
                        className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors duration-200"
                      />
                    </div>
                  ))}
                  {[
                    { label: 'Si vous étiez élue Miss Ronde, quel serait votre rêve ?', name: 'reve' },
                    { label: 'Intervenez-vous auprès d\'une association caritative ? Si oui, laquelle ?', name: 'association' },
                    { label: 'Votre ambition dans la vie', name: 'ambition' },
                  ].map((champ) => (
                    <div key={champ.name}>
                      <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-2">{champ.label}</label>
                      <textarea
                        name={champ.name}
                        value={(form as any)[champ.name]}
                        onChange={maj}
                        rows={3}
                        className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors duration-200 resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ÉTAPE 3 — Voyages & Passeport */}
            {etape === 3 && (
              <div>
                <h2 className="font-display text-xl text-white mb-2">Voyages & Passeport</h2>
                <div className="w-8 h-px bg-[#C9A84C] mb-8" />
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-3">Avez-vous déjà voyagé ?</label>
                    <div className="flex gap-4">
                      {['Oui', 'Non'].map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="voyage" value={v} checked={form.voyage === v} onChange={maj} className="accent-[#C9A84C]" />
                          <span className="text-gray-300 text-sm">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-3">Disposez-vous d'un passeport ? *</label>
                    <div className="flex gap-4">
                      {['Oui', 'Non'].map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="passeport" value={v} checked={form.passeport === v} onChange={maj} className="accent-[#C9A84C]" />
                          <span className="text-gray-300 text-sm">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {form.passeport === 'Oui' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-2">Numéro de passeport *</label>
                        <input type="text" name="numeroPasport" value={form.numeroPasport} onChange={maj} className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors duration-200" />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-2">Date d'expiration *</label>
                        <input type="date" name="expirationPasseport" value={form.expirationPasseport} onChange={maj} className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors duration-200" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ÉTAPE 4 — Mensurations */}
            {etape === 4 && (
              <div>
                <h2 className="font-display text-xl text-white mb-2">Mensurations</h2>
                <div className="w-8 h-px bg-[#C9A84C] mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Taille sans talons (cm) *', name: 'taille' },
                    { label: 'Poids (kg) *', name: 'poids' },
                    { label: 'Tour de buste (m) *', name: 'buste' },
                    { label: 'Tour de taille (m) *', name: 'tourTaille' },
                    { label: 'Tour de hanche (m) *', name: 'hanche' },
                    { label: 'Tour de bassin (m) *', name: 'bassin' },
                    { label: 'Pointure *', name: 'pointure' },
                    { label: 'Taille confection *', name: 'confection' },
                    { label: 'Couleur des yeux *', name: 'yeux' },
                    { label: 'Couleur des cheveux *', name: 'cheveux' },
                  ].map((champ) => (
                    <div key={champ.name}>
                      <label className="block text-gray-300 text-[11px] tracking-[0.2em] uppercase mb-2">{champ.label}</label>
                      <input
                        type="text"
                        name={champ.name}
                        value={(form as any)[champ.name]}
                        onChange={maj}
                        className="w-full bg-black border border-white/15 focus:border-[#C9A84C] text-white text-sm px-4 py-3 outline-none transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation entre étapes */}
            <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
              {etape > 1 ? (
                <button onClick={() => setEtape(etape - 1)} className="border border-white/30 hover:border-white text-white text-[11px] font-medium tracking-[0.2em] uppercase px-6 py-3 transition-all duration-300">
                  ← Précédent
                </button>
              ) : <div />}

              {etape < 4 ? (
                <button onClick={() => setEtape(etape + 1)} className="bg-[#C9A84C] hover:bg-[#E8C97A] text-black text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300">
                  Suivant →
                </button>
              ) : (
                <button
                  onClick={soumettre}
                  disabled={envoi === 'envoi'}
                  className="bg-[#C9A84C] hover:bg-[#E8C97A] disabled:opacity-50 text-black text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3 transition-all duration-300"
                >
                  {envoi === 'envoi' ? 'Envoi en cours...' : 'Soumettre ma candidature'}
                </button>
              )}
            </div>
          </div>

          {envoi === 'erreur' && (
            <div className="mt-4 bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-4 py-3 text-center">
              Une erreur s'est produite. Veuillez réessayer ou contacter missrondecameroun@gmail.com
            </div>
          )}
        </div>
      </div>
      <PiedDePage locale={locale} />
    </main>
  )
}
