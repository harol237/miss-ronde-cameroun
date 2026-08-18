import type { Metadata } from 'next'
import PageLegale, { metadonneesLegales } from '@/composants/mise-en-page/PageLegale'

const CLE = 'conditions-generales-utilisation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return metadonneesLegales(CLE, locale)
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <PageLegale locale={locale} cle={CLE} />
}
