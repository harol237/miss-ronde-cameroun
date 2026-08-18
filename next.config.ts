import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/requete.ts')

const nextConfig: NextConfig = {
  // En developpement, Next bloque les requetes aux ressources internes (les
  // fichiers JavaScript de la page) provenant d'une autre origine que celle du
  // demarrage, c'est-a-dire localhost. Le site est consulte depuis un autre
  // poste du reseau local et via Tailscale : sans ces origines, le navigateur
  // recoit la page mais pas son JavaScript, et le contenu reste invisible.
  allowedDevOrigins: ['192.168.0.18', '100.75.81.104'],
}

export default withNextIntl(nextConfig)
