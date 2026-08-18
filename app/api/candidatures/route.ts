import { NextRequest, NextResponse } from 'next/server'
import { echapper, EMAIL_COMITE, EXPEDITEUR } from '@/lib/email'

/**
 * Reception d'une candidature : un recapitulatif part vers la candidate,
 * une notification complete part vers le comite d'organisation.
 *
 * TODO : les emails sont rediges en francais uniquement. Le formulaire
 * transmet la langue choisie (champ `langue`) : les versions anglaise et
 * espagnole pourront s'y brancher plus tard.
 */

function genererNumero(): string {
  const date = new Date()
  const annee = date.getFullYear()
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `MRC-${annee}-${rand}`
}

/** Calendrier officiel de la 11eme edition, repris tel quel dans les emails. */
const CALENDRIER: { date: string; etape: string }[] = [
  { date: '20 juillet – 20 octobre 2026', etape: 'Depouillement des dossiers et preselection' },
  { date: '20 aout – 20 septembre 2026', etape: 'Finales regionales : Yaounde, Douala, Bafoussam, Garoua' },
  { date: '22 aout 2026', etape: 'Casting' },
  { date: '10 octobre 2026', etape: 'Journee dietetique' },
  { date: '28 et 29 decembre 2026', etape: 'Demi-finale' },
  { date: '9 janvier 2027', etape: 'Salon International de la Femme Africaine (SIFA)' },
  { date: '25 janvier 2027', etape: 'Mise au vert' },
  { date: '30 janvier 2027', etape: 'Soiree de l’election - Grande Finale, Palais des Congres de Yaounde' },
]

const STYLE = `
body{font-family:Georgia,'Times New Roman',serif;color:#1A1714;background:#F2EFE8;margin:0;padding:0}
.cadre{max-width:640px;margin:0 auto;background:#fff}
.entete{background:#0D0D0D;padding:32px 30px;text-align:center}
.entete h1{color:#C9A84C;font-size:20px;margin:0;letter-spacing:4px;font-weight:normal}
.entete p{color:rgba(255,255,255,0.72);font-size:11px;margin:8px 0 0;letter-spacing:2px}
.corps{padding:34px 30px}
.corps p{font-size:15px;line-height:1.7;margin:0 0 14px}
.numero{background:#C9A84C;color:#000;font-size:19px;font-weight:bold;padding:16px;text-align:center;letter-spacing:3px;margin:22px 0}
.numero span{display:block;font-size:10px;font-weight:normal;letter-spacing:2px;margin-bottom:6px}
h2{color:#7A5E20;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;border-bottom:1px solid #E2D9C2;padding-bottom:7px;margin:30px 0 14px;font-weight:bold}
table{width:100%;border-collapse:collapse}
td{padding:8px 4px;border-bottom:1px solid #EFEBE1;font-size:13px;vertical-align:top;line-height:1.55}
td:first-child{width:38%;color:#6B6358;font-family:Arial,Helvetica,sans-serif;font-size:12px}
.cal td:first-child{width:42%;color:#7A5E20;font-weight:bold}
.encadre{border-left:3px solid #C9A84C;background:#FAF8F3;padding:14px 18px;margin:18px 0;font-size:14px;line-height:1.7}
.contact{background:#FAF8F3;padding:18px;margin-top:26px;font-size:13px;line-height:1.8;text-align:center}
.pied{background:#0D0D0D;padding:18px;text-align:center;color:#C9A84C;font-size:10px;letter-spacing:2px}
`

type Donnees = Record<string, unknown>

/** Une ligne de tableau, omise quand la candidate n'a rien saisi. */
function ligne(libelle: string, valeur: unknown, suffixe = ''): string {
  const texte = echapper(valeur).trim()
  if (!texte) return ''
  return `<tr><td>${libelle}</td><td>${texte}${suffixe}</td></tr>`
}

function tableauCalendrier(): string {
  return `<table class="cal">${CALENDRIER.map(
    (etape) => `<tr><td>${etape.date}</td><td>${etape.etape}</td></tr>`
  ).join('')}</table>`
}

function blocContact(): string {
  return `<div class="contact">
<strong>Comite d'organisation Miss Ronde Cameroun</strong><br>
${EMAIL_COMITE}<br>
Telephone et WhatsApp : +237 675 23 80 97<br>
facebook.com/missrondecameroun · instagram.com/missrondecamerounofficiel
</div>`
}

/** Email adresse a la candidate : accuse de reception, recapitulatif, suite du parcours. */
function emailCandidate(d: Donnees, numero: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>${STYLE}</style></head><body>
<div class="cadre">
<div class="entete">
  <h1>MISS RONDE CAMEROUN</h1>
  <p>11EME EDITION · 2026-2027</p>
</div>
<div class="corps">
  <p>Chere <strong>${echapper(d.prenom)} ${echapper(d.nom)}</strong>,</p>
  <p>Votre candidature a la 11eme edition de Miss Ronde Cameroun nous est bien parvenue.
  Elle est enregistree sous le numero ci-dessous : conservez-le, il vous sera demande a chaque
  echange avec le comite.</p>

  <div class="numero"><span>NUMERO DE CANDIDATURE</span>${numero}</div>

  <p>L’edition 2026-2027 se place sous le theme <em>&laquo; Beaute, Dignite et Autonomie :
  La Femme Ronde au cœur du Developpement &raquo;</em>. Elle est organisee par l’Association
  Femme Ronde Cameroun, sous le Haut patronage du Ministere des Arts et de la Culture.</p>

  <h2>Recapitulatif de votre dossier</h2>
  <table>
    ${ligne('Nom', d.nom)}
    ${ligne('Prenoms', d.prenom)}
    ${ligne('Age', d.age, ' ans')}
    ${ligne('Nationalite', d.nationalite)}
    ${ligne('Email', d.email)}
    ${ligne('Telephone', d.telephone)}
    ${ligne('Adresse', d.adresse)}
    ${ligne('Situation matrimoniale', d.mariee)}
    ${ligne('Enfants', d.enfants)}
    ${ligne('Profession', d.profession)}
    ${ligne('Diplome', d.diplome)}
    ${ligne('Langues', d.langues)}
    ${ligne('Taille', d.taille, ' cm')}
    ${ligne('Poids', d.poids, ' kg')}
    ${ligne('Passeport', d.passeport)}
  </table>

  <h2>La suite du parcours</h2>
  ${tableauCalendrier()}

  <div class="encadre">
    Le comite examine chaque dossier pendant la periode de depouillement et vous recontacte
    a l’adresse <strong>${echapper(d.email)}</strong> ainsi qu’au numero que vous avez
    indique. Si une piece complementaire est necessaire, elle vous sera demandee a ce
    moment-la. Merci de rester joignable.
  </div>

  <p>Nous vous remercions de la confiance que vous accordez au concours, et vous souhaitons
  pleine reussite dans cette aventure.</p>
  <p><em>Le comite d’organisation</em></p>

  ${blocContact()}
</div>
<div class="pied">FEMMES RONDES, MARRAINES DE L’ESPOIR</div>
</div>
</body></html>`
}

/** Email adresse au comite : l’integralite du formulaire, pret a etre traite. */
function emailComite(d: Donnees, numero: string, recuLe: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><style>${STYLE}</style></head><body>
<div class="cadre">
<div class="entete">
  <h1>NOUVELLE CANDIDATURE</h1>
  <p>MISS RONDE CAMEROUN · 11EME EDITION 2026-2027</p>
</div>
<div class="corps">
  <div class="numero"><span>NUMERO DE CANDIDATURE</span>${numero}</div>
  <p style="text-align:center;font-size:13px;color:#6B6358">Recue le ${recuLe} · formulaire rempli en
  ${echapper(d.langue || 'fr')}</p>

  <h2>Identite</h2>
  <table>
    ${ligne('Nom', d.nom)}
    ${ligne('Prenoms', d.prenom)}
    ${ligne('Age', d.age, ' ans')}
    ${ligne('Nationalite', d.nationalite)}
  </table>

  <h2>Contact</h2>
  <table>
    ${ligne('Email', d.email)}
    ${ligne('Telephone', d.telephone)}
    ${ligne('Adresse', d.adresse)}
    ${ligne('Reseaux sociaux', d.reseaux)}
  </table>

  <h2>Situation</h2>
  <table>
    ${ligne('Mariee', d.mariee)}
    ${ligne('Enfants', d.enfants)}
    ${ligne('Profession', d.profession)}
    ${ligne('Diplome', d.diplome)}
    ${ligne('Langues parlees', d.langues)}
  </table>

  <h2>Motivation et projet</h2>
  <table>
    ${ligne('Reve', d.reve)}
    ${ligne('Vie associative', d.association)}
    ${ligne('Ambition', d.ambition)}
  </table>

  <h2>Mobilite</h2>
  <table>
    ${ligne('Deja voyage', d.voyage)}
    ${ligne('Passeport', d.passeport)}
    ${ligne('Numero de passeport', d.numeroPasport)}
    ${ligne('Expiration du passeport', d.expirationPasseport)}
  </table>

  <h2>Mensurations</h2>
  <table>
    ${ligne('Taille', d.taille, ' cm')}
    ${ligne('Poids', d.poids, ' kg')}
    ${ligne('Buste', d.buste, ' m')}
    ${ligne('Tour de taille', d.tourTaille, ' m')}
    ${ligne('Hanche', d.hanche, ' m')}
    ${ligne('Bassin', d.bassin, ' m')}
    ${ligne('Pointure', d.pointure)}
    ${ligne('Confection', d.confection)}
    ${ligne('Yeux', d.yeux)}
    ${ligne('Cheveux', d.cheveux)}
  </table>

  <h2>Autorisations</h2>
  <table>
    <tr><td>Droits a l'image</td><td>${d.droitsImage ? 'ACCEPTE' : 'NON ACCEPTE'}</td></tr>
    <tr><td>Reglement du concours</td><td>${d.accepteReglement ? 'ACCEPTE' : 'NON ACCEPTE'}</td></tr>
  </table>

  <div class="encadre">
    Repondre directement a cet email ecrit a la candidate : son adresse est en repondre-a.
  </div>
</div>
<div class="pied">MISS RONDE CAMEROUN</div>
</div>
</body></html>`
}

export async function POST(request: NextRequest) {
  try {
    const donnees: Donnees = await request.json()
    const { nom, prenom, email } = donnees as { nom?: string; prenom?: string; email?: string }

    if (!nom || !prenom || !email) {
      return NextResponse.json({ success: false, error: 'Champs manquants' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
      return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const numero = genererNumero()
    const recuLe = new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Douala' })

    // Les deux envois sont independants : tant que le domaine d'expedition n'est
    // pas verifie, celui vers la candidate echoue, sans empecher la notification
    // du comite — qui, elle, ne doit jamais etre perdue.
    const [versComite, versCandidate] = await Promise.allSettled([
      resend.emails.send({
        from: EXPEDITEUR,
        to: EMAIL_COMITE,
        replyTo: String(email),
        subject: `Candidature ${numero} - ${prenom} ${nom}`,
        html: emailComite(donnees, numero, recuLe),
      }),
      resend.emails.send({
        from: EXPEDITEUR,
        to: String(email),
        replyTo: EMAIL_COMITE,
        subject: `Votre candidature Miss Ronde Cameroun - ${numero}`,
        html: emailCandidate(donnees, numero),
      }),
    ])

    const echec = (resultat: PromiseSettledResult<{ error: unknown }>) =>
      resultat.status === 'rejected' ? resultat.reason : resultat.value.error

    const erreurComite = echec(versComite)
    const erreurCandidate = echec(versCandidate)

    if (erreurComite) console.error('Candidature - notification comite:', erreurComite)
    if (erreurCandidate) console.error('Candidature - accuse de reception candidate:', erreurCandidate)

    // La candidature est consideree comme recue des lors que le comite est prevenu.
    if (erreurComite) {
      return NextResponse.json({ success: false, error: 'Envoi impossible' }, { status: 502 })
    }

    return NextResponse.json({ success: true, numero, accuseCandidate: !erreurCandidate })
  } catch (error) {
    console.error('Erreur candidature:', error)
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}
