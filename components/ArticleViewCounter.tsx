"use client"

import { useEffect, useRef, useState } from "react"
import { Eye } from "lucide-react"

import { useLanguage } from "@/context/LanguageContext"

interface ArticleViewCounterProps {
  articleId: string
  initialCount: number
  token: string | null
}

function createVisitId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export default function ArticleViewCounter({
  articleId,
  initialCount,
  token,
}: ArticleViewCounterProps) {
  const { language, t } = useLanguage()
  const [count, setCount] = useState(initialCount)
  const didTrackRef = useRef(false)
  const visitIdRef = useRef("")

  useEffect(() => {
    if (!token || didTrackRef.current) {
      return
    }

    if (!visitIdRef.current) {
      visitIdRef.current = createVisitId()
    }

    didTrackRef.current = true

    const payload = {
      articleId,
      visitId: visitIdRef.current,
      token,
    }

    let isCancelled = false

    const sendView = async () => {
      try {
        const response = await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          cache: "no-store",
          keepalive: true,
        })

        if (!response.ok) {
          throw new Error("View counter request failed.")
        }

        const data = (await response.json()) as { count?: number }
        if (!isCancelled && typeof data.count === "number") {
          setCount(data.count)
        }
      } catch {
        if (typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function") {
          return
        }

        const blob = new Blob([JSON.stringify(payload)], {
          type: "application/json",
        })
        navigator.sendBeacon("/api/views", blob)
      }
    }

    void sendView()

    return () => {
      isCancelled = true
    }
  }, [articleId, token])

  const locale = language === "ru" ? "ru-RU" : "en-US"
  const formattedCount = new Intl.NumberFormat(locale).format(count)

  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 font-medium">
      <Eye className="h-4 w-4" aria-hidden="true" />
      <span>{formattedCount}</span>
      <span>{t("article.views")}</span>
    </span>
  )
}
