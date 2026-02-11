import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import GuideArticleClient from "@/components/GuideArticleClient"

export default async function GuideDetailPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug)

  if (!article || article.category !== "guides") notFound()

  const related = await getRelatedArticles(slug, 3, audience)

  return <GuideArticleClient article={article} related={related} />
}
