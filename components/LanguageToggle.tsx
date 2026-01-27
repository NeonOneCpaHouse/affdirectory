"use client"

import { useLanguage } from "@/context/LanguageContext"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ru" : "en")}
      className="px-3 py-2 rounded-lg bg-sky-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300 hover:bg-sky-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
    >
      {language.toUpperCase()}
    </button>
  )
}
