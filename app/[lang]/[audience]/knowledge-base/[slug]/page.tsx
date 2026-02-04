import { getKnowledgeBySlug, getAllKnowledgeEntries } from "@/mock/knowledge"
import { notFound } from "next/navigation"
import KnowledgeArticleClient from "@/components/KnowledgeArticleClient"

export async function generateStaticParams() {
  const affiliate = await getAllKnowledgeEntries("affiliate")
  const webmaster = await getAllKnowledgeEntries("webmaster")
  const entries = [...affiliate, ...webmaster]

  const params: any[] = []

  entries.forEach(entry => {
    ["en", "ru"].forEach(lang => {
      params.push({ lang, audience: "affiliate", slug: entry.slug })
      params.push({ lang, audience: "webmaster", slug: entry.slug })
    })
  })

  return params
}

export default async function KnowledgeEntryPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  try {
    const { slug } = await params
    console.log(`[KB] Rendering article for slug: ${slug}`)

    const entry = await getKnowledgeBySlug(slug)

    if (!entry) {
      console.log(`[KB] Entry not found for slug: ${slug}`)
      notFound()
    }

    return <KnowledgeArticleClient entry={entry} />
  } catch (error) {
    console.error(`[KB] Error rendering knowledge page:`, error)
    return (
      <div className="p-8 text-red-500">
        <h1>Internal Server Error</h1>
        <p>{error instanceof Error ? error.message : "Possible serialization or rendering error"}</p>
      </div>
    )
  }
}
