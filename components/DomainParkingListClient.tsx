"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import RatingStars from "@/components/RatingStars"
import type { DomainParkingEntry } from "@/mock/domainParking"
import { getDomainParkingAvgRating } from "@/mock/domainParking"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

export default function DomainParkingListClient({ entries }: { entries: DomainParkingEntry[] }) {
    const { language } = useLanguage()
    const { audience } = useAudience()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[
                { label: language === "ru" ? "Монетизация" : "Monetization", href: "/monetization" },
                { label: language === "ru" ? "Парковка доменов" : "Domain Parking" },
            ]} />
            <div className="mb-8"><AdSlot slotKey="leaderboard" fullWidth /></div>
            <div className="flex flex-col lg:flex-row gap-8">
                <main className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {language === "ru" ? "Парковка доменов" : "Domain Parking"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {entries.length > 0
                            ? `${entries.length} ${language === "ru" ? "сервисов" : "services"}`
                            : language === "ru" ? "Скоро появятся" : "Coming soon"}
                    </p>
                    <div className="lg:hidden mb-8"><AdSlot slotKey="sidebar" /></div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {entries.map((entry, index) => {
                            const name = entry.name?.[language] || entry.name?.["en"] || ""
                            const avgRating = getDomainParkingAvgRating(entry)
                            return (
                                <>
                                    <Link key={entry.slug} href={`/${language}/${audience}/monetization/domain-parking/${entry.slug}`} className="block bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-5 hover:border-accent-500 dark:hover:border-accent-500/50 transition-all group shadow-sm">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {entry.logo && entry.logo.trim() !== "" && (
                                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                                                        <img src={entry.logo} alt={`${name} logo`} className="max-w-full max-h-full object-contain filter drop-shadow-sm" />
                                                    </div>
                                                )}
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors">{name}</h3>
                                            </div>
                                            <RatingStars rating={avgRating} size="sm" />
                                        </div>
                                    </Link>
                                    {index === 2 && <div className="md:col-span-2 xl:col-span-3 my-4"><AdSlot slotKey="inline" /></div>}
                                </>
                            )
                        })}
                    </div>
                </main>
                <aside className="hidden lg:block w-full lg:w-[300px]">
                    <div className="sticky top-8"><AdSlot slotKey="sidebar" /></div>
                </aside>
            </div>
        </div>
    )
}
