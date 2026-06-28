import PageCandidaturesClient from '@/composants/formulaires/FormulaireCandidature'

export default async function PageCandidatures({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <PageCandidaturesClient locale={locale} />
}
