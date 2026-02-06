"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { getActivePopup, type Popup as PopupType } from "@/mock/popups"

const POPUP_DISMISSED_KEY = "popup_dismissed_"
const DISMISS_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

function isPopupDismissed(popupId: string): boolean {
    if (typeof window === "undefined") return true
    const dismissedAt = localStorage.getItem(POPUP_DISMISSED_KEY + popupId)
    if (!dismissedAt) return false
    return Date.now() - parseInt(dismissedAt) < DISMISS_DURATION
}

function dismissPopup(popupId: string): void {
    if (typeof window === "undefined") return
    localStorage.setItem(POPUP_DISMISSED_KEY + popupId, Date.now().toString())
}

export default function Popup() {
    const { language } = useLanguage()
    const { audience } = useAudience()
    const [popup, setPopup] = useState<PopupType | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        getActivePopup(audience).then((data) => {
            if (data && !isPopupDismissed(data.slug)) {
                setPopup(data)
                // Small delay for smooth entrance animation
                setTimeout(() => setIsVisible(true), 100)
            }
        })
    }, [audience])

    const handleClose = () => {
        if (!popup) return
        setIsClosing(true)
        dismissPopup(popup.slug)
        setTimeout(() => {
            setIsVisible(false)
            setPopup(null)
        }, 300)
    }

    if (!popup || !isVisible) return null

    const title = popup.title[language] || popup.title.en
    const text = popup.text[language] || popup.text.en
    const ctaText = popup.ctaText[language] || popup.ctaText.en

    return (
        <div
            className={`fixed z-[9999] w-[320px] transition-all duration-300 
                bottom-4 left-4 
                max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-[calc(100vw-2rem)]
                ${isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
                `}
        >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-visible pt-10 relative max-sm:border-2 max-sm:border-accent-500 max-sm:shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                {/* Logo - positioned above the card */}
                {popup.logo && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full bg-accent-100 dark:bg-accent-500/20 border-4 border-white dark:border-gray-900 shadow-lg overflow-hidden">
                            <img
                                src={popup.logo}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-3 z-10 text-accent-500 hover:text-accent-600 transition-colors"
                    aria-label="Close popup"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-5 pt-2">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 pr-6">
                        {title}
                    </h3>

                    {/* Text */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {text}
                    </p>

                    {/* CTA Button */}
                    <a
                        href={popup.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-4 rounded-xl transition-all hover:shadow-lg hover:shadow-accent-500/20 active:scale-95"
                    >
                        {ctaText}
                    </a>
                </div>
            </div>
        </div>
    )
}
