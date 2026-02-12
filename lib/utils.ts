import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Affiliate: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    Gambling: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    Betting: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    Crypto: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    Marketing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    Mobile: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    SEO: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    Digital: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    Management: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    Analytics: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    B2B: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    Meetup: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  }
  return colors[category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
}
