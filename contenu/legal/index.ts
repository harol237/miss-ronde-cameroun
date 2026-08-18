import type { DocumentLegal } from './types'
import { mentionsLegales } from './mentions-legales'
import { politiqueConfidentialite } from './politique-confidentialite'
import { conditionsGeneralesVente } from './conditions-generales-vente'
import { conditionsGeneralesUtilisation } from './conditions-generales-utilisation'
import { reglementConcours } from './reglement-concours'
import { charteInclusive } from './charte-inclusive'

export type { DocumentLegal, SectionLegale, VersionLegale } from './types'

export const documentsLegaux: DocumentLegal[] = [
  mentionsLegales,
  politiqueConfidentialite,
  conditionsGeneralesVente,
  conditionsGeneralesUtilisation,
  reglementConcours,
  charteInclusive,
]

export function trouverDocument(cle: string): DocumentLegal | undefined {
  return documentsLegaux.find((document) => document.cle === cle)
}
