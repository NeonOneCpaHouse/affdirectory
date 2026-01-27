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

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link href={`/${language}/${audience}`} className="hover:text-sky-600 dark:hover:text-white transition-colors">
        {t("nav.home") || "Home"}
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <span className="text-gray-300 dark:text-gray-600">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-sky-600 dark:hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700 dark:text-gray-300 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
