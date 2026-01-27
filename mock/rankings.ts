import { getNetworks, type Network, formatLabels, type FormatKey } from "./networks"
import type { Localized } from "@/types"

export interface RankedNetwork {
  network: Network
  rank: number
  score: number
}

export interface FormatRanking {
  format: FormatKey
  label: Localized<string>
  slug: string
  networks: RankedNetwork[]
  bestFor: {
    title: Localized<string>
    network: Network
    reason: Localized<string>
  }[]
}

const formatSlugs: Record<FormatKey, string> = {
  webPush: "web-push",
  popunder: "popunder",
  inPagePush: "in-page-push",
  banner: "banner",
  telegram: "telegram",
  display: "display",
  native: "native",
  mobile: "mobile",
  video: "video",
  domainRedirect: "domain-redirect",
  interstitial: "interstitial",
}

export async function getRankingsByFormat(format: FormatKey, audience: string = "affiliate"): Promise<FormatRanking> {
  const networks = await getNetworks(audience)

  const rankedNetworks = networks
    .filter((n) => n.formatsSupported.includes(format) && n.ratingsByFormat[format]?.overall > 0)
    .map((network) => ({ network, score: network.ratingsByFormat[format].overall, rank: 0 }))
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, rank: index + 1 }))

  const bestFor: FormatRanking["bestFor"] = []
  if (rankedNetworks.length > 0) {
    bestFor.push({
      title: { en: "Best Overall", ru: "Лучший выбор" },
      network: rankedNetworks[0].network,
      reason: {
        en: `Top-rated for ${formatLabels[format].en}.`,
        ru: `Самый высокий рейтинг в категории ${formatLabels[format].ru}.`,
      },
    })
  }
  const beginnerFriendly = [...rankedNetworks].sort((a, b) => a.network.minPayout - b.network.minPayout)[0]
  if (beginnerFriendly) {
    bestFor.push({
      title: { en: "Best for Beginners", ru: "Для новичков" },
      network: beginnerFriendly.network,
      reason: {
        en: `Low $${beginnerFriendly.network.minPayout} minimum payment.`,
        ru: `Низкий порог выплаты: всего $${beginnerFriendly.network.minPayout}.`,
      },
    })
  }

  return {
    format,
    label: formatLabels[format],
    slug: formatSlugs[format],
    networks: rankedNetworks,
    bestFor,
  }
}

export async function getAllFormatRankings(audience: string = "affiliate"): Promise<FormatRanking[]> {
  const allFormats: FormatKey[] = [
    "webPush",
    "popunder",
    "inPagePush",
    "banner",
    "telegram",
    "display",
    "native",
    "mobile",
    "video",
    "domainRedirect",
    "interstitial",
  ]
  return Promise.all(allFormats.map((format) => getRankingsByFormat(format, audience)))
}

export async function getRankingBySlug(slug: string, audience: string = "affiliate"): Promise<FormatRanking | undefined> {
  const map: Record<string, FormatKey> = {
    "web-push": "webPush",
    popunder: "popunder",
    "in-page-push": "inPagePush",
    banner: "banner",
    telegram: "telegram",
    display: "display",
    native: "native",
    mobile: "mobile",
    "domain-redirect": "domainRedirect",
    interstitial: "interstitial",
  }
  return map[slug] ? await getRankingsByFormat(map[slug], audience) : undefined
}

export const rankingMethodology: Localized<string> = {
  en: "Our rankings use weighted scoring: Performance (60%), Publisher Experience (25%), Support (15%). Updated quarterly.",
  ru: "Наши рейтинги используют взвешенную оценку: Производительность (60%), Опыт издателя (25%), Поддержка (15%). Обновляется ежеквартально.",
}
