"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import ArticleCard from "@/components/ArticleCard"
import NetworkTableWrapper from "@/components/NetworkTableWrapper"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import type { Article } from "@/mock/articles"

export default function HomePageClient({
  news,
  guides,
  cases,
}: {
  news: Article[]
  guides: Article[]
  cases: Article[]
}) {
  const { t, language } = useLanguage()
  const { audience } = useAudience()

  const getPath = (path: string) => `/${language}/${audience}${path}`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.industryUpdates")}</h2>
              <Link
                href={getPath("/blog")}
                className="text-sky-600 dark:text-blue-400 hover:text-sky-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {news.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.topNetworks")}</h2>
              <Link
                href={getPath("/rankings")}
                className="text-sky-600 dark:text-blue-400 hover:text-sky-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                {t("common.viewRankings")} →
              </Link>
            </div>
            <NetworkTableWrapper />
          </section>

          <div className="mb-12">
            <AdSlot slotKey="inline" />
          </div>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.trendingGuides")}</h2>
              <Link
                href={getPath("/guides")}
                className="text-sky-600 dark:text-blue-400 hover:text-sky-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guides.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.caseStudies")}</h2>
              <Link
                href={getPath("/blog?cat=case-studies")}
                className="text-sky-600 dark:text-blue-400 hover:text-sky-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {cases.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-[300px]">
          <div className="sticky top-8 space-y-6">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
