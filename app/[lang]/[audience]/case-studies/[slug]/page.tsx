import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createArticleViewToken, getArticleViewCount } from "@/lib/articleViews"
import { getArticleBySlug, getRelatedArticles } from "@/mock/articles"
import CaseStudyArticleClient from "@/components/CaseStudyArticleClient"
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
  const { lang, slug, audience } = await params
  const article = await getArticleBySlug(slug, audience)

  if (!article || article.category !== "case-studies") notFound()

  const related = await getRelatedArticles(slug, 3, audience)
  const initialViewCount = (await getArticleViewCount(article._id)) ?? article.views
  const viewToken = createArticleViewToken(article._id, article.views)

  const typedLang = lang as SupportedLanguage
  const typedAudience = audience as SupportedAudience
  const title = article.title[typedLang] || article.title.en
  const thumbnail = article.thumbnail?.[typedLang] || article.thumbnail?.en

  const jsonLdData = [
    articleJsonLd({
      lang: typedLang,
      audience: typedAudience,
      title,
      description: article.excerpt[typedLang] || article.excerpt.en || "",
      datePublished: article.date,
      slug: article.slug,
      thumbnailUrl: thumbnail,
      section: "Case Studies",
    }),
    breadcrumbJsonLd(typedLang, typedAudience, [
      { name: typedLang === "ru" ? "Кейсы" : "Case Studies", href: "/case-studies" },
      { name: title },
    ]),
  ]

  return (
    <>
      <JsonLd data={jsonLdData} />
      <CaseStudyArticleClient article={article} related={related} initialViewCount={initialViewCount} viewToken={viewToken} />
    </>
  )
}
