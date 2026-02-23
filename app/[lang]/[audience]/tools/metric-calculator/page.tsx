"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import Breadcrumbs from "@/components/Breadcrumbs"
import { RefreshCw, Calculator, TrendingUp, DollarSign, Users, MousePointer, ShoppingCart, Percent, HelpCircle, ChevronDown, CheckCircle } from "lucide-react"
import AdSlot from "@/components/AdSlot"
import { localizedText } from "./calculator-data"

type Metrics = {
    roi: number | null
    roas: number | null
    profit: number | null
    cpm: number | null
    cpc: number | null
    cpa: number | null
    ctr: number | null
    ctc: number | null
    ctb: number | null
    apv: number | null
    apc: number | null
}

export default function MetricCalculatorPage() {
    const { t, language } = useLanguage()
    const { audience } = useAudience()

    // Inputs
    const [cost, setCost] = useState<string>("")
    const [impressions, setImpressions] = useState<string>("")
    const [clicks, setClicks] = useState<string>("")
    const [income, setIncome] = useState<string>("")
    const [leads, setLeads] = useState<string>("")
    const [sales, setSales] = useState<string>("")

    const [metrics, setMetrics] = useState<Metrics>({
        roi: null,
        roas: null,
        profit: null,
        cpm: null,
        cpc: null,
        cpa: null,
        ctr: null,
        ctc: null,
        ctb: null,
        apv: null,
        apc: null,
    })

    useEffect(() => {
        const c = parseFloat(cost) || 0
        const i = parseFloat(impressions) || 0
        const cl = parseFloat(clicks) || 0
        const inc = parseFloat(income) || 0
        const l = parseFloat(leads) || 0
        const s = parseFloat(sales) || 0

        // Avoid division by zero
        const safeDiv = (num: number, den: number) => (den !== 0 ? num / den : null)

        setMetrics({
            roi: c !== 0 ? ((inc - c) / c) * 100 : null,
            roas: c !== 0 ? (inc / c) * 100 : null,
            profit: inc - c,
            cpm: i !== 0 ? (c / i) * 1000 : null,
            cpc: safeDiv(c, cl),
            cpa: safeDiv(c, l),
            ctr: i !== 0 ? (cl / i) * 100 : null,
            ctc: cl !== 0 ? (l / cl) * 100 : null,
            ctb: l !== 0 ? (s / l) * 100 : null,
            apv: safeDiv(inc, s),
            apc: safeDiv(inc - c, s),
        })
    }, [cost, impressions, clicks, income, leads, sales])

    const clearForm = () => {
        setCost("")
        setImpressions("")
        setClicks("")
        setIncome("")
        setLeads("")
        setSales("")
    }

    const formatCurrency = (val: number | null) => {
        if (val === null) return "0.00 USD"
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val)
    }

    const formatPercent = (val: number | null) => {
        if (val === null) return "0%"
        return val.toFixed(2) + "%"
    }

    const loc = (key: keyof typeof localizedText) => {
        const val = localizedText[key] as any
        return val[language as 'en' | 'ru'] || val['en']
    }

    const tInput = (key: keyof typeof localizedText.inputs) => {
        const val = localizedText.inputs[key] as any
        return val[language as 'en' | 'ru'] || val['en']
    }

    const tMetric = (key: keyof typeof localizedText.metrics) => {
        const val = localizedText.metrics[key] as any
        return val[language as 'en' | 'ru'] || val['en']
    }

    const currentLang = (language === 'ru' ? 'ru' : 'en') as 'en' | 'ru';

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
                        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">{loc("subtitle")}</p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">
                        {/* Left Column: Inputs */}
                        <div className="md:col-span-12 lg:col-span-5 space-y-6">
                            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{loc("enterData")}</h3>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { id: "cost", value: cost, set: setCost, icon: <DollarSign size={16} /> },
                                        { id: "impressions", value: impressions, set: setImpressions, icon: <Users size={16} /> },
                                        { id: "clicks", value: clicks, set: setClicks, icon: <MousePointer size={16} /> },
                                        { id: "income", value: income, set: setIncome, icon: <TrendingUp size={16} /> },
                                        { id: "leads", value: leads, set: setLeads, icon: <CheckCircle size={16} /> },
                                        { id: "sales", value: sales, set: setSales, icon: <ShoppingCart size={16} /> },
                                    ].map((item) => (
                                        <div key={item.id}>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                {tInput(item.id as any)}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={item.value}
                                                onChange={(e) => item.set(e.target.value)}
                                                placeholder="0"
                                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={clearForm}
                                    className="w-full mt-6 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={16} />
                                    {loc("reset")}
                                </button>
                            </div>
                        </div>

                        {/* Right Column: Results Grid */}
                        <div className="md:col-span-12 lg:col-span-7">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Metric Cards */}
                                <MetricCard
                                    label="ROI"
                                    value={formatPercent(metrics.roi)}
                                    desc={tMetric("roi")}
                                    icon={<TrendingUp className="text-emerald-500" />}
                                    detailsKey="roi"
                                    language={currentLang}
                                />
                                <MetricCard
                                    label="ROAS"
                                    value={formatPercent(metrics.roas)}
                                    desc={tMetric("roas")}
                                    icon={<TrendingUp className="text-sky-500" />}
                                    detailsKey="roas"
                                    language={currentLang}
                                />
                                <MetricCard
                                    label="Profit"
                                    value={formatCurrency(metrics.profit)}
                                    desc={tMetric("profit")}
                                    icon={<DollarSign className={metrics.profit && metrics.profit > 0 ? "text-emerald-500" : "text-gray-400"} />}
                                    detailsKey="profit"
                                    language={currentLang}
                                />

                                <MetricCard label="CPM" value={formatCurrency(metrics.cpm)} desc={tMetric("cpm")} detailsKey="cpm" language={currentLang} />
                                <MetricCard label="CPC" value={formatCurrency(metrics.cpc)} desc={tMetric("cpc")} detailsKey="cpc" language={currentLang} />
                                <MetricCard label="CPA" value={formatCurrency(metrics.cpa)} desc={tMetric("cpa")} detailsKey="cpa" language={currentLang} />

                                <MetricCard label="CTR" value={formatPercent(metrics.ctr)} desc={tMetric("ctr")} detailsKey="ctr" language={currentLang} />
                                <MetricCard label="CTC" value={formatPercent(metrics.ctc)} desc={tMetric("ctc")} detailsKey="ctc" language={currentLang} />
                                <MetricCard label="CTB" value={formatPercent(metrics.ctb)} desc={tMetric("ctb")} detailsKey="ctb" language={currentLang} />

                                <MetricCard label="APV" value={formatCurrency(metrics.apv)} desc={tMetric("apv")} detailsKey="apv" language={currentLang} />
                                <MetricCard label="APC" value={formatCurrency(metrics.apc)} desc={tMetric("apc")} detailsKey="apc" language={currentLang} />
                            </div>
                        </div>
                    </div>

                    <SeoIntro seoData={localizedText.seoIntro} language={currentLang} />

                    <FaqAccordion faqData={localizedText.faq} language={currentLang} />

                    <div className="mt-12">
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
    )
}

function MetricCard({
    label,
    value,
    desc,
    icon,
    detailsKey,
    language
}: {
    label: string,
    value: string,
    desc: string,
    icon?: React.ReactNode,
    detailsKey?: keyof typeof localizedText.metricDetails,
    language: 'en' | 'ru'
}) {
    const details = detailsKey ? localizedText.metricDetails[detailsKey] : null;

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-colors flex flex-col justify-between h-full relative group">
            <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">{label}</div>
                <div className="flex items-center gap-2">
                    {icon}
                    {details && (
                        <div className="cursor-help text-gray-400 hover:text-sky-500 transition-colors">
                            <HelpCircle size={16} />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 truncate" title={value}>{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
            </div>

            {/* Tooltip Content */}
            {details && (
                <div className="absolute z-20 w-72 p-5 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 top-full left-1/2 -translate-x-1/2 lg:-translate-x-3/4">
                    <div className="text-sm space-y-4">
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">{language === 'ru' ? 'Описание' : 'Description'}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{details.desc[language]}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">{language === 'ru' ? 'Как просчитывается' : 'How it is calculated'}</p>
                            <p className="text-gray-800 dark:text-gray-200 text-xs font-mono bg-sky-50 dark:bg-sky-900/40 p-2 rounded-lg border border-sky-100 dark:border-sky-800">{details.calc[language]}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">{language === 'ru' ? 'Где смотреть' : 'Where to find'}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-line">{details.where[language]}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">{language === 'ru' ? 'На что влияет' : 'What it affects'}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">{details.affects[language]}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white mb-1">{language === 'ru' ? 'Как повлиять на метрику' : 'How to improve'}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed whitespace-pre-line">{details.improve[language]}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function SeoIntro({ seoData, language }: { seoData: typeof localizedText.seoIntro, language: 'en' | 'ru' }) {
    return (
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200 dark:border-gray-700/50 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{seoData.title[language]}</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p className="leading-relaxed">{seoData.p1[language]}</p>
                <p className="leading-relaxed">{seoData.p2[language]}</p>

                <div className="mt-8 bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50">
                    <p className="font-semibold text-gray-900 dark:text-white mb-4 text-lg">{seoData.listIntro[language]}</p>
                    <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                        {seoData.list[language].map((listItem, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 p-1 rounded-full mt-0.5 shrink-0">
                                    <CheckCircle size={16} />
                                </span>
                                <span className="pt-0.5">{listItem}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function FaqAccordion({ faqData, language }: { faqData: typeof localizedText.faq, language: 'en' | 'ru' }) {
    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{faqData.title[language]}</h2>
            <div className="space-y-4">
                {faqData.items.map((item, idx) => (
                    <details key={idx} className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-sm overflow-hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 font-medium text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                            <h3 className="text-base sm:text-lg">{item.q[language]}</h3>
                            <span className="shrink-0 transition-transform duration-300 group-open:-rotate-180 bg-gray-50 dark:bg-gray-900 p-2 rounded-full">
                                <ChevronDown size={20} className="text-gray-500 dark:text-gray-400" />
                            </span>
                        </summary>
                        <div className="px-6 pb-6 pt-0">
                            <div className="border-t border-gray-100 dark:border-gray-700/50 pt-5">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {item.a[language]}
                                </p>
                            </div>
                        </div>
                    </details>
                ))}
            </div>
        </div>
    )
}
