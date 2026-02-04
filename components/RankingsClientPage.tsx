"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import type { FormatRanking } from "@/mock/rankings"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

export default function RankingsClientPage({ rankings }: { rankings: FormatRanking[] }) {
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
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {rankings.map((ranking) => {
              const label = ranking.label[language] || ranking.label["en"]
              return (
                <Link
                  key={ranking.slug}
                  href={`/${language}/${audience}/rankings/${ranking.slug}`}
                  className="block bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-6 hover:border-accent-500 dark:hover:border-accent-500/50 transition-all group shadow-sm"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors mb-2">
                    {t("rankings.bestNetworks").replace("{format}", label)}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {t("rankings.networksRanked").replace("{count}", ranking.networks.length.toString())}
                  </p>
                  <div className="space-y-2">
                    {ranking.networks.slice(0, 3).map((item) => (
                      <div key={item.network.slug} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          #{item.rank} {item.network.name}
                        </span>
                        <span className="text-yellow-600 dark:text-yellow-400">{item.score.toFixed(1)} ★</span>
                      </div>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mb-12">
            <AdSlot slotKey="inline" />
          </div>
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
