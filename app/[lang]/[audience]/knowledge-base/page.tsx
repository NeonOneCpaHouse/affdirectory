import type { Metadata } from "next"
import { Suspense } from "react"
import { getAllKnowledgeEntries } from "@/mock/knowledge"
import KnowledgeBaseClientPage from "@/components/KnowledgeBaseClientPage"
import { buildSeoMetadata, getHubSeoEntry, isSupportedAudience, isSupportedLanguage } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; audience: string }>
}): Promise<Metadata> {
  const { lang, audience } = await params

  if (!isSupportedLanguage(lang) || !isSupportedAudience(audience)) {
    return {}
  }

  const seo = getHubSeoEntry("knowledgeBase", audience, lang)
  return buildSeoMetadata({
    lang,
    audience,
    pathname: "/knowledge-base",
    title: seo.title,
    description: seo.description,
  })
}

export default async function KnowledgeBasePage({ params }: { params: Promise<{ lang: string; audience: string }> }) {
  const { audience } = await params
  const entries = await getAllKnowledgeEntries(audience)

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KnowledgeBaseClientPage entries={entries} />
    </Suspense>
  )
}
