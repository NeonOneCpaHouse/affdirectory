import { getNetworksByAdFormat, type Network, type AdFormatKey, adFormatLabels } from "./networks"
import { getCpaNetworksByVertical, getCpaNetworkAvgRating, type CpaNetwork, type VerticalKey, verticalLabels } from "./cpaNetworks"
import { getServicesByType, getServiceAvgRating, type Service, type ServiceTypeKey, serviceTypeLabels } from "./services"
import { getDomainParkingEntries, getDomainParkingAvgRating, type DomainParkingEntry } from "./domainParking"
import { getLinkSellingEntries, getLinkSellingAvgRating, type LinkSellingEntry } from "./linkSelling"
import type { Audience } from "@/context/AudienceContext"
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

export interface RankingContentSection {
  title: Localized<string>
  paragraphs: Localized<string[]>
}

export interface RankingFaqItem {
  question: Localized<string>
  answer: Localized<string>
}

export interface RankingContentOverride {
  placement: "beforeRanking" | "afterRanking"
  introParagraphs: Localized<string[]>
  sections: RankingContentSection[]
  faq?: {
    items: RankingFaqItem[]
  }
}

export interface RankingPageOverride {
  h1: Localized<string>
  seo?: {
    title: Localized<string>
    description: Localized<string>
  }
  content?: RankingContentOverride
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

export const verticalSlugs: Record<VerticalKey, string> = {
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

export const serviceTypeSlugs: Record<ServiceTypeKey, string> = {
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

export const webmasterExtraSlugs = {
  domainParking: "domain-parking",
  linkSelling: "link-selling",
} as const

export function getAdFormatRankingHref(adFormat: AdFormatKey): string {
  return `/rankings/${adFormatSlugs[adFormat]}`
}

export function getVerticalRankingHref(vertical: VerticalKey): string {
  return `/rankings/${verticalSlugs[vertical]}`
}

export function getServiceTypeRankingHref(serviceType: ServiceTypeKey): string {
  return `/rankings/${serviceTypeSlugs[serviceType]}`
}

export function getWebmasterExtraRankingHref(extra: keyof typeof webmasterExtraSlugs): string {
  return `/rankings/${webmasterExtraSlugs[extra]}`
}

export const affiliateAdFormatKeys: AdFormatKey[] = [
  "push",
  "popunder",
  "inPage",
  "banner",
  "telegram",
  "display",
  "native",
  "mobile",
  "video",
]

export const webmasterAdFormatKeys: AdFormatKey[] = [
  "push",
  "popunder",
  "inPage",
  "banner",
  "display",
  "native",
  "video",
]

export const affiliateServiceTypeKeys: ServiceTypeKey[] = [
  "antidetect",
  "spyTools",
  "proxy",
  "trackers",
  "payments",
  "pwa",
]

export const webmasterServiceTypeKeys: ServiceTypeKey[] = [
  "seo",
  "ddos",
  "cms",
  "hosting",
]

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

export function getAudienceAdFormatKeys(audience: Audience): AdFormatKey[] {
  return audience === "webmaster" ? webmasterAdFormatKeys : affiliateAdFormatKeys
}

export function getAudienceServiceTypeKeys(audience: Audience): ServiceTypeKey[] {
  return audience === "webmaster" ? webmasterServiceTypeKeys : affiliateServiceTypeKeys
}

export function getAllowedRankingSlugs(audience: Audience): string[] {
  const adSlugs = getAudienceAdFormatKeys(audience).map((format) => adFormatSlugs[format])
  const serviceSlugs = getAudienceServiceTypeKeys(audience).map((type) => serviceTypeSlugs[type])

  if (audience === "webmaster") {
    return [
      ...adSlugs,
      webmasterExtraSlugs.domainParking,
      webmasterExtraSlugs.linkSelling,
      ...serviceSlugs,
    ]
  }

  const cpaSlugs = (Object.keys(verticalSlugs) as VerticalKey[]).map((vertical) => verticalSlugs[vertical])
  return [...adSlugs, ...cpaSlugs, ...serviceSlugs]
}

export function isRankingSlugAllowedForAudience(slug: string, audience: Audience): boolean {
  return getAllowedRankingSlugs(audience).includes(slug)
}

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
  const verticals: VerticalKey[] = ["gambling", "betting", "dating", "crypto", "finance", "sweeps", "installs", "nutra", "adult", "multivertical", "other"]
  const currentAudience = audience as Audience

  const adNetworkSubs = await Promise.all(
    getAudienceAdFormatKeys(currentAudience).map(async (format) => {
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

  if (currentAudience === "webmaster") {
    const [domainParkingItems, linkSellingItems, serviceSubs] = await Promise.all([
      getDomainParkingRanking(audience),
      getLinkSellingRanking(audience),
      Promise.all(
        getAudienceServiceTypeKeys(currentAudience).map(async (type) => {
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
      getAudienceServiceTypeKeys(currentAudience).map(async (type) => {
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
  if (!isRankingSlugAllowedForAudience(slug, audience as Audience)) {
    return undefined
  }

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

const rankingPageOverrides: Partial<Record<`${Audience}:${string}`, RankingPageOverride>> = {
  "affiliate:push-ad-networks": {
    h1: {
      en: "Best Push Ad Networks for Affiliate Marketing 2026",
      ru: "Лучшие пуш-рекламные сети для арбитража трафика 2026",
    },
    seo: {
      title: {
        en: "Best Push Ad Networks 2026: Top Rankings for Affiliates | AffTraff",
        ru: "Лучшие пуш-рекламные сети 2026: Рейтинг для арбитражников | AffTraff",
      },
      description: {
        en: "Compare the best push ad networks for affiliate marketing. Expert rankings based on performance, user experience, and support. Updated quarterly with real data.",
        ru: "Сравните лучшие пуш-сети для арбитража трафика. Экспертный рейтинг на основе производительности, опыта и поддержки. Обновляется ежеквартально.",
      },
    },
    content: {
      placement: "afterRanking",
      introParagraphs: {
        en: [
          "Push ad networks have become one of the most effective traffic sources for affiliate marketers in 2026. These platforms deliver browser notifications directly to users' devices, offering high engagement rates and competitive pricing across multiple verticals including gambling, betting, dating, e-commerce, and finance.",
          "Choosing the right push notification network can significantly impact your campaign ROI. Our ranking evaluates the best push ad networks based on three key criteria: Performance (60%), which measures traffic quality and conversion rates; Publisher Experience (25%), assessing platform usability and campaign management tools; and Support (15%), evaluating response times and technical assistance quality.",
          "Whether you're running sweepstakes offers, promoting casino brands, or scaling dating campaigns, push traffic offers precise targeting options including GEO, device type, operating system, browser, and user behavior. The networks in our ranking provide access to millions of daily impressions across tier-1, tier-2, and tier-3 countries, with minimum deposits starting from $50 and flexible payment terms.",
        ],
        ru: [
          "Пуш-рекламные сети стали одним из самых эффективных источников трафика для арбитражников в 2026 году. Эти платформы доставляют браузерные уведомления напрямую на устройства пользователей, обеспечивая высокие показатели вовлеченности и конкурентные цены по множеству вертикалей, включая гемблинг, беттинг, дейтинг, e-commerce и финансы.",
          "Выбор правильной push-сети может существенно повлиять на ROI ваших кампаний. Наш рейтинг оценивает лучшие пуш-рекламные сети на основе трёх ключевых критериев: Производительность (60%), которая измеряет качество трафика и конверсии; Опыт паблишера (25%), оценивающий удобство платформы и инструменты управления кампаниями; и Поддержка (15%), анализирующая время ответа и качество технической помощи.",
          "Независимо от того, льёте ли вы свипстейки, промотируете казино или масштабируете дейтинг-кампании, пуш-трафик предлагает точный таргетинг по ГЕО, типу устройства, операционной системе, браузеру и поведению пользователей. Сети в нашем рейтинге обеспечивают доступ к миллионам ежедневных показов в странах tier-1, tier-2 и tier-3, с минимальным депозитом от $50 и гибкими условиями оплаты.",
        ],
      },
      sections: [
        {
          title: {
            en: "Why Push Ads Work for Affiliates",
            ru: "Почему пуш-реклама работает для арбитражников",
          },
          paragraphs: {
            en: [
              "Push notification advertising delivers exceptional results for performance marketers due to several factors. First, push ads reach users who have actively subscribed to receive notifications, indicating higher engagement intent compared to other ad formats. Second, push traffic is less saturated than traditional display or native advertising, offering better CPM rates and conversion potential.",
              "The top push ad networks on our list support advanced targeting capabilities, allowing affiliates to segment audiences by demographics, interests, subscription age, and activity patterns. Real-time bidding systems enable precise budget control, while anti-fraud measures ensure traffic quality. Most platforms offer CPC and CPM pricing models, giving marketers flexibility to optimize based on campaign goals.",
            ],
            ru: [
              "Пуш-уведомления показывают исключительные результаты для перформанс-маркетологов благодаря нескольким факторам. Во-первых, пуш-реклама достигает пользователей, которые активно подписались на получение уведомлений, что указывает на более высокий уровень вовлеченности по сравнению с другими форматами. Во-вторых, пуш-трафик менее насыщен, чем традиционная баннерная или нативная реклама, предлагая лучшие ставки CPM и потенциал конверсии.",
              "Топовые пуш-сети из нашего списка поддерживают расширенные возможности таргетинга, позволяя арбитражникам сегментировать аудитории по демографии, интересам, возрасту подписки и паттернам активности. Системы торгов в реальном времени обеспечивают точный контроль бюджета, а антифрод-меры гарантируют качество трафика. Большинство платформ предлагают модели ценообразования CPC и CPM, давая маркетологам гибкость для оптимизации под цели кампаний.",
            ],
          },
        },
        {
          title: {
            en: "How We Rank Push Ad Networks",
            ru: "Как мы составляем рейтинг пуш-сетей",
          },
          paragraphs: {
            en: [
              "Our methodology combines quantitative data and qualitative feedback from affiliate marketers actively using these platforms. Performance metrics include average conversion rates across verticals, traffic volume consistency, and fraud prevention effectiveness. Publisher experience evaluates dashboard functionality, campaign setup speed, targeting granularity, and reporting accuracy. Support quality measures response times, account manager availability, and technical problem resolution.",
              "Rankings are updated quarterly to reflect market changes, new features, and community feedback. Each network undergoes continuous monitoring to ensure our recommendations remain current and reliable for affiliates making traffic source decisions.",
            ],
            ru: [
              "Наша методология сочетает количественные данные и качественную обратную связь от арбитражников, активно использующих эти платформы. Метрики производительности включают средние показатели конверсии по вертикалям, стабильность объёмов трафика и эффективность защиты от фрода. Опыт паблишера оценивает функциональность дашборда, скорость настройки кампаний, детализацию таргетинга и точность отчётности. Качество поддержки измеряет время ответа, доступность аккаунт-менеджеров и решение технических проблем.",
              "Рейтинги обновляются ежеквартально, чтобы отражать изменения на рынке, новые функции и отзывы комьюнити. Каждая сеть проходит непрерывный мониторинг, чтобы наши рекомендации оставались актуальными и надёжными для арбитражников, принимающих решения об источниках трафика.",
            ],
          },
        },
      ],
      faq: {
        items: [
          {
            question: {
              en: "What is a push ad network?",
              ru: "Что такое пуш-рекламная сеть?",
            },
            answer: {
              en: "A push ad network is a platform that delivers browser notification advertisements to users who have subscribed to receive them. These ads appear on desktop and mobile devices, offering high engagement rates for affiliate marketers.",
              ru: "Пуш-рекламная сеть — это платформа, которая доставляет рекламные браузерные уведомления пользователям, подписавшимся на их получение. Эта реклама отображается на десктопах и мобильных устройствах, обеспечивая высокую вовлечённость для арбитражников.",
            },
          },
          {
            question: {
              en: "What's the minimum deposit for push ad networks?",
              ru: "Какой минимальный депозит в пуш-сетях?",
            },
            answer: {
              en: "Most top-tier push ad networks require a minimum deposit of $50, making them accessible for both beginner and experienced affiliate marketers.",
              ru: "Большинство топовых пуш-рекламных сетей требуют минимальный депозит $50, что делает их доступными как для новичков, так и для опытных арбитражников.",
            },
          },
          {
            question: {
              en: "Which verticals work best with push traffic?",
              ru: "Какие вертикали лучше всего работают с пуш-трафиком?",
            },
            answer: {
              en: "Push ads perform exceptionally well for gambling, betting, dating, sweepstakes, e-commerce, finance, and mobile app installs due to the high-intent nature of subscribed users.",
              ru: "Пуш-реклама показывает отличные результаты в гемблинге, беттинге, дейтинге, свипстейках, e-commerce, финансах и установках мобильных приложений благодаря высокой заинтересованности подписчиков.",
            },
          },
          {
            question: {
              en: "How often are these rankings updated?",
              ru: "Как часто обновляются рейтинги?",
            },
            answer: {
              en: "Our push ad network rankings are updated quarterly based on performance data, platform changes, and affiliate feedback to ensure accuracy.",
              ru: "Наши рейтинги пуш-сетей обновляются ежеквартально на основе данных о производительности, изменений платформ и отзывов арбитражников для обеспечения актуальности.",
            },
          },
        ],
      },
    },
  },
  "affiliate:popunder-ad-networks": {
    h1: {
      en: "Best Popunder Ad Networks for Affiliate Marketing 2026",
      ru: "Лучшие Попандер Рекламные Сети для Арбитража 2026",
    },
    seo: {
      title: {
        en: "Best Popunder Ad Networks 2026: Top Rankings for Affiliates | AffTraff",
        ru: "Лучшие Попандер Рекламные Сети 2026: Рейтинг для Арбитражников | AffTraff",
      },
      description: {
        en: "Compare the best popunder ad networks for affiliate marketing. Expert rankings based on performance, traffic quality, and support. Updated quarterly with real data.",
        ru: "Топ попандер-сетей для арбитража трафика. Рейтинг на основе производительности, качества трафика и поддержки. Обновляется ежеквартально с реальными данными.",
      },
    },
    content: {
      placement: "afterRanking",
      introParagraphs: {
        en: [
          "Popunder ad networks remain one of the most scalable traffic sources for affiliate marketers working with highly competitive verticals. Popunder advertising opens a new browser window beneath the active window, ensuring 100% ad visibility and high engagement rates when campaigns are properly configured.",
          "In 2026, popunder traffic continues to deliver consistent results across gambling, betting, dating, nutra, sweepstakes, and financial offers. Our ranking of the best popunder networks is built on three key criteria: Performance (60%) — traffic quality, conversions, and volume; Publisher Experience (25%) — platform usability, moderation speed, and dashboard functionality; Support (15%) — technical support response times and personal account manager quality.",
          "Networks in our ranking provide access to billions of daily impressions worldwide, with minimum deposits starting from $50 and flexible CPC/CPM payment models. Advanced targeting options including GEO, operating systems, browsers, frequency capping, and whitelists/blacklists enable precise campaign optimization for specific offer requirements.",
        ],
        ru: [
          "Попандер рекламные сети остаются одним из наиболее масштабируемых источников трафика для арбитражников, работающих с высококонкурентными вертикалями. Попандер-реклама открывает новое окно браузера под активным окном пользователя, обеспечивая 100% видимость объявления и высокие показатели вовлеченности при правильной настройке кампаний.",
          "В 2026 году попандер-трафик продолжает демонстрировать стабильные результаты в гемблинге, беттинге, дейтинге, нутре, свипстейках и финансовых офферах. Наш рейтинг лучших попандер-сетей построен на трёх ключевых критериях: Производительность (60%) — качество трафика, конверсии и объёмы; Опыт издателя (25%) — удобство платформы, скорость модерации и функциональность кабинета; Поддержка (15%) — скорость реакции техподдержки и работа персональных менеджеров.",
          "Сети из нашего рейтинга предлагают доступ к миллиардам ежедневных показов по всему миру, с минимальным депозитом от $50 и гибкими моделями оплаты CPC/CPM. Продвинутый таргетинг по ГЕО, операционным системам, браузерам, частоте показов и белым/чёрным спискам позволяет точно настроить кампании под специфику оффера.",
        ],
      },
      sections: [
        {
          title: {
            en: "Why Popunder Advertising Works for Affiliates",
            ru: "Почему попандер-реклама эффективна для арбитража",
          },
          paragraphs: {
            en: [
              "Popunder remains the format of choice for affiliates scaling aggressive verticals due to several advantages. First, popunders ensure full-screen visibility — users are guaranteed to see your landing page, unlike banners or native ads that can easily be missed. Second, popunder traffic historically shows lower cost-per-click compared to other formats while maintaining comparable quality.",
              "Top popunder networks from our list work with direct publishers and utilize anti-fraud technologies, filtering bots and low-quality traffic. Real-time bidding (RTB) systems allow affiliates to acquire traffic at optimal prices, while detailed real-time statistics enable quick campaign optimization based on conversion data.",
              "Most platforms support frequency cap targeting (limiting impressions per user), which is especially important for affiliate marketing — preventing audience burnout and optimizing budget allocation. Integration with trackers like Voluum, Binom, and Keitaro via API enables automated bid management and scaling.",
            ],
            ru: [
              "Попандер остаётся форматом выбора для арбитражников, масштабирующих агрессивные вертикали, благодаря нескольким преимуществам. Во-первых, попандер обеспечивает полноэкранную видимость — пользователь гарантированно увидит ваш лендинг, в отличие от баннеров или нативной рекламы, которые легко пропустить. Во-вторых, попандер-трафик исторически показывает более низкую стоимость за клик по сравнению с другими форматами при сопоставимом качестве.",
              "Топовые попандер-сети из нашего списка работают с прямыми паблишерами и используют технологии антифрода, фильтруя ботов и некачественный трафик. Системы автоматических торгов (RTB) позволяют арбитражникам получать трафик по оптимальным ценам, а детальная статистика в реальном времени даёт возможность быстро оптимизировать кампании на основе данных по конверсиям.",
              "Большинство платформ поддерживают таргетинг по frequency cap (ограничение показов на пользователя), что особенно важно для арбитража — можно избежать выгорания аудитории и оптимизировать бюджет. Интеграция с трекерами типа Voluum, Binom и Keitaro через API позволяет автоматизировать управление ставками и масштабирование.",
            ],
          },
        },
        {
          title: {
            en: "Working with Popunder Traffic: Key Considerations",
            ru: "Особенности работы с попандер-трафиком",
          },
          paragraphs: {
            en: [
              "When selecting a popunder network for traffic acquisition, affiliates should consider several critical factors. Traffic quality and volume is the primary criterion: the network must provide stable volumes in required GEOs without sudden drops. Targeting and optimization — the platform should offer granular settings for devices, browsers, OS, and crucially, the ability to create source ID whitelists/blacklists.",
              "Creative moderation in popunder networks is typically more lenient than push or native formats, allowing work with more aggressive verticals. However, moderation speed varies — top networks in our ranking review creatives within 2-4 hours, enabling rapid testing.",
              "Anti-fraud and quality — verify what protection technologies the network employs. Best platforms filter traffic at datacenter level, block suspicious IP ranges, and use machine learning for bot detection. This is critical for verticals with lead validation (betting, finance, crypto).",
            ],
            ru: [
              "При выборе попандер-сети для закупки трафика арбитражники должны учитывать несколько ключевых факторов. Качество и объёмы трафика — первостепенный критерий: сеть должна обеспечивать стабильные объёмы в нужных ГЕО без резких просадок. Таргетинг и оптимизация — платформа должна предлагать гранулярные настройки по устройствам, браузерам, ОС, и, что критично, возможность создания белых/чёрных списков источников (source ID).",
              "Модерация креативов в попандер-сетях обычно лояльнее, чем в пуш или нативе, что позволяет работать с более агрессивными вертикалями. Однако скорость модерации варьируется — топовые сети из нашего рейтинга проверяют креативы в течение 2-4 часов, позволяя быстро запускать тесты.",
              "Антифрод и качество — проверяйте, какие технологии защиты использует сеть. Лучшие платформы фильтруют трафик на уровне датацентров, блокируют подозрительные IP-диапазоны и используют машинное обучение для детекции ботов. Это критично для вертикалей с валидацией лидов (беттинг, финансы, крипто).",
            ],
          },
        },
        {
          title: {
            en: "How We Rank Popunder Networks",
            ru: "Как мы составляем рейтинг попандер-сетей",
          },
          paragraphs: {
            en: [
              "Our evaluation methodology combines objective metrics with real affiliate feedback. Performance (60%) includes analysis of average conversion rates across verticals (gambling, betting, dating, nutra), traffic volume stability, anti-fraud system effectiveness, and price-quality ratio. We test networks on our own campaigns and collect data from the affiliate community.",
              "Publisher experience (25%) evaluates ad dashboard usability, statistics loading speed, targeting flexibility, API automation capabilities, and reporting quality (source ID breakdown, conversions, time segments). Moderation speed and budget transparency are also considered.",
              "Support (15%) measures average support response time, personal manager availability for large advertisers, technical assistance quality for campaign setup and troubleshooting. Networks with proactive support offering campaign optimization and insights receive additional points.",
              "Rankings are updated quarterly to reflect market changes, platform updates, and community feedback. Each network undergoes regular monitoring to ensure our recommendations remain current for traffic acquisition decisions.",
            ],
            ru: [
              "Наша методология оценки основана на комбинации объективных метрик и реальных отзывов арбитражников. Производительность (60%) включает анализ средних CR по вертикалям (гемблинг, беттинг, дейтинг, нутра), стабильность объёмов трафика, эффективность антифрод-систем и соотношение цена-качество. Мы тестируем сети на собственных кампаниях и собираем данные от комьюнити арбитражников.",
              "Опыт издателя (25%) оценивает юзабилити рекламного кабинета, скорость загрузки статистики, гибкость настройки таргетинга, возможность автоматизации через API, и качество отчётности (детализация по source ID, конверсии, временные срезы). Также учитывается скорость модерации и прозрачность работы с бюджетом.",
              "Поддержка (15%) измеряет среднее время ответа саппорта, доступность персональных менеджеров для крупных рекламодателей, качество технической помощи при настройке кампаний и решении проблем. Сети с проактивной поддержкой, предлагающие оптимизацию кампаний и инсайты, получают дополнительные баллы.",
              "Рейтинги обновляются ежеквартально с учётом изменений на рынке, обновлений платформ и фидбека от комьюнити. Каждая сеть проходит регулярный мониторинг, чтобы наши рекомендации оставались актуальными для принятия решений о закупке трафика.",
            ],
          },
        },
      ],
      faq: {
        items: [
          {
            question: {
              en: "What is popunder advertising?",
              ru: "Что такое попандер-реклама?",
            },
            answer: {
              en: "Popunder is an ad format that opens a new browser window beneath the active window. The ad becomes visible after the main window is closed, ensuring 100% ad visibility.",
              ru: "Попандер — это рекламный формат, который открывает новое окно браузера под активным окном пользователя. Реклама становится видимой после закрытия основного окна, обеспечивая 100% видимость объявления.",
            },
          },
          {
            question: {
              en: "What's the minimum deposit for popunder networks?",
              ru: "Какой минимальный депозит в попандер-сетях?",
            },
            answer: {
              en: "Most top-tier popunder ad networks require a minimum deposit starting from $50, making them accessible for affiliates with varying experience levels and budgets.",
              ru: "Большинство топовых попандер-сетей требуют минимальный депозит от $50, что делает их доступными для арбитражников с разным уровнем опыта и бюджета.",
            },
          },
          {
            question: {
              en: "Which verticals work best with popunder traffic?",
              ru: "Какие вертикали лучше всего работают с попандер-трафиком?",
            },
            answer: {
              en: "Popunder ads perform exceptionally well for gambling, betting, dating, nutra, sweepstakes, financial offers, and app installs due to the format's high visibility.",
              ru: "Попандер-реклама показывает отличные результаты в гемблинге, беттинге, дейтинге, нутре, свипстейках, финансовых офферах и установках приложений благодаря высокой видимости формата.",
            },
          },
          {
            question: {
              en: "How often are popunder network rankings updated?",
              ru: "Как часто обновляются рейтинги попандер-сетей?",
            },
            answer: {
              en: "Our popunder network rankings are updated quarterly based on performance data, platform changes, anti-fraud technologies, and affiliate feedback.",
              ru: "Наши рейтинги попандер-сетей обновляются ежеквартально на основе данных о производительности, изменений платформ, технологий антифрода и отзывов арбитражников.",
            },
          },
          {
            question: {
              en: "What's the difference between popunder and popup ads?",
              ru: "В чём разница между попандером и поп-апом?",
            },
            answer: {
              en: "Popunder opens beneath the current window and becomes visible later, while popup opens on top of the active window. Popunder is less intrusive and shows better conversion results.",
              ru: "Попандер открывается под текущим окном и становится виден позже, в то время как поп-ап открывается поверх активного окна. Попандер менее навязчив и показывает лучшие результаты конверсии.",
            },
          },
        ],
      },
    },
  },
}

export function getRankingPageOverride(slug: string, audience: Audience): RankingPageOverride | undefined {
  return rankingPageOverrides[`${audience}:${slug}`]
}

export const rankingMethodology: Localized<string> = {
  en: "Our rankings use weighted scoring: Performance (60%), Publisher Experience (25%), Support (15%). Updated quarterly.",
  ru: "Наши рейтинги используют взвешенную оценку: Производительность (60%), Опыт издателя (25%), Поддержка (15%). Обновляется ежеквартально.",
}
