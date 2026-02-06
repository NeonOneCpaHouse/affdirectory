"use client"

import type { Event } from "@/mock/events"
import Link from "next/link"
import { useAudience } from "@/context/AudienceContext"
import { Calendar, MapPin, Tag } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { format } from "date-fns"
import { ru, enUS } from "date-fns/locale"

export default function EventCard({ event }: { event: Event }) {
    const { language } = useLanguage()
    const { audience } = useAudience()
    const dateObj = new Date(event.date)

    const day = format(dateObj, "dd")
    const month = format(dateObj, "MMM", { locale: language === "ru" ? ru : enUS }).toUpperCase()

    const detailHref = `/${language}/${audience}/events/${event.slug}`

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
            {/* Target Image Container */}
            <Link href={detailHref} className="relative aspect-[16/10] overflow-hidden block">
                {event.coverImage ? (
                    <img
                        src={event.coverImage}
                        alt={event.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-gray-300" />
                    </div>
                )}

                {/* Date Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl p-2.5 min-w-[60px] text-center shadow-lg border border-white/20">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white leading-none mb-1">{day}</div>
                    <div className="text-[10px] font-bold text-accent-600 tracking-wider ">{month}</div>
                </div>
            </Link>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <Link href={detailHref}>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-accent-600 transition-colors">
                        {event.name}
                    </h3>
                </Link>

                <div className="mt-auto space-y-2.5">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-accent-500" />
                            <span className="font-medium">{event.location}</span>
                        </div>
                        {Array.isArray(event.category) ? (
                            event.category.map((cat, index) => (
                                <span key={index} className="px-2.5 py-1 bg-accent-50 dark:bg-accent-900/30 text-accent-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {cat}
                                </span>
                            ))
                        ) : (
                            <span className="px-2.5 py-1 bg-accent-50 dark:bg-accent-900/30 text-accent-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                {event.category}
                            </span>
                        )}
                    </div>

                    {event.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-3 leading-relaxed">
                            {typeof event.description === 'string'
                                ? event.description
                                : Array.isArray(event.description)
                                    ? event.description
                                        .filter((block: any) => block._type === 'block')
                                        .map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ')
                                    : ''
                            }
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
