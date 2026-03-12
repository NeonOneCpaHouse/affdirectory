import { getNetworksByAdFormat, type Network, type AdFormatKey, adFormatLabels } from "./networks"
import { getCpaNetworksByVertical, getCpaNetworkAvgRating, type CpaNetwork, type VerticalKey, verticalLabels } from "./cpaNetworks"
import { getServicesByType, getServiceAvgRating, type Service, type ServiceTypeKey, serviceTypeLabels } from "./services"
import { getDomainParkingEntries, getDomainParkingAvgRating, type DomainParkingEntry } from "./domainParking"
import { getLinkSellingEntries, getLinkSellingAvgRating, type LinkSellingEntry } from "./linkSelling"
import type { Localized } from "@/types"

// ─── Shared types ───────────────────────────────────────────────

export type EntityType = "adNetwork" | "cpaNetwork" | "service" | "domainParking" | "linkSelling"

export interface RankedItem {
  rank: number
  score: number
}

export interface RankedAdNetwork extends RankedItem {
  network: Network
}

export interface RankedCpaNetwork extends RankedItem {
  network: CpaNetwork
}

export interface RankedService extends RankedItem {
  service: Service
}

export interface RankedDomainParking extends RankedItem {
  entry: DomainParkingEntry
}

export interface RankedLinkSelling extends RankedItem {
  entry: LinkSellingEntry
}

export interface RankingSubcategory {
  key: string
  slug: string
  label: Localized<string>
  entityType: EntityType
  items: RankedItem[]
  itemCount: number
}

export interface RankingCategory {
  key: string
  label: Localized<string>
  subcategories: RankingSubcategory[]
}

// ─── Slug mappings ──────────────────────────────────────────────

export const adFormatSlugs: Record<AdFormatKey, string> = {
  push: "push-ad-networks",
  popunder: "popunder-ad-networks",
  inPage: "in-page-ad-networks",
  banner: "banner-ad-networks",
  telegram: "telegram-ad-networks",
  display: "display-ad-networks",
  native: "native-ad-networks",
  mobile: "mobile-ad-networks",
  video: "video-ad-networks",
}

const verticalSlugs: Record<VerticalKey, string> = {
  gambling: "gambling-cpa-networks",
  betting: "betting-cpa-networks",
  dating: "dating-cpa-networks",
  crypto: "crypto-cpa-networks",
  finance: "finance-cpa-networks",
  sweeps: "sweeps-cpa-networks",
  installs: "installs-cpa-networks",
  nutra: "nutra-cpa-networks",
  adult: "adult-cpa-networks",
  multivertical: "multivertical-cpa-networks",
  other: "other-cpa-networks",
}

const serviceTypeSlugs: Record<ServiceTypeKey, string> = {
  antidetect: "antidetect-browsers",
  spyTools: "spy-tools",
  proxy: "proxy",
  trackers: "trackers",
  payments: "payments",
  pwa: "pwa-tools",
  seo: "seo",
  ddos: "ddos-protection",
  cms: "cms",
  hosting: "hostings",
}

const webmasterExtraSlugs = {
  domainParking: "domain-parking",
  linkSelling: "link-selling",
} as const

// ─── Reverse slug maps ─────────────────────────────────────────

const slugToAdFormat: Record<string, AdFormatKey> = Object.fromEntries(
  Object.entries(adFormatSlugs).map(([k, v]) => [v, k as AdFormatKey])
)

const slugToVertical: Record<string, VerticalKey> = Object.fromEntries(
  Object.entries(verticalSlugs).map(([k, v]) => [v, k as VerticalKey])
)

const slugToServiceType: Record<string, ServiceTypeKey> = Object.fromEntries(
  Object.entries(serviceTypeSlugs).map(([k, v]) => [v, k as ServiceTypeKey])
)

const slugToWebmasterExtra = Object.fromEntries(
  Object.entries(webmasterExtraSlugs).map(([k, v]) => [v, k])
) as Record<string, keyof typeof webmasterExtraSlugs>

// ─── Data fetchers ──────────────────────────────────────────────

export async function getAdNetworkRanking(adFormat: AdFormatKey, audience: string = "affiliate"): Promise<RankedAdNetwork[]> {
  const networks = await getNetworksByAdFormat(adFormat, audience)
  // Sort by average overall rating across all supported formats
  return networks
    .map((network) => {
      const formats = network.formatsSupported || []
      const avgScore =
        formats.length > 0
          ? formats.reduce((sum, fmt) => sum + (network.ratingsByFormat?.[fmt]?.overall || 0), 0) / formats.length
          : 0
      return { network, score: Math.round(avgScore * 10) / 10, rank: 0 }
    })
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))
}

export async function getCpaNetworkRanking(vertical: VerticalKey, audience: string = "affiliate"): Promise<RankedCpaNetwork[]> {
  const networks = await getCpaNetworksByVertical(vertical, audience)
  return networks
    .map((network) => ({
      network,
      score: Math.round(getCpaNetworkAvgRating(network) * 10) / 10,
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))
}

export async function getServiceRanking(serviceType: ServiceTypeKey, audience: string = "affiliate"): Promise<RankedService[]> {
  const services = await getServicesByType(serviceType, audience)
  return services
    .map((service) => ({
      service,
      score: Math.round(getServiceAvgRating(service) * 10) / 10,
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))
}

export async function getDomainParkingRanking(audience: string = "webmaster"): Promise<RankedDomainParking[]> {
  const entries = await getDomainParkingEntries(audience)
  return entries
    .map((entry) => ({
      entry,
      score: Math.round(getDomainParkingAvgRating(entry) * 10) / 10,
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))
}

export async function getLinkSellingRanking(audience: string = "webmaster"): Promise<RankedLinkSelling[]> {
  const entries = await getLinkSellingEntries(audience)
  return entries
    .map((entry) => ({
      entry,
      score: Math.round(getLinkSellingAvgRating(entry) * 10) / 10,
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))
}

// ─── Full ranking structure ─────────────────────────────────────

export async function getAllRankingCategories(audience: string = "affiliate"): Promise<RankingCategory[]> {
  const adFormats: AdFormatKey[] = ["push", "popunder", "inPage", "banner", "telegram", "display", "native", "mobile", "video"]
  const verticals: VerticalKey[] = ["gambling", "betting", "dating", "crypto", "finance", "sweeps", "installs", "nutra", "adult", "multivertical", "other"]
  const affiliateServiceTypes: ServiceTypeKey[] = ["antidetect", "spyTools", "proxy", "trackers", "payments", "pwa", "seo", "ddos", "cms", "hosting"]
  const webmasterServiceTypes: ServiceTypeKey[] = ["seo", "ddos", "cms", "hosting"]

  const adNetworkSubs = await Promise.all(
    adFormats.map(async (format) => {
      const items = await getAdNetworkRanking(format, audience)
      return {
        key: format,
        slug: adFormatSlugs[format],
        label: adFormatLabels[format],
        entityType: "adNetwork" as EntityType,
        items,
        itemCount: items.length,
      }
    })
  )

  if (audience === "webmaster") {
    const [domainParkingItems, linkSellingItems, serviceSubs] = await Promise.all([
      getDomainParkingRanking(audience),
      getLinkSellingRanking(audience),
      Promise.all(
        webmasterServiceTypes.map(async (type) => {
          const items = await getServiceRanking(type, audience)
          return {
            key: type,
            slug: serviceTypeSlugs[type],
            label: serviceTypeLabels[type],
            entityType: "service" as EntityType,
            items,
            itemCount: items.length,
          }
        })
      ),
    ])

    return [
      {
        key: "monetization",
        label: { en: "Monetization", ru: "Монетизация" },
        subcategories: [
          ...adNetworkSubs,
          {
            key: "domainParking",
            slug: webmasterExtraSlugs.domainParking,
            label: { en: "Domain Parking", ru: "Парковка доменов" },
            entityType: "domainParking" as EntityType,
            items: domainParkingItems,
            itemCount: domainParkingItems.length,
          },
          {
            key: "linkSelling",
            slug: webmasterExtraSlugs.linkSelling,
            label: { en: "Link Selling", ru: "Продажа ссылок" },
            entityType: "linkSelling" as EntityType,
            items: linkSellingItems,
            itemCount: linkSellingItems.length,
          },
        ],
      },
      {
        key: "services",
        label: { en: "Services", ru: "Сервисы" },
        subcategories: serviceSubs,
      },
    ]
  }

  const [cpaSubs, serviceSubs] = await Promise.all([
    Promise.all(
      verticals.map(async (vertical) => {
        const items = await getCpaNetworkRanking(vertical, audience)
        return {
          key: vertical,
          slug: verticalSlugs[vertical],
          label: {
            en: `${verticalLabels[vertical].en} CPA Networks`,
            ru: `${verticalLabels[vertical].ru} CPA-сети`,
          },
          entityType: "cpaNetwork" as EntityType,
          items,
          itemCount: items.length,
        }
      })
    ),
    Promise.all(
      affiliateServiceTypes.map(async (type) => {
        const items = await getServiceRanking(type, audience)
        return {
          key: type,
          slug: serviceTypeSlugs[type],
          label: serviceTypeLabels[type],
          entityType: "service" as EntityType,
          items,
          itemCount: items.length,
        }
      })
    ),
  ])

  return [
    {
      key: "adNetworks",
      label: { en: "Ad Networks", ru: "Рекламные сети" },
      subcategories: adNetworkSubs,
    },
    {
      key: "cpaNetworks",
      label: { en: "CPA Networks", ru: "CPA-сети" },
      subcategories: cpaSubs,
    },
    {
      key: "services",
      label: { en: "Services", ru: "Сервисы" },
      subcategories: serviceSubs,
    },
  ]
}

// ─── Slug resolver ──────────────────────────────────────────────

export interface ResolvedRanking {
  entityType: EntityType
  label: Localized<string>
  slug: string
  adNetworks?: RankedAdNetwork[]
  cpaNetworks?: RankedCpaNetwork[]
  services?: RankedService[]
  domainParkingEntries?: RankedDomainParking[]
  linkSellingEntries?: RankedLinkSelling[]
}

export async function getRankingBySlug(slug: string, audience: string = "affiliate"): Promise<ResolvedRanking | undefined> {
  // Check ad network slugs
  if (slugToAdFormat[slug]) {
    const format = slugToAdFormat[slug]
    const items = await getAdNetworkRanking(format, audience)
    return {
      entityType: "adNetwork",
      label: adFormatLabels[format],
      slug,
      adNetworks: items,
    }
  }

  // Check CPA network slugs
  if (slugToVertical[slug]) {
    const vertical = slugToVertical[slug]
    const items = await getCpaNetworkRanking(vertical, audience)
    return {
      entityType: "cpaNetwork",
      label: {
        en: `${verticalLabels[vertical].en} CPA Networks`,
        ru: `${verticalLabels[vertical].ru} CPA-сети`,
      },
      slug,
      cpaNetworks: items,
    }
  }

  // Check service slugs
  if (slugToServiceType[slug]) {
    const type = slugToServiceType[slug]
    const items = await getServiceRanking(type, audience)
    return {
      entityType: "service",
      label: serviceTypeLabels[type],
      slug,
      services: items,
    }
  }

  if (slugToWebmasterExtra[slug] === "domainParking") {
    const items = await getDomainParkingRanking(audience)
    return {
      entityType: "domainParking",
      label: { en: "Domain Parking", ru: "Парковка доменов" },
      slug,
      domainParkingEntries: items,
    }
  }

  if (slugToWebmasterExtra[slug] === "linkSelling") {
    const items = await getLinkSellingRanking(audience)
    return {
      entityType: "linkSelling",
      label: { en: "Link Selling", ru: "Продажа ссылок" },
      slug,
      linkSellingEntries: items,
    }
  }

  return undefined
}

export const rankingMethodology: Localized<string> = {
  en: "Our rankings use weighted scoring: Performance (60%), Publisher Experience (25%), Support (15%). Updated quarterly.",
  ru: "Наши рейтинги используют взвешенную оценку: Производительность (60%), Опыт издателя (25%), Поддержка (15%). Обновляется ежеквартально.",
}
