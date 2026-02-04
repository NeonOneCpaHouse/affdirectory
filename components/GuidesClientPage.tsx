"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import type { Article, GuideCategory } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"

const categories: { value: GuideCategory | "all"; label: string }[] = [
  { value: "all", label: "guides.allGuides" },
  { value: "monetization-formats", label: "guides.monetizationFormats" },
  { value: "optimization", label: "guides.optimization" },
  { value: "technical", label: "guides.technical" },
  { value: "scaling", label: "guides.scaling" },
]

export default function GuidesClientPage({ guides }: { guides: Article[] }) {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("cat")
  const [category, setCategory] = useState<GuideCategory | "all">((categoryParam as GuideCategory) || "all")

  const filtered = category === "all" ? guides : guides.filter((a) => a.category === category)

  const groupedByCategory = categories
    .filter((cat) => cat.value !== "all")
    .map((cat) => ({
      ...cat,
      articles: guides.filter((a) => a.category === cat.value),
    }))
    .filter((group) => group.articles.length > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.guides") }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("nav.guides")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            In-depth tutorials on monetization, optimization, and scaling.
          </p>

          <div className="space-y-12">
            {groupedByCategory.map((group, index) => (
              <section key={group.value}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t(group.label)}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.articles.slice(0, 3).map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
                {index === 0 && (
                  <div className="mt-12 lg:hidden">
                    <AdSlot slotKey="sidebar" />
                  </div>
                )}
                {index === 0 && (
                  <div className="mt-12">
                    <AdSlot slotKey="inline" />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
        <aside className="hidden lg:block w-full lg:w-[300px]">
          <div className="sticky top-8">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
