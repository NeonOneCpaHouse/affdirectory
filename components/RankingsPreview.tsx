"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NetworkTable from "@/components/NetworkTable"
import CpaNetworkTable from "@/components/CpaNetworkTable"
import ServiceTable from "@/components/ServiceTable"
import {
    affiliateAdFormatKeys,
    affiliateServiceTypeKeys,
    adFormatSlugs,
    getAudienceAdFormatKeys,
    getAudienceServiceTypeKeys,
    getAdNetworkRanking,
    getCpaNetworkRanking,
    getServiceRanking,
    serviceTypeSlugs,
    type RankedAdNetwork,
    type RankedCpaNetwork,
    type RankedService,
    verticalSlugs,
} from "@/mock/rankings"
import type { AdFormatKey } from "@/mock/networks"
import type { VerticalKey } from "@/mock/cpaNetworks"
import type { ServiceTypeKey } from "@/mock/services"
import { adFormatLabels } from "@/mock/networks"
import { verticalLabels } from "@/mock/cpaNetworks"
import { serviceTypeLabels } from "@/mock/services"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

type CategoryTab = "adNetworks" | "cpaNetworks" | "services"

const cpaSubs: VerticalKey[] = ["gambling", "betting", "dating", "crypto", "finance", "sweeps", "installs", "nutra", "adult", "multivertical", "other"]

export default function RankingsPreview() {
    const { language } = useLanguage()
    const { audience } = useAudience()
    const getPath = (path: string) => `/${language}/${audience}${path}`
    const adNetworkSubs = getAudienceAdFormatKeys(audience)
    const serviceSubs = getAudienceServiceTypeKeys(audience)
    const showCpaRankings = audience === "affiliate"
    const categoryTabs: { key: CategoryTab; label: Record<string, string>; color: string }[] = showCpaRankings
        ? [
            { key: "adNetworks", label: { en: "Ad Networks", ru: "Рекл. сети" }, color: "bg-blue-500" },
            { key: "cpaNetworks", label: { en: "CPA Networks", ru: "CPA-сети" }, color: "bg-purple-500" },
            { key: "services", label: { en: "Services", ru: "Сервисы" }, color: "bg-emerald-500" },
        ]
        : [
            { key: "adNetworks", label: { en: "Ad Networks", ru: "Рекл. сети" }, color: "bg-blue-500" },
            { key: "services", label: { en: "Services", ru: "Сервисы" }, color: "bg-emerald-500" },
        ]

    const [activeCategory, setActiveCategory] = useState<CategoryTab>("adNetworks")
    const [activeSub, setActiveSub] = useState<string>(affiliateAdFormatKeys[0])
    const [data, setData] = useState<{
        adNetworks?: RankedAdNetwork[]
        cpaNetworks?: RankedCpaNetwork[]
        services?: RankedService[]
    } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!showCpaRankings && activeCategory === "cpaNetworks") {
            setActiveCategory("adNetworks")
            return
        }

        if (activeCategory === "adNetworks" && !adNetworkSubs.includes(activeSub as AdFormatKey)) {
            setActiveSub(adNetworkSubs[0])
        } else if (activeCategory === "cpaNetworks" && !cpaSubs.includes(activeSub as VerticalKey)) {
            setActiveSub(cpaSubs[0])
        } else if (activeCategory === "services" && !serviceSubs.includes(activeSub as ServiceTypeKey)) {
            setActiveSub(serviceSubs[0])
        }
    }, [activeCategory, activeSub, adNetworkSubs, serviceSubs, showCpaRankings])

    useEffect(() => {
        if (activeCategory === "adNetworks") {
            setActiveSub(adNetworkSubs[0])
        } else if (activeCategory === "cpaNetworks") {
            setActiveSub(cpaSubs[0])
        } else {
            setActiveSub(serviceSubs[0])
        }
    }, [activeCategory, adNetworkSubs, serviceSubs])

    useEffect(() => {
        setLoading(true)
        setData(null)

        if (activeCategory === "adNetworks") {
            getAdNetworkRanking(activeSub as AdFormatKey, audience).then((items) => {
                setData({ adNetworks: items })
                setLoading(false)
            })
        } else if (activeCategory === "cpaNetworks") {
            if (!showCpaRankings) {
                setData(null)
                setLoading(false)
                return
            }
            getCpaNetworkRanking(activeSub as VerticalKey, audience).then((items) => {
                setData({ cpaNetworks: items })
                setLoading(false)
            })
        } else {
            getServiceRanking(activeSub as ServiceTypeKey, audience).then((items) => {
                setData({ services: items })
                setLoading(false)
            })
        }
    }, [activeSub, activeCategory, audience, showCpaRankings])

    const getSubTabs = () => {
        if (activeCategory === "adNetworks") {
            return adNetworkSubs.map((key) => ({
                key,
                label: adFormatLabels[key]?.[language] || adFormatLabels[key]?.en || key,
            }))
        } else if (activeCategory === "cpaNetworks") {
            return cpaSubs.map((key) => ({
                key,
                label: verticalLabels[key]?.[language] || verticalLabels[key]?.en || key,
            }))
        } else {
            return serviceSubs.map((key) => ({
                key,
                label: serviceTypeLabels[key]?.[language] || serviceTypeLabels[key]?.en || key,
            }))
        }
    }

    const getViewAllSlug = () => {
        if (activeCategory === "adNetworks") return adFormatSlugs[activeSub as AdFormatKey] || ""
        if (activeCategory === "cpaNetworks") return verticalSlugs[activeSub as VerticalKey] || ""
        return serviceTypeSlugs[activeSub as ServiceTypeKey] || ""
    }

    return (
        <div>
            {/* Category tabs */}
            <div className="flex gap-1 mb-3">
                {categoryTabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveCategory(tab.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === tab.key
                            ? `${tab.color} text-white shadow-md`
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                    >
                        {tab.label[language] || tab.label.en}
                    </button>
                ))}
            </div>

            {/* Sub-category tabs */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-4">
                <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg min-w-max">
                    {getSubTabs().map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveSub(tab.key)}
                            className={`whitespace-nowrap px-3 py-2 sm:px-4 rounded-md text-sm font-medium transition-colors ${activeSub === tab.key
                                ? "bg-accent-600 text-white shadow-sm"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
                {loading ? (
                    <div className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                        {language === "ru" ? "Загрузка..." : "Loading..."}
                    </div>
                ) : (
                    <>
                        {activeCategory === "adNetworks" && data?.adNetworks && (
                            <NetworkTable networks={data.adNetworks} maxRows={5} />
                        )}
                        {activeCategory === "cpaNetworks" && data?.cpaNetworks && (
                            <CpaNetworkTable networks={data.cpaNetworks} maxRows={5} />
                        )}
                        {activeCategory === "services" && data?.services && (
                            <ServiceTable services={data.services} maxRows={5} />
                        )}
                    </>
                )}
            </div>

            {/* View full ranking link */}
            <div className="mt-3 text-right">
                <Link
                    href={getPath(`/rankings/${getViewAllSlug()}`)}
                    className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                >
                    {language === "ru" ? "Полный рейтинг" : "View full ranking"} →
                </Link>
            </div>
        </div>
    )
}
