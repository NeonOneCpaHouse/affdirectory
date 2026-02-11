"use client"

import { formatLabels } from "@/mock/networks"
import { useLanguage } from "@/context/LanguageContext"

interface TagPillsProps {
  tags: string[]
  variant?: "format" | "category" | "tag" | "default"
  size?: "sm" | "md"
  tagNames?: Record<string, { en: string; ru: string }> // For tag variant with localized names
}

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

const formatColors: Record<string, string> = {
  webPush: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  popunder: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  inPagePush: "bg-green-500/20 text-green-400 border-green-500/30",
  banner: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

const categoryColors: Record<string, string> = {
  news: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  reviews: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "case-studies": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  guides: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  trends: "bg-amber-500/20 text-amber-400 border-amber-500/30",
}

export default function TagPills({ tags, variant = "default", size = "md", tagNames }: TagPillsProps) {
  const { language } = useLanguage()
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        let colorClass = "bg-gray-700/50 text-gray-300 border-gray-600"
        let label = tag

        if (variant === "format") {
          colorClass = formatColors[tag] || colorClass
          label = (formatLabels as Record<string, Record<string, string>>)[tag] ? (formatLabels as Record<string, Record<string, string>>)[tag][language] : tag
        } else if (variant === "category") {
          colorClass = categoryColors[tag] || colorClass
          label = categoryLabels[language][tag] || tag.charAt(0).toUpperCase() + tag.slice(1)
        } else if (variant === "tag") {
          colorClass = "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
          label = tagNames?.[tag]?.[language] || tagNames?.[tag]?.en || tag
        }

        return (
          <span key={tag} className={`${sizeClass} ${colorClass} rounded-full border font-medium`}>
            {label}
          </span>
        )
      })}
    </div>
  )
}
