"use client"

import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import CaseStudyArticleClient from "@/components/CaseStudyArticleClient"



export default async function CaseStudyDetailPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug)

  if (!article || article.type !== "case") notFound()

  const related = await getRelatedArticles(slug, 3, audience)

  return <CaseStudyArticleClient article={article} related={related} />
}
