"use client"

import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"
import NetworkTable from "@/components/NetworkTable"
import CpaNetworkTable from "@/components/CpaNetworkTable"
import ServiceTable from "@/components/ServiceTable"
import DomainParkingTable from "@/components/DomainParkingTable"
import LinkSellingTable from "@/components/LinkSellingTable"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { RankingContentOverride, ResolvedRanking } from "@/mock/rankings"
import type { Localized } from "@/types"
import { useLanguage } from "@/context/LanguageContext"

export default function RankingDetailClient({
  ranking,
  methodology,
  customH1,
  contentOverride,
}: {
  ranking: ResolvedRanking
  methodology: Localized<string>
  customH1?: Localized<string>
  contentOverride?: RankingContentOverride
}) {
  const { language, t } = useLanguage()

  const label = ranking.label[language] || ranking.label["en"]
  const title = customH1?.[language] || customH1?.["en"] || (language === "ru" ? `Лучшие ${label}` : `Best ${label}`)
  const methodologyText = methodology[language] || methodology["en"]
  const introParagraphs = contentOverride?.introParagraphs[language] || contentOverride?.introParagraphs["en"] || []
  const sections =
    contentOverride?.sections.map((section) => ({
      title: section.title[language] || section.title["en"],
      paragraphs: section.paragraphs[language] || section.paragraphs["en"] || [],
    })) || []
  const faqItems =
    contentOverride?.faq?.items.map((item) => ({
      question: item.question[language] || item.question["en"],
      answer: item.answer[language] || item.answer["en"],
    })) || []
  const itemCount =
    ranking.entityType === "adNetwork"
      ? ranking.adNetworks?.length || 0
      : ranking.entityType === "cpaNetwork"
        ? ranking.cpaNetworks?.length || 0
        : ranking.entityType === "service"
          ? ranking.services?.length || 0
          : ranking.entityType === "domainParking"
            ? ranking.domainParkingEntries?.length || 0
            : ranking.linkSellingEntries?.length || 0
  const emptyMessage =
    language === "ru"
      ? "Пока в этом рейтинге нет доступных позиций."
      : "There are no ranked entries available yet."
  const renderContentBlock = () => {
    if (!contentOverride) {
      return (
        <div className="bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 rounded-xl p-4 mb-8">
          <h2 className="text-accent-700 font-semibold mb-2">
            {language === "ru" ? "Методология" : "Methodology"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{methodologyText}</p>
        </div>
      )
    }

    return (
      <div className="bg-accent-50 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 rounded-xl p-4 mb-8">
        <div className="space-y-5">
          {introParagraphs.map((paragraph, index) => (
            <p key={`intro-${index}`} className="text-sm leading-7 text-gray-700 dark:text-gray-200">
              {paragraph}
            </p>
          ))}

          {sections.map((section, index) => (
            <section key={`${section.title}-${index}`} className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.title}-${paragraphIndex}`} className="text-sm leading-7 text-gray-700 dark:text-gray-200">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {faqItems.length > 0 && (
            <Accordion type="single" collapsible className="border-t border-accent-200/80 dark:border-accent-500/20 pt-2">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={`${item.question}-${index}`}
                  value={`faq-${index}`}
                  className="border-accent-200/80 dark:border-accent-500/20"
                >
                  <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:no-underline dark:text-white">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-gray-700 dark:text-gray-200">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("nav.rankings"), href: "/rankings" }, { label: label }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
          {contentOverride?.placement !== "afterRanking" && renderContentBlock()}

          {itemCount > 0 ? (
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl overflow-hidden mb-8 shadow-sm">
              {ranking.entityType === "adNetwork" && ranking.adNetworks && (
                <NetworkTable networks={ranking.adNetworks} />
              )}
              {ranking.entityType === "cpaNetwork" && ranking.cpaNetworks && (
                <CpaNetworkTable networks={ranking.cpaNetworks} />
              )}
              {ranking.entityType === "service" && ranking.services && (
                <ServiceTable services={ranking.services} />
              )}
              {ranking.entityType === "domainParking" && ranking.domainParkingEntries && (
                <DomainParkingTable entries={ranking.domainParkingEntries} />
              )}
              {ranking.entityType === "linkSelling" && ranking.linkSellingEntries && (
                <LinkSellingTable entries={ranking.linkSellingEntries} />
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800/30 border border-accent-200 dark:border-gray-700/50 rounded-xl p-8 mb-8 shadow-sm">
              <p className="text-sm text-gray-600 dark:text-gray-300">{emptyMessage}</p>
            </div>
          )}

          {contentOverride?.placement === "afterRanking" && renderContentBlock()}

          <div className="lg:hidden mb-8">
            <AdSlot slotKey="sidebar" />
          </div>

          <div className="">
            <AdSlot slotKey="inline" />
          </div>
        </main>

        <aside className="hidden lg:block w-full lg:w-[300px]">
          <div className="sticky top-8">
            <AdSlot slotKey="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  )
}
