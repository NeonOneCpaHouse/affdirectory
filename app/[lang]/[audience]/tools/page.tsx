"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { getTools } from "@/mock/tools"
import { getLocalized } from "@/types"

export default function ToolsPage() {
  const { t, language } = useLanguage()
  const { audience } = useAudience()

  const tools = getTools(audience)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.tools") }]} />
      <div className="flex justify-center mb-8">
        <AdSlot slotKey="leaderboard" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("nav.tools")}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">{t("common.toolsSubtitle") || (language === 'ru' ? "Бесплатные инструменты для вашей работы" : "Free tools to optimize your workflow")}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${language}/${audience}/tools/${tool.slug}`}
            className="block bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 hover:border-sky-400 dark:hover:border-blue-500/50 transition-all group shadow-sm"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {getLocalized(tool.name, language)}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{getLocalized(tool.description, language)}</p>
          </Link>
        ))}
        {tools.length === 0 && (
          <p className="col-span-4 text-center py-12 text-gray-500">
            {language === 'ru' ? "Инструменты для этой категории скоро появятся." : "Tools for this category coming soon."}
          </p>
        )}
      </div>
    </div>
  )
}
