"use client"

import Link from "next/link"
import type { Article } from "@/mock/articles"
import TagPills from "./TagPills"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

export default function ArticleCard({ article }: { article: Article }) {
  const { language } = useLanguage()
  const { audience } = useAudience()

  const title = article.title[language] || article.title["en"]
  const excerpt = article.excerpt[language] || article.excerpt["en"]
  const thumbnail = article.thumbnail?.[language] || article.thumbnail?.["en"]

  const getArticlePath = () => {
    const prefix = `/${language}/${audience}`
    if (article.type === "blog") {
      return `${prefix}/blog/${article.slug}`
    } else if (article.type === "case") {
      return `${prefix}/blog/case-studies/${article.slug}`
    } else if (article.type === "guide") {
      return `${prefix}/guides/${article.slug}`
    }
    return `${prefix}/blog/${article.slug}` // Default fallback
  }

  return (
    <Link
      href={getArticlePath()}
      className="group flex flex-col bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden hover:border-accent-500 dark:hover:border-accent-500/50 transition-all shadow-sm"
    >
      {thumbnail && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
          <TagPills tags={[article.category]} variant="category" size="sm" />
          <span>
            {new Date(article.date).toLocaleDateString(language === "ru" ? "ru-RU" : "en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-auto">{excerpt}</p>
      </div>
    </Link>
  )
}
