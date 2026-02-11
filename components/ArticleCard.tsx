"use client"

import Link from "next/link"
import type { Article } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { Eye, Clock, ArrowUpRight, BookOpen } from "lucide-react"

const categoryLabels: Record<string, Record<string, string>> = {
  en: {
    news: "News", "case-studies": "Case Studies", google: "Google",
    monetization: "Monetization", seo: "SEO", tools: "Tools", ai: "AI",
    "monetization-formats": "Monetization Formats", optimization: "Optimization",
    technical: "Technical", scaling: "Scaling",
  },
  ru: {
    news: "Новости", "case-studies": "Кейсы", google: "Google",
    monetization: "Монетизация", seo: "SEO", tools: "Инструменты", ai: "AI",
    "monetization-formats": "Форматы Монетизации", optimization: "Оптимизация",
    technical: "Техническое", scaling: "Масштабирование",
  },
}

const categoryColors: Record<string, string> = {
  news: "from-sky-500 to-blue-600",
  "case-studies": "from-indigo-500 to-violet-600",
  google: "from-red-500 to-rose-600",
  monetization: "from-purple-500 to-fuchsia-600",
  seo: "from-green-500 to-emerald-600",
  tools: "from-amber-500 to-orange-600",
  ai: "from-pink-500 to-rose-600",
  "monetization-formats": "from-violet-500 to-purple-600",
  optimization: "from-teal-500 to-cyan-600",
  technical: "from-blue-500 to-indigo-600",
  scaling: "from-emerald-500 to-green-600",
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
    if (article.type === "blog") return `${prefix}/blog/${article.slug}`
    if (article.type === "case") return `${prefix}/blog/case-studies/${article.slug}`
    if (article.type === "guide") return `${prefix}/guides/${article.slug}`
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
