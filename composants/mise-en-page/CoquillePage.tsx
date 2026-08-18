import Navbar from '@/composants/mise-en-page/Navbar'
import PiedDePage from '@/composants/mise-en-page/PiedDePage'

/**
 * Coquille commune a toutes les pages interieures :
 * navigation, banniere de titre, contenu, pied de page.
 */
export default function CoquillePage({
  locale,
  label,
  titre,
  chapeau,
  children,
  fond = 'clair',
}: {
  locale: string
  label?: string
  titre: string
  chapeau?: string
  children?: React.ReactNode
  fond?: 'clair' | 'sombre'
}) {
  return (
    <main>
      <Navbar locale={locale} />

      <header className="entete-page">
        <div className="entete-page-inner">
          {label && (
            <div className="entete-page-badge">
              <span className="ligne-or-sm" />
              <span className="section-label">{label}</span>
              <span className="ligne-or-sm" />
            </div>
          )}
          <h1 className="font-display entete-page-titre">{titre}</h1>
          {chapeau && <p className="entete-page-chapeau">{chapeau}</p>}
        </div>
      </header>

      <div className={fond === 'sombre' ? 'page-corps page-corps-sombre' : 'page-corps'}>
        {children}
      </div>

      <PiedDePage locale={locale} />
    </main>
  )
}
