"use client"

import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import TagPills from "@/components/TagPills"
import type { Article } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"
import { PortableText } from "@portabletext/react"
import { urlForImage } from "@/lib/sanity"

export default function GuideArticleClient({ article, related }: { article: Article; related: Article[] }) {
  const { language, t } = useLanguage()

  const title = article.title[language] || article.title["en"]
  const body = article.body?.[language] || article.body?.["en"] || []
  const checklist = article.checklist ? article.checklist[language] || article.checklist["en"] : null

  console.log("[v0] GuideArticleClient - body type:", typeof body, "isArray:", Array.isArray(body))

  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        const imageUrl = urlForImage(value)?.url()
        return (
          <div className="my-8 rounded-2xl overflow-hidden border border-accent-100 dark:border-gray-800 shadow-sm">
            {value.link ? (
              <a href={value.link} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl || "/placeholder.svg"} alt={value.alt || ""} className="w-full h-auto" />
              </a>
            ) : (
              <img src={imageUrl || "/placeholder.svg"} alt={value.alt || ""} className="w-full h-auto" />
            )}
            {value.caption && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2 px-4 bg-gray-50 dark:bg-gray-800/50">
                {value.caption}
              </p>
            )}
          </div>
        )
      },
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">{children}</h4>
      ),
      normal: ({ children }: any) => (
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-accent-500 pl-4 italic text-gray-600 dark:text-gray-300 my-6">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 my-4 ml-4">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside text-gray-600 dark:text-gray-300 space-y-2 my-4 ml-4">{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="bg-gray-100 dark:bg-gray-800 text-accent-600 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
      underline: ({ children }: any) => <span className="underline">{children}</span>,
      "strike-through": ({ children }: any) => <span className="line-through">{children}</span>,
      link: ({ children, value }: any) => {
        const target = value?.blank ? "_blank" : undefined
        const rel = value?.blank ? "noopener noreferrer" : undefined
        return (
          <a href={value?.href} target={target} rel={rel} className="text-accent-600 hover:underline">
            {children}
          </a>
        )
      },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.blog"), href: `/${language}/affiliate/blog` }, { label: title }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <article>
            <div className="flex items-center gap-4 mb-4">
              <TagPills tags={[article.category]} variant="category" />
              {article.readingTime && <span className="text-sm text-gray-500">{article.readingTime} min read</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{title}</h1>

            {/* Tags below title */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  >
                    {tag.name[language] || tag.name.en}
                  </span>
                ))}
              </div>
            )}

            <div className="prose dark:prose-invert max-w-none">
              {Array.isArray(body) && body.length > 0 ? (
                <PortableText value={body} components={portableTextComponents} />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No content available</p>
              )}
            </div>

            {checklist && checklist.length > 0 && (
              <div className="mt-10 p-8 bg-accent-50 dark:bg-accent-500/10 rounded-2xl border border-accent-100 dark:border-accent-500/20 shadow-sm relative overflow-hidden group">
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
            <div className="bg-accent-600 rounded-xl p-6 text-white shadow-lg shadow-accent-200 dark:shadow-none">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-accent-50 text-sm mb-4 opacity-90">
                Get a free consultation on optimizing your ad stack from our experts.
              </p>
              <button className="w-full bg-white text-accent-600 font-bold py-3 rounded-lg text-sm hover:bg-accent-50 transition-colors shadow-sm">
                Book Free Call
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
