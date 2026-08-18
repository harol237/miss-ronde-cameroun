import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, locales, type Locale } from './config'

export default getRequestConfig(async ({ requestLocale }) => {
  const demandee = await requestLocale
  const locale: Locale = locales.includes(demandee as Locale)
    ? (demandee as Locale)
    : defaultLocale

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
