"use client"

import { useState } from "react"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import type { Article } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"

const categories = ["all", "google", "ads", "industry"] as const

export default function NewsClientPage({ articles }: { articles: Article[] }) {
  const { t } = useLanguage()
  const [category, setCategory] = useState<string>("all")
  const filtered = category === "all" ? articles : articles.filter((a) => a.category === category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.news") }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("nav.news")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Latest updates from the world of ad tech and publishing.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat ? "bg-sky-600 dark:bg-blue-600 text-white shadow-sm" : "bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-sky-50 dark:hover:bg-gray-700/50"}`}
              >
                {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((article, index) => (
              <>
                <ArticleCard key={article.slug} article={article} />
                {index === 2 && (
                  <div className="md:col-span-2 xl:col-span-3 my-4">
                    <AdSlot slotKey="inline" />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <aside className="w-full lg:w-[300px]">
          <div className="sticky top-8">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
