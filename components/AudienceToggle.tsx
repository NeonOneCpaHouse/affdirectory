"use client"

import { useAudience } from "@/context/AudienceContext"
import { useLanguage } from "@/context/LanguageContext"
import { Briefcase, Monitor } from "lucide-react"

export default function AudienceToggle() {
    const { audience, setAudience } = useAudience()
    const { t } = useLanguage()

    return (
        <div className="relative group">
            {/* Gradient border glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />

            {/* Main toggle container */}
            <div className="relative flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-accent-200 dark:border-gray-700">
                <button
                    onClick={() => setAudience("affiliate")}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${audience === "affiliate"
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 dark:shadow-sky-500/20"
                        : "text-gray-600 hover:text-sky-600 hover:bg-sky-50 dark:text-gray-400 dark:hover:text-sky-400 dark:hover:bg-gray-700"
                        }`}
                >
                    <Briefcase className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("nav.affiliate")}</span>
                </button>
                <button
                    onClick={() => setAudience("webmaster")}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${audience === "webmaster"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 dark:shadow-emerald-500/20"
                        : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-gray-400 dark:hover:text-emerald-400 dark:hover:bg-gray-700"
                        }`}
                >
                    <Monitor className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("nav.webmaster")}</span>
                </button>
            </div>
        </div>
    )
}
