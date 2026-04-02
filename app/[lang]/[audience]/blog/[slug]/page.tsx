import type { Metadata } from "next"
import NewsArticleClient from "@/components/NewsArticleClient"
import CaseStudyArticleClient from "@/components/CaseStudyArticleClient"
import GuideArticleClient from "@/components/GuideArticleClient"
import { createArticleViewToken, getArticleViewCount } from "@/lib/articleViews"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import { notFound } from "next/navigation"
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

  if (!article) {
    return {}
  }

  return buildSeoMetadata({
    lang,
    audience,
    pathname: `/blog/${slug}`,
    title: `${article.title[lang] || article.title.en} | AffTraff`,
    description:
      article.excerpt[lang] ||
      article.excerpt.en ||
      toPlainTextExcerpt(article.body[lang] || article.body.en) ||
      (lang === "ru" ? "Материал AffTraff." : "An AffTraff article."),
    openGraphType: "article",
  })
}

export default async function BlogArticlePage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug, audience)

  if (!article) notFound()

  const related = await getRelatedArticles(slug, 3, audience)
  const initialViewCount = (await getArticleViewCount(article._id)) ?? article.views
  const viewToken = createArticleViewToken(article._id, article.views)

  // Route to the appropriate client component based on category
  if (article.category === "case-studies") {
    return <CaseStudyArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
  }

  if (article.category === "guides") {
    return <GuideArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
  }

  // Default: news, reviews, trends
  return <NewsArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
}
