import type { MetadataRoute } from "next"
import { getBlogArticles } from "@/mock/articles"
import { getCpaNetworks } from "@/mock/cpaNetworks"
import { getDomainParkingEntries } from "@/mock/domainParking"
import { getEvents } from "@/mock/events"
import { getJobs } from "@/mock/jobs"
import { getAllKnowledgeEntries } from "@/mock/knowledge"
import { getLinkSellingEntries } from "@/mock/linkSelling"
import { getNetworks } from "@/mock/networks"
import { getAllowedRankingSlugs } from "@/mock/rankings"
import { getServices } from "@/mock/services"
import { buildLocalizedUrl, supportedAudiences, supportedLanguages } from "@/lib/seo"

type SitemapEntry = MetadataRoute.Sitemap[number]

const sharedStaticPaths = [
  "",
  "/about",
  "/advertise",
  "/blog",
  "/contact",
  "/disclaimer",
  "/events",
  "/jobs",
  "/knowledge-base",
  "/privacy",
  "/rankings",
  "/services",
  "/terms",
  "/tools",
] as const

const affiliateOnlyStaticPaths = ["/cpa-networks", "/networks"] as const
const webmasterOnlyStaticPaths = [
  "/monetization",
  "/monetization/domain-parking",
  "/monetization/link-selling",
] as const

function pushEntry(map: Map<string, SitemapEntry>, entry: SitemapEntry) {
  map.set(entry.url, entry)
}

function dateOrUndefined(value?: string) {
  if (!value) {
    return undefined
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = new Map<string, SitemapEntry>()

  for (const lang of supportedLanguages) {
    for (const audience of supportedAudiences) {
      const basePaths = [
        ...sharedStaticPaths,
        ...(audience === "affiliate" ? affiliateOnlyStaticPaths : webmasterOnlyStaticPaths),
      ]

      for (const pathname of basePaths) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, pathname),
          changeFrequency: pathname === "" ? "daily" : "weekly",
          priority: pathname === "" ? 1 : 0.7,
        })
      }

      for (const slug of getAllowedRankingSlugs(audience)) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/rankings/${slug}`),
          changeFrequency: "weekly",
          priority: 0.8,
        })
      }
    }
  }

  for (const audience of supportedAudiences) {
    const [
      articles,
      knowledgeEntries,
      eventsEn,
      eventsRu,
      jobsEn,
      jobsRu,
      services,
      networks,
      cpaNetworks,
      domainParkingEntries,
      linkSellingEntries,
    ] = await Promise.all([
      getBlogArticles(audience),
      getAllKnowledgeEntries(audience),
      getEvents(audience, "en"),
      getEvents(audience, "ru"),
      getJobs(audience, "en"),
      getJobs(audience, "ru"),
      getServices(audience),
      getNetworks(audience),
      audience === "affiliate" ? getCpaNetworks(audience) : Promise.resolve([]),
      audience === "webmaster" ? getDomainParkingEntries(audience) : Promise.resolve([]),
      audience === "webmaster" ? getLinkSellingEntries(audience) : Promise.resolve([]),
    ])

    const eventSlugs = new Map<string, string>()
    for (const event of [...eventsEn, ...eventsRu]) {
      eventSlugs.set(event.slug, event.date)
    }

    const jobSlugs = new Map<string, string>()
    for (const job of [...jobsEn, ...jobsRu]) {
      jobSlugs.set(job.slug, job.publishedAt || job.createdAt)
    }

    for (const lang of supportedLanguages) {
      for (const article of articles) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/blog/${article.slug}`),
          lastModified: dateOrUndefined(article.date),
          changeFrequency: "monthly",
          priority: 0.7,
        })
      }

      for (const entry of knowledgeEntries) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/knowledge-base/${entry.slug}`),
          changeFrequency: "monthly",
          priority: 0.6,
        })
      }

      for (const [slug, date] of eventSlugs) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/events/${slug}`),
          lastModified: dateOrUndefined(date),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }

      for (const [slug, publishedAt] of jobSlugs) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/jobs/${slug}`),
          lastModified: dateOrUndefined(publishedAt),
          changeFrequency: "daily",
          priority: 0.7,
        })
      }

      for (const service of services) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/services/${service.serviceType}/${service.slug}`),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }

      for (const network of networks) {
        pushEntry(entries, {
          url: buildLocalizedUrl(
            lang,
            audience,
            `/networks/${network.adFormat?.[0] || "push"}/${network.slug}`,
          ),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }

      for (const network of cpaNetworks) {
        pushEntry(entries, {
          url: buildLocalizedUrl(
            lang,
            audience,
            `/cpa-networks/${network.vertical?.[0] || "other"}/${network.slug}`,
          ),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }

      for (const entry of domainParkingEntries) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/monetization/domain-parking/${entry.slug}`),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }

      for (const entry of linkSellingEntries) {
        pushEntry(entries, {
          url: buildLocalizedUrl(lang, audience, `/monetization/link-selling/${entry.slug}`),
          changeFrequency: "weekly",
          priority: 0.7,
        })
      }
    }
  }

  return Array.from(entries.values()).sort((left, right) => left.url.localeCompare(right.url))
}
