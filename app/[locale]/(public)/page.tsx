import HeroAccueil from '@/composants/sections/HeroAccueil'
import BandeauFaits from '@/composants/sections/BandeauFaits'
import APropos from '@/composants/sections/APropos'
import Dotations from '@/composants/sections/Dotations'
import CommentParticiper from '@/composants/sections/CommentParticiper'
import ApercuGalerie from '@/composants/sections/ApercuGalerie'
import SoutenirConcours from '@/composants/sections/SoutenirConcours'
import Patronage from '@/composants/sections/Patronage'
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
      <BandeauFaits />
      <APropos />
      <Dotations />
      <CommentParticiper locale={locale} />
      <ApercuGalerie locale={locale} />
      <Patronage />
      <SoutenirConcours locale={locale} />
      <BanniereTickets locale={locale} />
      <PiedDePage locale={locale} />
    </main>
  )
}
