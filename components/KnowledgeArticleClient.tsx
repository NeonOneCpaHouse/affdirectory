"use client"

import { useLanguage } from "@/context/LanguageContext"
import type { KnowledgeEntry } from "@/mock/knowledge"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface KnowledgeArticleClientProps {
  entry: KnowledgeEntry
}

export default function KnowledgeArticleClient({ entry }: KnowledgeArticleClientProps) {
  const { language, t } = useLanguage()

  const title = entry.title[language] || entry.title.en
  const body = entry.body[language] || entry.body.en
  const thumbnail = entry.thumbnail?.[language] || entry.thumbnail?.en

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

  return (
    <main className="min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/knowledge-base"
          className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("knowledge.title")}
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">{title}</h1>

        {/* Thumbnail */}
        {thumbnail && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-auto" />
          </div>
        )}

        {/* Body Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <PortableText value={body} components={portableTextComponents} />
        </div>
      </article>
    </main>
  )
}
