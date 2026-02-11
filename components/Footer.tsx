"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { Send, Instagram, AtSign } from "lucide-react"

export default function Footer() {
  const { t, language } = useLanguage()
  const { audience } = useAudience()

  const getPath = (path: string) => `/${language}/${audience}${path === "/" ? "" : path}`

  const companyLinks = [
    { href: "/about", label: t("nav.about") },
    { href: "/advertise", label: t("nav.advertise") },
    { href: "/contact", label: t("nav.contact") },
  ]

  const legalLinks = [
    { href: "/terms", label: t("nav.terms") },
    { href: "/privacy", label: t("nav.privacy") },
  ]

  const socials = [
    { href: "https://t.me/nativeshit", icon: Send, label: "Telegram Chat", hoverColor: "hover:text-blue-500" },
    { href: "https://www.instagram.com/aff_traff_", icon: Instagram, label: "Instagram", hoverColor: "hover:text-pink-600" },
    { href: "https://www.threads.com/@aff_traff_", icon: AtSign, label: "Threads", hoverColor: "hover:text-gray-900 dark:hover:text-white" },
  ]

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-accent-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t("common.company")}</span>
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={getPath(link.href)}
                className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="hidden sm:inline text-gray-200 dark:text-gray-700">|</span>
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t("common.legal")}</span>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={getPath(link.href)}
                className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{t("common.socials")}</span>
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 dark:text-gray-400 ${social.hoverColor} transition-colors`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-accent-200 dark:border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AffTraff.
        </div>
      </div>
    </footer>
  )
}
