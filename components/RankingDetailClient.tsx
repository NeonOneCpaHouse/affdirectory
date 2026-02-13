"use client"

import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import NetworkTable from "@/components/NetworkTable"
import CpaNetworkTable from "@/components/CpaNetworkTable"
import ServiceTable from "@/components/ServiceTable"
import type { ResolvedRanking } from "@/mock/rankings"
import type { Localized } from "@/types"
import { useLanguage } from "@/context/LanguageContext"

export default function RankingDetailClient({
  ranking,
  methodology,
}: {
  ranking: ResolvedRanking
  methodology: Localized<string>
}) {
  const { language, t } = useLanguage()

  const label = ranking.label[language] || ranking.label["en"]
  const methodologyText = methodology[language] || methodology["en"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.rankings"), href: "/rankings" }, { label: label }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {language === "ru" ? `Лучшие ${label}` : `Best ${label}`}
          </h1>
          <div className="bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 rounded-xl p-4 mb-8">
            <h2 className="text-accent-700 font-semibold mb-2">
              {language === "ru" ? "Методология" : "Methodology"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{methodologyText}</p>
          </div>

          <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden mb-8 shadow-sm">
            {ranking.entityType === "adNetwork" && ranking.adNetworks && (
              <NetworkTable networks={ranking.adNetworks} />
            )}
            {ranking.entityType === "cpaNetwork" && ranking.cpaNetworks && (
              <CpaNetworkTable networks={ranking.cpaNetworks} />
            )}
            {ranking.entityType === "service" && ranking.services && (
              <ServiceTable services={ranking.services} />
            )}
          </div>

          <div className="lg:hidden mb-8">
            <AdSlot slotKey="sidebar" />
          </div>

          <div className="">
            <AdSlot slotKey="inline" />
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
