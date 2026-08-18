/**
 * Coordonnees et reperes officiels du concours.
 * Source unique : toute modification ici se propage au site entier.
 */

export const CONTACT = {
  email: 'missrondecameroun@gmail.com',
  telephone: '+237 675 23 80 97',
  telephoneLien: 'tel:+237675238097',
  ville: 'Yaoundé, Cameroun',
} as const

export const RESEAUX = [
  { nom: 'Facebook', sigle: 'FB', href: 'https://www.facebook.com/missrondecameroun' },
  { nom: 'Instagram', sigle: 'IG', href: 'https://www.instagram.com/missrondecamerounofficiel' },
  { nom: 'TikTok', sigle: 'TT', href: 'https://www.tiktok.com/@missrondecameroun' },
  { nom: 'WhatsApp', sigle: 'WA', href: 'https://wa.me/+237675238097' },
] as const

// TODO : la chaine YouTube (@missrondecamerounofficiel) ne figure plus dans les
// coordonnees officielles fournies. La retirer definitivement ou la reintegrer ?

/** Date et heure de la soiree de l'election, utilisee par le compte a rebours. */
export const DATE_GRANDE_FINALE = '2027-01-30T20:00:00'

// TODO : photo officielle de la fondatrice (a fournir). Deposer le fichier dans
// /public/images/ puis renseigner le chemin ici, ex. '/images/fondatrice.jpg'.
// Tant que la valeur est nulle, un medaillon sobre tient la place sur la page A propos.
export const PHOTO_FONDATRICE: string | null = null

// TODO : lien vers le formulaire d'inscription et le reglement officiels de
// l'edition 2026-2027. Le PDF actuellement en ligne date de 2019 et est obsolete.
export const LIEN_FORMULAIRE_PDF: string | null = null
