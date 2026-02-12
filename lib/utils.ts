import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type ColorVariant = {
  faint: string
  solid: string
}

const COLOR_PALETTE: Record<string, ColorVariant> = {
  blue: {
    faint: "bg-blue-50 text-blue-600 dark:bg-blue-900/10 dark:text-blue-400",
    solid: "bg-blue-100 text-blue-700 border-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-300",
  },
  red: {
    faint: "bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400",
    solid: "bg-red-100 text-red-700 border-red-700 dark:bg-red-900/30 dark:text-red-300 dark:border-red-300",
  },
  orange: {
    faint: "bg-orange-50 text-orange-600 dark:bg-orange-900/10 dark:text-orange-400",
    solid: "bg-orange-100 text-orange-700 border-orange-700 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-300",
  },
  yellow: {
    faint: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/10 dark:text-yellow-400",
    solid: "bg-yellow-100 text-yellow-700 border-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-300",
  },
  purple: {
    faint: "bg-purple-50 text-purple-600 dark:bg-purple-900/10 dark:text-purple-400",
    solid: "bg-purple-100 text-purple-700 border-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-300",
  },
  green: {
    faint: "bg-green-50 text-green-600 dark:bg-green-900/10 dark:text-green-400",
    solid: "bg-green-100 text-green-700 border-green-700 dark:bg-green-900/30 dark:text-green-300 dark:border-green-300",
  },
  indigo: {
    faint: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/10 dark:text-indigo-400",
    solid: "bg-indigo-100 text-indigo-700 border-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-300",
  },
  pink: {
    faint: "bg-pink-50 text-pink-600 dark:bg-pink-900/10 dark:text-pink-400",
    solid: "bg-pink-100 text-pink-700 border-pink-700 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-300",
  },
  teal: {
    faint: "bg-teal-50 text-teal-600 dark:bg-teal-900/10 dark:text-teal-400",
    solid: "bg-teal-100 text-teal-700 border-teal-700 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-300",
  },
  cyan: {
    faint: "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/10 dark:text-cyan-400",
    solid: "bg-cyan-100 text-cyan-700 border-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-300",
  },
  slate: {
    faint: "bg-slate-50 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400",
    solid: "bg-slate-100 text-slate-700 border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-300",
  },
  rose: {
    faint: "bg-rose-50 text-rose-600 dark:bg-rose-900/10 dark:text-rose-400",
    solid: "bg-rose-100 text-rose-700 border-rose-700 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-300",
  },
}

const CATEGORY_TO_COLOR: Record<string, string> = {
  Affiliate: "blue",
  Gambling: "red",
  Betting: "orange",
  Crypto: "yellow",
  Marketing: "purple",
  Mobile: "green",
  SEO: "indigo",
  Digital: "pink",
  Management: "teal",
  Analytics: "cyan",
  B2B: "slate",
  Meetup: "rose",
}

export function getCategoryColor(category: string): string {
  const colorKey = CATEGORY_TO_COLOR[category]
  return (colorKey && COLOR_PALETTE[colorKey]?.faint) || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
}

export function getTagVariants(tagName: string): ColorVariant {
  // 1. Try direct category match
  const lowerTagName = tagName.toLowerCase()
  const categoryMatch = Object.keys(CATEGORY_TO_COLOR).find(
    (key) => key.toLowerCase() === lowerTagName
  )

  let colorKey = categoryMatch ? CATEGORY_TO_COLOR[categoryMatch] : null

  // 2. Fallback to hash
  if (!colorKey) {
    const keys = Object.keys(COLOR_PALETTE)
    let hash = 0
    for (let i = 0; i < tagName.length; i++) {
      hash = tagName.charCodeAt(i) + ((hash << 5) - hash)
    }
    colorKey = keys[Math.abs(hash) % keys.length]
  }

  return COLOR_PALETTE[colorKey]
}

// Deprecated: kept for backward compatibility if needed, but getTagVariants is preferred
export function getTagColor(tagName: string): string {
  return getTagVariants(tagName).faint
}
