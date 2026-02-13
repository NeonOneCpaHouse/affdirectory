import { client } from "@/lib/sanity"
import type { Localized } from "@/types"

export type VerticalKey =
    | "gambling"
    | "betting"
    | "dating"
    | "crypto"
    | "finance"
    | "sweeps"
    | "installs"
    | "nutra"
    | "adult"
    | "multivertical"
    | "other"

export const verticalLabels: Record<VerticalKey, Localized<string>> = {
    gambling: { en: "Gambling", ru: "Гемблинг" },
    betting: { en: "Betting", ru: "Беттинг" },
    dating: { en: "Dating", ru: "Дейтинг" },
    crypto: { en: "Crypto", ru: "Крипто" },
    finance: { en: "Finance", ru: "Финансы" },
    sweeps: { en: "Sweeps", ru: "Свипстейки" },
    installs: { en: "Installs", ru: "Инсталлы" },
    nutra: { en: "Nutra", ru: "Нутра" },
    adult: { en: "Adult", ru: "Адалт" },
    multivertical: { en: "Multivertical", ru: "Мультивертикальные" },
    other: { en: "Other", ru: "Другие" },
}

export interface SupportContact {
    avatar?: string
    platform: "telegram" | "whatsapp" | "teams"
    url: string
}

export interface CpaNetworkRatings {
    support: number
    offers: number
    promoMaterials: number
    rates: number
}

export interface CpaNetwork {
    slug: string
    audience: string
    name: Localized<string>
    signupUrl: string
    logo?: string
    vertical: VerticalKey[]
    minWithdraw: Localized<string>
    hold: Localized<string>
    paymentMethods: string[]
    geos: Localized<string[]>
    referralProgram: Localized<string>
    websiteUrl?: string
    socials?: {
        telegram?: string
        facebook?: string
        instagram?: string
        youtube?: string
        linkedin?: string
    }
    support?: SupportContact[]
    ratings: CpaNetworkRatings
    pros: Localized<string[]>
    cons: Localized<string[]>
    review?: Localized<any[]>
}

export async function getCpaNetworks(audience: string = "affiliate"): Promise<CpaNetwork[]> {
    const query = `*[_type == "cpaNetwork" && audience == $audience] | order(name.en asc) {
    "slug": slug.current,
    audience,
    name,
    signupUrl,
    "logo": logo.asset->url,
    vertical,
    minWithdraw,
    hold,
    paymentMethods,
    geos,
    referralProgram,
    websiteUrl,
    socials,
    "support": support[] {
      "avatar": avatar.asset->url,
      platform,
      url
    },
    ratings,
    pros,
    cons,
    review
  }`

    try {
        return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
    } catch (error) {
        console.error("Failed to fetch CPA networks from Sanity:", error)
        return []
    }
}

export async function getCpaNetworkBySlug(slug: string): Promise<CpaNetwork | undefined> {
    const query = `*[_type == "cpaNetwork" && slug.current == $slug][0] {
    "slug": slug.current,
    audience,
    name,
    signupUrl,
    "logo": logo.asset->url,
    vertical,
    minWithdraw,
    hold,
    paymentMethods,
    geos,
    referralProgram,
    websiteUrl,
    socials,
    "support": support[] {
      "avatar": avatar.asset->url,
      platform,
      url
    },
    ratings,
    pros,
    cons,
    review
  }`

    try {
        return await client.fetch(query, { slug }, { next: { revalidate: 0 } })
    } catch (error) {
        console.error("Failed to fetch CPA network by slug from Sanity:", error)
        return undefined
    }
}

export async function getCpaNetworksByVertical(vertical: VerticalKey, audience: string = "affiliate"): Promise<CpaNetwork[]> {
    const allNetworks = await getCpaNetworks(audience)
    return allNetworks.filter((n) => n.vertical?.includes(vertical))
}

export function getCpaNetworkAvgRating(network: CpaNetwork): number {
    const r = network.ratings
    if (!r) return 0
    const values = [r.support, r.offers, r.promoMaterials, r.rates].filter((v) => v != null && v > 0)
    if (values.length === 0) return 0
    return values.reduce((sum, v) => sum + v, 0) / values.length
}
