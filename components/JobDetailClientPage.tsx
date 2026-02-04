"use client"

import type { Job } from "@/mock/jobs"
import { useLanguage } from "@/context/LanguageContext"
import { MapPin, Building2, Wallet, Briefcase, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useAudience } from "@/context/AudienceContext"
import AdSlot from "@/components/AdSlot"

export default function JobDetailClientPage({ job }: { job: Job }) {
    const { t, language } = useLanguage()
    const { audience } = useAudience()

    const locationLabel = job.location ? t(`jobs.loc.${job.location}`) : null
    const experienceLabel = job.experience ? t(`jobs.exp.${job.experience}`) : null
    const positionLabel = job.position ? t(`jobs.pos.${job.position}`) : null
    const levelLabel = job.level ? t(`jobs.lvl.${job.level}`) : null
    const salaryLabel = job.salary ? t(`jobs.sal.${job.salary}`) : null

    const isValid = (label: string | null, keyPart: string) => {
        if (!label) return false
        return !label.includes(`jobs.${keyPart}.`) && !label.includes('null')
    }

    const publishedDate = new Date(job.publishedAt || job.createdAt).toLocaleDateString(language === 'ru' ? 'ru' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Link */}
            <Link
                href={`/${language}/${audience}/jobs`}
                className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 group"
            >
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                {t("jobs.backToJobs")}
            </Link>

            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] overflow-hidden shadow-sm">
                        {/* Header Section */}
                        <div className="p-8 md:p-12 border-b border-gray-50 dark:border-gray-800">
                            <div className="flex flex-col md:flex-row gap-10">
                                {/* Logo */}
                                <div className="flex flex-col items-center md:items-start shrink-0">
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-700 p-4">
                                        {job.companyLogo ? (
                                            <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain rounded-full" />
                                        ) : (
                                            <Building2 className="w-12 h-12 text-gray-300" />
                                        )}
                                    </div>
                                </div>

                                {/* Title and Stats */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                                        <div>
                                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-tight">
                                                {job.title}
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{job.companyName}</p>
                                                <span className="text-gray-300 dark:text-gray-700 font-bold hidden sm:inline">•</span>
                                                <span className="text-sm font-bold text-gray-400 dark:text-gray-500">{publishedDate}</span>
                                            </div>
                                        </div>
                                        <a
                                            href={job.ctaUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 whitespace-nowrap"
                                        >
                                            {job.ctaText}
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        {isValid(locationLabel, 'loc') && (
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                                                    {t("jobs.location")}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{locationLabel}</p>
                                            </div>
                                        )}
                                        {isValid(positionLabel, 'pos') && (
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                                                    {language === "ru" ? "Позиция" : "Position"}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{positionLabel}</p>
                                            </div>
                                        )}
                                        {isValid(levelLabel, 'lvl') && (
                                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                                                    {language === "ru" ? "Уровень" : "Level"}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{levelLabel}</p>
                                            </div>
                                        )}
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100/50 dark:border-gray-700/50">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                                                {language === "ru" ? "Оплата" : "Salary"}
                                            </p>
                                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                                {isValid(salaryLabel, 'sal') ? salaryLabel : (t('jobs.sal.after_interview') || 'Negotiable')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:hidden p-8 border-b border-gray-50 dark:border-gray-800 text-center">
                            <AdSlot slotKey="sidebar" />
                        </div>

                        {/* Body Content */}
                        <div className="p-8 md:p-12 space-y-12 bg-white dark:bg-gray-900">
                            {job.aboutCompany && (
                                <section>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                        {t("jobs.aboutCompany")}
                                    </h2>
                                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {job.aboutCompany}
                                    </div>
                                </section>
                            )}

                            {job.responsibilities && (
                                <section>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                        {t("jobs.responsibilities")}
                                    </h2>
                                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                        {job.responsibilities}
                                    </div>
                                </section>
                            )}

                            {job.requirements && (
                                <section>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                        {t("jobs.requirements")}
                                    </h2>
                                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                        {job.requirements}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                    {/* Inline Ad Outside Card */}
                    <div className="mt-8 mb-12">
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
