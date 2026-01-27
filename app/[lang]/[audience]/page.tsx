import HomePageClient from "@/components/HomePageClient"
import { getLatestNews, getLatestGuides, getCaseStudies } from "@/mock/articles"

export default async function HomePage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params

  const news = await getLatestNews(3, audience)
  const guides = await getLatestGuides(3, audience)
  const cases = await getCaseStudies(3, audience)

  return <HomePageClient news={news} guides={guides} cases={cases} />
}
