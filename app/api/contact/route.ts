import { NextRequest, NextResponse } from 'next/server'
import { echapper, EMAIL_COMITE, EXPEDITEUR } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const donnees = await request.json()
    const { nom, email, telephone, motif, message } = donnees

    if (!nom || !email || !message) {
      return NextResponse.json({ success: false, error: 'Champs manquants' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
      return NextResponse.json({ success: false, error: 'Email invalide' }, { status: 400 })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    const html = `
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:Georgia,serif;color:#1a1a1a;background:#fff;margin:0;padding:0}
.header{background:#0D0D0D;padding:26px;text-align:center}
.header h1{color:#C9A84C;font-size:20px;margin:0;letter-spacing:3px}
.section{padding:24px 30px}
table{width:100%;border-collapse:collapse}
td{padding:8px 5px;border-bottom:1px solid #eee;font-size:13px;vertical-align:top}
td:first-child{font-weight:bold;width:32%;color:#555}
.message{background:#fafafa;border-left:3px solid #C9A84C;padding:16px;margin-top:16px;white-space:pre-wrap;font-size:14px}
.footer{background:#0D0D0D;padding:14px;text-align:center;color:#C9A84C;font-size:11px}
</style></head><body>
<div class="header"><h1>NOUVEAU MESSAGE - SITE WEB</h1></div>
<div class="section"><table>
<tr><td>Nom</td><td>${echapper(nom)}</td></tr>
<tr><td>Email</td><td>${echapper(email)}</td></tr>
<tr><td>Telephone</td><td>${echapper(telephone) || '-'}</td></tr>
<tr><td>Motif</td><td>${echapper(motif) || '-'}</td></tr>
</table>
<div class="message">${echapper(message)}</div>
</div>
<div class="footer"><p>MISS RONDE CAMEROUN</p></div>
</body></html>`

    await resend.emails.send({
      from: EXPEDITEUR,
      to: EMAIL_COMITE,
      replyTo: String(email),
      subject: `Contact site - ${echapper(motif) || 'Message'} - ${echapper(nom)}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur contact:', error)
    return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 })
  }
}
