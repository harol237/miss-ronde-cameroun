export type SectionLegale = {
  titre: string
  paragraphes?: string[]
  liste?: string[]
}

export type VersionLegale = {
  titre: string
  chapeau: string
  sections: SectionLegale[]
}

/** Un document legal, decline dans les trois langues du site. */
export type DocumentLegal = {
  cle: string
  /** Date de derniere mise a jour, format AAAA-MM-JJ. */
  maj: string
  traductions: Record<string, VersionLegale>
}
