"use client"

import type { Job } from "@/mock/jobs"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { MapPin, Building2, Wallet, Briefcase } from "lucide-react"
import Link from "next/link"

export default function JobCard({ job }: { job: Job }) {
    const { t, language } = useLanguage()
    const { audience } = useAudience()

    // Format salary if needed, or just display as is
    // Format location to be capitalized
    const locationLabel = job.location ? t(`jobs.loc.${job.location}`) : null
    const experienceLabel = job.experience ? t(`jobs.exp.${job.experience}`) : null
    const positionLabel = job.position ? t(`jobs.pos.${job.position}`) : null
    const levelLabel = job.level ? t(`jobs.lvl.${job.level}`) : null
    const salaryLabel = job.salary ? t(`jobs.sal.${job.salary}`) : null

    // Check if translation exists (t returns key if not found)
    const isValid = (label: string | null, keyPart: string) => {
        if (!label) return false
        return !label.includes(`jobs.${keyPart}.`) && !label.includes('null')
    }

    // Simplify the link path
    const detailHref = `/${language}/${audience}/jobs/${job.slug}`

    const publishedDate = new Date(job.publishedAt || job.createdAt).toLocaleDateString(language === 'ru' ? 'ru' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col sm:flex-row gap-6">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href={detailHref} className="relative z-10 block">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center border border-gray-100 dark:border-gray-800 p-2">
                            {job.companyLogo ? (
                                <img
                                    src={job.companyLogo}
                                    alt={job.companyName}
                                    className="w-full h-full object-contain rounded-full"
                                />
                            ) : (
                                <Building2 className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                    </Link>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                            <Link href={detailHref} className="block relative z-10">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                                    {job.title}
                                </h3>
                            </Link>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{job.companyName}</p>
                                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                                <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">{publishedDate}</span>
                            </div>
                        </div>
                        {isValid(locationLabel, 'loc') && (
                            <div className="bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 shrink-0">
                                {locationLabel}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6 mt-3">
                        {isValid(positionLabel, 'pos') && (
                            <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-[11px] font-bold rounded-lg border border-gray-100/50 dark:border-gray-700/50">
                                {positionLabel}
                            </span>
                        )}
                        {isValid(levelLabel, 'lvl') && (
                            <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-[11px] font-bold rounded-lg border border-gray-100/50 dark:border-gray-700/50">
                                {levelLabel}
                            </span>
                        )}
                        {isValid(experienceLabel, 'exp') && (
                            <span className="px-3 py-1 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-[11px] font-bold rounded-lg border border-gray-100/50 dark:border-gray-700/50">
                                {experienceLabel}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                            <Wallet className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-bold">{isValid(salaryLabel, 'sal') ? salaryLabel : (t('jobs.sal.after_interview') || 'Negotiable')}</span>
                        </div>
                        <Link
                            href={detailHref}
                            className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                            {t("common.viewDetail") || "View"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
