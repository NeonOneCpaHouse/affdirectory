"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import type { RankingCategory } from "@/mock/rankings"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

export default function RankingsClientPage({ categories }: { categories: RankingCategory[] }) {
  const { t, language } = useLanguage()
  const { audience } = useAudience()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.rankings") }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("rankings.title")}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">{t("rankings.description")}</p>
          <div className="lg:hidden mb-8">
            <AdSlot slotKey="sidebar" />
          </div>

          {categories.map((category, catIdx) => {
            const catLabel = category.label[language] || category.label["en"]
            return (
              <div key={category.key} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-1 h-8 rounded-full ${catIdx === 0 ? "bg-blue-500" : catIdx === 1 ? "bg-purple-500" : "bg-emerald-500"
                    }`} />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{catLabel}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.subcategories.map((sub) => {
                    const subLabel = sub.label[language] || sub.label["en"]
                    return (
                      <Link
                        key={sub.slug}
                        href={`/${language}/${audience}/rankings/${sub.slug}`}
                        className="block bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-5 hover:border-accent-500 dark:hover:border-accent-500/50 transition-all group shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors mb-1">
                          {subLabel}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {sub.itemCount > 0
                            ? `${sub.itemCount} ${language === "ru" ? "в рейтинге" : "ranked"}`
                            : language === "ru" ? "Скоро" : "Coming soon"}
                        </p>
                      </Link>
                    )
                  })}
                </div>
                {catIdx < categories.length - 1 && (
                  <div className="mt-8">
                    <AdSlot slotKey="inline" />
                  </div>
                )}
              </div>
            )
          })}
          <div className="lg:hidden mb-8">
            <AdSlot slotKey="sidebar" />
          </div>
        </main>

        <aside className="hidden lg:block w-full lg:w-[300px]">
          <div className="sticky top-8">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
