/**
 * Reglages communs a tous les emails envoyes par le site (Resend).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADRESSE D'EXPEDITION — LA SEULE LIGNE A MODIFIER
 *
 * Tant que le domaine missrondecameroun.cm n'est pas verifie dans Resend, on
 * expedie depuis onboarding@resend.dev. Ce domaine de test n'autorise l'envoi
 * QU'A l'adresse proprietaire du compte Resend : les emails adresses aux
 * candidates ne partent donc pas encore.
 *
 * Une fois le domaine verifie dans Resend (ajout des enregistrements DNS puis
 * validation), remplacer la valeur de EXPEDITEUR ci-dessous par :
 *
 *     export const EXPEDITEUR = 'Miss Ronde Cameroun <candidatures@missrondecameroun.cm>'
 *
 * Rien d'autre n'est a changer : les deux routes (candidatures et contact)
 * lisent cette constante.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const EXPEDITEUR = 'Miss Ronde Cameroun <onboarding@resend.dev>'

/** Boite officielle du comite d'organisation. */
export const EMAIL_COMITE = 'missrondecameroun@gmail.com'

/** Neutralise le HTML saisi par le visiteur avant de l'inserer dans un email. */
export function echapper(valeur: unknown): string {
  return String(valeur ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
