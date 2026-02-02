"use client"

import { getNavigation } from "@/lib/navigation"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Search, Menu, X } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import LanguageToggle from "./LanguageToggle"
import AudienceToggle from "./AudienceToggle"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { cn } from "@/lib/utils"

interface DropdownItem {
  label: string
  href: string
}

interface NavItemProps {
  label: string
  href: string
  items?: DropdownItem[]
}

function NavItem({ label, href, items }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!items || items.length === 0) {
    return (
      <Link
        href={href}
        className="text-sm text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-white transition-colors"
      >
        {label}
      </Link>
    )
  }

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Link
        href={href}
        className="text-sm text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-white transition-colors flex items-center gap-1"
      >
        {label}
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
      </Link>
      {isOpen && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-white dark:bg-gray-900 border border-accent-200 dark:border-gray-700 rounded-lg shadow-lg py-2 min-w-[180px]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-accent-50 dark:hover:bg-gray-800 hover:text-accent-600 dark:hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileNavItem({ label, href, items, onNavigate }: NavItemProps & { onNavigate: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!items || items.length === 0) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className="text-base text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-white transition-colors py-2"
      >
        {label}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-base text-gray-700 dark:text-gray-300 hover:text-accent-600 dark:hover:text-white transition-colors py-2"
      >
        {label}
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="flex flex-col gap-2 ml-4 mt-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white transition-colors py-1.5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { t, language } = useLanguage()
  const { audience } = useAudience()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getPath = (path: string) => `/${language}/${audience}${path === "/" ? "" : path}`

  const rawNavItems = getNavigation(audience)

  // Transform the static config into the props expected by NavItem
  const navItems: NavItemProps[] = rawNavItems.map(item => ({
    label: item.label[language] || item.label.en,
    href: getPath(item.href === "/blog" || item.href === "/guides" || item.href === "/rankings" || item.href === "/tools" ? item.href : item.href), // Simple pass-through, the config hrefs are relative roots
    items: item.items?.map(subItem => ({
      label: subItem.label[language] || subItem.label.en,
      href: getPath(subItem.href)
    }))
  }))

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-accent-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo, Search, Controls */}
          <div className="flex items-center justify-between h-16 border-b border-gray-100 dark:border-gray-800">
            <Link href={getPath("/")} className="text-xl font-bold text-gray-900 dark:text-white">
              <span className="text-accent-600">Aff</span>Traff
            </Link>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block relative">
                <input
                  type="text"
                  placeholder={t("common.search")}
                  className="w-48 lg:w-64 bg-accent-100 dark:bg-gray-800 border border-accent-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-gray-300 placeholder-gray-500 focus:outline-none focus:border-accent-500"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <AudienceToggle />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <button
                onClick={() => {
                  console.log("[v0] Mobile menu toggled:", !mobileMenuOpen)
                  setMobileMenuOpen(!mobileMenuOpen)
                }}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation */}
          <div className="hidden md:flex items-center justify-center h-12">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-[100] md:hidden transition-opacity duration-300 opacity-100"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[340px] bg-white dark:bg-gray-900 z-[101] shadow-xl overflow-y-auto md:hidden border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-out transform translate-x-0">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <Link
                href={getPath("/")}
                className="text-xl font-bold text-gray-900 dark:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-accent-600">Aff</span>Traff
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-accent-600 dark:hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <MobileNavItem key={item.href} {...item} onNavigate={() => setMobileMenuOpen(false)} />
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
