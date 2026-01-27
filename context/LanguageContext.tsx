"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export type Language = "en" | "ru"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode
  initialLanguage?: Language
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)
  const router = useRouter()
  const pathname = usePathname()

  // Sync state if initialLanguage changes (e.g. navigation)
  useEffect(() => {
    setLanguageState(initialLanguage)
  }, [initialLanguage])

  useEffect(() => {
    const saved = localStorage.getItem("preferred_lang") as Language
    // We only use saved pref if we are NOT on a specific lang route?
    // Actually, the URL is the truth. We just update localStorage for future sessions.
    if (initialLanguage) {
      localStorage.setItem("preferred_lang", initialLanguage)
      document.documentElement.lang = initialLanguage
    }
  }, [initialLanguage])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("preferred_lang", lang)
    document.documentElement.lang = lang

    // Update URL
    // Assumption: Path is /[lang]/[audience]/...
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length >= 2) {
      segments[0] = lang
      const newPath = `/${segments.join("/")}`
      router.push(newPath)
    }
  }

  const t = (key: string) => {
    return uiTranslations[language]?.[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

const uiTranslations: Record<Language, Record<string, string>> = {
  en: {
    "nav.networks": "Networks",
    "nav.rankings": "Rankings",
    "nav.formats": "Formats",
    "nav.blog": "Blog",
    "nav.news": "News",
    "nav.guides": "Guides",
    "nav.tools": "Tools",
    "nav.advertise": "Advertise",
    "nav.knowledgeBase": "Knowledge Base",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.methodology": "Methodology",
    "nav.terms": "Terms",
    "nav.privacy": "Privacy",
    "nav.disclaimer": "Disclaimer",
    "nav.caseStudies": "Case Studies",
    "home.industryUpdates": "Recent Articles",
    "home.topNetworks": "Top Networks by Format",
    "home.trendingGuides": "Trending Guides",
    "home.caseStudies": "Case Studies",
    "common.viewAll": "View all",
    "common.viewRankings": "View rankings",
    "common.search": "Search...",
    "common.more": "View more",
    "common.subscribe": "Subscribe",
    "common.newsletter": "Newsletter",
    "common.emailAddress": "Email address",
    "common.newsletterDesc": "Get the latest ad tech news delivered to your inbox.",
    "common.downloadPDF": "Download PDF",
    "common.downloadBreakdown": "Download Breakdown",
    "common.downloadDesc": "Get the full PDF breakdown including exact placement screenshots.",
    "common.allNetworks": "All Networks",
    "common.allRankings": "All Rankings",
    "common.allFormats": "All Formats",
    "common.allGuides": "All Guides",
    "common.allTools": "All Tools",
    "common.allFormatsFilter": "All Formats",
    "common.allPaymentTerms": "All Payment Terms",
    "common.sortByName": "Sort by Name",
    "common.sortByMinPayout": "Sort by Min Payout",
    "common.directory": "Directory",
    "common.resources": "Resources",
    "common.company": "Company",
    "common.legal": "Legal",
    "network.payout": "Min Payout",
    "network.frequency": "Frequency",
    "network.rating": "Rating",
    "network.methods": "Methods",
    "network.geos": "GEOs",
    "network.visit": "Visit Site",
    "network.similar": "Similar Networks",
    "network.compareNetworks": "Compare {count} ad networks for publishers",
    "network.signupPublisher": "Sign up as a publisher",
    "network.goToSite": "Go to Site",
    "network.editorialNote": "Review",
    "network.pros": "Pros",
    "network.cons": "Cons",
    "network.ratingsFormat": "Ratings by Format",
    "network.stability": "Stability",
    "network.support": "Support",
    "article.related": "Related Articles",
    "article.detailedCaseAnalysis": "Detailed Case Analysis",
    "article.setupStrategy": "Setup & Strategy",
    "article.trafficDistribution": "Traffic Distribution",
    "article.adPlacements": "Ad Placements",
    "article.finalResults": "Final Results",
    "article.keyLessons": "Key Lessons",
    "footer.forEducational": "For educational purposes only.",
    "blog.allPosts": "All Posts",
    "blog.news": "News",
    "blog.caseStudies": "Case Studies",
    "blog.google": "Google",
    "blog.monetization": "Monetization",
    "blog.seo": "SEO",
    "blog.tools": "Tools",
    "blog.ai": "AI",
    "guides.allGuides": "All Guides",
    "guides.monetizationFormats": "Monetization Formats",
    "guides.optimization": "Optimization",
    "guides.technical": "Technical",
    "guides.scaling": "Scaling",
    "rankings.title": "Network Rankings",
    "rankings.description": "Our rankings are based on performance data, publisher feedback, and editorial review.",
    "rankings.bestNetworks": "Best {format} Networks",
    "rankings.networksRanked": "{count} networks ranked",
    "tools.rpmCalculator": "RPM Calculator",
    "tools.formatPicker": "Ad Format Picker",
    "tools.checklist": "Pre-Monetization Checklist",
    "tools.formatDemo": "Format Demo",
  },
  ru: {
    "nav.networks": "Сети",
    "nav.rankings": "Рейтинги",
    "nav.formats": "Форматы",
    "nav.blog": "Блог",
    "nav.news": "Новости",
    "nav.guides": "Гайды",
    "nav.tools": "Инструменты",
    "nav.advertise": "Реклама",
    "nav.knowledgeBase": "База Знаний",
    "nav.home": "Главная",
    "nav.about": "О нас",
    "nav.contact": "Контакты",
    "nav.methodology": "Методология",
    "nav.terms": "Условия",
    "nav.privacy": "Конфиденциальность",
    "nav.disclaimer": "Отказ от ответственности",
    "nav.caseStudies": "Кейсы",
    "home.industryUpdates": "Свежие Статьи",
    "home.topNetworks": "Лучшие сети по форматам",
    "home.trendingGuides": "Популярные гайды",
    "home.caseStudies": "Кейсы",
    "common.viewAll": "Смотреть все",
    "common.viewRankings": "Смотреть рейтинги",
    "common.search": "Поиск...",
    "common.more": "Подробнее",
    "common.subscribe": "Подписаться",
    "common.newsletter": "Рассылка",
    "common.emailAddress": "Email адрес",
    "common.newsletterDesc": "Получайте последние новости рекламных технологий на вашу почту.",
    "common.downloadPDF": "Скачать PDF",
    "common.downloadBreakdown": "Скачать отчет",
    "common.downloadDesc": "Получите полный PDF-отчет со скриншотами размещений.",
    "common.allNetworks": "Все сети",
    "common.allRankings": "Все рейтинги",
    "common.allFormats": "Все форматы",
    "common.allGuides": "Все гайды",
    "common.allTools": "Все инструменты",
    "common.allFormatsFilter": "Все форматы",
    "common.allPaymentTerms": "Все условия оплаты",
    "common.sortByName": "Сортировать по названию",
    "common.sortByMinPayout": "Сортировать по мин. выплате",
    "common.directory": "Каталог",
    "common.resources": "Ресурсы",
    "common.company": "Компания",
    "common.legal": "Правовая информация",
    "network.payout": "Мин. выплата",
    "network.frequency": "Частота",
    "network.rating": "Рейтинг",
    "network.methods": "Методы",
    "network.geos": "Гео",
    "network.visit": "Перейти на сайт",
    "network.similar": "Похожие сети",
    "network.compareNetworks": "Сравните {count} рекламных сетей для вебмастеров",
    "network.signupPublisher": "Зарегистрироваться как паблишер",
    "network.goToSite": "Перейти на сайт",
    "network.editorialNote": "Обзор",
    "network.pros": "Плюсы",
    "network.cons": "Минусы",
    "network.ratingsFormat": "Рейтинги по форматам",
    "network.stability": "Стабильность",
    "network.support": "Саппорт",
    "article.related": "Похожие статьи",
    "article.detailedCaseAnalysis": "Детальный анализ кейса",
    "article.setupStrategy": "Настройка и стратегия",
    "article.trafficDistribution": "Распределение трафика",
    "article.adPlacements": "Размещение рекламы",
    "article.finalResults": "Финальные результаты",
    "article.keyLessons": "Ключевые выводы",
    "footer.forEducational": "Только в образовательных целях.",
    "blog.allPosts": "Все посты",
    "blog.news": "Новости",
    "blog.caseStudies": "Кейсы",
    "blog.google": "Google",
    "blog.monetization": "Монетизация",
    "blog.seo": "SEO",
    "blog.tools": "Инструменты",
    "blog.ai": "AI",
    "guides.allGuides": "Все гайды",
    "guides.monetizationFormats": "Форматы Монетизации",
    "guides.optimization": "Оптимизация",
    "guides.technical": "Техническое",
    "guides.scaling": "Масштабирование",
    "rankings.title": "Рейтинги сетей",
    "rankings.description":
      "Наши рейтинги основаны на данных о производительности, отзывах вебмастеров и редакционном обзоре.",
    "rankings.bestNetworks": "Лучшие {format} сети",
    "rankings.networksRanked": "{count} сетей в рейтинге",
    "tools.rpmCalculator": "Калькулятор RPM",
    "tools.formatPicker": "Подбор формата рекламы",
    "tools.checklist": "Чеклист пре-монетизации",
    "tools.formatDemo": "Демо Форматов",
  },
}
