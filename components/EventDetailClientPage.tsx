"use client"

import type { Event } from "@/mock/events"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { Calendar, MapPin, Tag, ChevronLeft, Building2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ru, enUS } from "date-fns/locale"
import AdSlot from "./AdSlot"

export default function EventDetailClientPage({ event }: { event: Event }) {
    const { t, language } = useLanguage()
    const { audience } = useAudience()
    const dateObj = new Date(event.date)

    const day = format(dateObj, "dd")
    const month = format(dateObj, "MMMM", { locale: language === "ru" ? ru : enUS })
    const year = format(dateObj, "yyyy")
    const fullDate = format(dateObj, "PPP", { locale: language === "ru" ? ru : enUS })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Link */}
            <Link
                href={`/${language}/${audience}/events`}
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8 transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                {language === "ru" ? "Назад к ивентам" : "Back to events"}
            </Link>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
                        {/* Hero Image */}
                        <div className="relative aspect-[21/9] w-full overflow-hidden">
                            {event.coverImage ? (
                                <img
                                    src={event.coverImage}
                                    alt={event.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <Calendar className="w-16 h-16 text-gray-300" />
                                </div>
                            )}
                        </div>

                        {/* Content Header */}
                        <div className="p-8 md:p-10 border-b border-gray-50 dark:border-gray-800">
                            <div className="flex items-center gap-3 mb-6">
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                                    {event.name}
                                </h1>
                                <span className="px-3 py-1 bg-accent-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm shrink-0">
                                    {event.category}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 mt-1">
                                        <Calendar className="w-6 h-6 text-accent-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                                            {language === "ru" ? "Дата" : "Date"}
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{fullDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700 mt-1">
                                        <MapPin className="w-6 h-6 text-accent-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
                                            {language === "ru" ? "Местоположение" : "Location"}
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">{event.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        {event.description && (
                            <div className="p-8 md:p-10">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    {language === "ru" ? "Об ивенте" : "About the event"}
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 text-lg leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Inline Banner */}
                    <div className="mt-8 mb-12">
                        <AdSlot slotKey="inline" />
                    </div>
                </div>

                {/* Sidebar */}
                <aside className="w-full lg:w-[300px]">
                    <div className="sticky top-24">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div>
    )
}
