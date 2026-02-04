"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Copy, Check, RefreshCw } from "lucide-react"
import AdSlot from "@/components/AdSlot"

export default function UtmBuilderPage() {
    const { t, language } = useLanguage()
    const { audience } = useAudience()

    const [baseUrl, setBaseUrl] = useState("")
    const [params, setParams] = useState({
        source: "",
        medium: "",
        campaign: "",
        content: "",
        term: "",
    })
    const [generatedUrl, setGeneratedUrl] = useState("")
    const [copied, setCopied] = useState(false)

    // Presets for quick fill
    // Using localized names for display but standard utm values
    const presets = [
        { name: "Google", source: "google", medium: "cpc" },
        { name: "Yandex", source: "yandex", medium: "cpc" },
        { name: "Facebook", source: "facebook", medium: "cpc" },
        { name: "Instagram", source: "instagram", medium: "cpc" },
        { name: "VK", source: "vk", medium: "cpc" },
        { name: "Telegram", source: "telegram", medium: "cpc" },
        { name: "Email", source: "email", medium: "email" },
    ]

    const applyPreset = (preset: typeof presets[0]) => {
        setParams(prev => ({
            ...prev,
            source: preset.source,
            medium: preset.medium
        }))
    }

    const handleParamChange = (key: keyof typeof params, value: string) => {
        setParams(prev => ({ ...prev, [key]: value }))
    }

    useEffect(() => {
        if (!baseUrl) {
            setGeneratedUrl("")
            return
        }

        try {
            // Handle URLs without protocol
            let urlStr = baseUrl
            if (!urlStr.match(/^https?:\/\//)) {
                urlStr = 'https://' + urlStr
            }

            const url = new URL(urlStr)

            const searchParams = new URLSearchParams(url.search)

            if (params.source) searchParams.set("utm_source", params.source)
            if (params.medium) searchParams.set("utm_medium", params.medium)
            if (params.campaign) searchParams.set("utm_campaign", params.campaign)
            if (params.content) searchParams.set("utm_content", params.content)
            if (params.term) searchParams.set("utm_term", params.term)

            url.search = searchParams.toString()
            setGeneratedUrl(url.toString())
        } catch (e) {
            // Invalid URL, just return base + params appended manually as fallback or do nothing
            // For now, let's just wait for valid URL
            setGeneratedUrl(baseUrl)
        }
    }, [baseUrl, params])

    const copyToClipboard = () => {
        if (!generatedUrl) return
        navigator.clipboard.writeText(generatedUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const clearForm = () => {
        setBaseUrl("")
        setParams({
            source: "",
            medium: "",
            campaign: "",
            content: "",
            term: "",
        })
    }

    const localizedText = {
        title: { en: "UTM Builder", ru: "Компоновщик UTM-меток" },
        subtitle: { en: "Generate tracking links for your marketing campaigns", ru: "Создавайте ссылки с метками для ваших рекламных кампаний" },
        websiteUrl: { en: "Website URL", ru: "Адрес целевой страницы" },
        websiteUrlPlaceholder: { en: "https://example.com", ru: "https://example.com" },
        trafficSource: { en: "Traffic Source", ru: "Источник трафика" },
        parameters: { en: "Campaign Parameters", ru: "Параметры кампании" },
        source: { label: "utm_source", help: { en: "Campaign Source (e.g. google, newsletter)", ru: "Источник кампании (например: google, yandex)" } },
        medium: { label: "utm_medium", help: { en: "Campaign Medium (e.g. cpc, banner, email)", ru: "Тип трафика (например: cpc, email, banner)" } },
        campaign: { label: "utm_campaign", help: { en: "Campaign Name (e.g. spring_sale)", ru: "Название кампании (например: promo_new_year)" } },
        content: { label: "utm_content", help: { en: "Campaign Content (used for A/B testing)", ru: "Идентификатор объявления (для различия объявлений)" } },
        term: { label: "utm_term", help: { en: "Campaign Term (identify the paid keywords)", ru: "Ключевое слово (для платного поиска)" } },
        result: { en: "Generated URL", ru: "Результат" },
        copy: { en: "Copy URL", ru: "Копировать" },
        copied: { en: "Copied!", ru: "Скопировано!" },
        clear: { en: "Clear Form", ru: "Очистить" },
        presets: { en: "Quick Presets:", ru: "Быстрый выбор:" }
    }

    const loc = (key: keyof typeof localizedText) => {
        const val = localizedText[key] as any
        return val[language] || val['en']
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Breadcrumbs items={[
                { label: t("nav.tools"), href: `/${language}/${audience}/tools` },
                { label: loc("title") }
            ]} />

            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{loc("title")}</h1>
                        <p className="text-gray-500 dark:text-gray-400">{loc("subtitle")}</p>
                    </div>

                    <div className="space-y-6">
                        {/* URL Input */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                {loc("websiteUrl")} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={baseUrl}
                                onChange={(e) => setBaseUrl(e.target.value)}
                                placeholder={loc("websiteUrlPlaceholder")}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                            />
                        </div>

                        {/* Source Presets */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{loc("trafficSource")}</h3>
                                <button onClick={clearForm} className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                                    <RefreshCw size={14} /> {loc("clear")}
                                </button>
                            </div>

                            <div className="mb-6">
                                <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-2 block">{loc("presets")}</span>
                                <div className="flex flex-wrap gap-2">
                                    {presets.map(preset => (
                                        <button
                                            key={preset.name}
                                            onClick={() => applyPreset(preset)}
                                            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${params.source === preset.source && params.medium === preset.medium
                                                ? 'bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                                                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-sky-300 dark:hover:border-sky-700 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {preset.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{localizedText.source.label} <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={params.source}
                                        onChange={(e) => handleParamChange("source", e.target.value)}
                                        placeholder="google, newsletter, etc."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">{localizedText.source.help[language === 'ru' ? 'ru' : 'en']}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{localizedText.medium.label} <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={params.medium}
                                        onChange={(e) => handleParamChange("medium", e.target.value)}
                                        placeholder="cpc, banner, email, etc."
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">{localizedText.medium.help[language === 'ru' ? 'ru' : 'en']}</p>
                                </div>
                            </div>
                        </div>

                        <div className="my-8">
                            <AdSlot slotKey="inline" />
                        </div>

                        {/* Optional Parameters */}
                        <div className="lg:hidden my-8">
                            <AdSlot slotKey="sidebar" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{loc("parameters")}</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{localizedText.campaign.label}</label>
                                    <input
                                        type="text"
                                        value={params.campaign}
                                        onChange={(e) => handleParamChange("campaign", e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">{localizedText.campaign.help[language === 'ru' ? 'ru' : 'en']}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{localizedText.content.label}</label>
                                    <input
                                        type="text"
                                        value={params.content}
                                        onChange={(e) => handleParamChange("content", e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">{localizedText.content.help[language === 'ru' ? 'ru' : 'en']}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{localizedText.term.label}</label>
                                    <input
                                        type="text"
                                        value={params.term}
                                        onChange={(e) => handleParamChange("term", e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                                    />
                                    <p className="mt-1 text-xs text-gray-400">{localizedText.term.help[language === 'ru' ? 'ru' : 'en']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <aside className="hidden lg:block w-full lg:w-[300px]">
                    <div className="sticky top-8">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>

            {/* Result Section */}
            <div className="mt-8 sticky bottom-4 z-10">
                <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-xl p-4 shadow-xl border border-gray-700 flex flex-col md:flex-row items-center gap-4 transition-all">
                    <div className="flex-1 w-full min-w-0">
                        <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">{loc("result")}</div>
                        <div className="bg-black/30 rounded px-3 py-2 font-mono text-sm break-all">
                            {generatedUrl || <span className="text-gray-500 italic">{language === 'ru' ? 'Заполните поля выше...' : 'Fill in the fields above...'}</span>}
                        </div>
                    </div>
                    <button
                        onClick={copyToClipboard}
                        disabled={!generatedUrl}
                        className={`shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${copied
                            ? "bg-green-600 text-white"
                            : generatedUrl
                                ? "bg-sky-500 hover:bg-sky-600 text-white"
                                : "bg-gray-700 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? loc("copied") : loc("copy")}
                    </button>
                </div>
            </div>
        </div>
    );
}
