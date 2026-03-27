import type { Metadata } from "next"
import HomePageClient from "@/components/HomePageClient"
import { getArticlesByCategory, getLatestArticles } from "@/mock/articles"
import { getEvents } from "@/mock/events"
import { getJobs } from "@/mock/jobs"
import { buildSeoMetadata, getHomeSeoEntry, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; audience: string }>
}): Promise<Metadata> {
  const { lang, audience } = await params

  if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
    return {}
  }

  const seo = getHomeSeoEntry(audience, lang)
  return buildSeoMetadata({ lang, audience, title: seo.title, description: seo.description })
}

export default async function HomePage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { lang, audience } = await params

  const [latestArticles, guides, cases, reviews, events, jobs] = await Promise.all([
    getLatestArticles(4, audience),
    getArticlesByCategory("guides", audience),
    getArticlesByCategory("case-studies", audience),
    getArticlesByCategory("reviews", audience),
    getEvents(audience, lang),
    getJobs(audience, lang),
  ])

  return (
    <HomePageClient
      latestArticles={latestArticles}
      guides={guides.slice(0, 4)}
      cases={cases.slice(0, 4)}
      reviews={reviews.slice(0, 4)}
      events={events.slice(0, 4)}
      jobs={jobs.slice(0, 4)}
    />
  )
}
