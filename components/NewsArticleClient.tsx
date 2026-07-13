"use client"

import Link from "next/link"

import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import ArticleShareBar from "@/components/ArticleShareBar"
import ArticleViewCounter from "@/components/ArticleViewCounter"
import { articlePortableTextComponents } from "@/components/ArticlePortableText"
import TagPills from "@/components/TagPills"
import type { Article } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { getTagVariants } from "@/lib/utils"
import { PortableText } from "@portabletext/react"
import { Hourglass } from "lucide-react"

interface NewsArticleClientProps {
  article: Article
  related: Article[]
  initialViewCount: number
  viewToken: string | null
}

export default function NewsArticleClient({
  article,
  related,
  initialViewCount,
  viewToken,
}: NewsArticleClientProps) {
  const { language, t } = useLanguage()
  const { audience } = useAudience()

  const title = article.title[language] || article.title["en"]
  const body = article.body?.[language] || article.body?.["en"] || []
  const thumbnail = article.thumbnail?.[language] || article.thumbnail?.["en"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.blog"), href: `/${language}/${article.category ? "affiliate" : "affiliate"}/blog` }, { label: title }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-8 md:p-12 shadow-sm">
            <div className="mb-6 space-y-3">
              <TagPills tags={[article.category]} variant="category" />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 font-medium">
                <time>
                  {new Date(article.date).toLocaleDateString(language === "ru" ? "ru-RU" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {article.readingTime && (
                  <>
                    <span className="text-gray-300 dark:text-gray-600">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Hourglass className="h-4 w-4" />
                      {article.readingTime} {t("article.readingTimeUnit")}
                    </span>
                  </>
                )}
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <ArticleViewCounter key={article._id} articleId={article._id} initialCount={initialViewCount} token={viewToken} />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">{title}</h1>

            {thumbnail && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                <img
                  src={thumbnail || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-auto object-cover max-h-[600px]"
                />
              </div>
            )}

            {/* Tags below cover image */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {article.tags.map((tag) => {
                  const variants = getTagVariants(tag.name.en)
                  return (
                    <Link
                      key={tag.slug}
                      href={`/${language}/${audience}/blog?tag=${tag.slug}`}
                      className={`px-3 py-1 text-xs font-medium rounded-full border transition-all hover:scale-105 ${variants.faint}`}
                    >
                      {tag.name[language] || tag.name.en}
                    </Link>
                  )
                })}
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-accent-600 hover:prose-a:text-accent-700">
              {Array.isArray(body) && body.length > 0 ? (
                <PortableText value={body} components={articlePortableTextComponents} />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No content available</p>
              )}
            </div>

            <ArticleShareBar title={title} />
          </article>


          <div className="my-12">
            <AdSlot slotKey="inline" />
          </div>

          {related.length > 0 && (
            <section className="mt-12 pt-12 border-t border-accent-100 dark:border-gray-800">
              <div className="lg:hidden mb-12">
                <AdSlot slotKey="sidebar" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("article.related")}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="hidden lg:block w-full lg:w-[300px]">
          <div className="sticky top-8 space-y-6">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
