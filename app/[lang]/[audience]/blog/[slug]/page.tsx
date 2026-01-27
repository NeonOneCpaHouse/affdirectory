import NewsArticleClient from "@/components/NewsArticleClient"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import { notFound } from "next/navigation"



export default async function BlogArticlePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug)

  if (!article || (article.type !== "blog" && article.type !== "news")) notFound()

  const related = await getRelatedArticles(slug, 3, audience)

  return <NewsArticleClient article={article} related={related} />
}
