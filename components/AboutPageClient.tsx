"use client"

import Breadcrumbs from "@/components/Breadcrumbs"
import { useLanguage } from "@/context/LanguageContext"
import AdSlot from "@/components/AdSlot"
import { localizedAboutText } from "@/app/[lang]/[audience]/about/about-data"
import { Network, FileText, BookOpen, Calculator, Calendar, Briefcase, Zap, Search, Target, CheckCircle2 } from "lucide-react"

export default function AboutPageClient() {
  const { t, language } = useLanguage()

  const currentLang = (language === "ru" ? "ru" : "en") as "en" | "ru"
  const data = localizedAboutText

  const renderIcon = (id: string, className: string) => {
    switch (id) {
      case "rankings":
        return <Network className={className} />
      case "articles":
        return <FileText className={className} />
      case "knowledge_base":
        return <BookOpen className={className} />
      case "tools_arbitrage":
        return <Zap className={className} />
      case "tools_webmaster":
        return <Calculator className={className} />
      case "events":
        return <Calendar className={className} />
      case "jobs":
        return <Briefcase className={className} />
      default:
        return <Target className={className} />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.about") }]} />

      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700/50 rounded-3xl p-8 mb-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Target size={200} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">
              {data.hero.title[currentLang]}
            </h1>
            <p className="text-lg sm:text-xl text-sky-600 dark:text-sky-400 font-medium mb-4 relative z-10">
              {data.hero.intro[currentLang]}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl relative z-10 text-base sm:text-lg">
              {data.hero.description[currentLang]}
            </p>
          </div>

          <div className="lg:hidden my-8">
            <AdSlot slotKey="sidebar" />
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Search className="text-sky-500" />
              {data.mission.title[currentLang]}
            </h2>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-sm">
              <p className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">
                {data.mission.goal[currentLang]}
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                {data.mission.list[currentLang].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {data.mission.ideaTitle[currentLang]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data.mission.ideaText[currentLang]}
                </p>
              </div>
            </div>
          </div>

          <div className="my-8">
            <AdSlot slotKey="inline" />
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {data.offerings.title[currentLang]}
            </h2>
            <div className="space-y-6">
              {data.offerings.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700/70 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-sky-50 dark:bg-sky-900/40 p-3 rounded-xl text-sky-600 dark:text-sky-400">
                      {renderIcon(section.id, "w-6 h-6")}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {section.title[currentLang]}
                    </h3>
                  </div>

                  {section.desc[currentLang] && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5 pl-2 border-l-2 border-sky-400 dark:border-sky-600">
                      {section.desc[currentLang]}
                    </p>
                  )}

                  {section.items[currentLang].length > 0 && (
                    <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3 mt-4">
                      {section.items[currentLang].map((item: any, i: number) => (
                        <li key={i} className="text-sm">
                          <span className="font-semibold text-gray-900 dark:text-white mr-2">
                            {item.label} -
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-sky-600 dark:bg-sky-900 text-white rounded-3xl p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-3">{data.join.title[currentLang]}</h2>
            <p className="text-sky-100 leading-relaxed max-w-3xl mb-6">{data.join.text[currentLang]}</p>
          </div>
        </div>

        <aside className="hidden lg:block w-full lg:w-[300px]">
          <div className="sticky top-8 space-y-8">
            <AdSlot slotKey="sidebar" />
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
