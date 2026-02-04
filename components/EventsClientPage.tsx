"use client"

import { useState, useRef, useEffect } from "react"
import type { Event } from "@/mock/events"
import { useLanguage } from "@/context/LanguageContext"
import EventCard from "./EventCard"
import AdSlot from "./AdSlot"
import { Calendar, MapPin, Search, ChevronDown, RotateCcw, Filter, Check } from "lucide-react"

export default function EventsClientPage({ events }: { events: Event[] }) {
    const { t, language } = useLanguage()

    // Applied state
    const [appliedFilters, setAppliedFilters] = useState({
        region: [] as string[],
        category: [] as string[],
        month: [] as string[],
    })

    // Draft state
    const [draftFilters, setDraftFilters] = useState({
        region: [] as string[],
        category: [] as string[],
        month: [] as string[],
    })

    const filteredEvents = events.filter((event) => {
        const matchesRegion = appliedFilters.region.length === 0 || appliedFilters.region.includes(event.region)
        const matchesCategory = appliedFilters.category.length === 0 || appliedFilters.category.includes(event.category)

        let matchesMonth = true
        if (appliedFilters.month.length > 0) {
            const date = new Date(event.date)
            const monthStr = (date.getMonth() + 1).toString()
            matchesMonth = appliedFilters.month.includes(monthStr)
        }

        return matchesRegion && matchesCategory && matchesMonth
    })

    const handleApplyFilters = () => {
        setAppliedFilters(draftFilters)
    }

    const handleResetFilters = () => {
        const resetState = {
            region: [],
            category: [],
            month: [],
        }
        setDraftFilters(resetState)
        setAppliedFilters(resetState)
    }

    const regions = [
        { value: "cis", label: t("events.reg.cis") },
        { value: "europe", label: t("events.reg.europe") },
        { value: "us", label: t("events.reg.us") },
        { value: "middle_east", label: t("events.reg.middle_east") },
        { value: "latin_america", label: t("events.reg.latin_america") },
        { value: "asia", label: t("events.reg.asia") },
        { value: "online", label: t("events.reg.online") },
    ]

    const categories = Array.from(new Set(events.map(e => e.category))).map(cat => ({
        value: cat,
        label: cat
    }))

    const months = Array.from({ length: 12 }, (_, i) => ({
        value: (i + 1).toString(),
        label: new Date(2024, i, 1).toLocaleDateString(language === 'ru' ? 'ru' : 'en-US', { month: 'long' })
    }))

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
                                    onClick={() => toggleOption(opt.value)}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Leaderboard Banner */}
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-6 mb-10 shadow-sm relative">
                <div className="flex flex-wrap gap-6 mb-8">
                    <MultiSelectDropdown
                        label={t("events.date")}
                        options={months}
                        value={draftFilters.month}
                        onChange={(val) => setDraftFilters({ ...draftFilters, month: val })}
                        placeholder={t("events.selectMonth")}
                    />
                    <MultiSelectDropdown
                        label={t("events.region")}
                        options={regions}
                        value={draftFilters.region}
                        onChange={(val) => setDraftFilters({ ...draftFilters, region: val })}
                        placeholder={t("events.allRegions")}
                    />
                    <MultiSelectDropdown
                        label={t("common.allFormatsFilter")}
                        options={categories}
                        value={draftFilters.category}
                        onChange={(val) => setDraftFilters({ ...draftFilters, category: val })}
                        placeholder={t("events.allCategories")}
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
                </div>
            </div>



            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event, index) => (
                                <div key={event.id}>
                                    <EventCard event={event} />
                                    {index === 1 && (
                                        <div className="lg:hidden my-6">
                                            <AdSlot slotKey="sidebar" />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                                    {t("events.noEvents") || "No events found."}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Inline Banner */}
                    <div className="mb-12">
                        <AdSlot slotKey="inline" />
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block w-full lg:w-[300px]">
                    <div className="sticky top-24">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    )
}
