"use client"

import { useState, useEffect } from "react"
import { slotSizes, getAdForSlot, type AdCreative } from "@/mock/ads"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

interface AdSlotProps {
  slotKey: string
  className?: string
  fullWidth?: boolean
}

export default function AdSlot({ slotKey, className = "", fullWidth = false }: AdSlotProps) {
  const { language } = useLanguage()
  const { audience } = useAudience()
  const [ad, setAd] = useState<AdCreative | undefined>(undefined)

  const sizes = slotSizes[slotKey] || {
    desktop: { width: 336, height: 280 },
    mobile: { width: 300, height: 250 }
  }

  useEffect(() => {
    getAdForSlot(slotKey, audience, language).then(setAd)
  }, [slotKey, audience, language])

  const adsLabel = {
    en: "Advertisement",
    ru: "Реклама",
  }

  if (ad && (ad.desktopImage || ad.mobileImage || ad.ctaUrl)) { // Added ad.ctaUrl to ensure text ads also render
    return (
      <div className={`flex justify-center ${className} ${fullWidth ? 'w-full' : ''}`}>
        {/* Mobile Slot */}
        <div
          className="md:hidden w-full flex justify-center overflow-hidden rounded-xl"
          style={{ height: sizes.mobile.height, width: fullWidth ? "100%" : sizes.mobile.width }}
        >
          {ad.mobileImage ? (
            <a href={ad.ctaUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <img src={ad.mobileImage || "/placeholder.svg"} alt="Ad" className="w-full h-full object-cover" />
            </a>
          ) : (
            <div className="w-full h-full bg-sky-50/50 dark:bg-blue-500/5 border-2 border-dashed border-sky-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center transition-colors hover:bg-sky-100/50 dark:hover:bg-blue-500/10 group cursor-default">
              <span className="text-sm font-medium italic text-sky-400 dark:text-blue-400">
                {adsLabel[language]}
              </span>
            </div>
          )}
        </div>

        {/* Desktop Slot */}
        <div
          className="hidden md:flex w-full justify-center overflow-hidden rounded-xl"
          style={{ height: sizes.desktop.height, width: fullWidth ? "100%" : sizes.desktop.width }}
        >
          {ad.desktopImage ? (
            <a href={ad.ctaUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <img src={ad.desktopImage || "/placeholder.svg"} alt="Ad" className="w-full h-full object-cover" />
            </a>
          ) : (
            <div className="w-full h-full bg-sky-50/50 dark:bg-blue-500/5 border-2 border-dashed border-sky-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center transition-colors hover:bg-sky-100/50 dark:hover:bg-blue-500/10 group cursor-default">
              <span className="text-sm font-medium italic text-sky-400 dark:text-blue-400">
                {adsLabel[language]}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Placeholder State (Keep existing as fallback when no ad is loaded or configured)
  return (
    <div className={`flex justify-center ${className} ${fullWidth ? 'w-full' : ''}`}>
      {/* Mobile Slot */}
      <div
        className="ad-slot md:hidden w-full flex justify-center"
        style={{ height: sizes.mobile.height, width: fullWidth ? "100%" : sizes.mobile.width }}
      >
        <div className="w-full h-full bg-sky-50/50 dark:bg-blue-500/5 border-2 border-dashed border-sky-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center transition-colors hover:bg-sky-100/50 dark:hover:bg-blue-500/10 group cursor-default">
          <span className="text-sm font-medium italic text-sky-400 dark:text-blue-400 tracking-wide select-none group-hover:scale-105 transition-transform duration-300">
            {adsLabel[language]}
          </span>
        </div>
      </div>

      {/* Desktop Slot */}
      <div
        className="ad-slot hidden md:flex w-full justify-center"
        style={{ height: sizes.desktop.height, width: fullWidth ? "100%" : sizes.desktop.width }}
      >
        <div className="w-full h-full bg-sky-50/50 dark:bg-blue-500/5 border-2 border-dashed border-sky-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center transition-colors hover:bg-sky-100/50 dark:hover:bg-blue-500/10 group cursor-default">
          <span className="text-sm font-medium italic text-sky-400 dark:text-blue-400 tracking-wide select-none group-hover:scale-105 transition-transform duration-300">
            {adsLabel[language]}
          </span>
        </div>
      </div>
    </div>
  )
}
