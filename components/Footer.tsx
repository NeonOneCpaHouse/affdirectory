"use client"

import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import { Send, Instagram, AtSign } from "lucide-react"

export default function Footer() {
  const { t, language } = useLanguage()
  const { audience } = useAudience()

  const getPath = (path: string) => `/${language}/${audience}${path === "/" ? "" : path}`

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-accent-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t("common.company")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getPath("/about")}
                  className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>

              <li>
                <Link
                  href={getPath("/advertise")}
                  className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
                >
                  {t("nav.advertise")}
                </Link>
              </li>
              <li>
                <Link
                  href={getPath("/contact")}
                  className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t("common.legal")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={getPath("/terms")}
                  className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
                >
                  {t("nav.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={getPath("/privacy")}
                  className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
                >
                  {t("nav.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={getPath("/disclaimer")}
                  className="text-gray-500 dark:text-gray-400 hover:text-accent-600 dark:hover:text-white text-sm transition-colors"
                >
                  {t("nav.disclaimer")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">{t("common.socials")}</h4>
            <div className="flex gap-4">
              <a
                href="https://t.me/nativeshit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Telegram Chat"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/aff_traff_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.threads.com/@aff_traff_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label="Threads"
              >
                <AtSign className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-accent-200 dark:border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AffTraff.
        </div>
      </div>
    </footer>
  )
}
