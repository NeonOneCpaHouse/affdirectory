"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import { useLanguage } from "@/context/LanguageContext"

export default function ToolsPage() {
  const { t, language } = useLanguage()

  const content = {
    en: {
      title: "Publisher Tools",
      subtitle: "Free tools to help you optimize your monetization strategy.",
      tools: [
        {
          slug: "rpm-calculator",
          name: "RPM Calculator",
          description: "Calculate your potential ad revenue based on traffic and CPM rates.",
          icon: "🧮",
        },
        {
          slug: "ad-format-picker",
          name: "Ad Format Picker",
          description: "Find the best ad formats for your site type and traffic profile.",
          icon: "🎯",
        },
        {
          slug: "pre-monetization-checklist",
          name: "Pre-Monetization Checklist",
          description: "Ensure your site is ready before applying to ad networks.",
          icon: "✅",
        },
        {
          slug: "format-demo",
          name: "Format Demo",
          description: "Preview how different ad formats will look on your website.",
          icon: "👁️",
        },
      ],
    },
    ru: {
      title: "Инструменты для издателей",
      subtitle: "Бесплатные инструменты, которые помогут вам оптимизировать стратегию монетизации.",
      tools: [
        {
          slug: "rpm-calculator",
          name: "Калькулятор RPM",
          description: "Рассчитайте потенциальный доход от рекламы на основе трафика и ставок CPM.",
          icon: "🧮",
        },
        {
          slug: "ad-format-picker",
          name: "Подбор рекламного формата",
          description: "Найдите лучшие рекламные форматы для вашего типа сайта и профиля трафика.",
          icon: "🎯",
        },
        {
          slug: "pre-monetization-checklist",
          name: "Чек-лист перед монетизацией",
          description: "Убедитесь, что ваш сайт готов перед подачей заявки в рекламные сети.",
          icon: "✅",
        },
        {
          slug: "format-demo",
          name: "Демо Форматов",
          description: "Предварительный просмотр того, как различные рекламные форматы будут выглядеть на вашем сайте.",
          icon: "👁️",
        },
      ],
    },
  }

  const active = content[language]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.tools") }]} />
      <div className="flex justify-center mb-8">
        <AdSlot slotKey="leaderboard" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{active.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">{active.subtitle}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {active.tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="block bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 hover:border-sky-400 dark:hover:border-blue-500/50 transition-all group shadow-sm"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {tool.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
