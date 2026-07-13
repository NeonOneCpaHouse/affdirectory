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

  // Collapse breadcrumb items on mobile (< md) to reduce vertical space.
  // When there are 2+ items after Home, mobile shows: Home / … / Parent.
  // The last item (page title) is hidden on mobile since it's redundant with the h1.
  // All items remain in the DOM (hidden md:flex) for SEO and screen readers.
  const collapsible = items.length >= 2

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link href={`/${language}/${audience}`} className="hover:text-accent-600 dark:hover:text-white transition-colors">
        {t("nav.home") || "Home"}
      </Link>
      {collapsible && (
        <span className="flex items-center gap-2 md:hidden" aria-hidden="true">
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-gray-400 dark:text-gray-500">…</span>
        </span>
      )}
      {items.map((item, index) => {
        const isParent = index === items.length - 2
        const hiddenOnMobile = collapsible && !isParent

        return (
          <span key={index} className={`flex items-center gap-2${hiddenOnMobile ? " hidden md:flex" : ""}`}>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            {item.href ? (
              <Link href={formatHref(item.href)} className="hover:text-accent-600 dark:hover:text-white transition-colors whitespace-nowrap">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
