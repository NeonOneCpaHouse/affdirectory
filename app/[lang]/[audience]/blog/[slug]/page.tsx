import NewsArticleClient from "@/components/NewsArticleClient"
import CaseStudyArticleClient from "@/components/CaseStudyArticleClient"
import GuideArticleClient from "@/components/GuideArticleClient"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import { notFound } from "next/navigation"

export default async function BlogArticlePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  const related = await getRelatedArticles(slug, 3, audience)

  // Route to the appropriate client component based on category
  if (article.category === "case-studies") {
    return <CaseStudyArticleClient article={article} related={related} />
  }

  if (article.category === "guides") {
    return <GuideArticleClient article={article} related={related} />
  }

  // Default: news, reviews, trends
  return <NewsArticleClient article={article} related={related} />
}
