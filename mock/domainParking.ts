import { client } from "@/lib/sanity"
import type { Localized } from "@/types"

export interface SupportContact {
    avatar?: string
    platform: "telegram" | "whatsapp" | "teams"
    url: string
}

export interface DomainParkingRatings {
    support: number
    technology: number
    security: number
    effectiveness: number
}

export interface DomainParkingEntry {
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
    ratings: DomainParkingRatings
    pros: Localized<string[]>
    cons: Localized<string[]>
    review?: Localized<any[]>
}

const DOMAIN_PARKING_QUERY_FIELDS = `
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

export async function getDomainParkingEntries(audience: string = "webmaster"): Promise<DomainParkingEntry[]> {
    const query = `*[_type == "domainParking" && audience == $audience] | order(name.en asc) {${DOMAIN_PARKING_QUERY_FIELDS}}`

    try {
        return await client.fetch(query, { audience }, { next: { revalidate: 0 } })
    } catch (error) {
        console.error("Failed to fetch domain parking entries from Sanity:", error)
        return []
    }
}

export async function getDomainParkingBySlug(slug: string): Promise<DomainParkingEntry | undefined> {
    const query = `*[_type == "domainParking" && slug.current == $slug][0] {${DOMAIN_PARKING_QUERY_FIELDS}}`

    try {
        return await client.fetch(query, { slug }, { next: { revalidate: 0 } })
    } catch (error) {
        console.error("Failed to fetch domain parking by slug from Sanity:", error)
        return undefined
    }
}

export function getDomainParkingAvgRating(entry: DomainParkingEntry): number {
    const r = entry.ratings
    if (!r) return 0
    const values = [r.support, r.technology, r.security, r.effectiveness].filter((v) => v != null && v > 0)
    if (values.length === 0) return 0
    return values.reduce((sum, v) => sum + v, 0) / values.length
}
