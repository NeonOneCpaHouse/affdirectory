"use client"

import Link from "next/link"
import type { Article } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { Eye, Clock, ArrowUpRight, BookOpen } from "lucide-react"

const categoryLabels: Record<string, Record<string, string>> = {
  en: {
    news: "News",
    reviews: "Reviews",
    "case-studies": "Case Studies",
    guides: "Guides",
    trends: "Trends",
  },
  ru: {
    news: "Новости",
    reviews: "Обзоры",
    "case-studies": "Кейсы",
    guides: "Гайды",
    trends: "Тренды",
  },
}

const categoryColors: Record<string, string> = {
  news: "from-sky-500 to-blue-600",
  reviews: "from-purple-500 to-fuchsia-600",
  "case-studies": "from-indigo-500 to-violet-600",
  guides: "from-emerald-500 to-green-600",
  trends: "from-amber-500 to-orange-600",
}

export default function ArticleCard({ article }: { article: Article }) {
  const { language } = useLanguage()
  const { audience } = useAudience()

  const title = article.title[language] || article.title["en"]
  const thumbnail = article.thumbnail?.[language] || article.thumbnail?.["en"]
  const catLabel = categoryLabels[language]?.[article.category] || article.category
  const catGradient = categoryColors[article.category] || "from-gray-500 to-gray-600"

  const getArticlePath = () => {
    const prefix = `/${language}/${audience}`
    return `${prefix}/blog/${article.slug}`
  }

  const formattedDate = new Date(article.date).toLocaleDateString(
    language === "ru" ? "ru-RU" : "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  )

  return (
    <Link
      href={getArticlePath()}
      className="group relative flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-accent-500/5 transition-all duration-300 h-full"
    >
      {/* Image Section */}
      <div className="relative aspect-[2/1] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600" />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge - floating on image */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${catGradient} text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-lg`}>
            {catLabel}
          </span>
        </div>

        {/* Arrow indicator on hover */}
        <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="w-5 h-5 text-accent-600" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.slug}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
              >
                {tag.name[language] || tag.name.en}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-5">
          <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">{formattedDate}</span>
            </div>
            {article.readingTime && (
              <>
                <span className="text-gray-200 dark:text-gray-700">•</span>
                <span className="font-medium">{article.readingTime} min</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-medium">{article.views || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
