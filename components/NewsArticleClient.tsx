"use client"

import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import TagPills from "@/components/TagPills"
import type { Article } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"
import { PortableText } from "@portabletext/react"
import { urlForImage } from "@/lib/sanity"

export default function NewsArticleClient({ article, related }: { article: Article; related: Article[] }) {
  const { language, t } = useLanguage()

  const title = article.title[language] || article.title["en"]
  const body = article.body?.[language] || article.body?.["en"] || []
  const thumbnail = article.thumbnail?.[language] || article.thumbnail?.["en"]

  console.log("[v0] NewsArticleClient - body type:", typeof body, "isArray:", Array.isArray(body))

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
      <Breadcrumbs items={[{ label: t("nav.news"), href: "/news" }, { label: title }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <article>
            <div className="flex items-center gap-4 mb-4">
              <TagPills tags={[article.category]} variant="category" />
              <time className="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString(language === "ru" ? "ru-RU" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">{title}</h1>
            {thumbnail && (
              <div className="mb-8 rounded-2xl overflow-hidden border border-accent-100 dark:border-gray-800 shadow-sm">
                <img
                  src={thumbnail || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-auto object-cover max-h-[500px]"
                />
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

        <aside className="w-full lg:w-[300px]">
          <div className="sticky top-8 space-y-6">
            <AdSlot slotKey="sidebar" />
            <div className="bg-accent-50 dark:bg-gray-800/50 rounded-xl p-6 border border-accent-100 dark:border-gray-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{t("common.newsletter")}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t("common.newsletterDesc")}</p>
              <input
                type="email"
                placeholder={t("common.emailAddress")}
                className="w-full bg-white dark:bg-gray-800 border border-accent-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm mb-3"
              />
              <button className="w-full bg-accent-600 text-white font-medium py-2 rounded-lg text-sm hover:bg-accent-700 transition-colors">
                {t("common.subscribe")}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
