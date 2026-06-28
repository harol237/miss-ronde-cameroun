import { NextRequest, NextResponse } from 'next/server'

function genererNumero(): string {
  const date = new Date()
  const annee = date.getFullYear()
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `MRC-${annee}-${rand}`
}

export async function POST(request: NextRequest) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    const data = await request.json()
    const numero = genererNumero()

    const emailCandidate = `
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:Georgia,serif;color:#1a1a1a;background:#fff;margin:0;padding:0}
.header{background:#0D0D0D;padding:30px;text-align:center}
.header h1{color:#C9A84C;font-size:22px;margin:0;letter-spacing:3px}
.header p{color:#fff;font-size:12px;margin:5px 0 0;letter-spacing:2px}
.body{padding:40px 30px}
.numero{background:#C9A84C;color:#000;font-size:20px;font-weight:bold;padding:15px 25px;text-align:center;letter-spacing:3px;margin:20px 0}
.info{border-left:3px solid #C9A84C;padding:10px 15px;margin:15px 0;background:#fafafa}
.footer{background:#0D0D0D;padding:20px;text-align:center;color:#C9A84C;font-size:11px;letter-spacing:2px}
</style></head><body>
<div class="header"><h1>MISS RONDE CAMEROUN</h1><p>ELEGANCE · CONFIANCE · INSPIRATION</p></div>
<div class="body">
<p>Chere <strong>${data.prenom} ${data.nom}</strong>,</p>
<p>Nous avons bien recu votre candidature pour <strong>Miss Ronde Cameroun 11eme Edition 2026</strong>.</p>
<div class="numero">N de candidature : ${numero}</div>
<p>Conservez precieusement ce numero.</p>
<div class="info">
<p><strong>Prochaines etapes :</strong></p>
<p>1. Imprimez et signez le formulaire officiel sur chaque page</p>
<p>2. Joignez une photocopie de votre piece d identite</p>
<p>3. Joignez un justificatif de domicile</p>
<p>4. Envoyez le dossier a : missrondecameroun@gmail.com</p>
</div>
<p>Pour toute question : +237 6 75 23 80 97</p>
<p>L equipe Miss Ronde Cameroun</p>
</div>
<div class="footer"><p>2026 MISS RONDE CAMEROUN · missrondecameroun.cm</p></div>
</body></html>`

    const emailAdmin = `
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:Georgia,serif;color:#1a1a1a;background:#fff;margin:0;padding:0}
.header{background:#0D0D0D;padding:30px;text-align:center}
.header h1{color:#C9A84C;font-size:22px;margin:0;letter-spacing:3px}
.section{padding:20px 30px}
.section h2{color:#C9A84C;font-size:14px;letter-spacing:2px;border-bottom:1px solid #C9A84C;padding-bottom:5px;margin-bottom:15px}
table{width:100%;border-collapse:collapse}
td{padding:8px 5px;border-bottom:1px solid #eee;font-size:13px}
td:first-child{font-weight:bold;width:40%;color:#555}
.numero{background:#C9A84C;color:#000;font-size:18px;font-weight:bold;padding:12px;text-align:center;letter-spacing:3px;margin:10px 30px}
.footer{background:#0D0D0D;padding:15px;text-align:center;color:#C9A84C;font-size:11px}
</style></head><body>
<div class="header"><h1>NOUVELLE CANDIDATURE</h1></div>
<div class="numero">${numero}</div>
<div class="section"><h2>IDENTITE</h2><table>
<tr><td>Nom</td><td>${data.nom}</td></tr>
<tr><td>Prenoms</td><td>${data.prenom}</td></tr>
<tr><td>Age</td><td>${data.age} ans</td></tr>
<tr><td>Nationalite</td><td>${data.nationalite}</td></tr>
</table></div>
<div class="section"><h2>CONTACT</h2><table>
<tr><td>Email</td><td>${data.email}</td></tr>
<tr><td>Telephone</td><td>${data.telephone}</td></tr>
<tr><td>Adresse</td><td>${data.adresse}</td></tr>
<tr><td>Reseaux</td><td>${data.reseaux}</td></tr>
</table></div>
<div class="section"><h2>SITUATION</h2><table>
<tr><td>Mariee</td><td>${data.mariee}</td></tr>
<tr><td>Enfants</td><td>${data.enfants}</td></tr>
<tr><td>Profession</td><td>${data.profession}</td></tr>
<tr><td>Diplome</td><td>${data.diplome}</td></tr>
<tr><td>Langues</td><td>${data.langues}</td></tr>
</table></div>
<div class="section"><h2>MENSURATIONS</h2><table>
<tr><td>Taille</td><td>${data.taille} cm</td></tr>
<tr><td>Poids</td><td>${data.poids} kg</td></tr>
<tr><td>Buste</td><td>${data.buste} m</td></tr>
<tr><td>Tour taille</td><td>${data.tourTaille} m</td></tr>
<tr><td>Hanche</td><td>${data.hanche} m</td></tr>
<tr><td>Bassin</td><td>${data.bassin} m</td></tr>
<tr><td>Pointure</td><td>${data.pointure}</td></tr>
<tr><td>Confection</td><td>${data.confection}</td></tr>
<tr><td>Yeux</td><td>${data.yeux}</td></tr>
<tr><td>Cheveux</td><td>${data.cheveux}</td></tr>
</table></div>
<div class="footer"><p>2026 MISS RONDE CAMEROUN</p></div>
</body></html>`

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: data.email,
      subject: `Confirmation de candidature - ${numero}`,
      html: emailCandidate,
    })

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'missrondecameroun@gmail.com',
      subject: `Nouvelle candidature - ${numero} - ${data.prenom} ${data.nom}`,
      html: emailAdmin,
    })

    return NextResponse.json({ success: true, numero })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}
