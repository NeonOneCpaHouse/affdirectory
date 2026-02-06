"use client"

import { useLanguage } from "@/context/LanguageContext"
import { useAudience } from "@/context/AudienceContext"
import type { KnowledgeEntry } from "@/mock/knowledge"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import AdSlot from "@/components/AdSlot"
import Breadcrumbs from "@/components/Breadcrumbs"

interface KnowledgeArticleClientProps {
  entry: KnowledgeEntry
}

export default function KnowledgeArticleClient({ entry }: KnowledgeArticleClientProps) {
  const { language, t } = useLanguage()

  const title = entry?.title?.[language] || entry?.title?.en || "Untitled"
  const body = entry?.body?.[language] || entry?.body?.en || []
  const thumbnail = entry?.thumbnail?.[language] || entry?.thumbnail?.en

  const portableTextComponents = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">{children}</h4>
      ),
      normal: ({ children }: any) => (
        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-accent-500 pl-4 italic my-6 text-gray-600 dark:text-gray-400">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-accent-600">
          {children}
        </code>
      ),
      link: ({ value, children }: any) => (
        <a
          href={value?.href}
          className="text-accent-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  }

  const { audience } = useAudience()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: t("knowledge.title"), href: `/${language}/${audience}/knowledge-base` }, { label: title }]} />
      <div className="mb-8">
        <AdSlot slotKey="leaderboard" fullWidth />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0">
          <article>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">{title}</h1>

            {entry?.overview?.[language] && (
              <div className="mb-12 p-8 rounded-3xl bg-callout border-callout shadow-callout backdrop-blur-xs text-center">
                <p className="text-xl text-gray-800 dark:text-gray-200 italic leading-relaxed font-medium">
                  {entry.overview[language]}
                </p>
              </div>
            )}

            {thumbnail && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-accent-100 dark:border-gray-800 shadow-sm bg-gray-50 dark:bg-gray-900">
                <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            )}
            <div className="lg:hidden mb-8">
              <AdSlot slotKey="sidebar" />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {Array.isArray(body) && body.length > 0 ? (
                <PortableText value={body} components={portableTextComponents} />
              ) : (
                <p className="text-gray-500 italic">No content available</p>
              )}
            </div>
          </article>


          <div className="my-12">
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
