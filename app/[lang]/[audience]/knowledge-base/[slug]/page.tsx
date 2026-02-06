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
    console.error(`[KB] Error rendering knowledge page for slug ${slug}:`, error)
    return (
      <div className="p-8 text-red-500 border-2 border-red-500 rounded-lg m-4 bg-red-50 dark:bg-red-950/20">
        <h1 className="text-2xl font-bold mb-4">Internal Server Error</h1>
        <p className="font-mono text-sm mb-4">
          {error instanceof Error ? error.message : "Possible serialization or rendering error"}
        </p>
        <details className="mt-4">
          <summary className="cursor-pointer font-semibold">Error Details</summary>
          <pre className="mt-2 text-xs overflow-auto p-4 bg-black/5 dark:bg-black/40 rounded">
            {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
          </pre>
        </details>
        <div className="mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Common causes for this error on Vercel:
          </p>
          <ul className="list-disc list-inside text-sm mt-2 text-gray-600 dark:text-gray-400">
            <li>Missing Sanity environment variables (PROJECT_ID, DATASET, TOKEN)</li>
            <li>Sanity CORS settings missing the Vercel domain</li>
            <li>Data serialization issue between Server and Client components</li>
          </ul>
        </div>
      </div>
    )
  }
}
