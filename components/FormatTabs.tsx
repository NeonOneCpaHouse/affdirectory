"use client"

import { useState } from "react"
import { formatLabels, type FormatKey } from "@/mock/networks"
import { useLanguage } from "@/context/LanguageContext"

interface FormatTabsProps {
  onTabChange?: (format: FormatKey) => void
  defaultFormat?: FormatKey
}

const formats: FormatKey[] = [
  "webPush",
  "popunder",
  "inPagePush",
  "banner",
  "telegram",
  "display",
  "native",
  "mobile",
  "video",
  "domainRedirect",
  "interstitial",
]

export default function FormatTabs({ onTabChange, defaultFormat = "webPush" }: FormatTabsProps) {
  const { language } = useLanguage()
  const [activeFormat, setActiveFormat] = useState<FormatKey>(defaultFormat)

  const handleTabClick = (format: FormatKey) => {
    setActiveFormat(format)
    onTabChange?.(format)
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg min-w-max">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => handleTabClick(format)}
            className={`whitespace-nowrap px-3 py-2.5 sm:px-4 rounded-md text-sm font-medium transition-colors ${activeFormat === format
              ? "bg-accent-600 text-white shadow-sm"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {formatLabels[format][language]}
          </button>
        ))}
      </div>
    </div>
  )
}
