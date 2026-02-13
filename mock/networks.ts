import { client } from "@/lib/sanity"
import type { Localized } from "@/types"

export interface NetworkRating {
  overall: number
  stability: number
  support: number
}

export type FormatKey =
  | "webPush"
  | "popunder"
  | "inPagePush"
  | "banner"
  | "telegram"
  | "display"
  | "native"
  | "mobile"
  | "video"
  | "domainRedirect"
  | "interstitial"

export type AdFormatKey =
  | "push"
  | "popunder"
  | "inPage"
  | "banner"
  | "telegram"
  | "display"
  | "native"
  | "mobile"
  | "video"

export interface Network {
  slug: string
  name: string
  logo?: string
  websiteUrl: string
  signupUrl: string
  adFormat?: AdFormatKey[]
  formatsSupported: FormatKey[]
  geos: Localized<string[]>
  payoutFrequency: string
  minPayout: number
  paymentMethods: string[]
  ratingsByFormat: Record<FormatKey, NetworkRating>
  pros: Localized<string[]>
  cons: Localized<string[]>
  editorialNote: Localized<string>
}

export const formatLabels: Record<FormatKey, Localized<string>> = {
  webPush: { en: "Web Push", ru: "Web Пуши" },
  popunder: { en: "Popunder", ru: "Попандер" },
  inPagePush: { en: "In-Page Push", ru: "In-Page Пуши" },
  banner: { en: "Banner", ru: "Баннеры" },
  telegram: { en: "Telegram", ru: "Telegram" },
  display: { en: "Display", ru: "Display" },
  native: { en: "Native", ru: "Нативная" },
  mobile: { en: "Mobile", ru: "Мобильная" },
  video: { en: "Video", ru: "Видео" },
  domainRedirect: { en: "Domain Redirect", ru: "Доменный трафик" },
  interstitial: { en: "Interstitial", ru: "Интерстишиал" },
}

export const adFormatLabels: Record<AdFormatKey, Localized<string>> = {
  push: { en: "Push Ad Networks", ru: "Push рекламные сети" },
  popunder: { en: "Popunder Ad Networks", ru: "Попандер рекламные сети" },
  inPage: { en: "In-Page Ad Networks", ru: "In-Page рекламные сети" },
  banner: { en: "Banner Ad Networks", ru: "Баннерные рекламные сети" },
  telegram: { en: "Telegram Ad Networks", ru: "Telegram рекламные сети" },
  display: { en: "Display Ad Networks", ru: "Display рекламные сети" },
  native: { en: "Native Ad Networks", ru: "Нативные рекламные сети" },
  mobile: { en: "Mobile Ad Networks", ru: "Мобильные рекламные сети" },
  video: { en: "Video Ad Networks", ru: "Видео рекламные сети" },
}

export async function getNetworks(audience: string = "affiliate"): Promise<Network[]> {
  const query = `*[_type == "network" && audience == $audience] {
    "slug": slug.current,
    name,
    "logo": logo.asset->url,
    websiteUrl,
    signupUrl,
    adFormat,
    formatsSupported,
    geos,
    payoutFrequency,
    minPayout,
    paymentMethods,
    ratingsByFormat,
    pros,
    cons,
    editorialNote
  }`

  try {
    return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch networks from Sanity:", error)
    return []
  }
}

export async function getNetworkBySlug(slug: string): Promise<Network | undefined> {
  const query = `*[_type == "network" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    "logo": logo.asset->url,
    websiteUrl,
    signupUrl,
    adFormat,
    formatsSupported,
    geos,
    payoutFrequency,
    minPayout,
    paymentMethods,
    ratingsByFormat,
    pros,
    cons,
    editorialNote
  }`

  try {
    return await client.fetch(query, { slug }, { next: { revalidate: 0 } })
  } catch (error) {
    console.error("Failed to fetch network by slug from Sanity:", error)
    return undefined
  }
}

export async function getNetworksByAdFormat(adFormat: AdFormatKey, audience: string = "affiliate"): Promise<Network[]> {
  const allNetworks = await getNetworks(audience)
  return allNetworks.filter((n) => n.adFormat?.includes(adFormat))
}

export async function getNetworksByFormat(format: FormatKey, audience: string = "affiliate"): Promise<Network[]> {
  const allNetworks = await getNetworks(audience)

  return allNetworks
    .filter((n) => n.formatsSupported.includes(format) && n.ratingsByFormat[format]?.overall > 0)
    .sort((a, b) => (b.ratingsByFormat[format]?.overall || 0) - (a.ratingsByFormat[format]?.overall || 0))
}

// Export for backward compatibility
export const networks = getNetworks()
