"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import NetworkTable from "@/components/NetworkTable"
import type { FormatRanking } from "@/mock/rankings"
import type { Localized } from "@/types"
import { useLanguage } from "@/context/LanguageContext"

export default function RankingDetailClient({
  ranking,
  methodology,
}: {
  ranking: FormatRanking
  methodology: Localized<string>
}) {
  const { language, t } = useLanguage()

  const label = ranking.label[language] || ranking.label["en"]
  const methodologyText = methodology[language] || methodology["en"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.rankings"), href: "/rankings" }, { label: label }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Best {label} Networks</h1>
          <div className="bg-sky-50 dark:bg-blue-500/10 border border-sky-200 dark:border-blue-500/20 rounded-xl p-4 mb-8">
            <h2 className="text-sky-700 dark:text-blue-400 font-semibold mb-2">Methodology</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{methodologyText}</p>
          </div>
          <div className="bg-white dark:bg-gray-800/30 border border-sky-200 dark:border-gray-700/50 rounded-xl overflow-hidden mb-8 shadow-sm">
            <NetworkTable networks={ranking.networks} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Best For...</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {ranking.bestFor.map((pick) => {
              const pickTitle = pick.title[language] || pick.title["en"]
              const pickReason = pick.reason[language] || pick.reason["en"]
              return (
                <Link
                  key={pickTitle}
                  href={`/networks/${pick.network.slug}`}
                  className="block bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-5 hover:border-sky-400 dark:hover:border-blue-500/50 transition-all shadow-sm"
                >
                  <p className="text-sm text-sky-600 dark:text-blue-400 mb-1">{pickTitle}</p>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{pick.network.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{pickReason}</p>
                </Link>
              )
            })}
          </div>
          <div className="">
            <AdSlot slotKey="inline" />
          </div>
        </main>

        <aside className="w-full lg:w-[300px]">
          <div className="sticky top-8">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
