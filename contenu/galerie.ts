/**
 * Photos de la galerie.
 *
 * Le tableau est vide tant qu'aucune photo n'a ete fournie. Pour en ajouter :
 * deposer le fichier dans /public/images/galerie/ puis completer ici, ex. :
 *
 *   { fichier: '/images/galerie/2025-finale-01.jpg', edition: '2025', legende: 'Grande Finale 2025' }
 */
export type Photo = {
  fichier: string
  edition: string
  legende: string
}

export const photos: Photo[] = []

export function photosParEdition(edition: string | null): Photo[] {
  return edition ? photos.filter((photo) => photo.edition === edition) : photos
}
