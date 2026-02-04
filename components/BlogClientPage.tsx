"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import type { Article, BlogCategory } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"

const categories: { value: BlogCategory | "all"; label: string }[] = [
  { value: "all", label: "blog.allPosts" },
  { value: "news", label: "blog.news" },
  { value: "case-studies", label: "blog.caseStudies" },
  { value: "google", label: "blog.google" },
  { value: "monetization", label: "blog.monetization" },
  { value: "seo", label: "blog.seo" },
  { value: "tools", label: "blog.tools" },
  { value: "ai", label: "blog.ai" },
]

export default function BlogClientPage({ articles }: { articles: Article[] }) {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("cat")
  const [category, setCategory] = useState<BlogCategory | "all">((categoryParam as BlogCategory) || "all")

  const filtered = category === "all" ? articles : articles.filter((a) => a.category === category)

  const groupedByCategory = categories
    .filter((cat) => cat.value !== "all")
    .map((cat) => ({
      ...cat,
      articles: articles.filter((a) => a.category === cat.value),
    }))
    .filter((group) => group.articles.length > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.blog") }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("nav.blog")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Latest updates from the world of ad tech and publishing.
          </p>

          <div className="space-y-12">
            {groupedByCategory.map((group, index) => (
              <section key={group.value}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t(group.label)}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {group.articles.slice(0, 3).map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
                {index === 1 && (
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
