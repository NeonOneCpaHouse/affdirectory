"use client"

import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import type { KnowledgeEntry, KnowledgeCategory } from "@/mock/knowledge"
import { groupKnowledgeByCategory } from "@/mock/knowledge"
import Link from "next/link"

interface KnowledgeBaseClientPageProps {
  entries: KnowledgeEntry[]
}

const categoryOrder: KnowledgeCategory[] = [
  "traffic",
  "monetization-models",
  "ad-formats",
  "metrics",
  "ad-networks",
  "technical",
  "webmaster",
  "financial",
]

const categoryTranslationKeys: Record<KnowledgeCategory, string> = {
  traffic: "knowledge.traffic",
  "monetization-models": "knowledge.monetizationModels",
  "ad-formats": "knowledge.adFormats",
  metrics: "knowledge.metrics",
  "ad-networks": "knowledge.adNetworks",
  technical: "knowledge.technical",
  webmaster: "knowledge.webmaster",
  financial: "knowledge.financial",
}

export default function KnowledgeBaseClientPage({ entries }: KnowledgeBaseClientPageProps) {
  const { language, t } = useLanguage()
  const { audience } = useAudience()
  const groupedEntries = groupKnowledgeByCategory(entries)

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("knowledge.title")}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("knowledge.description")}</p>
        </div>

        {/* Categories and Terms */}
        <div className="space-y-12">
          {categoryOrder.map((category) => {
            const categoryEntries = groupedEntries[category]
            if (!categoryEntries || categoryEntries.length === 0) return null

            return (
              <div key={category}>
                {/* Category Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t(categoryTranslationKeys[category])}
                </h2>

                {/* Terms Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categoryEntries.map((entry) => (
                    <Link
                      key={entry.slug}
                      href={`/${language}/${audience}/knowledge-base/${entry.slug}`}
                      className="group bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-lg p-6 hover:border-accent-500 dark:hover:border-accent-500/50 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-center font-medium text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors">
                        {entry.title[language] || entry.title.en}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
