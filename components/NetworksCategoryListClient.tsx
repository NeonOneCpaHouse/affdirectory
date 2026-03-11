"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import RatingStars from "@/components/RatingStars"
import type { Network } from "@/mock/networks"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import TagPills from "@/components/TagPills"
import type { Localized } from "@/types"

interface Props {
    networks: Network[]
    categoryKey: string
    categoryLabel: Localized<string>
}

export default function NetworksCategoryListClient({ networks, categoryKey, categoryLabel }: Props) {
    const { language, t } = useLanguage()
    const { audience } = useAudience()
    const label = categoryLabel[language] || categoryLabel["en"]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[
                { label: t("nav.networks"), href: "/networks" },
                { label: label },
            ]} />
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
                <main className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{label}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        {networks.length > 0
                            ? `${networks.length} ${language === "ru" ? "сетей" : "networks"}`
                            : language === "ru" ? "Скоро появятся" : "Coming soon"}
                    </p>
                    <div className="lg:hidden mb-8">
                        <AdSlot slotKey="sidebar" />
                    </div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {networks.map((network, index) => {
                            const formats = network.formatsSupported || []
                            const avgRating =
                                formats.length > 0
                                    ? formats.reduce((sum, fmt) => sum + (network.ratingsByFormat[fmt]?.overall || 0), 0) / formats.length
                                    : 0
                            const currentGeos = network.geos[language] || network.geos["en"] || []
                            return (
                                <>
                                    <Link
                                        key={network.slug}
                                        href={`/${language}/${audience}/networks/${categoryKey}/${network.slug}`}
                                        className="block bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-accent-200 dark:border-gray-700/50 rounded-xl p-5 hover:border-accent-500 dark:hover:border-accent-500/50 hover:bg-accent-50 dark:hover:bg-gray-800/30 transition-all group shadow-sm"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                {network.logo && network.logo.trim() !== "" && (
                                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                                                        <img
                                                            src={network.logo || "/placeholder.svg"}
                                                            alt={`${network.name} logo`}
                                                            className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors">
                                                        {network.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {network.payoutFrequency} • Min ${network.minPayout}
                                                    </p>
                                                </div>
                                            </div>
                                            <RatingStars rating={avgRating} size="sm" />
                                        </div>
                                        <TagPills tags={formats} variant="format" size="sm" />
                                        <div className="mt-3 pt-3 border-t border-accent-100 dark:border-gray-700/50">
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                {currentGeos.slice(0, 3).join(", ")}
                                                {currentGeos.length > 3 && ` +${currentGeos.length - 3}`}
                                            </p>
                                        </div>
                                    </Link>
                                    {index === 2 && (
                                        <div className="md:col-span-2 xl:col-span-3 my-4">
                                            <AdSlot slotKey="inline" />
                                        </div>
                                    )}
                                </>
                            )
                        })}
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
