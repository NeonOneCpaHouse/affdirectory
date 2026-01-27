"use client"

import type React from "react"
import { useState, use } from "react"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/components/Breadcrumbs"
import { useLanguage } from "@/context/LanguageContext"
import { Bell, X } from "lucide-react"

const toolsData: Record<string, { name: { en: string; ru: string }; component: React.FC }> = {
  "rpm-calculator": {
    name: { en: "RPM Calculator", ru: "Калькулятор RPM" },
    component: RPMCalculator,
  },
  "ad-format-picker": {
    name: { en: "Ad Format Picker", ru: "Подбор формата рекламы" },
    component: AdFormatPicker,
  },
  "pre-monetization-checklist": {
    name: { en: "Pre-Monetization Checklist", ru: "Чеклист пре-монетизации" },
    component: PreMonetizationChecklist,
  },
  "format-demo": {
    name: { en: "Format Demo", ru: "Демо Форматов" },
    component: FormatDemo,
  },
}

function RPMCalculator() {
  const { language } = useLanguage()
  const [pageviews, setPageviews] = useState(100000)
  const [cpm, setCpm] = useState(2)
  const revenue = (pageviews / 1000) * cpm

  const content = {
    en: {
      pageviewsLabel: "Monthly Pageviews",
      cpmLabel: "Estimated CPM ($)",
      revenueLabel: "Estimated Monthly Revenue",
    },
    ru: {
      pageviewsLabel: "Просмотров в месяц",
      cpmLabel: "Примерная CPM ($)",
      revenueLabel: "Примерный месячный доход",
    },
  }

  const t = content[language]

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t.pageviewsLabel}</label>
          <input
            type="number"
            value={pageviews}
            onChange={(e) => setPageviews(Number(e.target.value))}
            className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t.cpmLabel}</label>
          <input
            type="number"
            step="0.1"
            value={cpm}
            onChange={(e) => setCpm(Number(e.target.value))}
            className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div className="bg-sky-100 dark:bg-blue-500/10 border border-sky-300 dark:border-blue-500/20 rounded-xl p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-2">{t.revenueLabel}</p>
        <p className="text-4xl font-bold text-sky-600 dark:text-blue-400">
          ${revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  )
}

function AdFormatPicker() {
  const { language } = useLanguage()
  const [siteType, setSiteType] = useState("")
  const [traffic, setTraffic] = useState("")
  const recommendations = siteType && traffic ? getRecommendations(siteType, traffic, language) : null

  function getRecommendations(site: string, traf: string, lang: "en" | "ru") {
    const content = {
      en: {
        banner: "Banner Ads",
        inPage: "In-Page Push",
        webPush: "Web Push",
        popunder: "Popunder",
        note: {
          default: "Start with non-intrusive formats",
          news: "News sites work well with push notifications",
          tools: "Tool sites can monetize with less intrusive pops",
          highTraffic: ". Consider header bidding for premium inventory.",
        },
      },
      ru: {
        banner: "Баннерная реклама",
        inPage: "In-Page Пуш",
        webPush: "Веб-пуш",
        popunder: "Попандер",
        note: {
          default: "Начните с ненавязчивых форматов",
          news: "Новостные сайты хорошо работают с пуш-уведомлениями",
          tools: "Сайты с инструментами могут монетизироваться с менее навязчивыми форматами",
          highTraffic: ". Рассмотрите возможность header bidding для премиум-инвентаря.",
        },
      },
    }

    const t = content[lang]
    const recs = { primary: t.banner, secondary: t.inPage, note: t.note.default }

    if (site === "news") {
      recs.primary = t.webPush
      recs.secondary = t.banner
      recs.note = t.note.news
    }
    if (site === "tools") {
      recs.primary = t.popunder
      recs.secondary = t.banner
      recs.note = t.note.tools
    }
    if (traf === "high") {
      recs.note += t.note.highTraffic
    }

    return recs
  }

  const content = {
    en: {
      siteTypeLabel: "Site Type",
      trafficLabel: "Monthly Traffic",
      selectPlaceholder: "Select...",
      siteTypes: {
        news: "News/Blog",
        tools: "Tools/Utilities",
        entertainment: "Entertainment",
        forum: "Forum/Community",
      },
      trafficLevels: {
        low: "Under 50k",
        medium: "50k - 500k",
        high: "500k+",
      },
      recommendedLabel: "Recommended Formats",
      primaryLabel: "Primary",
      secondaryLabel: "Secondary",
    },
    ru: {
      siteTypeLabel: "Тип сайта",
      trafficLabel: "Месячный трафик",
      selectPlaceholder: "Выберите...",
      siteTypes: {
        news: "Новости/Блог",
        tools: "Инструменты/Утилиты",
        entertainment: "Развлечения",
        forum: "Форум/Сообщество",
      },
      trafficLevels: {
        low: "До 50k",
        medium: "50k - 500k",
        high: "500k+",
      },
      recommendedLabel: "Рекомендуемые форматы",
      primaryLabel: "Основной",
      secondaryLabel: "Дополнительный",
    },
  }

  const t = content[language]

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t.siteTypeLabel}</label>
          <select
            value={siteType}
            onChange={(e) => setSiteType(e.target.value)}
            className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
          >
            <option value="">{t.selectPlaceholder}</option>
            <option value="news">{t.siteTypes.news}</option>
            <option value="tools">{t.siteTypes.tools}</option>
            <option value="entertainment">{t.siteTypes.entertainment}</option>
            <option value="forum">{t.siteTypes.forum}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">{t.trafficLabel}</label>
          <select
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
            className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
          >
            <option value="">{t.selectPlaceholder}</option>
            <option value="low">{t.trafficLevels.low}</option>
            <option value="medium">{t.trafficLevels.medium}</option>
            <option value="high">{t.trafficLevels.high}</option>
          </select>
        </div>
      </div>
      {recommendations && (
        <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-6">
          <p className="text-green-700 dark:text-green-400 font-semibold mb-3">{t.recommendedLabel}</p>
          <p className="text-gray-700 dark:text-white mb-1">
            {t.primaryLabel}: <span className="text-green-600 dark:text-green-400">{recommendations.primary}</span>
          </p>
          <p className="text-gray-700 dark:text-white mb-3">
            {t.secondaryLabel}: <span className="text-gray-500 dark:text-gray-400">{recommendations.secondary}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{recommendations.note}</p>
        </div>
      )}
    </div>
  )
}

function PreMonetizationChecklist() {
  const { language } = useLanguage()

  const content = {
    en: {
      description: "Check off each item before applying to ad networks.",
      items: [
        "SSL certificate installed (HTTPS)",
        "Privacy policy page published",
        "Terms of service page published",
        "Contact page with real information",
        "Original content (no copied material)",
        "Clean navigation and site structure",
        "Mobile-responsive design",
        "Page speed under 3 seconds",
        "No malware or policy violations",
        "At least 30 days of content history",
      ],
    },
    ru: {
      description: "Отметьте каждый пункт перед подачей заявки в рекламные сети.",
      items: [
        "Установлен SSL-сертификат (HTTPS)",
        "Опубликована страница политики конфиденциальности",
        "Опубликована страница условий использования",
        "Страница контактов с реальной информацией",
        "Оригинальный контент (без копирования)",
        "Чистая навигация и структура сайта",
        "Адаптивный дизайн для мобильных устройств",
        "Скорость загрузки страницы менее 3 секунд",
        "Нет вредоносного ПО или нарушений политики",
        "Как минимум 30 дней истории контента",
      ],
    },
  }

  const t = content[language]

  return (
    <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
      <p className="text-gray-500 dark:text-gray-400 mb-6">{t.description}</p>
      <ul className="space-y-3">
        {t.items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-sky-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sky-600 dark:text-green-500 focus:ring-sky-500 dark:focus:ring-green-500"
            />
            <span className="text-gray-700 dark:text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FormatDemo() {
  const { language } = useLanguage()
  const [selectedFormat, setSelectedFormat] = useState<string>("webPush")

  const content = {
    en: {
      selectFormat: "Select Ad Format",
      demoSite: "Demo Website Preview",
      formats: {
        webPush: "Web Push",
        inPagePush: "In-Page Push",
        popunder: "Popunder",
        banner: "Banner",
        native: "Native",
        display: "Display",
        video: "Video",
        interstitial: "Interstitial",
        mobile: "Mobile",
        telegram: "Telegram",
        domainRedirect: "Domain Redirect",
      },
      demoContent: {
        headline: "Latest Technology News",
        title: "How AI is Transforming Digital Marketing in 2025",
        excerpt:
          "Artificial intelligence continues to revolutionize the way we approach digital marketing strategies...",
        readMore: "Read more",
      },
    },
    ru: {
      selectFormat: "Выберите рекламный формат",
      demoSite: "Предпросмотр сайта",
      formats: {
        webPush: "Веб Пуш",
        inPagePush: "In-Page",
        popunder: "Попандер",
        banner: "Баннер",
        native: "Нативная",
        display: "Дисплей",
        video: "Видео",
        interstitial: "Полноэкранные",
        mobile: "Мобильные",
        telegram: "Телеграм",
        domainRedirect: "Редирект",
      },
      demoContent: {
        headline: "Последние новости технологий",
        title: "Как ИИ трансформирует цифровой маркетинг в 2025",
        excerpt: "Искусственный интеллект продолжает революционизировать подход к стратегиям цифрового маркетинга...",
        readMore: "Читать далее",
      },
    },
  }

  const t = content[language]

  return (
    <div className="space-y-6">
      {/* Format Selector */}
      <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">{t.selectFormat}</label>
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          className="w-full bg-sky-50 dark:bg-gray-900 border border-sky-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white"
        >
          <option value="webPush">{t.formats.webPush}</option>
          <option value="inPagePush">{t.formats.inPagePush}</option>
          <option value="popunder">{t.formats.popunder}</option>
          <option value="banner">{t.formats.banner}</option>
          <option value="native">{t.formats.native}</option>
          <option value="display">{t.formats.display}</option>
          <option value="video">{t.formats.video}</option>
          <option value="interstitial">{t.formats.interstitial}</option>
          <option value="mobile">{t.formats.mobile}</option>
          <option value="telegram">{t.formats.telegram}</option>
          <option value="domainRedirect">{t.formats.domainRedirect}</option>
        </select>
      </div>

      {/* Demo Website Preview */}
      <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t.demoSite}</h3>

        {/* Demo Site Container */}
        <div className="relative bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden min-h-[500px]">
          {/* Banner Ad - Top */}
          {selectedFormat === "banner" && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-24 flex items-center justify-center">
              <span className="text-white font-bold">728x90 Banner Ad</span>
            </div>
          )}

          {/* Demo Content */}
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs text-sky-600 dark:text-blue-400 font-semibold mb-2">{t.demoContent.headline}</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.demoContent.title}</h2>

              {/* Display Ad - Sidebar */}
              {selectedFormat === "display" && (
                <div className="float-right ml-4 mb-4 w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-center">
                    300x250
                    <br />
                    Display Ad
                  </span>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-400 mb-4">{t.demoContent.excerpt}</p>

              {/* In-Page Push */}
              {selectedFormat === "inPagePush" && (
                <div className="bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-lg p-4 mb-4 shadow-lg flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Special Offer!</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Click here to learn more about this amazing deal
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">×</button>
                </div>
              )}

              {/* Native Ad */}
              {selectedFormat === "native" && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
                  <div className="flex gap-3">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded flex-shrink-0"></div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Sponsored</p>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        You Won't Believe These Marketing Results
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{t.demoContent.readMore} →</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Ad */}
              {selectedFormat === "video" && (
                <div className="relative w-full aspect-video bg-black rounded-lg mb-4 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                      </div>
                      <p className="text-white text-sm">Video Ad Playing</p>
                      <p className="text-gray-400 text-xs mt-1">Skip in 5s</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
              <button className="text-sky-600 dark:text-blue-400 text-sm font-semibold hover:underline">
                {t.demoContent.readMore} →
              </button>
            </div>
          </div>

          {/* Web Push Notification */}
          {selectedFormat === "webPush" && (
            <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-4 w-80 animate-in slide-in-from-right">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">New Offer Available!</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Check out our latest promotion</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Popunder Overlay */}
          {selectedFormat === "popunder" && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4 shadow-2xl">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Simulated popunder (opens behind)</p>
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg p-8 text-center">
                  <p className="text-white font-bold text-lg">Special Offer!</p>
                  <p className="text-white text-sm mt-2">Opens in new tab/window</p>
                </div>
              </div>
            </div>
          )}

          {/* Interstitial Overlay */}
          {selectedFormat === "interstitial" && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-8 max-w-md mx-4 relative">
                <button className="absolute top-2 right-2 text-white/80 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-white text-2xl font-bold text-center mb-4">Full Screen Ad</h3>
                <p className="text-white/90 text-center mb-6">This ad covers the entire page</p>
                <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          )}

          {/* Mobile Format */}
          {selectedFormat === "mobile" && (
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 p-4 shadow-2xl">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">Mobile Bottom Banner</p>
                  <p className="text-white/80 text-xs">320x50 sticky ad</p>
                </div>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold">Open</button>
              </div>
            </div>
          )}

          {/* Telegram Format */}
          {selectedFormat === "telegram" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 w-80 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">Sponsored Channel</p>
                  <p className="text-xs text-gray-500">Promoted post</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-2">
                <p className="text-gray-900 dark:text-white text-sm">Check out this amazing offer!</p>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold">View More</button>
            </div>
          )}

          {/* Domain Redirect */}
          {selectedFormat === "domainRedirect" && (
            <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className="text-center max-w-md px-4">
                <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <span className="text-white text-2xl">↗</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Redirecting...</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Domain redirect sends users to another site immediately on page load
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { language, t } = useLanguage()
  const { slug } = use(params)
  const tool = toolsData[slug]
  if (!tool) notFound()
  const ToolComponent = tool.component

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.tools"), href: "/tools" }, { label: tool.name[language] }]} />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{tool.name[language]}</h1>
      <ToolComponent />
    </div>
  )
}
