"use client"

import { useState, useRef, useEffect } from "react"
import type { Job } from "@/mock/jobs"
import { useLanguage } from "@/context/LanguageContext"
import JobCard from "./JobCard"
import AdSlot from "./AdSlot"
import { MapPin, Search, Briefcase, ChevronDown, RotateCcw, Filter, Check } from "lucide-react"

export default function JobsClientPage({ jobs }: { jobs: Job[] }) {
    const { t, language } = useLanguage()

    // Applied state (used for filtering the actual list)
    const [appliedFilters, setAppliedFilters] = useState({
        location: [] as string[],
        experience: [] as string[],
        position: [] as string[],
        level: [] as string[],
    })

    // Draft state (used for dropdown selections before clicking Apply)
    const [draftFilters, setDraftFilters] = useState({
        location: [] as string[],
        experience: [] as string[],
        position: [] as string[],
        level: [] as string[],
    })

    const [searchQuery, setSearchQuery] = useState("")

    const filteredJobs = jobs.filter((job) => {
        const matchesLocation = appliedFilters.location.length === 0 || appliedFilters.location.includes(job.location)
        const matchesExperience = appliedFilters.experience.length === 0 || appliedFilters.experience.includes(job.experience)
        const matchesPosition = appliedFilters.position.length === 0 || appliedFilters.position.includes(job.position)
        const matchesLevel = appliedFilters.level.length === 0 || appliedFilters.level.includes(job.level)

        const matchesSearch =
            searchQuery === "" ||
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.requirements?.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesLocation && matchesExperience && matchesPosition && matchesLevel && matchesSearch
    })

    const handleApplyFilters = () => {
        setAppliedFilters(draftFilters)
    }

    const handleResetFilters = () => {
        const resetState = {
            location: [],
            experience: [],
            position: [],
            level: [],
        }
        setDraftFilters(resetState)
        setAppliedFilters(resetState)
        setSearchQuery("")
    }

    const locations = [
        { value: "remote", label: t("jobs.loc.remote") },
        { value: "office", label: t("jobs.loc.office") },
        { value: "hybrid", label: t("jobs.loc.hybrid") },
    ]

    const experiences = [
        { value: "no_experience", label: t("jobs.exp.no_experience") },
        { value: "1_year", label: t("jobs.exp.1_year") },
        { value: "2_years", label: t("jobs.exp.2_years") },
        { value: "3_years", label: t("jobs.exp.3_years") },
        { value: "3_plus_years", label: t("jobs.exp.3_plus_years") },
    ]

    const positions = [
        { value: "hr", label: t("jobs.pos.hr") },
        { value: "smm", label: t("jobs.pos.smm") },
        { value: "copywriter", label: t("jobs.pos.copywriter") },
        { value: "seo", label: t("jobs.pos.seo") },
        { value: "designer", label: t("jobs.pos.designer") },
        { value: "marketing", label: t("jobs.pos.marketing") },
        { value: "pr", label: t("jobs.pos.pr") },
        { value: "affiliate_manager", label: t("jobs.pos.affiliate_manager") },
        { value: "sales_manager", label: t("jobs.pos.sales_manager") },
        { value: "project_manager", label: t("jobs.pos.project_manager") },
        { value: "account_manager", label: t("jobs.pos.account_manager") },
        { value: "farmer", label: t("jobs.pos.farmer") },
        { value: "tech_specialist", label: t("jobs.pos.tech_specialist") },
        { value: "media_buyer", label: t("jobs.pos.media_buyer") },
        { value: "bizdev", label: t("jobs.pos.bizdev") },
    ]

    const levels = [
        { value: "junior", label: t("jobs.lvl.junior") },
        { value: "middle", label: t("jobs.lvl.middle") },
        { value: "senior", label: t("jobs.lvl.senior") },
        { value: "team_lead", label: t("jobs.lvl.team_lead") },
        { value: "c_level", label: t("jobs.lvl.c_level") },
    ]

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
        const menuRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                    menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
                        <div ref={menuRef} className="absolute z-[100] mt-2 w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl py-2 max-h-60 overflow-y-auto animate-in fade-in zoom-in duration-200">
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        toggleOption(opt.value)
                                    }}
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
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    {t("jobs.title")}
                </h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl">
                    {t("jobs.subtitle")}
                </p>
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-6 mb-10 shadow-sm relative">
                <div className="flex flex-wrap gap-6 mb-8">
                    <MultiSelectDropdown
                        label={t("jobs.location")}
                        options={locations}
                        value={draftFilters.location}
                        onChange={(val) => setDraftFilters({ ...draftFilters, location: val })}
                        placeholder={t("jobs.allLocations")}
                    />
                    <MultiSelectDropdown
                        label={language === "ru" ? "Тип Позиции" : "Job Position"}
                        options={positions}
                        value={draftFilters.position}
                        onChange={(val) => setDraftFilters({ ...draftFilters, position: val })}
                        placeholder={t("jobs.allPositions")}
                    />
                    <MultiSelectDropdown
                        label={language === "ru" ? "Уровень" : "Level"}
                        options={levels}
                        value={draftFilters.level}
                        onChange={(val) => setDraftFilters({ ...draftFilters, level: val })}
                        placeholder={t("jobs.allLevels")}
                    />
                    <MultiSelectDropdown
                        label={t("jobs.experience")}
                        options={experiences}
                        value={draftFilters.experience}
                        onChange={(val) => setDraftFilters({ ...draftFilters, experience: val })}
                        placeholder={t("jobs.allExperiences")}
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

                    <div className="relative w-full sm:max-w-xs">
                        <input
                            type="text"
                            placeholder={t("jobs.searchPlaceholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all shadow-sm"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </div>
            </div>



            <div className="flex flex-col lg:flex-row gap-10">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 gap-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <div key={job.id}>
                                    <JobCard job={job} />
                                    {index === 0 && (
                                        <div className="lg:hidden my-6">
                                            <AdSlot slotKey="sidebar" />
                                        </div>
                                    )}
                                    {index === 2 && (
                                        <div className="my-6">
                                            <AdSlot slotKey="inline" />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-gray-50/50 dark:bg-gray-800/20 rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800">
                                <p className="text-xl font-bold text-gray-400 dark:text-gray-600">{t("jobs.noJobs")}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="hidden lg:block w-full lg:w-[320px] shrink-0">
                    <div className="sticky top-24">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    )
}
