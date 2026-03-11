import { client } from "@/lib/sanity"
import type { Localized } from "@/types"

export interface SupportContact {
    avatar?: string
    platform: "telegram" | "whatsapp" | "teams"
    url: string
}

export interface LinkSellingRatings {
    support: number
    technology: number
    security: number
    effectiveness: number
}

export interface LinkSellingEntry {
    slug: string
    audience: string
    name: Localized<string>
    signupUrl: string
    logo?: string
    minWithdraw?: Localized<string>
    payoutFrequency?: Localized<string>
    paymentMethods?: string[]
    websiteUrl?: string
    socials?: {
        telegram?: string
        facebook?: string
        instagram?: string
        youtube?: string
        linkedin?: string
    }
    support?: SupportContact[]
    ratings: LinkSellingRatings
    pros: Localized<string[]>
    cons: Localized<string[]>
    review?: Localized<any[]>
}

const LINK_SELLING_QUERY_FIELDS = `
    "slug": slug.current,
    audience,
    name,
    signupUrl,
    "logo": logo.asset->url,
    minWithdraw,
    payoutFrequency,
    paymentMethods,
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
`

export async function getLinkSellingEntries(audience: string = "webmaster"): Promise<LinkSellingEntry[]> {
    const query = `*[_type == "linkSelling" && audience == $audience] | order(name.en asc) {${LINK_SELLING_QUERY_FIELDS}}`

    try {
        return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
    } catch (error) {
        console.error("Failed to fetch link selling entries from Sanity:", error)
        return []
    }
}

export async function getLinkSellingBySlug(slug: string): Promise<LinkSellingEntry | undefined> {
    const query = `*[_type == "linkSelling" && slug.current == $slug][0] {${LINK_SELLING_QUERY_FIELDS}}`

    try {
        return await client.fetch(query, { slug }, { next: { revalidate: 0 } })
    } catch (error) {
        console.error("Failed to fetch link selling by slug from Sanity:", error)
        return undefined
    }
}

export function getLinkSellingAvgRating(entry: LinkSellingEntry): number {
    const r = entry.ratings
    if (!r) return 0
    const values = [r.support, r.technology, r.security, r.effectiveness].filter((v) => v != null && v > 0)
    if (values.length === 0) return 0
    return values.reduce((sum, v) => sum + v, 0) / values.length
}
