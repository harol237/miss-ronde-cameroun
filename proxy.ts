import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

/**
 * Proxy (ex-middleware Next.js < 16).
 * Deux roles :
 *  1. Rediriger les URL sans langue (/, /contact) vers la langue du visiteur.
 *  2. Exposer la langue courante au layout racine via l'en-tete x-locale,
 *     pour renseigner correctement <html lang="...">.
 */

function langueDemandee(request: NextRequest): string {
  const entete = request.headers.get('accept-language')
  if (!entete) return defaultLocale

  // "fr-CA,fr;q=0.9,en;q=0.8" -> [{code:'fr', q:1}, ...] trie par priorite
  const preferences = entete
    .split(',')
    .map((morceau) => {
      const [langue, q] = morceau.trim().split(';q=')
      return { code: langue.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)

  const trouvee = preferences.find((p) => locales.includes(p.code as (typeof locales)[number]))
  return trouvee ? trouvee.code : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const segment = pathname.split('/')[1]
  const langueUrl = locales.find((l) => l === segment)

  if (!langueUrl) {
    const url = request.nextUrl.clone()
    url.pathname = `/${langueDemandee(request)}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  const enTetes = new Headers(request.headers)
  enTetes.set('x-locale', langueUrl)
  return NextResponse.next({ request: { headers: enTetes } })
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|images|.*\\..*).*)'],
}
