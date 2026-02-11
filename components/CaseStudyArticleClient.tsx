"use client"

import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import type { Article } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"
import { PortableText } from "@portabletext/react"
import { urlForImage } from "@/lib/sanity"

export default function CaseStudyArticleClient({ article, related }: { article: Article; related: Article[] }) {
  const { language, t } = useLanguage()

  const title = article.title[language] || article.title["en"]
  const body = article.body?.[language] || article.body?.["en"] || []
  const sections = article.caseStudySections
    ? article.caseStudySections[language] || article.caseStudySections["en"]
    : null
  const thumbnail = article.thumbnail?.[language] || article.thumbnail?.["en"]

  console.log("[v0] CaseStudyArticleClient - body type:", typeof body, "isArray:", Array.isArray(body))

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
            <time className="text-sm text-gray-500 mb-4 block">
              {new Date(article.date).toLocaleDateString(language === "ru" ? "ru-RU" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">{title}</h1>

            {thumbnail && (
              <div className="mb-4 rounded-2xl overflow-hidden aspect-video border border-accent-100 dark:border-gray-800 shadow-lg relative bg-accent-900 group">
                <img
                  src={thumbnail || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-t from-accent-900/80 to-transparent">
                  <div className="text-center">
                    <span className="inline-block px-4 py-1 bg-accent-500/20 backdrop-blur-md rounded-full text-accent-400 text-xs font-bold uppercase tracking-wider mb-4 border border-accent-500/30">
                      {t("article.detailedCaseAnalysis")}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white max-w-2xl">{title}</h2>
                  </div>
                </div>
              </div>
            )}

            {/* Tags below cover image */}
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

            {sections && (
              <div className="space-y-12 mb-12">
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-accent-600">01.</span> {t("article.setupStrategy")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{sections.setup}</p>
                </section>
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-accent-600">02.</span> {t("article.trafficDistribution")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{sections.traffic}</p>
                </section>
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-accent-600">03.</span> {t("article.adPlacements")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{sections.placements}</p>
                </section>
                <div className="p-8 bg-accent-600/5 dark:bg-accent-600/10 rounded-2xl border border-accent-600/20">
                  <h3 className="text-2xl font-bold text-accent-600 mb-4 flex items-center gap-3">
                    <span className="text-accent-600 inline-block w-8 h-8 rounded-lg bg-accent-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      04.
                    </span>{" "}
                    {t("article.finalResults")}
                  </h3>
                  <p className="text-accent-900 dark:text-accent-100 leading-relaxed text-xl font-medium">
                    {sections.results}
                  </p>
                </div>
                <div className="lg:hidden my-8">
                  <AdSlot slotKey="sidebar" />
                </div>
                <section>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-accent-600">05.</span> {t("article.keyLessons")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{sections.lessons}</p>
                </section>
              </div>
            )}

            <div className="prose dark:prose-invert max-w-none">
              {Array.isArray(body) && body.length > 0 ? (
                <PortableText value={body} components={portableTextComponents} />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No content available</p>
              )}
            </div>
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
            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 border border-accent-100 dark:border-gray-700/50 shadow-sm overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-600/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 relative">{t("common.downloadBreakdown")}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 relative">{t("common.downloadDesc")}</p>
              <button className="w-full bg-accent-100 dark:bg-gray-700 text-accent-600 font-bold py-3 rounded-lg text-sm hover:bg-accent-200 dark:hover:bg-gray-600 transition-colors relative">
                {t("common.downloadPDF")}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
