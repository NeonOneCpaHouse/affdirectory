import type { Metadata } from "next"
import NewsArticleClient from "@/components/NewsArticleClient"
import CaseStudyArticleClient from "@/components/CaseStudyArticleClient"
import GuideArticleClient from "@/components/GuideArticleClient"
import { createArticleViewToken, getArticleViewCount } from "@/lib/articleViews"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import { notFound } from "next/navigation"
import { buildSeoMetadata, isSupportedAudience, isSupportedLanguage, toPlainTextExcerpt, type SupportedLanguage, type SupportedAudience } from "@/lib/seo"
import { articleJsonLd, breadcrumbJsonLd, JsonLd } from "@/lib/structuredData"

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
  const { lang, slug, audience } = await params
  const article = await getArticleBySlug(slug, audience)

  if (!article) notFound()

  const related = await getRelatedArticles(slug, 3, audience)
  const initialViewCount = (await getArticleViewCount(article._id)) ?? article.views
  const viewToken = createArticleViewToken(article._id, article.views)

  const typedLang = lang as SupportedLanguage
  const typedAudience = audience as SupportedAudience
  const title = article.title[typedLang] || article.title.en
  const thumbnail = article.thumbnail?.[typedLang] || article.thumbnail?.en

  const categoryLabels: Record<string, string> = {
    news: "News", reviews: "Reviews", "case-studies": "Case Studies", guides: "Guides", trends: "Trends",
  }

  const jsonLdData = [
    articleJsonLd({
      lang: typedLang,
      audience: typedAudience,
      title,
      description: article.excerpt[typedLang] || article.excerpt.en || "",
      datePublished: article.date,
      slug: article.slug,
      thumbnailUrl: thumbnail,
      section: categoryLabels[article.category] || article.category,
    }),
    breadcrumbJsonLd(typedLang, typedAudience, [
      { name: typedLang === "ru" ? "Блог" : "Blog", href: "/blog" },
      { name: title },
    ]),
  ]

  // Route to the appropriate client component based on category
  if (article.category === "case-studies") {
    return (
      <>
        <JsonLd data={jsonLdData} />
        <CaseStudyArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
      </>
    )
  }

  if (article.category === "guides") {
    return (
      <>
        <JsonLd data={jsonLdData} />
        <GuideArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
      </>
    )
  }

  // Default: news, reviews, trends
  return (
    <>
      <JsonLd data={jsonLdData} />
      <NewsArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
    </>
  )
}
