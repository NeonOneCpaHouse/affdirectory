import HomePageClient from "@/components/HomePageClient"
import { getArticlesByCategory } from "@/mock/articles"
import { getEvents } from "@/mock/events"
import { getJobs } from "@/mock/jobs"

export default async function HomePage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { lang, audience } = await params

  const [news, guides, cases, reviews, events, jobs] = await Promise.all([
    getArticlesByCategory("news", audience),
    getArticlesByCategory("guides", audience),
    getArticlesByCategory("case-studies", audience),
    getArticlesByCategory("reviews", audience),
    getEvents(audience, lang),
    getJobs(audience, lang),
  ])

  return (
    <HomePageClient
      news={news.slice(0, 4)}
      guides={guides.slice(0, 4)}
      cases={cases.slice(0, 4)}
      reviews={reviews.slice(0, 4)}
      events={events.slice(0, 4)}
      jobs={jobs.slice(0, 4)}
    />
  )
}
