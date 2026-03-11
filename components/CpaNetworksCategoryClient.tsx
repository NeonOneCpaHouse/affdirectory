"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import type { Localized } from "@/types"

interface CategoryItem {
    key: string
    labels: Localized<string>
    count: number
}

export default function CpaNetworksCategoryClient({ categories }: { categories: CategoryItem[] }) {
    const { language } = useLanguage()
    const { audience } = useAudience()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: language === "ru" ? "CPA сети" : "CPA Networks" }]} />
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <main className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {language === "ru" ? "CPA сети" : "CPA Networks"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
                        {language === "ru"
                            ? "Просмотрите CPA сети по вертикалям"
                            : "Browse CPA networks by vertical"}
                    </p>
                    <div className="lg:hidden mb-8">
                        <AdSlot slotKey="sidebar" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.key}
                                href={`/${language}/${audience}/cpa-networks/${cat.key}`}
                                className="block bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-5 hover:border-accent-500 dark:hover:border-accent-500/50 transition-all group shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors mb-1">
                                    {cat.labels[language] || cat.labels["en"]}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {cat.count > 0
                                        ? `${cat.count} ${language === "ru" ? "сетей" : "networks"}`
                                        : language === "ru" ? "Скоро" : "Coming soon"}
                                </p>
                            </Link>
                        ))}
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
