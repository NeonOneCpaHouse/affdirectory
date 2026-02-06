"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import type { KnowledgeEntry, KnowledgeCategory } from "@/mock/knowledge"
import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Search, ChevronDown, RotateCcw, Filter, Check } from "lucide-react"

interface KnowledgeBaseClientPageProps {
  entries: KnowledgeEntry[]
}

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

  // Applied state
  const [appliedFilters, setAppliedFilters] = useState({
    category: [] as string[],
  })

  // Draft state
  const [draftFilters, setDraftFilters] = useState({
    category: [] as string[],
  })

  const [searchQuery, setSearchQuery] = useState("")

  const filteredEntries = entries.filter((entry) => {
    const matchesCategory = appliedFilters.category.length === 0 || appliedFilters.category.includes(entry.category)

    const matchesSearch =
      searchQuery === "" ||
      (entry.title?.[language] || entry.title?.en || "").toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    const titleA = (a.title?.[language] || a.title?.en || "").toLowerCase()
    const titleB = (b.title?.[language] || b.title?.en || "").toLowerCase()
    return titleA.localeCompare(titleB, language === 'ru' ? 'ru' : 'en')
  })

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters)
  }

  const handleResetFilters = () => {
    const resetState = {
      category: [],
    }
    setDraftFilters(resetState)
    setAppliedFilters(resetState)
    setSearchQuery("")
  }

  const categories = [
    { value: "traffic", label: t("knowledge.traffic") },
    { value: "monetization-models", label: t("knowledge.monetizationModels") },
    { value: "ad-formats", label: t("knowledge.adFormats") },
    { value: "metrics", label: t("knowledge.metrics") },
    { value: "ad-networks", label: t("knowledge.adNetworks") },
    { value: "technical", label: t("knowledge.technical") },
    { value: "webmaster", label: t("knowledge.webmaster") },
    { value: "financial", label: t("knowledge.financial") },
  ]

  const MultiSelectDropdown = ({
    label,
    options,
    value,
    onChange,
    placeholder
  }: {
    label: string
    options: { value: string; label: string }[]
    value: string[]
    onChange: (val: string[]) => void
    placeholder: string
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleOption = (optValue: string) => {
      const newValue = value.includes(optValue)
        ? value.filter(v => v !== optValue)
        : [...value, optValue]
      onChange(newValue)
    }

    const displayLabel = value.length === 0
      ? placeholder
      : value.length === 1
        ? options.find(o => o.value === value[0])?.label
        : `${options.find(o => o.value === value[0])?.label} + ${value.length - 1}`

    return (
      <div className="flex flex-col gap-2 flex-1 min-w-[200px]" ref={dropdownRef}>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 ml-1">
          {label}
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-800/50 border rounded-2xl text-sm font-bold transition-all hover:bg-white dark:hover:bg-gray-800 ${isOpen ? "border-accent-500 ring-2 ring-accent-500/10" : "border-gray-100 dark:border-gray-700"
              } ${value.length > 0 ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}
          >
            <span className="truncate">{displayLabel}</span>
            <ChevronDown className={`absolute right-4 w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-accent-500" : "text-gray-400"}`} />
          </button>

          {isOpen && (
            <div className="absolute z-[100] mt-2 w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl py-2 max-h-60 overflow-y-auto animate-in fade-in zoom-in duration-200">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleOption(opt.value)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
                >
                  <div className={`w-5 h-5 rounded-lg border transition-all flex items-center justify-center shrink-0 ${value.includes(opt.value)
                    ? "bg-accent-600 border-accent-600 text-white"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    }`}>
                    {value.includes(opt.value) && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-sm ${value.includes(opt.value) ? "text-gray-900 dark:text-white font-bold" : "text-gray-500 dark:text-gray-400 font-medium"}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: t("knowledge.title") }]} />
        <div className="mb-8">
          <AdSlot slotKey="leaderboard" fullWidth />
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-6 mb-10 shadow-sm relative">
          <div className="flex flex-wrap gap-6 mb-8">
            <MultiSelectDropdown
              label={language === "ru" ? "Категория" : "Category"}
              options={categories}
              value={draftFilters.category}
              onChange={(val) => setDraftFilters({ ...draftFilters, category: val })}
              placeholder={language === "ru" ? "Все категории" : "All categories"}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-50 dark:border-gray-800">
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                onClick={handleApplyFilters}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-accent-500/20 active:scale-95"
              >
                <Filter className="w-4 h-4" />
                {t("jobs.applyFilters")}
              </button>
              <button
                onClick={handleResetFilters}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 font-bold rounded-2xl transition-all active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                {t("jobs.resetFilters")}
              </button>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder={language === "ru" ? "Поиск терминов..." : "Search terms..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all shadow-sm"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("knowledge.title")}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">{t("knowledge.description")}</p>
            </div>

            {/* Unified Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry, index) => (
                  <div key={entry.slug}>
                    <Link
                      href={`/${language}/${audience}/knowledge-base/${entry.slug}`}
                      className="group bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-2xl p-5 hover:border-accent-500 dark:hover:border-accent-500/50 hover:shadow-xl transition-all flex flex-col items-center justify-center"
                    >
                      <h3 className="text-center font-bold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {entry.title[language] || entry.title.en}
                      </h3>
                    </Link>
                    {index === 3 && (
                      <div className="mt-6 lg:hidden">
                        <AdSlot slotKey="sidebar" />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
                  <p className="text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                    {language === "ru" ? "Термины не найдены" : "No terms found"}
                  </p>
                </div>
              )}
            </div>

            {/* Inline Banner */}
            <div className="mb-12">
              <AdSlot slotKey="inline" />
            </div>
          </div>

          <aside className="hidden lg:block w-full lg:w-[300px]">
            <div className="sticky top-8">
              <AdSlot slotKey="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
