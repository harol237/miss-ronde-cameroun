import HeroAccueil from '@/composants/sections/HeroAccueil'
import APropos from '@/composants/sections/APropos'
import CommentParticiper from '@/composants/sections/CommentParticiper'
import ApercuGalerie from '@/composants/sections/ApercuGalerie'
import BanniereTickets from '@/composants/sections/BanniereTickets'
import Navbar from '@/composants/mise-en-page/Navbar'
import PiedDePage from '@/composants/mise-en-page/PiedDePage'

export default async function PageAccueil({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main>
      <Navbar locale={locale} />
      <HeroAccueil locale={locale} />
      <APropos />
      <CommentParticiper locale={locale} />
      <ApercuGalerie locale={locale} />
      <BanniereTickets locale={locale} />
      <PiedDePage locale={locale} />
    </main>
  )
}
