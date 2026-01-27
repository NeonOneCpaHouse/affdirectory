import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import { notFound } from "next/navigation"
import CaseStudyArticleClient from "@/components/CaseStudyArticleClient"



export default async function CaseStudyPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug)

  if (!article || article.type !== "case") {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(slug, 3, audience)

  return <CaseStudyArticleClient article={article} related={relatedArticles} />
}
