"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

interface MonetizationCategory {
    key: string
    label: { en: string; ru: string }
    href: string
    count: number
}

export default function MonetizationCategoryClient({ categories }: { categories: MonetizationCategory[] }) {
    const { language } = useLanguage()
    const { audience } = useAudience()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: language === "ru" ? "Монетизация" : "Monetization" }]} />
            <div className="mb-8"><AdSlot slotKey="leaderboard" fullWidth /></div>
            <div className="flex flex-col lg:flex-row gap-8">
                <main className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {language === "ru" ? "Монетизация" : "Monetization"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
                        {language === "ru"
                            ? "Инструменты и сервисы для монетизации вашего трафика"
                            : "Tools and services to monetize your traffic"}
                    </p>
                    <div className="lg:hidden mb-8"><AdSlot slotKey="sidebar" /></div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.key}
                                href={cat.href.startsWith("/") ? `/${language}/${audience}${cat.href}` : `/${language}/${audience}/${cat.href}`}
                                className="block bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-5 hover:border-accent-500 dark:hover:border-accent-500/50 transition-all group shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors mb-1">
                                    {cat.label[language] || cat.label["en"]}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {cat.count > 0
                                        ? `${cat.count} ${language === "ru" ? "сервисов" : "services"}`
                                        : language === "ru" ? "Скоро" : "Coming soon"}
                                </p>
                            </Link>
                        ))}
                    </div>
                </main>
                <aside className="hidden lg:block w-full lg:w-[300px]">
                    <div className="sticky top-8"><AdSlot slotKey="sidebar" /></div>
                </aside>
            </div>
        </div>
    )
}
