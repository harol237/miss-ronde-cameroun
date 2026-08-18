/**
 * Liste des editions du concours.
 * La photo de chaque edition sera fournie separement : deposer le fichier dans
 * /public/images/editions/ puis renseigner le champ `photo`.
 */
export type Edition = {
  annee: string
  statut: 'avenir' | 'passee'
  /** Chemin de l'image de couverture, ex. '/images/editions/2025.jpg'. */
  photo?: string
}

// TODO : noms des laureates de chaque edition passee (a fournir).
// TODO : le concours est ne en 2012 mais la premiere edition listee est 2016 :
// preciser ce qui s'est passe entre 2012 et 2015.
export const editions: Edition[] = [
  { annee: '2026', statut: 'avenir' },
  { annee: '2025', statut: 'passee' },
  { annee: '2024', statut: 'passee' },
  { annee: '2023', statut: 'passee' },
  { annee: '2022', statut: 'passee' },
  { annee: '2021', statut: 'passee' },
  { annee: '2020', statut: 'passee' },
  { annee: '2019', statut: 'passee' },
  { annee: '2018', statut: 'passee' },
  { annee: '2017', statut: 'passee' },
  { annee: '2016', statut: 'passee' },
]

export const anneesEditions = editions.map((edition) => edition.annee)
