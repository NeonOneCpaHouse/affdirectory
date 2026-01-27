import { getKnowledgeBySlug, getAllKnowledgeEntries } from "@/mock/knowledge"
import { notFound } from "next/navigation"
import KnowledgeArticleClient from "@/components/KnowledgeArticleClient"

export async function generateStaticParams() {
  const affiliate = await getAllKnowledgeEntries("affiliate")
  const webmaster = await getAllKnowledgeEntries("webmaster")
  const entries = [...affiliate, ...webmaster]
  return entries.map((entry) => ({
    slug: entry.slug,
  }))
}

export default async function KnowledgeEntryPage({ params }: { params: Promise<{ lang: string; audience: string; slug: string }> }) {
  const { slug } = await params
  const entry = await getKnowledgeBySlug(slug)

  if (!entry) {
    notFound()
  }

  return <KnowledgeArticleClient entry={entry} />
}
