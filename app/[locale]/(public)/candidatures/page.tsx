import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PageCandidaturesClient from '@/composants/formulaires/FormulaireCandidature'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'candidature' })
  return { title: t('metaTitre'), description: t('intro') }
}

export default async function PageCandidatures({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <PageCandidaturesClient locale={locale} />
}
