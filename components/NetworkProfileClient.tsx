"use client"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import RatingStars from "@/components/RatingStars"
import TagPills from "@/components/TagPills"
import NetworkCard from "@/components/NetworkCard"
import { formatLabels, type Network } from "@/mock/networks"
import { useLanguage } from "@/context/LanguageContext"

export default function NetworkProfileClient({
  network,
  alternatives,
}: {
  network: Network
  alternatives: Network[]
}) {
  const { language, t } = useLanguage()

  const currentGeos = network.geos[language] || network.geos["en"] || []
  const currentPros = network.pros[language] || network.pros["en"] || []
  const currentCons = network.cons[language] || network.cons["en"] || []
  const currentNote = network.editorialNote[language] || network.editorialNote["en"]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.networks"), href: "/networks" }, { label: network.name }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" />
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              {network.logo && network.logo.trim() !== "" && (
                <div className="w-28 h-28 flex items-center justify-center">
                  <img
                    src={network.logo || "/placeholder.svg"}
                    alt={`${network.name} logo`}
                    className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{network.name}</h1>
                <TagPills tags={network.formatsSupported} variant="format" />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{t("network.payout")}</p>
                <p className="text-gray-900 dark:text-white font-semibold">${network.minPayout}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">{t("network.frequency")}</p>
                <p className="text-gray-900 dark:text-white font-semibold">{network.payoutFrequency}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-300 text-sm mb-1">{t("network.methods")}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {network.paymentMethods.slice(0, 3).join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-300 text-sm mb-1">{t("network.geos")}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{currentGeos.slice(0, 3).join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="lg:hidden bg-sky-600 dark:bg-blue-600 rounded-xl p-6 text-center shadow-md">
            <h3 className="text-white font-semibold text-lg mb-4">
              {t("network.visit")} {network.name}
            </h3>
            <a
              href={network.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white text-sky-600 dark:text-blue-600 font-medium py-3 rounded-lg hover:bg-sky-50 dark:hover:bg-blue-50 transition-colors shadow-sm"
            >
              {t("network.goToSite")} →
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t("network.ratingsFormat")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {network.formatsSupported.map((fmt) => (
                <div key={fmt} className="p-4 bg-sky-50 dark:bg-gray-900/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formatLabels[fmt][language]}</p>
                  <RatingStars rating={network.ratingsByFormat[fmt].overall} />
                  <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                    <span>
                      {t("network.stability")}: {network.ratingsByFormat[fmt].stability}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      {t("network.support")}: {network.ratingsByFormat[fmt].support}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl p-6">
              <h3 className="text-green-700 dark:text-green-400 font-semibold mb-3">{t("network.pros")}</h3>
              <ul className="space-y-2">
                {currentPros.map((p, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-500">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6">
              <h3 className="text-red-700 dark:text-red-400 font-semibold mb-3">{t("network.cons")}</h3>
              <ul className="space-y-2">
                {currentCons.map((c, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-500">✗</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800/50 border border-sky-200 dark:border-gray-700/50 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t("network.editorialNote")}</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{currentNote}</p>
          </div>
          <div className="">
            <AdSlot slotKey="inline" />
          </div>
        </div>
        <aside className="space-y-6">
          <div className="sticky top-8 space-y-6">
            <div className="hidden lg:block bg-sky-600 dark:bg-blue-600 rounded-xl p-6 text-center shadow-md">
              <h3 className="text-white font-semibold text-lg mb-4">
                {t("network.visit")} {network.name}
              </h3>
              <a
                href={network.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-white text-sky-600 dark:text-blue-600 font-medium py-3 rounded-lg hover:bg-sky-50 dark:hover:bg-blue-50 transition-colors shadow-sm"
              >
                {t("network.goToSite")} →
              </a>
            </div>
            {alternatives.length > 0 && (
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold mb-4">{t("network.similar")}</h3>
                <div className="space-y-3">
                  {alternatives.map((alt) => (
                    <NetworkCard key={alt.slug} network={alt} />
                  ))}
                </div>
              </div>
            )}
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
