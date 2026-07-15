"use client"

import type { PortableTextComponents } from "@portabletext/react"

import { urlForImage } from "@/lib/sanity"
import { useLanguage } from "@/context/LanguageContext"
import type { ArticleTableBlock, ArticleTableRow } from "@/types/articlePortableText"

function getRowCells(row?: ArticleTableRow) {
  return (row?.cells || []).map((cell) => cell?.trim() || "")
}

const NOTE_CONFIG: Record<string, { icon: string; labelKey: string }> = {
  editors_note: { icon: "📝", labelKey: "article.editorsNote" },
  afftraff_opinion: { icon: "💡", labelKey: "article.afftraffOpinion" },
  our_experience: { icon: "🔬", labelKey: "article.ourExperience" },
}

function EditorNoteBlock({ value }: { value: { noteType?: string; text?: string } }) {
  const { t } = useLanguage()

  const noteType = value?.noteType || "editors_note"
  const config = NOTE_CONFIG[noteType] || NOTE_CONFIG.editors_note
  const label = t(config.labelKey)

  if (!value?.text) return null

  return (
    <aside className="my-8 rounded-2xl border-l-4 border-accent-500 bg-accent-50 dark:bg-accent-500/10 p-6 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg" role="img" aria-hidden="true">{config.icon}</span>
        <span className="text-sm font-bold uppercase tracking-wider text-accent-600">
          {label}
        </span>
      </div>
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {value.text}
      </p>
    </aside>
  )
}

export const articlePortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlForImage(value)?.url()

      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-accent-100 shadow-sm dark:border-gray-800">
          {value?.link ? (
            <a href={value.link} target="_blank" rel="noopener noreferrer">
              <img src={imageUrl || "/placeholder.svg"} alt={value.alt || ""} className="h-auto w-full" />
            </a>
          ) : (
            <img src={imageUrl || "/placeholder.svg"} alt={value.alt || ""} className="h-auto w-full" />
          )}
          {value?.caption && (
            <p className="bg-gray-50 px-4 py-2 text-center text-sm text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    articleTable: ({ value }) => {
      const rows = (value as ArticleTableBlock | undefined)?.rows || []

      if (rows.length === 0) {
        return null
      }

      const useHeader = Boolean(value?.firstRowIsHeader) && rows.length > 1
      const [firstRow, ...remainingRows] = rows
      const headerCells = useHeader ? getRowCells(firstRow) : []
      const bodyRows = useHeader ? remainingRows : rows

      return (
        <figure className="my-8 overflow-hidden rounded-2xl border border-accent-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm md:text-base">
              {headerCells.length > 0 && (
                <thead className="bg-gray-50 dark:bg-gray-800/60">
                  <tr>
                    {headerCells.map((cell, cellIndex) => (
                      <th
                        key={`${firstRow?._key || "header"}-${cellIndex}`}
                        className="border-b border-accent-100 px-4 py-3 font-semibold text-gray-900 dark:border-gray-700 dark:text-white"
                        scope="col"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, rowIndex) => (
                  <tr key={row._key || `row-${rowIndex}`} className="border-b border-accent-100 last:border-b-0 dark:border-gray-800">
                    {getRowCells(row).map((cell, cellIndex) => (
                      <td
                        key={`${row._key || rowIndex}-${cellIndex}`}
                        className="px-4 py-3 align-top whitespace-pre-line text-gray-600 dark:text-gray-300"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {value?.caption && (
            <figcaption className="border-t border-accent-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    editorNote: EditorNoteBlock,
  },
  block: {
    h1: ({ children }) => <h1 className="mt-10 mb-4 text-3xl font-bold text-gray-900 dark:text-white">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-bold text-gray-900 dark:text-white">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-bold text-gray-900 dark:text-white">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 mb-2 text-lg font-semibold text-gray-900 dark:text-white">{children}</h4>,
    normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-accent-500 pl-4 italic text-gray-600 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-4 list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-accent-600 dark:bg-gray-800">
        {children}
      </code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through">{children}</span>,
    link: ({ children, value }) => {
      const target = value?.blank ? "_blank" : undefined
      const rel = value?.blank ? "noopener noreferrer" : undefined

      return (
        <a href={value?.href} target={target} rel={rel} className="text-accent-600 hover:underline">
          {children}
        </a>
      )
    },
  },
}

