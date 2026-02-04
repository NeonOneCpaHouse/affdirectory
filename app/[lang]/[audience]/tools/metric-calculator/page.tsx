"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import Breadcrumbs from "@/components/Breadcrumbs"
import { RefreshCw, Calculator, TrendingUp, DollarSign, Users, MousePointer, ShoppingCart, Percent } from "lucide-react"
import AdSlot from "@/components/AdSlot"

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

    const localizedText = {
        title: { en: "Metric Calculator", ru: "Калькулятор метрик" },
        subtitle: {
            en: "Calculates ROI, ROAS, CPM, CPC and other key metrics to control advertising efficiency and optimize budget.",
            ru: "Мгновенно рассчитывайте ROI, ROAS, CPM и CPA, чтобы контролировать эффективность рекламы и оптимизировать бюджет."
        },
        enterData: { en: "Enter your data", ru: "Введите ваши показатели" },
        reset: { en: "Reset", ru: "Сбросить" },
        inputs: {
            cost: { en: "Cost (Ad Spend)", ru: "Расход" },
            impressions: { en: "Impressions", ru: "Просмотры" },
            clicks: { en: "Clicks", ru: "Клики" },
            income: { en: "Income (Revenue)", ru: "Доход" },
            leads: { en: "Leads (Conversions)", ru: "Заявки" },
            sales: { en: "Sales", ru: "Продажи" },
        },
        metrics: {
            roi: { en: "Return on Investment", ru: "Возврат инвестиций" },
            roas: { en: "Return on Ad Spend", ru: "Окупаемость рекламы" },
            profit: { en: "Net Profit", ru: "Чистая прибыль" },
            cpm: { en: "Cost Per Mille (1000 views)", ru: "Цена за 1000 показов" },
            cpc: { en: "Cost Per Click", ru: "Цена клика" },
            cpa: { en: "Cost Per Action", ru: "Цена действия" },
            ctr: { en: "Click-Through Rate", ru: "Кликабельность" },
            ctc: { en: "Click to Conversion", ru: "Клики в действия" },
            ctb: { en: "Click to Buy", ru: "Действия в покупки" }, // "Продажи / Заявки" usually "Conversion Rate (Lead to Sale)"
            apv: { en: "Average Purchase Value", ru: "Средний чек покупки" },
            apc: { en: "Average Profit Contribution", ru: "Средняя прибыль с продажи" },
        }
    }

    const loc = (key: keyof typeof localizedText) => {
        const val = localizedText[key] as any
        return val[language] || val['en']
    }

    const tInput = (key: keyof typeof localizedText.inputs) => {
        const val = localizedText.inputs[key] as any
        return val[language] || val['en']
    }

    const tMetric = (key: keyof typeof localizedText.metrics) => {
        const val = localizedText.metrics[key] as any
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
                        <p className="text-gray-500 dark:text-gray-400 max-w-3xl">{loc("subtitle")}</p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8">
                        {/* Left Column: Inputs */}
                        <div className="md:col-span-5 space-y-6">
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
                        <div className="md:col-span-7">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Metric Cards */}
                                <MetricCard
                                    label="ROI"
                                    value={formatPercent(metrics.roi)}
                                    desc={tMetric("roi")}
                                    icon={<TrendingUp className="text-emerald-500" />}
                                />
                                <MetricCard
                                    label="ROAS"
                                    value={formatPercent(metrics.roas)}
                                    desc={tMetric("roas")}
                                    icon={<TrendingUp className="text-sky-500" />}
                                />
                                <MetricCard
                                    label="Profit"
                                    value={formatCurrency(metrics.profit)}
                                    desc={tMetric("profit")}
                                    icon={<DollarSign className={metrics.profit && metrics.profit > 0 ? "text-emerald-500" : "text-gray-400"} />}
                                />

                                <MetricCard label="CPM" value={formatCurrency(metrics.cpm)} desc={tMetric("cpm")} />
                                <MetricCard label="CPC" value={formatCurrency(metrics.cpc)} desc={tMetric("cpc")} />
                                <MetricCard label="CPA" value={formatCurrency(metrics.cpa)} desc={tMetric("cpa")} />

                                <MetricCard label="CTR" value={formatPercent(metrics.ctr)} desc={tMetric("ctr")} />
                                <MetricCard label="CTC" value={formatPercent(metrics.ctc)} desc={tMetric("ctc")} />
                                <MetricCard label="CTB" value={formatPercent(metrics.ctb)} desc={tMetric("ctb")} />

                                <MetricCard label="APV" value={formatCurrency(metrics.apv)} desc={tMetric("apv")} />
                                <MetricCard label="APC" value={formatCurrency(metrics.apc)} desc={tMetric("apc")} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <AdSlot slotKey="inline" />
                    </div>
                </div>

                <aside className="w-full lg:w-[300px]">
                    <div className="sticky top-8">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    )
}

function MetricCard({ label, value, desc, icon }: { label: string, value: string, desc: string, icon?: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700 transition-colors flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">{label}</div>
                {icon}
            </div>
            <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{desc}</div>
            </div>
        </div>
    )
}

function CheckCircle({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
    )
}
