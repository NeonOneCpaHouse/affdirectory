"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import ArticleCard from "@/components/ArticleCard"
import type { Article, ArticleCategory, ArticleTag } from "@/mock/articles"
import { useLanguage } from "@/context/LanguageContext"

const categories: { value: ArticleCategory | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "blog.allPosts" },
  { value: "news", labelKey: "blog.news" },
  { value: "reviews", labelKey: "blog.reviews" },
  { value: "case-studies", labelKey: "blog.caseStudies" },
  { value: "guides", labelKey: "blog.guides" },
  { value: "trends", labelKey: "blog.trends" },
]

interface BlogClientPageProps {
  articles: Article[]
  tagsByCategory: Record<ArticleCategory, ArticleTag[]>
}

export default function BlogClientPage({ articles, tagsByCategory }: BlogClientPageProps) {
  const { t, language } = useLanguage()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("cat")
  const tagParam = searchParams.get("tag")

  const [activeCategory, setActiveCategory] = useState<ArticleCategory | "all">(
    (categoryParam as ArticleCategory) || "all"
  )
  const [activeTag, setActiveTag] = useState<string | null>(tagParam || null)

  // Filter articles by category
  const filteredByCategory =
    activeCategory === "all" ? articles : articles.filter((a) => a.category === activeCategory)

  // Filter by tag if one is selected
  const filtered = activeTag
    ? filteredByCategory.filter((a) => a.tags?.some((t) => t.slug === activeTag))
    : filteredByCategory

  // Get tags for the active category
  const activeTags: ArticleTag[] =
    activeCategory === "all"
      ? Object.values(tagsByCategory).flat()
      : tagsByCategory[activeCategory] || []

  const handleCategoryChange = (cat: ArticleCategory | "all") => {
    setActiveCategory(cat)
    setActiveTag(null) // Reset tag when switching category
  }

  const handleTagClick = (tagSlug: string) => {
    setActiveTag(activeTag === tagSlug ? null : tagSlug)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.blog") }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t("nav.blog")}</h1>

          {/* Category Navbar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-6 border-b border-gray-200 dark:border-gray-700/50">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`
                  whitespace-nowrap px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all
                  ${activeCategory === cat.value
                    ? "text-accent-600 dark:text-accent-400 border-b-2 border-accent-600 dark:border-accent-400 bg-accent-50/50 dark:bg-accent-900/20"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }
                `}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Tag Cloud */}
          {activeTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {activeTags.map((tag) => (
                <button
                  key={tag.slug}
                  onClick={() => handleTagClick(tag.slug)}
                  className={`
                    px-3 py-1.5 text-xs font-medium rounded-full border transition-all
                    ${activeTag === tag.slug
                      ? "bg-accent-600 text-white border-accent-600 shadow-sm"
                      : "bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-accent-400 hover:text-accent-600 dark:hover:text-accent-400"
                    }
                  `}
                >
                  {tag.name[language] || tag.name.en}
                </button>
              ))}
            </div>
          )}

          {/* Articles Grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filtered.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {language === "ru" ? "Статей пока нет" : "No articles yet"}
              </p>
            </div>
          )}

          <div className="mt-12">
            <AdSlot slotKey="inline" />
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
