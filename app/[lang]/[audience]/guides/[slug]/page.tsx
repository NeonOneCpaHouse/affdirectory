import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createArticleViewToken, getArticleViewCount } from "@/lib/articleViews"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import GuideArticleClient from "@/components/GuideArticleClient"
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

  if (!article || article.category !== "guides") {
    return {}
  }

  return buildSeoMetadata({
    lang,
    audience,
    pathname: `/blog/${slug}`,
    title: `${article.title[lang] || article.title.en} | AffTraff Guides`,
    description:
      article.excerpt[lang] ||
      article.excerpt.en ||
      toPlainTextExcerpt(article.body[lang] || article.body.en) ||
      (lang === "ru" ? "Гайд AffTraff." : "An AffTraff guide."),
    openGraphType: "article",
  })
}

export default async function GuideDetailPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug, audience } = await params
  const article = await getArticleBySlug(slug, audience)

  if (!article || article.category !== "guides") notFound()

  const related = await getRelatedArticles(slug, 3, audience)
  const initialViewCount = (await getArticleViewCount(article._id)) ?? article.views
  const viewToken = createArticleViewToken(article._id, article.views)

  return <GuideArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
}
