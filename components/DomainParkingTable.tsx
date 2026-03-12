"use client"

import Link from "next/link"
import RatingStars from "./RatingStars"
import type { RankedDomainParking } from "@/mock/rankings"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

interface DomainParkingTableProps {
  entries: RankedDomainParking[]
  showRank?: boolean
  maxRows?: number
}

export default function DomainParkingTable({
  entries,
  showRank = true,
  maxRows,
}: DomainParkingTableProps) {
  const { language, t } = useLanguage()
  const { audience } = useAudience()
  const rows = maxRows ? entries.slice(0, maxRows) : entries

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-accent-200 dark:border-gray-700">
            {showRank && (
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                #
              </th>
            )}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {language === "ru" ? "Сервис" : "Service"}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {language === "ru" ? "Рейтинг" : "Rating"}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {language === "ru" ? "Мин. вывод" : "Min. Withdraw"}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {language === "ru" ? "Частота выплат" : "Payout Frequency"}
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-accent-100 dark:divide-gray-700/50">
          {rows.map((item) => {
            const name = item.entry.name?.[language] || item.entry.name?.["en"] || ""
            const minWithdraw = item.entry.minWithdraw?.[language] || item.entry.minWithdraw?.["en"] || "—"
            const payoutFrequency = item.entry.payoutFrequency?.[language] || item.entry.payoutFrequency?.["en"] || "—"
            return (
              <tr
                key={item.entry.slug}
                className={`transition-all ${item.rank === 1
                  ? "bg-gradient-to-r from-yellow-50/50 to-transparent dark:from-yellow-500/5 dark:to-transparent border-l-4 border-yellow-400 dark:border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.15)] dark:shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                  : item.rank === 2
                    ? "bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-500/5 dark:to-transparent border-l-4 border-gray-300 dark:border-gray-400"
                    : item.rank === 3
                      ? "bg-gradient-to-r from-orange-50/50 to-transparent dark:from-orange-500/5 dark:to-transparent border-l-4 border-orange-400 dark:border-orange-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {showRank && (
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${item.rank === 1
                        ? "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                        : item.rank === 2
                          ? "bg-gray-200 dark:bg-gray-400/20 text-gray-600 dark:text-gray-300"
                          : item.rank === 3
                            ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                            : "bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400"
                        }`}
                    >
                      {item.rank}
                    </span>
                  </td>
                )}
                <td className="px-4 py-4">
                  <Link
                    href={`/${language}/${audience}/monetization/domain-parking/${item.entry.slug}`}
                    className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-accent-600 font-medium"
                  >
                    {item.entry.logo && item.entry.logo.trim() !== "" && (
                      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
                        <img
                          src={item.entry.logo}
                          alt={`${name} logo`}
                          className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                        />
                      </div>
                    )}
                    {name}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <RatingStars rating={item.score} size="sm" />
                </td>
                <td className="px-4 py-4 text-gray-700 dark:text-gray-300 text-sm">{minWithdraw}</td>
                <td className="px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">{payoutFrequency}</td>
                <td className="px-4 py-4">
                  <Link
                    href={`/${language}/${audience}/monetization/domain-parking/${item.entry.slug}`}
                    className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                  >
                    {t("common.more")} →
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
