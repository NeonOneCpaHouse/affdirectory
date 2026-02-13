import { client } from "@/lib/sanity"
import type { Localized } from "@/types"

export type ServiceTypeKey =
    | "antidetect"
    | "spyTools"
    | "proxy"
    | "trackers"
    | "payments"
    | "pwa"

export const serviceTypeLabels: Record<ServiceTypeKey, Localized<string>> = {
    antidetect: { en: "Antidetect Browsers", ru: "Антидетект-браузеры" },
    spyTools: { en: "Spy Tools", ru: "Spy-сервисы" },
    proxy: { en: "Proxy", ru: "Прокси" },
    trackers: { en: "Trackers", ru: "Трекеры" },
    payments: { en: "Payments", ru: "Платежки" },
    pwa: { en: "PWA Tools", ru: "PWA-инструменты" },
}

export interface SupportContact {
    avatar?: string
    platform: "telegram" | "whatsapp" | "teams"
    url: string
}

export interface ServiceRatings {
    support: number
    technology: number
    security: number
    effectiveness: number
}

export interface Service {
    slug: string
    audience: string
    name: Localized<string>
    signupUrl: string
    logo?: string
    serviceType: ServiceTypeKey
    trialPeriod: Localized<string>
    pricing: Localized<string>
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
    ratings: ServiceRatings
    pros: Localized<string[]>
    cons: Localized<string[]>
    review?: Localized<any[]>
}

export async function getServices(audience: string = "affiliate"): Promise<Service[]> {
    const query = `*[_type == "service" && audience == $audience] | order(name.en asc) {
    "slug": slug.current,
    audience,
    name,
    signupUrl,
    "logo": logo.asset->url,
    serviceType,
    trialPeriod,
    pricing,
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
        console.error("Failed to fetch services from Sanity:", error)
        return []
    }
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
    const query = `*[_type == "service" && slug.current == $slug][0] {
    "slug": slug.current,
    audience,
    name,
    signupUrl,
    "logo": logo.asset->url,
    serviceType,
    trialPeriod,
    pricing,
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
        console.error("Failed to fetch service by slug from Sanity:", error)
        return undefined
    }
}

export async function getServicesByType(type: ServiceTypeKey, audience: string = "affiliate"): Promise<Service[]> {
    const allServices = await getServices(audience)
    return allServices.filter((s) => s.serviceType === type)
}

export function getServiceAvgRating(service: Service): number {
    const r = service.ratings
    if (!r) return 0
    const values = [r.support, r.technology, r.security, r.effectiveness].filter((v) => v != null && v > 0)
    if (values.length === 0) return 0
    return values.reduce((sum, v) => sum + v, 0) / values.length
}
