/**
 * Articles d'actualite du site.
 *
 * Le tableau est volontairement vide : aucune actualite n'a encore ete
 * redigee. Pour en publier une, ajouter un objet ici, par exemple :
 *
 *   {
 *     slug: 'ouverture-candidatures-2026',
 *     date: '2026-09-01',
 *     traductions: {
 *       fr: { titre: '...', chapeau: '...', paragraphes: ['...'] },
 *       en: { titre: '...', chapeau: '...', paragraphes: ['...'] },
 *       es: { titre: '...', chapeau: '...', paragraphes: ['...'] },
 *     },
 *   }
 */
export type TraductionArticle = {
  titre: string
  chapeau: string
  paragraphes: string[]
}

export type Article = {
  slug: string
  date: string
  traductions: Record<string, TraductionArticle>
}

export const articles: Article[] = []

export function trouverArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function articlesTries(): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date))
}
