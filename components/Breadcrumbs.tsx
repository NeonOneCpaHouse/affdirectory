"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t, language } = useLanguage()
  const { audience } = useAudience()

  const formatHref = (href: string) => {
    if (!href) return href
    // Don't modify absolute URLs or anchor links
    if (href.startsWith("http") || href.startsWith("#")) return href
    // If it already contains the language prefix, leave it alone
    if (href.startsWith(`/${language}`)) return href
    // Otherwise, prepend the language and audience
    return `/${language}/${audience}${href.startsWith("/") ? "" : "/"}${href}`
  }

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link href={`/${language}/${audience}`} className="hover:text-accent-600 dark:hover:text-white transition-colors">
        {t("nav.home") || "Home"}
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <span className="text-gray-300 dark:text-gray-600">/</span>
          {item.href ? (
            <Link href={formatHref(item.href)} className="hover:text-accent-600 dark:hover:text-white transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
