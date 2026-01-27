"use client"

import { useAudience } from "@/context/AudienceContext"
import { Briefcase, Monitor } from "lucide-react"

export default function AudienceToggle() {
    const { audience, setAudience } = useAudience()

    return (
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
                onClick={() => setAudience("affiliate")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${audience === "affiliate"
                        ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
            >
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Affiliate</span>
            </button>
            <button
                onClick={() => setAudience("webmaster")}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${audience === "webmaster"
                        ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm"
                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
            >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Webmaster</span>
            </button>
        </div>
    )
}
