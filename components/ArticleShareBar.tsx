"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { Bot, Copy, Facebook, Linkedin, Send, Share2 } from "lucide-react"

import { useLanguage } from "@/context/LanguageContext"
import { SITE_URL } from "@/lib/seo"

interface ArticleShareBarProps {
  title: string
}

type CopyState = "link" | "ai" | null

function buildArticleUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString()
}

export default function ArticleShareBar({ title }: ArticleShareBarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [copyState, setCopyState] = useState<CopyState>(null)

  const articleUrl = useMemo(() => buildArticleUrl(pathname), [pathname])
  const encodedUrl = encodeURIComponent(articleUrl)
  const encodedTitle = encodeURIComponent(title)

  const aiPrompt = t("article.shareAIPrompt")
    .replace("{title}", title)
    .replace("{url}", articleUrl)

  useEffect(() => {
    if (!copyState) {
      return
    }

    const timeout = window.setTimeout(() => {
      setCopyState(null)
    }, 2200)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [copyState])

  const handleCopy = async (value: string, type: CopyState) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyState(type)
    } catch {
      setCopyState(null)
    }
  }

  const shareActions = [
    {
      key: "copy",
      label: t("article.shareCopyLink"),
      icon: Copy,
      onClick: () => void handleCopy(articleUrl, "link"),
    },
    {
      key: "x",
      label: t("article.shareX"),
      icon: Share2,
      onClick: () => {
        window.open(`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank", "noopener,noreferrer")
      },
    },
    {
      key: "telegram",
      label: t("article.shareTelegram"),
      icon: Send,
      onClick: () => {
        window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, "_blank", "noopener,noreferrer")
      },
    },
    {
      key: "linkedin",
      label: t("article.shareLinkedIn"),
      icon: Linkedin,
      onClick: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, "_blank", "noopener,noreferrer")
      },
    },
    {
      key: "facebook",
      label: t("article.shareFacebook"),
      icon: Facebook,
      onClick: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank", "noopener,noreferrer")
      },
    },
    {
      key: "ai",
      label: t("article.shareAI"),
      icon: Bot,
      onClick: () => void handleCopy(aiPrompt, "ai"),
    },
  ]

  const feedbackMessage =
    copyState === "link"
      ? t("article.shareCopied")
      : copyState === "ai"
        ? t("article.shareAICopied")
        : null

  return (
    <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50/80 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-600/10 text-accent-600">
          <Share2 className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{t("article.shareTitle")}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("article.shareSubtitle")}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {shareActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.key}
              type="button"
              onClick={action.onClick}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-accent-300 hover:text-accent-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-accent-500 dark:hover:text-accent-400"
            >
              <Icon className="h-4 w-4" />
              <span>{action.label}</span>
            </button>
          )
        })}
      </div>

      {feedbackMessage && (
        <p className="mt-4 text-sm font-medium text-accent-600 dark:text-accent-400">{feedbackMessage}</p>
      )}
    </div>
  )
}
