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

export interface Network {
  slug: string
  name: string
  logo?: string
  websiteUrl: string
  signupUrl: string
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
  webPush: { en: "Web Push", ru: "Пуш" },
  popunder: { en: "Popunder", ru: "Попандер" },
  inPagePush: { en: "In-Page Push", ru: "In-Page" },
  banner: { en: "Banner", ru: "Баннер" },
  telegram: { en: "Telegram", ru: "Телеграм" },
  display: { en: "Display", ru: "Дисплей" },
  native: { en: "Native", ru: "Нативные" },
  mobile: { en: "Mobile", ru: "Мобильные" },
  video: { en: "Video", ru: "Видео" },
  domainRedirect: { en: "Domain Redirect", ru: "Редирект" },
  interstitial: { en: "Interstitial", ru: "Полноэкранные" },
}

export async function getNetworks(audience: string = "affiliate"): Promise<Network[]> {
  const query = `*[_type == "network" && audience == $audience] {
    "slug": slug.current,
    name,
    "logo": logo.asset->url,
    websiteUrl,
    signupUrl,
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
    console.error("[v0] Failed to fetch networks from Sanity:", error)
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
    console.error("[v0] Failed to fetch network by slug from Sanity:", error)
    return undefined
  }
}

export async function getNetworksByFormat(format: FormatKey, audience: string = "affiliate"): Promise<Network[]> {
  const allNetworks = await getNetworks(audience)

  return allNetworks
    .filter((n) => n.formatsSupported.includes(format) && n.ratingsByFormat[format]?.overall > 0)
    .sort((a, b) => (b.ratingsByFormat[format]?.overall || 0) - (a.ratingsByFormat[format]?.overall || 0))
}

// Export for backward compatibility
export const networks = getNetworks()
