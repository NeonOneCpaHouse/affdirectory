import { Suspense } from "react"
import { getAllKnowledgeEntries } from "@/mock/knowledge"
import KnowledgeBaseClientPage from "@/components/KnowledgeBaseClientPage"

export const metadata = {
  title: "Knowledge Base - AffTraff",
  description: "Comprehensive glossary of advertising and monetization terms",
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
