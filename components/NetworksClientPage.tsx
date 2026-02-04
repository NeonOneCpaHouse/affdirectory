"use client"

import { useState } from "react"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import NetworkCard from "@/components/NetworkCard"
import { formatLabels, type Network, type FormatKey } from "@/mock/networks"
import { useLanguage } from "@/context/LanguageContext"

const formatOptions: (FormatKey | "all")[] = [
  "all",
  "webPush",
  "popunder",
  "inPagePush",
  "banner",
  "telegram",
  "display",
  "native",
  "mobile",
  "video",
  "domainRedirect",
  "interstitial",
]
const paymentOptions = ["all", "Net-7", "Net-15", "Net-30", "On Request"] as const

export default function NetworksClientPage({ networks }: { networks: Network[] }) {
  const { t, language } = useLanguage()
  const [formatFilter, setFormatFilter] = useState<string>("all")
  const [paymentFilter, setPaymentFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")

  const filtered = networks
    .filter((n) => {
      if (formatFilter !== "all" && !n.formatsSupported.includes(formatFilter as any)) return false
      if (paymentFilter !== "all" && n.payoutFrequency !== paymentFilter) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "minPayout") return a.minPayout - b.minPayout
      return 0
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.networks") }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t("nav.networks")} {t("common.directory")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {t("network.compareNetworks").replace("{count}", String(networks.length))}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="all">{t("common.allFormatsFilter")}</option>
              {formatOptions.slice(1).map((f) => (
                <option key={f} value={f}>
                  {formatLabels[f as FormatKey][language]}
                </option>
              ))}
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="all">{t("common.allPaymentTerms")}</option>
              {paymentOptions.slice(1).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-800 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <option value="name">{t("common.sortByName")}</option>
              <option value="minPayout">{t("common.sortByMinPayout")}</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((network, index) => (
              <>
                <NetworkCard key={network.slug} network={network} />
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
