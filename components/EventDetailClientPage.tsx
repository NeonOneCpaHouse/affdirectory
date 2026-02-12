"use client"

import type { Event } from "@/mock/events"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { Calendar, MapPin, Tag, ChevronLeft, Building2, Ticket } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { ru, enUS } from "date-fns/locale"
import AdSlot from "./AdSlot"
import { PortableText } from "@portabletext/react"

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
            <div className="mb-8">
                <AdSlot slotKey="leaderboard" fullWidth />
            </div>

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
                        <div className="relative w-full">
                            {event.coverImage ? (
                                <img
                                    src={event.coverImage}
                                    alt={event.name}
                                    className="w-full h-auto"
                                />
                            ) : (
                                <div className="w-full aspect-[21/9] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <Calendar className="w-16 h-16 text-gray-300" />
                                </div>
                            )}
                        </div>

                        {/* Content Header */}
                        <div className="p-8 md:p-10 border-b border-gray-50 dark:border-gray-800">
                            <div className="flex flex-col gap-4 mb-8">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                                        {event.name}
                                    </h1>

                                    {/* Buy Tickets Button */}
                                    {event.ticketUrl && (
                                        <a
                                            href={event.ticketUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-accent-500/20 active:scale-95 shrink-0 whitespace-nowrap"
                                        >
                                            <Ticket className="w-5 h-5" />
                                            {language === "ru" ? "Купить Билеты" : "Buy Tickets"}
                                        </a>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(event.category) ? (
                                        event.category.map((cat, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                                {cat}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                                            {event.category}
                                        </span>
                                    )}
                                </div>
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
                        <div className="lg:hidden p-8 border-b border-gray-50 dark:border-gray-800 text-center">
                            <AdSlot slotKey="sidebar" />
                        </div>

                        {/* Description */}
                        {event.description && (
                            <div className="p-8 md:p-10">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    {language === "ru" ? "Об ивенте" : "About the event"}
                                </h2>
                                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                    {typeof event.description === 'string' ? (
                                        <p className="whitespace-pre-line">{event.description}</p>
                                    ) : (
                                        <PortableText
                                            value={event.description}
                                            components={{
                                                block: {
                                                    h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">{children}</h2>,
                                                    h3: ({ children }) => <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">{children}</h3>,
                                                    h4: ({ children }) => <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2">{children}</h4>,
                                                    normal: ({ children }) => <p className="mb-4 text-gray-600 dark:text-gray-400">{children}</p>,
                                                    blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-500 pl-4 py-2 my-4 italic bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">{children}</blockquote>,
                                                },
                                                list: {
                                                    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
                                                    number: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
                                                },
                                                listItem: {
                                                    bullet: ({ children }) => <li className="text-gray-600 dark:text-gray-400">{children}</li>,
                                                    number: ({ children }) => <li className="text-gray-600 dark:text-gray-400">{children}</li>,
                                                },
                                                marks: {
                                                    link: ({ children, value }) => {
                                                        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                                                        return (
                                                            <a href={value.href} rel={rel} className="text-accent-600 hover:text-accent-700 underline decoration-accent-600/30 hover:decoration-accent-700 transition-colors">
                                                                {children}
                                                            </a>
                                                        )
                                                    },
                                                }
                                            }}
                                        />
                                    )}
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
                <aside className="hidden lg:block w-full lg:w-[300px]">
                    <div className="sticky top-24">
                        <AdSlot slotKey="sidebar" />
                    </div>
                </aside>
            </div>
        </div >
    )
}
