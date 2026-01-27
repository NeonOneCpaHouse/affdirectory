"use client"

import { formatLabels } from "@/mock/networks"
import { useLanguage } from "@/context/LanguageContext"

interface TagPillsProps {
  tags: string[]
  variant?: "format" | "category" | "default"
  size?: "sm" | "md"
}

const formatColors: Record<string, string> = {
  webPush: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  popunder: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  inPagePush: "bg-green-500/20 text-green-400 border-green-500/30",
  banner: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

const categoryLabels: Record<string, Record<string, string>> = {
  en: {
    // Blog categories
    news: "News",
    "case-studies": "Case Studies",
    google: "Google",
    ads: "Ads",
    monetization: "Monetization",
    seo: "SEO",
    tools: "Tools",
    ai: "AI",
    // Guide categories
    "monetization-formats": "Monetization Formats",
    optimization: "Optimization",
    technical: "Technical",
    scaling: "Scaling",
    // Legacy categories
    industry: "Industry",
    reddit: "Reddit",
  },
  ru: {
    // Blog categories
    news: "Новости",
    "case-studies": "Кейсы",
    google: "Google",
    ads: "Реклама",
    monetization: "Монетизация",
    seo: "SEO",
    tools: "Инструменты",
    ai: "AI",
    // Guide categories
    "monetization-formats": "Форматы Монетизации",
    optimization: "Оптимизация",
    technical: "Техническое",
    scaling: "Масштабирование",
    // Legacy categories
    industry: "Индустрия",
    reddit: "Reddit",
  },
}

const categoryColors: Record<string, string> = {
  // Blog categories
  news: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  "case-studies": "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  google: "bg-red-500/20 text-red-400 border-red-500/30",
  ads: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  monetization: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  seo: "bg-green-500/20 text-green-400 border-green-500/30",
  tools: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  ai: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  // Guide categories
  "monetization-formats": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  optimization: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  technical: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  scaling: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  // Legacy categories
  industry: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  reddit: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

export default function TagPills({ tags, variant = "default", size = "md" }: TagPillsProps) {
  const { language } = useLanguage()
  const sizeClass = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        let colorClass = "bg-gray-700/50 text-gray-300 border-gray-600"
        let label = tag

        if (variant === "format") {
          colorClass = formatColors[tag] || colorClass
          label = formatLabels[tag] ? formatLabels[tag][language] : tag
        } else if (variant === "category") {
          colorClass = categoryColors[tag] || colorClass
          label = categoryLabels[language][tag] || tag.charAt(0).toUpperCase() + tag.slice(1)
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
