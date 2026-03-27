import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import CaseStudyArticleClient from "@/components/CaseStudyArticleClient"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage, toPlainTextExcerpt } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; audience: string; slug: string }>
}): Promise<Metadata> {
  const { lang, audience, slug } = await params

  if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
    return {}
  }

  const article = await getArticleBySlug(slug, audience)

  if (!article || article.category !== "case-studies") {
    return {}
  }

  return buildSeoMetadata({
    lang,
    audience,
    pathname: `/blog/${slug}`,
    title: `${article.title[lang] || article.title.en} | AffTraff Case Studies`,
    description:
      article.excerpt[lang] ||
      article.excerpt.en ||
      toPlainTextExcerpt(article.body[lang] || article.body.en) ||
      (lang === "ru" ? "Кейс AffTraff." : "An AffTraff case study."),
    openGraphType: "article",
  })
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug, audience)

  if (!article || article.category !== "case-studies") notFound()

  const related = await getRelatedArticles(slug, 3, audience)

  return <CaseStudyArticleClient article={article} related={related} />
}
