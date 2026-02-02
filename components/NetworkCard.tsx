"use client"

import Link from "next/link"
import type { Network } from "@/mock/networks"
import RatingStars from "./RatingStars"
import TagPills from "./TagPills"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

interface NetworkCardProps {
  network: Network
}

export default function NetworkCard({ network }: NetworkCardProps) {
  const { language } = useLanguage()
  const { audience } = useAudience()

  const formats = network.formatsSupported || []

  const avgRating =
    formats.length > 0
      ? formats.reduce((sum, fmt) => sum + (network.ratingsByFormat[fmt]?.overall || 0), 0) / formats.length
      : 0

  const currentGeos = network.geos[language] || network.geos["en"] || []

  return (
    <Link
      href={`/${language}/${audience}/networks/${network.slug}`}
      className="block bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg border border-accent-200 dark:border-gray-700/50 rounded-xl p-5 hover:border-accent-500 dark:hover:border-accent-500/50 hover:bg-accent-50 dark:hover:bg-gray-800/30 transition-all group shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {network.logo && network.logo.trim() !== "" && (
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              <img
                src={network.logo || "/placeholder.svg"}
                alt={`${network.name} logo`}
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 transition-colors">
              {network.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {network.payoutFrequency} • Min ${network.minPayout}
            </p>
          </div>
        </div>
        <RatingStars rating={avgRating} size="sm" />
      </div>
      <TagPills tags={formats} variant="format" size="sm" />
      <div className="mt-3 pt-3 border-t border-accent-100 dark:border-gray-700/50">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {currentGeos.slice(0, 3).join(", ")}
          {currentGeos.length > 3 && ` +${currentGeos.length - 3}`}
        </p>
      </div>
    </Link>
  )
}
