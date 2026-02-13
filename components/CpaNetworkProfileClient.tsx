"use client"

import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import RatingStars from "@/components/RatingStars"
import type { CpaNetwork } from "@/mock/cpaNetworks"
import { verticalLabels, type VerticalKey } from "@/mock/cpaNetworks"
import { useLanguage } from "@/context/LanguageContext"
import RichText from "@/components/RichText"
import { Send, Facebook, Instagram, Youtube, Linkedin, MessageCircle, Users, MessageSquare } from "lucide-react"

const socialIcons: Record<string, { label: string; icon: React.ElementType }> = {
    telegram: { label: "Telegram", icon: Send },
    facebook: { label: "Facebook", icon: Facebook },
    instagram: { label: "Instagram", icon: Instagram },
    youtube: { label: "YouTube", icon: Youtube },
    linkedin: { label: "LinkedIn", icon: Linkedin },
    twitter: { label: "Twitter", icon: MessageSquare }, // default fallback or Twitter icon (not in default set? 'Twitter' is usually there, let's check or use MessageSquare)
}

// Support platform icons
const platformIcons: Record<string, React.ElementType> = {
    telegram: Send,
    whatsapp: MessageCircle,
    teams: Users,
    skype: MessageSquare,
    email: MessageSquare,
}

const ratingTooltips: Record<string, Record<string, string>> = {
    support: {
        en: "Measures how fast, reliable and friendly their support managers are",
        ru: "Оценивает скорость, надёжность и дружелюбие менеджеров поддержки",
    },
    offers: {
        en: "Measures the abundance of offers available",
        ru: "Оценивает количество и разнообразие доступных офферов",
    },
    promoMaterials: {
        en: "Measures the quality of provided promo materials like landing pages and prelanders",
        ru: "Оценивает качество промо-материалов: лендинги, прелендинги и др.",
    },
    rates: {
        en: "Measures how good their rates are in comparison with other networks",
        ru: "Оценивает конкурентоспособность ставок по сравнению с другими сетями",
    },
}

const ratingLabels: Record<string, Record<string, string>> = {
    support: { en: "Support", ru: "Поддержка" },
    offers: { en: "Offers", ru: "Офферы" },
    promoMaterials: { en: "Promo Materials", ru: "Промо-материалы" },
    rates: { en: "Rates", ru: "Ставки" },
}

export default function CpaNetworkProfileClient({
    network,
    alternatives,
}: {
    network: CpaNetwork
    alternatives: CpaNetwork[]
}) {
    const { language, t } = useLanguage()

    const name = network.name?.[language] || network.name?.["en"] || ""
    const minWithdraw = network.minWithdraw?.[language] || network.minWithdraw?.["en"] || "—"
    const hold = network.hold?.[language] || network.hold?.["en"] || "—"
    const referralProgram = network.referralProgram?.[language] || network.referralProgram?.["en"] || "—"
    const currentGeos = network.geos?.[language] || network.geos?.["en"] || []
    const currentPros = network.pros?.[language] || network.pros?.["en"] || []
    const currentCons = network.cons?.[language] || network.cons?.["en"] || []
    const reviewContent = network.review?.[language] || network.review?.["en"]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[{ label: "CPA Networks", href: "/cpa-networks" }, { label: name }]} />
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div className="bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                            {network.logo && network.logo.trim() !== "" && (
                                <div className="w-28 h-28 flex items-center justify-center">
                                    <img
                                        src={network.logo}
                                        alt={`${name} logo`}
                                        className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                                    />
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{name}</h1>
                                <div className="flex flex-wrap gap-2">
                                    {network.vertical?.map((v) => (
                                        <span
                                            key={v}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300"
                                        >
                                            {verticalLabels[v as VerticalKey]?.[language] || v}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                                    {language === "ru" ? "Мин. вывод" : "Min. Withdraw"}
                                </p>
                                <p className="text-gray-900 dark:text-white font-semibold">{minWithdraw}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                                    {language === "ru" ? "Холд" : "Hold"}
                                </p>
                                <p className="text-gray-900 dark:text-white font-semibold">{hold}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                                    {language === "ru" ? "Методы оплаты" : "Methods"}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {network.paymentMethods?.slice(0, 3).join(", ") || "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">GEOs</p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    {currentGeos.slice(0, 3).join(", ")}
                                    {currentGeos.length > 3 && ` +${currentGeos.length - 3}`}
                                </p>
                            </div>
                        </div>

                        {/* Referral Program */}
                        <div className="mt-4 pt-4 border-t border-accent-100 dark:border-gray-700/50">
                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
                                {language === "ru" ? "Партнёрская программа" : "Referral Program"}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{referralProgram}</p>
                        </div>

                        {/* Website + Socials */}
                        <div className="mt-4 pt-4 border-t border-accent-100 dark:border-gray-700/50 flex flex-wrap items-center gap-4">
                            {network.websiteUrl && (
                                <a
                                    href={network.websiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    {new URL(network.websiteUrl).hostname}
                                </a>
                            )}
                            {network.socials && Object.entries(network.socials).map(([key, url]) => {
                                if (!url) return null
                                const social = socialIcons[key.toLowerCase()]
                                if (!social) return null
                                const Icon = social.icon
                                return (
                                    <a
                                        key={key}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-accent-600 transition-colors"
                                        title={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Go to site - mobile */}
                    <div className="lg:hidden bg-accent-600 rounded-xl p-6 text-center shadow-md">
                        <h3 className="text-white font-semibold text-lg mb-4">
                            {language === "ru" ? "Перейти на" : "Visit"} {name}
                        </h3>
                        <a
                            href={network.signupUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-white text-accent-600 font-medium py-3 rounded-lg hover:bg-accent-50 transition-colors shadow-sm"
                        >
                            {language === "ru" ? "Перейти на сайт" : "Go to site"} →
                        </a>
                    </div>

                    {/* Ratings */}
                    {network.ratings && (
                        <div className="bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {language === "ru" ? "Рейтинги" : "Ratings"}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(["support", "offers", "promoMaterials", "rates"] as const).map((key) => {
                                    const value = network.ratings?.[key]
                                    if (value == null) return null
                                    return (
                                        <div key={key} className="p-4 bg-accent-50 dark:bg-gray-900/50 rounded-lg group relative">
                                            <div className="flex items-center gap-2 mb-2">
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {ratingLabels[key]?.[language] || key}
                                                </p>
                                                <div className="relative">
                                                    <span className="text-gray-400 cursor-help text-xs" title={ratingTooltips[key]?.[language] || ratingTooltips[key]?.en}>
                                                        ℹ️
                                                    </span>
                                                </div>
                                            </div>
                                            <RatingStars rating={value} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Support contacts */}
                    {network.support && network.support.length > 0 && (
                        <div className="bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                {language === "ru" ? "Поддержка" : "Support"}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {network.support.map((contact, idx) => {
                                    const PlatformIcon = platformIcons[contact.platform.toLowerCase()] || MessageSquare
                                    return (
                                        <a
                                            key={idx}
                                            href={contact.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-accent-50 dark:bg-gray-900/50 rounded-lg hover:bg-accent-100 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            {contact.avatar ? (
                                                <img
                                                    src={contact.avatar}
                                                    alt="Support"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-500">
                                                    <Users className="w-5 h-5" />
                                                </div>
                                            )}
                                            <div>
                                                <span className="text-gray-900 dark:text-white">
                                                    <PlatformIcon className="w-5 h-5 inline-block mr-2 text-accent-600" />
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                                    {contact.platform}
                                                </span>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    <div className="lg:hidden mb-12">
                        <AdSlot slotKey="sidebar" />
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-6">
                            <h3 className="text-green-700 dark:text-green-400 font-semibold mb-3">
                                {language === "ru" ? "Плюсы" : "Pros"}
                            </h3>
                            <ul className="space-y-2">
                                {currentPros.map((p, i) => (
                                    <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                                        <span className="text-green-600 dark:text-green-500">✓</span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6">
                            <h3 className="text-red-700 dark:text-red-400 font-semibold mb-3">
                                {language === "ru" ? "Минусы" : "Cons"}
                            </h3>
                            <ul className="space-y-2">
                                {currentCons.map((c, i) => (
                                    <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                                        <span className="text-red-600 dark:text-red-500">✗</span>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Review */}
                    {reviewContent && (
                        <div className="bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                {language === "ru" ? "Обзор" : "Review"}
                            </h2>
                            <RichText value={reviewContent} />
                        </div>
                    )}

                    <div className="">
                        <AdSlot slotKey="inline" />
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block space-y-6">
                    <div className="sticky top-8 space-y-6">
                        <div className="bg-accent-600 rounded-xl p-6 text-center shadow-md">
                            <h3 className="text-white font-semibold text-lg mb-4">
                                {language === "ru" ? "Перейти на" : "Visit"} {name}
                            </h3>
                            <a
                                href={network.signupUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-white text-accent-600 font-medium py-3 rounded-lg hover:bg-accent-50 transition-colors shadow-sm"
                            >
                                {language === "ru" ? "Перейти на сайт" : "Go to site"} →
                            </a>
                        </div>
                        {alternatives.length > 0 && (
                            <div>
                                <h3 className="text-gray-900 dark:text-white font-semibold mb-4">
                                    {language === "ru" ? "Похожие сети" : "Similar Networks"}
                                </h3>
                                <div className="space-y-3">
                                    {alternatives.map((alt) => {
                                        const altName = alt.name?.[language] || alt.name?.["en"] || ""
                                        return (
                                            <a
                                                key={alt.slug}
                                                href={`/${language}/affiliate/cpa-networks/${alt.slug}`}
                                                className="block bg-white dark:bg-gray-800/50 border border-accent-200 dark:border-gray-700/50 rounded-lg p-3 hover:border-accent-500 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    {alt.logo && (
                                                        <img src={alt.logo} alt={altName} className="w-8 h-8 object-contain" />
                                                    )}
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{altName}</span>
                                                </div>
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    )
}
