"use client"

import Link from "next/link"
import AdSlot from "@/components/AdSlot"
import ArticleCard from "@/components/ArticleCard"
import EventCard from "@/components/EventCard"
import JobCard from "@/components/JobCard"
import NetworkTable from "@/components/NetworkTable"
import CpaNetworkTable from "@/components/CpaNetworkTable"
import ServiceTable from "@/components/ServiceTable"
import {
  getAdNetworkRanking,
  getCpaNetworkRanking,
  getServiceRanking,
  type RankedAdNetwork,
  type RankedCpaNetwork,
  type RankedService,
} from "@/mock/rankings"
import { adFormatLabels, type AdFormatKey } from "@/mock/networks"
import { verticalLabels, type VerticalKey } from "@/mock/cpaNetworks"
import { serviceTypeLabels, type ServiceTypeKey } from "@/mock/services"
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import type { Article } from "@/mock/articles"
import type { Event } from "@/mock/events"
import type { Job } from "@/mock/jobs"
import { useState, useEffect } from "react"

// ── Sub-category configs ──
const adNetworkSubs: AdFormatKey[] = ["push", "popunder", "inPage", "banner", "telegram", "display", "native", "mobile", "video"]
const cpaSubs: VerticalKey[] = ["gambling", "betting", "dating", "crypto", "finance", "sweeps", "installs", "nutra", "adult", "multivertical", "other"]
const serviceSubs: ServiceTypeKey[] = ["antidetect", "spyTools", "proxy", "trackers", "pwa", "payments"]

const adFormatSlugs: Record<AdFormatKey, string> = {
  push: "push-ad-networks", popunder: "popunder-ad-networks", inPage: "in-page-ad-networks",
  banner: "banner-ad-networks", telegram: "telegram-ad-networks", display: "display-ad-networks",
  native: "native-ad-networks", mobile: "mobile-ad-networks", video: "video-ad-networks",
}
const verticalSlugs: Record<VerticalKey, string> = {
  gambling: "gambling-cpa-networks", betting: "betting-cpa-networks", dating: "dating-cpa-networks",
  crypto: "crypto-cpa-networks", finance: "finance-cpa-networks", sweeps: "sweeps-cpa-networks",
  installs: "installs-cpa-networks", nutra: "nutra-cpa-networks", adult: "adult-cpa-networks",
  multivertical: "multivertical-cpa-networks", other: "other-cpa-networks",
}
const serviceTypeSlugs: Record<ServiceTypeKey, string> = {
  antidetect: "antidetect-browsers", spyTools: "spy-tools", proxy: "proxy",
  trackers: "trackers", payments: "payments", pwa: "pwa-tools",
}

// ── Horizontal slider component ──
function SubSlider<T extends string>({
  items,
  active,
  onChange,
  labels,
  language,
}: {
  items: T[]
  active: T
  onChange: (key: T) => void
  labels: Record<T, Record<string, string>>
  language: string
}) {
  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-4">
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg min-w-max">
        {items.map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`whitespace-nowrap px-3 py-2 sm:px-4 rounded-md text-sm font-medium transition-colors ${active === key
                ? "bg-accent-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {labels[key]?.[language] || labels[key]?.en || key}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function HomePageClient({
  news,
  guides,
  cases,
  reviews,
  events,
  jobs,
}: {
  news: Article[]
  guides: Article[]
  cases: Article[]
  reviews: Article[]
  events: Event[]
  jobs: Job[]
}) {
  const { t, language } = useLanguage()
  const { audience } = useAudience()

  const getPath = (path: string) => `/${language}/${audience}${path}`

  // Ad Networks state
  const [activeAdFormat, setActiveAdFormat] = useState<AdFormatKey>("push")
  const [adNetworks, setAdNetworks] = useState<RankedAdNetwork[]>([])
  const [adLoading, setAdLoading] = useState(true)

  // CPA Networks state
  const [activeVertical, setActiveVertical] = useState<VerticalKey>("gambling")
  const [cpaNetworks, setCpaNetworks] = useState<RankedCpaNetwork[]>([])
  const [cpaLoading, setCpaLoading] = useState(true)

  // Services state
  const [activeServiceType, setActiveServiceType] = useState<ServiceTypeKey>("antidetect")
  const [services, setServices] = useState<RankedService[]>([])
  const [serviceLoading, setServiceLoading] = useState(true)

  useEffect(() => {
    setAdLoading(true)
    getAdNetworkRanking(activeAdFormat, audience).then((data) => {
      setAdNetworks(data)
      setAdLoading(false)
    })
  }, [activeAdFormat, audience])

  useEffect(() => {
    setCpaLoading(true)
    getCpaNetworkRanking(activeVertical, audience).then((data) => {
      setCpaNetworks(data)
      setCpaLoading(false)
    })
  }, [activeVertical, audience])

  useEffect(() => {
    setServiceLoading(true)
    getServiceRanking(activeServiceType, audience).then((data) => {
      setServices(data)
      setServiceLoading(false)
    })
  }, [activeServiceType, audience])

  const loadingPlaceholder = (
    <div className="py-8 text-center text-gray-400 text-sm">
      {language === "ru" ? "Загрузка..." : "Loading..."}
    </div>
  )
  const emptyPlaceholder = (
    <div className="py-8 text-center text-gray-400 text-sm">
      {language === "ru" ? "Скоро..." : "Coming soon..."}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-start">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">

          {/* ── News ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.industryUpdates")}</h2>
              <Link href={getPath("/blog")} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {news.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          {/* ── Top Ad Networks ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 rounded-full bg-blue-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "ru" ? "Лучшие рекламные сети" : "Top Ad Networks"}
                </h2>
              </div>
              <Link href={getPath(`/rankings/${adFormatSlugs[activeAdFormat]}`)} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewRankings")} →
              </Link>
            </div>
            <SubSlider items={adNetworkSubs} active={activeAdFormat} onChange={setActiveAdFormat} labels={adFormatLabels} language={language} />
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
              {adLoading ? loadingPlaceholder : adNetworks.length > 0 ? (
                <NetworkTable networks={adNetworks} maxRows={5} />
              ) : emptyPlaceholder}
            </div>
          </section>

          {/* ── Reviews ── */}
          {reviews.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "ru" ? "Обзоры" : "Reviews"}
                </h2>
                <Link href={getPath("/blog?cat=reviews")} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                  {t("common.viewAll")} →
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          <div className="mb-12">
            <AdSlot slotKey="inline" />
          </div>

          {/* ── Top CPA Networks ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 rounded-full bg-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "ru" ? "Лучшие CPA-сети" : "Top CPA Networks"}
                </h2>
              </div>
              <Link href={getPath(`/rankings/${verticalSlugs[activeVertical]}`)} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewRankings")} →
              </Link>
            </div>
            <SubSlider items={cpaSubs} active={activeVertical} onChange={setActiveVertical} labels={verticalLabels} language={language} />
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
              {cpaLoading ? loadingPlaceholder : cpaNetworks.length > 0 ? (
                <CpaNetworkTable networks={cpaNetworks} maxRows={5} />
              ) : emptyPlaceholder}
            </div>
          </section>

          {/* ── Guides ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.trendingGuides")}</h2>
              <Link href={getPath("/guides")} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {guides.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          <div className="lg:hidden mb-12">
            <AdSlot slotKey="sidebar" />
          </div>

          {/* ── Top Services ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-7 rounded-full bg-emerald-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "ru" ? "Лучшие сервисы" : "Top Services"}
                </h2>
              </div>
              <Link href={getPath(`/rankings/${serviceTypeSlugs[activeServiceType]}`)} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewRankings")} →
              </Link>
            </div>
            <SubSlider items={serviceSubs} active={activeServiceType} onChange={setActiveServiceType} labels={serviceTypeLabels} language={language} />
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
              {serviceLoading ? loadingPlaceholder : services.length > 0 ? (
                <ServiceTable services={services} maxRows={5} />
              ) : emptyPlaceholder}
            </div>
          </section>

          {/* ── Events ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === "ru" ? "Ивенты" : "Upcoming Events"}
              </h2>
              <Link href={getPath("/events")} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewAll")} →
              </Link>
            </div>
            {events.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {events.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl p-8 text-center">
                <p className="text-gray-400 text-sm">
                  {language === "ru" ? "Нет предстоящих ивентов" : "No upcoming events"}
                </p>
              </div>
            )}
          </section>

          <div className="mb-12">
            <AdSlot slotKey="inline" />
          </div>

          {/* ── Case Studies ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.caseStudies")}</h2>
              <Link href={getPath("/blog?cat=case-studies")} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewAll")} →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {cases.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>

          {/* ── Jobs ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === "ru" ? "Вакансии" : "Latest Jobs"}
              </h2>
              <Link href={getPath("/jobs")} className="text-accent-600 hover:text-accent-700 text-sm font-medium">
                {t("common.viewAll")} →
              </Link>
            </div>
            {jobs.length > 0 ? (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.slug} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl p-8 text-center">
                <p className="text-gray-400 text-sm">
                  {language === "ru" ? "Нет вакансий" : "No job listings yet"}
                </p>
              </div>
            )}
          </section>

        </div>

        <aside className="hidden lg:block w-full lg:w-[300px]">
          <div className="sticky top-8">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
