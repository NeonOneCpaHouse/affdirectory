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

interface GuideArticleClientProps {
  article: Article
  related: Article[]
  initialViewCount: number
  viewToken: string | null
}

export default function GuideArticleClient({
  article,
  related,
  initialViewCount,
  viewToken,
}: GuideArticleClientProps) {
  const { language, t } = useLanguage()
  const { audience } = useAudience()

  const title = article.title[language] || article.title["en"]
  const body = article.body?.[language] || article.body?.["en"] || []
  const checklist = article.checklist ? article.checklist[language] || article.checklist["en"] : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.blog"), href: `/${language}/affiliate/blog` }, { label: title }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <article className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <TagPills tags={[article.category]} variant="category" />
              {article.readingTime && (
                <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                  <Hourglass className="h-4 w-4" />
                  <span>
                    {article.readingTime} {t("article.readingTimeUnit")}
                  </span>
                </span>
              )}
              <ArticleViewCounter key={article._id} articleId={article._id} initialCount={initialViewCount} token={viewToken} />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">{title}</h1>

            {/* Thumbnail - added missing check */}
            {article.thumbnail && (article.thumbnail[language] || article.thumbnail["en"]) && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
                <img
                  src={article.thumbnail[language] || article.thumbnail["en"] || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-auto object-cover max-h-[600px]"
                />
              </div>
            )}

            {/* Tags below title/image */}
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

            {checklist && checklist.length > 0 && (
              <div className="mt-12 p-8 bg-accent-50 dark:bg-accent-500/10 rounded-2xl border border-accent-100 dark:border-accent-500/20 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-24 h-24 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-accent-600 text-white flex items-center justify-center text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Implementation Checklist
                </h3>
                <div className="lg:hidden mb-12">
                  <AdSlot slotKey="sidebar" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {checklist.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800/50 rounded-xl border border-accent-100 dark:border-gray-700/50 hover:border-accent-300 dark:hover:border-accent-500/50 transition-all hover:shadow-md"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-accent-200 dark:border-gray-700 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ArticleShareBar title={title} />
          </article>


          <div className="my-12">
            <AdSlot slotKey="inline" />
          </div>

          {related.length > 0 && (
            <section className="mt-12 pt-12 border-t border-accent-100 dark:border-gray-800">
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
