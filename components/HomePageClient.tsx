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
import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import type { Article } from "@/mock/articles"
import type { Event } from "@/mock/events"
import type { Job } from "@/mock/jobs"
import { useState, useEffect } from "react"

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

  // Rankings data
  const [adNetworks, setAdNetworks] = useState<RankedAdNetwork[]>([])
  const [cpaNetworks, setCpaNetworks] = useState<RankedCpaNetwork[]>([])
  const [services, setServices] = useState<RankedService[]>([])

  useEffect(() => {
    getAdNetworkRanking("push", audience).then(setAdNetworks)
    getCpaNetworkRanking("gambling", audience).then(setCpaNetworks)
    getServiceRanking("antidetect", audience).then(setServices)
  }, [audience])

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
              <Link
                href={getPath("/blog")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
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
              <Link
                href={getPath("/rankings/push-ad-networks")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
                {t("common.viewRankings")} →
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
              {adNetworks.length > 0 ? (
                <NetworkTable networks={adNetworks} maxRows={5} />
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm">
                  {language === "ru" ? "Скоро..." : "Coming soon..."}
                </div>
              )}
            </div>
          </section>

          {/* ── Reviews ── */}
          {reviews.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {language === "ru" ? "Обзоры" : "Reviews"}
                </h2>
                <Link
                  href={getPath("/blog?cat=reviews")}
                  className="text-accent-600 hover:text-accent-700 text-sm font-medium"
                >
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
              <Link
                href={getPath("/rankings/gambling-cpa-networks")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
                {t("common.viewRankings")} →
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
              {cpaNetworks.length > 0 ? (
                <CpaNetworkTable networks={cpaNetworks} maxRows={5} />
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm">
                  {language === "ru" ? "Скоро..." : "Coming soon..."}
                </div>
              )}
            </div>
          </section>

          {/* ── Guides ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("home.trendingGuides")}</h2>
              <Link
                href={getPath("/guides")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
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
              <Link
                href={getPath("/rankings/antidetect-browsers")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
                {t("common.viewRankings")} →
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-sm">
              {services.length > 0 ? (
                <ServiceTable services={services} maxRows={5} />
              ) : (
                <div className="py-8 text-center text-gray-400 text-sm">
                  {language === "ru" ? "Скоро..." : "Coming soon..."}
                </div>
              )}
            </div>
          </section>

          {/* ── Events ── */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === "ru" ? "Ивенты" : "Upcoming Events"}
              </h2>
              <Link
                href={getPath("/events")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
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
              <Link
                href={getPath("/blog?cat=case-studies")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
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
              <Link
                href={getPath("/jobs")}
                className="text-accent-600 hover:text-accent-700 text-sm font-medium"
              >
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
