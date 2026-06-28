import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function genererNumero(): string {
  const date = new Date()
  const annee = date.getFullYear()
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `MRC-${annee}-${rand}`
}

function genererEmailCandidate(data: any, numero: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: Georgia, serif; color: #1a1a1a; background: #fff; margin: 0; padding: 0; }
.header { background: #0D0D0D; padding: 30px; text-align: center; }
.header h1 { color: #C9A84C; font-size: 22px; margin: 0; letter-spacing: 3px; }
.header p { color: #fff; font-size: 12px; margin: 5px 0 0; letter-spacing: 2px; }
.body { padding: 40px 30px; }
.numero { background: #C9A84C; color: #000; font-size: 20px; font-weight: bold; padding: 15px 25px; text-align: center; letter-spacing: 3px; margin: 20px 0; }
.info { border-left: 3px solid #C9A84C; padding: 10px 15px; margin: 15px 0; background: #fafafa; }
.footer { background: #0D0D0D; padding: 20px; text-align: center; color: #C9A84C; font-size: 11px; letter-spacing: 2px; }
</style></head>
<body>
<div class="header">
  <h1>MISS RONDE CAMEROUN</h1>
  <p>ÉLÉGANCE · CONFIANCE · INSPIRATION</p>
</div>
<div class="body">
  <p>Chère <strong>${data.prenom} ${data.nom}</strong>,</p>
  <p>Nous avons bien reçu votre candidature pour <strong>Miss Ronde Cameroun — 11ème Édition 2026</strong>.</p>
  <div class="numero">N° de candidature : ${numero}</div>
  <p>Conservez précieusement ce numéro — il vous sera demandé lors de toutes vos communications avec l'organisation.</p>
  <div class="info">
    <p><strong>Prochaines étapes :</strong></p>
    <p>1. Imprimez et signez le formulaire d'inscription officiel sur chaque page</p>
    <p>2. Joignez une photocopie de votre pièce d'identité</p>
    <p>3. Joignez un justificatif de domicile</p>
    <p>4. Envoyez le dossier complet à : <strong>missrondecameroun@gmail.com</strong></p>
  </div>
  <p>Pour toute question : <strong>+237 6 75 23 80 97</strong></p>
  <p>Nous vous souhaitons bonne chance !</p>
  <p>L'équipe Miss Ronde Cameroun</p>
</div>
<div class="footer">
  <p>© 2026 MISS RONDE CAMEROUN · missrondecameroun.cm</p>
  <p>Sous le Haut Patronage du Ministère des Arts et de la Culture</p>
</div>
</body>
</html>
  `
}

function genererEmailAdmin(data: any, numero: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
body { font-family: Georgia, serif; color: #1a1a1a; background: #fff; margin: 0; padding: 0; }
.header { background: #0D0D0D; padding: 30px; text-align: center; }
.header h1 { color: #C9A84C; font-size: 22px; margin: 0; letter-spacing: 3px; }
.section { padding: 20px 30px; }
.section h2 { color: #C9A84C; font-size: 14px; letter-spacing: 2px; border-bottom: 1px solid #C9A84C; padding-bottom: 5px; margin-bottom: 15px; }
table { width: 100%; border-collapse: collapse; }
td { padding: 8px 5px; border-bottom: 1px solid #eee; font-size: 13px; }
td:first-child { font-weight: bold; width: 40%; color: #555; }
.numero { background: #C9A84C; color: #000; font-size: 18px; font-weight: bold; padding: 12px; text-align: center; letter-spacing: 3px; margin: 10px 30px; }
.footer { background: #0D0D0D; padding: 15px; text-align: center; color: #C9A84C; font-size: 11px; }
</style></head>
<body>
<div class="header"><h1>NOUVELLE CANDIDATURE REÇUE</h1></div>
<div class="numero">${numero}</div>
<div class="section">
  <h2>IDENTITÉ</h2>
  <table>
    <tr><td>Nom</td><td>${data.nom}</td></tr>
    <tr><td>Prénoms</td><td>${data.prenom}</td></tr>
    <tr><td>Âge</td><td>${data.age} ans</td></tr>
    <tr><td>Nationalité</td><td>${data.nationalite}</td></tr>
  </table>
</div>
<div class="section">
  <h2>CONTACT</h2>
  <table>
    <tr><td>Email</td><td>${data.email}</td></tr>
    <tr><td>Téléphone</td><td>${data.telephone}</td></tr>
    <tr><td>Adresse & Ville</td><td>${data.adresse}</td></tr>
    <tr><td>Réseaux sociaux</td><td>${data.reseaux}</td></tr>
  </table>
</div>
<div class="section">
  <h2>SITUATION PERSONNELLE</h2>
  <table>
    <tr><td>Mariée</td><td>${data.mariee}</td></tr>
    <tr><td>Enfants</td><td>${data.enfants}</td></tr>
    <tr><td>Profession/Études</td><td>${data.profession}</td></tr>
    <tr><td>Dernier diplôme</td><td>${data.diplome}</td></tr>
    <tr><td>Langues parlées</td><td>${data.langues}</td></tr>
  </table>
</div>
<div class="section">
  <h2>QUESTIONS</h2>
  <table>
    <tr><td>Rêve si élue</td><td>${data.reve}</td></tr>
    <tr><td>Association caritative</td><td>${data.association}</td></tr>
    <tr><td>Ambition</td><td>${data.ambition}</td></tr>
  </table>
</div>
<div class="section">
  <h2>VOYAGES & PASSEPORT</h2>
  <table>
    <tr><td>Déjà voyagé</td><td>${data.voyage}</td></tr>
    <tr><td>Passeport</td><td>${data.passeport}</td></tr>
    <tr><td>Numéro passeport</td><td>${data.numeroPasport || 'N/A'}</td></tr>
    <tr><td>Expiration</td><td>${data.expirationPasseport || 'N/A'}</td></tr>
  </table>
</div>
<div class="section">
  <h2>MENSURATIONS</h2>
  <table>
    <tr><td>Taille sans talons</td><td>${data.taille} cm</td></tr>
    <tr><td>Poids</td><td>${data.poids} kg</td></tr>
    <tr><td>Tour de buste</td><td>${data.buste} m</td></tr>
    <tr><td>Tour de taille</td><td>${data.tourTaille} m</td></tr>
    <tr><td>Tour de hanche</td><td>${data.hanche} m</td></tr>
    <tr><td>Tour de bassin</td><td>${data.bassin} m</td></tr>
    <tr><td>Pointure</td><td>${data.pointure}</td></tr>
    <tr><td>Taille confection</td><td>${data.confection}</td></tr>
    <tr><td>Couleur yeux</td><td>${data.yeux}</td></tr>
    <tr><td>Couleur cheveux</td><td>${data.cheveux}</td></tr>
  </table>
</div>
<div class="footer"><p>© 2026 MISS RONDE CAMEROUN</p></div>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const numero = genererNumero()

    // Email à la candidate
    await resend.emails.send({
      from: 'Miss Ronde Cameroun <noreply@missrondecameroun.cm>',
      to: data.email,
      subject: `Confirmation de candidature — ${numero}`,
      html: genererEmailCandidate(data, numero),
    })

    // Email à l'organisation
    await resend.emails.send({
      from: 'Miss Ronde Cameroun <noreply@missrondecameroun.cm>',
      to: 'missrondecameroun@gmail.com',
      subject: `Nouvelle candidature — ${numero} — ${data.prenom} ${data.nom}`,
      html: genererEmailAdmin(data, numero),
    })

    return NextResponse.json({ success: true, numero })
  } catch (error) {
    console.error('Erreur candidature:', error)
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}
