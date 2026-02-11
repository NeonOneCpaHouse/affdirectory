import HomePageClient from "@/components/HomePageClient"
import { getArticlesByCategory } from "@/mock/articles"

export default async function HomePage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params

  const [news, guides, cases] = await Promise.all([
    getArticlesByCategory("news", audience),
    getArticlesByCategory("guides", audience),
    getArticlesByCategory("case-studies", audience),
  ])

  return <HomePageClient news={news.slice(0, 3)} guides={guides.slice(0, 3)} cases={cases.slice(0, 3)} />
}
