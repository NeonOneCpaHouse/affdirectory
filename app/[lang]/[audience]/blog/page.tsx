import type { Metadata } from "next"
import { Suspense } from "react"
import { buildArticleTagIndex, getBlogArticles } from "@/mock/articles"
import BlogClientPage from "@/components/BlogClientPage"
import { buildSeoMetadata, getHubSeoEntry, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; audience: string }>
}): Promise<Metadata> {
  const { lang, audience } = await params

  if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
    return {}
  }

  const seo = getHubSeoEntry("blog", audience, lang)
  return buildSeoMetadata({ lang, audience, pathname: "/blog", title: seo.title, description: seo.description })
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const articles = await getBlogArticles(audience)
  const tagIndex = buildArticleTagIndex(articles)

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>}>
      <BlogClientPage articles={articles} tagIndex={tagIndex} />
    </Suspense>
  )
}
